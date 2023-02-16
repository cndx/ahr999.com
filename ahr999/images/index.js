!function(){var STK=function(){var a={};var b=[];a.inc=function(a,b){return true};a.register=function(c,d){var e=c.split(".");var f=a;var g=null;while(g=e.shift()){if(e.length){if(f[g]===undefined){f[g]={}}f=f[g]}else{if(f[g]===undefined){try{f[g]=d(a)}catch(h){b.push(h)}}}}};a.E=function(a){if(typeof a==="string"){return document.getElementById(a)}else{return a}};a.C=function(a){var b;a=a.toUpperCase();if(a=="TEXT"){b=document.createTextNode("")}else if(a=="BUFFER"){b=document.createDocumentFragment()}else{b=document.createElement(a)}return b};return a}();$Import=STK.inc;STK.register("core.json.queryToJson",function(a){return function(b,c){var d=a.core.str.trim(b).split("&");var e={};var f=function(a){if(c){return decodeURIComponent(a)}else{return a}};for(var g=0,h=d.length;g<h;g++){if(d[g]){var i=d[g].split("=");var j=i[0];var k=i[1];if(i.length<2){k=j;j="$nullName"}if(!e[j]){e[j]=f(k)}else{if(a.core.arr.isArray(e[j])!=true){e[j]=[e[j]]}e[j].push(f(k))}}}return e}});STK.register("core.util.easyTemplate",function(a){var b=function(a,c){if(!a){return""}if(a!==b.template){b.template=a;b.aStatement=b.parsing(b.separate(a))}var d=b.aStatement;var e=function(a){if(a){c=a}return arguments.callee};e.toString=function(){return(new Function(d[0],d[1]))(c)};return e};b.separate=function(a){var b=/\\'/g;var c=a.replace(/(<(\/?)#(.*?(?:\(.*?\))*)>)|(')|([\r\n\t])|(\$\{([^\}]*?)\})/g,function(a,c,d,e,f,g,h,i){if(c){return"{|}"+(d?"-":"+")+e+"{|}"}if(f){return"\\'"}if(g){return""}if(h){return"'+("+i.replace(b,"'")+")+'"}});return c};b.parsing=function(a){var b,c,d,e,f,g,h,i=["var aRet = [];"];h=a.split(/\{\|\}/);var j=/\s/;while(h.length){d=h.shift();if(!d){continue}f=d.charAt(0);if(f!=="+"&&f!=="-"){d="'"+d+"'";i.push("aRet.push("+d+");");continue}e=d.split(j);switch(e[0]){case"+et":b=e[1];c=e[2];i.push('aRet.push("<!--'+b+' start-->");');break;case"-et":i.push('aRet.push("<!--'+b+' end-->");');break;case"+if":e.splice(0,1);i.push("if"+e.join(" ")+"{");break;case"+elseif":e.splice(0,1);i.push("}else if"+e.join(" ")+"{");break;case"-if":i.push("}");break;case"+else":i.push("}else{");break;case"+list":i.push("if("+e[1]+".constructor === Array){with({i:0,l:"+e[1]+".length,"+e[3]+"_index:0,"+e[3]+":null}){for(i=l;i--;){"+e[3]+"_index=(l-i-1);"+e[3]+"="+e[1]+"["+e[3]+"_index];");break;case"-list":i.push("}}}");break;default:break}}i.push('return aRet.join("");');return[c,i.join("")]};return b});STK.register("core.dom.sizzle",function(a){return function(a,b){b=b||document;return b.querySelectorAll(a,b)}});STK.register("core.json.jsonToStr",function(a){return function(a,b,c){return JSON.stringify(a,b,c)}});STK.register("core.json.strToJson",function(a){return function(a,b){return JSON.parse(a,b)}});STK.register("core.dom.removeClassName",function(a){return function(b,c){if(b.nodeType===1){if(a.core.dom.hasClassName(b,c)){b.className=b.className.replace(new RegExp("(^|\\s)"+c+"($|\\s)")," ")}}}});STK.register("core.dom.addClassName",function(a){return function(b,c){if(b.nodeType===1){if(!a.core.dom.hasClassName(b,c)){b.className=a.trim(b.className)+" "+c}}}});STK.register("core.evt.delegatedEvent",function(a){var b=function(b,c){for(var d=0,e=b.length;d<e;d+=1){if(a.core.dom.contains(b[d],c)){return true}}return false};return function(c,d){if(!a.core.dom.isNode(c)){throw"core.evt.delegatedEvent need an Element as first Parameter"}if(!d){d=[]}if(a.core.arr.isArray(d)){d=[d]}var e={};var f=function(f){var g=a.core.evt.fixEvent(f);var h=g.target;var i=f.type;var j=null;var k=function(){var b,d,e;b=h.getAttribute("action-target");if(b){d=a.core.dom.sizzle(b,c);if(d.length){e=g.target=d[0]}}k=a.core.func.empty;return e};var l=function(){var b=k()||h;if(e[i]&&e[i][j]){return e[i][j]({evt:g,el:b,box:c,data:a.core.json.queryToJson(b.getAttribute("action-data")||"")})}else{return true}};if(b(d,h)){return false}else{if(!a.core.dom.contains(c,h)){return false}else{while(h&&h!==c){if(h.nodeType===1){j=h.getAttribute("action-type");if(j&&l()===false){break}}h=h.parentNode}}}};var g={};g.add=function(b,d,g){if(!e[d]){e[d]={};a.core.evt.addEvent(c,d,f)}var h=e[d];h[b]=g};g.remove=function(b,d){if(e[d]){delete e[d][b];if(a.core.obj.isEmpty(e[d])){delete e[d];a.core.evt.removeEvent(c,d,f)}}};g.pushExcept=function(a){d.push(a)};g.removeExcept=function(a){if(!a){d=[]}else{for(var b=0,c=d.length;b<c;b+=1){if(d[b]===a){d.splice(b,1)}}}};g.clearExcept=function(a){d=[]};g.destroy=function(){for(var b in e){for(var d in e[b]){delete e[b][d]}delete e[b];a.core.evt.removeEvent(c,b,f)}};return g}});STK.register("core.obj.isEmpty",function(a){return function(a,b){var c=true;for(var d in a){if(b){c=false;break}else{if(a.hasOwnProperty(d)){c=false;break}}}return c}});STK.register("core.arr.foreach",function(a){var b=function(a,b){var c=[];for(var d=0,e=a.length;d<e;d+=1){var f=b(a[d],d);if(f===false){break}else{if(f!==null){c[d]=f}}}return c};var c=function(a,b){var c={};for(var d in a){var e=b(a[d],d);if(e===false){break}else{if(e!==null){c[d]=e}}}return c};return function(d,e){if(a.core.arr.isArray(d)||d.length&&d[0]!==undefined){return b(d,e)}else{if(typeof d==="object"){return c(d,e)}}return null}});STK.register("core.dom.isNode",function(a){return function(a){return a!=undefined&&Boolean(a.nodeName)&&Boolean(a.nodeType)}});STK.register("core.arr.isArray",function(a){return function(a){return Object.prototype.toString.call(a)==="[object Array]"}});STK.register("core.evt.addEvent",function(a){return function(b,c,d){var e=a.E(b);if(e==null){return false}c=c||"click";if((typeof d).toLowerCase()!="function"){return}if(e.addEventListener){e.addEventListener(c,d,true)}else{if(e.attachEvent){e.attachEvent("on"+c,d)}else{e["on"+c]=d}}return true}});STK.register("core.evt.removeEvent",function(a){return function(b,c,d,e){var f=a.E(b);if(f==null){return false}if(typeof d!="function"){return false}if(f.removeEventListener){f.removeEventListener(c,d,e)}else{if(f.detachEvent){f.detachEvent("on"+c,d)}else{f["on"+c]=null}}return true}});STK.register("core.evt.getEvent",function(a){return function(){return document.addEventListener?function(){var a=arguments.callee,b;do{b=a.arguments[0];if(b&&(b.constructor==Event||b.constructor==MouseEvent||b.constructor==KeyboardEvent))return b}while(a=a.caller);return b}:function(a,b,c){return window.event}}()});STK.register("core.evt.fixEvent",function(a){return function(b){b=b||a.core.evt.getEvent();if(!b.target){b.target=b.srcElement;b.pageX=b.x;b.pageY=b.y}if(typeof b.layerX=="undefined"){b.layerX=b.offsetX}if(typeof b.layerY=="undefined"){b.layerY=b.offsetY}return b}});STK.register("core.util.cookie",function(a){var b={set:function(b,c,d){var e=[],f,g,h=a.core.obj.parseParam({expire:null,path:"/",domain:null,secure:null,encode:!0},d);h.encode==!0&&(c=escape(c));e.push(b+"="+c);h.path!=null&&e.push("path="+h.path);h.domain!=null&&e.push("domain="+h.domain);h.secure!=null&&e.push(h.secure);if(h.expire!=null){f=new Date;g=f.getTime()+h.expire*36e5;f.setTime(g);e.push("expires="+f.toGMTString())}document.cookie=e.join(";")},get:function(a){a=a.replace(/([\.\[\]\$])/g,"\\$1");var b=new RegExp(a+"=([^;]*)?;","i"),c=document.cookie+";",d=c.match(b);return d?d[1]||"":""},remove:function(a,c){c=c||{};c.expire=-10;b.set(a,"",c)}};return b});STK.register("core.dom.contains",function(a){return function(a,b){if(a===b){return false}else{if(a.compareDocumentPosition){return(a.compareDocumentPosition(b)&16)===16}else{if(a.contains&&b.nodeType===1){return a.contains(b)}else{while(b=b.parentNode){if(a===b){return true}}}}}return false}});STK.register("core.func.empty",function(){return function(){}});STK.register("core.str.trim",function(a){return function(a){if(typeof a!=="string"){throw"trim need a string as parameter"}return a.trim()}});STK.register("core.dom.hasClassName",function(a){return function(a,b){return(new RegExp("(^|\\s)"+b+"($|\\s)")).test(a.className)}});STK.register("core.io.getXHR",function(a){return function(){return new XMLHttpRequest}});STK.register("core.util.URL",function(a){return function(b,c){var d=a.core.obj.parseParam({isEncodeQuery:false,isEncodeHash:false},c||{});var e={};var f=a.core.str.parseURL(b);var g=a.core.json.queryToJson(f.query);var h=a.core.json.queryToJson(f.hash);e.setParam=function(a,b){g[a]=b;return this};e.getParam=function(a){return g[a]};e.setParams=function(a){for(var b in a){e.setParam(b,a[b])}return this};e.setHash=function(a,b){h[a]=b;return this};e.getHash=function(a){return h[a]};e.valueOf=e.toString=function(){var b=[];var c=a.core.json.jsonToQuery(g,d.isEncodeQuery);var e=a.core.json.jsonToQuery(h,d.isEncodeQuery);if(f.scheme!=""){b.push(f.scheme+":");b.push(f.slash)}if(f.host!=""){b.push(f.host);if(f.port!=""){b.push(":");b.push(f.port)}}b.push("/");b.push(f.path);if(c!=""){b.push("?"+c)}if(e!=""){b.push("#"+e)}return b.join("")};return e}});STK.register("core.json.jsonToQuery",function(a){var b=function(b,c){b=b==null?"":b;b=a.core.str.trim(b.toString());if(c){return encodeURIComponent(b)}else{return b}};return function(a,c){var d=[];if(typeof a=="object"){for(var e in a){if(e==="$nullName"){d=d.concat(a[e]);continue}if(a[e]instanceof Array){for(var f=0,g=a[e].length;f<g;f++){d.push(e+"="+b(a[e][f],c))}}else{if(typeof a[e]!="function"){d.push(e+"="+b(a[e],c))}}}}if(d.length){return d.join("&")}else{return""}}});STK.register("core.str.parseURL",function(a){return function(a){var b=/^(?:([A-Za-z]+):(\/{0,3}))?([0-9.\-A-Za-z]+\.[0-9A-Za-z]+)?(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;var c=["url","scheme","slash","host","port","path","query","hash"];var d=b.exec(a);var e={};for(var f=0,g=c.length;f<g;f+=1){e[c[f]]=d[f]||""}return e}});STK.register("core.util.getUniqueKey",function(a){var b=(new Date).getTime().toString(),c=1;return function(){return b+c++}});STK.register("core.io.jsonp",function(a){return function(b){var c=a.core.obj.parseParam({url:"",charset:"UTF-8",timeout:30*1e3,args:{},onComplete:null,onTimeout:null,responseName:null,isEncode:false,varkey:"callback"},b);var d=-1;var e=c.responseName||"STK_"+a.core.util.getUniqueKey();c.args[c.varkey]=e;var f=c.onComplete;var g=c.onTimeout;window[e]=function(a){if(d!=2&&f!=null){d=1;f(a)}};c.onComplete=null;c.onTimeout=function(){if(d!=1&&g!=null){d=2;g()}};return a.core.io.scriptLoader(c)}});STK.register("core.io.ajax",function($){return function(oOpts){var opts=$.core.obj.parseParam({url:"",charset:"UTF-8",timeout:30*1e3,args:{},onComplete:null,onTimeout:$.core.func.empty,uniqueID:null,onFail:$.core.func.empty,method:"get",asynchronous:true,header:{},isEncode:false,responseType:"json"},oOpts);if(opts.url==""){throw"ajax need url in parameters object"}var tm;var trans=$.core.io.getXHR();var cback=function(){if(trans.readyState==4){clearTimeout(tm);var data="";if(opts["responseType"]==="xml"){data=trans.responseXML}else{if(opts["responseType"]==="text"){data=trans.responseText}else{try{if(trans.responseText&&typeof trans.responseText==="string"){data=eval("("+trans.responseText+")")}else{data={}}}catch(exp){data=opts["url"]+"return error : data error"}}}if(trans.status==200){if(opts["onComplete"]!=null){opts["onComplete"](data)}}else{if(trans.status==0){}else{if(opts["onFail"]!=null){opts["onFail"](data,trans)}}}}else{if(opts["onTraning"]!=null){opts["onTraning"](trans)}}};trans.onreadystatechange=cback;if(!opts["header"]["Content-Type"]){opts["header"]["Content-Type"]="application/x-www-form-urlencoded"}if(!opts["header"]["X-Requested-With"]){opts["header"]["X-Requested-With"]="XMLHttpRequest"}if(opts["method"].toLocaleLowerCase()=="get"){var url=$.core.util.URL(opts["url"],{isEncodeQuery:opts["isEncode"]});url.setParams(opts["args"]);url.setParam("__rnd",(new Date).valueOf());trans.open(opts["method"],url,opts["asynchronous"]);try{for(var k in opts["header"]){trans.setRequestHeader(k,opts["header"][k])}}catch(exp){}trans.send("")}else{trans.open(opts["method"],opts["url"],opts["asynchronous"]);try{for(var k in opts["header"]){trans.setRequestHeader(k,opts["header"][k])}}catch(exp){}trans.send($.core.json.jsonToQuery(opts["args"],opts["isEncode"]))}if(opts["timeout"]){tm=setTimeout(function(){try{trans.abort();opts["onTimeout"]({},trans);opts["onFail"]({},trans)}catch(a){}},opts["timeout"])}return trans}});STK.register("core.obj.parseParam",function(a){return function(a,b,c){var d,e={};b=b||{};for(d in a){e[d]=a[d];if(b[d]!=null){if(c){if(a.hasOwnProperty[d]){e[d]=b[d]}}else{e[d]=b[d]}}}return e}});STK.register("core.func.getType",function(a){return function(a){var b;return((b=typeof a)=="object"?a==null&&"null"||Object.prototype.toString.call(a).slice(8,-1):b).toLowerCase()}});STK.register("core.dom.setStyleObjs",function(a){return function(b,c,d){if(a.getType(c)==="object"){for(var e in c){b.style[e]=c[e]}}else if(a.getType(c==="string")){b.style[c]=d}}});STK.register("core.dom.builder",function(a){return function(b){if(typeof b!=="string"){b=b.innerHTML}var c,d={},e=/\<(\w+)[^>]*\s+node-type\s*=\s*([\'\"])?(\w+)\2.*?>/g;while(c=e.exec(b)){d[c[3]]=a.sizzle("[node-type="+c[3]+"]")}for(var f in d){if(d[f].length===1){d[f]=d[f][0]}else{if(d[f].length===0){d[f]=null}}}return d}});STK.register("core.io.scriptLoader",function(a){var b={};var c={url:"",charset:"UTF-8",timeout:30*1e3,args:{},onComplete:a.core.func.empty,onTimeout:null,isEncode:false,uniqueID:null};return function(d){var e,f;var g=a.core.obj.parseParam(c,d);if(g.url==""){throw"scriptLoader: url is null"}var h=(new Date).getTime();e=b[h];if(e!=null&&a.IE!=true){a.core.dom.removeNode(e);e=null}if(e==null){e=b[h]=a.C("script")}e.charset=g.charset;e.id="scriptRequest_script_"+h;e.type="text/javascript";if(g.onComplete!=null){if(a.IE){e["onreadystatechange"]=function(){if(e.readyState.toLowerCase()=="loaded"||e.readyState.toLowerCase()=="complete"){try{clearTimeout(f);document.getElementsByTagName("head")[0].removeChild(e);e["onreadystatechange"]=null}catch(a){}g.onComplete()}}}else{e["onload"]=function(){try{clearTimeout(f);a.core.dom.removeNode(e)}catch(b){}g.onComplete()}}}e.src=STK.core.util.URL(g.url,{isEncodeQuery:g["isEncode"]}).setParams(g.args);document.getElementsByTagName("head")[0].appendChild(e);if(g.timeout>0&&g.onTimeout!=null){f=setTimeout(function(){try{document.getElementsByTagName("head")[0].removeChild(e)}catch(a){}g.onTimeout()},g.timeout)}return e}});STK.register("core.io.cssLoader",function(a){return function(b,c,d){var e=a.sizzle("head",document)[0];var f=document.createElement("link");var g=null;var h=300;f.setAttribute("rel","Stylesheet");f.setAttribute("type","text/css");f.setAttribute("charset","utf-8");f.setAttribute("href",b);e.appendChild(f);var i=document.createElement("div");i.setAttribute("id",d);this.hideAppendChild(i);g=function(){if(parseInt(window.getComputedStyle?getComputedStyle(i,null)["height"]:i.currentStyle&&i.currentStyle["height"])===42){a.hideRemoveChild(i);c();return}if(--h>0){setTimeout(g,10)}else{a.hideRemoveChild(i);throw b+" timeout!"}};setTimeout(g,50)}});var hideDiv=null;STK.register("core.dom.hideAppendChild",function(a){var b=document.head||document.getElementsByTagName("head")[0]||document.documentElement;return function(a){if(!hideDiv){(hideDiv=document.createElement("div")).style.cssText="position:absolute;top:-9999px;";b.appendChild(hideDiv)}hideDiv.appendChild(a)}});STK.register("core.dom.hideRemoveChild",function(a){return function(a){hideDiv&&hideDiv.removeChild(a)}});STK.register("core.dom.extend",function(a){return function(a,b,c){for(var d in b){if(c&&(this.isPlainObject(b[d])||this.isArray(b[d]))){if(this.isPlainObject(b[d])&&!this.isPlainObject(a[d]))a[d]={};if(this.isArray(b[d])&&!this.isArray(a[d]))a[d]=[];this.extend(a[d],b[d],c)}else if(b[d]!==undefined){a[d]=b[d]}}return a}});STK.register("core.dom.setStyle",function(a){return function(b,c,d){if(a.IE){switch(c){case"opacity":b.style.filter="alpha(opacity="+d*100+")";if(!b.currentStyle||!b.currentStyle.hasLayout){b.style.zoom=1}break;case"float":c="styleFloat";default:b.style[c]=d}}else{if(c=="float"){c="cssFloat"}b.style[c]=d}}});STK.register("core.dom.getSize",function(a){return function(a){if(a!=null&&a==a.window){return{w:a.innerWidth,h:a.innerHeight}}if(b!=null&&b.nodeType==b.DOCUMENT_NODE){return{w:a.documentElement.scrollWidth,h:a.documentElement.scrollHeight}}var b=function(a){var b;if(a.style.display==="none"){a.style.visibility="hidden";a.style.display="";b=a.getBoundingClientRect();a.style.display="none";a.style.visibility=""}else if(a.tagName.toUpperCase()==="INPUT"&&a.type==="hidden"){a.type="text";a.style.visibility="hidden";b=a.getBoundingClientRect();a.style.visibility="";a.type="hidden"}else{b=a.getBoundingClientRect()}return{l:b.left+window.pageXOffset,t:b.top+window.pageYOffset,w:Math.round(b.width),h:Math.round(b.height)}};return{w:b.w,h:b.h}}});STK.register("core.dom.insertHTML",function(a){return function(b,c,d){b=a.E(b)||document.body;d=d?d.toLowerCase():"beforeend";if(b.insertAdjacentHTML){switch(d){case"beforebegin":b.insertAdjacentHTML("BeforeBegin",c);return b.previousSibling;case"afterbegin":b.insertAdjacentHTML("AfterBegin",c);return b.firstChild;case"beforeend":b.insertAdjacentHTML("BeforeEnd",c);return b.lastChild;case"afterend":b.insertAdjacentHTML("AfterEnd",c);return b.nextSibling}throw'Illegal insertion point -> "'+d+'"'}else{var e=b.ownerDocument.createRange();var f;switch(d){case"beforebegin":e.setStartBefore(b);f=e.createContextualFragment(c);b.parentNode.insertBefore(f,b);return b.previousSibling;case"afterbegin":if(b.firstChild){e.setStartBefore(b.firstChild);f=e.createContextualFragment(c);b.insertBefore(f,b.firstChild);return b.firstChild}else{b.innerHTML=c;return b.firstChild}break;case"beforeend":if(b.lastChild){e.setStartAfter(b.lastChild);f=e.createContextualFragment(c);b.appendChild(f);return b.lastChild}else{b.innerHTML=c;return b.lastChild}break;case"afterend":e.setStartAfter(b);f=e.createContextualFragment(c);b.parentNode.insertBefore(f,b.nextSibling);return b.nextSibling}throw'Illegal insertion point -> "'+d+'"'}}});STK.register("core.dom.removeNode",function(a){return function(b){b=a.E(b)||b;try{b.parentNode.removeChild(b)}catch(c){}}});STK.register("core.dom.scrollTop",function(a){return function(){Math.max(window.pageYOffset||0,document.documentElement.scrollTop,document.body.scrollTop)}});STK.register("core.util.hideContainer",function(a){var b;var c=function(){if(b)return;b=a.C("div");b.style.cssText="position:absolute;top:-9999px;left:-9999px;";document.getElementsByTagName("head")[0].appendChild(b)};var d={appendChild:function(d){if(a.core.dom.isNode(d)){c();b.appendChild(d)}},removeChild:function(c){if(a.core.dom.isNode(c)){b&&b.removeChild(c)}}};return d});(function(){STK.queryToJson=STK.core.json.queryToJson;STK.sizzle=STK.core.dom.sizzle;STK.strToJson=STK.core.json.strToJson;STK.removeClassName=STK.core.dom.removeClassName;STK.addClassName=STK.core.dom.addClassName;STK.delegatedEvent=STK.core.evt.delegatedEvent;STK.foreach=STK.core.arr.foreach;STK.trim=STK.core.str.trim;STK.ajax=STK.core.io.ajax;STK.jsonToQuery=STK.core.json.jsonToQuery;STK.parseParam=STK.core.obj.parseParam;STK.getType=STK.core.func.getType;STK.setStyleObjs=STK.core.dom.setStyleObjs;STK.addEvent=STK.core.evt.addEvent;STK.removeEvent=STK.core.evt.removeEvent;STK.scriptLoader=STK.core.io.scriptLoader;STK.cssLoader=STK.core.io.cssLoader;STK.hideAppendChild=STK.core.dom.hideAppendChild;STK.extend=STK.core.dom.extend;STK.isEmpty=STK.core.obj.isEmpty;STK.setStyle=STK.core.dom.setStyle;STK.getSize=STK.core.dom.getSize;STK.hideRemoveChild=STK.core.dom.hideRemoveChild;STK.insertHTML=STK.core.dom.insertHTML;STK.removeNode=STK.core.dom.removeNode;STK.scrollTop=STK.core.dom.scrollTop;STK.hasClassName=STK.core.dom.hasClassName;STK.jsonp=STK.core.io.jsonp;STK.jsonToStr=STK.core.json.jsonToStr})();
STK.register("pl.vplus.payReadModule.source.init",function(a){var b="<#et tname data>"+'<div class="VPLUS_payread_btn">'+'<p class="vplus_btn_box">'+"<#if (data.btn_url) >"+'<a href="${data.btn_url}" target="_blank" class="vplus_btn">${data.btn_text}</a>'+"<#else>"+'<a href="javascript:;" class="vplus_btn">${data.btn_text}</a>'+"</#if>"+"</p>"+"<#if (data.btn_desc) >"+"<p>${data.btn_desc}</p>"+"</#if>"+"</div>"+"</#et>";var c="<#et tname data>"+'<div class="VPLUS_payread_btn_h5">'+'<div class="vplus_btn_box">'+"<#if (data.btn_url) >"+'<a href="${data.btn_url}" target="_blank" class="vplus_btn">${data.btn_text}</a>'+"<#else>"+'<a href="javascript:;" class="vplus_btn">${data.btn_text}</a>'+"</#if>"+"</div>"+"<#if (data.btn_desc) >"+"<p>${data.btn_desc}</p>"+"</#if>"+"</div>"+"</#et>";return function(d,e,f){var g=(new Date).getTime();var h=["//img.t.sinajs.cn/t6/appstyle/e_subscribe/vplus/payread_btn/css/main.css?version="];var i,j,k,l,m,n,o,p,q,r={};var s={DOM:{},objs:{},mObjs:{},DOM_eventFun:{},dom_fun:{renderBtn:function(e){var f={};var g=e.body_btn;var h=e.footer_btn;var i=e.ua=="h5"?c:b;if(g&&g.text){f["btn_text"]=g.text||"";f["btn_url"]=g.url||"";f["btn_desc"]=g.desc||""}else if(h&&h.text){f["btn_text"]=h.text||"";f["btn_url"]=h.url||"";f["btn_desc"]=h.desc||""}else{f["btn_text"]=""}if(!f["btn_text"])return;d.innerHTML=a.core.util.easyTemplate(i,f)},addStyle:function(){var b;for(var c=0,d=h.length;c<d;c++){b=a.C("link");b.setAttribute("href",h[c]+s.objs.version);b.setAttribute("type","text/css");b.setAttribute("rel","stylesheet");b.setAttribute("charset","utf-8");a.sizzle("head")[0].appendChild(b)}}}};i=function(){if(!d){throw new Error("node没有定义")}};j=function(){};k=function(){s.objs.strData=a.strToJson(f||d.getAttribute("action-data"))||{};s.objs.version=s.objs.strData.version||g;var b=s.objs.strData.body_btn;var c=s.objs.strData.footer_btn;if(!(b&&b.text)&&!(c&&c.text)){return}s.dom_fun.addStyle();s.dom_fun.renderBtn(s.objs.strData);window.bee&&bee.init({spapv:{disable:true},clicks:{hots:false},error:{disable:true},key:"e37d918f"})};l=function(){};n=function(){};o=function(){};m=function(){s.mObjs.boxEvt=a.delegatedEvent(d)};p=function(){if(s){a.foreach(s.objs,function(a){if(a.destroy){a.destroy()}});s=null}};q=function(){i();j();k();l();n();o();m()};q();r.destroy=p;return r}});
STK.register("pl.vplus.payReadModule.index",function(a){var b=a.E("vplus_payread");return a.pl.vplus.payReadModule.source.init(b)})}();
