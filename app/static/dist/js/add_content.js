/*! For license information please see add_content.js.LICENSE.txt */
(()=>{"use strict";var e={395:(e,t,i)=>{i.d(t,{G:()=>f}),i(6550);var n={"U+0008":"backspace","U+0009":"tab","U+001B":"esc","U+0020":"space","U+007F":"del"},r={8:"backspace",9:"tab",13:"enter",27:"esc",33:"pageup",34:"pagedown",35:"end",36:"home",32:"space",37:"left",38:"up",39:"right",40:"down",46:"del",106:"*"},s={shift:"shiftKey",ctrl:"ctrlKey",alt:"altKey",meta:"metaKey"},a=/[a-z0-9*]/,o=/U\+/,l=/^arrow/,p=/^space(bar)?/,d=/^escape$/;function c(e,t){var i="";if(e){var n=e.toLowerCase();" "===n||p.test(n)?i="space":d.test(n)?i="esc":1==n.length?t&&!a.test(n)||(i=n):i=l.test(n)?n.replace("arrow",""):"multiply"==n?"*":n}return i}function h(e,t){return i=t,s=e.hasModifiers,(i.key?c(i.key,s):i.detail&&i.detail.key?c(i.detail.key,s):(l="",(a=i.keyIdentifier)&&(a in n?l=n[a]:o.test(a)?(a=parseInt(a.replace("U+","0x"),16),l=String.fromCharCode(a).toLowerCase()):l=a.toLowerCase()),l||function(e){var t="";return Number(e)&&(t=e>=65&&e<=90?String.fromCharCode(32+e):e>=112&&e<=123?"f"+(e-112+1):e>=48&&e<=57?String(e-48):e>=96&&e<=105?String(e-96):r[e]),t}(i.keyCode)||""))===e.key&&(!e.hasModifiers||!!t.shiftKey==!!e.shiftKey&&!!t.ctrlKey==!!e.ctrlKey&&!!t.altKey==!!e.altKey&&!!t.metaKey==!!e.metaKey);var i,s,a,l}function u(e){return e.trim().split(" ").map((function(e){return function(e){return 1===e.length?{combo:e,key:e,event:"keydown"}:e.split("+").reduce((function(e,t){var i=t.split(":"),n=i[0],r=i[1];return n in s?(e[s[n]]=!0,e.hasModifiers=!0):(e.key=n,e.event=r||"keydown"),e}),{combo:e.split(":").shift()})}(e)}))}const f={properties:{keyEventTarget:{type:Object,value:function(){return this}},stopKeyboardEventPropagation:{type:Boolean,value:!1},_boundKeyHandlers:{type:Array,value:function(){return[]}},_imperativeKeyBindings:{type:Object,value:function(){return{}}}},observers:["_resetKeyEventListeners(keyEventTarget, _boundKeyHandlers)"],keyBindings:{},registered:function(){this._prepKeyBindings()},attached:function(){this._listenKeyEventListeners()},detached:function(){this._unlistenKeyEventListeners()},addOwnKeyBinding:function(e,t){this._imperativeKeyBindings[e]=t,this._prepKeyBindings(),this._resetKeyEventListeners()},removeOwnKeyBindings:function(){this._imperativeKeyBindings={},this._prepKeyBindings(),this._resetKeyEventListeners()},keyboardEventMatchesKeys:function(e,t){for(var i=u(t),n=0;n<i.length;++n)if(h(i[n],e))return!0;return!1},_collectKeyBindings:function(){var e=this.behaviors.map((function(e){return e.keyBindings}));return-1===e.indexOf(this.keyBindings)&&e.push(this.keyBindings),e},_prepKeyBindings:function(){for(var e in this._keyBindings={},this._collectKeyBindings().forEach((function(e){for(var t in e)this._addKeyBinding(t,e[t])}),this),this._imperativeKeyBindings)this._addKeyBinding(e,this._imperativeKeyBindings[e]);for(var t in this._keyBindings)this._keyBindings[t].sort((function(e,t){var i=e[0].hasModifiers;return i===t[0].hasModifiers?0:i?-1:1}))},_addKeyBinding:function(e,t){u(e).forEach((function(e){this._keyBindings[e.event]=this._keyBindings[e.event]||[],this._keyBindings[e.event].push([e,t])}),this)},_resetKeyEventListeners:function(){this._unlistenKeyEventListeners(),this.isAttached&&this._listenKeyEventListeners()},_listenKeyEventListeners:function(){this.keyEventTarget&&Object.keys(this._keyBindings).forEach((function(e){var t=this._keyBindings[e],i=this._onKeyBindingEvent.bind(this,t);this._boundKeyHandlers.push([this.keyEventTarget,e,i]),this.keyEventTarget.addEventListener(e,i)}),this)},_unlistenKeyEventListeners:function(){for(var e,t,i,n;this._boundKeyHandlers.length;)t=(e=this._boundKeyHandlers.pop())[0],i=e[1],n=e[2],t.removeEventListener(i,n)},_onKeyBindingEvent:function(e,t){if(this.stopKeyboardEventPropagation&&t.stopPropagation(),!t.defaultPrevented)for(var i=0;i<e.length;i++){var n=e[i][0],r=e[i][1];if(h(n,t)&&(this._triggerKeyHandler(n,r,t),t.defaultPrevented))return}},_triggerKeyHandler:function(e,t,i){var n=Object.create(e);n.keyboardEvent=i;var r=new CustomEvent(e.event,{detail:n,cancelable:!0});this[t].call(this,r),r.defaultPrevented&&i.preventDefault()}}},2190:(e,t,i)=>{i.d(t,{$:()=>s,P:()=>a}),i(6550),i(299);var n=i(395),r=i(8876);const s={properties:{pressed:{type:Boolean,readOnly:!0,value:!1,reflectToAttribute:!0,observer:"_pressedChanged"},toggles:{type:Boolean,value:!1,reflectToAttribute:!0},active:{type:Boolean,value:!1,notify:!0,reflectToAttribute:!0},pointerDown:{type:Boolean,readOnly:!0,value:!1},receivedFocusFromKeyboard:{type:Boolean,readOnly:!0},ariaActiveAttribute:{type:String,value:"aria-pressed",observer:"_ariaActiveAttributeChanged"}},listeners:{down:"_downHandler",up:"_upHandler",tap:"_tapHandler"},observers:["_focusChanged(focused)","_activeChanged(active, ariaActiveAttribute)"],keyBindings:{"enter:keydown":"_asyncClick","space:keydown":"_spaceKeyDownHandler","space:keyup":"_spaceKeyUpHandler"},_mouseEventRe:/^mouse/,_tapHandler:function(){this.toggles?this._userActivate(!this.active):this.active=!1},_focusChanged:function(e){this._detectKeyboardFocus(e),e||this._setPressed(!1)},_detectKeyboardFocus:function(e){this._setReceivedFocusFromKeyboard(!this.pointerDown&&e)},_userActivate:function(e){this.active!==e&&(this.active=e,this.fire("change"))},_downHandler:function(e){this._setPointerDown(!0),this._setPressed(!0),this._setReceivedFocusFromKeyboard(!1)},_upHandler:function(){this._setPointerDown(!1),this._setPressed(!1)},_spaceKeyDownHandler:function(e){var t=e.detail.keyboardEvent,i=(0,r.vz)(t).localTarget;this.isLightDescendant(i)||(t.preventDefault(),t.stopImmediatePropagation(),this._setPressed(!0))},_spaceKeyUpHandler:function(e){var t=e.detail.keyboardEvent,i=(0,r.vz)(t).localTarget;this.isLightDescendant(i)||(this.pressed&&this._asyncClick(),this._setPressed(!1))},_asyncClick:function(){this.async((function(){this.click()}),1)},_pressedChanged:function(e){this._changedButtonState()},_ariaActiveAttributeChanged:function(e,t){t&&t!=e&&this.hasAttribute(t)&&this.removeAttribute(t)},_activeChanged:function(e,t){this.toggles?this.setAttribute(this.ariaActiveAttribute,e?"true":"false"):this.removeAttribute(this.ariaActiveAttribute),this._changedButtonState()},_controlStateChanged:function(){this.disabled?this._setPressed(!1):this._changedButtonState()},_changedButtonState:function(){this._buttonStateChanged&&this._buttonStateChanged()}},a=[n.G,s]},299:(e,t,i)=>{i.d(t,{a:()=>n}),i(6550),i(8876);const n={properties:{focused:{type:Boolean,value:!1,notify:!0,readOnly:!0,reflectToAttribute:!0},disabled:{type:Boolean,value:!1,notify:!0,observer:"_disabledChanged",reflectToAttribute:!0},_oldTabIndex:{type:String},_boundFocusBlurHandler:{type:Function,value:function(){return this._focusBlurHandler.bind(this)}}},observers:["_changedControlState(focused, disabled)"],ready:function(){this.addEventListener("focus",this._boundFocusBlurHandler,!0),this.addEventListener("blur",this._boundFocusBlurHandler,!0)},_focusBlurHandler:function(e){this._setFocused("focus"===e.type)},_disabledChanged:function(e,t){this.setAttribute("aria-disabled",e?"true":"false"),this.style.pointerEvents=e?"none":"",e?(this._oldTabIndex=this.getAttribute("tabindex"),this._setFocused(!1),this.tabIndex=-1,this.blur()):void 0!==this._oldTabIndex&&(null===this._oldTabIndex?this.removeAttribute("tabindex"):this.setAttribute("tabindex",this._oldTabIndex))},_changedControlState:function(){this._controlStateChanged&&this._controlStateChanged()}}},6358:(e,t,i)=>{i(6550);const n=i(1121).d`
<custom-style>
  <style is="custom-style">
    [hidden] {
      display: none !important;
    }
  </style>
</custom-style>
<custom-style>
  <style is="custom-style">
    html {

      --layout: {
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
      };

      --layout-inline: {
        display: -ms-inline-flexbox;
        display: -webkit-inline-flex;
        display: inline-flex;
      };

      --layout-horizontal: {
        @apply --layout;

        -ms-flex-direction: row;
        -webkit-flex-direction: row;
        flex-direction: row;
      };

      --layout-horizontal-reverse: {
        @apply --layout;

        -ms-flex-direction: row-reverse;
        -webkit-flex-direction: row-reverse;
        flex-direction: row-reverse;
      };

      --layout-vertical: {
        @apply --layout;

        -ms-flex-direction: column;
        -webkit-flex-direction: column;
        flex-direction: column;
      };

      --layout-vertical-reverse: {
        @apply --layout;

        -ms-flex-direction: column-reverse;
        -webkit-flex-direction: column-reverse;
        flex-direction: column-reverse;
      };

      --layout-wrap: {
        -ms-flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
      };

      --layout-wrap-reverse: {
        -ms-flex-wrap: wrap-reverse;
        -webkit-flex-wrap: wrap-reverse;
        flex-wrap: wrap-reverse;
      };

      --layout-flex-auto: {
        -ms-flex: 1 1 auto;
        -webkit-flex: 1 1 auto;
        flex: 1 1 auto;
      };

      --layout-flex-none: {
        -ms-flex: none;
        -webkit-flex: none;
        flex: none;
      };

      --layout-flex: {
        -ms-flex: 1 1 0.000000001px;
        -webkit-flex: 1;
        flex: 1;
        -webkit-flex-basis: 0.000000001px;
        flex-basis: 0.000000001px;
      };

      --layout-flex-2: {
        -ms-flex: 2;
        -webkit-flex: 2;
        flex: 2;
      };

      --layout-flex-3: {
        -ms-flex: 3;
        -webkit-flex: 3;
        flex: 3;
      };

      --layout-flex-4: {
        -ms-flex: 4;
        -webkit-flex: 4;
        flex: 4;
      };

      --layout-flex-5: {
        -ms-flex: 5;
        -webkit-flex: 5;
        flex: 5;
      };

      --layout-flex-6: {
        -ms-flex: 6;
        -webkit-flex: 6;
        flex: 6;
      };

      --layout-flex-7: {
        -ms-flex: 7;
        -webkit-flex: 7;
        flex: 7;
      };

      --layout-flex-8: {
        -ms-flex: 8;
        -webkit-flex: 8;
        flex: 8;
      };

      --layout-flex-9: {
        -ms-flex: 9;
        -webkit-flex: 9;
        flex: 9;
      };

      --layout-flex-10: {
        -ms-flex: 10;
        -webkit-flex: 10;
        flex: 10;
      };

      --layout-flex-11: {
        -ms-flex: 11;
        -webkit-flex: 11;
        flex: 11;
      };

      --layout-flex-12: {
        -ms-flex: 12;
        -webkit-flex: 12;
        flex: 12;
      };

      /* alignment in cross axis */

      --layout-start: {
        -ms-flex-align: start;
        -webkit-align-items: flex-start;
        align-items: flex-start;
      };

      --layout-center: {
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      };

      --layout-end: {
        -ms-flex-align: end;
        -webkit-align-items: flex-end;
        align-items: flex-end;
      };

      --layout-baseline: {
        -ms-flex-align: baseline;
        -webkit-align-items: baseline;
        align-items: baseline;
      };

      /* alignment in main axis */

      --layout-start-justified: {
        -ms-flex-pack: start;
        -webkit-justify-content: flex-start;
        justify-content: flex-start;
      };

      --layout-center-justified: {
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
      };

      --layout-end-justified: {
        -ms-flex-pack: end;
        -webkit-justify-content: flex-end;
        justify-content: flex-end;
      };

      --layout-around-justified: {
        -ms-flex-pack: distribute;
        -webkit-justify-content: space-around;
        justify-content: space-around;
      };

      --layout-justified: {
        -ms-flex-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
      };

      --layout-center-center: {
        @apply --layout-center;
        @apply --layout-center-justified;
      };

      /* self alignment */

      --layout-self-start: {
        -ms-align-self: flex-start;
        -webkit-align-self: flex-start;
        align-self: flex-start;
      };

      --layout-self-center: {
        -ms-align-self: center;
        -webkit-align-self: center;
        align-self: center;
      };

      --layout-self-end: {
        -ms-align-self: flex-end;
        -webkit-align-self: flex-end;
        align-self: flex-end;
      };

      --layout-self-stretch: {
        -ms-align-self: stretch;
        -webkit-align-self: stretch;
        align-self: stretch;
      };

      --layout-self-baseline: {
        -ms-align-self: baseline;
        -webkit-align-self: baseline;
        align-self: baseline;
      };

      /* multi-line alignment in main axis */

      --layout-start-aligned: {
        -ms-flex-line-pack: start;  /* IE10 */
        -ms-align-content: flex-start;
        -webkit-align-content: flex-start;
        align-content: flex-start;
      };

      --layout-end-aligned: {
        -ms-flex-line-pack: end;  /* IE10 */
        -ms-align-content: flex-end;
        -webkit-align-content: flex-end;
        align-content: flex-end;
      };

      --layout-center-aligned: {
        -ms-flex-line-pack: center;  /* IE10 */
        -ms-align-content: center;
        -webkit-align-content: center;
        align-content: center;
      };

      --layout-between-aligned: {
        -ms-flex-line-pack: justify;  /* IE10 */
        -ms-align-content: space-between;
        -webkit-align-content: space-between;
        align-content: space-between;
      };

      --layout-around-aligned: {
        -ms-flex-line-pack: distribute;  /* IE10 */
        -ms-align-content: space-around;
        -webkit-align-content: space-around;
        align-content: space-around;
      };

      /*******************************
                Other Layout
      *******************************/

      --layout-block: {
        display: block;
      };

      --layout-invisible: {
        visibility: hidden !important;
      };

      --layout-relative: {
        position: relative;
      };

      --layout-fit: {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      };

      --layout-scroll: {
        -webkit-overflow-scrolling: touch;
        overflow: auto;
      };

      --layout-fullbleed: {
        margin: 0;
        height: 100vh;
      };

      /* fixed position */

      --layout-fixed-top: {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
      };

      --layout-fixed-right: {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
      };

      --layout-fixed-bottom: {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
      };

      --layout-fixed-left: {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
      };

    }
  </style>
</custom-style>`;n.setAttribute("style","display: none;"),document.head.appendChild(n.content);var r=document.createElement("style");r.textContent="[hidden] { display: none !important; }",document.head.appendChild(r)},7122:(e,t,i)=>{i.d(t,{V:()=>n}),i(6550);const n={properties:{name:{type:String},value:{notify:!0,type:String},required:{type:Boolean,value:!1}},attached:function(){},detached:function(){}}},6505:(e,t,i)=>{var n=i(6550),r=i(3505);(0,r.k)({is:"iron-request",hostAttributes:{hidden:!0},properties:{xhr:{type:Object,notify:!0,readOnly:!0,value:function(){return new XMLHttpRequest}},response:{type:Object,notify:!0,readOnly:!0,value:function(){return null}},status:{type:Number,notify:!0,readOnly:!0,value:0},statusText:{type:String,notify:!0,readOnly:!0,value:""},completes:{type:Object,readOnly:!0,notify:!0,value:function(){return new Promise(function(e,t){this.resolveCompletes=e,this.rejectCompletes=t}.bind(this))}},progress:{type:Object,notify:!0,readOnly:!0,value:function(){return{}}},aborted:{type:Boolean,notify:!0,readOnly:!0,value:!1},errored:{type:Boolean,notify:!0,readOnly:!0,value:!1},timedOut:{type:Boolean,notify:!0,readOnly:!0,value:!1}},get succeeded(){if(this.errored||this.aborted||this.timedOut)return!1;var e=this.xhr.status||0;return 0===e||e>=200&&e<300},send:function(e){var t=this.xhr;if(t.readyState>0)return null;t.addEventListener("progress",function(e){this._setProgress({lengthComputable:e.lengthComputable,loaded:e.loaded,total:e.total}),this.fire("iron-request-progress-changed",{value:this.progress})}.bind(this)),t.addEventListener("error",function(t){this._setErrored(!0),this._updateStatus();var i=e.rejectWithRequest?{error:t,request:this}:t;this.rejectCompletes(i)}.bind(this)),t.addEventListener("timeout",function(t){this._setTimedOut(!0),this._updateStatus();var i=e.rejectWithRequest?{error:t,request:this}:t;this.rejectCompletes(i)}.bind(this)),t.addEventListener("abort",function(){this._setAborted(!0),this._updateStatus();var t=new Error("Request aborted."),i=e.rejectWithRequest?{error:t,request:this}:t;this.rejectCompletes(i)}.bind(this)),t.addEventListener("loadend",function(){if(this._updateStatus(),this._setResponse(this.parseResponse()),this.succeeded)this.resolveCompletes(this);else{var t=new Error("The request failed with status code: "+this.xhr.status),i=e.rejectWithRequest?{error:t,request:this}:t;this.rejectCompletes(i)}}.bind(this)),this.url=e.url;var i=!1!==e.async;t.open(e.method||"GET",e.url,i);var r={json:"application/json",text:"text/plain",html:"text/html",xml:"application/xml",arraybuffer:"application/octet-stream"}[e.handleAs],s=e.headers||Object.create(null),a=Object.create(null);for(var o in s)a[o.toLowerCase()]=s[o];if(s=a,r&&!s.accept&&(s.accept=r),Object.keys(s).forEach((function(e){/[A-Z]/.test(e)&&n.XY._error("Headers must be lower case, got",e),t.setRequestHeader(e,s[e])}),this),i){t.timeout=e.timeout;var l=e.handleAs;!e.jsonPrefix&&l||(l="text"),t.responseType=t._responseType=l,e.jsonPrefix&&(t._jsonPrefix=e.jsonPrefix)}t.withCredentials=!!e.withCredentials;var p=this._encodeBodyObject(e.body,s["content-type"]);return t.send(p),this.completes},parseResponse:function(){var e=this.xhr,t=e.responseType||e._responseType,i=!this.xhr.responseType,n=e._jsonPrefix&&e._jsonPrefix.length||0;try{switch(t){case"json":if(i||void 0===e.response)try{return JSON.parse(e.responseText)}catch(t){return console.warn("Failed to parse JSON sent from "+e.responseURL),null}return e.response;case"xml":return e.responseXML;case"blob":case"document":case"arraybuffer":return e.response;default:if(n)try{return JSON.parse(e.responseText.substring(n))}catch(t){return console.warn("Failed to parse JSON sent from "+e.responseURL),null}return e.responseText}}catch(e){this.rejectCompletes(new Error("Could not parse response. "+e.message))}},abort:function(){this._setAborted(!0),this.xhr.abort()},_encodeBodyObject:function(e,t){if("string"==typeof e)return e;var i=e;switch(t){case"application/json":return JSON.stringify(i);case"application/x-www-form-urlencoded":return this._wwwFormUrlEncode(i)}return e},_wwwFormUrlEncode:function(e){if(!e)return"";var t=[];return Object.keys(e).forEach((function(i){t.push(this._wwwFormUrlEncodePiece(i)+"="+this._wwwFormUrlEncodePiece(e[i]))}),this),t.join("&")},_wwwFormUrlEncodePiece:function(e){return null!=e&&e.toString?encodeURIComponent(e.toString().replace(/\r?\n/g,"\r\n")).replace(/%20/g,"+"):""},_updateStatus:function(){this._setStatus(this.xhr.status),this._setStatusText(void 0===this.xhr.statusText?"":this.xhr.statusText)}}),(0,r.k)({is:"iron-ajax",hostAttributes:{hidden:!0},properties:{url:{type:String},params:{type:Object,value:function(){return{}}},method:{type:String,value:"GET"},headers:{type:Object,value:function(){return{}}},contentType:{type:String,value:null},body:{type:Object,value:null},sync:{type:Boolean,value:!1},handleAs:{type:String,value:"json"},withCredentials:{type:Boolean,value:!1},timeout:{type:Number,value:0},auto:{type:Boolean,value:!1},verbose:{type:Boolean,value:!1},lastRequest:{type:Object,notify:!0,readOnly:!0},lastProgress:{type:Object,notify:!0,readOnly:!0},loading:{type:Boolean,notify:!0,readOnly:!0},lastResponse:{type:Object,notify:!0,readOnly:!0},lastError:{type:Object,notify:!0,readOnly:!0},activeRequests:{type:Array,notify:!0,readOnly:!0,value:function(){return[]}},debounceDuration:{type:Number,value:0,notify:!0},jsonPrefix:{type:String,value:""},bubbles:{type:Boolean,value:!1},rejectWithRequest:{type:Boolean,value:!1},_boundHandleResponse:{type:Function,value:function(){return this._handleResponse.bind(this)}}},observers:["_requestOptionsChanged(url, method, params.*, headers, contentType, body, sync, handleAs, jsonPrefix, withCredentials, timeout, auto)"],created:function(){this._boundOnProgressChanged=this._onProgressChanged.bind(this)},get queryString(){var e,t,i=[];for(e in this.params)if(t=this.params[e],e=window.encodeURIComponent(e),Array.isArray(t))for(var n=0;n<t.length;n++)i.push(e+"="+window.encodeURIComponent(t[n]));else null!==t?i.push(e+"="+window.encodeURIComponent(t)):i.push(e);return i.join("&")},get requestUrl(){var e=this.queryString,t=this.url||"";if(e){var i=t.indexOf("?")>=0?"&":"?";return t+i+e}return t},get requestHeaders(){var e,t={},i=this.contentType;if(null==i&&"string"==typeof this.body&&(i="application/x-www-form-urlencoded"),i&&(t["content-type"]=i),"object"==typeof this.headers)for(e in this.headers)t[e]=this.headers[e].toString();return t},_onProgressChanged:function(e){this._setLastProgress(e.detail.value)},toRequestOptions:function(){return{url:this.requestUrl||"",method:this.method,headers:this.requestHeaders,body:this.body,async:!this.sync,handleAs:this.handleAs,jsonPrefix:this.jsonPrefix,withCredentials:this.withCredentials,timeout:this.timeout,rejectWithRequest:this.rejectWithRequest}},generateRequest:function(){var e=document.createElement("iron-request"),t=this.toRequestOptions();return this.push("activeRequests",e),e.completes.then(this._boundHandleResponse).catch(this._handleError.bind(this,e)).then(this._discardRequest.bind(this,e)),this.fire("iron-ajax-presend",{request:e,options:t},{bubbles:this.bubbles,cancelable:!0}).defaultPrevented?(e.abort(),e.rejectCompletes(e),e):(this.lastRequest&&this.lastRequest.removeEventListener("iron-request-progress-changed",this._boundOnProgressChanged),e.addEventListener("iron-request-progress-changed",this._boundOnProgressChanged),e.send(t),this._setLastProgress(null),this._setLastRequest(e),this._setLoading(!0),this.fire("request",{request:e,options:t},{bubbles:this.bubbles,composed:!0}),this.fire("iron-ajax-request",{request:e,options:t},{bubbles:this.bubbles,composed:!0}),e)},_handleResponse:function(e){e===this.lastRequest&&(this._setLastResponse(e.response),this._setLastError(null),this._setLoading(!1)),this.fire("response",e,{bubbles:this.bubbles,composed:!0}),this.fire("iron-ajax-response",e,{bubbles:this.bubbles,composed:!0})},_handleError:function(e,t){this.verbose&&n.XY._error(t),e===this.lastRequest&&(this._setLastError({request:e,error:t,status:e.xhr.status,statusText:e.xhr.statusText,response:e.xhr.response}),this._setLastResponse(null),this._setLoading(!1)),this.fire("iron-ajax-error",{request:e,error:t},{bubbles:this.bubbles,composed:!0}),this.fire("error",{request:e,error:t},{bubbles:this.bubbles,composed:!0})},_discardRequest:function(e){var t=this.activeRequests.indexOf(e);t>-1&&this.splice("activeRequests",t,1)},_requestOptionsChanged:function(){this.debounce("generate-request",(function(){null!=this.url&&this.auto&&this.generateRequest()}),this.debounceDuration)}});var s=i(8876),a=i(1121);(0,r.k)({_template:a.d`
    <style>
      :host {
        display: block;
      }
    </style>

    <!-- This form is used to collect the elements that should be submitted -->
    <slot></slot>

    <!-- This form is used for submission -->
    <form id="helper" action\$="[[action]]" method\$="[[method]]" enctype\$="[[enctype]]"></form>
`,is:"iron-form",properties:{allowRedirect:{type:Boolean,value:!1},headers:{type:Object,value:function(){return{}}},withCredentials:{type:Boolean,value:!1}},attached:function(){this._form||(this._form=(0,s.vz)(this).querySelector("form"),this._form?(this._init(),this.async(this._saveInitialValues.bind(this),1)):this._nodeObserver=(0,s.vz)(this).observeNodes(function(e){for(var t=0;t<e.addedNodes.length;t++)"FORM"===e.addedNodes[t].tagName&&(this._form=e.addedNodes[t],this._init(),(0,s.vz)(this).unobserveNodes(this._nodeObserver),this._nodeObserver=null)}.bind(this)))},detached:function(){this._nodeObserver&&((0,s.vz)(this).unobserveNodes(this._nodeObserver),this._nodeObserver=null)},_init:function(){this._form.addEventListener("submit",this.submit.bind(this)),this._form.addEventListener("reset",this.reset.bind(this)),this._defaults=this._defaults||new WeakMap,this._saveInitialValues()},saveResetValues:function(){this._saveInitialValues(!0)},_saveInitialValues:function(e){for(var t=this._getValidatableElements(),i=0;i<t.length;i++){var n=t[i];if(!this._defaults.has(n)||e){var r={value:n.value};"checked"in n&&(r.checked=n.checked),"invalid"in n&&(r.invalid=n.invalid),this._defaults.set(n,r)}}},validate:function(){if(!this._form)return!1;if(""===this._form.getAttribute("novalidate"))return!0;for(var e,t=this._form.checkValidity(),i=this._getValidatableElements(),n=0;e=i[n],n<i.length;n++){var r=e;r.validate&&(t=!!r.validate()&&t)}return t},submit:function(e){if(e&&e.preventDefault(),this._form)if(this.validate()){this.$.helper.textContent="";var t=this.serializeForm();if(this.allowRedirect){for(var i in t)this.$.helper.appendChild(this._createHiddenElement(i,t[i]));this.$.helper.action=this._form.getAttribute("action"),this.$.helper.method=this._form.getAttribute("method")||"GET",this.$.helper.contentType=this._form.getAttribute("enctype")||"application/x-www-form-urlencoded",this.$.helper.submit(),this.fire("iron-form-submit")}else this._makeAjaxRequest(t)}else this.fire("iron-form-invalid")},reset:function(e){if(e&&e.preventDefault(),this._form)if(e&&"reset"===e.type&&e.target===this._form){for(var t=this._getValidatableElements(),i=0;i<t.length;i++){var n=t[i];if(this._defaults.has(n)){var r=this._defaults.get(n);for(var s in r)n[s]=r[s]}}this.fire("iron-form-reset")}else this._form.reset()},serializeForm:function(){for(var e=this._getSubmittableElements(),t={},i=0;i<e.length;i++)for(var n=this._serializeElementValues(e[i]),r=0;r<n.length;r++)this._addSerializedElement(t,e[i].name,n[r]);return t},_handleFormResponse:function(e){this.fire("iron-form-response",e.detail)},_handleFormError:function(e){this.fire("iron-form-error",e.detail)},_makeAjaxRequest:function(e){this.request||(this.request=document.createElement("iron-ajax"),this.request.addEventListener("response",this._handleFormResponse.bind(this)),this.request.addEventListener("error",this._handleFormError.bind(this))),this.request.url=this._form.getAttribute("action"),this.request.method=this._form.getAttribute("method")||"GET",this.request.contentType=this._form.getAttribute("enctype")||"application/x-www-form-urlencoded",this.request.withCredentials=this.withCredentials,this.request.headers=this.headers,"POST"===this._form.method.toUpperCase()?this.request.body=e:this.request.params=e,this.fire("iron-form-presubmit",{},{cancelable:!0}).defaultPrevented||(this.request.generateRequest(),this.fire("iron-form-submit",e))},_getValidatableElements:function(){return this._findElements(this._form,!0,!1)},_getSubmittableElements:function(){return this._findElements(this._form,!1,!1)},_findElements:function(e,t,i,n){n=n||[];for(var r=(0,s.vz)(e).querySelectorAll("*"),a=0;a<r.length;a++)i||"slot"!==r[a].localName&&"content"!==r[a].localName?this._searchSubmittable(n,r[a],t):this._searchSubmittableInSlot(n,r[a],t);return n},_searchSubmittableInSlot:function(e,t,i){for(var n=(0,s.vz)(t).getDistributedNodes(),r=0;r<n.length;r++)if(n[r].nodeType!==Node.TEXT_NODE){this._searchSubmittable(e,n[r],i);for(var a=(0,s.vz)(n[r]).querySelectorAll("*"),o=0;o<a.length;o++)this._searchSubmittable(e,a[o],i)}},_searchSubmittable:function(e,t,i){this._isSubmittable(t,i)?e.push(t):t.root&&this._findElements(t.root,i,!0,e)},_isSubmittable:function(e,t){return!e.disabled&&(t?e.name||"function"==typeof e.validate:e.name)},_serializeElementValues:function(e){var t=e.tagName.toLowerCase();return"button"===t||"input"===t&&("submit"===e.type||"reset"===e.type)?[]:"select"===t?this._serializeSelectValues(e):"input"===t?this._serializeInputValues(e):e._hasIronCheckedElementBehavior&&!e.checked?[]:[e.value]},_serializeSelectValues:function(e){for(var t=[],i=0;i<e.options.length;i++)e.options[i].selected&&t.push(e.options[i].value);return t},_serializeInputValues:function(e){var t=e.type.toLowerCase();return("checkbox"!==t&&"radio"!==t||e.checked)&&"file"!==t?[e.value]:[]},_createHiddenElement:function(e,t){var i=document.createElement("input");return i.setAttribute("type","hidden"),i.setAttribute("name",e),i.setAttribute("value",t),i},_addSerializedElement:function(e,t,i){void 0===e[t]?e[t]=i:(Array.isArray(e[t])||(e[t]=[e[t]]),e[t].push(i))}})},3041:(e,t,i)=>{i.d(t,{x:()=>o}),i(6550);var n=i(3505);class r{constructor(e){r[" "](e),this.type=e&&e.type||"default",this.key=e&&e.key,e&&"value"in e&&(this.value=e.value)}get value(){var e=this.type,t=this.key;if(e&&t)return r.types[e]&&r.types[e][t]}set value(e){var t=this.type,i=this.key;t&&i&&(t=r.types[t]=r.types[t]||{},null==e?delete t[i]:t[i]=e)}get list(){if(this.type){var e=r.types[this.type];return e?Object.keys(e).map((function(e){return s[this.type][e]}),this):[]}}byKey(e){return this.key=e,this.value}}r[" "]=function(){},r.types={};var s=r.types;(0,n.k)({is:"iron-meta",properties:{type:{type:String,value:"default"},key:{type:String},value:{type:String,notify:!0},self:{type:Boolean,observer:"_selfChanged"},__meta:{type:Boolean,computed:"__computeMeta(type, key, value)"}},hostAttributes:{hidden:!0},__computeMeta:function(e,t,i){var n=new r({type:e,key:t});return void 0!==i&&i!==n.value?n.value=i:this.value!==n.value&&(this.value=n.value),n},get list(){return this.__meta&&this.__meta.list},_selfChanged:function(e){e&&(this.value=this)},byKey:function(e){return new r({type:this.type,key:e}).value}});let a=null;const o={properties:{validator:{type:String},invalid:{notify:!0,reflectToAttribute:!0,type:Boolean,value:!1,observer:"_invalidChanged"}},registered:function(){a=new r({type:"validator"})},_invalidChanged:function(){this.invalid?this.setAttribute("aria-invalid","true"):this.removeAttribute("aria-invalid")},get _validator(){return a&&a.byKey(this.validator)},hasValidator:function(){return null!=this._validator},validate:function(e){return void 0===e&&void 0!==this.value?this.invalid=!this._getValidity(this.value):this.invalid=!this._getValidity(e),!this.invalid},_getValidity:function(e){return!this.hasValidator()||this._validator.validate(e)}}},2710:(e,t,i)=>{i.d(t,{K:()=>d}),i(6550);var n=i(7122),r=i(3041);const s={properties:{checked:{type:Boolean,value:!1,reflectToAttribute:!0,notify:!0,observer:"_checkedChanged"},toggles:{type:Boolean,value:!0,reflectToAttribute:!0},value:{type:String,value:"on",observer:"_valueChanged"}},observers:["_requiredChanged(required)"],created:function(){this._hasIronCheckedElementBehavior=!0},_getValidity:function(e){return this.disabled||!this.required||this.checked},_requiredChanged:function(){this.required?this.setAttribute("aria-required","true"):this.removeAttribute("aria-required")},_checkedChanged:function(){this.active=this.checked,this.fire("iron-change")},_valueChanged:function(){void 0!==this.value&&null!==this.value||(this.value="on")}},a=[n.V,r.x,s];var o=i(1583),l=i(8996);const p={_checkedChanged:function(){s._checkedChanged.call(this),this.hasRipple()&&(this.checked?this._ripple.setAttribute("checked",""):this._ripple.removeAttribute("checked"))},_buttonStateChanged:function(){l.o._buttonStateChanged.call(this),this.disabled||this.isAttached&&(this.checked=this.active)}},d=[o.B,a,p]},1583:(e,t,i)=>{i.d(t,{B:()=>o,S:()=>a}),i(6550);var n=i(2190),r=i(299),s=i(8996);const a={observers:["_focusedChanged(receivedFocusFromKeyboard)"],_focusedChanged:function(e){e&&this.ensureRipple(),this.hasRipple()&&(this._ripple.holdDown=e)},_createRipple:function(){var e=s.o._createRipple();return e.id="ink",e.setAttribute("center",""),e.classList.add("circle"),e}},o=[n.P,r.a,s.o,a]},8996:(e,t,i)=>{i.d(t,{o:()=>c}),i(6550);var n=i(395),r=i(3505),s=i(8876),a=i(1121),o={distance:function(e,t,i,n){var r=e-i,s=t-n;return Math.sqrt(r*r+s*s)},now:window.performance&&window.performance.now?window.performance.now.bind(window.performance):Date.now};function l(e){this.element=e,this.width=this.boundingRect.width,this.height=this.boundingRect.height,this.size=Math.max(this.width,this.height)}function p(e){this.element=e,this.color=window.getComputedStyle(e).color,this.wave=document.createElement("div"),this.waveContainer=document.createElement("div"),this.wave.style.backgroundColor=this.color,this.wave.classList.add("wave"),this.waveContainer.classList.add("wave-container"),(0,s.vz)(this.waveContainer).appendChild(this.wave),this.resetInteractionState()}l.prototype={get boundingRect(){return this.element.getBoundingClientRect()},furthestCornerDistanceFrom:function(e,t){var i=o.distance(e,t,0,0),n=o.distance(e,t,this.width,0),r=o.distance(e,t,0,this.height),s=o.distance(e,t,this.width,this.height);return Math.max(i,n,r,s)}},p.MAX_RADIUS=300,p.prototype={get recenters(){return this.element.recenters},get center(){return this.element.center},get mouseDownElapsed(){var e;return this.mouseDownStart?(e=o.now()-this.mouseDownStart,this.mouseUpStart&&(e-=this.mouseUpElapsed),e):0},get mouseUpElapsed(){return this.mouseUpStart?o.now()-this.mouseUpStart:0},get mouseDownElapsedSeconds(){return this.mouseDownElapsed/1e3},get mouseUpElapsedSeconds(){return this.mouseUpElapsed/1e3},get mouseInteractionSeconds(){return this.mouseDownElapsedSeconds+this.mouseUpElapsedSeconds},get initialOpacity(){return this.element.initialOpacity},get opacityDecayVelocity(){return this.element.opacityDecayVelocity},get radius(){var e=this.containerMetrics.width*this.containerMetrics.width,t=this.containerMetrics.height*this.containerMetrics.height,i=1.1*Math.min(Math.sqrt(e+t),p.MAX_RADIUS)+5,n=1.1-i/p.MAX_RADIUS*.2,r=this.mouseInteractionSeconds/n,s=i*(1-Math.pow(80,-r));return Math.abs(s)},get opacity(){return this.mouseUpStart?Math.max(0,this.initialOpacity-this.mouseUpElapsedSeconds*this.opacityDecayVelocity):this.initialOpacity},get outerOpacity(){var e=.3*this.mouseUpElapsedSeconds,t=this.opacity;return Math.max(0,Math.min(e,t))},get isOpacityFullyDecayed(){return this.opacity<.01&&this.radius>=Math.min(this.maxRadius,p.MAX_RADIUS)},get isRestingAtMaxRadius(){return this.opacity>=this.initialOpacity&&this.radius>=Math.min(this.maxRadius,p.MAX_RADIUS)},get isAnimationComplete(){return this.mouseUpStart?this.isOpacityFullyDecayed:this.isRestingAtMaxRadius},get translationFraction(){return Math.min(1,this.radius/this.containerMetrics.size*2/Math.sqrt(2))},get xNow(){return this.xEnd?this.xStart+this.translationFraction*(this.xEnd-this.xStart):this.xStart},get yNow(){return this.yEnd?this.yStart+this.translationFraction*(this.yEnd-this.yStart):this.yStart},get isMouseDown(){return this.mouseDownStart&&!this.mouseUpStart},resetInteractionState:function(){this.maxRadius=0,this.mouseDownStart=0,this.mouseUpStart=0,this.xStart=0,this.yStart=0,this.xEnd=0,this.yEnd=0,this.slideDistance=0,this.containerMetrics=new l(this.element)},draw:function(){var e,t,i;this.wave.style.opacity=this.opacity,e=this.radius/(this.containerMetrics.size/2),t=this.xNow-this.containerMetrics.width/2,i=this.yNow-this.containerMetrics.height/2,this.waveContainer.style.webkitTransform="translate("+t+"px, "+i+"px)",this.waveContainer.style.transform="translate3d("+t+"px, "+i+"px, 0)",this.wave.style.webkitTransform="scale("+e+","+e+")",this.wave.style.transform="scale3d("+e+","+e+",1)"},downAction:function(e){var t=this.containerMetrics.width/2,i=this.containerMetrics.height/2;this.resetInteractionState(),this.mouseDownStart=o.now(),this.center?(this.xStart=t,this.yStart=i,this.slideDistance=o.distance(this.xStart,this.yStart,this.xEnd,this.yEnd)):(this.xStart=e?e.detail.x-this.containerMetrics.boundingRect.left:this.containerMetrics.width/2,this.yStart=e?e.detail.y-this.containerMetrics.boundingRect.top:this.containerMetrics.height/2),this.recenters&&(this.xEnd=t,this.yEnd=i,this.slideDistance=o.distance(this.xStart,this.yStart,this.xEnd,this.yEnd)),this.maxRadius=this.containerMetrics.furthestCornerDistanceFrom(this.xStart,this.yStart),this.waveContainer.style.top=(this.containerMetrics.height-this.containerMetrics.size)/2+"px",this.waveContainer.style.left=(this.containerMetrics.width-this.containerMetrics.size)/2+"px",this.waveContainer.style.width=this.containerMetrics.size+"px",this.waveContainer.style.height=this.containerMetrics.size+"px"},upAction:function(e){this.isMouseDown&&(this.mouseUpStart=o.now())},remove:function(){(0,s.vz)((0,s.vz)(this.waveContainer).parentNode).removeChild(this.waveContainer)}},(0,r.k)({_template:a.d`
    <style>
      :host {
        display: block;
        position: absolute;
        border-radius: inherit;
        overflow: hidden;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        /* See PolymerElements/paper-behaviors/issues/34. On non-Chrome browsers,
         * creating a node (with a position:absolute) in the middle of an event
         * handler "interrupts" that event handler (which happens when the
         * ripple is created on demand) */
        pointer-events: none;
      }

      :host([animating]) {
        /* This resolves a rendering issue in Chrome (as of 40) where the
           ripple is not properly clipped by its parent (which may have
           rounded corners). See: http://jsbin.com/temexa/4

           Note: We only apply this style conditionally. Otherwise, the browser
           will create a new compositing layer for every ripple element on the
           page, and that would be bad. */
        -webkit-transform: translate(0, 0);
        transform: translate3d(0, 0, 0);
      }

      #background,
      #waves,
      .wave-container,
      .wave {
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      #background,
      .wave {
        opacity: 0;
      }

      #waves,
      .wave {
        overflow: hidden;
      }

      .wave-container,
      .wave {
        border-radius: 50%;
      }

      :host(.circle) #background,
      :host(.circle) #waves {
        border-radius: 50%;
      }

      :host(.circle) .wave-container {
        overflow: hidden;
      }
    </style>

    <div id="background"></div>
    <div id="waves"></div>
`,is:"paper-ripple",behaviors:[n.G],properties:{initialOpacity:{type:Number,value:.25},opacityDecayVelocity:{type:Number,value:.8},recenters:{type:Boolean,value:!1},center:{type:Boolean,value:!1},ripples:{type:Array,value:function(){return[]}},animating:{type:Boolean,readOnly:!0,reflectToAttribute:!0,value:!1},holdDown:{type:Boolean,value:!1,observer:"_holdDownChanged"},noink:{type:Boolean,value:!1},_animating:{type:Boolean},_boundAnimate:{type:Function,value:function(){return this.animate.bind(this)}}},get target(){return this.keyEventTarget},keyBindings:{"enter:keydown":"_onEnterKeydown","space:keydown":"_onSpaceKeydown","space:keyup":"_onSpaceKeyup"},attached:function(){11==(0,s.vz)(this).parentNode.nodeType?this.keyEventTarget=(0,s.vz)(this).getOwnerRoot().host:this.keyEventTarget=(0,s.vz)(this).parentNode;var e=this.keyEventTarget;this.listen(e,"up","uiUpAction"),this.listen(e,"down","uiDownAction")},detached:function(){this.unlisten(this.keyEventTarget,"up","uiUpAction"),this.unlisten(this.keyEventTarget,"down","uiDownAction"),this.keyEventTarget=null},get shouldKeepAnimating(){for(var e=0;e<this.ripples.length;++e)if(!this.ripples[e].isAnimationComplete)return!0;return!1},simulatedRipple:function(){this.downAction(null),this.async((function(){this.upAction()}),1)},uiDownAction:function(e){this.noink||this.downAction(e)},downAction:function(e){this.holdDown&&this.ripples.length>0||(this.addRipple().downAction(e),this._animating||(this._animating=!0,this.animate()))},uiUpAction:function(e){this.noink||this.upAction(e)},upAction:function(e){this.holdDown||(this.ripples.forEach((function(t){t.upAction(e)})),this._animating=!0,this.animate())},onAnimationComplete:function(){this._animating=!1,this.$.background.style.backgroundColor="",this.fire("transitionend")},addRipple:function(){var e=new p(this);return(0,s.vz)(this.$.waves).appendChild(e.waveContainer),this.$.background.style.backgroundColor=e.color,this.ripples.push(e),this._setAnimating(!0),e},removeRipple:function(e){var t=this.ripples.indexOf(e);t<0||(this.ripples.splice(t,1),e.remove(),this.ripples.length||this._setAnimating(!1))},animate:function(){if(this._animating){var e,t;for(e=0;e<this.ripples.length;++e)(t=this.ripples[e]).draw(),this.$.background.style.opacity=t.outerOpacity,t.isOpacityFullyDecayed&&!t.isRestingAtMaxRadius&&this.removeRipple(t);this.shouldKeepAnimating||0!==this.ripples.length?window.requestAnimationFrame(this._boundAnimate):this.onAnimationComplete()}},animateRipple:function(){return this.animate()},_onEnterKeydown:function(){this.uiDownAction(),this.async(this.uiUpAction,1)},_onSpaceKeydown:function(){this.uiDownAction()},_onSpaceKeyup:function(){this.uiUpAction()},_holdDownChanged:function(e,t){void 0!==t&&(e?this.downAction():this.upAction())}});var d=i(2190);const c={properties:{noink:{type:Boolean,observer:"_noinkChanged"},_rippleContainer:{type:Object}},_buttonStateChanged:function(){this.focused&&this.ensureRipple()},_downHandler:function(e){d.$._downHandler.call(this,e),this.pressed&&this.ensureRipple(e)},ensureRipple:function(e){if(!this.hasRipple()){this._ripple=this._createRipple(),this._ripple.noink=this.noink;var t=this._rippleContainer||this.root;if(t&&(0,s.vz)(t).appendChild(this._ripple),e){var i=(0,s.vz)(this._rippleContainer||this),n=(0,s.vz)(e).rootTarget;i.deepContains(n)&&this._ripple.uiDownAction(e)}}},getRipple:function(){return this.ensureRipple(),this._ripple},hasRipple:function(){return Boolean(this._ripple)},_createRipple:function(){return document.createElement("paper-ripple")},_noinkChanged:function(e){this.hasRipple()&&(this._ripple.noink=e)}}},1449:(e,t,i)=>{i(6358);var n=i(6550),r=i(1121);const s=r.d`
<custom-style>
  <style is="custom-style">
    html {

      --shadow-transition: {
        transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
      };

      --shadow-none: {
        box-shadow: none;
      };

      /* from http://codepen.io/shyndman/pen/c5394ddf2e8b2a5c9185904b57421cdb */

      --shadow-elevation-2dp: {
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 1px 5px 0 rgba(0, 0, 0, 0.12),
                    0 3px 1px -2px rgba(0, 0, 0, 0.2);
      };

      --shadow-elevation-3dp: {
        box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14),
                    0 1px 8px 0 rgba(0, 0, 0, 0.12),
                    0 3px 3px -2px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-4dp: {
        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
                    0 1px 10px 0 rgba(0, 0, 0, 0.12),
                    0 2px 4px -1px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-6dp: {
        box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
                    0 1px 18px 0 rgba(0, 0, 0, 0.12),
                    0 3px 5px -1px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-8dp: {
        box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
                    0 3px 14px 2px rgba(0, 0, 0, 0.12),
                    0 5px 5px -3px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-12dp: {
        box-shadow: 0 12px 16px 1px rgba(0, 0, 0, 0.14),
                    0 4px 22px 3px rgba(0, 0, 0, 0.12),
                    0 6px 7px -4px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-16dp: {
        box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
                    0  6px 30px 5px rgba(0, 0, 0, 0.12),
                    0  8px 10px -5px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-24dp: {
        box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
                    0 9px 46px 8px rgba(0, 0, 0, 0.12),
                    0 11px 15px -7px rgba(0, 0, 0, 0.4);
      };
    }
  </style>
</custom-style>`;s.setAttribute("style","display: none;"),document.head.appendChild(s.content);const a=r.d`
<dom-module id="paper-material-styles">
  <template>
    <style>
      html {
        --paper-material: {
          display: block;
          position: relative;
        };
        --paper-material-elevation-1: {
          @apply --shadow-elevation-2dp;
        };
        --paper-material-elevation-2: {
          @apply --shadow-elevation-4dp;
        };
        --paper-material-elevation-3: {
          @apply --shadow-elevation-6dp;
        };
        --paper-material-elevation-4: {
          @apply --shadow-elevation-8dp;
        };
        --paper-material-elevation-5: {
          @apply --shadow-elevation-16dp;
        };
      }
      .paper-material {
        @apply --paper-material;
      }
      .paper-material[elevation="1"] {
        @apply --paper-material-elevation-1;
      }
      .paper-material[elevation="2"] {
        @apply --paper-material-elevation-2;
      }
      .paper-material[elevation="3"] {
        @apply --paper-material-elevation-3;
      }
      .paper-material[elevation="4"] {
        @apply --paper-material-elevation-4;
      }
      .paper-material[elevation="5"] {
        @apply --paper-material-elevation-5;
      }

      /* Duplicate the styles because of https://github.com/webcomponents/shadycss/issues/193 */
      :host {
        --paper-material: {
          display: block;
          position: relative;
        };
        --paper-material-elevation-1: {
          @apply --shadow-elevation-2dp;
        };
        --paper-material-elevation-2: {
          @apply --shadow-elevation-4dp;
        };
        --paper-material-elevation-3: {
          @apply --shadow-elevation-6dp;
        };
        --paper-material-elevation-4: {
          @apply --shadow-elevation-8dp;
        };
        --paper-material-elevation-5: {
          @apply --shadow-elevation-16dp;
        };
      }
      :host(.paper-material) {
        @apply --paper-material;
      }
      :host(.paper-material[elevation="1"]) {
        @apply --paper-material-elevation-1;
      }
      :host(.paper-material[elevation="2"]) {
        @apply --paper-material-elevation-2;
      }
      :host(.paper-material[elevation="3"]) {
        @apply --paper-material-elevation-3;
      }
      :host(.paper-material[elevation="4"]) {
        @apply --paper-material-elevation-4;
      }
      :host(.paper-material[elevation="5"]) {
        @apply --paper-material-elevation-5;
      }
    </style>
  </template>
</dom-module>`;a.setAttribute("style","display: none;"),document.head.appendChild(a.content);var o=i(2190),l=i(299),p=i(8996);const d={properties:{elevation:{type:Number,reflectToAttribute:!0,readOnly:!0}},observers:["_calculateElevation(focused, disabled, active, pressed, receivedFocusFromKeyboard)","_computeKeyboardClass(receivedFocusFromKeyboard)"],hostAttributes:{role:"button",tabindex:"0",animated:!0},_calculateElevation:function(){var e=1;this.disabled?e=0:this.active||this.pressed?e=4:this.receivedFocusFromKeyboard&&(e=3),this._setElevation(e)},_computeKeyboardClass:function(e){this.toggleClass("keyboard-focus",e)},_spaceKeyDownHandler:function(e){o.$._spaceKeyDownHandler.call(this,e),this.hasRipple()&&this.getRipple().ripples.length<1&&this._ripple.uiDownAction()},_spaceKeyUpHandler:function(e){o.$._spaceKeyUpHandler.call(this,e),this.hasRipple()&&this._ripple.uiUpAction()}},c=[o.P,l.a,p.o,d];var h=i(3505);const u=n.dy`
  <style include="paper-material-styles">
    /* Need to specify the same specificity as the styles imported from paper-material. */
    :host {
      @apply --layout-inline;
      @apply --layout-center-center;
      position: relative;
      box-sizing: border-box;
      min-width: 5.14em;
      margin: 0 0.29em;
      background: transparent;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      -webkit-tap-highlight-color: transparent;
      font: inherit;
      text-transform: uppercase;
      outline-width: 0;
      border-radius: 3px;
      -moz-user-select: none;
      -ms-user-select: none;
      -webkit-user-select: none;
      user-select: none;
      cursor: pointer;
      z-index: 0;
      padding: 0.7em 0.57em;

      @apply --paper-font-common-base;
      @apply --paper-button;
    }

    :host([elevation="1"]) {
      @apply --paper-material-elevation-1;
    }

    :host([elevation="2"]) {
      @apply --paper-material-elevation-2;
    }

    :host([elevation="3"]) {
      @apply --paper-material-elevation-3;
    }

    :host([elevation="4"]) {
      @apply --paper-material-elevation-4;
    }

    :host([elevation="5"]) {
      @apply --paper-material-elevation-5;
    }

    :host([hidden]) {
      display: none !important;
    }

    :host([raised].keyboard-focus) {
      font-weight: bold;
      @apply --paper-button-raised-keyboard-focus;
    }

    :host(:not([raised]).keyboard-focus) {
      font-weight: bold;
      @apply --paper-button-flat-keyboard-focus;
    }

    :host([disabled]) {
      background: none;
      color: #a8a8a8;
      cursor: auto;
      pointer-events: none;

      @apply --paper-button-disabled;
    }

    :host([disabled][raised]) {
      background: #eaeaea;
    }


    :host([animated]) {
      @apply --shadow-transition;
    }

    paper-ripple {
      color: var(--paper-button-ink-color);
    }
  </style>

  <slot></slot>`;u.setAttribute("strip-whitespace",""),(0,h.k)({_template:u,is:"paper-button",behaviors:[c],properties:{raised:{type:Boolean,reflectToAttribute:!0,value:!1,observer:"_calculateElevation"}},_calculateElevation:function(){this.raised?d._calculateElevation.apply(this):this._setElevation(0)}})},7216:(e,t,i)=>{i(6550),i(7923);var n=i(2710),r=i(1583),s=i(3505),a=i(1121),o=i(2223);const l=a.d`<style>
  :host {
    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
    --calculated-paper-checkbox-size: var(--paper-checkbox-size, 18px);
    /* -1px is a sentinel for the default and is replaced in \`attached\`. */
    --calculated-paper-checkbox-ink-size: var(--paper-checkbox-ink-size, -1px);
    @apply --paper-font-common-base;
    line-height: 0;
    -webkit-tap-highlight-color: transparent;
  }

  :host([hidden]) {
    display: none !important;
  }

  :host(:focus) {
    outline: none;
  }

  .hidden {
    display: none;
  }

  #checkboxContainer {
    display: inline-block;
    position: relative;
    width: var(--calculated-paper-checkbox-size);
    height: var(--calculated-paper-checkbox-size);
    min-width: var(--calculated-paper-checkbox-size);
    margin: var(--paper-checkbox-margin, initial);
    vertical-align: var(--paper-checkbox-vertical-align, middle);
    background-color: var(--paper-checkbox-unchecked-background-color, transparent);
  }

  #ink {
    position: absolute;

    /* Center the ripple in the checkbox by negative offsetting it by
     * (inkWidth - rippleWidth) / 2 */
    top: calc(0px - (var(--calculated-paper-checkbox-ink-size) - var(--calculated-paper-checkbox-size)) / 2);
    left: calc(0px - (var(--calculated-paper-checkbox-ink-size) - var(--calculated-paper-checkbox-size)) / 2);
    width: var(--calculated-paper-checkbox-ink-size);
    height: var(--calculated-paper-checkbox-ink-size);
    color: var(--paper-checkbox-unchecked-ink-color, var(--primary-text-color));
    opacity: 0.6;
    pointer-events: none;
  }

  #ink:dir(rtl) {
    right: calc(0px - (var(--calculated-paper-checkbox-ink-size) - var(--calculated-paper-checkbox-size)) / 2);
    left: auto;
  }

  #ink[checked] {
    color: var(--paper-checkbox-checked-ink-color, var(--primary-color));
  }

  #checkbox {
    position: relative;
    box-sizing: border-box;
    height: 100%;
    border: solid 2px;
    border-color: var(--paper-checkbox-unchecked-color, var(--primary-text-color));
    border-radius: 2px;
    pointer-events: none;
    -webkit-transition: background-color 140ms, border-color 140ms;
    transition: background-color 140ms, border-color 140ms;

    -webkit-transition-duration: var(--paper-checkbox-animation-duration, 140ms);
    transition-duration: var(--paper-checkbox-animation-duration, 140ms);
  }

  /* checkbox checked animations */
  #checkbox.checked #checkmark {
    -webkit-animation: checkmark-expand 140ms ease-out forwards;
    animation: checkmark-expand 140ms ease-out forwards;

    -webkit-animation-duration: var(--paper-checkbox-animation-duration, 140ms);
    animation-duration: var(--paper-checkbox-animation-duration, 140ms);
  }

  @-webkit-keyframes checkmark-expand {
    0% {
      -webkit-transform: scale(0, 0) rotate(45deg);
    }
    100% {
      -webkit-transform: scale(1, 1) rotate(45deg);
    }
  }

  @keyframes checkmark-expand {
    0% {
      transform: scale(0, 0) rotate(45deg);
    }
    100% {
      transform: scale(1, 1) rotate(45deg);
    }
  }

  #checkbox.checked {
    background-color: var(--paper-checkbox-checked-color, var(--primary-color));
    border-color: var(--paper-checkbox-checked-color, var(--primary-color));
  }

  #checkmark {
    position: absolute;
    width: 36%;
    height: 70%;
    border-style: solid;
    border-top: none;
    border-left: none;
    border-right-width: calc(2/15 * var(--calculated-paper-checkbox-size));
    border-bottom-width: calc(2/15 * var(--calculated-paper-checkbox-size));
    border-color: var(--paper-checkbox-checkmark-color, white);
    -webkit-transform-origin: 97% 86%;
    transform-origin: 97% 86%;
    box-sizing: content-box; /* protect against page-level box-sizing */
  }

  #checkmark:dir(rtl) {
    -webkit-transform-origin: 50% 14%;
    transform-origin: 50% 14%;
  }

  /* label */
  #checkboxLabel {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    padding-left: var(--paper-checkbox-label-spacing, 8px);
    white-space: normal;
    line-height: normal;
    color: var(--paper-checkbox-label-color, var(--primary-text-color));
    @apply --paper-checkbox-label;
  }

  :host([checked]) #checkboxLabel {
    color: var(--paper-checkbox-label-checked-color, var(--paper-checkbox-label-color, var(--primary-text-color)));
    @apply --paper-checkbox-label-checked;
  }

  #checkboxLabel:dir(rtl) {
    padding-right: var(--paper-checkbox-label-spacing, 8px);
    padding-left: 0;
  }

  #checkboxLabel[hidden] {
    display: none;
  }

  /* disabled state */

  :host([disabled]) #checkbox {
    opacity: 0.5;
    border-color: var(--paper-checkbox-unchecked-color, var(--primary-text-color));
  }

  :host([disabled][checked]) #checkbox {
    background-color: var(--paper-checkbox-unchecked-color, var(--primary-text-color));
    opacity: 0.5;
  }

  :host([disabled]) #checkboxLabel  {
    opacity: 0.65;
  }

  /* invalid state */
  #checkbox.invalid:not(.checked) {
    border-color: var(--paper-checkbox-error-color, var(--error-color));
  }
</style>

<div id="checkboxContainer">
  <div id="checkbox" class$="[[_computeCheckboxClass(checked, invalid)]]">
    <div id="checkmark" class$="[[_computeCheckmarkClass(checked)]]"></div>
  </div>
</div>

<div id="checkboxLabel"><slot></slot></div>`;l.setAttribute("strip-whitespace",""),(0,s.k)({_template:l,is:"paper-checkbox",behaviors:[n.K],hostAttributes:{role:"checkbox","aria-checked":!1,tabindex:0},properties:{ariaActiveAttribute:{type:String,value:"aria-checked"}},attached:function(){(0,o.T8)(this,(function(){if("-1px"===this.getComputedStyleValue("--calculated-paper-checkbox-ink-size").trim()){var e=this.getComputedStyleValue("--calculated-paper-checkbox-size").trim(),t="px",i=e.match(/[A-Za-z]+$/);null!==i&&(t=i[0]);var n=parseFloat(e),r=8/3*n;"px"===t&&(r=Math.floor(r))%2!=n%2&&r++,this.updateStyles({"--paper-checkbox-ink-size":r+t})}}))},_computeCheckboxClass:function(e,t){var i="";return e&&(i+="checked "),t&&(i+="invalid"),i},_computeCheckmarkClass:function(e){return e?"":"hidden"},_createRipple:function(){return this._rippleContainer=this.$.checkboxContainer,r.S._createRipple.call(this)}})},9512:(e,t,i)=>{i.d(t,{o:()=>n}),i(6550);const n={attached:function(){this.fire("addon-attached")},update:function(e){}}},8056:(e,t,i)=>{i.d(t,{d0:()=>p}),i(6550);var n=i(395),r=i(299),s=i(8876),a=i(4673);const o={NextLabelID:1,NextAddonID:1,NextInputID:1},l={properties:{label:{type:String},value:{notify:!0,type:String},disabled:{type:Boolean,value:!1},invalid:{type:Boolean,value:!1,notify:!0},allowedPattern:{type:String},type:{type:String},list:{type:String},pattern:{type:String},required:{type:Boolean,value:!1},errorMessage:{type:String},charCounter:{type:Boolean,value:!1},noLabelFloat:{type:Boolean,value:!1},alwaysFloatLabel:{type:Boolean,value:!1},autoValidate:{type:Boolean,value:!1},validator:{type:String},autocomplete:{type:String,value:"off"},autofocus:{type:Boolean,observer:"_autofocusChanged"},inputmode:{type:String},minlength:{type:Number},maxlength:{type:Number},min:{type:String},max:{type:String},step:{type:String},name:{type:String},placeholder:{type:String,value:""},readonly:{type:Boolean,value:!1},size:{type:Number},autocapitalize:{type:String,value:"none"},autocorrect:{type:String,value:"off"},autosave:{type:String},results:{type:Number},accept:{type:String},multiple:{type:Boolean},_ariaDescribedBy:{type:String,value:""},_ariaLabelledBy:{type:String,value:""},_inputId:{type:String,value:""}},listeners:{"addon-attached":"_onAddonAttached"},keyBindings:{"shift+tab:keydown":"_onShiftTabDown"},hostAttributes:{tabindex:0},get inputElement(){return this.$||(this.$={}),this.$.input||(this._generateInputId(),this.$.input=this.$$("#"+this._inputId)),this.$.input},get _focusableElement(){return this.inputElement},created:function(){this._typesThatHaveText=["date","datetime","datetime-local","month","time","week","file"]},attached:function(){this._updateAriaLabelledBy(),!a.H3&&this.inputElement&&-1!==this._typesThatHaveText.indexOf(this.inputElement.type)&&(this.alwaysFloatLabel=!0)},_appendStringWithSpace:function(e,t){return e?e+" "+t:t},_onAddonAttached:function(e){var t=(0,s.vz)(e).rootTarget;if(t.id)this._ariaDescribedBy=this._appendStringWithSpace(this._ariaDescribedBy,t.id);else{var i="paper-input-add-on-"+o.NextAddonID++;t.id=i,this._ariaDescribedBy=this._appendStringWithSpace(this._ariaDescribedBy,i)}},validate:function(){return this.inputElement.validate()},_focusBlurHandler:function(e){r.a._focusBlurHandler.call(this,e),this.focused&&!this._shiftTabPressed&&this._focusableElement&&this._focusableElement.focus()},_onShiftTabDown:function(e){var t=this.getAttribute("tabindex");this._shiftTabPressed=!0,this.setAttribute("tabindex","-1"),this.async((function(){this.setAttribute("tabindex",t),this._shiftTabPressed=!1}),1)},_handleAutoValidate:function(){this.autoValidate&&this.validate()},updateValueAndPreserveCaret:function(e){try{var t=this.inputElement.selectionStart;this.value=e,this.inputElement.selectionStart=t,this.inputElement.selectionEnd=t}catch(t){this.value=e}},_computeAlwaysFloatLabel:function(e,t){return t||e},_updateAriaLabelledBy:function(){var e,t=(0,s.vz)(this.root).querySelector("label");t?(t.id?e=t.id:(e="paper-input-label-"+o.NextLabelID++,t.id=e),this._ariaLabelledBy=e):this._ariaLabelledBy=""},_generateInputId:function(){this._inputId&&""!==this._inputId||(this._inputId="input-"+o.NextInputID++)},_onChange:function(e){this.shadowRoot&&this.fire(e.type,{sourceEvent:e},{node:this,bubbles:e.bubbles,cancelable:e.cancelable})},_autofocusChanged:function(){if(this.autofocus&&this._focusableElement){var e=document.activeElement;e instanceof HTMLElement&&e!==document.body&&e!==document.documentElement||this._focusableElement.focus()}}},p=[r.a,n.G,l]},438:(e,t,i)=>{i(6550),i(5475);var n=i(3505),r=i(1121),s=i(9512);(0,n.k)({_template:r.d`
    <style>
      :host {
        display: inline-block;
        float: right;

        @apply --paper-font-caption;
        @apply --paper-input-char-counter;
      }

      :host([hidden]) {
        display: none !important;
      }

      :host(:dir(rtl)) {
        float: left;
      }
    </style>

    <span>[[_charCounterStr]]</span>
`,is:"paper-input-char-counter",behaviors:[s.o],properties:{_charCounterStr:{type:String,value:"0"}},update:function(e){if(e.inputElement){e.value=e.value||"";var t=e.value.toString().length.toString();e.inputElement.hasAttribute("maxlength")&&(t+="/"+e.inputElement.getAttribute("maxlength")),this._charCounterStr=t}}})},7631:(e,t,i)=>{i(6550),i(6358),i(7923),i(5475);var n=i(3505),r=i(8876),s=i(9027),a=i(1121);const o=a.d`
<custom-style>
  <style is="custom-style">
    html {
      --paper-input-container-shared-input-style: {
        position: relative; /* to make a stacking context */
        outline: none;
        box-shadow: none;
        padding: 0;
        margin: 0;
        width: 100%;
        max-width: 100%;
        background: transparent;
        border: none;
        color: var(--paper-input-container-input-color, var(--primary-text-color));
        -webkit-appearance: none;
        text-align: inherit;
        vertical-align: var(--paper-input-container-input-align, bottom);

        @apply --paper-font-subhead;
      };
    }
  </style>
</custom-style>
`;o.setAttribute("style","display: none;"),document.head.appendChild(o.content),(0,n.k)({_template:a.d`
    <style>
      :host {
        display: block;
        padding: 8px 0;
        @apply --paper-input-container;
      }

      :host([inline]) {
        display: inline-block;
      }

      :host([disabled]) {
        pointer-events: none;
        opacity: 0.33;

        @apply --paper-input-container-disabled;
      }

      :host([hidden]) {
        display: none !important;
      }

      [hidden] {
        display: none !important;
      }

      .floated-label-placeholder {
        @apply --paper-font-caption;
      }

      .underline {
        height: 2px;
        position: relative;
      }

      .focused-line {
        @apply --layout-fit;
        border-bottom: 2px solid var(--paper-input-container-focus-color, var(--primary-color));

        -webkit-transform-origin: center center;
        transform-origin: center center;
        -webkit-transform: scale3d(0,1,1);
        transform: scale3d(0,1,1);

        @apply --paper-input-container-underline-focus;
      }

      .underline.is-highlighted .focused-line {
        -webkit-transform: none;
        transform: none;
        -webkit-transition: -webkit-transform 0.25s;
        transition: transform 0.25s;

        @apply --paper-transition-easing;
      }

      .underline.is-invalid .focused-line {
        border-color: var(--paper-input-container-invalid-color, var(--error-color));
        -webkit-transform: none;
        transform: none;
        -webkit-transition: -webkit-transform 0.25s;
        transition: transform 0.25s;

        @apply --paper-transition-easing;
      }

      .unfocused-line {
        @apply --layout-fit;
        border-bottom: 1px solid var(--paper-input-container-color, var(--secondary-text-color));
        @apply --paper-input-container-underline;
      }

      :host([disabled]) .unfocused-line {
        border-bottom: 1px dashed;
        border-color: var(--paper-input-container-color, var(--secondary-text-color));
        @apply --paper-input-container-underline-disabled;
      }

      .input-wrapper {
        @apply --layout-horizontal;
        @apply --layout-center;
        position: relative;
      }

      .input-content {
        @apply --layout-flex-auto;
        @apply --layout-relative;
        max-width: 100%;
      }

      .input-content ::slotted(label),
      .input-content ::slotted(.paper-input-label) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        font: inherit;
        color: var(--paper-input-container-color, var(--secondary-text-color));
        -webkit-transition: -webkit-transform 0.25s, width 0.25s;
        transition: transform 0.25s, width 0.25s;
        -webkit-transform-origin: left top;
        transform-origin: left top;
        /* Fix for safari not focusing 0-height date/time inputs with -webkit-apperance: none; */
        min-height: 1px;

        @apply --paper-font-common-nowrap;
        @apply --paper-font-subhead;
        @apply --paper-input-container-label;
        @apply --paper-transition-easing;
      }


      .input-content ::slotted(label):before,
      .input-content ::slotted(.paper-input-label):before {
        @apply --paper-input-container-label-before;
      }

      .input-content ::slotted(label):after,
      .input-content ::slotted(.paper-input-label):after {
        @apply --paper-input-container-label-after;
      }

      .input-content.label-is-floating ::slotted(label),
      .input-content.label-is-floating ::slotted(.paper-input-label) {
        -webkit-transform: translateY(-75%) scale(0.75);
        transform: translateY(-75%) scale(0.75);

        /* Since we scale to 75/100 of the size, we actually have 100/75 of the
        original space now available */
        width: 133%;

        @apply --paper-input-container-label-floating;
      }

      :host(:dir(rtl)) .input-content.label-is-floating ::slotted(label),
      :host(:dir(rtl)) .input-content.label-is-floating ::slotted(.paper-input-label) {
        right: 0;
        left: auto;
        -webkit-transform-origin: right top;
        transform-origin: right top;
      }

      .input-content.label-is-highlighted ::slotted(label),
      .input-content.label-is-highlighted ::slotted(.paper-input-label) {
        color: var(--paper-input-container-focus-color, var(--primary-color));

        @apply --paper-input-container-label-focus;
      }

      .input-content.is-invalid ::slotted(label),
      .input-content.is-invalid ::slotted(.paper-input-label) {
        color: var(--paper-input-container-invalid-color, var(--error-color));
      }

      .input-content.label-is-hidden ::slotted(label),
      .input-content.label-is-hidden ::slotted(.paper-input-label) {
        visibility: hidden;
      }

      .input-content ::slotted(input),
      .input-content ::slotted(iron-input),
      .input-content ::slotted(textarea),
      .input-content ::slotted(iron-autogrow-textarea),
      .input-content ::slotted(.paper-input-input) {
        @apply --paper-input-container-shared-input-style;
        /* The apply shim doesn't apply the nested color custom property,
          so we have to re-apply it here. */
        color: var(--paper-input-container-input-color, var(--primary-text-color));
        @apply --paper-input-container-input;
      }

      .input-content ::slotted(input)::-webkit-outer-spin-button,
      .input-content ::slotted(input)::-webkit-inner-spin-button {
        @apply --paper-input-container-input-webkit-spinner;
      }

      .input-content.focused ::slotted(input),
      .input-content.focused ::slotted(iron-input),
      .input-content.focused ::slotted(textarea),
      .input-content.focused ::slotted(iron-autogrow-textarea),
      .input-content.focused ::slotted(.paper-input-input) {
        @apply --paper-input-container-input-focus;
      }

      .input-content.is-invalid ::slotted(input),
      .input-content.is-invalid ::slotted(iron-input),
      .input-content.is-invalid ::slotted(textarea),
      .input-content.is-invalid ::slotted(iron-autogrow-textarea),
      .input-content.is-invalid ::slotted(.paper-input-input) {
        @apply --paper-input-container-input-invalid;
      }

      .prefix ::slotted(*) {
        display: inline-block;
        @apply --paper-font-subhead;
        @apply --layout-flex-none;
        @apply --paper-input-prefix;
      }

      .suffix ::slotted(*) {
        display: inline-block;
        @apply --paper-font-subhead;
        @apply --layout-flex-none;

        @apply --paper-input-suffix;
      }

      /* Firefox sets a min-width on the input, which can cause layout issues */
      .input-content ::slotted(input) {
        min-width: 0;
      }

      .input-content ::slotted(textarea) {
        resize: none;
      }

      .add-on-content {
        position: relative;
      }

      .add-on-content.is-invalid ::slotted(*) {
        color: var(--paper-input-container-invalid-color, var(--error-color));
      }

      .add-on-content.is-highlighted ::slotted(*) {
        color: var(--paper-input-container-focus-color, var(--primary-color));
      }
    </style>

    <div class="floated-label-placeholder" aria-hidden="true" hidden="[[noLabelFloat]]">&nbsp;</div>

    <div class="input-wrapper">
      <span class="prefix"><slot name="prefix"></slot></span>

      <div class$="[[_computeInputContentClass(noLabelFloat,alwaysFloatLabel,focused,invalid,_inputHasContent)]]" id="labelAndInputContainer">
        <slot name="label"></slot>
        <slot name="input"></slot>
      </div>

      <span class="suffix"><slot name="suffix"></slot></span>
    </div>

    <div class$="[[_computeUnderlineClass(focused,invalid)]]">
      <div class="unfocused-line"></div>
      <div class="focused-line"></div>
    </div>

    <div class$="[[_computeAddOnContentClass(focused,invalid)]]">
      <slot name="add-on"></slot>
    </div>
`,is:"paper-input-container",properties:{noLabelFloat:{type:Boolean,value:!1},alwaysFloatLabel:{type:Boolean,value:!1},attrForValue:{type:String,value:"bind-value"},autoValidate:{type:Boolean,value:!1},invalid:{observer:"_invalidChanged",type:Boolean,value:!1},focused:{readOnly:!0,type:Boolean,value:!1,notify:!0},_addons:{type:Array},_inputHasContent:{type:Boolean,value:!1},_inputSelector:{type:String,value:"input,iron-input,textarea,.paper-input-input"},_boundOnFocus:{type:Function,value:function(){return this._onFocus.bind(this)}},_boundOnBlur:{type:Function,value:function(){return this._onBlur.bind(this)}},_boundOnInput:{type:Function,value:function(){return this._onInput.bind(this)}},_boundValueChanged:{type:Function,value:function(){return this._onValueChanged.bind(this)}}},listeners:{"addon-attached":"_onAddonAttached","iron-input-validate":"_onIronInputValidate"},get _valueChangedEvent(){return this.attrForValue+"-changed"},get _propertyForValue(){return(0,s.z)(this.attrForValue)},get _inputElement(){return(0,r.vz)(this).querySelector(this._inputSelector)},get _inputElementValue(){return this._inputElement[this._propertyForValue]||this._inputElement.value},ready:function(){this.__isFirstValueUpdate=!0,this._addons||(this._addons=[]),this.addEventListener("focus",this._boundOnFocus,!0),this.addEventListener("blur",this._boundOnBlur,!0)},attached:function(){this.attrForValue?this._inputElement.addEventListener(this._valueChangedEvent,this._boundValueChanged):this.addEventListener("input",this._onInput),this._inputElementValue&&""!=this._inputElementValue?this._handleValueAndAutoValidate(this._inputElement):this._handleValue(this._inputElement)},_onAddonAttached:function(e){this._addons||(this._addons=[]);var t=e.target;-1===this._addons.indexOf(t)&&(this._addons.push(t),this.isAttached&&this._handleValue(this._inputElement))},_onFocus:function(){this._setFocused(!0)},_onBlur:function(){this._setFocused(!1),this._handleValueAndAutoValidate(this._inputElement)},_onInput:function(e){this._handleValueAndAutoValidate(e.target)},_onValueChanged:function(e){var t=e.target;this.__isFirstValueUpdate&&(this.__isFirstValueUpdate=!1,void 0===t.value||""===t.value)||this._handleValueAndAutoValidate(e.target)},_handleValue:function(e){var t=this._inputElementValue;t||0===t||"number"===e.type&&!e.checkValidity()?this._inputHasContent=!0:this._inputHasContent=!1,this.updateAddons({inputElement:e,value:t,invalid:this.invalid})},_handleValueAndAutoValidate:function(e){var t;this.autoValidate&&e&&(t=e.validate?e.validate(this._inputElementValue):e.checkValidity(),this.invalid=!t),this._handleValue(e)},_onIronInputValidate:function(e){this.invalid=this._inputElement.invalid},_invalidChanged:function(){this._addons&&this.updateAddons({invalid:this.invalid})},updateAddons:function(e){for(var t,i=0;t=this._addons[i];i++)t.update(e)},_computeInputContentClass:function(e,t,i,n,r){var s="input-content";if(e)r&&(s+=" label-is-hidden"),n&&(s+=" is-invalid");else{var a=this.querySelector("label");t||r?(s+=" label-is-floating",this.$.labelAndInputContainer.style.position="static",n?s+=" is-invalid":i&&(s+=" label-is-highlighted")):(a&&(this.$.labelAndInputContainer.style.position="relative"),n&&(s+=" is-invalid"))}return i&&(s+=" focused"),s},_computeUnderlineClass:function(e,t){var i="underline";return t?i+=" is-invalid":e&&(i+=" is-highlighted"),i},_computeAddOnContentClass:function(e,t){var i="add-on-content";return t?i+=" is-invalid":e&&(i+=" is-highlighted"),i}})},9679:(e,t,i)=>{i(6550),i(7923),i(5475);var n=i(3505),r=i(1121),s=i(9512);(0,n.k)({_template:r.d`
    <style>
      :host {
        display: inline-block;
        visibility: hidden;

        color: var(--paper-input-container-invalid-color, var(--error-color));

        @apply --paper-font-caption;
        @apply --paper-input-error;
        position: absolute;
        left:0;
        right:0;
      }

      :host([invalid]) {
        visibility: visible;
      }

      #a11yWrapper {
        visibility: hidden;
      }

      :host([invalid]) #a11yWrapper {
        visibility: visible;
      }
    </style>

    <!--
    If the paper-input-error element is directly referenced by an
    \`aria-describedby\` attribute, such as when used as a paper-input add-on,
    then applying \`visibility: hidden;\` to the paper-input-error element itself
    does not hide the error.

    For more information, see:
    https://www.w3.org/TR/accname-1.1/#mapping_additional_nd_description
    -->
    <div id="a11yWrapper">
      <slot></slot>
    </div>
`,is:"paper-input-error",behaviors:[s.o],properties:{invalid:{readOnly:!0,reflectToAttribute:!0,type:Boolean}},update:function(e){this._setInvalid(e.invalid)}})},2688:(e,t,i)=>{i(6550);var n=i(3505),r=i(1121);const s=(0,n.k)({_template:r.d`
    <style>
      :host {
        display: inline-block;
        position: fixed;
        clip: rect(0px,0px,0px,0px);
      }
    </style>
    <div aria-live$="[[mode]]">[[_text]]</div>
`,is:"iron-a11y-announcer",properties:{mode:{type:String,value:"polite"},timeout:{type:Number,value:150},_text:{type:String,value:""}},created:function(){s.instance||(s.instance=this),document.addEventListener("iron-announce",this._onIronAnnounce.bind(this))},announce:function(e){this._text="",this.async((function(){this._text=e}),this.timeout)},_onIronAnnounce:function(e){e.detail&&e.detail.text&&this.announce(e.detail.text)}});s.instance=null,s.requestAvailability=function(){s.instance||(s.instance=document.createElement("iron-a11y-announcer")),document.body?document.body.appendChild(s.instance):document.addEventListener("load",(function(){document.body.appendChild(s.instance)}))};var a=i(3041),o=i(8876);(0,n.k)({_template:r.d`
    <style>
      :host {
        display: inline-block;
      }
    </style>
    <slot id="content"></slot>
`,is:"iron-input",behaviors:[a.x],properties:{bindValue:{type:String,value:""},value:{type:String,computed:"_computeValue(bindValue)"},allowedPattern:{type:String},autoValidate:{type:Boolean,value:!1},_inputElement:Object},observers:["_bindValueChanged(bindValue, _inputElement)"],listeners:{input:"_onInput",keypress:"_onKeypress"},created:function(){s.requestAvailability(),this._previousValidInput="",this._patternAlreadyChecked=!1},attached:function(){this._observer=(0,o.vz)(this).observeNodes(function(e){this._initSlottedInput()}.bind(this))},detached:function(){this._observer&&((0,o.vz)(this).unobserveNodes(this._observer),this._observer=null)},get inputElement(){return this._inputElement},_initSlottedInput:function(){this._inputElement=this.getEffectiveChildren()[0],this.inputElement&&this.inputElement.value&&(this.bindValue=this.inputElement.value),this.fire("iron-input-ready")},get _patternRegExp(){var e;return this.allowedPattern?e=new RegExp(this.allowedPattern):"number"===this.inputElement.type&&(e=/[0-9.,e-]/),e},_bindValueChanged:function(e,t){t&&(void 0===e?t.value=null:e!==t.value&&(this.inputElement.value=e),this.autoValidate&&this.validate(),this.fire("bind-value-changed",{value:e}))},_onInput:function(){this.allowedPattern&&!this._patternAlreadyChecked&&(this._checkPatternValidity()||(this._announceInvalidCharacter("Invalid string of characters not entered."),this.inputElement.value=this._previousValidInput)),this.bindValue=this._previousValidInput=this.inputElement.value,this._patternAlreadyChecked=!1},_isPrintable:function(e){var t=8==e.keyCode||9==e.keyCode||13==e.keyCode||27==e.keyCode,i=19==e.keyCode||20==e.keyCode||45==e.keyCode||46==e.keyCode||144==e.keyCode||145==e.keyCode||e.keyCode>32&&e.keyCode<41||e.keyCode>111&&e.keyCode<124;return!(t||0==e.charCode&&i)},_onKeypress:function(e){if(this.allowedPattern||"number"===this.inputElement.type){var t=this._patternRegExp;if(t&&!(e.metaKey||e.ctrlKey||e.altKey)){this._patternAlreadyChecked=!0;var i=String.fromCharCode(e.charCode);this._isPrintable(e)&&!t.test(i)&&(e.preventDefault(),this._announceInvalidCharacter("Invalid character "+i+" not entered."))}}},_checkPatternValidity:function(){var e=this._patternRegExp;if(!e)return!0;for(var t=0;t<this.inputElement.value.length;t++)if(!e.test(this.inputElement.value[t]))return!1;return!0},validate:function(){if(!this.inputElement)return this.invalid=!1,!0;var e=this.inputElement.checkValidity();return e&&(this.required&&""===this.bindValue?e=!1:this.hasValidator()&&(e=a.x.validate.call(this,this.bindValue))),this.invalid=!e,this.fire("iron-input-validate"),e},_announceInvalidCharacter:function(e){this.fire("iron-announce",{text:e})},_computeValue:function(e){return e}}),i(438),i(7631),i(9679);var l=i(7122),p=(i(4262),i(8056));(0,n.k)({is:"paper-input",_template:r.d`
    <style>
      :host {
        display: block;
      }

      :host([focused]) {
        outline: none;
      }

      :host([hidden]) {
        display: none !important;
      }

      input {
        /* Firefox sets a min-width on the input, which can cause layout issues */
        min-width: 0;
      }

      /* In 1.x, the <input> is distributed to paper-input-container, which styles it.
      In 2.x the <iron-input> is distributed to paper-input-container, which styles
      it, but in order for this to work correctly, we need to reset some
      of the native input's properties to inherit (from the iron-input) */
      iron-input > input {
        @apply --paper-input-container-shared-input-style;
        font-family: inherit;
        font-weight: inherit;
        font-size: inherit;
        letter-spacing: inherit;
        word-spacing: inherit;
        line-height: inherit;
        text-shadow: inherit;
        color: inherit;
        cursor: inherit;
      }

      input:disabled {
        @apply --paper-input-container-input-disabled;
      }

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        @apply --paper-input-container-input-webkit-spinner;
      }

      input::-webkit-clear-button {
        @apply --paper-input-container-input-webkit-clear;
      }

      input::-webkit-calendar-picker-indicator {
        @apply --paper-input-container-input-webkit-calendar-picker-indicator;
      }

      input::-webkit-input-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }

      input:-moz-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }

      input::-moz-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }

      input::-ms-clear {
        @apply --paper-input-container-ms-clear;
      }

      input::-ms-reveal {
        @apply --paper-input-container-ms-reveal;
      }

      input:-ms-input-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }

      label {
        pointer-events: none;
      }
    </style>

    <paper-input-container id="container" no-label-float="[[noLabelFloat]]" always-float-label="[[_computeAlwaysFloatLabel(alwaysFloatLabel,placeholder)]]" auto-validate$="[[autoValidate]]" disabled$="[[disabled]]" invalid="[[invalid]]">

      <slot name="prefix" slot="prefix"></slot>

      <label hidden$="[[!label]]" aria-hidden="true" for$="[[_inputId]]" slot="label">[[label]]</label>

      <!-- Need to bind maxlength so that the paper-input-char-counter works correctly -->
      <iron-input bind-value="{{value}}" slot="input" class="input-element" id$="[[_inputId]]" maxlength$="[[maxlength]]" allowed-pattern="[[allowedPattern]]" invalid="{{invalid}}" validator="[[validator]]">
        <input aria-labelledby$="[[_ariaLabelledBy]]" aria-describedby$="[[_ariaDescribedBy]]" disabled$="[[disabled]]" title$="[[title]]" type$="[[type]]" pattern$="[[pattern]]" required$="[[required]]" autocomplete$="[[autocomplete]]" autofocus$="[[autofocus]]" inputmode$="[[inputmode]]" minlength$="[[minlength]]" maxlength$="[[maxlength]]" min$="[[min]]" max$="[[max]]" step$="[[step]]" name$="[[name]]" placeholder$="[[placeholder]]" readonly$="[[readonly]]" list$="[[list]]" size$="[[size]]" autocapitalize$="[[autocapitalize]]" autocorrect$="[[autocorrect]]" on-change="_onChange" tabindex$="[[tabIndex]]" autosave$="[[autosave]]" results$="[[results]]" accept$="[[accept]]" multiple$="[[multiple]]" role$="[[inputRole]]" aria-haspopup$="[[inputAriaHaspopup]]">
      </iron-input>

      <slot name="suffix" slot="suffix"></slot>

      <template is="dom-if" if="[[errorMessage]]">
        <paper-input-error aria-live="assertive" slot="add-on">[[errorMessage]]</paper-input-error>
      </template>

      <template is="dom-if" if="[[charCounter]]">
        <paper-input-char-counter slot="add-on"></paper-input-char-counter>
      </template>

    </paper-input-container>
  `,behaviors:[p.d0,l.V],properties:{value:{type:String},inputRole:{type:String,value:void 0},inputAriaHaspopup:{type:String,value:void 0}},get _focusableElement(){return this.inputElement._inputElement},listeners:{"iron-input-ready":"_onIronInputReady"},_onIronInputReady:function(){this.$.nativeInput||(this.$.nativeInput=this.$$("input")),this.inputElement&&-1!==this._typesThatHaveText.indexOf(this.$.nativeInput.type)&&(this.alwaysFloatLabel=!0),this.inputElement.bindValue&&this.$.container._handleValueAndAutoValidate(this.inputElement)}})},4070:(e,t,i)=>{i(6550),i(6358);var n=i(299),r=i(3041),s=i(3505),a=i(8876),o=i(1121);(0,s.k)({_template:o.d`
    <style>
      :host {
        display: inline-block;
        position: relative;
        width: 400px;
        border: 1px solid;
        padding: 2px;
        -moz-appearance: textarea;
        -webkit-appearance: textarea;
        overflow: hidden;
      }

      .mirror-text {
        visibility: hidden;
        word-wrap: break-word;
        @apply --iron-autogrow-textarea;
      }

      .fit {
        @apply --layout-fit;
      }

      textarea {
        position: relative;
        outline: none;
        border: none;
        resize: none;
        background: inherit;
        color: inherit;
        /* see comments in template */
        width: 100%;
        height: 100%;
        font-size: inherit;
        font-family: inherit;
        line-height: inherit;
        text-align: inherit;
        @apply --iron-autogrow-textarea;
      }

      textarea::-webkit-input-placeholder {
        @apply --iron-autogrow-textarea-placeholder;
      }

      textarea:-moz-placeholder {
        @apply --iron-autogrow-textarea-placeholder;
      }

      textarea::-moz-placeholder {
        @apply --iron-autogrow-textarea-placeholder;
      }

      textarea:-ms-input-placeholder {
        @apply --iron-autogrow-textarea-placeholder;
      }
    </style>

    <!-- the mirror sizes the input/textarea so it grows with typing -->
    <!-- use &#160; instead &nbsp; of to allow this element to be used in XHTML -->
    <div id="mirror" class="mirror-text" aria-hidden="true">&nbsp;</div>

    <!-- size the input/textarea with a div, because the textarea has intrinsic size in ff -->
    <div class="textarea-container fit">
      <textarea id="textarea" name$="[[name]]" aria-label$="[[label]]" autocomplete$="[[autocomplete]]" autofocus$="[[autofocus]]" autocapitalize$="[[autocapitalize]]" inputmode$="[[inputmode]]" placeholder$="[[placeholder]]" readonly$="[[readonly]]" required$="[[required]]" disabled$="[[disabled]]" rows$="[[rows]]" minlength$="[[minlength]]" maxlength$="[[maxlength]]"></textarea>
    </div>
`,is:"iron-autogrow-textarea",behaviors:[r.x,n.a],properties:{value:{observer:"_valueChanged",type:String,notify:!0},bindValue:{observer:"_bindValueChanged",type:String,notify:!0},rows:{type:Number,value:1,observer:"_updateCached"},maxRows:{type:Number,value:0,observer:"_updateCached"},autocomplete:{type:String,value:"off"},autofocus:{type:Boolean,value:!1},autocapitalize:{type:String,value:"none"},inputmode:{type:String},placeholder:{type:String},readonly:{type:String},required:{type:Boolean},minlength:{type:Number},maxlength:{type:Number},label:{type:String}},listeners:{input:"_onInput"},get textarea(){return this.$.textarea},get selectionStart(){return this.$.textarea.selectionStart},get selectionEnd(){return this.$.textarea.selectionEnd},set selectionStart(e){this.$.textarea.selectionStart=e},set selectionEnd(e){this.$.textarea.selectionEnd=e},attached:function(){navigator.userAgent.match(/iP(?:[oa]d|hone)/)&&!navigator.userAgent.match(/OS 1[3456789]/)&&(this.$.textarea.style.marginLeft="-3px")},validate:function(){var e=this.$.textarea.validity.valid;return e&&(this.required&&""===this.value?e=!1:this.hasValidator()&&(e=r.x.validate.call(this,this.value))),this.invalid=!e,this.fire("iron-input-validate"),e},_bindValueChanged:function(e){this.value=e},_valueChanged:function(e){var t=this.textarea;t&&(t.value!==e&&(t.value=e||0===e?e:""),this.bindValue=e,this.$.mirror.innerHTML=this._valueForMirror(),this.fire("bind-value-changed",{value:this.bindValue}))},_onInput:function(e){var t=(0,a.vz)(e).path;this.value=t?t[0].value:e.target.value},_constrain:function(e){var t;for(e=e||[""],t=this.maxRows>0&&e.length>this.maxRows?e.slice(0,this.maxRows):e.slice(0);this.rows>0&&t.length<this.rows;)t.push("");return t.join("<br/>")+"&#160;"},_valueForMirror:function(){var e=this.textarea;if(e)return this.tokens=e&&e.value?e.value.replace(/&/gm,"&amp;").replace(/"/gm,"&quot;").replace(/'/gm,"&#39;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").split("\n"):[""],this._constrain(this.tokens)},_updateCached:function(){this.$.mirror.innerHTML=this._constrain(this.tokens)}}),i(438),i(7631),i(9679);var l=i(7122),p=i(8056);(0,s.k)({_template:o.d`
    <style>
      :host {
        display: block;
      }

      :host([hidden]) {
        display: none !important;
      }

      label {
        pointer-events: none;
      }
    </style>

    <paper-input-container no-label-float$="[[noLabelFloat]]" always-float-label="[[_computeAlwaysFloatLabel(alwaysFloatLabel,placeholder)]]" auto-validate$="[[autoValidate]]" disabled$="[[disabled]]" invalid="[[invalid]]">

      <label hidden$="[[!label]]" aria-hidden="true" for$="[[_inputId]]" slot="label">[[label]]</label>

      <iron-autogrow-textarea class="paper-input-input" slot="input" id$="[[_inputId]]" aria-labelledby$="[[_ariaLabelledBy]]" aria-describedby$="[[_ariaDescribedBy]]" bind-value="{{value}}" invalid="{{invalid}}" validator$="[[validator]]" disabled$="[[disabled]]" autocomplete$="[[autocomplete]]" autofocus$="[[autofocus]]" inputmode$="[[inputmode]]" name$="[[name]]" placeholder$="[[placeholder]]" readonly$="[[readonly]]" required$="[[required]]" minlength$="[[minlength]]" maxlength$="[[maxlength]]" autocapitalize$="[[autocapitalize]]" rows$="[[rows]]" max-rows$="[[maxRows]]" on-change="_onChange"></iron-autogrow-textarea>

      <template is="dom-if" if="[[errorMessage]]">
        <paper-input-error aria-live="assertive" slot="add-on">[[errorMessage]]</paper-input-error>
      </template>

      <template is="dom-if" if="[[charCounter]]">
        <paper-input-char-counter slot="add-on"></paper-input-char-counter>
      </template>

    </paper-input-container>
`,is:"paper-textarea",behaviors:[p.d0,l.V],properties:{_ariaLabelledBy:{observer:"_ariaLabelledByChanged",type:String},_ariaDescribedBy:{observer:"_ariaDescribedByChanged",type:String},value:{type:String},rows:{type:Number,value:1},maxRows:{type:Number,value:0}},get selectionStart(){return this.$.input.textarea.selectionStart},set selectionStart(e){this.$.input.textarea.selectionStart=e},get selectionEnd(){return this.$.input.textarea.selectionEnd},set selectionEnd(e){this.$.input.textarea.selectionEnd=e},_ariaLabelledByChanged:function(e){this._focusableElement.setAttribute("aria-labelledby",e)},_ariaDescribedByChanged:function(e){this._focusableElement.setAttribute("aria-describedby",e)},get _focusableElement(){return this.inputElement.textarea}})},7923:(e,t,i)=>{i(6550);var n=i(1121);const r=n.d`
<custom-style>
  <style is="custom-style">
    html {

      /* Material Design color palette for Google products */

      --google-red-100: #f4c7c3;
      --google-red-300: #e67c73;
      --google-red-500: #db4437;
      --google-red-700: #c53929;

      --google-blue-100: #c6dafc;
      --google-blue-300: #7baaf7;
      --google-blue-500: #4285f4;
      --google-blue-700: #3367d6;

      --google-green-100: #b7e1cd;
      --google-green-300: #57bb8a;
      --google-green-500: #0f9d58;
      --google-green-700: #0b8043;

      --google-yellow-100: #fce8b2;
      --google-yellow-300: #f7cb4d;
      --google-yellow-500: #f4b400;
      --google-yellow-700: #f09300;

      --google-grey-100: #f5f5f5;
      --google-grey-300: #e0e0e0;
      --google-grey-500: #9e9e9e;
      --google-grey-700: #616161;

      /* Material Design color palette from online spec document */

      --paper-red-50: #ffebee;
      --paper-red-100: #ffcdd2;
      --paper-red-200: #ef9a9a;
      --paper-red-300: #e57373;
      --paper-red-400: #ef5350;
      --paper-red-500: #f44336;
      --paper-red-600: #e53935;
      --paper-red-700: #d32f2f;
      --paper-red-800: #c62828;
      --paper-red-900: #b71c1c;
      --paper-red-a100: #ff8a80;
      --paper-red-a200: #ff5252;
      --paper-red-a400: #ff1744;
      --paper-red-a700: #d50000;

      --paper-pink-50: #fce4ec;
      --paper-pink-100: #f8bbd0;
      --paper-pink-200: #f48fb1;
      --paper-pink-300: #f06292;
      --paper-pink-400: #ec407a;
      --paper-pink-500: #e91e63;
      --paper-pink-600: #d81b60;
      --paper-pink-700: #c2185b;
      --paper-pink-800: #ad1457;
      --paper-pink-900: #880e4f;
      --paper-pink-a100: #ff80ab;
      --paper-pink-a200: #ff4081;
      --paper-pink-a400: #f50057;
      --paper-pink-a700: #c51162;

      --paper-purple-50: #f3e5f5;
      --paper-purple-100: #e1bee7;
      --paper-purple-200: #ce93d8;
      --paper-purple-300: #ba68c8;
      --paper-purple-400: #ab47bc;
      --paper-purple-500: #9c27b0;
      --paper-purple-600: #8e24aa;
      --paper-purple-700: #7b1fa2;
      --paper-purple-800: #6a1b9a;
      --paper-purple-900: #4a148c;
      --paper-purple-a100: #ea80fc;
      --paper-purple-a200: #e040fb;
      --paper-purple-a400: #d500f9;
      --paper-purple-a700: #aa00ff;

      --paper-deep-purple-50: #ede7f6;
      --paper-deep-purple-100: #d1c4e9;
      --paper-deep-purple-200: #b39ddb;
      --paper-deep-purple-300: #9575cd;
      --paper-deep-purple-400: #7e57c2;
      --paper-deep-purple-500: #673ab7;
      --paper-deep-purple-600: #5e35b1;
      --paper-deep-purple-700: #512da8;
      --paper-deep-purple-800: #4527a0;
      --paper-deep-purple-900: #311b92;
      --paper-deep-purple-a100: #b388ff;
      --paper-deep-purple-a200: #7c4dff;
      --paper-deep-purple-a400: #651fff;
      --paper-deep-purple-a700: #6200ea;

      --paper-indigo-50: #e8eaf6;
      --paper-indigo-100: #c5cae9;
      --paper-indigo-200: #9fa8da;
      --paper-indigo-300: #7986cb;
      --paper-indigo-400: #5c6bc0;
      --paper-indigo-500: #3f51b5;
      --paper-indigo-600: #3949ab;
      --paper-indigo-700: #303f9f;
      --paper-indigo-800: #283593;
      --paper-indigo-900: #1a237e;
      --paper-indigo-a100: #8c9eff;
      --paper-indigo-a200: #536dfe;
      --paper-indigo-a400: #3d5afe;
      --paper-indigo-a700: #304ffe;

      --paper-blue-50: #e3f2fd;
      --paper-blue-100: #bbdefb;
      --paper-blue-200: #90caf9;
      --paper-blue-300: #64b5f6;
      --paper-blue-400: #42a5f5;
      --paper-blue-500: #2196f3;
      --paper-blue-600: #1e88e5;
      --paper-blue-700: #1976d2;
      --paper-blue-800: #1565c0;
      --paper-blue-900: #0d47a1;
      --paper-blue-a100: #82b1ff;
      --paper-blue-a200: #448aff;
      --paper-blue-a400: #2979ff;
      --paper-blue-a700: #2962ff;

      --paper-light-blue-50: #e1f5fe;
      --paper-light-blue-100: #b3e5fc;
      --paper-light-blue-200: #81d4fa;
      --paper-light-blue-300: #4fc3f7;
      --paper-light-blue-400: #29b6f6;
      --paper-light-blue-500: #03a9f4;
      --paper-light-blue-600: #039be5;
      --paper-light-blue-700: #0288d1;
      --paper-light-blue-800: #0277bd;
      --paper-light-blue-900: #01579b;
      --paper-light-blue-a100: #80d8ff;
      --paper-light-blue-a200: #40c4ff;
      --paper-light-blue-a400: #00b0ff;
      --paper-light-blue-a700: #0091ea;

      --paper-cyan-50: #e0f7fa;
      --paper-cyan-100: #b2ebf2;
      --paper-cyan-200: #80deea;
      --paper-cyan-300: #4dd0e1;
      --paper-cyan-400: #26c6da;
      --paper-cyan-500: #00bcd4;
      --paper-cyan-600: #00acc1;
      --paper-cyan-700: #0097a7;
      --paper-cyan-800: #00838f;
      --paper-cyan-900: #006064;
      --paper-cyan-a100: #84ffff;
      --paper-cyan-a200: #18ffff;
      --paper-cyan-a400: #00e5ff;
      --paper-cyan-a700: #00b8d4;

      --paper-teal-50: #e0f2f1;
      --paper-teal-100: #b2dfdb;
      --paper-teal-200: #80cbc4;
      --paper-teal-300: #4db6ac;
      --paper-teal-400: #26a69a;
      --paper-teal-500: #009688;
      --paper-teal-600: #00897b;
      --paper-teal-700: #00796b;
      --paper-teal-800: #00695c;
      --paper-teal-900: #004d40;
      --paper-teal-a100: #a7ffeb;
      --paper-teal-a200: #64ffda;
      --paper-teal-a400: #1de9b6;
      --paper-teal-a700: #00bfa5;

      --paper-green-50: #e8f5e9;
      --paper-green-100: #c8e6c9;
      --paper-green-200: #a5d6a7;
      --paper-green-300: #81c784;
      --paper-green-400: #66bb6a;
      --paper-green-500: #4caf50;
      --paper-green-600: #43a047;
      --paper-green-700: #388e3c;
      --paper-green-800: #2e7d32;
      --paper-green-900: #1b5e20;
      --paper-green-a100: #b9f6ca;
      --paper-green-a200: #69f0ae;
      --paper-green-a400: #00e676;
      --paper-green-a700: #00c853;

      --paper-light-green-50: #f1f8e9;
      --paper-light-green-100: #dcedc8;
      --paper-light-green-200: #c5e1a5;
      --paper-light-green-300: #aed581;
      --paper-light-green-400: #9ccc65;
      --paper-light-green-500: #8bc34a;
      --paper-light-green-600: #7cb342;
      --paper-light-green-700: #689f38;
      --paper-light-green-800: #558b2f;
      --paper-light-green-900: #33691e;
      --paper-light-green-a100: #ccff90;
      --paper-light-green-a200: #b2ff59;
      --paper-light-green-a400: #76ff03;
      --paper-light-green-a700: #64dd17;

      --paper-lime-50: #f9fbe7;
      --paper-lime-100: #f0f4c3;
      --paper-lime-200: #e6ee9c;
      --paper-lime-300: #dce775;
      --paper-lime-400: #d4e157;
      --paper-lime-500: #cddc39;
      --paper-lime-600: #c0ca33;
      --paper-lime-700: #afb42b;
      --paper-lime-800: #9e9d24;
      --paper-lime-900: #827717;
      --paper-lime-a100: #f4ff81;
      --paper-lime-a200: #eeff41;
      --paper-lime-a400: #c6ff00;
      --paper-lime-a700: #aeea00;

      --paper-yellow-50: #fffde7;
      --paper-yellow-100: #fff9c4;
      --paper-yellow-200: #fff59d;
      --paper-yellow-300: #fff176;
      --paper-yellow-400: #ffee58;
      --paper-yellow-500: #ffeb3b;
      --paper-yellow-600: #fdd835;
      --paper-yellow-700: #fbc02d;
      --paper-yellow-800: #f9a825;
      --paper-yellow-900: #f57f17;
      --paper-yellow-a100: #ffff8d;
      --paper-yellow-a200: #ffff00;
      --paper-yellow-a400: #ffea00;
      --paper-yellow-a700: #ffd600;

      --paper-amber-50: #fff8e1;
      --paper-amber-100: #ffecb3;
      --paper-amber-200: #ffe082;
      --paper-amber-300: #ffd54f;
      --paper-amber-400: #ffca28;
      --paper-amber-500: #ffc107;
      --paper-amber-600: #ffb300;
      --paper-amber-700: #ffa000;
      --paper-amber-800: #ff8f00;
      --paper-amber-900: #ff6f00;
      --paper-amber-a100: #ffe57f;
      --paper-amber-a200: #ffd740;
      --paper-amber-a400: #ffc400;
      --paper-amber-a700: #ffab00;

      --paper-orange-50: #fff3e0;
      --paper-orange-100: #ffe0b2;
      --paper-orange-200: #ffcc80;
      --paper-orange-300: #ffb74d;
      --paper-orange-400: #ffa726;
      --paper-orange-500: #ff9800;
      --paper-orange-600: #fb8c00;
      --paper-orange-700: #f57c00;
      --paper-orange-800: #ef6c00;
      --paper-orange-900: #e65100;
      --paper-orange-a100: #ffd180;
      --paper-orange-a200: #ffab40;
      --paper-orange-a400: #ff9100;
      --paper-orange-a700: #ff6500;

      --paper-deep-orange-50: #fbe9e7;
      --paper-deep-orange-100: #ffccbc;
      --paper-deep-orange-200: #ffab91;
      --paper-deep-orange-300: #ff8a65;
      --paper-deep-orange-400: #ff7043;
      --paper-deep-orange-500: #ff5722;
      --paper-deep-orange-600: #f4511e;
      --paper-deep-orange-700: #e64a19;
      --paper-deep-orange-800: #d84315;
      --paper-deep-orange-900: #bf360c;
      --paper-deep-orange-a100: #ff9e80;
      --paper-deep-orange-a200: #ff6e40;
      --paper-deep-orange-a400: #ff3d00;
      --paper-deep-orange-a700: #dd2c00;

      --paper-brown-50: #efebe9;
      --paper-brown-100: #d7ccc8;
      --paper-brown-200: #bcaaa4;
      --paper-brown-300: #a1887f;
      --paper-brown-400: #8d6e63;
      --paper-brown-500: #795548;
      --paper-brown-600: #6d4c41;
      --paper-brown-700: #5d4037;
      --paper-brown-800: #4e342e;
      --paper-brown-900: #3e2723;

      --paper-grey-50: #fafafa;
      --paper-grey-100: #f5f5f5;
      --paper-grey-200: #eeeeee;
      --paper-grey-300: #e0e0e0;
      --paper-grey-400: #bdbdbd;
      --paper-grey-500: #9e9e9e;
      --paper-grey-600: #757575;
      --paper-grey-700: #616161;
      --paper-grey-800: #424242;
      --paper-grey-900: #212121;

      --paper-blue-grey-50: #eceff1;
      --paper-blue-grey-100: #cfd8dc;
      --paper-blue-grey-200: #b0bec5;
      --paper-blue-grey-300: #90a4ae;
      --paper-blue-grey-400: #78909c;
      --paper-blue-grey-500: #607d8b;
      --paper-blue-grey-600: #546e7a;
      --paper-blue-grey-700: #455a64;
      --paper-blue-grey-800: #37474f;
      --paper-blue-grey-900: #263238;

      /* opacity for dark text on a light background */
      --dark-divider-opacity: 0.12;
      --dark-disabled-opacity: 0.38; /* or hint text or icon */
      --dark-secondary-opacity: 0.54;
      --dark-primary-opacity: 0.87;

      /* opacity for light text on a dark background */
      --light-divider-opacity: 0.12;
      --light-disabled-opacity: 0.3; /* or hint text or icon */
      --light-secondary-opacity: 0.7;
      --light-primary-opacity: 1.0;

    }

  </style>
</custom-style>
`;r.setAttribute("style","display: none;"),document.head.appendChild(r.content);const s=n.d`
<custom-style>
  <style is="custom-style">
    html {
      /*
       * You can use these generic variables in your elements for easy theming.
       * For example, if all your elements use \`--primary-text-color\` as its main
       * color, then switching from a light to a dark theme is just a matter of
       * changing the value of \`--primary-text-color\` in your application.
       */
      --primary-text-color: var(--light-theme-text-color);
      --primary-background-color: var(--light-theme-background-color);
      --secondary-text-color: var(--light-theme-secondary-color);
      --disabled-text-color: var(--light-theme-disabled-color);
      --divider-color: var(--light-theme-divider-color);
      --error-color: var(--paper-deep-orange-a700);

      /*
       * Primary and accent colors. Also see color.js for more colors.
       */
      --primary-color: var(--paper-indigo-500);
      --light-primary-color: var(--paper-indigo-100);
      --dark-primary-color: var(--paper-indigo-700);

      --accent-color: var(--paper-pink-a200);
      --light-accent-color: var(--paper-pink-a100);
      --dark-accent-color: var(--paper-pink-a400);


      /*
       * Material Design Light background theme
       */
      --light-theme-background-color: #ffffff;
      --light-theme-base-color: #000000;
      --light-theme-text-color: var(--paper-grey-900);
      --light-theme-secondary-color: #737373;  /* for secondary text and icons */
      --light-theme-disabled-color: #9b9b9b;  /* disabled/hint text */
      --light-theme-divider-color: #dbdbdb;

      /*
       * Material Design Dark background theme
       */
      --dark-theme-background-color: var(--paper-grey-900);
      --dark-theme-base-color: #ffffff;
      --dark-theme-text-color: #ffffff;
      --dark-theme-secondary-color: #bcbcbc;  /* for secondary text and icons */
      --dark-theme-disabled-color: #646464;  /* disabled/hint text */
      --dark-theme-divider-color: #3c3c3c;

      /*
       * Deprecated values because of their confusing names.
       */
      --text-primary-color: var(--dark-theme-text-color);
      --default-primary-color: var(--primary-color);
    }
  </style>
</custom-style>`;s.setAttribute("style","display: none;"),document.head.appendChild(s.content)},5475:(e,t,i)=>{if(i(6550),!window.polymerSkipLoadingFontRoboto){const e=document.createElement("link");e.rel="stylesheet",e.type="text/css",e.crossOrigin="anonymous",e.href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,700|Roboto:400,300,300italic,400italic,500,500italic,700,700italic",document.head.appendChild(e)}const n=i(1121).d`<custom-style>
  <style is="custom-style">
    html {

      /* Shared Styles */
      --paper-font-common-base: {
        font-family: 'Roboto', 'Noto', sans-serif;
        -webkit-font-smoothing: antialiased;
      };

      --paper-font-common-code: {
        font-family: 'Roboto Mono', 'Consolas', 'Menlo', monospace;
        -webkit-font-smoothing: antialiased;
      };

      --paper-font-common-expensive-kerning: {
        text-rendering: optimizeLegibility;
      };

      --paper-font-common-nowrap: {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      };

      /* Material Font Styles */

      --paper-font-display4: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 112px;
        font-weight: 300;
        letter-spacing: -.044em;
        line-height: 120px;
      };

      --paper-font-display3: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 56px;
        font-weight: 400;
        letter-spacing: -.026em;
        line-height: 60px;
      };

      --paper-font-display2: {
        @apply --paper-font-common-base;

        font-size: 45px;
        font-weight: 400;
        letter-spacing: -.018em;
        line-height: 48px;
      };

      --paper-font-display1: {
        @apply --paper-font-common-base;

        font-size: 34px;
        font-weight: 400;
        letter-spacing: -.01em;
        line-height: 40px;
      };

      --paper-font-headline: {
        @apply --paper-font-common-base;

        font-size: 24px;
        font-weight: 400;
        letter-spacing: -.012em;
        line-height: 32px;
      };

      --paper-font-title: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
      };

      --paper-font-subhead: {
        @apply --paper-font-common-base;

        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
      };

      --paper-font-body2: {
        @apply --paper-font-common-base;

        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
      };

      --paper-font-body1: {
        @apply --paper-font-common-base;

        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
      };

      --paper-font-caption: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 12px;
        font-weight: 400;
        letter-spacing: 0.011em;
        line-height: 20px;
      };

      --paper-font-menu: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 13px;
        font-weight: 500;
        line-height: 24px;
      };

      --paper-font-button: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.018em;
        line-height: 24px;
        text-transform: uppercase;
      };

      --paper-font-code2: {
        @apply --paper-font-common-code;

        font-size: 14px;
        font-weight: 700;
        line-height: 20px;
      };

      --paper-font-code1: {
        @apply --paper-font-common-code;

        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
      };

    }

  </style>
</custom-style>`;n.setAttribute("style","display: none;"),document.head.appendChild(n.content)},4262:(e,t,i)=>{i.d(t,{t:()=>p}),i(7894);var n=i(9967),r=i(9387);let s={},a={};function o(e,t){s[e]=a[e.toLowerCase()]=t}function l(e){return s[e]||a[e.toLowerCase()]}class p extends HTMLElement{static get observedAttributes(){return["id"]}static import(e,t){if(e){let i=l(e);return i&&t?i.querySelector(t):i}return null}attributeChangedCallback(e,t,i,n){t!==i&&this.register()}get assetpath(){if(!this.__assetpath){const e=window.HTMLImports&&HTMLImports.importForElement?HTMLImports.importForElement(this)||document:this.ownerDocument,t=(0,n.Kk)(this.getAttribute("assetpath")||"",e.baseURI);this.__assetpath=(0,n.iY)(t)}return this.__assetpath}register(e){if(e=e||this.id){if(r.XN&&void 0!==l(e))throw o(e,null),new Error(`strictTemplatePolicy: dom-module ${e} re-registered`);this.id=e,o(e,this),(t=this).querySelector("style")&&console.warn("dom-module %s has style outside template",t.id)}var t}}p.prototype.modules=s,customElements.define("dom-module",p)},2205:(e,t,i)=>{i.d(t,{x:()=>ve});var n=i(3027);class r{constructor(){this.start=0,this.end=0,this.previous=null,this.parent=null,this.rules=null,this.parsedCssText="",this.cssText="",this.atRule=!1,this.type=0,this.keyframesName="",this.selector="",this.parsedSelector=""}}function s(e){return a(function(e){let t=new r;t.start=0,t.end=e.length;let i=t;for(let n=0,s=e.length;n<s;n++)if(e[n]===p){i.rules||(i.rules=[]);let e=i,t=e.rules[e.rules.length-1]||null;i=new r,i.start=n+1,i.parent=e,i.previous=t,e.rules.push(i)}else e[n]===d&&(i.end=n+1,i=i.parent||t);return t}(e=e.replace(c.comments,"").replace(c.port,"")),e)}function a(e,t){let i=t.substring(e.start,e.end-1);if(e.parsedCssText=e.cssText=i.trim(),e.parent){let n=e.previous?e.previous.end:e.parent.start;i=t.substring(n,e.start-1),i=function(e){return e.replace(/\\([0-9a-f]{1,6})\s/gi,(function(){let e=arguments[1],t=6-e.length;for(;t--;)e="0"+e;return"\\"+e}))}(i),i=i.replace(c.multipleSpaces," "),i=i.substring(i.lastIndexOf(";")+1);let r=e.parsedSelector=e.selector=i.trim();e.atRule=0===r.indexOf(f),e.atRule?0===r.indexOf(u)?e.type=l.MEDIA_RULE:r.match(c.keyframesRule)&&(e.type=l.KEYFRAMES_RULE,e.keyframesName=e.selector.split(c.multipleSpaces).pop()):0===r.indexOf(h)?e.type=l.MIXIN_RULE:e.type=l.STYLE_RULE}let n=e.rules;if(n)for(let e,i=0,r=n.length;i<r&&(e=n[i]);i++)a(e,t);return e}function o(e,t,i=""){let n="";if(e.cssText||e.rules){let i=e.rules;if(i&&!function(e){let t=e[0];return Boolean(t)&&Boolean(t.selector)&&0===t.selector.indexOf(h)}(i))for(let e,r=0,s=i.length;r<s&&(e=i[r]);r++)n=o(e,t,n);else n=t?e.cssText:function(e){return function(e){return e.replace(c.mixinApply,"").replace(c.varApply,"")}(e=function(e){return e.replace(c.customProp,"").replace(c.mixinProp,"")}(e))}(e.cssText),n=n.trim(),n&&(n="  "+n+"\n")}return n&&(e.selector&&(i+=e.selector+" "+p+"\n"),i+=n,e.selector&&(i+=d+"\n\n")),i}const l={STYLE_RULE:1,KEYFRAMES_RULE:7,MEDIA_RULE:4,MIXIN_RULE:1e3},p="{",d="}",c={comments:/\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,port:/@import[^;]*;/gim,customProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,mixinProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,mixinApply:/@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,varApply:/[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,keyframesRule:/^@[^\s]*keyframes/,multipleSpaces:/\s+/g},h="--",u="@media",f="@";var _=i(9669);const m=new Set;function y(e){const t=e.textContent;if(!m.has(t)){m.add(t);const e=document.createElement("style");e.setAttribute("shady-unscoped",""),e.textContent=t,document.head.appendChild(e)}}function b(e){return e.hasAttribute("shady-unscoped")}function g(e,t){return e?("string"==typeof e&&(e=s(e)),t&&w(e,t),o(e,n.rd)):""}function v(e){return!e.__cssRules&&e.textContent&&(e.__cssRules=s(e.textContent)),e.__cssRules||null}function w(e,t,i,n){if(!e)return;let r=!1,s=e.type;if(n&&s===l.MEDIA_RULE){let t=e.selector.match(_.mA);t&&(window.matchMedia(t[1]).matches||(r=!0))}s===l.STYLE_RULE?t(e):i&&s===l.KEYFRAMES_RULE?i(e):s===l.MIXIN_RULE&&(r=!0);let a=e.rules;if(a&&!r)for(let e,r=0,s=a.length;r<s&&(e=a[r]);r++)w(e,t,i,n)}function x(e,t){let i=e.indexOf("var(");if(-1===i)return t(e,"","","");let n=function(e,t){let i=0;for(let n=t,r=e.length;n<r;n++)if("("===e[n])i++;else if(")"===e[n]&&0==--i)return n;return-1}(e,i+3),r=e.substring(i+4,n),s=e.substring(0,i),a=x(e.substring(n+1),t),o=r.indexOf(",");return-1===o?t(s,r.trim(),"",a):t(s,r.substring(0,o).trim(),r.substring(o+1).trim(),a)}window.ShadyDOM&&window.ShadyDOM.wrap;const C="css-build";function S(e){return""!==function(e){if(void 0!==n.Cp)return n.Cp;if(void 0===e.__cssBuild){const t=e.getAttribute(C);if(t)e.__cssBuild=t;else{const t=function(e){const t="template"===e.localName?e.content.firstChild:e.firstChild;if(t instanceof Comment){const e=t.textContent.trim().split(":");if(e[0]===C)return e[1]}return""}(e);""!==t&&function(e){const t="template"===e.localName?e.content.firstChild:e.firstChild;t.parentNode.removeChild(t)}(e),e.__cssBuild=t}}return e.__cssBuild||""}(e)}var k=i(1322);const P=/;\s*/m,E=/^\s*(initial)|(inherit)\s*$/,A=/\s*!important/,O="_-_";class T{constructor(){this._map={}}set(e,t){e=e.trim(),this._map[e]={properties:t,dependants:{}}}get(e){return e=e.trim(),this._map[e]||null}}let I=null;class N{constructor(){this._currentElement=null,this._measureElement=null,this._map=new T}detectMixin(e){return(0,k.OH)(e)}gatherStyles(e){const t=function(e){const t=[],i=e.querySelectorAll("style");for(let e=0;e<i.length;e++){const r=i[e];b(r)?n.WA||(y(r),r.parentNode.removeChild(r)):(t.push(r.textContent),r.parentNode.removeChild(r))}return t.join("").trim()}(e.content);if(t){const i=document.createElement("style");return i.textContent=t,e.content.insertBefore(i,e.content.firstChild),i}return null}transformTemplate(e,t){void 0===e._gatheredStyle&&(e._gatheredStyle=this.gatherStyles(e));const i=e._gatheredStyle;return i?this.transformStyle(i,t):null}transformStyle(e,t=""){let i=v(e);return this.transformRules(i,t),e.textContent=g(i),i}transformCustomStyle(e){let t=v(e);return w(t,(e=>{":root"===e.selector&&(e.selector="html"),this.transformRule(e)})),e.textContent=g(t),t}transformRules(e,t){this._currentElement=t,w(e,(e=>{this.transformRule(e)})),this._currentElement=null}transformRule(e){e.cssText=this.transformCssText(e.parsedCssText,e),":root"===e.selector&&(e.selector=":host > *")}transformCssText(e,t){return e=e.replace(_.CN,((e,i,n,r)=>this._produceCssProperties(e,i,n,r,t))),this._consumeCssProperties(e,t)}_getInitialValueForProperty(e){return this._measureElement||(this._measureElement=document.createElement("meta"),this._measureElement.setAttribute("apply-shim-measure",""),this._measureElement.style.all="initial",document.head.appendChild(this._measureElement)),window.getComputedStyle(this._measureElement).getPropertyValue(e)}_fallbacksFromPreviousRules(e){let t=e;for(;t.parent;)t=t.parent;const i={};let n=!1;return w(t,(t=>{n=n||t===e,n||t.selector===e.selector&&Object.assign(i,this._cssTextToMap(t.parsedCssText))})),i}_consumeCssProperties(e,t){let i=null;for(;i=_.$T.exec(e);){let n=i[0],r=i[1],s=i.index,a=s+n.indexOf("@apply"),o=s+n.length,l=e.slice(0,a),p=e.slice(o),d=t?this._fallbacksFromPreviousRules(t):{};Object.assign(d,this._cssTextToMap(l));let c=this._atApplyToCssProperties(r,d);e=`${l}${c}${p}`,_.$T.lastIndex=s+c.length}return e}_atApplyToCssProperties(e,t){e=e.replace(P,"");let i=[],n=this._map.get(e);if(n||(this._map.set(e,{}),n=this._map.get(e)),n){let r,s,a;this._currentElement&&(n.dependants[this._currentElement]=!0);const o=n.properties;for(r in o)a=t&&t[r],s=[r,": var(",e,O,r],a&&s.push(",",a.replace(A,"")),s.push(")"),A.test(o[r])&&s.push(" !important"),i.push(s.join(""))}return i.join("; ")}_replaceInitialOrInherit(e,t){let i=E.exec(t);return i&&(t=i[1]?this._getInitialValueForProperty(e):"apply-shim-inherit"),t}_cssTextToMap(e,t=!1){let i,n,r=e.split(";"),s={};for(let e,a,o=0;o<r.length;o++)e=r[o],e&&(a=e.split(":"),a.length>1&&(i=a[0].trim(),n=a.slice(1).join(":"),t&&(n=this._replaceInitialOrInherit(i,n)),s[i]=n));return s}_invalidateMixinEntry(e){if(I)for(let t in e.dependants)t!==this._currentElement&&I(t)}_produceCssProperties(e,t,i,n,r){if(i&&x(i,((e,t)=>{t&&this._map.get(t)&&(n=`@apply ${t};`)})),!n)return e;let s=this._consumeCssProperties(""+n,r),a=e.slice(0,e.indexOf("--")),o=this._cssTextToMap(s,!0),l=o,p=this._map.get(t),d=p&&p.properties;d?l=Object.assign(Object.create(d),o):this._map.set(t,l);let c,h,u=[],f=!1;for(c in l)h=o[c],void 0===h&&(h="initial"),d&&!(c in d)&&(f=!0),u.push(`${t}${O}${c}: ${h}`);return f&&this._invalidateMixinEntry(p),p&&(p.properties=l),i&&(a=`${e};${a}`),`${a}${u.join("; ")};`}}N.prototype.detectMixin=N.prototype.detectMixin,N.prototype.transformStyle=N.prototype.transformStyle,N.prototype.transformCustomStyle=N.prototype.transformCustomStyle,N.prototype.transformRules=N.prototype.transformRules,N.prototype.transformRule=N.prototype.transformRule,N.prototype.transformTemplate=N.prototype.transformTemplate,N.prototype._separator=O,Object.defineProperty(N.prototype,"invalidCallback",{get:()=>I,set(e){I=e}});const R=N,D={},L="_applyShimCurrentVersion",M="_applyShimNextVersion",F="_applyShimValidatingVersion",z=Promise.resolve();function B(e){let t=D[e];t&&function(e){e[L]=e[L]||0,e[F]=e[F]||0,e[M]=(e[M]||0)+1}(t)}function H(e){return e[L]===e[M]}i(3734);const $=new R;class j{constructor(){this.customStyleInterface=null,$.invalidCallback=B}ensure(){this.customStyleInterface||window.ShadyCSS.CustomStyleInterface&&(this.customStyleInterface=window.ShadyCSS.CustomStyleInterface,this.customStyleInterface.transformCallback=e=>{$.transformCustomStyle(e)},this.customStyleInterface.validateCallback=()=>{requestAnimationFrame((()=>{this.customStyleInterface.enqueued&&this.flushCustomStyles()}))})}prepareTemplate(e,t){if(this.ensure(),S(e))return;D[t]=e;let i=$.transformTemplate(e,t);e._styleAst=i}flushCustomStyles(){if(this.ensure(),!this.customStyleInterface)return;let e=this.customStyleInterface.processStyles();if(this.customStyleInterface.enqueued){for(let t=0;t<e.length;t++){let i=e[t],n=this.customStyleInterface.getStyleForCustomStyle(i);n&&$.transformCustomStyle(n)}this.customStyleInterface.enqueued=!1}}styleSubtree(e,t){if(this.ensure(),t&&(0,k.wW)(e,t),e.shadowRoot){this.styleElement(e);let t=e.shadowRoot.children||e.shadowRoot.childNodes;for(let e=0;e<t.length;e++)this.styleSubtree(t[e])}else{let t=e.children||e.childNodes;for(let e=0;e<t.length;e++)this.styleSubtree(t[e])}}styleElement(e){this.ensure();let{is:t}=function(e){let t=e.localName,i="",n="";return t?t.indexOf("-")>-1?i=t:(n=t,i=e.getAttribute&&e.getAttribute("is")||""):(i=e.is,n=e.extends),{is:i,typeExtension:n}}(e),i=D[t];if((!i||!S(i))&&i&&!H(i)){(function(e){return!H(e)&&e[F]===e[M]})(i)||(this.prepareTemplate(i,t),function(e){e[F]=e[M],e._validating||(e._validating=!0,z.then((function(){e[L]=e[M],e._validating=!1})))}(i));let n=e.shadowRoot;if(n){let e=n.querySelector("style");e&&(e.__cssRules=i._styleAst,e.textContent=g(i._styleAst))}}}styleDocument(e){this.ensure(),this.styleSubtree(document.body,e)}}if(!window.ShadyCSS||!window.ShadyCSS.ScopingShim){const e=new j;let t=window.ShadyCSS&&window.ShadyCSS.CustomStyleInterface;window.ShadyCSS={prepareTemplate(t,i,n){e.flushCustomStyles(),e.prepareTemplate(t,i)},prepareTemplateStyles(e,t,i){window.ShadyCSS.prepareTemplate(e,t,i)},prepareTemplateDom(e,t){},styleSubtree(t,i){e.flushCustomStyles(),e.styleSubtree(t,i)},styleElement(t){e.flushCustomStyles(),e.styleElement(t)},styleDocument(t){e.flushCustomStyles(),e.styleDocument(t)},getComputedStyleValue:(e,t)=>(0,k.B7)(e,t),flushCustomStyles(){e.flushCustomStyles()},nativeCss:n.rd,nativeShadow:n.WA,cssBuild:n.Cp,disableRuntime:n.jF},t&&(window.ShadyCSS.CustomStyleInterface=t)}window.ShadyCSS.ApplyShim=$;var q=i(581),V=i(6163),U=i(3104),K=i(1014);const Y=/:host\(:dir\((ltr|rtl)\)\)/g,J=/([\s\w-#\.\[\]\*]*):dir\((ltr|rtl)\)/g,W=/:dir\((?:ltr|rtl)\)/,X=Boolean(window.ShadyDOM&&window.ShadyDOM.inUse),G=[];let Z=null,Q="";function ee(){Q=document.documentElement.getAttribute("dir")}function te(e){e.__autoDirOptOut||e.setAttribute("dir",Q)}function ie(){ee(),Q=document.documentElement.getAttribute("dir");for(let e=0;e<G.length;e++)te(G[e])}const ne=(0,K.o)((e=>{X||Z||(ee(),Z=new MutationObserver(ie),Z.observe(document.documentElement,{attributes:!0,attributeFilter:["dir"]}));const t=(0,U.Q)(e);class i extends t{static _processStyleText(e,i){return e=t._processStyleText.call(this,e,i),!X&&W.test(e)&&(e=this._replaceDirInCssText(e),this.__activateDir=!0),e}static _replaceDirInCssText(e){let t=e;return t=t.replace(Y,':host([dir="$1"])'),t=t.replace(J,':host([dir="$2"]) $1'),t}constructor(){super(),this.__autoDirOptOut=!1}ready(){super.ready(),this.__autoDirOptOut=this.hasAttribute("dir")}connectedCallback(){t.prototype.connectedCallback&&super.connectedCallback(),this.constructor.__activateDir&&(Z&&Z.takeRecords().length&&ie(),G.push(this),te(this))}disconnectedCallback(){if(t.prototype.disconnectedCallback&&super.disconnectedCallback(),this.constructor.__activateDir){const e=G.indexOf(this);e>-1&&G.splice(e,1)}}}return i.__activateDir=!1,i}));function re(){document.body.removeAttribute("unresolved")}i(2223),"interactive"===document.readyState||"complete"===document.readyState?re():window.addEventListener("DOMContentLoaded",re);var se=i(8876),ae=i(4010),oe=i(5313),le=i(2224),pe=i(1446),de=i(1342);i(7894);const ce=window.ShadyDOM,he=window.ShadyCSS;function ue(e,t){return(0,de.r)(e).getRootNode()===t}var fe=i(9387);const _e="disable-upgrade",me=e=>{for(;e;){const t=Object.getOwnPropertyDescriptor(e,"observedAttributes");if(t)return t.get;e=Object.getPrototypeOf(e.prototype).constructor}return()=>[]};(0,K.o)((e=>{const t=(0,q.SH)(e);let i=me(t);return class extends t{constructor(){super(),this.__isUpgradeDisabled}static get observedAttributes(){return i.call(this).concat(_e)}_initializeProperties(){this.hasAttribute(_e)?this.__isUpgradeDisabled=!0:super._initializeProperties()}_enableProperties(){this.__isUpgradeDisabled||super._enableProperties()}_canApplyPropertyDefault(e){return super._canApplyPropertyDefault(e)&&!(this.__isUpgradeDisabled&&this._isPropertyPending(e))}attributeChangedCallback(e,t,i,n){e==_e?this.__isUpgradeDisabled&&null==i&&(super._initializeProperties(),this.__isUpgradeDisabled=!1,(0,de.r)(this).isConnected&&super.connectedCallback()):super.attributeChangedCallback(e,t,i,n)}connectedCallback(){this.__isUpgradeDisabled||super.connectedCallback()}disconnectedCallback(){this.__isUpgradeDisabled||super.disconnectedCallback()}}}));var ye=i(3501);const be="disable-upgrade";let ge=window.ShadyCSS;const ve=(0,K.o)((e=>{const t=(0,V._)((0,q.SH)(e)),i=q.PP?t:ne(t),n=me(i),r={x:"pan-x",y:"pan-y",none:"none",all:"auto"};class s extends i{constructor(){super(),this.isAttached,this.__boundListeners,this._debouncers,this.__isUpgradeDisabled,this.__needsAttributesAtConnected,this._legacyForceObservedAttributes}static get importMeta(){return this.prototype.importMeta}created(){}__attributeReaction(e,t,i){(this.__dataAttributes&&this.__dataAttributes[e]||e===be)&&this.attributeChangedCallback(e,t,i,null)}setAttribute(e,t){if(fe.j8&&!this._legacyForceObservedAttributes){const i=this.getAttribute(e);super.setAttribute(e,t),this.__attributeReaction(e,i,String(t))}else super.setAttribute(e,t)}removeAttribute(e){if(fe.j8&&!this._legacyForceObservedAttributes){const t=this.getAttribute(e);super.removeAttribute(e),this.__attributeReaction(e,t,null)}else super.removeAttribute(e)}static get observedAttributes(){return fe.j8&&!this.prototype._legacyForceObservedAttributes?(this.hasOwnProperty(JSCompiler_renameProperty("__observedAttributes",this))||(this.__observedAttributes=[],(0,ye.z2)(this.prototype)),this.__observedAttributes):n.call(this).concat(be)}_enableProperties(){this.__isUpgradeDisabled||super._enableProperties()}_canApplyPropertyDefault(e){return super._canApplyPropertyDefault(e)&&!(this.__isUpgradeDisabled&&this._isPropertyPending(e))}connectedCallback(){this.__needsAttributesAtConnected&&this._takeAttributes(),this.__isUpgradeDisabled||(super.connectedCallback(),this.isAttached=!0,this.attached())}attached(){}disconnectedCallback(){this.__isUpgradeDisabled||(super.disconnectedCallback(),this.isAttached=!1,this.detached())}detached(){}attributeChangedCallback(e,t,i,n){t!==i&&(e==be?this.__isUpgradeDisabled&&null==i&&(this._initializeProperties(),this.__isUpgradeDisabled=!1,(0,de.r)(this).isConnected&&this.connectedCallback()):(super.attributeChangedCallback(e,t,i,n),this.attributeChanged(e,t,i)))}attributeChanged(e,t,i){}_initializeProperties(){if(fe.nL&&this.hasAttribute(be))this.__isUpgradeDisabled=!0;else{let e=Object.getPrototypeOf(this);e.hasOwnProperty(JSCompiler_renameProperty("__hasRegisterFinished",e))||(this._registered(),e.__hasRegisterFinished=!0),super._initializeProperties(),this.root=this,this.created(),fe.j8&&!this._legacyForceObservedAttributes&&(this.hasAttributes()?this._takeAttributes():this.parentNode||(this.__needsAttributesAtConnected=!0)),this._applyListeners()}}_takeAttributes(){const e=this.attributes;for(let t=0,i=e.length;t<i;t++){const i=e[t];this.__attributeReaction(i.name,null,i.value)}}_registered(){}ready(){this._ensureAttributes(),super.ready()}_ensureAttributes(){}_applyListeners(){}serialize(e){return this._serializeValue(e)}deserialize(e,t){return this._deserializeValue(e,t)}reflectPropertyToAttribute(e,t,i){this._propertyToAttribute(e,t,i)}serializeValueToAttribute(e,t,i){this._valueToNodeAttribute(i||this,e,t)}extend(e,t){if(!e||!t)return e||t;let i=Object.getOwnPropertyNames(t);for(let n,r=0;r<i.length&&(n=i[r]);r++){let i=Object.getOwnPropertyDescriptor(t,n);i&&Object.defineProperty(e,n,i)}return e}mixin(e,t){for(let i in t)e[i]=t[i];return e}chainObject(e,t){return e&&t&&e!==t&&(e.__proto__=t),e}instanceTemplate(e){let t=this.constructor._contentForTemplate(e);return document.importNode(t,!0)}fire(e,t,i){i=i||{},t=null==t?{}:t;let n=new Event(e,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});n.detail=t;let r=i.node||this;return(0,de.r)(r).dispatchEvent(n),n}listen(e,t,i){e=e||this;let n=this.__boundListeners||(this.__boundListeners=new WeakMap),r=n.get(e);r||(r={},n.set(e,r));let s=t+i;r[s]||(r[s]=this._addMethodEventListenerToNode(e,t,i,this))}unlisten(e,t,i){e=e||this;let n=this.__boundListeners&&this.__boundListeners.get(e),r=t+i,s=n&&n[r];s&&(this._removeEventListenerFromNode(e,t,s),n[r]=null)}setScrollDirection(e,t){(0,ae.BP)(t||this,r[e]||"auto")}$$(e){return this.root.querySelector(e)}get domHost(){let e=(0,de.r)(this).getRootNode();return e instanceof DocumentFragment?e.host:e}distributeContent(){const e=(0,se.vz)(this);window.ShadyDOM&&e.shadowRoot&&ShadyDOM.flush()}getEffectiveChildNodes(){return(0,se.vz)(this).getEffectiveChildNodes()}queryDistributedElements(e){return(0,se.vz)(this).queryDistributedElements(e)}getEffectiveChildren(){return this.getEffectiveChildNodes().filter((function(e){return e.nodeType===Node.ELEMENT_NODE}))}getEffectiveTextContent(){let e=this.getEffectiveChildNodes(),t=[];for(let i,n=0;i=e[n];n++)i.nodeType!==Node.COMMENT_NODE&&t.push(i.textContent);return t.join("")}queryEffectiveChildren(e){let t=this.queryDistributedElements(e);return t&&t[0]}queryAllEffectiveChildren(e){return this.queryDistributedElements(e)}getContentChildNodes(e){let t=this.root.querySelector(e||"slot");return t?(0,se.vz)(t).getDistributedNodes():[]}getContentChildren(e){return this.getContentChildNodes(e).filter((function(e){return e.nodeType===Node.ELEMENT_NODE}))}isLightDescendant(e){const t=this;return t!==e&&(0,de.r)(t).contains(e)&&(0,de.r)(t).getRootNode()===(0,de.r)(e).getRootNode()}isLocalDescendant(e){return this.root===(0,de.r)(e).getRootNode()}scopeSubtree(e,t=!1){return function(e,t=!1){if(!ce||!he)return null;if(!ce.handlesDynamicScoping)return null;const i=he.ScopingShim;if(!i)return null;const n=i.scopeForNode(e),r=(0,de.r)(e).getRootNode(),s=e=>{if(!ue(e,r))return;const t=Array.from(ce.nativeMethods.querySelectorAll.call(e,"*"));t.push(e);for(let e=0;e<t.length;e++){const s=t[e];if(!ue(s,r))continue;const a=i.currentScopeForNode(s);a!==n&&(""!==a&&i.unscopeNode(s,a),i.scopeNode(s,n))}};if(s(e),t){const t=new MutationObserver((e=>{for(let t=0;t<e.length;t++){const i=e[t];for(let e=0;e<i.addedNodes.length;e++){const t=i.addedNodes[e];t.nodeType===Node.ELEMENT_NODE&&s(t)}}}));return t.observe(e,{childList:!0,subtree:!0}),t}return null}(e,t)}getComputedStyleValue(e){return ge.getComputedStyleValue(this,e)}debounce(e,t,i){return this._debouncers=this._debouncers||{},this._debouncers[e]=oe.dx.debounce(this._debouncers[e],i>0?le.Wc.after(i):le.YA,t.bind(this))}isDebouncerActive(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];return!(!t||!t.isActive())}flushDebouncer(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];t&&t.flush()}cancelDebouncer(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];t&&t.cancel()}async(e,t){return t>0?le.Wc.run(e.bind(this),t):~le.YA.run(e.bind(this))}cancelAsync(e){e<0?le.YA.cancel(~e):le.Wc.cancel(e)}create(e,t){let i=document.createElement(e);if(t)if(i.setProperties)i.setProperties(t);else for(let e in t)i[e]=t[e];return i}elementMatches(e,t){return(0,se.Ku)(t||this,e)}toggleAttribute(e,t){let i=this;return 3===arguments.length&&(i=arguments[2]),1==arguments.length&&(t=!i.hasAttribute(e)),t?((0,de.r)(i).setAttribute(e,""),!0):((0,de.r)(i).removeAttribute(e),!1)}toggleClass(e,t,i){i=i||this,1==arguments.length&&(t=!i.classList.contains(e)),t?i.classList.add(e):i.classList.remove(e)}transform(e,t){(t=t||this).style.webkitTransform=e,t.style.transform=e}translate3d(e,t,i,n){n=n||this,this.transform("translate3d("+e+","+t+","+i+")",n)}arrayDelete(e,t){let i;if(Array.isArray(e)){if(i=e.indexOf(t),i>=0)return e.splice(i,1)}else if(i=(0,pe.U2)(this,e).indexOf(t),i>=0)return this.splice(e,i,1);return null}_logger(e,t){switch(Array.isArray(t)&&1===t.length&&Array.isArray(t[0])&&(t=t[0]),e){case"log":case"warn":case"error":console[e](...t)}}_log(...e){this._logger("log",e)}_warn(...e){this._logger("warn",e)}_error(...e){this._logger("error",e)}_logf(e,...t){return["[%s::%s]",this.is,e,...t]}}return s.prototype.is="",s}))},3505:(e,t,i)=>{i.d(t,{k:()=>u});var n=i(2205),r=i(9387);const s={attached:!0,detached:!0,ready:!0,created:!0,beforeRegister:!0,registered:!0,attributeChanged:!0,listeners:!0,hostAttributes:!0},a={attached:!0,detached:!0,ready:!0,created:!0,beforeRegister:!0,registered:!0,attributeChanged:!0,behaviors:!0,_noAccessors:!0},o=Object.assign({listeners:!0,hostAttributes:!0,properties:!0,observers:!0},a);function l(e,t,i,n){!function(e,t,i){const n=e._noAccessors,r=Object.getOwnPropertyNames(e);for(let s=0;s<r.length;s++){let a=r[s];if(!(a in i))if(n)t[a]=e[a];else{let i=Object.getOwnPropertyDescriptor(e,a);i&&(i.configurable=!0,Object.defineProperty(t,a,i))}}}(t,e,n);for(let e in s)t[e]&&(i[e]=i[e]||[],i[e].push(t[e]))}function p(e,t,i){t=t||[];for(let n=e.length-1;n>=0;n--){let r=e[n];r?Array.isArray(r)?p(r,t):t.indexOf(r)<0&&(!i||i.indexOf(r)<0)&&t.unshift(r):console.warn("behavior is null, check for missing or 404 import")}return t}function d(e,t){for(const i in t){const n=e[i],r=t[i];e[i]=!("value"in r)&&n&&"value"in n?Object.assign({value:n.value},r):r}}const c=(0,n.x)(HTMLElement);function h(e,t,i){let n;const s={};class c extends t{static _finalizeClass(){if(this.hasOwnProperty(JSCompiler_renameProperty("generatedFrom",this))){if(n)for(let e,t=0;t<n.length;t++)e=n[t],e.properties&&this.createProperties(e.properties),e.observers&&this.createObservers(e.observers,e.properties);e.properties&&this.createProperties(e.properties),e.observers&&this.createObservers(e.observers,e.properties),this._prepareTemplate()}else t._finalizeClass.call(this)}static get properties(){const t={};if(n)for(let e=0;e<n.length;e++)d(t,n[e].properties);return d(t,e.properties),t}static get observers(){let t=[];if(n)for(let e,i=0;i<n.length;i++)e=n[i],e.observers&&(t=t.concat(e.observers));return e.observers&&(t=t.concat(e.observers)),t}created(){super.created();const e=s.created;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}_registered(){const e=c.prototype;if(!e.hasOwnProperty(JSCompiler_renameProperty("__hasRegisterFinished",e))){e.__hasRegisterFinished=!0,super._registered(),r.nL&&h(e);const t=Object.getPrototypeOf(this);let i=s.beforeRegister;if(i)for(let e=0;e<i.length;e++)i[e].call(t);if(i=s.registered,i)for(let e=0;e<i.length;e++)i[e].call(t)}}_applyListeners(){super._applyListeners();const e=s.listeners;if(e)for(let t=0;t<e.length;t++){const i=e[t];if(i)for(let e in i)this._addMethodEventListenerToNode(this,e,i[e])}}_ensureAttributes(){const e=s.hostAttributes;if(e)for(let t=e.length-1;t>=0;t--){const i=e[t];for(let e in i)this._ensureAttribute(e,i[e])}super._ensureAttributes()}ready(){super.ready();let e=s.ready;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}attached(){super.attached();let e=s.attached;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}detached(){super.detached();let e=s.detached;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}attributeChanged(e,t,i){super.attributeChanged();let n=s.attributeChanged;if(n)for(let r=0;r<n.length;r++)n[r].call(this,e,t,i)}}if(i){Array.isArray(i)||(i=[i]);let e=t.prototype.behaviors;n=p(i,null,e),c.prototype.behaviors=e?e.concat(i):n}const h=t=>{n&&function(e,t,i){for(let n=0;n<t.length;n++)l(e,t[n],i,o)}(t,n,s),l(t,e,s,a)};return r.nL||h(c.prototype),c.generatedFrom=e,c}i(7894);const u=function(e){let t;return t="function"==typeof e?e:u.Class(e),e._legacyForceObservedAttributes&&(t.prototype._legacyForceObservedAttributes=e._legacyForceObservedAttributes),customElements.define(t.is,t),t};u.Class=function(e,t){e||console.warn("Polymer.Class requires `info` argument");let i=t?t(c):c;return i=h(e,i,e.behaviors),i.is=i.prototype.is=e.is,i}},8876:(e,t,i)=>{i.d(t,{vz:()=>_,Ku:()=>d}),i(7894);var n=i(1342),r=(i(9387),i(8341)),s=i(2224);function a(e){return"slot"===e.localName}let o=class{static getFlattenedNodes(e){const t=(0,n.r)(e);return a(e)?t.assignedNodes({flatten:!0}):Array.from(t.childNodes).map((e=>a(e)?(0,n.r)(e).assignedNodes({flatten:!0}):[e])).reduce(((e,t)=>e.concat(t)),[])}constructor(e,t){this._shadyChildrenObserver=null,this._nativeChildrenObserver=null,this._connected=!1,this._target=e,this.callback=t,this._effectiveNodes=[],this._observer=null,this._scheduled=!1,this._boundSchedule=()=>{this._schedule()},this.connect(),this._schedule()}connect(){a(this._target)?this._listenSlots([this._target]):(0,n.r)(this._target).children&&(this._listenSlots((0,n.r)(this._target).children),window.ShadyDOM?this._shadyChildrenObserver=window.ShadyDOM.observeChildren(this._target,(e=>{this._processMutations(e)})):(this._nativeChildrenObserver=new MutationObserver((e=>{this._processMutations(e)})),this._nativeChildrenObserver.observe(this._target,{childList:!0}))),this._connected=!0}disconnect(){a(this._target)?this._unlistenSlots([this._target]):(0,n.r)(this._target).children&&(this._unlistenSlots((0,n.r)(this._target).children),window.ShadyDOM&&this._shadyChildrenObserver?(window.ShadyDOM.unobserveChildren(this._shadyChildrenObserver),this._shadyChildrenObserver=null):this._nativeChildrenObserver&&(this._nativeChildrenObserver.disconnect(),this._nativeChildrenObserver=null)),this._connected=!1}_schedule(){this._scheduled||(this._scheduled=!0,s.YA.run((()=>this.flush())))}_processMutations(e){this._processSlotMutations(e),this.flush()}_processSlotMutations(e){if(e)for(let t=0;t<e.length;t++){let i=e[t];i.addedNodes&&this._listenSlots(i.addedNodes),i.removedNodes&&this._unlistenSlots(i.removedNodes)}}flush(){if(!this._connected)return!1;window.ShadyDOM&&ShadyDOM.flush(),this._nativeChildrenObserver?this._processSlotMutations(this._nativeChildrenObserver.takeRecords()):this._shadyChildrenObserver&&this._processSlotMutations(this._shadyChildrenObserver.takeRecords()),this._scheduled=!1;let e={target:this._target,addedNodes:[],removedNodes:[]},t=this.constructor.getFlattenedNodes(this._target),i=(0,r.c)(t,this._effectiveNodes);for(let t,n=0;n<i.length&&(t=i[n]);n++)for(let i,n=0;n<t.removed.length&&(i=t.removed[n]);n++)e.removedNodes.push(i);for(let n,r=0;r<i.length&&(n=i[r]);r++)for(let i=n.index;i<n.index+n.addedCount;i++)e.addedNodes.push(t[i]);this._effectiveNodes=t;let n=!1;return(e.addedNodes.length||e.removedNodes.length)&&(n=!0,this.callback.call(this._target,e)),n}_listenSlots(e){for(let t=0;t<e.length;t++){let i=e[t];a(i)&&i.addEventListener("slotchange",this._boundSchedule)}}_unlistenSlots(e){for(let t=0;t<e.length;t++){let i=e[t];a(i)&&i.removeEventListener("slotchange",this._boundSchedule)}}};i(5218),i(5313);const l=Element.prototype,p=l.matches||l.matchesSelector||l.mozMatchesSelector||l.msMatchesSelector||l.oMatchesSelector||l.webkitMatchesSelector,d=function(e,t){return p.call(e,t)};class c{constructor(e){window.ShadyDOM&&window.ShadyDOM.inUse&&window.ShadyDOM.patch(e),this.node=e}observeNodes(e){return new o(this.node,e)}unobserveNodes(e){e.disconnect()}notifyObserver(){}deepContains(e){if((0,n.r)(this.node).contains(e))return!0;let t=e,i=e.ownerDocument;for(;t&&t!==i&&t!==this.node;)t=(0,n.r)(t).parentNode||(0,n.r)(t).host;return t===this.node}getOwnerRoot(){return(0,n.r)(this.node).getRootNode()}getDistributedNodes(){return"slot"===this.node.localName?(0,n.r)(this.node).assignedNodes({flatten:!0}):[]}getDestinationInsertionPoints(){let e=[],t=(0,n.r)(this.node).assignedSlot;for(;t;)e.push(t),t=(0,n.r)(t).assignedSlot;return e}importNode(e,t){let i=this.node instanceof Document?this.node:this.node.ownerDocument;return(0,n.r)(i).importNode(e,t)}getEffectiveChildNodes(){return o.getFlattenedNodes(this.node)}queryDistributedElements(e){let t=this.getEffectiveChildNodes(),i=[];for(let n,r=0,s=t.length;r<s&&(n=t[r]);r++)n.nodeType===Node.ELEMENT_NODE&&d(n,e)&&i.push(n);return i}get activeElement(){let e=this.node;return void 0!==e._activeElement?e._activeElement:e.activeElement}}function h(e,t){for(let i=0;i<t.length;i++){let n=t[i];Object.defineProperty(e,n,{get:function(){return this.node[n]},configurable:!0})}}class u{constructor(e){this.event=e}get rootTarget(){return this.path[0]}get localTarget(){return this.event.target}get path(){return this.event.composedPath()}}c.prototype.cloneNode,c.prototype.appendChild,c.prototype.insertBefore,c.prototype.removeChild,c.prototype.replaceChild,c.prototype.setAttribute,c.prototype.removeAttribute,c.prototype.querySelector,c.prototype.querySelectorAll,c.prototype.parentNode,c.prototype.firstChild,c.prototype.lastChild,c.prototype.nextSibling,c.prototype.previousSibling,c.prototype.firstElementChild,c.prototype.lastElementChild,c.prototype.nextElementSibling,c.prototype.previousElementSibling,c.prototype.childNodes,c.prototype.children,c.prototype.classList,c.prototype.textContent,c.prototype.innerHTML;let f=c;if(window.ShadyDOM&&window.ShadyDOM.inUse&&window.ShadyDOM.noPatch&&window.ShadyDOM.Wrapper){class e extends window.ShadyDOM.Wrapper{}Object.getOwnPropertyNames(c.prototype).forEach((t=>{"activeElement"!=t&&(e.prototype[t]=c.prototype[t])})),h(e.prototype,["classList"]),f=e,Object.defineProperties(u.prototype,{localTarget:{get(){const e=this.event.currentTarget,t=e&&_(e).getOwnerRoot(),i=this.path;for(let e=0;e<i.length;e++){const n=i[e];if(_(n).getOwnerRoot()===t)return n}},configurable:!0},path:{get(){return window.ShadyDOM.composedPath(this.event)},configurable:!0}})}else!function(e,t){for(let i=0;i<t.length;i++){let n=t[i];e[n]=function(){return this.node[n].apply(this.node,arguments)}}}(c.prototype,["cloneNode","appendChild","insertBefore","removeChild","replaceChild","setAttribute","removeAttribute","querySelector","querySelectorAll","attachShadow"]),h(c.prototype,["parentNode","firstChild","lastChild","nextSibling","previousSibling","firstElementChild","lastElementChild","nextElementSibling","previousElementSibling","childNodes","children","classList","shadowRoot"]),function(e,t){for(let i=0;i<t.length;i++){let n=t[i];Object.defineProperty(e,n,{get:function(){return this.node[n]},set:function(e){this.node[n]=e},configurable:!0})}}(c.prototype,["textContent","innerHTML","className"]);const _=function(e){if((e=e||document)instanceof f)return e;if(e instanceof u)return e;let t=e.__domApi;return t||(t=e instanceof Event?new u(e):new f(e),e.__domApi=t),t}},581:(e,t,i)=>{i.d(t,{SH:()=>f,PP:()=>u}),i(7894);var n=i(9387),r=i(1014),s=i(9836),a=i(9967),o=i(4262),l=i(7999),p=i(3501),d=i(7221);const c=(0,r.o)((e=>{const t=(0,d.e)(e);function i(e){const t=Object.getPrototypeOf(e);return t.prototype instanceof r?t:null}function n(e){if(!e.hasOwnProperty(JSCompiler_renameProperty("__ownProperties",e))){let t=null;if(e.hasOwnProperty(JSCompiler_renameProperty("properties",e))){const i=e.properties;i&&(t=function(e){const t={};for(let i in e){const n=e[i];t[i]="function"==typeof n?{type:n}:n}return t}(i))}e.__ownProperties=t}return e.__ownProperties}class r extends t{static get observedAttributes(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__observedAttributes",this))){(0,p.z2)(this.prototype);const e=this._properties;this.__observedAttributes=e?Object.keys(e).map((e=>this.prototype._addPropertyToAttributeMap(e))):[]}return this.__observedAttributes}static finalize(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__finalized",this))){const e=i(this);e&&e.finalize(),this.__finalized=!0,this._finalizeClass()}}static _finalizeClass(){const e=n(this);e&&this.createProperties(e)}static get _properties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__properties",this))){const e=i(this);this.__properties=Object.assign({},e&&e._properties,n(this))}return this.__properties}static typeForProperty(e){const t=this._properties[e];return t&&t.type}_initializeProperties(){(0,p.Gd)(),this.constructor.finalize(),super._initializeProperties()}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._enableProperties()}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback()}}return r}));var h=i(1342);const u=window.ShadyCSS&&window.ShadyCSS.cssBuild,f=(0,r.o)((e=>{const t=c((0,l.q)(e));return class extends t{static get polymerElementVersion(){return"3.5.1"}static _finalizeClass(){t._finalizeClass.call(this);const e=((i=this).hasOwnProperty(JSCompiler_renameProperty("__ownObservers",i))||(i.__ownObservers=i.hasOwnProperty(JSCompiler_renameProperty("observers",i))?i.observers:null),i.__ownObservers);var i;e&&this.createObservers(e,this._properties),this._prepareTemplate()}static _prepareTemplate(){let e=this.template;e&&("string"==typeof e?(console.error("template getter must return HTMLTemplateElement"),e=null):n.nL||(e=e.cloneNode(!0))),this.prototype._template=e}static createProperties(e){for(let s in e)t=this.prototype,i=s,r=e,(n=e[s]).computed&&(n.readOnly=!0),n.computed&&(t._hasReadOnlyEffect(i)?console.warn(`Cannot redefine computed property '${i}'.`):t._createComputedProperty(i,n.computed,r)),n.readOnly&&!t._hasReadOnlyEffect(i)?t._createReadOnlyProperty(i,!n.computed):!1===n.readOnly&&t._hasReadOnlyEffect(i)&&console.warn(`Cannot make readOnly property '${i}' non-readOnly.`),n.reflectToAttribute&&!t._hasReflectEffect(i)?t._createReflectedProperty(i):!1===n.reflectToAttribute&&t._hasReflectEffect(i)&&console.warn(`Cannot make reflected property '${i}' non-reflected.`),n.notify&&!t._hasNotifyEffect(i)?t._createNotifyingProperty(i):!1===n.notify&&t._hasNotifyEffect(i)&&console.warn(`Cannot make notify property '${i}' non-notify.`),n.observer&&t._createPropertyObserver(i,n.observer,r[n.observer]),t._addPropertyToAttributeMap(i);var t,i,n,r}static createObservers(e,t){const i=this.prototype;for(let n=0;n<e.length;n++)i._createMethodObserver(e[n],t)}static get template(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_template",this))){let e=this.prototype.hasOwnProperty(JSCompiler_renameProperty("_template",this.prototype))?this.prototype._template:void 0;"function"==typeof e&&(e=e()),this._template=void 0!==e?e:this.hasOwnProperty(JSCompiler_renameProperty("is",this))&&function(e){let t=null;if(e&&(!n.XN||n.ZN)&&(t=o.t.import(e,"template"),n.XN&&!t))throw new Error(`strictTemplatePolicy: expecting dom-module or null template for ${e}`);return t}(this.is)||Object.getPrototypeOf(this.prototype).constructor.template}return this._template}static set template(e){this._template=e}static get importPath(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_importPath",this))){const e=this.importMeta;if(e)this._importPath=(0,a.iY)(e.url);else{const e=o.t.import(this.is);this._importPath=e&&e.assetpath||Object.getPrototypeOf(this.prototype).constructor.importPath}}return this._importPath}constructor(){super(),this._template,this._importPath,this.rootPath,this.importPath,this.root,this.$}_initializeProperties(){this.constructor.finalize(),this.constructor._finalizeTemplate(this.localName),super._initializeProperties(),this.rootPath=n.sM,this.importPath=this.constructor.importPath;let e=function(e){if(!e.hasOwnProperty(JSCompiler_renameProperty("__propertyDefaults",e))){e.__propertyDefaults=null;let t=e._properties;for(let i in t){let n=t[i];"value"in n&&(e.__propertyDefaults=e.__propertyDefaults||{},e.__propertyDefaults[i]=n)}}return e.__propertyDefaults}(this.constructor);if(e)for(let t in e){let i=e[t];if(this._canApplyPropertyDefault(t)){let e="function"==typeof i.value?i.value.call(this):i.value;this._hasAccessor(t)?this._setPendingProperty(t,e,!0):this[t]=e}}}_canApplyPropertyDefault(e){return!this.hasOwnProperty(e)}static _processStyleText(e,t){return(0,a.Rq)(e,t)}static _finalizeTemplate(e){const t=this.prototype._template;if(t&&!t.__polymerFinalized){t.__polymerFinalized=!0;const i=this.importPath;!function(e,t,i,r){if(!u){const n=t.content.querySelectorAll("style"),a=(0,s.uT)(t),o=(0,s.lx)(i),l=t.content.firstElementChild;for(let i=0;i<o.length;i++){let n=o[i];n.textContent=e._processStyleText(n.textContent,r),t.content.insertBefore(n,l)}let p=0;for(let t=0;t<a.length;t++){let i=a[t],s=n[p];s!==i?(i=i.cloneNode(!0),s.parentNode.insertBefore(i,s)):p++,i.textContent=e._processStyleText(i.textContent,r)}}if(window.ShadyCSS&&window.ShadyCSS.prepareTemplate(t,i),n.md&&u&&n.FV){const i=t.content.querySelectorAll("style");if(i){let t="";Array.from(i).forEach((e=>{t+=e.textContent,e.parentNode.removeChild(e)})),e._styleSheet=new CSSStyleSheet,e._styleSheet.replaceSync(t)}}}(this,t,e,i?(0,a.Kk)(i):""),this.prototype._bindTemplate(t)}}connectedCallback(){window.ShadyCSS&&this._template&&window.ShadyCSS.styleElement(this),super.connectedCallback()}ready(){this._template&&(this.root=this._stampTemplate(this._template),this.$=this.root.$),super.ready()}_readyClients(){this._template&&(this.root=this._attachDom(this.root)),super._readyClients()}_attachDom(e){const t=(0,h.r)(this);if(t.attachShadow)return e?(t.shadowRoot||(t.attachShadow({mode:"open",shadyUpgradeFragment:e}),t.shadowRoot.appendChild(e),this.constructor._styleSheet&&(t.shadowRoot.adoptedStyleSheets=[this.constructor._styleSheet])),n.Hr&&window.ShadyDOM&&window.ShadyDOM.flushInitial(t.shadowRoot),t.shadowRoot):null;throw new Error("ShadowDOM not available. PolymerElement can create dom as children instead of in ShadowDOM by setting `this.root = this;` before `ready`.")}updateStyles(e){window.ShadyCSS&&window.ShadyCSS.styleSubtree(this,e)}resolveUrl(e,t){return!t&&this.importPath&&(t=(0,a.Kk)(this.importPath)),(0,a.Kk)(e,t)}static _parseTemplateContent(e,i,n){return i.dynamicFns=i.dynamicFns||this._properties,t._parseTemplateContent.call(this,e,i,n)}static _addTemplatePropertyEffect(e,i,r){return!n.a2||i in this._properties||r.info.part.signature&&r.info.part.signature.static||r.info.part.hostProp||e.nestedTemplate||console.warn(`Property '${i}' used in template but not declared in 'properties'; attribute will not be observed.`),t._addTemplatePropertyEffect.call(this,e,i,r)}}}))},6163:(e,t,i)=>{i.d(t,{_:()=>s}),i(7894);var n=i(1014),r=i(4010);const s=(0,n.o)((e=>class extends e{_addEventListenerToNode(e,t,i){(0,r.NH)(e,t,i)||super._addEventListenerToNode(e,t,i)}_removeEventListenerFromNode(e,t,i){(0,r.ys)(e,t,i)||super._removeEventListenerFromNode(e,t,i)}}))},7221:(e,t,i)=>{i.d(t,{e:()=>o}),i(7894);var n=i(1014),r=i(2224),s=i(1342);const a=r.YA,o=(0,n.o)((e=>class extends e{static createProperties(e){const t=this.prototype;for(let i in e)i in t||t._createPropertyAccessor(i)}static attributeNameForProperty(e){return e.toLowerCase()}static typeForProperty(e){}_createPropertyAccessor(e,t){this._addPropertyToAttributeMap(e),this.hasOwnProperty(JSCompiler_renameProperty("__dataHasAccessor",this))||(this.__dataHasAccessor=Object.assign({},this.__dataHasAccessor)),this.__dataHasAccessor[e]||(this.__dataHasAccessor[e]=!0,this._definePropertyAccessor(e,t))}_addPropertyToAttributeMap(e){this.hasOwnProperty(JSCompiler_renameProperty("__dataAttributes",this))||(this.__dataAttributes=Object.assign({},this.__dataAttributes));let t=this.__dataAttributes[e];return t||(t=this.constructor.attributeNameForProperty(e),this.__dataAttributes[t]=e),t}_definePropertyAccessor(e,t){Object.defineProperty(this,e,{get(){return this.__data[e]},set:t?function(){}:function(t){this._setPendingProperty(e,t,!0)&&this._invalidateProperties()}})}constructor(){super(),this.__dataEnabled=!1,this.__dataReady=!1,this.__dataInvalid=!1,this.__data={},this.__dataPending=null,this.__dataOld=null,this.__dataInstanceProps=null,this.__dataCounter=0,this.__serializing=!1,this._initializeProperties()}ready(){this.__dataReady=!0,this._flushProperties()}_initializeProperties(){for(let e in this.__dataHasAccessor)this.hasOwnProperty(e)&&(this.__dataInstanceProps=this.__dataInstanceProps||{},this.__dataInstanceProps[e]=this[e],delete this[e])}_initializeInstanceProperties(e){Object.assign(this,e)}_setProperty(e,t){this._setPendingProperty(e,t)&&this._invalidateProperties()}_getProperty(e){return this.__data[e]}_setPendingProperty(e,t,i){let n=this.__data[e],r=this._shouldPropertyChange(e,t,n);return r&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),this.__dataOld&&!(e in this.__dataOld)&&(this.__dataOld[e]=n),this.__data[e]=t,this.__dataPending[e]=t),r}_isPropertyPending(e){return!(!this.__dataPending||!this.__dataPending.hasOwnProperty(e))}_invalidateProperties(){!this.__dataInvalid&&this.__dataReady&&(this.__dataInvalid=!0,a.run((()=>{this.__dataInvalid&&(this.__dataInvalid=!1,this._flushProperties())})))}_enableProperties(){this.__dataEnabled||(this.__dataEnabled=!0,this.__dataInstanceProps&&(this._initializeInstanceProperties(this.__dataInstanceProps),this.__dataInstanceProps=null),this.ready())}_flushProperties(){this.__dataCounter++;const e=this.__data,t=this.__dataPending,i=this.__dataOld;this._shouldPropertiesChange(e,t,i)&&(this.__dataPending=null,this.__dataOld=null,this._propertiesChanged(e,t,i)),this.__dataCounter--}_shouldPropertiesChange(e,t,i){return Boolean(t)}_propertiesChanged(e,t,i){}_shouldPropertyChange(e,t,i){return i!==t&&(i==i||t==t)}attributeChangedCallback(e,t,i,n){t!==i&&this._attributeToProperty(e,i),super.attributeChangedCallback&&super.attributeChangedCallback(e,t,i,n)}_attributeToProperty(e,t,i){if(!this.__serializing){const n=this.__dataAttributes,r=n&&n[e]||e;this[r]=this._deserializeValue(t,i||this.constructor.typeForProperty(r))}}_propertyToAttribute(e,t,i){this.__serializing=!0,i=arguments.length<3?this[e]:i,this._valueToNodeAttribute(this,i,t||this.constructor.attributeNameForProperty(e)),this.__serializing=!1}_valueToNodeAttribute(e,t,i){const n=this._serializeValue(t);"class"!==i&&"name"!==i&&"slot"!==i||(e=(0,s.r)(e)),void 0===n?e.removeAttribute(i):e.setAttribute(i,""===n&&window.trustedTypes?window.trustedTypes.emptyScript:n)}_serializeValue(e){return"boolean"==typeof e?e?"":void 0:null!=e?e.toString():void 0}_deserializeValue(e,t){switch(t){case Boolean:return null!==e;case Number:return Number(e);default:return e}}}))},3104:(e,t,i)=>{i.d(t,{Q:()=>p}),i(7894);var n=i(1014),r=i(9027),s=i(7221);const a={};let o=HTMLElement.prototype;for(;o;){let e=Object.getOwnPropertyNames(o);for(let t=0;t<e.length;t++)a[e[t]]=!0;o=Object.getPrototypeOf(o)}const l=window.trustedTypes?e=>trustedTypes.isHTML(e)||trustedTypes.isScript(e)||trustedTypes.isScriptURL(e):()=>!1,p=(0,n.o)((e=>{const t=(0,s.e)(e);return class extends t{static createPropertiesForAttributes(){let e=this.observedAttributes;for(let t=0;t<e.length;t++)this.prototype._createPropertyAccessor((0,r.z)(e[t]))}static attributeNameForProperty(e){return(0,r.n)(e)}_initializeProperties(){this.__dataProto&&(this._initializeProtoProperties(this.__dataProto),this.__dataProto=null),super._initializeProperties()}_initializeProtoProperties(e){for(let t in e)this._setProperty(t,e[t])}_ensureAttribute(e,t){this.hasAttribute(e)||this._valueToNodeAttribute(this,t,e)}_serializeValue(e){if("object"==typeof e){if(e instanceof Date)return e.toString();if(e){if(l(e))return e;try{return JSON.stringify(e)}catch(e){return""}}}return super._serializeValue(e)}_deserializeValue(e,t){let i;switch(t){case Object:try{i=JSON.parse(e)}catch(t){i=e}break;case Array:try{i=JSON.parse(e)}catch(t){i=null,console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${e}`)}break;case Date:i=isNaN(e)?String(e):Number(e),i=new Date(i);break;default:i=super._deserializeValue(e,t)}return i}_definePropertyAccessor(e,t){!function(e,t){if(!a[t]){let i=e[t];void 0!==i&&(e.__data?e._setPendingProperty(t,i):(e.__dataProto?e.hasOwnProperty(JSCompiler_renameProperty("__dataProto",e))||(e.__dataProto=Object.create(e.__dataProto)):e.__dataProto={},e.__dataProto[t]=i))}}(this,e),super._definePropertyAccessor(e,t)}_hasAccessor(e){return this.__dataHasAccessor&&this.__dataHasAccessor[e]}_isPropertyPending(e){return Boolean(this.__dataPending&&e in this.__dataPending)}}}))},7999:(e,t,i)=>{i.d(t,{q:()=>Q}),i(7894);var n=i(1342),r=i(1014),s=i(1446),a=i(9027),o=i(3104);const l={"dom-if":!0,"dom-repeat":!0};let p=!1,d=!1;const c=(()=>{const e=window.trustedTypes&&window.trustedTypes.createPolicy("polymer-template-event-attribute-policy",{createScript:e=>e});return(t,i,n)=>{const r=i.getAttribute(n);e&&n.startsWith("on-")?t.setAttribute(n,e.createScript(r,n)):t.setAttribute(n,r)}})();function h(e){let t=e.getAttribute("is");if(t&&l[t]){let i=e;for(i.removeAttribute("is"),e=i.ownerDocument.createElement(t),i.parentNode.replaceChild(e,i),e.appendChild(i);i.attributes.length;){const{name:t}=i.attributes[0];c(e,i,t),i.removeAttribute(t)}}return e}function u(e,t){let i=t.parentInfo&&u(e,t.parentInfo);if(!i)return e;for(let e=i.firstChild,n=0;e;e=e.nextSibling)if(t.parentIndex===n++)return e}function f(e,t,i,n){n.id&&(t[n.id]=i)}function _(e,t,i){if(i.events&&i.events.length)for(let n,r=0,s=i.events;r<s.length&&(n=s[r]);r++)e._addMethodEventListenerToNode(t,n.name,n.value,e)}function m(e,t,i,n){i.templateInfo&&(t._templateInfo=i.templateInfo,t._parentTemplateInfo=n)}const y=(0,r.o)((e=>class extends e{static _parseTemplate(e,t){if(!e._templateInfo){let i=e._templateInfo={};i.nodeInfoList=[],i.nestedTemplate=Boolean(t),i.stripWhiteSpace=t&&t.stripWhiteSpace||e.hasAttribute&&e.hasAttribute("strip-whitespace"),this._parseTemplateContent(e,i,{parent:null})}return e._templateInfo}static _parseTemplateContent(e,t,i){return this._parseTemplateNode(e.content,t,i)}static _parseTemplateNode(e,t,i){let n=!1,r=e;return"template"!=r.localName||r.hasAttribute("preserve-content")?"slot"===r.localName&&(t.hasInsertionPoint=!0):n=this._parseTemplateNestedTemplate(r,t,i)||n,function(e){(function(){if(!p){p=!0;const e=document.createElement("textarea");e.placeholder="a",d=e.placeholder===e.textContent}return d})()&&"textarea"===e.localName&&e.placeholder&&e.placeholder===e.textContent&&(e.textContent=null)}(r),r.firstChild&&this._parseTemplateChildNodes(r,t,i),r.hasAttributes&&r.hasAttributes()&&(n=this._parseTemplateNodeAttributes(r,t,i)||n),n||i.noted}static _parseTemplateChildNodes(e,t,i){if("script"!==e.localName&&"style"!==e.localName)for(let n,r=e.firstChild,s=0;r;r=n){if("template"==r.localName&&(r=h(r)),n=r.nextSibling,r.nodeType===Node.TEXT_NODE){let i=n;for(;i&&i.nodeType===Node.TEXT_NODE;)r.textContent+=i.textContent,n=i.nextSibling,e.removeChild(i),i=n;if(t.stripWhiteSpace&&!r.textContent.trim()){e.removeChild(r);continue}}let a={parentIndex:s,parentInfo:i};this._parseTemplateNode(r,t,a)&&(a.infoIndex=t.nodeInfoList.push(a)-1),r.parentNode&&s++}}static _parseTemplateNestedTemplate(e,t,i){let n=e,r=this._parseTemplate(n,t);return(r.content=n.content.ownerDocument.createDocumentFragment()).appendChild(n.content),i.templateInfo=r,!0}static _parseTemplateNodeAttributes(e,t,i){let n=!1,r=Array.from(e.attributes);for(let s,a=r.length-1;s=r[a];a--)n=this._parseTemplateNodeAttribute(e,t,i,s.name,s.value)||n;return n}static _parseTemplateNodeAttribute(e,t,i,n,r){return"on-"===n.slice(0,3)?(e.removeAttribute(n),i.events=i.events||[],i.events.push({name:n.slice(3),value:r}),!0):"id"===n&&(i.id=r,!0)}static _contentForTemplate(e){let t=e._templateInfo;return t&&t.content||e.content}_stampTemplate(e,t){e&&!e.content&&window.HTMLTemplateElement&&HTMLTemplateElement.decorate&&HTMLTemplateElement.decorate(e);let i=(t=t||this.constructor._parseTemplate(e)).nodeInfoList,n=t.content||e.content,r=document.importNode(n,!0);r.__noInsertionPoint=!t.hasInsertionPoint;let s=r.nodeList=new Array(i.length);r.$={};for(let e,n=0,a=i.length;n<a&&(e=i[n]);n++){let i=s[n]=u(r,e);f(0,r.$,i,e),m(0,i,e,t),_(this,i,e)}return r}_addMethodEventListenerToNode(e,t,i,n){let r=function(e,t,i){return e=e._methodHost||e,function(t){e[i]?e[i](t,t.detail):console.warn("listener method `"+i+"` not defined")}}(n=n||e,0,i);return this._addEventListenerToNode(e,t,r),r}_addEventListenerToNode(e,t,i){e.addEventListener(t,i)}_removeEventListenerFromNode(e,t,i){e.removeEventListener(t,i)}}));var b=i(9387);let g=0;const v=[],w={COMPUTE:"__computeEffects",REFLECT:"__reflectEffects",NOTIFY:"__notifyEffects",PROPAGATE:"__propagateEffects",OBSERVE:"__observeEffects",READ_ONLY:"__readOnly"},x="__computeInfo",C=/[A-Z]/;function S(e,t,i){let n=e[t];if(n){if(!e.hasOwnProperty(t)&&(n=e[t]=Object.create(e[t]),i))for(let e in n){let t=n[e],i=n[e]=Array(t.length);for(let e=0;e<t.length;e++)i[e]=t[e]}}else n=e[t]={};return n}function k(e,t,i,n,r,a){if(t){let o=!1;const l=g++;for(let p in i){let d=t[r?(0,s.Jz)(p):p];if(d)for(let t,s=0,c=d.length;s<c&&(t=d[s]);s++)t.info&&t.info.lastRun===l||r&&!E(p,t.trigger)||(t.info&&(t.info.lastRun=l),t.fn(e,p,i,n,t.info,r,a),o=!0)}return o}return!1}function P(e,t,i,n,r,a,o,l){let p=!1,d=t[o?(0,s.Jz)(n):n];if(d)for(let t,s=0,c=d.length;s<c&&(t=d[s]);s++)t.info&&t.info.lastRun===i||o&&!E(n,t.trigger)||(t.info&&(t.info.lastRun=i),t.fn(e,n,r,a,t.info,o,l),p=!0);return p}function E(e,t){if(t){let i=t.name;return i==e||!(!t.structured||!(0,s.jg)(i,e))||!(!t.wildcard||!(0,s.SG)(i,e))}return!0}function A(e,t,i,n,r){let s="string"==typeof r.method?e[r.method]:r.method,a=r.property;s?s.call(e,e.__data[a],n[a]):r.dynamicFn||console.warn("observer method `"+r.method+"` not defined")}function O(e,t,i){let n=(0,s.Jz)(t);return n!==t&&(T(e,(0,a.n)(n)+"-changed",i[t],t),!0)}function T(e,t,i,r){let s={value:i,queueProperty:!0};r&&(s.path=r),(0,n.r)(e).dispatchEvent(new CustomEvent(t,{detail:s}))}function I(e,t,i,n,r,a){let o=(a?(0,s.Jz)(t):t)!=t?t:null,l=o?(0,s.U2)(e,o):e.__data[t];o&&void 0===l&&(l=i[t]),T(e,r.eventName,l,o)}function N(e,t,i,n,r){let s=e.__data[t];b.v1&&(s=(0,b.v1)(s,r.attrName,"attribute",e)),e._propertyToAttribute(t,r.attrName,s)}const R=(e,t,i)=>{let n=0,r=t.length-1,s=-1;for(;n<=r;){const a=n+r>>1,o=i.get(t[a].methodInfo)-i.get(e.methodInfo);if(o<0)n=a+1;else{if(!(o>0)){s=a;break}r=a-1}}s<0&&(s=r+1),t.splice(s,0,e)},D=(e,t,i,n,r)=>{const a=t[r?(0,s.Jz)(e):e];if(a)for(let t=0;t<a.length;t++){const s=a[t];s.info.lastRun===g||r&&!E(e,s.trigger)||(s.info.lastRun=g,R(s.info,i,n))}};function L(e,t,i,n,r){let s=j(e,t,i,0,r);if(s===v)return!1;let a=r.methodInfo;return e.__dataHasAccessor&&e.__dataHasAccessor[a]?e._setPendingProperty(a,s,!0):(e[a]=s,!1)}function M(e,t,i,n,r,s,o){i.bindings=i.bindings||[];let l={kind:n,target:r,parts:s,literal:o,isCompound:1!==s.length};if(i.bindings.push(l),function(e){return Boolean(e.target)&&"attribute"!=e.kind&&"text"!=e.kind&&!e.isCompound&&"{"===e.parts[0].mode}(l)){let{event:e,negate:t}=l.parts[0];l.listenerEvent=e||(0,a.n)(r)+"-changed",l.listenerNegate=t}let p=t.nodeInfoList.length;for(let i=0;i<l.parts.length;i++){let n=l.parts[i];n.compoundIndex=i,F(e,t,l,n,p)}}function F(e,t,i,n,r){if(!n.literal)if("attribute"===i.kind&&"-"===i.target[0])console.warn("Cannot set attribute "+i.target+' because "-" is not a valid attribute starting character');else{let s=n.dependencies,a={index:r,binding:i,part:n,evaluator:e};for(let i=0;i<s.length;i++){let n=s[i];"string"==typeof n&&(n=W(n),n.wildcard=!0),e._addTemplatePropertyEffect(t,n.rootProperty,{fn:z,info:a,trigger:n})}}}function z(e,t,i,n,r,a,o){let l=o[r.index],p=r.binding,d=r.part;if(a&&d.source&&t.length>d.source.length&&"property"==p.kind&&!p.isCompound&&l.__isPropertyEffectsClient&&l.__dataHasAccessor&&l.__dataHasAccessor[p.target]){let n=i[t];t=(0,s.Iu)(d.source,p.target,t),l._setPendingPropertyOrPath(t,n,!1,!0)&&e._enqueueClient(l)}else{let s=r.evaluator._evaluateBinding(e,d,t,i,n,a);s!==v&&function(e,t,i,n,r){if(r=function(e,t,i,n){if(i.isCompound){let r=e.__dataCompoundStorage[i.target];r[n.compoundIndex]=t,t=r.join("")}return"attribute"!==i.kind&&("textContent"!==i.target&&("value"!==i.target||"input"!==e.localName&&"textarea"!==e.localName)||(t=null==t?"":t)),t}(t,r,i,n),b.v1&&(r=(0,b.v1)(r,i.target,i.kind,t)),"attribute"==i.kind)e._valueToNodeAttribute(t,r,i.target);else{let n=i.target;t.__isPropertyEffectsClient&&t.__dataHasAccessor&&t.__dataHasAccessor[n]?t[w.READ_ONLY]&&t[w.READ_ONLY][n]||t._setPendingProperty(n,r)&&e._enqueueClient(t):e._setUnmanagedPropertyToNode(t,n,r)}}(e,l,p,d,s)}}function B(e,t){if(t.isCompound){let i=e.__dataCompoundStorage||(e.__dataCompoundStorage={}),r=t.parts,s=new Array(r.length);for(let e=0;e<r.length;e++)s[e]=r[e].literal;let a=t.target;i[a]=s,t.literal&&"property"==t.kind&&("className"===a&&(e=(0,n.r)(e)),e[a]=t.literal)}}function H(e,t,i){if(i.listenerEvent){let n=i.parts[0];e.addEventListener(i.listenerEvent,(function(e){!function(e,t,i,n,r){let a,o=e.detail,l=o&&o.path;l?(n=(0,s.Iu)(i,n,l),a=o&&o.value):a=e.currentTarget[i],a=r?!a:a,t[w.READ_ONLY]&&t[w.READ_ONLY][n]||!t._setPendingPropertyOrPath(n,a,!0,Boolean(l))||o&&o.queueProperty||t._invalidateProperties()}(e,t,i.target,n.source,n.negate)}))}}function $(e,t,i,n,r,s){s=t.static||s&&("object"!=typeof s||s[t.methodName]);let a={methodName:t.methodName,args:t.args,methodInfo:r,dynamicFn:s};for(let r,s=0;s<t.args.length&&(r=t.args[s]);s++)r.literal||e._addPropertyEffect(r.rootProperty,i,{fn:n,info:a,trigger:r});return s&&e._addPropertyEffect(t.methodName,i,{fn:n,info:a}),a}function j(e,t,i,n,r){let s=e._methodHost||e,a=s[r.methodName];if(a){let n=e._marshalArgs(r.args,t,i);return n===v?v:a.apply(s,n)}r.dynamicFn||console.warn("method `"+r.methodName+"` not defined")}const q=[],V="(?:[a-zA-Z_$][\\w.:$\\-*]*)",U="(?:("+V+"|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*)",K=new RegExp("(\\[\\[|{{)\\s*(?:(!)\\s*)?("+V+"\\s*(?:\\(\\s*(?:(?:"+U+"(?:,\\s*"+U+")*)?)\\)\\s*)?)(?:]]|}})","g");function Y(e){let t="";for(let i=0;i<e.length;i++)t+=e[i].literal||"";return t}function J(e){let t=e.match(/([^\s]+?)\(([\s\S]*)\)/);if(t){let e={methodName:t[1],static:!0,args:q};return t[2].trim()?function(e,t){return t.args=e.map((function(e){let i=W(e);return i.literal||(t.static=!1),i}),this),t}(t[2].replace(/\\,/g,"&comma;").split(","),e):e}return null}function W(e){let t=e.trim().replace(/&comma;/g,",").replace(/\\(.)/g,"$1"),i={name:t,value:"",literal:!1},n=t[0];switch("-"===n&&(n=t[1]),n>="0"&&n<="9"&&(n="#"),n){case"'":case'"':i.value=t.slice(1,-1),i.literal=!0;break;case"#":i.value=Number(t),i.literal=!0}return i.literal||(i.rootProperty=(0,s.Jz)(t),i.structured=(0,s.AZ)(t),i.structured&&(i.wildcard=".*"==t.slice(-2),i.wildcard&&(i.name=t.slice(0,-2)))),i}function X(e,t,i){let n=(0,s.U2)(e,i);return void 0===n&&(n=t[i]),n}function G(e,t,i,n){const r={indexSplices:n};b.HY&&!e._overrideLegacyUndefined&&(t.splices=r),e.notifyPath(i+".splices",r),e.notifyPath(i+".length",t.length),b.HY&&!e._overrideLegacyUndefined&&(r.indexSplices=[])}function Z(e,t,i,n,r,s){G(e,t,i,[{index:n,addedCount:r,removed:s,object:t,type:"splice"}])}const Q=(0,r.o)((e=>{const t=y((0,o.Q)(e));return class extends t{constructor(){super(),this.__isPropertyEffectsClient=!0,this.__dataClientsReady,this.__dataPendingClients,this.__dataToNotify,this.__dataLinkedPaths,this.__dataHasPaths,this.__dataCompoundStorage,this.__dataHost,this.__dataTemp,this.__dataClientsInitialized,this.__data,this.__dataPending,this.__dataOld,this.__computeEffects,this.__computeInfo,this.__reflectEffects,this.__notifyEffects,this.__propagateEffects,this.__observeEffects,this.__readOnly,this.__templateInfo,this._overrideLegacyUndefined}get PROPERTY_EFFECT_TYPES(){return w}_initializeProperties(){super._initializeProperties(),this._registerHost(),this.__dataClientsReady=!1,this.__dataPendingClients=null,this.__dataToNotify=null,this.__dataLinkedPaths=null,this.__dataHasPaths=!1,this.__dataCompoundStorage=this.__dataCompoundStorage||null,this.__dataHost=this.__dataHost||null,this.__dataTemp={},this.__dataClientsInitialized=!1}_registerHost(){if(ee.length){let e=ee[ee.length-1];e._enqueueClient(this),this.__dataHost=e}}_initializeProtoProperties(e){this.__data=Object.create(e),this.__dataPending=Object.create(e),this.__dataOld={}}_initializeInstanceProperties(e){let t=this[w.READ_ONLY];for(let i in e)t&&t[i]||(this.__dataPending=this.__dataPending||{},this.__dataOld=this.__dataOld||{},this.__data[i]=this.__dataPending[i]=e[i])}_addPropertyEffect(e,t,i){this._createPropertyAccessor(e,t==w.READ_ONLY);let n=S(this,t,!0)[e];n||(n=this[t][e]=[]),n.push(i)}_removePropertyEffect(e,t,i){let n=S(this,t,!0)[e],r=n.indexOf(i);r>=0&&n.splice(r,1)}_hasPropertyEffect(e,t){let i=this[t];return Boolean(i&&i[e])}_hasReadOnlyEffect(e){return this._hasPropertyEffect(e,w.READ_ONLY)}_hasNotifyEffect(e){return this._hasPropertyEffect(e,w.NOTIFY)}_hasReflectEffect(e){return this._hasPropertyEffect(e,w.REFLECT)}_hasComputedEffect(e){return this._hasPropertyEffect(e,w.COMPUTE)}_setPendingPropertyOrPath(e,t,i,n){if(n||(0,s.Jz)(Array.isArray(e)?e[0]:e)!==e){if(!n){let i=(0,s.U2)(this,e);if(!(e=(0,s.t8)(this,e,t))||!super._shouldPropertyChange(e,t,i))return!1}if(this.__dataHasPaths=!0,this._setPendingProperty(e,t,i))return function(e,t,i){let n=e.__dataLinkedPaths;if(n){let r;for(let a in n){let o=n[a];(0,s.SG)(a,t)?(r=(0,s.Iu)(a,o,t),e._setPendingPropertyOrPath(r,i,!0,!0)):(0,s.SG)(o,t)&&(r=(0,s.Iu)(o,a,t),e._setPendingPropertyOrPath(r,i,!0,!0))}}}(this,e,t),!0}else{if(this.__dataHasAccessor&&this.__dataHasAccessor[e])return this._setPendingProperty(e,t,i);this[e]=t}return!1}_setUnmanagedPropertyToNode(e,t,i){i===e[t]&&"object"!=typeof i||("className"===t&&(e=(0,n.r)(e)),e[t]=i)}_setPendingProperty(e,t,i){let n=this.__dataHasPaths&&(0,s.AZ)(e),r=n?this.__dataTemp:this.__data;return!!this._shouldPropertyChange(e,t,r[e])&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),e in this.__dataOld||(this.__dataOld[e]=this.__data[e]),n?this.__dataTemp[e]=t:this.__data[e]=t,this.__dataPending[e]=t,(n||this[w.NOTIFY]&&this[w.NOTIFY][e])&&(this.__dataToNotify=this.__dataToNotify||{},this.__dataToNotify[e]=i),!0)}_setProperty(e,t){this._setPendingProperty(e,t,!0)&&this._invalidateProperties()}_invalidateProperties(){this.__dataReady&&this._flushProperties()}_enqueueClient(e){this.__dataPendingClients=this.__dataPendingClients||[],e!==this&&this.__dataPendingClients.push(e)}_flushClients(){this.__dataClientsReady?this.__enableOrFlushClients():(this.__dataClientsReady=!0,this._readyClients(),this.__dataReady=!0)}__enableOrFlushClients(){let e=this.__dataPendingClients;if(e){this.__dataPendingClients=null;for(let t=0;t<e.length;t++){let i=e[t];i.__dataEnabled?i.__dataPending&&i._flushProperties():i._enableProperties()}}}_readyClients(){this.__enableOrFlushClients()}setProperties(e,t){for(let i in e)!t&&this[w.READ_ONLY]&&this[w.READ_ONLY][i]||this._setPendingPropertyOrPath(i,e[i],!0);this._invalidateProperties()}ready(){this._flushProperties(),this.__dataClientsReady||this._flushClients(),this.__dataPending&&this._flushProperties()}_propertiesChanged(e,t,i){let n,r=this.__dataHasPaths;this.__dataHasPaths=!1,function(e,t,i,n){let r=e[w.COMPUTE];if(r)if(b.ls){g++;const s=function(e){let t=e.constructor.__orderedComputedDeps;if(!t){t=new Map;const i=e[w.COMPUTE];let n,{counts:r,ready:s,total:a}=function(e){const t=e[x],i={},n=e[w.COMPUTE],r=[];let s=0;for(let e in t){const n=t[e];s+=i[e]=n.args.filter((e=>!e.literal)).length+(n.dynamicFn?1:0)}for(let e in n)t[e]||r.push(e);return{counts:i,ready:r,total:s}}(e);for(;n=s.shift();){t.set(n,t.size);const e=i[n];e&&e.forEach((e=>{const t=e.info.methodInfo;--a,0==--r[t]&&s.push(t)}))}if(0!==a){const t=e;console.warn(`Computed graph for ${t.localName} incomplete; circular?`)}e.constructor.__orderedComputedDeps=t}return t}(e),a=[];for(let e in t)D(e,r,a,s,n);let o;for(;o=a.shift();)L(e,"",t,0,o)&&D(o.methodInfo,r,a,s,n);Object.assign(i,e.__dataOld),Object.assign(t,e.__dataPending),e.__dataPending=null}else{let s=t;for(;k(e,r,s,i,n);)Object.assign(i,e.__dataOld),Object.assign(t,e.__dataPending),s=e.__dataPending,e.__dataPending=null}}(this,t,i,r),n=this.__dataToNotify,this.__dataToNotify=null,this._propagatePropertyChanges(t,i,r),this._flushClients(),k(this,this[w.REFLECT],t,i,r),k(this,this[w.OBSERVE],t,i,r),n&&function(e,t,i,n,r){let s,a,o=e[w.NOTIFY],l=g++;for(let a in t)t[a]&&(o&&P(e,o,l,a,i,n,r)||r&&O(e,a,i))&&(s=!0);s&&(a=e.__dataHost)&&a._invalidateProperties&&a._invalidateProperties()}(this,n,t,i,r),1==this.__dataCounter&&(this.__dataTemp={})}_propagatePropertyChanges(e,t,i){this[w.PROPAGATE]&&k(this,this[w.PROPAGATE],e,t,i),this.__templateInfo&&this._runEffectsForTemplate(this.__templateInfo,e,t,i)}_runEffectsForTemplate(e,t,i,n){const r=(t,n)=>{k(this,e.propertyEffects,t,i,n,e.nodeList);for(let r=e.firstChild;r;r=r.nextSibling)this._runEffectsForTemplate(r,t,i,n)};e.runEffects?e.runEffects(r,t,n):r(t,n)}linkPaths(e,t){e=(0,s.Fv)(e),t=(0,s.Fv)(t),this.__dataLinkedPaths=this.__dataLinkedPaths||{},this.__dataLinkedPaths[e]=t}unlinkPaths(e){e=(0,s.Fv)(e),this.__dataLinkedPaths&&delete this.__dataLinkedPaths[e]}notifySplices(e,t){let i={path:""};G(this,(0,s.U2)(this,e,i),i.path,t)}get(e,t){return(0,s.U2)(t||this,e)}set(e,t,i){i?(0,s.t8)(i,e,t):this[w.READ_ONLY]&&this[w.READ_ONLY][e]||this._setPendingPropertyOrPath(e,t,!0)&&this._invalidateProperties()}push(e,...t){let i={path:""},n=(0,s.U2)(this,e,i),r=n.length,a=n.push(...t);return t.length&&Z(this,n,i.path,r,t.length,[]),a}pop(e){let t={path:""},i=(0,s.U2)(this,e,t),n=Boolean(i.length),r=i.pop();return n&&Z(this,i,t.path,i.length,0,[r]),r}splice(e,t,i,...n){let r,a={path:""},o=(0,s.U2)(this,e,a);return t<0?t=o.length-Math.floor(-t):t&&(t=Math.floor(t)),r=2===arguments.length?o.splice(t):o.splice(t,i,...n),(n.length||r.length)&&Z(this,o,a.path,t,n.length,r),r}shift(e){let t={path:""},i=(0,s.U2)(this,e,t),n=Boolean(i.length),r=i.shift();return n&&Z(this,i,t.path,0,0,[r]),r}unshift(e,...t){let i={path:""},n=(0,s.U2)(this,e,i),r=n.unshift(...t);return t.length&&Z(this,n,i.path,0,t.length,[]),r}notifyPath(e,t){let i;if(1==arguments.length){let n={path:""};t=(0,s.U2)(this,e,n),i=n.path}else i=Array.isArray(e)?(0,s.Fv)(e):e;this._setPendingPropertyOrPath(i,t,!0,!0)&&this._invalidateProperties()}_createReadOnlyProperty(e,t){var i;this._addPropertyEffect(e,w.READ_ONLY),t&&(this["_set"+(i=e,i[0].toUpperCase()+i.substring(1))]=function(t){this._setProperty(e,t)})}_createPropertyObserver(e,t,i){let n={property:e,method:t,dynamicFn:Boolean(i)};this._addPropertyEffect(e,w.OBSERVE,{fn:A,info:n,trigger:{name:e}}),i&&this._addPropertyEffect(t,w.OBSERVE,{fn:A,info:n,trigger:{name:t}})}_createMethodObserver(e,t){let i=J(e);if(!i)throw new Error("Malformed observer expression '"+e+"'");$(this,i,w.OBSERVE,j,null,t)}_createNotifyingProperty(e){this._addPropertyEffect(e,w.NOTIFY,{fn:I,info:{eventName:(0,a.n)(e)+"-changed",property:e}})}_createReflectedProperty(e){let t=this.constructor.attributeNameForProperty(e);"-"===t[0]?console.warn("Property "+e+" cannot be reflected to attribute "+t+' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.'):this._addPropertyEffect(e,w.REFLECT,{fn:N,info:{attrName:t}})}_createComputedProperty(e,t,i){let n=J(t);if(!n)throw new Error("Malformed computed expression '"+t+"'");const r=$(this,n,w.COMPUTE,L,e,i);S(this,x)[e]=r}_marshalArgs(e,t,i){const n=this.__data,r=[];for(let a=0,o=e.length;a<o;a++){let{name:o,structured:l,wildcard:p,value:d,literal:c}=e[a];if(!c)if(p){const e=(0,s.SG)(o,t),r=X(n,i,e?t:o);d={path:e?t:o,value:r,base:e?(0,s.U2)(n,o):r}}else d=l?X(n,i,o):n[o];if(b.HY&&!this._overrideLegacyUndefined&&void 0===d&&e.length>1)return v;r[a]=d}return r}static addPropertyEffect(e,t,i){this.prototype._addPropertyEffect(e,t,i)}static createPropertyObserver(e,t,i){this.prototype._createPropertyObserver(e,t,i)}static createMethodObserver(e,t){this.prototype._createMethodObserver(e,t)}static createNotifyingProperty(e){this.prototype._createNotifyingProperty(e)}static createReadOnlyProperty(e,t){this.prototype._createReadOnlyProperty(e,t)}static createReflectedProperty(e){this.prototype._createReflectedProperty(e)}static createComputedProperty(e,t,i){this.prototype._createComputedProperty(e,t,i)}static bindTemplate(e){return this.prototype._bindTemplate(e)}_bindTemplate(e,t){let i=this.constructor._parseTemplate(e),n=this.__preBoundTemplateInfo==i;if(!n)for(let e in i.propertyEffects)this._createPropertyAccessor(e);if(t)if(i=Object.create(i),i.wasPreBound=n,this.__templateInfo){const t=e._parentTemplateInfo||this.__templateInfo,n=t.lastChild;i.parent=t,t.lastChild=i,i.previousSibling=n,n?n.nextSibling=i:t.firstChild=i}else this.__templateInfo=i;else this.__preBoundTemplateInfo=i;return i}static _addTemplatePropertyEffect(e,t,i){(e.hostProps=e.hostProps||{})[t]=!0;let n=e.propertyEffects=e.propertyEffects||{};(n[t]=n[t]||[]).push(i)}_stampTemplate(e,t){t=t||this._bindTemplate(e,!0),ee.push(this);let i=super._stampTemplate(e,t);if(ee.pop(),t.nodeList=i.nodeList,!t.wasPreBound){let e=t.childNodes=[];for(let t=i.firstChild;t;t=t.nextSibling)e.push(t)}return i.templateInfo=t,function(e,t){let{nodeList:i,nodeInfoList:n}=t;if(n.length)for(let t=0;t<n.length;t++){let r=n[t],s=i[t],a=r.bindings;if(a)for(let t=0;t<a.length;t++){let i=a[t];B(s,i),H(s,e,i)}s.__dataHost=e}}(this,t),this.__dataClientsReady&&(this._runEffectsForTemplate(t,this.__data,null,!1),this._flushClients()),i}_removeBoundDom(e){const t=e.templateInfo,{previousSibling:i,nextSibling:r,parent:s}=t;i?i.nextSibling=r:s&&(s.firstChild=r),r?r.previousSibling=i:s&&(s.lastChild=i),t.nextSibling=t.previousSibling=null;let a=t.childNodes;for(let e=0;e<a.length;e++){let t=a[e];(0,n.r)((0,n.r)(t).parentNode).removeChild(t)}}static _parseTemplateNode(e,i,n){let r=t._parseTemplateNode.call(this,e,i,n);if(e.nodeType===Node.TEXT_NODE){let t=this._parseBindings(e.textContent,i);t&&(e.textContent=Y(t)||" ",M(this,i,n,"text","textContent",t),r=!0)}return r}static _parseTemplateNodeAttribute(e,i,n,r,s){let o=this._parseBindings(s,i);if(o){let t=r,s="property";C.test(r)?s="attribute":"$"==r[r.length-1]&&(r=r.slice(0,-1),s="attribute");let l=Y(o);return l&&"attribute"==s&&("class"==r&&e.hasAttribute("class")&&(l+=" "+e.getAttribute(r)),e.setAttribute(r,l)),"attribute"==s&&"disable-upgrade$"==t&&e.setAttribute(r,""),"input"===e.localName&&"value"===t&&e.setAttribute(t,""),e.removeAttribute(t),"property"===s&&(r=(0,a.z)(r)),M(this,i,n,s,r,o,l),!0}return t._parseTemplateNodeAttribute.call(this,e,i,n,r,s)}static _parseTemplateNestedTemplate(e,i,n){let r=t._parseTemplateNestedTemplate.call(this,e,i,n);const s=e.parentNode,a=n.templateInfo,o="dom-if"===s.localName,l="dom-repeat"===s.localName;b.gx&&(o||l)&&(s.removeChild(e),(n=n.parentInfo).templateInfo=a,n.noted=!0,r=!1);let p=a.hostProps;if(b.ew&&o)p&&(i.hostProps=Object.assign(i.hostProps||{},p),b.gx||(n.parentInfo.noted=!0));else{let e="{";for(let t in p)M(this,i,n,"property","_host_"+t,[{mode:e,source:t,dependencies:[t],hostProp:!0}])}return r}static _parseBindings(e,t){let i,n=[],r=0;for(;null!==(i=K.exec(e));){i.index>r&&n.push({literal:e.slice(r,i.index)});let s=i[1][0],a=Boolean(i[2]),o=i[3].trim(),l=!1,p="",d=-1;"{"==s&&(d=o.indexOf("::"))>0&&(p=o.substring(d+2),o=o.substring(0,d),l=!0);let c=J(o),h=[];if(c){let{args:e,methodName:i}=c;for(let t=0;t<e.length;t++){let i=e[t];i.literal||h.push(i)}let n=t.dynamicFns;(n&&n[i]||c.static)&&(h.push(i),c.dynamicFn=!0)}else h.push(o);n.push({source:o,mode:s,negate:a,customEvent:l,signature:c,dependencies:h,event:p}),r=K.lastIndex}if(r&&r<e.length){let t=e.substring(r);t&&n.push({literal:t})}return n.length?n:null}static _evaluateBinding(e,t,i,n,r,a){let o;return o=t.signature?j(e,i,n,0,t.signature):i!=t.source?(0,s.U2)(e,t.source):a&&(0,s.AZ)(i)?(0,s.U2)(e,i):e.__data[i],t.negate&&(o=!o),o}}})),ee=[]},8341:(e,t,i)=>{function n(e,t,i){return{index:e,removed:t,addedCount:i}}function r(e,t){return function(e,t,i,r,a,o){let l,p=0,d=0,c=Math.min(i-t,o-a);if(0==t&&0==a&&(p=function(e,t,i){for(let n=0;n<i;n++)if(!s(e[n],t[n]))return n;return i}(e,r,c)),i==e.length&&o==r.length&&(d=function(e,t,i){let n=e.length,r=t.length,a=0;for(;a<i&&s(e[--n],t[--r]);)a++;return a}(e,r,c-p)),a+=p,o-=d,(i-=d)-(t+=p)==0&&o-a==0)return[];if(t==i){for(l=n(t,[],0);a<o;)l.removed.push(r[a++]);return[l]}if(a==o)return[n(t,[],i-t)];let h=function(e){let t=e.length-1,i=e[0].length-1,n=e[t][i],r=[];for(;t>0||i>0;){if(0==t){r.push(2),i--;continue}if(0==i){r.push(3),t--;continue}let s,a=e[t-1][i-1],o=e[t-1][i],l=e[t][i-1];s=o<l?o<a?o:a:l<a?l:a,s==a?(a==n?r.push(0):(r.push(1),n=a),t--,i--):s==o?(r.push(3),t--,n=o):(r.push(2),i--,n=l)}return r.reverse(),r}(function(e,t,i,n,r,a){let o=a-r+1,l=i-t+1,p=new Array(o);for(let e=0;e<o;e++)p[e]=new Array(l),p[e][0]=e;for(let e=0;e<l;e++)p[0][e]=e;for(let i=1;i<o;i++)for(let a=1;a<l;a++)if(s(e[t+a-1],n[r+i-1]))p[i][a]=p[i-1][a-1];else{let e=p[i-1][a]+1,t=p[i][a-1]+1;p[i][a]=e<t?e:t}return p}(e,t,i,r,a,o));l=void 0;let u=[],f=t,_=a;for(let e=0;e<h.length;e++)switch(h[e]){case 0:l&&(u.push(l),l=void 0),f++,_++;break;case 1:l||(l=n(f,[],0)),l.addedCount++,f++,l.removed.push(r[_]),_++;break;case 2:l||(l=n(f,[],0)),l.addedCount++,f++;break;case 3:l||(l=n(f,[],0)),l.removed.push(r[_]),_++}return l&&u.push(l),u}(e,0,e.length,t,0,t.length)}function s(e,t){return e===t}i.d(t,{c:()=>r}),i(7894)},2224:(e,t,i)=>{i.d(t,{Wc:()=>p,YA:()=>d}),i(7894);let n=0,r=0,s=[],a=0,o=!1,l=document.createTextNode("");new window.MutationObserver((function(){o=!1;const e=s.length;for(let t=0;t<e;t++){let e=s[t];if(e)try{e()}catch(e){setTimeout((()=>{throw e}))}}s.splice(0,e),r+=e})).observe(l,{characterData:!0});const p={after:e=>({run:t=>window.setTimeout(t,e),cancel(e){window.clearTimeout(e)}}),run:(e,t)=>window.setTimeout(e,t),cancel(e){window.clearTimeout(e)}},d={run:e=>(o||(o=!0,l.textContent=a++),s.push(e),n++),cancel(e){const t=e-r;if(t>=0){if(!s[t])throw new Error("invalid async handle: "+e);s[t]=null}}}},7894:()=>{window.JSCompiler_renameProperty=function(e,t){return e}},9027:(e,t,i)=>{i.d(t,{n:()=>o,z:()=>a}),i(7894);const n={},r=/-[a-z]/g,s=/([A-Z])/g;function a(e){return n[e]||(n[e]=e.indexOf("-")<0?e:e.replace(r,(e=>e[1].toUpperCase())))}function o(e){return n[e]||(n[e]=e.replace(s,"-$1").toLowerCase())}},5313:(e,t,i)=>{i.d(t,{Ex:()=>s,Jk:()=>a,dx:()=>n}),i(7894),i(1014),i(2224);class n{constructor(){this._asyncModule=null,this._callback=null,this._timer=null}setConfig(e,t){this._asyncModule=e,this._callback=t,this._timer=this._asyncModule.run((()=>{this._timer=null,r.delete(this),this._callback()}))}cancel(){this.isActive()&&(this._cancelAsync(),r.delete(this))}_cancelAsync(){this.isActive()&&(this._asyncModule.cancel(this._timer),this._timer=null)}flush(){this.isActive()&&(this.cancel(),this._callback())}isActive(){return null!=this._timer}static debounce(e,t,i){return e instanceof n?e._cancelAsync():e=new n,e.setConfig(t,i),e}}let r=new Set;const s=function(e){r.add(e)},a=function(){const e=Boolean(r.size);return r.forEach((e=>{try{e.flush()}catch(e){setTimeout((()=>{throw e}))}})),e}},5218:(e,t,i)=>{i.d(t,{E:()=>n.Ex,y:()=>r}),i(7894);var n=i(5313);const r=function(){let e,t;do{e=window.ShadyDOM&&ShadyDOM.flush(),window.ShadyCSS&&window.ShadyCSS.ScopingShim&&window.ShadyCSS.ScopingShim.flush(),t=(0,n.Jk)()}while(e||t)}},4010:(e,t,i)=>{i.d(t,{BP:()=>M,NH:()=>R,ys:()=>D}),i(7894);var n=i(2224),r=i(5313),s=i(9387),a=i(1342);let o="string"==typeof document.head.style.touchAction,l="__polymerGestures",p="__polymerGesturesHandled",d="__polymerGesturesTouchAction",c=["mousedown","mousemove","mouseup","click"],h=[0,1,4,2],u=function(){try{return 1===new MouseEvent("test",{buttons:1}).buttons}catch(e){return!1}}();function f(e){return c.indexOf(e)>-1}let _=!1;function m(e){if(!f(e)&&"touchend"!==e)return o&&_&&s.f6?{passive:!0}:void 0}!function(){try{let e=Object.defineProperty({},"passive",{get(){_=!0}});window.addEventListener("test",null,e),window.removeEventListener("test",null,e)}catch(e){}}();let y=navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);const b=[],g={button:!0,input:!0,keygen:!0,meter:!0,output:!0,textarea:!0,progress:!0,select:!0},v={button:!0,command:!0,fieldset:!0,input:!0,keygen:!0,optgroup:!0,option:!0,select:!0,textarea:!0};function w(e){let t=Array.prototype.slice.call(e.labels||[]);if(!t.length){t=[];try{let i=e.getRootNode();if(e.id){let n=i.querySelectorAll(`label[for = '${e.id}']`);for(let e=0;e<n.length;e++)t.push(n[e])}}catch(e){}}return t}let x=function(e){let t=e.sourceCapabilities;var i;if((!t||t.firesTouchEvents)&&(e[p]={skip:!0},"click"===e.type)){let t=!1,n=A(e);for(let e=0;e<n.length;e++){if(n[e].nodeType===Node.ELEMENT_NODE)if("label"===n[e].localName)b.push(n[e]);else if(i=n[e],g[i.localName]){let i=w(n[e]);for(let e=0;e<i.length;e++)t=t||b.indexOf(i[e])>-1}if(n[e]===k.mouse.target)return}if(t)return;e.preventDefault(),e.stopPropagation()}};function C(e){let t=y?["click"]:c;for(let i,n=0;n<t.length;n++)i=t[n],e?(b.length=0,document.addEventListener(i,x,!0)):document.removeEventListener(i,x,!0)}function S(e){let t=e.type;if(!f(t))return!1;if("mousemove"===t){let t=void 0===e.buttons?1:e.buttons;return e instanceof window.MouseEvent&&!u&&(t=h[e.which]||0),Boolean(1&t)}return 0===(void 0===e.button?0:e.button)}let k={mouse:{target:null,mouseIgnoreJob:null},touch:{x:0,y:0,id:-1,scrollDecided:!1}};function P(e,t,i){e.movefn=t,e.upfn=i,document.addEventListener("mousemove",t),document.addEventListener("mouseup",i)}function E(e){document.removeEventListener("mousemove",e.movefn),document.removeEventListener("mouseup",e.upfn),e.movefn=null,e.upfn=null}s.z2&&document.addEventListener("touchend",(function(e){s.z2&&(k.mouse.mouseIgnoreJob||C(!0),k.mouse.target=A(e)[0],k.mouse.mouseIgnoreJob=r.dx.debounce(k.mouse.mouseIgnoreJob,n.Wc.after(2500),(function(){C(),k.mouse.target=null,k.mouse.mouseIgnoreJob=null})))}),!!_&&{passive:!0});const A=window.ShadyDOM&&window.ShadyDOM.noPatch?window.ShadyDOM.composedPath:e=>e.composedPath&&e.composedPath()||[],O={},T=[];function I(e){const t=A(e);return t.length>0?t[0]:e.target}function N(e){let t,i=e.type,n=e.currentTarget[l];if(!n)return;let r=n[i];if(r){if(!e[p]&&(e[p]={},"touch"===i.slice(0,5))){let t=e.changedTouches[0];if("touchstart"===i&&1===e.touches.length&&(k.touch.id=t.identifier),k.touch.id!==t.identifier)return;o||"touchstart"!==i&&"touchmove"!==i||function(e){let t=e.changedTouches[0],i=e.type;if("touchstart"===i)k.touch.x=t.clientX,k.touch.y=t.clientY,k.touch.scrollDecided=!1;else if("touchmove"===i){if(k.touch.scrollDecided)return;k.touch.scrollDecided=!0;let i=function(e){let t="auto",i=A(e);for(let e,n=0;n<i.length;n++)if(e=i[n],e[d]){t=e[d];break}return t}(e),n=!1,r=Math.abs(k.touch.x-t.clientX),s=Math.abs(k.touch.y-t.clientY);e.cancelable&&("none"===i?n=!0:"pan-x"===i?n=s>r:"pan-y"===i&&(n=r>s)),n?e.preventDefault():z("track")}}(e)}if(t=e[p],!t.skip){for(let i,n=0;n<T.length;n++)i=T[n],r[i.name]&&!t[i.name]&&i.flow&&i.flow.start.indexOf(e.type)>-1&&i.reset&&i.reset();for(let n,s=0;s<T.length;s++)n=T[s],r[n.name]&&!t[n.name]&&(t[n.name]=!0,n[i](e))}}}function R(e,t,i){return!!O[t]&&(function(e,t,i){let n=O[t],r=n.deps,s=n.name,a=e[l];a||(e[l]=a={});for(let t,i,n=0;n<r.length;n++)t=r[n],y&&f(t)&&"click"!==t||(i=a[t],i||(a[t]=i={_count:0}),0===i._count&&e.addEventListener(t,N,m(t)),i[s]=(i[s]||0)+1,i._count=(i._count||0)+1);e.addEventListener(t,i),n.touchAction&&M(e,n.touchAction)}(e,t,i),!0)}function D(e,t,i){return!!O[t]&&(function(e,t,i){let n=O[t],r=n.deps,s=n.name,a=e[l];if(a)for(let t,i,n=0;n<r.length;n++)t=r[n],i=a[t],i&&i[s]&&(i[s]=(i[s]||1)-1,i._count=(i._count||1)-1,0===i._count&&e.removeEventListener(t,N,m(t)));e.removeEventListener(t,i)}(e,t,i),!0)}function L(e){T.push(e);for(let t=0;t<e.emits.length;t++)O[e.emits[t]]=e}function M(e,t){o&&e instanceof HTMLElement&&n.YA.run((()=>{e.style.touchAction=t})),e[d]=t}function F(e,t,i){let n=new Event(t,{bubbles:!0,cancelable:!0,composed:!0});if(n.detail=i,(0,a.r)(e).dispatchEvent(n),n.defaultPrevented){let e=i.preventer||i.sourceEvent;e&&e.preventDefault&&e.preventDefault()}}function z(e){let t=function(e){for(let t,i=0;i<T.length;i++){t=T[i];for(let i,n=0;n<t.emits.length;n++)if(i=t.emits[n],i===e)return t}return null}(e);t.info&&(t.info.prevent=!0)}function B(e,t,i,n){t&&F(t,e,{x:i.clientX,y:i.clientY,sourceEvent:i,preventer:n,prevent:function(e){return z(e)}})}function H(e,t,i){if(e.prevent)return!1;if(e.started)return!0;let n=Math.abs(e.x-t),r=Math.abs(e.y-i);return n>=5||r>=5}function $(e,t,i){if(!t)return;let n,r=e.moves[e.moves.length-2],s=e.moves[e.moves.length-1],a=s.x-e.x,o=s.y-e.y,l=0;r&&(n=s.x-r.x,l=s.y-r.y),F(t,"track",{state:e.state,x:i.clientX,y:i.clientY,dx:a,dy:o,ddx:n,ddy:l,sourceEvent:i,hover:function(){return function(e,t){let i=document.elementFromPoint(e,t),n=i;for(;n&&n.shadowRoot&&!window.ShadyDOM;){let r=n;if(n=n.shadowRoot.elementFromPoint(e,t),r===n)break;n&&(i=n)}return i}(i.clientX,i.clientY)}})}function j(e,t,i){let n=Math.abs(t.clientX-e.x),r=Math.abs(t.clientY-e.y),s=I(i||t);!s||v[s.localName]&&s.hasAttribute("disabled")||(isNaN(n)||isNaN(r)||n<=25&&r<=25||function(e){if("click"===e.type){if(0===e.detail)return!0;let t=I(e);if(!t.nodeType||t.nodeType!==Node.ELEMENT_NODE)return!0;let i=t.getBoundingClientRect(),n=e.pageX,r=e.pageY;return!(n>=i.left&&n<=i.right&&r>=i.top&&r<=i.bottom)}return!1}(t))&&(e.prevent||F(s,"tap",{x:t.clientX,y:t.clientY,sourceEvent:t,preventer:i}))}L({name:"downup",deps:["mousedown","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["down","up"],info:{movefn:null,upfn:null},reset:function(){E(this.info)},mousedown:function(e){if(!S(e))return;let t=I(e),i=this;P(this.info,(function(e){S(e)||(B("up",t,e),E(i.info))}),(function(e){S(e)&&B("up",t,e),E(i.info)})),B("down",t,e)},touchstart:function(e){B("down",I(e),e.changedTouches[0],e)},touchend:function(e){B("up",I(e),e.changedTouches[0],e)}}),L({name:"track",touchAction:"none",deps:["mousedown","touchstart","touchmove","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["track"],info:{x:0,y:0,state:"start",started:!1,moves:[],addMove:function(e){this.moves.length>2&&this.moves.shift(),this.moves.push(e)},movefn:null,upfn:null,prevent:!1},reset:function(){this.info.state="start",this.info.started=!1,this.info.moves=[],this.info.x=0,this.info.y=0,this.info.prevent=!1,E(this.info)},mousedown:function(e){if(!S(e))return;let t=I(e),i=this,n=function(e){let n=e.clientX,r=e.clientY;H(i.info,n,r)&&(i.info.state=i.info.started?"mouseup"===e.type?"end":"track":"start","start"===i.info.state&&z("tap"),i.info.addMove({x:n,y:r}),S(e)||(i.info.state="end",E(i.info)),t&&$(i.info,t,e),i.info.started=!0)};P(this.info,n,(function(e){i.info.started&&n(e),E(i.info)})),this.info.x=e.clientX,this.info.y=e.clientY},touchstart:function(e){let t=e.changedTouches[0];this.info.x=t.clientX,this.info.y=t.clientY},touchmove:function(e){let t=I(e),i=e.changedTouches[0],n=i.clientX,r=i.clientY;H(this.info,n,r)&&("start"===this.info.state&&z("tap"),this.info.addMove({x:n,y:r}),$(this.info,t,i),this.info.state="track",this.info.started=!0)},touchend:function(e){let t=I(e),i=e.changedTouches[0];this.info.started&&(this.info.state="end",this.info.addMove({x:i.clientX,y:i.clientY}),$(this.info,t,i))}}),L({name:"tap",deps:["mousedown","click","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["click","touchend"]},emits:["tap"],info:{x:NaN,y:NaN,prevent:!1},reset:function(){this.info.x=NaN,this.info.y=NaN,this.info.prevent=!1},mousedown:function(e){S(e)&&(this.info.x=e.clientX,this.info.y=e.clientY)},click:function(e){S(e)&&j(this.info,e)},touchstart:function(e){const t=e.changedTouches[0];this.info.x=t.clientX,this.info.y=t.clientY},touchend:function(e){j(this.info,e.changedTouches[0],e)}})},1121:(e,t,i)=>{i.d(t,{d:()=>a}),i(7894);const n=window.trustedTypes&&trustedTypes.createPolicy("polymer-html-literal",{createHTML:e=>e});class r{constructor(e,t){o(e,t);const i=t.reduce(((t,i,n)=>t+s(i)+e[n+1]),e[0]);this.value=i.toString()}toString(){return this.value}}function s(e){if(e instanceof r)return e.value;throw new Error(`non-literal value passed to Polymer's htmlLiteral function: ${e}`)}const a=function(e,...t){o(e,t);const i=document.createElement("template");let a=t.reduce(((t,i,n)=>t+function(e){if(e instanceof HTMLTemplateElement)return e.innerHTML;if(e instanceof r)return s(e);throw new Error(`non-template value passed to Polymer's html function: ${e}`)}(i)+e[n+1]),e[0]);return n&&(a=n.createHTML(a)),i.innerHTML=a,i},o=(e,t)=>{if(!Array.isArray(e)||!Array.isArray(e.raw)||t.length!==e.length-1)throw new TypeError("Invalid call to the html template tag")}},1014:(e,t,i)=>{i.d(t,{o:()=>s}),i(7894);let n=0;function r(){}r.prototype.__mixinApplications,r.prototype.__mixinSet;const s=function(e){let t=e.__mixinApplications;t||(t=new WeakMap,e.__mixinApplications=t);let i=n++;return function(n){let r=n.__mixinSet;if(r&&r[i])return n;let s=t,a=s.get(n);if(!a){a=e(n),s.set(n,a);let t=Object.create(a.__mixinSet||r||null);t[i]=!0,a.__mixinSet=t}return a}}},1446:(e,t,i)=>{function n(e){return e.indexOf(".")>=0}function r(e){let t=e.indexOf(".");return-1===t?e:e.slice(0,t)}function s(e,t){return 0===e.indexOf(t+".")}function a(e,t){return 0===t.indexOf(e+".")}function o(e,t,i){return t+i.slice(e.length)}function l(e,t){return e===t||s(e,t)||a(e,t)}function p(e){if(Array.isArray(e)){let t=[];for(let i=0;i<e.length;i++){let n=e[i].toString().split(".");for(let e=0;e<n.length;e++)t.push(n[e])}return t.join(".")}return e}function d(e){return Array.isArray(e)?p(e).split("."):e.toString().split(".")}function c(e,t,i){let n=e,r=d(t);for(let e=0;e<r.length;e++){if(!n)return;n=n[r[e]]}return i&&(i.path=r.join(".")),n}function h(e,t,i){let n=e,r=d(t),s=r[r.length-1];if(r.length>1){for(let e=0;e<r.length-1;e++)if(n=n[r[e]],!n)return;n[s]=i}else n[t]=i;return r.join(".")}i.d(t,{AZ:()=>n,Fv:()=>p,Iu:()=>o,Jz:()=>r,SG:()=>a,U2:()=>c,jg:()=>s,t8:()=>h,wB:()=>l}),i(7894)},2223:(e,t,i)=>{i.d(t,{T8:()=>l}),i(7894);let n=!1,r=[],s=[];function a(){n=!0,requestAnimationFrame((function(){n=!1,function(e){for(;e.length;)o(e.shift())}(r),setTimeout((function(){!function(e){for(let t=0,i=e.length;t<i;t++)o(e.shift())}(s)}))}))}function o(e){const t=e[0],i=e[1],n=e[2];try{i.apply(t,n)}catch(e){setTimeout((()=>{throw e}))}}function l(e,t,i){n||a(),s.push([e,t,i])}},9967:(e,t,i)=>{i.d(t,{Kk:()=>o,Rq:()=>l,iY:()=>p}),i(7894);let n,r,s=/(url\()([^)]*)(\))/g,a=/(^\/[^\/])|(^#)|(^[\w-\d]*:)/;function o(e,t){if(e&&a.test(e))return e;if("//"===e)return e;if(void 0===n){n=!1;try{const e=new URL("b","http://a");e.pathname="c%20d",n="http://a/c%20d"===e.href}catch(e){}}if(t||(t=document.baseURI||window.location.href),n)try{return new URL(e,t).href}catch(t){return e}return r||(r=document.implementation.createHTMLDocument("temp"),r.base=r.createElement("base"),r.head.appendChild(r.base),r.anchor=r.createElement("a"),r.body.appendChild(r.anchor)),r.base.href=t,r.anchor.href=e,r.anchor.href||e}function l(e,t){return e.replace(s,(function(e,i,n,r){return i+"'"+o(n.replace(/["']/g,""),t)+"'"+r}))}function p(e){return e.substring(0,e.lastIndexOf("/")+1)}},9387:(e,t,i)=>{i.d(t,{FV:()=>s,HY:()=>f,Hr:()=>u,XN:()=>p,ZN:()=>d,a2:()=>h,dJ:()=>g,ew:()=>b,f6:()=>l,gx:()=>y,j8:()=>v,ls:()=>_,md:()=>w,my:()=>r,nL:()=>c,sM:()=>a,v1:()=>o,z2:()=>m}),i(7894);var n=i(9967);const r=!window.ShadyDOM||!window.ShadyDOM.inUse,s=(Boolean(!window.ShadyCSS||window.ShadyCSS.nativeCss),window.customElements.polyfillWrapFlushCallback,r&&"adoptedStyleSheets"in Document.prototype&&"replaceSync"in CSSStyleSheet.prototype&&(()=>{try{const e=new CSSStyleSheet;e.replaceSync("");const t=document.createElement("div");return t.attachShadow({mode:"open"}),t.shadowRoot.adoptedStyleSheets=[e],t.shadowRoot.adoptedStyleSheets[0]===e}catch(e){return!1}})());let a=window.Polymer&&window.Polymer.rootPath||(0,n.iY)(document.baseURI||window.location.href),o=window.Polymer&&window.Polymer.sanitizeDOMValue||void 0,l=window.Polymer&&window.Polymer.setPassiveTouchGestures||!1,p=window.Polymer&&window.Polymer.strictTemplatePolicy||!1,d=window.Polymer&&window.Polymer.allowTemplateFromDomModule||!1,c=window.Polymer&&window.Polymer.legacyOptimizations||!1,h=window.Polymer&&window.Polymer.legacyWarnings||!1,u=window.Polymer&&window.Polymer.syncInitialRender||!1,f=window.Polymer&&window.Polymer.legacyUndefined||!1,_=window.Polymer&&window.Polymer.orderedComputed||!1,m=!0,y=window.Polymer&&window.Polymer.removeNestedTemplates||!1,b=window.Polymer&&window.Polymer.fastDomIf||!1,g=window.Polymer&&window.Polymer.suppressTemplateNotifications||!1,v=window.Polymer&&window.Polymer.legacyNoObservedAttributes||!1,w=window.Polymer&&window.Polymer.useAdoptedStyleSheetsWithBuiltCSS||!1},9836:(e,t,i)=>{i.d(t,{jv:()=>u,lx:()=>c,uT:()=>d});var n=i(4262),r=i(9967);const s="shady-unscoped";function a(e){return n.t.import(e)}function o(e){let t=e.body?e.body:e;const i=(0,r.Rq)(t.textContent,e.baseURI),n=document.createElement("style");return n.textContent=i,n}function l(e){const t=e.trim().split(/\s+/),i=[];for(let e=0;e<t.length;e++)i.push(...p(t[e]));return i}function p(e){const t=a(e);if(!t)return console.warn("Could not find style data in module named",e),[];if(void 0===t._styles){const e=[];e.push(...h(t));const i=t.querySelector("template");i&&e.push(...d(i,t.assetpath)),t._styles=e}return t._styles}function d(e,t){if(!e._styles){const i=[],n=e.content.querySelectorAll("style");for(let e=0;e<n.length;e++){let s=n[e],a=s.getAttribute("include");a&&i.push(...l(a).filter((function(e,t,i){return i.indexOf(e)===t}))),t&&(s.textContent=(0,r.Rq)(s.textContent,t)),i.push(s)}e._styles=i}return e._styles}function c(e){let t=a(e);return t?h(t):[]}function h(e){const t=[],i=e.querySelectorAll("link[rel=import][type~=css]");for(let e=0;e<i.length;e++){let n=i[e];if(n.import){const e=n.import,i=n.hasAttribute(s);if(i&&!e._unscopedStyle){const t=o(e);t.setAttribute(s,""),e._unscopedStyle=t}else e._style||(e._style=o(e));t.push(i?e._unscopedStyle:e._style)}}return t}function u(e){let t=e.trim().split(/\s+/),i="";for(let e=0;e<t.length;e++)i+=f(t[e]);return i}function f(e){let t=a(e);if(t&&void 0===t._cssText){let e=function(e){let t="",i=h(e);for(let e=0;e<i.length;e++)t+=i[e].textContent;return t}(t),i=t.querySelector("template");i&&(e+=function(e,t){let i="";const n=d(e,t);for(let e=0;e<n.length;e++){let t=n[e];t.parentNode&&t.parentNode.removeChild(t),i+=t.textContent}return i}(i,t.assetpath)),t._cssText=e||null}return t||console.warn("Could not find style data in module named",e),t&&t._cssText||""}},3501:(e,t,i)=>{function n(){}i.d(t,{Gd:()=>n,z2:()=>s});const r=[];function s(e){r.push(e)}},1342:(e,t,i)=>{i.d(t,{r:()=>n});const n=window.ShadyDOM&&window.ShadyDOM.noPatch&&window.ShadyDOM.wrap?window.ShadyDOM.wrap:window.ShadyDOM?e=>ShadyDOM.patch(e):e=>e},4673:(e,t,i)=>{i.d(t,{H3:()=>r});var n=i(581);i(1121);const r=(0,n.SH)(HTMLElement)},6550:(e,t,i)=>{i.d(t,{XY:()=>X,dy:()=>W.d});var n=i(2205),r=(i(3505),i(7894),i(7999)),s=i(1014);function a(e,t,i,n,r){let s;r&&(s="object"==typeof i&&null!==i,s&&(n=e.__dataTemp[t]));let a=n!==i&&(n==n||i==i);return s&&a&&(e.__dataTemp[t]=i),a}const o=(0,s.o)((e=>class extends e{_shouldPropertyChange(e,t,i){return a(this,e,t,i,!0)}})),l=(0,s.o)((e=>class extends e{static get properties(){return{mutableData:Boolean}}_shouldPropertyChange(e,t,i){return a(this,e,t,i,this.mutableData)}}));o._mutablePropertyChange=a;var p=i(9387),d=i(1342);let c=null;function h(){return c}h.prototype=Object.create(HTMLTemplateElement.prototype,{constructor:{value:h,writable:!0}});const u=(0,r.q)(h),f=o(u),_=(0,r.q)(class{});function m(e,t){for(let i=0;i<t.length;i++){let n=t[i];if(Boolean(e)!=Boolean(n.__hideTemplateChildren__))if(n.nodeType===Node.TEXT_NODE)e?(n.__polymerTextContent__=n.textContent,n.textContent=""):n.textContent=n.__polymerTextContent__;else if("slot"===n.localName)if(e)n.__polymerReplaced__=document.createComment("hidden-slot"),(0,d.r)((0,d.r)(n).parentNode).replaceChild(n.__polymerReplaced__,n);else{const e=n.__polymerReplaced__;e&&(0,d.r)((0,d.r)(e).parentNode).replaceChild(n,e)}else n.style&&(e?(n.__polymerDisplay__=n.style.display,n.style.display="none"):n.style.display=n.__polymerDisplay__);n.__hideTemplateChildren__=e,n._showHideChildren&&n._showHideChildren(e)}}class y extends _{constructor(e){super(),this._configureProperties(e),this.root=this._stampTemplate(this.__dataHost);let t=[];this.children=t;for(let e=this.root.firstChild;e;e=e.nextSibling)t.push(e),e.__templatizeInstance=this;this.__templatizeOwner&&this.__templatizeOwner.__hideTemplateChildren__&&this._showHideChildren(!0);let i=this.__templatizeOptions;(e&&i.instanceProps||!i.instanceProps)&&this._enableProperties()}_configureProperties(e){if(this.__templatizeOptions.forwardHostProp)for(let e in this.__hostProps)this._setPendingProperty(e,this.__dataHost["_host_"+e]);for(let t in e)this._setPendingProperty(t,e[t])}forwardHostProp(e,t){this._setPendingPropertyOrPath(e,t,!1,!0)&&this.__dataHost._enqueueClient(this)}_addEventListenerToNode(e,t,i){if(this._methodHost&&this.__templatizeOptions.parentModel)this._methodHost._addEventListenerToNode(e,t,(e=>{e.model=this,i(e)}));else{let n=this.__dataHost.__dataHost;n&&n._addEventListenerToNode(e,t,i)}}_showHideChildren(e){m(e,this.children)}_setUnmanagedPropertyToNode(e,t,i){e.__hideTemplateChildren__&&e.nodeType==Node.TEXT_NODE&&"textContent"==t?e.__polymerTextContent__=i:super._setUnmanagedPropertyToNode(e,t,i)}get parentModel(){let e=this.__parentModel;if(!e){let t;e=this;do{e=e.__dataHost.__dataHost}while((t=e.__templatizeOptions)&&!t.parentModel);this.__parentModel=e}return e}dispatchEvent(e){return!0}}y.prototype.__dataHost,y.prototype.__templatizeOptions,y.prototype._methodHost,y.prototype.__templatizeOwner,y.prototype.__hostProps;const b=o(y);function g(e){let t=e.__dataHost;return t&&t._methodHost||t}function v(e,t){return function(e,i,n){t.call(e.__templatizeOwner,i.substring("_host_".length),n[i])}}function w(e,t){return function(e,i,n){t.call(e.__templatizeOwner,e,i,n[i])}}function x(e,t,i){if(p.XN&&!g(e))throw new Error("strictTemplatePolicy: template owner not trusted");if(i=i||{},e.__templatizeOwner)throw new Error("A <template> can only be templatized once");e.__templatizeOwner=t;let n=(t?t.constructor:y)._parseTemplate(e),r=n.templatizeInstanceClass;r||(r=function(e,t,i){let n=i.mutableData?b:y;x.mixin&&(n=x.mixin(n));let r=class extends n{};return r.prototype.__templatizeOptions=i,r.prototype._bindTemplate(e),function(e,t,i,n){let r=i.hostProps||{};for(let t in n.instanceProps){delete r[t];let i=n.notifyInstanceProp;i&&e.prototype._addPropertyEffect(t,e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:w(0,i)})}if(n.forwardHostProp&&t.__dataHost)for(let t in r)i.hasHostProps||(i.hasHostProps=!0),e.prototype._addPropertyEffect(t,e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:function(e,t,i){e.__dataHost._setPendingPropertyOrPath("_host_"+t,i[t],!0,!0)}})}(r,e,t,i),r}(e,n,i),n.templatizeInstanceClass=r);const s=g(e);!function(e,t,i,n){let r=i.forwardHostProp;if(r&&t.hasHostProps){const o="template"==e.localName;let l=t.templatizeTemplateClass;if(!l){if(o){let e=i.mutableData?f:u;class n extends e{}l=t.templatizeTemplateClass=n}else{const i=e.constructor;class n extends i{}l=t.templatizeTemplateClass=n}let s=t.hostProps;for(let e in s)l.prototype._addPropertyEffect("_host_"+e,l.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE,{fn:v(0,r)}),l.prototype._createNotifyingProperty("_host_"+e);p.a2&&n&&function(e,t,i){const n=i.constructor._properties,{propertyEffects:r}=e,{instanceProps:s}=t;for(let e in r)if(!(n[e]||s&&s[e])){const t=r[e];for(let i=0;i<t.length;i++){const{part:n}=t[i].info;if(!n.signature||!n.signature.static){console.warn(`Property '${e}' used in template but not declared in 'properties'; attribute will not be observed.`);break}}}}(t,i,n)}if(e.__dataProto&&Object.assign(e.__data,e.__dataProto),o)a=l,c=s=e,Object.setPrototypeOf(s,a.prototype),new a,c=null,e.__dataTemp={},e.__dataPending=null,e.__dataOld=null,e._enableProperties();else{Object.setPrototypeOf(e,l.prototype);const i=t.hostProps;for(let t in i)if(t="_host_"+t,t in e){const i=e[t];delete e[t],e.__data[t]=i}}}var s,a}(e,n,i,s);let a=class extends r{};return a.prototype._methodHost=s,a.prototype.__dataHost=e,a.prototype.__templatizeOwner=t,a.prototype.__hostProps=n.hostProps,a}var C=i(6163);let S=!1;function k(){if(p.nL&&!p.my){if(!S){S=!0;const e=document.createElement("style");e.textContent="dom-bind,dom-if,dom-repeat{display:none;}",document.head.appendChild(e)}return!0}return!1}const P=(0,C._)(l((0,r.q)(HTMLElement)));customElements.define("dom-bind",class extends P{static get observedAttributes(){return["mutable-data"]}constructor(){if(super(),p.XN)throw new Error("strictTemplatePolicy: dom-bind not allowed");this.root=null,this.$=null,this.__children=null}attributeChangedCallback(e,t,i,n){this.mutableData=!0}connectedCallback(){k()||(this.style.display="none"),this.render()}disconnectedCallback(){this.__removeChildren()}__insertChildren(){(0,d.r)((0,d.r)(this).parentNode).insertBefore(this.root,this)}__removeChildren(){if(this.__children)for(let e=0;e<this.__children.length;e++)this.root.appendChild(this.__children[e])}render(){let e;if(!this.__children){if(e=e||this.querySelector("template"),!e){let t=new MutationObserver((()=>{if(e=this.querySelector("template"),!e)throw new Error("dom-bind requires a <template> child");t.disconnect(),this.render()}));return void t.observe(this,{childList:!0})}this.root=this._stampTemplate(e),this.$=this.root.$,this.__children=[];for(let e=this.root.firstChild;e;e=e.nextSibling)this.__children[this.__children.length]=e;this._enableProperties()}this.__insertChildren(),this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0}))}});var E=i(4673),A=i(5313),O=i(5218),T=i(1446),I=i(2224);const N=l(E.H3);class R extends N{static get is(){return"dom-repeat"}static get template(){return null}static get properties(){return{items:{type:Array},as:{type:String,value:"item"},indexAs:{type:String,value:"index"},itemsIndexAs:{type:String,value:"itemsIndex"},sort:{type:Function,observer:"__sortChanged"},filter:{type:Function,observer:"__filterChanged"},observe:{type:String,observer:"__observeChanged"},delay:Number,renderedItemCount:{type:Number,notify:!p.dJ,readOnly:!0},initialCount:{type:Number},targetFramerate:{type:Number,value:20},_targetFrameTime:{type:Number,computed:"__computeFrameTime(targetFramerate)"},notifyDomChange:{type:Boolean},reuseChunkedInstances:{type:Boolean}}}static get observers(){return["__itemsChanged(items.*)"]}constructor(){super(),this.__instances=[],this.__renderDebouncer=null,this.__itemsIdxToInstIdx={},this.__chunkCount=null,this.__renderStartTime=null,this.__itemsArrayChanged=!1,this.__shouldMeasureChunk=!1,this.__shouldContinueChunking=!1,this.__chunkingId=0,this.__sortFn=null,this.__filterFn=null,this.__observePaths=null,this.__ctor=null,this.__isDetached=!0,this.template=null,this._templateInfo}disconnectedCallback(){super.disconnectedCallback(),this.__isDetached=!0;for(let e=0;e<this.__instances.length;e++)this.__detachInstance(e);this.__chunkingId&&cancelAnimationFrame(this.__chunkingId)}connectedCallback(){if(super.connectedCallback(),k()||(this.style.display="none"),this.__isDetached){this.__isDetached=!1;let e=(0,d.r)((0,d.r)(this).parentNode);for(let t=0;t<this.__instances.length;t++)this.__attachInstance(t,e);this.__chunkingId&&this.__render()}}__ensureTemplatized(){if(!this.__ctor){const e=this;let t=this.template=e._templateInfo?e:this.querySelector("template");if(!t){let e=new MutationObserver((()=>{if(!this.querySelector("template"))throw new Error("dom-repeat requires a <template> child");e.disconnect(),this.__render()}));return e.observe(this,{childList:!0}),!1}let i={};i[this.as]=!0,i[this.indexAs]=!0,i[this.itemsIndexAs]=!0,this.__ctor=x(t,this,{mutableData:this.mutableData,parentModel:!0,instanceProps:i,forwardHostProp:function(e,t){let i=this.__instances;for(let n,r=0;r<i.length&&(n=i[r]);r++)n.forwardHostProp(e,t)},notifyInstanceProp:function(e,t,i){if((0,T.wB)(this.as,t)){let n=e[this.itemsIndexAs];t==this.as&&(this.items[n]=i);let r=(0,T.Iu)(this.as,`${JSCompiler_renameProperty("items",this)}.${n}`,t);this.notifyPath(r,i)}}})}return!0}__getMethodHost(){return this.__dataHost._methodHost||this.__dataHost}__functionFromPropertyValue(e){if("string"==typeof e){let t=e,i=this.__getMethodHost();return function(){return i[t].apply(i,arguments)}}return e}__sortChanged(e){this.__sortFn=this.__functionFromPropertyValue(e),this.items&&this.__debounceRender(this.__render)}__filterChanged(e){this.__filterFn=this.__functionFromPropertyValue(e),this.items&&this.__debounceRender(this.__render)}__computeFrameTime(e){return Math.ceil(1e3/e)}__observeChanged(){this.__observePaths=this.observe&&this.observe.replace(".*",".").split(" ")}__handleObservedPaths(e){if(this.__sortFn||this.__filterFn)if(e){if(this.__observePaths){let t=this.__observePaths;for(let i=0;i<t.length;i++)0===e.indexOf(t[i])&&this.__debounceRender(this.__render,this.delay)}}else this.__debounceRender(this.__render,this.delay)}__itemsChanged(e){this.items&&!Array.isArray(this.items)&&console.warn("dom-repeat expected array for `items`, found",this.items),this.__handleItemPath(e.path,e.value)||("items"===e.path&&(this.__itemsArrayChanged=!0),this.__debounceRender(this.__render))}__debounceRender(e,t=0){this.__renderDebouncer=A.dx.debounce(this.__renderDebouncer,t>0?I.Wc.after(t):I.YA,e.bind(this)),(0,O.E)(this.__renderDebouncer)}render(){this.__debounceRender(this.__render),(0,O.y)()}__render(){if(!this.__ensureTemplatized())return;let e=this.items||[];const t=this.__sortAndFilterItems(e),i=this.__calculateLimit(t.length);this.__updateInstances(e,i,t),this.initialCount&&(this.__shouldMeasureChunk||this.__shouldContinueChunking)&&(cancelAnimationFrame(this.__chunkingId),this.__chunkingId=requestAnimationFrame((()=>{this.__chunkingId=null,this.__continueChunking()}))),this._setRenderedItemCount(this.__instances.length),p.dJ&&!this.notifyDomChange||this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0}))}__sortAndFilterItems(e){let t=new Array(e.length);for(let i=0;i<e.length;i++)t[i]=i;return this.__filterFn&&(t=t.filter(((t,i,n)=>this.__filterFn(e[t],i,n)))),this.__sortFn&&t.sort(((t,i)=>this.__sortFn(e[t],e[i]))),t}__calculateLimit(e){let t=e;const i=this.__instances.length;if(this.initialCount){let n;!this.__chunkCount||this.__itemsArrayChanged&&!this.reuseChunkedInstances?(t=Math.min(e,this.initialCount),n=Math.max(t-i,0),this.__chunkCount=n||1):(n=Math.min(Math.max(e-i,0),this.__chunkCount),t=Math.min(i+n,e)),this.__shouldMeasureChunk=n===this.__chunkCount,this.__shouldContinueChunking=t<e,this.__renderStartTime=performance.now()}return this.__itemsArrayChanged=!1,t}__continueChunking(){if(this.__shouldMeasureChunk){const e=performance.now()-this.__renderStartTime,t=this._targetFrameTime/e;this.__chunkCount=Math.round(this.__chunkCount*t)||1}this.__shouldContinueChunking&&this.__debounceRender(this.__render)}__updateInstances(e,t,i){const n=this.__itemsIdxToInstIdx={};let r;for(r=0;r<t;r++){let t=this.__instances[r],s=i[r],a=e[s];n[s]=r,t?(t._setPendingProperty(this.as,a),t._setPendingProperty(this.indexAs,r),t._setPendingProperty(this.itemsIndexAs,s),t._flushProperties()):this.__insertInstance(a,r,s)}for(let e=this.__instances.length-1;e>=r;e--)this.__detachAndRemoveInstance(e)}__detachInstance(e){let t=this.__instances[e];const i=(0,d.r)(t.root);for(let e=0;e<t.children.length;e++){let n=t.children[e];i.appendChild(n)}return t}__attachInstance(e,t){let i=this.__instances[e];t.insertBefore(i.root,this)}__detachAndRemoveInstance(e){this.__detachInstance(e),this.__instances.splice(e,1)}__stampInstance(e,t,i){let n={};return n[this.as]=e,n[this.indexAs]=t,n[this.itemsIndexAs]=i,new this.__ctor(n)}__insertInstance(e,t,i){const n=this.__stampInstance(e,t,i);let r=this.__instances[t+1],s=r?r.children[0]:this;return(0,d.r)((0,d.r)(this).parentNode).insertBefore(n.root,s),this.__instances[t]=n,n}_showHideChildren(e){for(let t=0;t<this.__instances.length;t++)this.__instances[t]._showHideChildren(e)}__handleItemPath(e,t){let i=e.slice(6),n=i.indexOf("."),r=n<0?i:i.substring(0,n);if(r==parseInt(r,10)){let e=n<0?"":i.substring(n+1);this.__handleObservedPaths(e);let s=this.__itemsIdxToInstIdx[r],a=this.__instances[s];if(a){let i=this.as+(e?"."+e:"");a._setPendingPropertyOrPath(i,t,!1,!0),a._flushProperties()}return!0}}itemForElement(e){let t=this.modelForElement(e);return t&&t[this.as]}indexForElement(e){let t=this.modelForElement(e);return t&&t[this.indexAs]}modelForElement(e){return function(e,t){let i;for(;t;)if(i=t.__dataHost?t:t.__templatizeInstance){if(i.__dataHost==e)return i;t=i.__dataHost}else t=(0,d.r)(t).parentNode;return null}(this.template,e)}}customElements.define(R.is,R);class D extends E.H3{static get is(){return"dom-if"}static get template(){return null}static get properties(){return{if:{type:Boolean,observer:"__debounceRender"},restamp:{type:Boolean,observer:"__debounceRender"},notifyDomChange:{type:Boolean}}}constructor(){super(),this.__renderDebouncer=null,this._lastIf=!1,this.__hideTemplateChildren__=!1,this.__template,this._templateInfo}__debounceRender(){this.__renderDebouncer=A.dx.debounce(this.__renderDebouncer,I.YA,(()=>this.__render())),(0,O.E)(this.__renderDebouncer)}disconnectedCallback(){super.disconnectedCallback();const e=(0,d.r)(this).parentNode;e&&(e.nodeType!=Node.DOCUMENT_FRAGMENT_NODE||(0,d.r)(e).host)||this.__teardownInstance()}connectedCallback(){super.connectedCallback(),k()||(this.style.display="none"),this.if&&this.__debounceRender()}__ensureTemplate(){if(!this.__template){const e=this;let t=e._templateInfo?e:(0,d.r)(e).querySelector("template");if(!t){let e=new MutationObserver((()=>{if(!(0,d.r)(this).querySelector("template"))throw new Error("dom-if requires a <template> child");e.disconnect(),this.__render()}));return e.observe(this,{childList:!0}),!1}this.__template=t}return!0}__ensureInstance(){let e=(0,d.r)(this).parentNode;if(this.__hasInstance()){let t=this.__getInstanceNodes();if(t&&t.length&&(0,d.r)(this).previousSibling!==t[t.length-1])for(let i,n=0;n<t.length&&(i=t[n]);n++)(0,d.r)(e).insertBefore(i,this)}else{if(!e)return!1;if(!this.__ensureTemplate())return!1;this.__createAndInsertInstance(e)}return!0}render(){(0,O.y)()}__render(){if(this.if){if(!this.__ensureInstance())return}else this.restamp&&this.__teardownInstance();this._showHideChildren(),p.dJ&&!this.notifyDomChange||this.if==this._lastIf||(this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0})),this._lastIf=this.if)}__hasInstance(){}__getInstanceNodes(){}__createAndInsertInstance(e){}__teardownInstance(){}_showHideChildren(){}}const L=p.ew?class extends D{constructor(){super(),this.__instance=null,this.__syncInfo=null}__hasInstance(){return Boolean(this.__instance)}__getInstanceNodes(){return this.__instance.templateInfo.childNodes}__createAndInsertInstance(e){const t=this.__dataHost||this;if(p.XN&&!this.__dataHost)throw new Error("strictTemplatePolicy: template owner not trusted");const i=t._bindTemplate(this.__template,!0);i.runEffects=(e,t,i)=>{let n=this.__syncInfo;if(this.if)n&&(this.__syncInfo=null,this._showHideChildren(),t=Object.assign(n.changedProps,t)),e(t,i);else if(this.__instance)if(n||(n=this.__syncInfo={runEffects:e,changedProps:{}}),i)for(const e in t){const t=(0,T.Jz)(e);n.changedProps[t]=this.__dataHost[t]}else Object.assign(n.changedProps,t)},this.__instance=t._stampTemplate(this.__template,i),(0,d.r)(e).insertBefore(this.__instance,this)}__syncHostProperties(){const e=this.__syncInfo;e&&(this.__syncInfo=null,e.runEffects(e.changedProps,!1))}__teardownInstance(){const e=this.__dataHost||this;this.__instance&&(e._removeBoundDom(this.__instance),this.__instance=null,this.__syncInfo=null)}_showHideChildren(){const e=this.__hideTemplateChildren__||!this.if;this.__instance&&Boolean(this.__instance.__hidden)!==e&&(this.__instance.__hidden=e,m(e,this.__instance.templateInfo.childNodes)),e||this.__syncHostProperties()}}:class extends D{constructor(){super(),this.__ctor=null,this.__instance=null,this.__invalidProps=null}__hasInstance(){return Boolean(this.__instance)}__getInstanceNodes(){return this.__instance.children}__createAndInsertInstance(e){this.__ctor||(this.__ctor=x(this.__template,this,{mutableData:!0,forwardHostProp:function(e,t){this.__instance&&(this.if?this.__instance.forwardHostProp(e,t):(this.__invalidProps=this.__invalidProps||Object.create(null),this.__invalidProps[(0,T.Jz)(e)]=!0))}})),this.__instance=new this.__ctor,(0,d.r)(e).insertBefore(this.__instance.root,this)}__teardownInstance(){if(this.__instance){let e=this.__instance.children;if(e&&e.length){let t=(0,d.r)(e[0]).parentNode;if(t){t=(0,d.r)(t);for(let i,n=0;n<e.length&&(i=e[n]);n++)t.removeChild(i)}}this.__invalidProps=null,this.__instance=null}}__syncHostProperties(){let e=this.__invalidProps;if(e){this.__invalidProps=null;for(let t in e)this.__instance._setPendingProperty(t,this.__dataHost[t]);this.__instance._flushProperties()}}_showHideChildren(){const e=this.__hideTemplateChildren__||!this.if;this.__instance&&Boolean(this.__instance.__hidden)!==e&&(this.__instance.__hidden=e,this.__instance._showHideChildren(e)),e||this.__syncHostProperties()}};customElements.define(L.is,L);var M=i(8341),F=i(581);let z=(0,s.o)((e=>{let t=(0,F.SH)(e);return class extends t{static get properties(){return{items:{type:Array},multi:{type:Boolean,value:!1},selected:{type:Object,notify:!0},selectedItem:{type:Object,notify:!0},toggle:{type:Boolean,value:!1}}}static get observers(){return["__updateSelection(multi, items.*)"]}constructor(){super(),this.__lastItems=null,this.__lastMulti=null,this.__selectedMap=null}__updateSelection(e,t){let i=t.path;if(i==JSCompiler_renameProperty("items",this)){let i=t.base||[],n=this.__lastItems;if(e!==this.__lastMulti&&this.clearSelection(),n){let e=(0,M.c)(i,n);this.__applySplices(e)}this.__lastItems=i,this.__lastMulti=e}else if(t.path==`${JSCompiler_renameProperty("items",this)}.splices`)this.__applySplices(t.value.indexSplices);else{let e=i.slice(`${JSCompiler_renameProperty("items",this)}.`.length),t=parseInt(e,10);e.indexOf(".")<0&&e==t&&this.__deselectChangedIdx(t)}}__applySplices(e){let t=this.__selectedMap;for(let i=0;i<e.length;i++){let n=e[i];t.forEach(((e,i)=>{e<n.index||(e>=n.index+n.removed.length?t.set(i,e+n.addedCount-n.removed.length):t.set(i,-1))}));for(let e=0;e<n.addedCount;e++){let i=n.index+e;t.has(this.items[i])&&t.set(this.items[i],i)}}this.__updateLinks();let i=0;t.forEach(((e,n)=>{e<0?(this.multi?this.splice(JSCompiler_renameProperty("selected",this),i,1):this.selected=this.selectedItem=null,t.delete(n)):i++}))}__updateLinks(){if(this.__dataLinkedPaths={},this.multi){let e=0;this.__selectedMap.forEach((t=>{t>=0&&this.linkPaths(`${JSCompiler_renameProperty("items",this)}.${t}`,`${JSCompiler_renameProperty("selected",this)}.${e++}`)}))}else this.__selectedMap.forEach((e=>{this.linkPaths(JSCompiler_renameProperty("selected",this),`${JSCompiler_renameProperty("items",this)}.${e}`),this.linkPaths(JSCompiler_renameProperty("selectedItem",this),`${JSCompiler_renameProperty("items",this)}.${e}`)}))}clearSelection(){this.__dataLinkedPaths={},this.__selectedMap=new Map,this.selected=this.multi?[]:null,this.selectedItem=null}isSelected(e){return this.__selectedMap.has(e)}isIndexSelected(e){return this.isSelected(this.items[e])}__deselectChangedIdx(e){let t=this.__selectedIndexForItemIndex(e);if(t>=0){let e=0;this.__selectedMap.forEach(((i,n)=>{t==e++&&this.deselect(n)}))}}__selectedIndexForItemIndex(e){let t=this.__dataLinkedPaths[`${JSCompiler_renameProperty("items",this)}.${e}`];if(t)return parseInt(t.slice(`${JSCompiler_renameProperty("selected",this)}.`.length),10)}deselect(e){let t=this.__selectedMap.get(e);if(t>=0){let i;this.__selectedMap.delete(e),this.multi&&(i=this.__selectedIndexForItemIndex(t)),this.__updateLinks(),this.multi?this.splice(JSCompiler_renameProperty("selected",this),i,1):this.selected=this.selectedItem=null}}deselectIndex(e){this.deselect(this.items[e])}select(e){this.selectIndex(this.items.indexOf(e))}selectIndex(e){let t=this.items[e];this.isSelected(t)?this.toggle&&this.deselectIndex(e):(this.multi||this.__selectedMap.clear(),this.__selectedMap.set(t,e),this.__updateLinks(),this.multi?this.push(JSCompiler_renameProperty("selected",this),t):this.selected=this.selectedItem=t)}}}))(E.H3);class B extends z{static get is(){return"array-selector"}static get template(){return null}}customElements.define(B.is,B);var H=i(3734),$=i(1322),j=i(3027);const q=new H.ZP;window.ShadyCSS||(window.ShadyCSS={prepareTemplate(e,t,i){},prepareTemplateDom(e,t){},prepareTemplateStyles(e,t,i){},styleSubtree(e,t){q.processStyles(),(0,$.wW)(e,t)},styleElement(e){q.processStyles()},styleDocument(e){q.processStyles(),(0,$.wW)(document.body,e)},getComputedStyleValue:(e,t)=>(0,$.B7)(e,t),flushCustomStyles(){},nativeCss:j.rd,nativeShadow:j.WA,cssBuild:j.Cp,disableRuntime:j.jF}),window.ShadyCSS.CustomStyleInterface=q;var V=i(9836);const U="include",K=window.ShadyCSS.CustomStyleInterface;class Y extends HTMLElement{constructor(){super(),this._style=null,K.addCustomStyle(this)}getStyle(){if(this._style)return this._style;const e=this.querySelector("style");if(!e)return null;this._style=e;const t=e.getAttribute(U);return t&&(e.removeAttribute(U),e.textContent=(0,V.jv)(t)+e.textContent),this.ownerDocument!==window.document&&window.document.head.appendChild(this),this._style}}let J;window.customElements.define("custom-style",Y),J=o._mutablePropertyChange,Boolean;var W=i(1121);const X=(0,n.x)(HTMLElement).prototype},9669:(e,t,i)=>{i.d(t,{$T:()=>r,CN:()=>n,mA:()=>s});const n=/(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,r=/(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,s=/@media\s(.*)/},1322:(e,t,i)=>{i.d(t,{B7:()=>s,OH:()=>a,wW:()=>r});var n=i(9669);function r(e,t){for(let i in t)null===i?e.style.removeProperty(i):e.style.setProperty(i,t[i])}function s(e,t){const i=window.getComputedStyle(e).getPropertyValue(t);return i?i.trim():""}function a(e){const t=n.$T.test(e)||n.CN.test(e);return n.$T.lastIndex=0,n.CN.lastIndex=0,t}},3734:(e,t,i)=>{i.d(t,{ZP:()=>c});let n,r=null,s=window.HTMLImports&&window.HTMLImports.whenReady||null;function a(e){requestAnimationFrame((function(){s?s(e):(r||(r=new Promise((e=>{n=e})),"complete"===document.readyState?n():document.addEventListener("readystatechange",(()=>{"complete"===document.readyState&&n()}))),r.then((function(){e&&e()})))}))}const o="__seenByShadyCSS",l="__shadyCSSCachedStyle";let p=null,d=null;class c{constructor(){this.customStyles=[],this.enqueued=!1,a((()=>{window.ShadyCSS.flushCustomStyles&&window.ShadyCSS.flushCustomStyles()}))}enqueueDocumentValidation(){!this.enqueued&&d&&(this.enqueued=!0,a(d))}addCustomStyle(e){e[o]||(e[o]=!0,this.customStyles.push(e),this.enqueueDocumentValidation())}getStyleForCustomStyle(e){if(e[l])return e[l];let t;return t=e.getStyle?e.getStyle():e,t}processStyles(){const e=this.customStyles;for(let t=0;t<e.length;t++){const i=e[t];if(i[l])continue;const n=this.getStyleForCustomStyle(i);if(n){const e=n.__appliedElement||n;p&&p(e),i[l]=e}}return e}}c.prototype.addCustomStyle=c.prototype.addCustomStyle,c.prototype.getStyleForCustomStyle=c.prototype.getStyleForCustomStyle,c.prototype.processStyles=c.prototype.processStyles,Object.defineProperties(c.prototype,{transformCallback:{get:()=>p,set(e){p=e}},validateCallback:{get:()=>d,set(e){let t=!1;d||(t=!0),d=e,t&&this.enqueueDocumentValidation()}}})},3027:(e,t,i)=>{i.d(t,{Cp:()=>s,WA:()=>n,jF:()=>o,rd:()=>l});const n=!(window.ShadyDOM&&window.ShadyDOM.inUse);let r,s;function a(e){r=(!e||!e.shimcssproperties)&&(n||Boolean(!navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/)&&window.CSS&&CSS.supports&&CSS.supports("box-shadow","0 0 0 var(--foo)")))}window.ShadyCSS&&void 0!==window.ShadyCSS.cssBuild&&(s=window.ShadyCSS.cssBuild);const o=Boolean(window.ShadyCSS&&window.ShadyCSS.disableRuntime);window.ShadyCSS&&void 0!==window.ShadyCSS.nativeCss?r=window.ShadyCSS.nativeCss:window.ShadyCSS?(a(window.ShadyCSS),window.ShadyCSS=void 0):a(window.WebComponents&&window.WebComponents.flags);const l=r}},t={};function i(n){var r=t[n];if(void 0!==r)return r.exports;var s=t[n]={exports:{}};return e[n](s,s.exports,i),s.exports}i.d=(e,t)=>{for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{i(6505),i(2688),i(1449),i(4070),i(7216),i(6550),i(7923),i(6358);var e=i(2710),t=i(3505),n=i(1121),r=i(2223);const s=n.d`
<style>
  :host {
    display: inline-block;
    line-height: 0;
    white-space: nowrap;
    cursor: pointer;
    @apply --paper-font-common-base;
    --calculated-paper-radio-button-size: var(--paper-radio-button-size, 16px);
    /* -1px is a sentinel for the default and is replace in \`attached\`. */
    --calculated-paper-radio-button-ink-size: var(--paper-radio-button-ink-size, -1px);
  }

  :host(:focus) {
    outline: none;
  }

  #radioContainer {
    @apply --layout-inline;
    @apply --layout-center-center;
    position: relative;
    width: var(--calculated-paper-radio-button-size);
    height: var(--calculated-paper-radio-button-size);
    vertical-align: middle;

    @apply --paper-radio-button-radio-container;
  }

  #ink {
    position: absolute;
    top: 50%;
    left: 50%;
    right: auto;
    width: var(--calculated-paper-radio-button-ink-size);
    height: var(--calculated-paper-radio-button-ink-size);
    color: var(--paper-radio-button-unchecked-ink-color, var(--primary-text-color));
    opacity: 0.6;
    pointer-events: none;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  #ink[checked] {
    color: var(--paper-radio-button-checked-ink-color, var(--primary-color));
  }

  #offRadio, #onRadio {
    position: absolute;
    box-sizing: border-box;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  #offRadio {
    border: 2px solid var(--paper-radio-button-unchecked-color, var(--primary-text-color));
    background-color: var(--paper-radio-button-unchecked-background-color, transparent);
    transition: border-color 0.28s;
  }

  #onRadio {
    background-color: var(--paper-radio-button-checked-color, var(--primary-color));
    -webkit-transform: scale(0);
    transform: scale(0);
    transition: -webkit-transform ease 0.28s;
    transition: transform ease 0.28s;
    will-change: transform;
  }

  :host([checked]) #offRadio {
    border-color: var(--paper-radio-button-checked-color, var(--primary-color));
  }

  :host([checked]) #onRadio {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }

  #radioLabel {
    line-height: normal;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    margin-left: var(--paper-radio-button-label-spacing, 10px);
    white-space: normal;
    color: var(--paper-radio-button-label-color, var(--primary-text-color));

    @apply --paper-radio-button-label;
  }

  :host([checked]) #radioLabel {
    @apply --paper-radio-button-label-checked;
  }

  #radioLabel:dir(rtl) {
    margin-left: 0;
    margin-right: var(--paper-radio-button-label-spacing, 10px);
  }

  #radioLabel[hidden] {
    display: none;
  }

  /* disabled state */

  :host([disabled]) #offRadio {
    border-color: var(--paper-radio-button-unchecked-color, var(--primary-text-color));
    opacity: 0.5;
  }

  :host([disabled][checked]) #onRadio {
    background-color: var(--paper-radio-button-unchecked-color, var(--primary-text-color));
    opacity: 0.5;
  }

  :host([disabled]) #radioLabel {
    /* slightly darker than the button, so that it's readable */
    opacity: 0.65;
  }
</style>

<div id="radioContainer">
  <div id="offRadio"></div>
  <div id="onRadio"></div>
</div>

<div id="radioLabel"><slot></slot></div>`;s.setAttribute("strip-whitespace",""),(0,t.k)({_template:s,is:"paper-radio-button",behaviors:[e.K],hostAttributes:{role:"radio","aria-checked":!1,tabindex:0},properties:{ariaActiveAttribute:{type:String,value:"aria-checked"}},ready:function(){this._rippleContainer=this.$.radioContainer},attached:function(){(0,r.T8)(this,(function(){if("-1px"===this.getComputedStyleValue("--calculated-paper-radio-button-ink-size").trim()){var e=parseFloat(this.getComputedStyleValue("--calculated-paper-radio-button-size").trim()),t=Math.floor(3*e);t%2!=e%2&&t++,this.updateStyles({"--paper-radio-button-ink-size":t+"px"})}}))}});var a=i(395),o=i(8876),l=i(9027);class p{constructor(e){this.selection=[],this.selectCallback=e}get(){return this.multi?this.selection.slice():this.selection[0]}clear(e){this.selection.slice().forEach((function(t){(!e||e.indexOf(t)<0)&&this.setItemSelected(t,!1)}),this)}isSelected(e){return this.selection.indexOf(e)>=0}setItemSelected(e,t){if(null!=e&&t!==this.isSelected(e)){if(t)this.selection.push(e);else{var i=this.selection.indexOf(e);i>=0&&this.selection.splice(i,1)}this.selectCallback&&this.selectCallback(e,t)}}select(e){this.multi?this.toggle(e):this.get()!==e&&(this.setItemSelected(this.get(),!1),this.setItemSelected(e,!0))}toggle(e){this.setItemSelected(e,!this.isSelected(e))}}const d={properties:{attrForSelected:{type:String,value:null},selected:{type:String,notify:!0},selectedItem:{type:Object,readOnly:!0,notify:!0},activateEvent:{type:String,value:"tap",observer:"_activateEventChanged"},selectable:String,selectedClass:{type:String,value:"iron-selected"},selectedAttribute:{type:String,value:null},fallbackSelection:{type:String,value:null},items:{type:Array,readOnly:!0,notify:!0,value:function(){return[]}},_excludedLocalNames:{type:Object,value:function(){return{template:1,"dom-bind":1,"dom-if":1,"dom-repeat":1}}}},observers:["_updateAttrForSelected(attrForSelected)","_updateSelected(selected)","_checkFallback(fallbackSelection)"],created:function(){this._bindFilterItem=this._filterItem.bind(this),this._selection=new p(this._applySelection.bind(this))},attached:function(){this._observer=this._observeItems(this),this._addListener(this.activateEvent)},detached:function(){this._observer&&(0,o.vz)(this).unobserveNodes(this._observer),this._removeListener(this.activateEvent)},indexOf:function(e){return this.items?this.items.indexOf(e):-1},select:function(e){this.selected=e},selectPrevious:function(){var e=this.items.length,t=e-1;void 0!==this.selected&&(t=(Number(this._valueToIndex(this.selected))-1+e)%e),this.selected=this._indexToValue(t)},selectNext:function(){var e=0;void 0!==this.selected&&(e=(Number(this._valueToIndex(this.selected))+1)%this.items.length),this.selected=this._indexToValue(e)},selectIndex:function(e){this.select(this._indexToValue(e))},forceSynchronousItemUpdate:function(){this._observer&&"function"==typeof this._observer.flush?this._observer.flush():this._updateItems()},get _shouldUpdateSelection(){return null!=this.selected},_checkFallback:function(){this._updateSelected()},_addListener:function(e){this.listen(this,e,"_activateHandler")},_removeListener:function(e){this.unlisten(this,e,"_activateHandler")},_activateEventChanged:function(e,t){this._removeListener(t),this._addListener(e)},_updateItems:function(){var e=(0,o.vz)(this).queryDistributedElements(this.selectable||"*");e=Array.prototype.filter.call(e,this._bindFilterItem),this._setItems(e)},_updateAttrForSelected:function(){this.selectedItem&&(this.selected=this._valueForItem(this.selectedItem))},_updateSelected:function(){this._selectSelected(this.selected)},_selectSelected:function(e){if(this.items){var t=this._valueToItem(this.selected);t?this._selection.select(t):this._selection.clear(),this.fallbackSelection&&this.items.length&&void 0===this._selection.get()&&(this.selected=this.fallbackSelection)}},_filterItem:function(e){return!this._excludedLocalNames[e.localName]},_valueToItem:function(e){return null==e?null:this.items[this._valueToIndex(e)]},_valueToIndex:function(e){if(!this.attrForSelected)return Number(e);for(var t,i=0;t=this.items[i];i++)if(this._valueForItem(t)==e)return i},_indexToValue:function(e){if(!this.attrForSelected)return e;var t=this.items[e];return t?this._valueForItem(t):void 0},_valueForItem:function(e){if(!e)return null;if(!this.attrForSelected){var t=this.indexOf(e);return-1===t?null:t}var i=e[(0,l.z)(this.attrForSelected)];return null!=i?i:e.getAttribute(this.attrForSelected)},_applySelection:function(e,t){this.selectedClass&&this.toggleClass(this.selectedClass,t,e),this.selectedAttribute&&this.toggleAttribute(this.selectedAttribute,t,e),this._selectionChange(),this.fire("iron-"+(t?"select":"deselect"),{item:e})},_selectionChange:function(){this._setSelectedItem(this._selection.get())},_observeItems:function(e){return(0,o.vz)(e).observeNodes((function(e){this._updateItems(),this._updateSelected(),this.fire("iron-items-changed",e,{bubbles:!1,cancelable:!1})}))},_activateHandler:function(e){for(var t=e.target,i=this.items;t&&t!=this;){var n=i.indexOf(t);if(n>=0){var r=this._indexToValue(n);return void this._itemActivate(r,t)}t=t.parentNode}},_itemActivate:function(e,t){this.fire("iron-activate",{selected:e,item:t},{cancelable:!0}).defaultPrevented||this.select(e)}},c={properties:{multi:{type:Boolean,value:!1,observer:"multiChanged"},selectedValues:{type:Array,notify:!0,value:function(){return[]}},selectedItems:{type:Array,readOnly:!0,notify:!0,value:function(){return[]}}},observers:["_updateSelected(selectedValues.splices)"],select:function(e){this.multi?this._toggleSelected(e):this.selected=e},multiChanged:function(e){this._selection.multi=e,this._updateSelected()},get _shouldUpdateSelection(){return null!=this.selected||null!=this.selectedValues&&this.selectedValues.length},_updateAttrForSelected:function(){this.multi?this.selectedItems&&this.selectedItems.length>0&&(this.selectedValues=this.selectedItems.map((function(e){return this._indexToValue(this.indexOf(e))}),this).filter((function(e){return null!=e}),this)):d._updateAttrForSelected.apply(this)},_updateSelected:function(){this.multi?this._selectMulti(this.selectedValues):this._selectSelected(this.selected)},_selectMulti:function(e){e=e||[];var t=(this._valuesToItems(e)||[]).filter((function(e){return null!=e}));this._selection.clear(t);for(var i=0;i<t.length;i++)this._selection.setItemSelected(t[i],!0);this.fallbackSelection&&!this._selection.get().length&&this._valueToItem(this.fallbackSelection)&&this.select(this.fallbackSelection)},_selectionChange:function(){var e=this._selection.get();this.multi?(this._setSelectedItems(e),this._setSelectedItem(e.length?e[0]:null)):null!=e?(this._setSelectedItems([e]),this._setSelectedItem(e)):(this._setSelectedItems([]),this._setSelectedItem(null))},_toggleSelected:function(e){var t=this.selectedValues.indexOf(e);t<0?this.push("selectedValues",e):this.splice("selectedValues",t,1)},_valuesToItems:function(e){return null==e?null:e.map((function(e){return this._valueToItem(e)}),this)}},h={properties:{focusedItem:{observer:"_focusedItemChanged",readOnly:!0,type:Object},attrForItemTitle:{type:String},disabled:{type:Boolean,value:!1,observer:"_disabledChanged"}},_MODIFIER_KEYS:["Alt","AltGraph","CapsLock","Control","Fn","FnLock","Hyper","Meta","NumLock","OS","ScrollLock","Shift","Super","Symbol","SymbolLock"],_SEARCH_RESET_TIMEOUT_MS:1e3,_previousTabIndex:0,hostAttributes:{role:"menu"},observers:["_updateMultiselectable(multi)"],listeners:{focus:"_onFocus",keydown:"_onKeydown","iron-items-changed":"_onIronItemsChanged"},keyBindings:{up:"_onUpKey",down:"_onDownKey",esc:"_onEscKey","shift+tab:keydown":"_onShiftTabDown"},attached:function(){this._resetTabindices()},select:function(e){this._defaultFocusAsync&&(this.cancelAsync(this._defaultFocusAsync),this._defaultFocusAsync=null);var t=this._valueToItem(e);t&&t.hasAttribute("disabled")||(this._setFocusedItem(t),c.select.apply(this,arguments))},_resetTabindices:function(){var e=this.multi?this.selectedItems&&this.selectedItems[0]:this.selectedItem;this.items.forEach((function(t){t.setAttribute("tabindex",t===e?"0":"-1"),t.setAttribute("aria-selected",this._selection.isSelected(t))}),this)},_updateMultiselectable:function(e){e?this.setAttribute("aria-multiselectable","true"):this.removeAttribute("aria-multiselectable")},_focusWithKeyboardEvent:function(e){if(-1===this._MODIFIER_KEYS.indexOf(e.key)){this.cancelDebouncer("_clearSearchText");for(var t,i=this._searchText||"",n=(i+=(e.key&&1==e.key.length?e.key:String.fromCharCode(e.keyCode)).toLocaleLowerCase()).length,r=0;t=this.items[r];r++)if(!t.hasAttribute("disabled")){var s=this.attrForItemTitle||"textContent",a=(t[s]||t.getAttribute(s)||"").trim();if(!(a.length<n)&&a.slice(0,n).toLocaleLowerCase()==i){this._setFocusedItem(t);break}}this._searchText=i,this.debounce("_clearSearchText",this._clearSearchText,this._SEARCH_RESET_TIMEOUT_MS)}},_clearSearchText:function(){this._searchText=""},_focusPrevious:function(){for(var e=this.items.length,t=Number(this.indexOf(this.focusedItem)),i=1;i<e+1;i++){var n=this.items[(t-i+e)%e];if(!n.hasAttribute("disabled")){var r=(0,o.vz)(n).getOwnerRoot()||document;if(this._setFocusedItem(n),(0,o.vz)(r).activeElement==n)return}}},_focusNext:function(){for(var e=this.items.length,t=Number(this.indexOf(this.focusedItem)),i=1;i<e+1;i++){var n=this.items[(t+i)%e];if(!n.hasAttribute("disabled")){var r=(0,o.vz)(n).getOwnerRoot()||document;if(this._setFocusedItem(n),(0,o.vz)(r).activeElement==n)return}}},_applySelection:function(e,t){t?e.setAttribute("aria-selected","true"):e.setAttribute("aria-selected","false"),d._applySelection.apply(this,arguments)},_focusedItemChanged:function(e,t){t&&t.setAttribute("tabindex","-1"),!e||e.hasAttribute("disabled")||this.disabled||(e.setAttribute("tabindex","0"),e.focus())},_onIronItemsChanged:function(e){e.detail.addedNodes.length&&this._resetTabindices()},_onShiftTabDown:function(e){var t=this.getAttribute("tabindex");h._shiftTabPressed=!0,this._setFocusedItem(null),this.setAttribute("tabindex","-1"),this.async((function(){this.setAttribute("tabindex",t),h._shiftTabPressed=!1}),1)},_onFocus:function(e){if(!h._shiftTabPressed){var t=(0,o.vz)(e).rootTarget;(t===this||void 0===t.tabIndex||this.isLightDescendant(t))&&(this._defaultFocusAsync=this.async((function(){var e=this.multi?this.selectedItems&&this.selectedItems[0]:this.selectedItem;this._setFocusedItem(null),e?this._setFocusedItem(e):this.items[0]&&this._focusNext()})))}},_onUpKey:function(e){this._focusPrevious(),e.detail.keyboardEvent.preventDefault()},_onDownKey:function(e){this._focusNext(),e.detail.keyboardEvent.preventDefault()},_onEscKey:function(e){var t=this.focusedItem;t&&t.blur()},_onKeydown:function(e){this.keyboardEventMatchesKeys(e,"up down esc")||this._focusWithKeyboardEvent(e),e.stopPropagation()},_activateHandler:function(e){d._activateHandler.call(this,e),e.stopPropagation()},_disabledChanged:function(e){e?(this._previousTabIndex=this.hasAttribute("tabindex")?this.tabIndex:0,this.removeAttribute("tabindex")):this.hasAttribute("tabindex")||this.setAttribute("tabindex",this._previousTabIndex)},_shiftTabPressed:!1},u=[[d,c],a.G,h],f={hostAttributes:{role:"menubar"},keyBindings:{left:"_onLeftKey",right:"_onRightKey"},_onUpKey:function(e){this.focusedItem.click(),e.detail.keyboardEvent.preventDefault()},_onDownKey:function(e){this.focusedItem.click(),e.detail.keyboardEvent.preventDefault()},get _isRTL(){return"rtl"===window.getComputedStyle(this).direction},_onLeftKey:function(e){this._isRTL?this._focusNext():this._focusPrevious(),e.detail.keyboardEvent.preventDefault()},_onRightKey:function(e){this._isRTL?this._focusPrevious():this._focusNext(),e.detail.keyboardEvent.preventDefault()},_onKeydown:function(e){this.keyboardEventMatchesKeys(e,"up down left right esc")||this._focusWithKeyboardEvent(e)}},_=[u,f];(0,t.k)({_template:n.d`
    <style>
      :host {
        display: inline-block;
      }

      :host ::slotted(*) {
        padding: var(--paper-radio-group-item-padding, 12px);
      }
    </style>

    <slot></slot>
`,is:"paper-radio-group",behaviors:[_],hostAttributes:{role:"radiogroup"},properties:{attrForSelected:{type:String,value:"name"},selectedAttribute:{type:String,value:"checked"},selectable:{type:String,value:"paper-radio-button"},allowEmptySelection:{type:Boolean,value:!1}},select:function(e){var t=this._valueToItem(e);if(!t||!t.hasAttribute("disabled")){if(this.selected){var i=this._valueToItem(this.selected);if(this.selected==e){if(!this.allowEmptySelection)return void(i&&(i.checked=!0));e=""}i&&(i.checked=!1)}d.select.apply(this,[e]),this.fire("paper-radio-group-changed")}},_activateFocusedItem:function(){this._itemActivate(this._valueForItem(this.focusedItem),this.focusedItem)},_onUpKey:function(e){this._focusPrevious(),e.preventDefault(),this._activateFocusedItem()},_onDownKey:function(e){this._focusNext(),e.preventDefault(),this._activateFocusedItem()},_onLeftKey:function(e){f._onLeftKey.apply(this,arguments),this._activateFocusedItem()},_onRightKey:function(e){f._onRightKey.apply(this,arguments),this._activateFocusedItem()}})})()})();