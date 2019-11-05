import {MessageFlash} from './message_flash.js';
import {el} from '@fxi/el';
import {onNextFrame} from './helpers.js';
import {ListenerStore} from './../../listener_store/index.js';

class Box {
  constructor(boxParent) {
    let box = this;
    box.mc = boxParent.mc || boxParent;
    box[boxParent.title] = boxParent;
    box.boxParent = boxParent;
    box.state = boxParent.state;
    box.lStore = new ListenerStore();
    box.width = 0;
    box.height = 0;
    box.left = 0;
    box.top = 0;
    box.message = null;
    box.title = 'box';
    box.transform = {
      content: {},
      box: {}
    };
    box.listeners = [];
    box.draggers = [];
    box.resizers = [];
    box.editabel = false;
    box.resizable = false;
    box.draggable = false;
    box.removable = false;
  }

  init(opt) {
    opt = opt || {};
    var box = this;
    box.config = opt;
    box.id = Math.random().toString(32);
    box.elContent = opt.content || el('div');
    box.el = box.createEl(opt.class);
    box.elContainer = opt.boxContainer.elContent;
    box.elContainer.appendChild(box.el);
    box.el.appendChild(box.elContent);
    box.addMessageSupport();
    // bound for resize / drag
    box.boxBound = opt.boxBound || box.boxParent;
    box.boundEdges = opt.boundEdges || {
      top: true,
      left: true,
      bottom: true,
      right: true
    };

    box.lStore.addListener({
      target: box.el,
      type: 'click',
      idGroup: 'set_last_focus',
      callback: (e) => {
        if (e.currentTarget === box.el) {
          e.stopPropagation();
          mc.setBoxLastFocus(box);
        }
      }
    });

    if (opt.width) {
      box.setWidth(opt.width);
    }
    if (opt.height) {
      box.setHeight(opt.height);
    }

    if (opt.draggable || opt.resizable) {
      box.lStore.addListener({
        target: box.el,
        type: 'mousedown',
        idGroup: 'drag_resize',
        callback: dragResizeListener,
        bind: box
      });

      if (opt.draggable) {
        if (opt.onDrag) {
          box.draggers.push(opt.onDrag);
        }
        box.makeDraggable();
      }
      if (opt.resizable) {
        if (opt.onResize) {
          box.resizers.push(opt.onResize);
        }
        box.makeResizable({
          boxBound: opt.boxBound || box.boxParent
        });
      }
    }
    box.setContentScale(1);
    box.setTextSize(12);
  }

  isDragging() {
    return this._is_dragging === true;
  }
  setDragingFlag(s) {
    this._is_dragging = s === true;
  }
  isResizing() {
    return this._is_resizing === true;
  }
  setResizingFlag(s) {
    this._is_resizing = s === true;
  }

  onDrag() {
    return this.draggers.forEach((d) => d(this));
  }
  onResize() {
    return this.resizers.forEach((d) => d(this));
  }

  addMessageSupport() {
    this.message = new MessageFlash(this);
  }

  createEl(classes) {
    var box = this;
    var elBox = el('div', {
      class: ['mc-box'].concat(classes || [])
    });
    elBox.box = box;
    return elBox;
  }

  addEl(e) {
    this.el.appendChild(e);
  }

  destroy() {
    var box = this;
    box.el.remove();
    box.lStore.removeListenerByGroup(box.id);
    if (box.config.onRemove) {
      box.config.onRemove();
    }
  }

  addHandle(type, opt) {
    var box = this;
    var title = box.title;
    var base = {
      title: title,
      class: ['mc-handle', 'mc-handle-' + type]
    };
    var conf = Object.assign({}, base, opt);
    box.addEl(el('div', conf));
  }

  addHandleDrag() {
    this.addHandle('drag', {
      dataset: {
        mc_action: 'box_drag',
        mc_event_type: 'mousedown'
      }
    });
  }

  addHandleResize() {
    var box = this;
    ['top', 'left', 'bottom', 'right'].forEach((d) => {
      box.addHandle('resize-' + d, {
        dataset: {
          mc_action: 'box_resize',
          mc_resize_dir: d,
          mc_event_type: 'mousedown'
        }
      });
    });
  }

  addHandleRemove() {
    this.addHandle('remove', {
      dataset: {
        mc_action: 'box_remove',
        mc_event_type: 'click'
      }
    });
  }

  addFocus() {
    this.el.classList.add('mc-focus');
  }
  removeFocus() {
    this.el.classList.remove('mc-focus');
  }

  setSize(w, h) {
    this.setWidth(w || this.width);
    this.setHeight(h || this.height);
  }

  _updateContentScale() {
    var box = this;
    if (!box.elContent) {
      return;
    }
    var scale = box.contentScale;
    if (scale === 1) {
      box.elContent.style.width = '100%';
      box.elContent.style.height = '100%';
      box.setTransform('content', 'scale', 1);
    } else {
      var hP = (1 / scale) * 100;
      var wP = hP;
      box.elContent.style.width = wP + '%';
      box.elContent.style.height = hP + '%';
      box.setTransform('content', 'scale', scale);
    }
  }

  validateSize() {
    var box = this;
    var mc = box.mc;
    var max = mc.state.canvas_max_area;
    var area = (box.width / box.state.scale) * (box.height / box.state.scale);
    if (area >= max) {
      mc.displayWarning('Your browser will not handle this kind of size');
    }
  }

  setTransform(target, type, ...args) {
    var box = this;
    var elTarget = target === 'content' ? box.elContent : box.el;
    var str = '(' + args.join(',') + ')';
    box.transform[target][type] = str;

    var out = Object.keys(box.transform[target])
      .map((k) => {
        return k + box.transform[target][k];
      })
      .join('');
    elTarget.style.transform = out;
  }

  resetContentTransform(target) {
    var elTarget = target === 'content' ? box.elContent : box.el;
    box.transform[target] = {};
    elTarget.style.transform = '';
  }

  calcRect() {
    return this.el.getBoundingClientRect();
  }

  get rect() {
    var sTop = this.el.scrollTop;
    var sLeft = this.el.scrollLeft;
    var rect = this.calcRect();
    return {
      bottom: rect.bottom - sTop,
      top: rect.top - sTop,
      left: rect.left - sLeft,
      right: rect.right - sLeft,
      width: rect.width,
      height: rect.height
    };
  }

  setTopLeft(opt) {
    var box = this;
    // unit conversion
    var newLeft = opt.inPx
      ? opt.left || box.left || 0
      : box.toLengthPixel(opt.left) || box.left || 0;
    var newTop = opt.inPx
      ? opt.top || box.top || 0
      : box.toLengthPixel(opt.top) || box.top || 0;

    // get limits
    var rBox = box.rect;
    var rParent = box.boxParent.rect;
    var rMax = box.boxBound.rect;
    var b = box.boundEdges;
    var dTop = rMax.top - rParent.top;
    var dLeft = rMax.left - rParent.left;

    // test colisions
    var hitLeft = b.left && rMax.left + newLeft - dLeft <= rMax.left;
    var hitRight =
      b.right && rMax.left + newLeft + rBox.width - dLeft >= rMax.right;
    var hitTop = b.top && rMax.top + newTop - dTop < rMax.top;
    var hitBottom =
      b.bottom && rMax.top + newTop + rBox.height - dTop >= rMax.bottom;

    // apply limits
    newLeft = hitLeft || hitRight ? box.left || 0 : newLeft;
    newTop = hitBottom || hitTop ? box.top || 0 : newTop;

    // snapping
    newLeft = box.snapToGrid(newLeft);
    newTop = box.snapToGrid(newTop);

    onNextFrame(() => {
      box.setTransform(
        'box',
        'translate3d',
        newLeft + 'px',
        newTop + 'px',
        '0'
      );
      box.top = newTop;
      box.left = newLeft;
      box.onDrag();
    });
    return {
      newLeft: newLeft,
      newTop: newTop,
      hitTop: hitTop,
      hitBottom: hitBottom,
      hitLeft: hitLeft,
      hitRight: hitRight,
      hitSomething: hitRight || hitLeft || hitTop || hitBottom
    };
  }

  snapToGrid(length) {
    var box = this;
    var res = box.state.grid_snap_size;
    //return Math.ceil(length / res) * res;
    return Math.round(length / res) * res;
  }

  setWidth(w, inPx) {
    var box = this;
    w = inPx ? w : box.toLengthPixel(w);
    w = box.snapToGrid(w);
    box.width = w;
    box.el.style.width = w + 'px';
    box.validateSize();
    box.onResize();
    return w;
  }

  setHeight(h, inPx) {
    var box = this;
    h = inPx ? h : box.toLengthPixel(h);
    h = box.snapToGrid(h);
    box.height = h;
    box.el.style.height = h + 'px';
    box.validateSize();
    box.onResize();
    return h;
  }

  displayDim() {
    var box = this;
    if (box.isBusy) {
      return;
    }
    var unit = box.state.unit;
    var w = box.toLengthUnit(box.width);
    var h = box.toLengthUnit(box.height);
    w = unit === 'in' ? Math.round(w * 100) / 100 : Math.round(w);
    h = unit === 'in' ? Math.round(h * 100) / 100 : Math.round(h);
    box.message.flash(w + ' x ' + h);
  }

  toLengthPixel(length) {
    var box = this;
    var state = box.state;
    var r = window.devicePixelRatio;
    length /= r;
    if (state.unit === 'px') {
      return length;
    }
    if (state.unit === 'mm') {
      length /= 25.4;
    }
    return state.dpi * length;
  }

  toLengthUnit(px) {
    var state = this.state;
    var r = window.devicePixelRatio;
    px *= r;
    if (state.unit === 'px') {
      return px;
    }
    var out = px / state.dpi;
    if (state.unit === 'mm') {
      out *= 25.4;
    }
    return out;
  }

  get contentScale() {
    return this._content_scale;
  }
  setContentScale(scale) {
    var box = this;
    box._content_scale = scale;
    box._updateContentScale();
    box.onResize();
    box.validateSize();
  }

  get textSize() {
    return this._text_size;
  }

  setTextSize(size) {
    var box = this;
    size = size < 5 ? 5 : size > 30 ? 30 : size ? size : 12;
    box._text_size = size;
    box.elContent.style.fontSize = size + 'px';
  }

  sizeTextMore() {
    var box = this;
    var size = box.textSize + 1;
    box.setTextSize(size);
  }
  sizeTextLess() {
    var box = this;
    var size = box.textSize - 1;
    box.setTextSize(size);
  }

  setScale(scale) {
    var box = this;
    box._scale = scale;
    box.setTransform('box', 'scale', scale);
  }

  makeDraggable() {
    var box = this;
    box.addHandleDrag();
  }

  makeResizable() {
    var box = this;
    box.addHandleResize();
  }
}

export {Box};

function dragResizeListener(e) {
  var box = this;
  var elTarget = e.target;
  var d = elTarget.dataset;
  // read the property of the handle;
  var idAction = d.mc_action;
  var idType = d.mc_event_type;
  var isDrag = idAction === 'box_drag';
  var isResize = idAction === 'box_resize';
  var isMouseDown = idType === 'mousedown';
  var isDragResize = isDrag || isResize;

  if (isMouseDown && isDragResize) {
    if (box.isDragging() || box.isResizing()) {
      return;
    }

    e.stopImmediatePropagation();

    if (isDrag) {
      box.setDragingFlag(true);
    }
    if (isResize) {
      box.setResizingFlag(true);
    }

    startDragResize({
      e: e,
      type: idAction,
      box: box
    });
  }
}

function startDragResize(opt) {
  var box = opt.box;
  var e = opt.e;
  var isDrag = opt.type === 'box_drag';
  var oX = box.left || 0;
  var oY = box.top || 0;
  var oW = box.width || 0;
  var oH = box.height || 0;
  var cX = e.clientX;
  var cY = e.clientY;
  var rDir = e.target.dataset.mc_resize_dir;

  box.lStore.addListener({
    target: window,
    type: 'mouseup',
    idGroup: 'drag_resize_active',
    callback: cancel,
    bind: box
  });

  box.lStore.addListener({
    target: window,
    type: 'mousemove',
    idGroup: 'drag_resize_active',
    callback: isDrag ? drag : resize,
    bind: box
  });

  function drag(e) {
    e.stopPropagation();
    const box = this;
    var dX = e.clientX - cX;
    var dY = e.clientY - cY;
    box.setTopLeft({
      left: oX + dX,
      top: oY + dY,
      inPx: true
    });
  }

  function resize(e) {
    e.stopPropagation();
    const box = this;
    var dX = e.clientX - cX;
    var dY = e.clientY - cY;
    var drag = {};
    if (rDir === 'left') {
      drag = box.setTopLeft({
        left: oX + dX,
        top: oY,
        inPx: true
      });
      if (!drag.hitLeft) {
        box.setWidth(oW - dX, true);
      }
    }
    if (rDir === 'top') {
      drag = box.setTopLeft({
        left: oX,
        top: oY + dY,
        inPx: true
      });
      if (!drag.hitTop) {
        box.setHeight(oH - dY, true);
      }
    }
    if (rDir === 'right') {
      box.setWidth(oW + dX, true);
    }
    if (rDir === 'bottom') {
      box.setHeight(oH + dY, true);
    }
  }

  function cancel() {
    const box = this;
    box.lStore.removeListenerByGroup('drag_resize_active');

    if (box.isDragging()) {
      box.setDragingFlag(false);
    }
    if (box.isResizing()) {
      box.setResizingFlag(false);
    }
  }
}
