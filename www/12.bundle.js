webpackJsonp([12],{87:function(e,t){e.exports={version:8,name:"mx_white",glyphs:"mapbox://fonts/mapbox/{fontstack}/{range}.pbf",sprite:"/sprites/sprite",sources:{mapbox_base:{type:"vector",url:"mapbox://mapbox.mapbox-terrain-v2,mapbox.mapbox-streets-v7"},mapbox_unepgrid_countries:{url:"mapbox://unepgrid.6idtkx33",type:"vector"},here_aerial:{type:"raster",tiles:["https://1.aerial.maps.cit.api.here.com/maptile/2.1/basetile/newest/satellite.day/{z}/{x}/{y}/512/jpg?app_id=j3k8xvtSG9tIDj8p4XzG&app_code=F9UZTC8S02uMWNm8W0ZJVA&ppi=72","https://1.aerial.maps.cit.api.here.com/maptile/2.1/basetile/newest/satellite.day/{z}/{x}/{y}/512/jpg?app_id=j3k8xvtSG9tIDj8p4XzG&app_code=F9UZTC8S02uMWNm8W0ZJVA&ppi=72"]}},layers:[{id:"background",type:"background",interactive:!0,layout:{visibility:"visible"},paint:{"background-color":"rgb(255,255,255)","background-opacity":1}},{id:"waterway",type:"line",source:"mapbox_base","source-layer":"waterway",interactive:!0,layout:{visibility:"visible","line-cap":"round","line-join":"round"},paint:{"line-opacity":{base:1,stops:[[0,0],[22,.8]]},"line-color":"hsla(0, 0%, 45%, 0.6)","line-blur":0,"line-width":1}},{id:"water",type:"fill",source:"mapbox_base","source-layer":"water",interactive:!0,layout:{visibility:"visible"},paint:{"fill-color":"hsl(0, 0%, 45%)","fill-opacity":1,"fill-outline-color":"hsla(0, 0%, 45%, 0.55)","fill-antialias":!0}},{id:"here_aerial",type:"raster",source:"here_aerial",layout:{visibility:"none"}},{id:"mxlayers",type:"background",layout:{visibility:"none"},paint:{"background-color":"rgb(255,0,0)","background-opacity":0}},{id:"country-code",type:"fill",source:"mapbox_unepgrid_countries","source-layer":"mx_country_un_iso3code",filter:["all",["!has","iso3code"],["==","$type","Polygon"]],layout:{visibility:"visible"},paint:{"fill-color":"rgba(220,220,220,0.8)"}},{id:"shade-56",type:"fill",source:"mapbox_base","source-layer":"hillshade",interactive:!0,filter:["all",["==","class","shadow"],["==","level",56]],layout:{visibility:"visible"},paint:{"fill-color":"hsla(0, 0%, 0%, 0.05)","fill-outline-color":"hsla(0,0,0,0)"}},{id:"shade-67",type:"fill",source:"mapbox_base","source-layer":"hillshade",interactive:!0,filter:["all",["==","class","shadow"],["==","level",67]],layout:{visibility:"visible"},paint:{"fill-color":"hsla(0, 0%, 0%, 0.05)","fill-outline-color":"hsla(0,0,0,0)"}},{id:"shade-78",type:"fill",source:"mapbox_base","source-layer":"hillshade",interactive:!0,filter:["all",["==","class","shadow"],["==","level",78]],layout:{visibility:"visible"},paint:{"fill-color":"hsla(0, 0%, 0%,  0.05)","fill-outline-color":"hsla(0,0,0,0)"}},{id:"shade-89",type:"fill",source:"mapbox_base","source-layer":"hillshade",interactive:!0,filter:["all",["==","class","shadow"],["==","level",89]],layout:{visibility:"visible"},paint:{"fill-color":"hsla(0, 0%, 0%, 0.05)","fill-outline-color":"hsla(0,0,0,0)"}},{id:"high-90",type:"fill",source:"mapbox_base","source-layer":"hillshade",interactive:!0,filter:["all",["==","$type","Polygon"],["all",["==","class","highlight"],["==","level",90]]],layout:{visibility:"visible"},paint:{"fill-color":"hsla(0, 0%, 100%, 0.05)","fill-outline-color":"hsla(0,0,0,0)"}},{id:"high-94",type:"fill",source:"mapbox_base","source-layer":"hillshade",interactive:!0,filter:["all",["==","class","highlight"],["==","level",94]],layout:{visibility:"visible"},paint:{"fill-color":"hsla(0, 0%, 100%, 0.05)","fill-outline-color":"hsla(0,0,0,0)"}},{id:"road-minor",type:"line",source:"mapbox_base","source-layer":"road",interactive:!0,filter:["all",["!in","type","aerialway","piste"],["in","class","motorway_link","path","service","street","street_limited"]],layout:{"line-cap":"round","line-join":"round"},paint:{"line-width":{base:1.6,stops:[[6,0],[20,2]]},"line-color":"hsl(0, 56%, 26%)"}},{id:"road-major",type:"line",source:"mapbox_base","source-layer":"road",interactive:!0,filter:["in","class","main","major_rail","motorway","motorway_link"],layout:{"line-cap":"round","line-join":"round"},paint:{"line-color":"hsl(0, 56%, 26%)","line-width":{base:1.6,stops:[[6,0],[20,5]]}}},{id:"road-street-minor",type:"line",source:"mapbox_base","source-layer":"road",interactive:!0,filter:["all",["!in","type","aerialway","cycleway","footway","piste"],["in","class","driveway","path","service","street_limited"]],layout:{visibility:"none"},paint:{"line-color":"rgba(201,197,197,1)","line-opacity":1,"line-width":.5}},{id:"road-footway",type:"line",source:"mapbox_base","source-layer":"road",interactive:!0,filter:["all",["==","class","path"],["==","type","footway"]],layout:{visibility:"none"},paint:{"line-color":"rgba(143,140,140,1)","line-dasharray":[5,2]}},{id:"road-cycleway",type:"line",source:"mapbox_base","source-layer":"road",interactive:!0,filter:["all",["==","class","path"],["==","type","cycleway"]],layout:{visibility:"none"},paint:{"line-color":"rgba(97,151,201,1)","line-dasharray":[5,3],"line-opacity":1}},{id:"road-piste",type:"line",source:"mapbox_base","source-layer":"road",interactive:!0,filter:["all",["==","class","path"],["==","type","piste"]],layout:{visibility:"none"},paint:{"line-color":"rgba(107,105,105,1)","line-width":{base:1,stops:[[15,1.5],[18,3]]}}},{id:"building-line",type:"line",source:"mapbox_base","source-layer":"building",interactive:!0,layout:{},paint:{"line-color":{base:1,stops:[[14,"rgba(10,10,10,1)"],[22,"rgba(120,120,120,1)"]]},"line-blur":.5,"line-opacity":{base:1,stops:[[14,.05],[18,.5],[22,1]]}}},{id:"building-fill",type:"fill",source:"mapbox_base","source-layer":"building",interactive:!0,layout:{},paint:{"fill-opacity":{base:1,stops:[[14,.4],[18,.6]]},"fill-translate":[0,0]}},{id:"poi-label",type:"symbol",source:"mapbox_base","source-layer":"poi_label",interactive:!0,filter:["in","type","Alpine Hut","Attraction","Bed And Breakfast","Biergarten","Golf Course","Hotel","Yes"],layout:{visibility:"visible","text-field":"{name_en}","text-size":{base:1,stops:[[15,10],[18,12]]},"text-font":["Arial Unicode MS Regular"]},paint:{"text-opacity":.75,"text-color":"rgba(15,15,15,1)","text-halo-color":"rgba(255,255,255,1)","text-halo-blur":0,"text-halo-width":1.5}},{id:"path-label",type:"symbol",source:"mapbox_base","source-layer":"road_label",interactive:!0,filter:["==","class","path"],layout:{"text-size":{base:1.4,stops:[[14,9.5],[22,14]]},"text-max-angle":45,"text-transform":"uppercase","text-font":["Arial Unicode MS Regular"],"symbol-placement":"line",visibility:"visible","text-offset":[0,-.1],"text-rotation-alignment":"map","text-anchor":"center","text-field":"{name_en}"},paint:{"text-color":"rgba(48,47,47,1)","text-halo-color":"rgba(252,252,252,1)","text-halo-width":21}},{id:"water-label",type:"symbol",source:"mapbox_base","source-layer":"water_label",interactive:!0,layout:{"text-size":{base:1,stops:[[10,9],[16,14],[22,20]]},"text-transform":"uppercase","text-font":["Arial Unicode MS Regular"],"symbol-placement":"point",visibility:"visible","text-rotation-alignment":"map","text-keep-upright":{base:1,stops:[[0,!0],[22,!0]]},"text-field":"{name_en}","text-rotate":-45,"text-letter-spacing":{base:1,stops:[[9,.5],[14,1]]},"text-max-width":20},paint:{"text-color":"hsl(0, 0%, 100%)","text-halo-color":"hsla(0, 0%, 18%, 0.8)","text-halo-width":{base:1,stops:[[14,1],[22,2]]}}},{id:"water-label-lg",type:"symbol",source:"mapbox_base","source-layer":"water_label",interactive:!0,filter:[">=","area","258500"],layout:{"text-size":{base:1,stops:[[10,10],[16,16],[22,22]]},"text-transform":"uppercase","text-font":["Noto Sans CJK KR Medium","Arial Unicode MS Regular"],"symbol-placement":"point",visibility:"none","text-rotation-alignment":"map","text-keep-upright":{base:1,stops:[[0,!0],[22,!0]]},"text-field":"{name_en}","text-rotate":-45,"text-letter-spacing":{base:1,stops:[[9,.5],[14,1]]},"text-max-width":20},paint:{"text-color":"#62b0f0","text-halo-color":"rgba(252,252,252,0.8)","text-halo-width":{base:1,stops:[[14,1],[22,2]]}}},{id:"waterway-label",type:"symbol",source:"mapbox_base","source-layer":"waterway_label",interactive:!0,layout:{"text-size":{base:1,stops:[[10,10],[16,16],[22,22]]},"text-transform":"uppercase","text-font":["Arial Unicode MS Regular"],"symbol-placement":"point",visibility:"visible","text-rotation-alignment":"map","text-keep-upright":{base:1,stops:[[0,!0],[22,!0]]},"text-field":"{name_en}","text-rotate":-45,"text-letter-spacing":{base:1,stops:[[9,.5],[14,1]]},"text-max-width":20},paint:{"text-color":"hsl(0, 0%, 33%)","text-halo-color":"rgba(252,252,252,0.8)","text-halo-width":{base:1,stops:[[14,1],[22,2]]}}},{id:"road-label",type:"symbol",source:"mapbox_base","source-layer":"road_label",interactive:!0,filter:["!in","class","aerialway","path"],layout:{"text-size":{base:1.4,stops:[[6,7],[14,9],[22,14]]},"text-max-angle":45,"text-transform":"uppercase","text-font":["Arial Unicode MS Regular"],"symbol-placement":"line",visibility:"visible","text-offset":[0,-.1],"text-rotation-alignment":"map","text-anchor":"center","text-field":"{name_en}"},paint:{"text-color":"rgba(122,118,118,1)","text-halo-color":"rgba(252,252,252,1)"}},{id:"place-label-city",type:"symbol",source:"mapbox_base","source-layer":"place_label",interactive:!0,filter:["all",["<","localrank",14],["in","type","city","hamlet","neighbourhood","suburb","town","village"],["!=","capital",2]],layout:{visibility:"visible","text-field":"{name_en}","text-font":["Arial Unicode MS Regular"],"text-size":{base:1,stops:[[10,10],[17,16],[22,35]]},"text-letter-spacing":.2,"text-transform":"uppercase","text-offset":[0,0],"text-anchor":"bottom"},paint:{"text-color":"rgba(48,48,48,1)","text-halo-color":"#000","text-halo-blur":0,"text-halo-width":0,"text-translate":[0,-5]}},{id:"country-label",type:"symbol",source:"mapbox_base","source-layer":"country_label",layout:{visibility:"visible","text-field":"{name_en}","text-font":["Arial Unicode MS Bold"],"text-size":{base:1,stops:[[1,6],[18,45]]},"text-letter-spacing":.4,"text-transform":"uppercase"},paint:{"text-color":"hsl(0, 0%, 0%)","text-halo-width":0,"text-halo-color":"#000"}},{id:"maritime",type:"line",source:"mapbox_base","source-layer":"admin",interactive:!0,filter:["==","maritime",1],layout:{visibility:"visible"},paint:{"line-color":"rgba(255,255,255,1)","line-dasharray":[3,2],"line-width":{base:1,stops:[[0,.5],[8,1],[14,2],[22,4]]},"line-opacity":{base:1,stops:[[0,.9],[6,1]]}}},{id:"place-label-capital",type:"symbol",source:"mapbox_base","source-layer":"place_label",interactive:!0,filter:["==","capital",2],layout:{"text-font":["Arial Unicode MS Regular"],visibility:"visible","icon-image":"t_b_squares_01","icon-size":.2,"icon-offset":[0,0],"icon-rotation-alignment":"viewport"},paint:{"icon-translate":[0,0]}},{id:"boundaries_2",type:"line",source:"mapbox_base","source-layer":"admin",interactive:!0,filter:["all",["==","admin_level",2],["==","maritime",0]],layout:{visibility:"visible","line-join":"bevel"},paint:{"line-color":"hsla(0, 0%, 22%, 0.66)","line-dasharray":[3,2],"line-width":{base:1,stops:[[0,.5],[22,2]]},"line-opacity":{base:1,stops:[[0,.9],[6,1]]}}},{id:"boundaries_3-4",type:"line",source:"mapbox_base","source-layer":"admin",interactive:!0,filter:["all",["==","maritime",0],["in","admin_level",3,4]],layout:{visibility:"visible","line-join":"bevel"},paint:{"line-color":"hsla(0, 0%, 17%, 0.66)","line-dasharray":[3,2],"line-width":{base:1,stops:[[0,.5],[22,1]]},"line-opacity":{base:.8,stops:[[0,0],[22,1]]}}},{id:"boundaries_disputed",type:"line",source:"mapbox_base","source-layer":"admin",interactive:!0,filter:["all",["==","$type","LineString"],["all",["==","admin_level",2],["==","disputed",1]]],layout:{},paint:{"line-color":"rgb(80,80,80)","line-dasharray":[3,2]}}]}}});