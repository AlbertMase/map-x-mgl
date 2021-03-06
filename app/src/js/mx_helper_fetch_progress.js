export function fetchJsonProgress(url, opt) {
  return fetchProgress(url, opt).then((r) => {
    if (!r || !r.json) {
      /**
       * Prbably because Response not implemented.
       * try with xhr
       */
      return fetchJsonProgress_xhr(url, opt);
    } else {
      return r.json();
    }
  });
}

const defProgress = {
  onProgress: () => {},
  onComplete: () => {},
  onError: (e) => {
    throw new Error(e);
  },
  maxSize: Infinity,
  headerContentLength: 'content-length'
};

export function fetchProgress(url, opt) {
  opt = Object.assign({}, defProgress, opt);

  const modeProgress = window.Response && window.ReadableStream;
  let err = '';
  let loaded = 0;
  let total = 0;

  return fetch(url, {cache: 'no-cache'}).then((response) => {
    err = '';
    if (!response.ok) {
      err = response.status + ' ' + response.statusText;
      throw Error(err);
    }

    const contentLength =
      response.headers.get('Mapx-Content-Length') ||
      response.headers.get('content-length');

    if (!modeProgress || !contentLength) {
      opt.onProgress({
        loaded: loaded,
        total: total
      });
      return response;
    }

    total = parseInt(contentLength, 10);
    loaded = 0;

    return new Response(
      new ReadableStream({
        start(controller) {
          const reader = response.body.getReader();
          read(reader, controller);
        }
      })
    );
  });

  function read(reader, controller) {
    reader
      .read()
      .then(({done, value}) => {
        if (done) {
          opt.onComplete({
            loaded: loaded,
            total: total
          });
          controller.close();
          return;
        }
        loaded += value.byteLength;
        opt.onProgress({
          loaded: loaded,
          total: total
        });
        controller.enqueue(value);
        read(reader, controller);
      })
      .catch((error) => {
        controller.error(error);
        throw new Error(error);
      });
  }
}

export function fetchJsonProgress_xhr(url, opt) {
  opt = Object.assign({}, defProgress, opt);
  let hasMapxContentLength = false;

  return new Promise((resolve, reject) => {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.open('GET', url, true);
    xmlhttp.onprogress = (d) => {
      let p = {
        total: d.total,
        loaded: d.loaded
      };
      if (p.total === 0 || !d.lengthComputable) {
        let cLength =
          (d.target.getResponseHeader('mapx-content-length') ||
            d.target.getResponseHeader('content-length')) * 1;
        if (cLength > 0) {
          p.total = cLength;
          hasMapxContentLength = true;
        }
      }

      if (hasMapxContentLength) {
        p.loaded = d.target.response.length;
      }
      opt.onProgress(p);
    };
    xmlhttp.onerror = (err) => {
      reject(err);
    };
    xmlhttp.onload = onLoad;

    xmlhttp.send();

    /**
     * Helpers
     */
    function onLoad() {
      var that = this;
      if (that.status !== 200) {
        reject(`Unable to fetch ${url} ${that.responseText}`);
      } else {
        let data = JSON.parse(that.responseText);
        resolve(data);
      }
      opt.onComplete();
    }
  });
}

export function fetchProgress_xhr(url, opt) {
  opt = Object.assign({}, defProgress, opt);

  return new Promise((resolve, reject) => {
    let xmlhttp = new XMLHttpRequest();
    let hasContentLength = false;

    xmlhttp.open('GET', url, true);
    xmlhttp.onprogress = (d) => {
      let p = {
        total: d.total,
        loaded: d.loaded
      };
      if (p.total === 0 || !d.lengthComputable) {
        let cLength = d.target.getResponseHeader(opt.headerContentLength) * 1;
        if (cLength > 0) {
          p.total = cLength;
          hasContentLength = true;
        }
      }

      if (hasContentLength) {
        p.loaded = d.target.response.length;
      }
      if (opt.maxSize < Infinity) {
        if (p.loaded >= opt.maxSize) {
          xmlhttp.abort();
          reject(`fetchProgress_xhr : Size limit exceeded ( ${opt.maxSize} B )`);
        }
      }
      opt.onProgress(p);
    };
    xmlhttp.onerror = (err) => {
      reject(err);
    };
    xmlhttp.onload = onLoad;

    xmlhttp.send();

    /**
     * Helpers
     */
    function onLoad() {
      var that = this;
      if (that.status !== 200) {
        reject(`Unable to fetch ${url} ${that.responseText}`);
      } else {
        resolve(that.responseText);
      }
      opt.onComplete();
    }
  });
}
