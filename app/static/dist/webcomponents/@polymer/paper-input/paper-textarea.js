/*! For license information please see paper-textarea.js.LICENSE.txt */
(()=>{"use strict";var e={395:(e,t,n)=>{n.d(t,{G:()=>f}),n(6550);var i={"U+0008":"backspace","U+0009":"tab","U+001B":"esc","U+0020":"space","U+007F":"del"},r={8:"backspace",9:"tab",13:"enter",27:"esc",33:"pageup",34:"pagedown",35:"end",36:"home",32:"space",37:"left",38:"up",39:"right",40:"down",46:"del",106:"*"},s={shift:"shiftKey",ctrl:"ctrlKey",alt:"altKey",meta:"metaKey"},o=/[a-z0-9*]/,a=/U\+/,l=/^arrow/,p=/^space(bar)?/,d=/^escape$/;function c(e,t){var n="";if(e){var i=e.toLowerCase();" "===i||p.test(i)?n="space":d.test(i)?n="esc":1==i.length?t&&!o.test(i)||(n=i):n=l.test(i)?i.replace("arrow",""):"multiply"==i?"*":i}return n}function u(e,t){return n=t,s=e.hasModifiers,(n.key?c(n.key,s):n.detail&&n.detail.key?c(n.detail.key,s):(l="",(o=n.keyIdentifier)&&(o in i?l=i[o]:a.test(o)?(o=parseInt(o.replace("U+","0x"),16),l=String.fromCharCode(o).toLowerCase()):l=o.toLowerCase()),l||function(e){var t="";return Number(e)&&(t=e>=65&&e<=90?String.fromCharCode(32+e):e>=112&&e<=123?"f"+(e-112+1):e>=48&&e<=57?String(e-48):e>=96&&e<=105?String(e-96):r[e]),t}(n.keyCode)||""))===e.key&&(!e.hasModifiers||!!t.shiftKey==!!e.shiftKey&&!!t.ctrlKey==!!e.ctrlKey&&!!t.altKey==!!e.altKey&&!!t.metaKey==!!e.metaKey);var n,s,o,l}function h(e){return e.trim().split(" ").map((function(e){return function(e){return 1===e.length?{combo:e,key:e,event:"keydown"}:e.split("+").reduce((function(e,t){var n=t.split(":"),i=n[0],r=n[1];return i in s?(e[s[i]]=!0,e.hasModifiers=!0):(e.key=i,e.event=r||"keydown"),e}),{combo:e.split(":").shift()})}(e)}))}const f={properties:{keyEventTarget:{type:Object,value:function(){return this}},stopKeyboardEventPropagation:{type:Boolean,value:!1},_boundKeyHandlers:{type:Array,value:function(){return[]}},_imperativeKeyBindings:{type:Object,value:function(){return{}}}},observers:["_resetKeyEventListeners(keyEventTarget, _boundKeyHandlers)"],keyBindings:{},registered:function(){this._prepKeyBindings()},attached:function(){this._listenKeyEventListeners()},detached:function(){this._unlistenKeyEventListeners()},addOwnKeyBinding:function(e,t){this._imperativeKeyBindings[e]=t,this._prepKeyBindings(),this._resetKeyEventListeners()},removeOwnKeyBindings:function(){this._imperativeKeyBindings={},this._prepKeyBindings(),this._resetKeyEventListeners()},keyboardEventMatchesKeys:function(e,t){for(var n=h(t),i=0;i<n.length;++i)if(u(n[i],e))return!0;return!1},_collectKeyBindings:function(){var e=this.behaviors.map((function(e){return e.keyBindings}));return-1===e.indexOf(this.keyBindings)&&e.push(this.keyBindings),e},_prepKeyBindings:function(){for(var e in this._keyBindings={},this._collectKeyBindings().forEach((function(e){for(var t in e)this._addKeyBinding(t,e[t])}),this),this._imperativeKeyBindings)this._addKeyBinding(e,this._imperativeKeyBindings[e]);for(var t in this._keyBindings)this._keyBindings[t].sort((function(e,t){var n=e[0].hasModifiers;return n===t[0].hasModifiers?0:n?-1:1}))},_addKeyBinding:function(e,t){h(e).forEach((function(e){this._keyBindings[e.event]=this._keyBindings[e.event]||[],this._keyBindings[e.event].push([e,t])}),this)},_resetKeyEventListeners:function(){this._unlistenKeyEventListeners(),this.isAttached&&this._listenKeyEventListeners()},_listenKeyEventListeners:function(){this.keyEventTarget&&Object.keys(this._keyBindings).forEach((function(e){var t=this._keyBindings[e],n=this._onKeyBindingEvent.bind(this,t);this._boundKeyHandlers.push([this.keyEventTarget,e,n]),this.keyEventTarget.addEventListener(e,n)}),this)},_unlistenKeyEventListeners:function(){for(var e,t,n,i;this._boundKeyHandlers.length;)t=(e=this._boundKeyHandlers.pop())[0],n=e[1],i=e[2],t.removeEventListener(n,i)},_onKeyBindingEvent:function(e,t){if(this.stopKeyboardEventPropagation&&t.stopPropagation(),!t.defaultPrevented)for(var n=0;n<e.length;n++){var i=e[n][0],r=e[n][1];if(u(i,t)&&(this._triggerKeyHandler(i,r,t),t.defaultPrevented))return}},_triggerKeyHandler:function(e,t,n){var i=Object.create(e);i.keyboardEvent=n;var r=new CustomEvent(e.event,{detail:i,cancelable:!0});this[t].call(this,r),r.defaultPrevented&&n.preventDefault()}}},299:(e,t,n)=>{n.d(t,{a:()=>i}),n(6550),n(8876);const i={properties:{focused:{type:Boolean,value:!1,notify:!0,readOnly:!0,reflectToAttribute:!0},disabled:{type:Boolean,value:!1,notify:!0,observer:"_disabledChanged",reflectToAttribute:!0},_oldTabIndex:{type:String},_boundFocusBlurHandler:{type:Function,value:function(){return this._focusBlurHandler.bind(this)}}},observers:["_changedControlState(focused, disabled)"],ready:function(){this.addEventListener("focus",this._boundFocusBlurHandler,!0),this.addEventListener("blur",this._boundFocusBlurHandler,!0)},_focusBlurHandler:function(e){this._setFocused("focus"===e.type)},_disabledChanged:function(e,t){this.setAttribute("aria-disabled",e?"true":"false"),this.style.pointerEvents=e?"none":"",e?(this._oldTabIndex=this.getAttribute("tabindex"),this._setFocused(!1),this.tabIndex=-1,this.blur()):void 0!==this._oldTabIndex&&(null===this._oldTabIndex?this.removeAttribute("tabindex"):this.setAttribute("tabindex",this._oldTabIndex))},_changedControlState:function(){this._controlStateChanged&&this._controlStateChanged()}}},6358:(e,t,n)=>{n(6550);const i=n(1121).d`
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
</custom-style>`;i.setAttribute("style","display: none;"),document.head.appendChild(i.content);var r=document.createElement("style");r.textContent="[hidden] { display: none !important; }",document.head.appendChild(r)},7122:(e,t,n)=>{n.d(t,{V:()=>i}),n(6550);const i={properties:{name:{type:String},value:{notify:!0,type:String},required:{type:Boolean,value:!1}},attached:function(){},detached:function(){}}},3041:(e,t,n)=>{n.d(t,{x:()=>a}),n(6550);var i=n(3505);class r{constructor(e){r[" "](e),this.type=e&&e.type||"default",this.key=e&&e.key,e&&"value"in e&&(this.value=e.value)}get value(){var e=this.type,t=this.key;if(e&&t)return r.types[e]&&r.types[e][t]}set value(e){var t=this.type,n=this.key;t&&n&&(t=r.types[t]=r.types[t]||{},null==e?delete t[n]:t[n]=e)}get list(){if(this.type){var e=r.types[this.type];return e?Object.keys(e).map((function(e){return s[this.type][e]}),this):[]}}byKey(e){return this.key=e,this.value}}r[" "]=function(){},r.types={};var s=r.types;(0,i.k)({is:"iron-meta",properties:{type:{type:String,value:"default"},key:{type:String},value:{type:String,notify:!0},self:{type:Boolean,observer:"_selfChanged"},__meta:{type:Boolean,computed:"__computeMeta(type, key, value)"}},hostAttributes:{hidden:!0},__computeMeta:function(e,t,n){var i=new r({type:e,key:t});return void 0!==n&&n!==i.value?i.value=n:this.value!==i.value&&(this.value=i.value),i},get list(){return this.__meta&&this.__meta.list},_selfChanged:function(e){e&&(this.value=this)},byKey:function(e){return new r({type:this.type,key:e}).value}});let o=null;const a={properties:{validator:{type:String},invalid:{notify:!0,reflectToAttribute:!0,type:Boolean,value:!1,observer:"_invalidChanged"}},registered:function(){o=new r({type:"validator"})},_invalidChanged:function(){this.invalid?this.setAttribute("aria-invalid","true"):this.removeAttribute("aria-invalid")},get _validator(){return o&&o.byKey(this.validator)},hasValidator:function(){return null!=this._validator},validate:function(e){return void 0===e&&void 0!==this.value?this.invalid=!this._getValidity(this.value):this.invalid=!this._getValidity(e),!this.invalid},_getValidity:function(e){return!this.hasValidator()||this._validator.validate(e)}}},9512:(e,t,n)=>{n.d(t,{o:()=>i}),n(6550);const i={attached:function(){this.fire("addon-attached")},update:function(e){}}},8056:(e,t,n)=>{n.d(t,{d0:()=>p}),n(6550);var i=n(395),r=n(299),s=n(8876),o=n(4673);const a={NextLabelID:1,NextAddonID:1,NextInputID:1},l={properties:{label:{type:String},value:{notify:!0,type:String},disabled:{type:Boolean,value:!1},invalid:{type:Boolean,value:!1,notify:!0},allowedPattern:{type:String},type:{type:String},list:{type:String},pattern:{type:String},required:{type:Boolean,value:!1},errorMessage:{type:String},charCounter:{type:Boolean,value:!1},noLabelFloat:{type:Boolean,value:!1},alwaysFloatLabel:{type:Boolean,value:!1},autoValidate:{type:Boolean,value:!1},validator:{type:String},autocomplete:{type:String,value:"off"},autofocus:{type:Boolean,observer:"_autofocusChanged"},inputmode:{type:String},minlength:{type:Number},maxlength:{type:Number},min:{type:String},max:{type:String},step:{type:String},name:{type:String},placeholder:{type:String,value:""},readonly:{type:Boolean,value:!1},size:{type:Number},autocapitalize:{type:String,value:"none"},autocorrect:{type:String,value:"off"},autosave:{type:String},results:{type:Number},accept:{type:String},multiple:{type:Boolean},_ariaDescribedBy:{type:String,value:""},_ariaLabelledBy:{type:String,value:""},_inputId:{type:String,value:""}},listeners:{"addon-attached":"_onAddonAttached"},keyBindings:{"shift+tab:keydown":"_onShiftTabDown"},hostAttributes:{tabindex:0},get inputElement(){return this.$||(this.$={}),this.$.input||(this._generateInputId(),this.$.input=this.$$("#"+this._inputId)),this.$.input},get _focusableElement(){return this.inputElement},created:function(){this._typesThatHaveText=["date","datetime","datetime-local","month","time","week","file"]},attached:function(){this._updateAriaLabelledBy(),!o.H3&&this.inputElement&&-1!==this._typesThatHaveText.indexOf(this.inputElement.type)&&(this.alwaysFloatLabel=!0)},_appendStringWithSpace:function(e,t){return e?e+" "+t:t},_onAddonAttached:function(e){var t=(0,s.vz)(e).rootTarget;if(t.id)this._ariaDescribedBy=this._appendStringWithSpace(this._ariaDescribedBy,t.id);else{var n="paper-input-add-on-"+a.NextAddonID++;t.id=n,this._ariaDescribedBy=this._appendStringWithSpace(this._ariaDescribedBy,n)}},validate:function(){return this.inputElement.validate()},_focusBlurHandler:function(e){r.a._focusBlurHandler.call(this,e),this.focused&&!this._shiftTabPressed&&this._focusableElement&&this._focusableElement.focus()},_onShiftTabDown:function(e){var t=this.getAttribute("tabindex");this._shiftTabPressed=!0,this.setAttribute("tabindex","-1"),this.async((function(){this.setAttribute("tabindex",t),this._shiftTabPressed=!1}),1)},_handleAutoValidate:function(){this.autoValidate&&this.validate()},updateValueAndPreserveCaret:function(e){try{var t=this.inputElement.selectionStart;this.value=e,this.inputElement.selectionStart=t,this.inputElement.selectionEnd=t}catch(t){this.value=e}},_computeAlwaysFloatLabel:function(e,t){return t||e},_updateAriaLabelledBy:function(){var e,t=(0,s.vz)(this.root).querySelector("label");t?(t.id?e=t.id:(e="paper-input-label-"+a.NextLabelID++,t.id=e),this._ariaLabelledBy=e):this._ariaLabelledBy=""},_generateInputId:function(){this._inputId&&""!==this._inputId||(this._inputId="input-"+a.NextInputID++)},_onChange:function(e){this.shadowRoot&&this.fire(e.type,{sourceEvent:e},{node:this,bubbles:e.bubbles,cancelable:e.cancelable})},_autofocusChanged:function(){if(this.autofocus&&this._focusableElement){var e=document.activeElement;e instanceof HTMLElement&&e!==document.body&&e!==document.documentElement||this._focusableElement.focus()}}},p=[r.a,i.G,l]},438:(e,t,n)=>{n(6550),n(5475);var i=n(3505),r=n(1121),s=n(9512);(0,i.k)({_template:r.d`
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
`,is:"paper-input-char-counter",behaviors:[s.o],properties:{_charCounterStr:{type:String,value:"0"}},update:function(e){if(e.inputElement){e.value=e.value||"";var t=e.value.toString().length.toString();e.inputElement.hasAttribute("maxlength")&&(t+="/"+e.inputElement.getAttribute("maxlength")),this._charCounterStr=t}}})},7631:(e,t,n)=>{n(6550),n(6358),n(7923),n(5475);var i=n(3505),r=n(8876),s=n(9027),o=n(1121);const a=o.d`
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
`;a.setAttribute("style","display: none;"),document.head.appendChild(a.content),(0,i.k)({_template:o.d`
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
`,is:"paper-input-container",properties:{noLabelFloat:{type:Boolean,value:!1},alwaysFloatLabel:{type:Boolean,value:!1},attrForValue:{type:String,value:"bind-value"},autoValidate:{type:Boolean,value:!1},invalid:{observer:"_invalidChanged",type:Boolean,value:!1},focused:{readOnly:!0,type:Boolean,value:!1,notify:!0},_addons:{type:Array},_inputHasContent:{type:Boolean,value:!1},_inputSelector:{type:String,value:"input,iron-input,textarea,.paper-input-input"},_boundOnFocus:{type:Function,value:function(){return this._onFocus.bind(this)}},_boundOnBlur:{type:Function,value:function(){return this._onBlur.bind(this)}},_boundOnInput:{type:Function,value:function(){return this._onInput.bind(this)}},_boundValueChanged:{type:Function,value:function(){return this._onValueChanged.bind(this)}}},listeners:{"addon-attached":"_onAddonAttached","iron-input-validate":"_onIronInputValidate"},get _valueChangedEvent(){return this.attrForValue+"-changed"},get _propertyForValue(){return(0,s.z)(this.attrForValue)},get _inputElement(){return(0,r.vz)(this).querySelector(this._inputSelector)},get _inputElementValue(){return this._inputElement[this._propertyForValue]||this._inputElement.value},ready:function(){this.__isFirstValueUpdate=!0,this._addons||(this._addons=[]),this.addEventListener("focus",this._boundOnFocus,!0),this.addEventListener("blur",this._boundOnBlur,!0)},attached:function(){this.attrForValue?this._inputElement.addEventListener(this._valueChangedEvent,this._boundValueChanged):this.addEventListener("input",this._onInput),this._inputElementValue&&""!=this._inputElementValue?this._handleValueAndAutoValidate(this._inputElement):this._handleValue(this._inputElement)},_onAddonAttached:function(e){this._addons||(this._addons=[]);var t=e.target;-1===this._addons.indexOf(t)&&(this._addons.push(t),this.isAttached&&this._handleValue(this._inputElement))},_onFocus:function(){this._setFocused(!0)},_onBlur:function(){this._setFocused(!1),this._handleValueAndAutoValidate(this._inputElement)},_onInput:function(e){this._handleValueAndAutoValidate(e.target)},_onValueChanged:function(e){var t=e.target;this.__isFirstValueUpdate&&(this.__isFirstValueUpdate=!1,void 0===t.value||""===t.value)||this._handleValueAndAutoValidate(e.target)},_handleValue:function(e){var t=this._inputElementValue;t||0===t||"number"===e.type&&!e.checkValidity()?this._inputHasContent=!0:this._inputHasContent=!1,this.updateAddons({inputElement:e,value:t,invalid:this.invalid})},_handleValueAndAutoValidate:function(e){var t;this.autoValidate&&e&&(t=e.validate?e.validate(this._inputElementValue):e.checkValidity(),this.invalid=!t),this._handleValue(e)},_onIronInputValidate:function(e){this.invalid=this._inputElement.invalid},_invalidChanged:function(){this._addons&&this.updateAddons({invalid:this.invalid})},updateAddons:function(e){for(var t,n=0;t=this._addons[n];n++)t.update(e)},_computeInputContentClass:function(e,t,n,i,r){var s="input-content";if(e)r&&(s+=" label-is-hidden"),i&&(s+=" is-invalid");else{var o=this.querySelector("label");t||r?(s+=" label-is-floating",this.$.labelAndInputContainer.style.position="static",i?s+=" is-invalid":n&&(s+=" label-is-highlighted")):(o&&(this.$.labelAndInputContainer.style.position="relative"),i&&(s+=" is-invalid"))}return n&&(s+=" focused"),s},_computeUnderlineClass:function(e,t){var n="underline";return t?n+=" is-invalid":e&&(n+=" is-highlighted"),n},_computeAddOnContentClass:function(e,t){var n="add-on-content";return t?n+=" is-invalid":e&&(n+=" is-highlighted"),n}})},9679:(e,t,n)=>{n(6550),n(7923),n(5475);var i=n(3505),r=n(1121),s=n(9512);(0,i.k)({_template:r.d`
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
`,is:"paper-input-error",behaviors:[s.o],properties:{invalid:{readOnly:!0,reflectToAttribute:!0,type:Boolean}},update:function(e){this._setInvalid(e.invalid)}})},7923:(e,t,n)=>{n(6550);var i=n(1121);const r=i.d`
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
`;r.setAttribute("style","display: none;"),document.head.appendChild(r.content);const s=i.d`
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
</custom-style>`;s.setAttribute("style","display: none;"),document.head.appendChild(s.content)},5475:(e,t,n)=>{if(n(6550),!window.polymerSkipLoadingFontRoboto){const e=document.createElement("link");e.rel="stylesheet",e.type="text/css",e.crossOrigin="anonymous",e.href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,700|Roboto:400,300,300italic,400italic,500,500italic,700,700italic",document.head.appendChild(e)}const i=n(1121).d`<custom-style>
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
</custom-style>`;i.setAttribute("style","display: none;"),document.head.appendChild(i.content)},4262:(e,t,n)=>{n.d(t,{t:()=>p}),n(7894);var i=n(9967),r=n(9387);let s={},o={};function a(e,t){s[e]=o[e.toLowerCase()]=t}function l(e){return s[e]||o[e.toLowerCase()]}class p extends HTMLElement{static get observedAttributes(){return["id"]}static import(e,t){if(e){let n=l(e);return n&&t?n.querySelector(t):n}return null}attributeChangedCallback(e,t,n,i){t!==n&&this.register()}get assetpath(){if(!this.__assetpath){const e=window.HTMLImports&&HTMLImports.importForElement?HTMLImports.importForElement(this)||document:this.ownerDocument,t=(0,i.Kk)(this.getAttribute("assetpath")||"",e.baseURI);this.__assetpath=(0,i.iY)(t)}return this.__assetpath}register(e){if(e=e||this.id){if(r.XN&&void 0!==l(e))throw a(e,null),new Error(`strictTemplatePolicy: dom-module ${e} re-registered`);this.id=e,a(e,this),(t=this).querySelector("style")&&console.warn("dom-module %s has style outside template",t.id)}var t}}p.prototype.modules=s,customElements.define("dom-module",p)},2205:(e,t,n)=>{n.d(t,{x:()=>ve});var i=n(3027);class r{constructor(){this.start=0,this.end=0,this.previous=null,this.parent=null,this.rules=null,this.parsedCssText="",this.cssText="",this.atRule=!1,this.type=0,this.keyframesName="",this.selector="",this.parsedSelector=""}}function s(e){return o(function(e){let t=new r;t.start=0,t.end=e.length;let n=t;for(let i=0,s=e.length;i<s;i++)if(e[i]===p){n.rules||(n.rules=[]);let e=n,t=e.rules[e.rules.length-1]||null;n=new r,n.start=i+1,n.parent=e,n.previous=t,e.rules.push(n)}else e[i]===d&&(n.end=i+1,n=n.parent||t);return t}(e=e.replace(c.comments,"").replace(c.port,"")),e)}function o(e,t){let n=t.substring(e.start,e.end-1);if(e.parsedCssText=e.cssText=n.trim(),e.parent){let i=e.previous?e.previous.end:e.parent.start;n=t.substring(i,e.start-1),n=function(e){return e.replace(/\\([0-9a-f]{1,6})\s/gi,(function(){let e=arguments[1],t=6-e.length;for(;t--;)e="0"+e;return"\\"+e}))}(n),n=n.replace(c.multipleSpaces," "),n=n.substring(n.lastIndexOf(";")+1);let r=e.parsedSelector=e.selector=n.trim();e.atRule=0===r.indexOf(f),e.atRule?0===r.indexOf(h)?e.type=l.MEDIA_RULE:r.match(c.keyframesRule)&&(e.type=l.KEYFRAMES_RULE,e.keyframesName=e.selector.split(c.multipleSpaces).pop()):0===r.indexOf(u)?e.type=l.MIXIN_RULE:e.type=l.STYLE_RULE}let i=e.rules;if(i)for(let e,n=0,r=i.length;n<r&&(e=i[n]);n++)o(e,t);return e}function a(e,t,n=""){let i="";if(e.cssText||e.rules){let n=e.rules;if(n&&!function(e){let t=e[0];return Boolean(t)&&Boolean(t.selector)&&0===t.selector.indexOf(u)}(n))for(let e,r=0,s=n.length;r<s&&(e=n[r]);r++)i=a(e,t,i);else i=t?e.cssText:function(e){return function(e){return e.replace(c.mixinApply,"").replace(c.varApply,"")}(e=function(e){return e.replace(c.customProp,"").replace(c.mixinProp,"")}(e))}(e.cssText),i=i.trim(),i&&(i="  "+i+"\n")}return i&&(e.selector&&(n+=e.selector+" "+p+"\n"),n+=i,e.selector&&(n+=d+"\n\n")),n}const l={STYLE_RULE:1,KEYFRAMES_RULE:7,MEDIA_RULE:4,MIXIN_RULE:1e3},p="{",d="}",c={comments:/\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,port:/@import[^;]*;/gim,customProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,mixinProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,mixinApply:/@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,varApply:/[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,keyframesRule:/^@[^\s]*keyframes/,multipleSpaces:/\s+/g},u="--",h="@media",f="@";var _=n(9669);const m=new Set;function y(e){const t=e.textContent;if(!m.has(t)){m.add(t);const e=document.createElement("style");e.setAttribute("shady-unscoped",""),e.textContent=t,document.head.appendChild(e)}}function g(e){return e.hasAttribute("shady-unscoped")}function b(e,t){return e?("string"==typeof e&&(e=s(e)),t&&w(e,t),a(e,i.rd)):""}function v(e){return!e.__cssRules&&e.textContent&&(e.__cssRules=s(e.textContent)),e.__cssRules||null}function w(e,t,n,i){if(!e)return;let r=!1,s=e.type;if(i&&s===l.MEDIA_RULE){let t=e.selector.match(_.mA);t&&(window.matchMedia(t[1]).matches||(r=!0))}s===l.STYLE_RULE?t(e):n&&s===l.KEYFRAMES_RULE?n(e):s===l.MIXIN_RULE&&(r=!0);let o=e.rules;if(o&&!r)for(let e,r=0,s=o.length;r<s&&(e=o[r]);r++)w(e,t,n,i)}function C(e,t){let n=e.indexOf("var(");if(-1===n)return t(e,"","","");let i=function(e,t){let n=0;for(let i=t,r=e.length;i<r;i++)if("("===e[i])n++;else if(")"===e[i]&&0==--n)return i;return-1}(e,n+3),r=e.substring(n+4,i),s=e.substring(0,n),o=C(e.substring(i+1),t),a=r.indexOf(",");return-1===a?t(s,r.trim(),"",o):t(s,r.substring(0,a).trim(),r.substring(a+1).trim(),o)}window.ShadyDOM&&window.ShadyDOM.wrap;const P="css-build";function S(e){return""!==function(e){if(void 0!==i.Cp)return i.Cp;if(void 0===e.__cssBuild){const t=e.getAttribute(P);if(t)e.__cssBuild=t;else{const t=function(e){const t="template"===e.localName?e.content.firstChild:e.firstChild;if(t instanceof Comment){const e=t.textContent.trim().split(":");if(e[0]===P)return e[1]}return""}(e);""!==t&&function(e){const t="template"===e.localName?e.content.firstChild:e.firstChild;t.parentNode.removeChild(t)}(e),e.__cssBuild=t}}return e.__cssBuild||""}(e)}var x=n(1322);const E=/;\s*/m,A=/^\s*(initial)|(inherit)\s*$/,O=/\s*!important/,T="_-_";class k{constructor(){this._map={}}set(e,t){e=e.trim(),this._map[e]={properties:t,dependants:{}}}get(e){return e=e.trim(),this._map[e]||null}}let N=null;class I{constructor(){this._currentElement=null,this._measureElement=null,this._map=new k}detectMixin(e){return(0,x.OH)(e)}gatherStyles(e){const t=function(e){const t=[],n=e.querySelectorAll("style");for(let e=0;e<n.length;e++){const r=n[e];g(r)?i.WA||(y(r),r.parentNode.removeChild(r)):(t.push(r.textContent),r.parentNode.removeChild(r))}return t.join("").trim()}(e.content);if(t){const n=document.createElement("style");return n.textContent=t,e.content.insertBefore(n,e.content.firstChild),n}return null}transformTemplate(e,t){void 0===e._gatheredStyle&&(e._gatheredStyle=this.gatherStyles(e));const n=e._gatheredStyle;return n?this.transformStyle(n,t):null}transformStyle(e,t=""){let n=v(e);return this.transformRules(n,t),e.textContent=b(n),n}transformCustomStyle(e){let t=v(e);return w(t,(e=>{":root"===e.selector&&(e.selector="html"),this.transformRule(e)})),e.textContent=b(t),t}transformRules(e,t){this._currentElement=t,w(e,(e=>{this.transformRule(e)})),this._currentElement=null}transformRule(e){e.cssText=this.transformCssText(e.parsedCssText,e),":root"===e.selector&&(e.selector=":host > *")}transformCssText(e,t){return e=e.replace(_.CN,((e,n,i,r)=>this._produceCssProperties(e,n,i,r,t))),this._consumeCssProperties(e,t)}_getInitialValueForProperty(e){return this._measureElement||(this._measureElement=document.createElement("meta"),this._measureElement.setAttribute("apply-shim-measure",""),this._measureElement.style.all="initial",document.head.appendChild(this._measureElement)),window.getComputedStyle(this._measureElement).getPropertyValue(e)}_fallbacksFromPreviousRules(e){let t=e;for(;t.parent;)t=t.parent;const n={};let i=!1;return w(t,(t=>{i=i||t===e,i||t.selector===e.selector&&Object.assign(n,this._cssTextToMap(t.parsedCssText))})),n}_consumeCssProperties(e,t){let n=null;for(;n=_.$T.exec(e);){let i=n[0],r=n[1],s=n.index,o=s+i.indexOf("@apply"),a=s+i.length,l=e.slice(0,o),p=e.slice(a),d=t?this._fallbacksFromPreviousRules(t):{};Object.assign(d,this._cssTextToMap(l));let c=this._atApplyToCssProperties(r,d);e=`${l}${c}${p}`,_.$T.lastIndex=s+c.length}return e}_atApplyToCssProperties(e,t){e=e.replace(E,"");let n=[],i=this._map.get(e);if(i||(this._map.set(e,{}),i=this._map.get(e)),i){let r,s,o;this._currentElement&&(i.dependants[this._currentElement]=!0);const a=i.properties;for(r in a)o=t&&t[r],s=[r,": var(",e,T,r],o&&s.push(",",o.replace(O,"")),s.push(")"),O.test(a[r])&&s.push(" !important"),n.push(s.join(""))}return n.join("; ")}_replaceInitialOrInherit(e,t){let n=A.exec(t);return n&&(t=n[1]?this._getInitialValueForProperty(e):"apply-shim-inherit"),t}_cssTextToMap(e,t=!1){let n,i,r=e.split(";"),s={};for(let e,o,a=0;a<r.length;a++)e=r[a],e&&(o=e.split(":"),o.length>1&&(n=o[0].trim(),i=o.slice(1).join(":"),t&&(i=this._replaceInitialOrInherit(n,i)),s[n]=i));return s}_invalidateMixinEntry(e){if(N)for(let t in e.dependants)t!==this._currentElement&&N(t)}_produceCssProperties(e,t,n,i,r){if(n&&C(n,((e,t)=>{t&&this._map.get(t)&&(i=`@apply ${t};`)})),!i)return e;let s=this._consumeCssProperties(""+i,r),o=e.slice(0,e.indexOf("--")),a=this._cssTextToMap(s,!0),l=a,p=this._map.get(t),d=p&&p.properties;d?l=Object.assign(Object.create(d),a):this._map.set(t,l);let c,u,h=[],f=!1;for(c in l)u=a[c],void 0===u&&(u="initial"),d&&!(c in d)&&(f=!0),h.push(`${t}${T}${c}: ${u}`);return f&&this._invalidateMixinEntry(p),p&&(p.properties=l),n&&(o=`${e};${o}`),`${o}${h.join("; ")};`}}I.prototype.detectMixin=I.prototype.detectMixin,I.prototype.transformStyle=I.prototype.transformStyle,I.prototype.transformCustomStyle=I.prototype.transformCustomStyle,I.prototype.transformRules=I.prototype.transformRules,I.prototype.transformRule=I.prototype.transformRule,I.prototype.transformTemplate=I.prototype.transformTemplate,I.prototype._separator=T,Object.defineProperty(I.prototype,"invalidCallback",{get:()=>N,set(e){N=e}});const M=I,L={},D="_applyShimCurrentVersion",R="_applyShimNextVersion",F="_applyShimValidatingVersion",B=Promise.resolve();function H(e){let t=L[e];t&&function(e){e[D]=e[D]||0,e[F]=e[F]||0,e[R]=(e[R]||0)+1}(t)}function z(e){return e[D]===e[R]}n(3734);const $=new M;class j{constructor(){this.customStyleInterface=null,$.invalidCallback=H}ensure(){this.customStyleInterface||window.ShadyCSS.CustomStyleInterface&&(this.customStyleInterface=window.ShadyCSS.CustomStyleInterface,this.customStyleInterface.transformCallback=e=>{$.transformCustomStyle(e)},this.customStyleInterface.validateCallback=()=>{requestAnimationFrame((()=>{this.customStyleInterface.enqueued&&this.flushCustomStyles()}))})}prepareTemplate(e,t){if(this.ensure(),S(e))return;L[t]=e;let n=$.transformTemplate(e,t);e._styleAst=n}flushCustomStyles(){if(this.ensure(),!this.customStyleInterface)return;let e=this.customStyleInterface.processStyles();if(this.customStyleInterface.enqueued){for(let t=0;t<e.length;t++){let n=e[t],i=this.customStyleInterface.getStyleForCustomStyle(n);i&&$.transformCustomStyle(i)}this.customStyleInterface.enqueued=!1}}styleSubtree(e,t){if(this.ensure(),t&&(0,x.wW)(e,t),e.shadowRoot){this.styleElement(e);let t=e.shadowRoot.children||e.shadowRoot.childNodes;for(let e=0;e<t.length;e++)this.styleSubtree(t[e])}else{let t=e.children||e.childNodes;for(let e=0;e<t.length;e++)this.styleSubtree(t[e])}}styleElement(e){this.ensure();let{is:t}=function(e){let t=e.localName,n="",i="";return t?t.indexOf("-")>-1?n=t:(i=t,n=e.getAttribute&&e.getAttribute("is")||""):(n=e.is,i=e.extends),{is:n,typeExtension:i}}(e),n=L[t];if((!n||!S(n))&&n&&!z(n)){(function(e){return!z(e)&&e[F]===e[R]})(n)||(this.prepareTemplate(n,t),function(e){e[F]=e[R],e._validating||(e._validating=!0,B.then((function(){e[D]=e[R],e._validating=!1})))}(n));let i=e.shadowRoot;if(i){let e=i.querySelector("style");e&&(e.__cssRules=n._styleAst,e.textContent=b(n._styleAst))}}}styleDocument(e){this.ensure(),this.styleSubtree(document.body,e)}}if(!window.ShadyCSS||!window.ShadyCSS.ScopingShim){const e=new j;let t=window.ShadyCSS&&window.ShadyCSS.CustomStyleInterface;window.ShadyCSS={prepareTemplate(t,n,i){e.flushCustomStyles(),e.prepareTemplate(t,n)},prepareTemplateStyles(e,t,n){window.ShadyCSS.prepareTemplate(e,t,n)},prepareTemplateDom(e,t){},styleSubtree(t,n){e.flushCustomStyles(),e.styleSubtree(t,n)},styleElement(t){e.flushCustomStyles(),e.styleElement(t)},styleDocument(t){e.flushCustomStyles(),e.styleDocument(t)},getComputedStyleValue:(e,t)=>(0,x.B7)(e,t),flushCustomStyles(){e.flushCustomStyles()},nativeCss:i.rd,nativeShadow:i.WA,cssBuild:i.Cp,disableRuntime:i.jF},t&&(window.ShadyCSS.CustomStyleInterface=t)}window.ShadyCSS.ApplyShim=$;var V=n(581),U=n(6163),q=n(3104),Y=n(1014);const K=/:host\(:dir\((ltr|rtl)\)\)/g,J=/([\s\w-#\.\[\]\*]*):dir\((ltr|rtl)\)/g,W=/:dir\((?:ltr|rtl)\)/,X=Boolean(window.ShadyDOM&&window.ShadyDOM.inUse),G=[];let Z=null,Q="";function ee(){Q=document.documentElement.getAttribute("dir")}function te(e){e.__autoDirOptOut||e.setAttribute("dir",Q)}function ne(){ee(),Q=document.documentElement.getAttribute("dir");for(let e=0;e<G.length;e++)te(G[e])}const ie=(0,Y.o)((e=>{X||Z||(ee(),Z=new MutationObserver(ne),Z.observe(document.documentElement,{attributes:!0,attributeFilter:["dir"]}));const t=(0,q.Q)(e);class n extends t{static _processStyleText(e,n){return e=t._processStyleText.call(this,e,n),!X&&W.test(e)&&(e=this._replaceDirInCssText(e),this.__activateDir=!0),e}static _replaceDirInCssText(e){let t=e;return t=t.replace(K,':host([dir="$1"])'),t=t.replace(J,':host([dir="$2"]) $1'),t}constructor(){super(),this.__autoDirOptOut=!1}ready(){super.ready(),this.__autoDirOptOut=this.hasAttribute("dir")}connectedCallback(){t.prototype.connectedCallback&&super.connectedCallback(),this.constructor.__activateDir&&(Z&&Z.takeRecords().length&&ne(),G.push(this),te(this))}disconnectedCallback(){if(t.prototype.disconnectedCallback&&super.disconnectedCallback(),this.constructor.__activateDir){const e=G.indexOf(this);e>-1&&G.splice(e,1)}}}return n.__activateDir=!1,n}));function re(){document.body.removeAttribute("unresolved")}n(2223),"interactive"===document.readyState||"complete"===document.readyState?re():window.addEventListener("DOMContentLoaded",re);var se=n(8876),oe=n(4010),ae=n(5313),le=n(2224),pe=n(1446),de=n(1342);n(7894);const ce=window.ShadyDOM,ue=window.ShadyCSS;function he(e,t){return(0,de.r)(e).getRootNode()===t}var fe=n(9387);const _e="disable-upgrade",me=e=>{for(;e;){const t=Object.getOwnPropertyDescriptor(e,"observedAttributes");if(t)return t.get;e=Object.getPrototypeOf(e.prototype).constructor}return()=>[]};(0,Y.o)((e=>{const t=(0,V.SH)(e);let n=me(t);return class extends t{constructor(){super(),this.__isUpgradeDisabled}static get observedAttributes(){return n.call(this).concat(_e)}_initializeProperties(){this.hasAttribute(_e)?this.__isUpgradeDisabled=!0:super._initializeProperties()}_enableProperties(){this.__isUpgradeDisabled||super._enableProperties()}_canApplyPropertyDefault(e){return super._canApplyPropertyDefault(e)&&!(this.__isUpgradeDisabled&&this._isPropertyPending(e))}attributeChangedCallback(e,t,n,i){e==_e?this.__isUpgradeDisabled&&null==n&&(super._initializeProperties(),this.__isUpgradeDisabled=!1,(0,de.r)(this).isConnected&&super.connectedCallback()):super.attributeChangedCallback(e,t,n,i)}connectedCallback(){this.__isUpgradeDisabled||super.connectedCallback()}disconnectedCallback(){this.__isUpgradeDisabled||super.disconnectedCallback()}}}));var ye=n(3501);const ge="disable-upgrade";let be=window.ShadyCSS;const ve=(0,Y.o)((e=>{const t=(0,U._)((0,V.SH)(e)),n=V.PP?t:ie(t),i=me(n),r={x:"pan-x",y:"pan-y",none:"none",all:"auto"};class s extends n{constructor(){super(),this.isAttached,this.__boundListeners,this._debouncers,this.__isUpgradeDisabled,this.__needsAttributesAtConnected,this._legacyForceObservedAttributes}static get importMeta(){return this.prototype.importMeta}created(){}__attributeReaction(e,t,n){(this.__dataAttributes&&this.__dataAttributes[e]||e===ge)&&this.attributeChangedCallback(e,t,n,null)}setAttribute(e,t){if(fe.j8&&!this._legacyForceObservedAttributes){const n=this.getAttribute(e);super.setAttribute(e,t),this.__attributeReaction(e,n,String(t))}else super.setAttribute(e,t)}removeAttribute(e){if(fe.j8&&!this._legacyForceObservedAttributes){const t=this.getAttribute(e);super.removeAttribute(e),this.__attributeReaction(e,t,null)}else super.removeAttribute(e)}static get observedAttributes(){return fe.j8&&!this.prototype._legacyForceObservedAttributes?(this.hasOwnProperty(JSCompiler_renameProperty("__observedAttributes",this))||(this.__observedAttributes=[],(0,ye.z2)(this.prototype)),this.__observedAttributes):i.call(this).concat(ge)}_enableProperties(){this.__isUpgradeDisabled||super._enableProperties()}_canApplyPropertyDefault(e){return super._canApplyPropertyDefault(e)&&!(this.__isUpgradeDisabled&&this._isPropertyPending(e))}connectedCallback(){this.__needsAttributesAtConnected&&this._takeAttributes(),this.__isUpgradeDisabled||(super.connectedCallback(),this.isAttached=!0,this.attached())}attached(){}disconnectedCallback(){this.__isUpgradeDisabled||(super.disconnectedCallback(),this.isAttached=!1,this.detached())}detached(){}attributeChangedCallback(e,t,n,i){t!==n&&(e==ge?this.__isUpgradeDisabled&&null==n&&(this._initializeProperties(),this.__isUpgradeDisabled=!1,(0,de.r)(this).isConnected&&this.connectedCallback()):(super.attributeChangedCallback(e,t,n,i),this.attributeChanged(e,t,n)))}attributeChanged(e,t,n){}_initializeProperties(){if(fe.nL&&this.hasAttribute(ge))this.__isUpgradeDisabled=!0;else{let e=Object.getPrototypeOf(this);e.hasOwnProperty(JSCompiler_renameProperty("__hasRegisterFinished",e))||(this._registered(),e.__hasRegisterFinished=!0),super._initializeProperties(),this.root=this,this.created(),fe.j8&&!this._legacyForceObservedAttributes&&(this.hasAttributes()?this._takeAttributes():this.parentNode||(this.__needsAttributesAtConnected=!0)),this._applyListeners()}}_takeAttributes(){const e=this.attributes;for(let t=0,n=e.length;t<n;t++){const n=e[t];this.__attributeReaction(n.name,null,n.value)}}_registered(){}ready(){this._ensureAttributes(),super.ready()}_ensureAttributes(){}_applyListeners(){}serialize(e){return this._serializeValue(e)}deserialize(e,t){return this._deserializeValue(e,t)}reflectPropertyToAttribute(e,t,n){this._propertyToAttribute(e,t,n)}serializeValueToAttribute(e,t,n){this._valueToNodeAttribute(n||this,e,t)}extend(e,t){if(!e||!t)return e||t;let n=Object.getOwnPropertyNames(t);for(let i,r=0;r<n.length&&(i=n[r]);r++){let n=Object.getOwnPropertyDescriptor(t,i);n&&Object.defineProperty(e,i,n)}return e}mixin(e,t){for(let n in t)e[n]=t[n];return e}chainObject(e,t){return e&&t&&e!==t&&(e.__proto__=t),e}instanceTemplate(e){let t=this.constructor._contentForTemplate(e);return document.importNode(t,!0)}fire(e,t,n){n=n||{},t=null==t?{}:t;let i=new Event(e,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});i.detail=t;let r=n.node||this;return(0,de.r)(r).dispatchEvent(i),i}listen(e,t,n){e=e||this;let i=this.__boundListeners||(this.__boundListeners=new WeakMap),r=i.get(e);r||(r={},i.set(e,r));let s=t+n;r[s]||(r[s]=this._addMethodEventListenerToNode(e,t,n,this))}unlisten(e,t,n){e=e||this;let i=this.__boundListeners&&this.__boundListeners.get(e),r=t+n,s=i&&i[r];s&&(this._removeEventListenerFromNode(e,t,s),i[r]=null)}setScrollDirection(e,t){(0,oe.BP)(t||this,r[e]||"auto")}$$(e){return this.root.querySelector(e)}get domHost(){let e=(0,de.r)(this).getRootNode();return e instanceof DocumentFragment?e.host:e}distributeContent(){const e=(0,se.vz)(this);window.ShadyDOM&&e.shadowRoot&&ShadyDOM.flush()}getEffectiveChildNodes(){return(0,se.vz)(this).getEffectiveChildNodes()}queryDistributedElements(e){return(0,se.vz)(this).queryDistributedElements(e)}getEffectiveChildren(){return this.getEffectiveChildNodes().filter((function(e){return e.nodeType===Node.ELEMENT_NODE}))}getEffectiveTextContent(){let e=this.getEffectiveChildNodes(),t=[];for(let n,i=0;n=e[i];i++)n.nodeType!==Node.COMMENT_NODE&&t.push(n.textContent);return t.join("")}queryEffectiveChildren(e){let t=this.queryDistributedElements(e);return t&&t[0]}queryAllEffectiveChildren(e){return this.queryDistributedElements(e)}getContentChildNodes(e){let t=this.root.querySelector(e||"slot");return t?(0,se.vz)(t).getDistributedNodes():[]}getContentChildren(e){return this.getContentChildNodes(e).filter((function(e){return e.nodeType===Node.ELEMENT_NODE}))}isLightDescendant(e){const t=this;return t!==e&&(0,de.r)(t).contains(e)&&(0,de.r)(t).getRootNode()===(0,de.r)(e).getRootNode()}isLocalDescendant(e){return this.root===(0,de.r)(e).getRootNode()}scopeSubtree(e,t=!1){return function(e,t=!1){if(!ce||!ue)return null;if(!ce.handlesDynamicScoping)return null;const n=ue.ScopingShim;if(!n)return null;const i=n.scopeForNode(e),r=(0,de.r)(e).getRootNode(),s=e=>{if(!he(e,r))return;const t=Array.from(ce.nativeMethods.querySelectorAll.call(e,"*"));t.push(e);for(let e=0;e<t.length;e++){const s=t[e];if(!he(s,r))continue;const o=n.currentScopeForNode(s);o!==i&&(""!==o&&n.unscopeNode(s,o),n.scopeNode(s,i))}};if(s(e),t){const t=new MutationObserver((e=>{for(let t=0;t<e.length;t++){const n=e[t];for(let e=0;e<n.addedNodes.length;e++){const t=n.addedNodes[e];t.nodeType===Node.ELEMENT_NODE&&s(t)}}}));return t.observe(e,{childList:!0,subtree:!0}),t}return null}(e,t)}getComputedStyleValue(e){return be.getComputedStyleValue(this,e)}debounce(e,t,n){return this._debouncers=this._debouncers||{},this._debouncers[e]=ae.dx.debounce(this._debouncers[e],n>0?le.Wc.after(n):le.YA,t.bind(this))}isDebouncerActive(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];return!(!t||!t.isActive())}flushDebouncer(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];t&&t.flush()}cancelDebouncer(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];t&&t.cancel()}async(e,t){return t>0?le.Wc.run(e.bind(this),t):~le.YA.run(e.bind(this))}cancelAsync(e){e<0?le.YA.cancel(~e):le.Wc.cancel(e)}create(e,t){let n=document.createElement(e);if(t)if(n.setProperties)n.setProperties(t);else for(let e in t)n[e]=t[e];return n}elementMatches(e,t){return(0,se.Ku)(t||this,e)}toggleAttribute(e,t){let n=this;return 3===arguments.length&&(n=arguments[2]),1==arguments.length&&(t=!n.hasAttribute(e)),t?((0,de.r)(n).setAttribute(e,""),!0):((0,de.r)(n).removeAttribute(e),!1)}toggleClass(e,t,n){n=n||this,1==arguments.length&&(t=!n.classList.contains(e)),t?n.classList.add(e):n.classList.remove(e)}transform(e,t){(t=t||this).style.webkitTransform=e,t.style.transform=e}translate3d(e,t,n,i){i=i||this,this.transform("translate3d("+e+","+t+","+n+")",i)}arrayDelete(e,t){let n;if(Array.isArray(e)){if(n=e.indexOf(t),n>=0)return e.splice(n,1)}else if(n=(0,pe.U2)(this,e).indexOf(t),n>=0)return this.splice(e,n,1);return null}_logger(e,t){switch(Array.isArray(t)&&1===t.length&&Array.isArray(t[0])&&(t=t[0]),e){case"log":case"warn":case"error":console[e](...t)}}_log(...e){this._logger("log",e)}_warn(...e){this._logger("warn",e)}_error(...e){this._logger("error",e)}_logf(e,...t){return["[%s::%s]",this.is,e,...t]}}return s.prototype.is="",s}))},3505:(e,t,n)=>{n.d(t,{k:()=>h});var i=n(2205),r=n(9387);const s={attached:!0,detached:!0,ready:!0,created:!0,beforeRegister:!0,registered:!0,attributeChanged:!0,listeners:!0,hostAttributes:!0},o={attached:!0,detached:!0,ready:!0,created:!0,beforeRegister:!0,registered:!0,attributeChanged:!0,behaviors:!0,_noAccessors:!0},a=Object.assign({listeners:!0,hostAttributes:!0,properties:!0,observers:!0},o);function l(e,t,n,i){!function(e,t,n){const i=e._noAccessors,r=Object.getOwnPropertyNames(e);for(let s=0;s<r.length;s++){let o=r[s];if(!(o in n))if(i)t[o]=e[o];else{let n=Object.getOwnPropertyDescriptor(e,o);n&&(n.configurable=!0,Object.defineProperty(t,o,n))}}}(t,e,i);for(let e in s)t[e]&&(n[e]=n[e]||[],n[e].push(t[e]))}function p(e,t,n){t=t||[];for(let i=e.length-1;i>=0;i--){let r=e[i];r?Array.isArray(r)?p(r,t):t.indexOf(r)<0&&(!n||n.indexOf(r)<0)&&t.unshift(r):console.warn("behavior is null, check for missing or 404 import")}return t}function d(e,t){for(const n in t){const i=e[n],r=t[n];e[n]=!("value"in r)&&i&&"value"in i?Object.assign({value:i.value},r):r}}const c=(0,i.x)(HTMLElement);function u(e,t,n){let i;const s={};class c extends t{static _finalizeClass(){if(this.hasOwnProperty(JSCompiler_renameProperty("generatedFrom",this))){if(i)for(let e,t=0;t<i.length;t++)e=i[t],e.properties&&this.createProperties(e.properties),e.observers&&this.createObservers(e.observers,e.properties);e.properties&&this.createProperties(e.properties),e.observers&&this.createObservers(e.observers,e.properties),this._prepareTemplate()}else t._finalizeClass.call(this)}static get properties(){const t={};if(i)for(let e=0;e<i.length;e++)d(t,i[e].properties);return d(t,e.properties),t}static get observers(){let t=[];if(i)for(let e,n=0;n<i.length;n++)e=i[n],e.observers&&(t=t.concat(e.observers));return e.observers&&(t=t.concat(e.observers)),t}created(){super.created();const e=s.created;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}_registered(){const e=c.prototype;if(!e.hasOwnProperty(JSCompiler_renameProperty("__hasRegisterFinished",e))){e.__hasRegisterFinished=!0,super._registered(),r.nL&&u(e);const t=Object.getPrototypeOf(this);let n=s.beforeRegister;if(n)for(let e=0;e<n.length;e++)n[e].call(t);if(n=s.registered,n)for(let e=0;e<n.length;e++)n[e].call(t)}}_applyListeners(){super._applyListeners();const e=s.listeners;if(e)for(let t=0;t<e.length;t++){const n=e[t];if(n)for(let e in n)this._addMethodEventListenerToNode(this,e,n[e])}}_ensureAttributes(){const e=s.hostAttributes;if(e)for(let t=e.length-1;t>=0;t--){const n=e[t];for(let e in n)this._ensureAttribute(e,n[e])}super._ensureAttributes()}ready(){super.ready();let e=s.ready;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}attached(){super.attached();let e=s.attached;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}detached(){super.detached();let e=s.detached;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}attributeChanged(e,t,n){super.attributeChanged();let i=s.attributeChanged;if(i)for(let r=0;r<i.length;r++)i[r].call(this,e,t,n)}}if(n){Array.isArray(n)||(n=[n]);let e=t.prototype.behaviors;i=p(n,null,e),c.prototype.behaviors=e?e.concat(n):i}const u=t=>{i&&function(e,t,n){for(let i=0;i<t.length;i++)l(e,t[i],n,a)}(t,i,s),l(t,e,s,o)};return r.nL||u(c.prototype),c.generatedFrom=e,c}n(7894);const h=function(e){let t;return t="function"==typeof e?e:h.Class(e),e._legacyForceObservedAttributes&&(t.prototype._legacyForceObservedAttributes=e._legacyForceObservedAttributes),customElements.define(t.is,t),t};h.Class=function(e,t){e||console.warn("Polymer.Class requires `info` argument");let n=t?t(c):c;return n=u(e,n,e.behaviors),n.is=n.prototype.is=e.is,n}},8876:(e,t,n)=>{n.d(t,{vz:()=>_,Ku:()=>d}),n(7894);var i=n(1342),r=(n(9387),n(8341)),s=n(2224);function o(e){return"slot"===e.localName}let a=class{static getFlattenedNodes(e){const t=(0,i.r)(e);return o(e)?t.assignedNodes({flatten:!0}):Array.from(t.childNodes).map((e=>o(e)?(0,i.r)(e).assignedNodes({flatten:!0}):[e])).reduce(((e,t)=>e.concat(t)),[])}constructor(e,t){this._shadyChildrenObserver=null,this._nativeChildrenObserver=null,this._connected=!1,this._target=e,this.callback=t,this._effectiveNodes=[],this._observer=null,this._scheduled=!1,this._boundSchedule=()=>{this._schedule()},this.connect(),this._schedule()}connect(){o(this._target)?this._listenSlots([this._target]):(0,i.r)(this._target).children&&(this._listenSlots((0,i.r)(this._target).children),window.ShadyDOM?this._shadyChildrenObserver=window.ShadyDOM.observeChildren(this._target,(e=>{this._processMutations(e)})):(this._nativeChildrenObserver=new MutationObserver((e=>{this._processMutations(e)})),this._nativeChildrenObserver.observe(this._target,{childList:!0}))),this._connected=!0}disconnect(){o(this._target)?this._unlistenSlots([this._target]):(0,i.r)(this._target).children&&(this._unlistenSlots((0,i.r)(this._target).children),window.ShadyDOM&&this._shadyChildrenObserver?(window.ShadyDOM.unobserveChildren(this._shadyChildrenObserver),this._shadyChildrenObserver=null):this._nativeChildrenObserver&&(this._nativeChildrenObserver.disconnect(),this._nativeChildrenObserver=null)),this._connected=!1}_schedule(){this._scheduled||(this._scheduled=!0,s.YA.run((()=>this.flush())))}_processMutations(e){this._processSlotMutations(e),this.flush()}_processSlotMutations(e){if(e)for(let t=0;t<e.length;t++){let n=e[t];n.addedNodes&&this._listenSlots(n.addedNodes),n.removedNodes&&this._unlistenSlots(n.removedNodes)}}flush(){if(!this._connected)return!1;window.ShadyDOM&&ShadyDOM.flush(),this._nativeChildrenObserver?this._processSlotMutations(this._nativeChildrenObserver.takeRecords()):this._shadyChildrenObserver&&this._processSlotMutations(this._shadyChildrenObserver.takeRecords()),this._scheduled=!1;let e={target:this._target,addedNodes:[],removedNodes:[]},t=this.constructor.getFlattenedNodes(this._target),n=(0,r.c)(t,this._effectiveNodes);for(let t,i=0;i<n.length&&(t=n[i]);i++)for(let n,i=0;i<t.removed.length&&(n=t.removed[i]);i++)e.removedNodes.push(n);for(let i,r=0;r<n.length&&(i=n[r]);r++)for(let n=i.index;n<i.index+i.addedCount;n++)e.addedNodes.push(t[n]);this._effectiveNodes=t;let i=!1;return(e.addedNodes.length||e.removedNodes.length)&&(i=!0,this.callback.call(this._target,e)),i}_listenSlots(e){for(let t=0;t<e.length;t++){let n=e[t];o(n)&&n.addEventListener("slotchange",this._boundSchedule)}}_unlistenSlots(e){for(let t=0;t<e.length;t++){let n=e[t];o(n)&&n.removeEventListener("slotchange",this._boundSchedule)}}};n(5218),n(5313);const l=Element.prototype,p=l.matches||l.matchesSelector||l.mozMatchesSelector||l.msMatchesSelector||l.oMatchesSelector||l.webkitMatchesSelector,d=function(e,t){return p.call(e,t)};class c{constructor(e){window.ShadyDOM&&window.ShadyDOM.inUse&&window.ShadyDOM.patch(e),this.node=e}observeNodes(e){return new a(this.node,e)}unobserveNodes(e){e.disconnect()}notifyObserver(){}deepContains(e){if((0,i.r)(this.node).contains(e))return!0;let t=e,n=e.ownerDocument;for(;t&&t!==n&&t!==this.node;)t=(0,i.r)(t).parentNode||(0,i.r)(t).host;return t===this.node}getOwnerRoot(){return(0,i.r)(this.node).getRootNode()}getDistributedNodes(){return"slot"===this.node.localName?(0,i.r)(this.node).assignedNodes({flatten:!0}):[]}getDestinationInsertionPoints(){let e=[],t=(0,i.r)(this.node).assignedSlot;for(;t;)e.push(t),t=(0,i.r)(t).assignedSlot;return e}importNode(e,t){let n=this.node instanceof Document?this.node:this.node.ownerDocument;return(0,i.r)(n).importNode(e,t)}getEffectiveChildNodes(){return a.getFlattenedNodes(this.node)}queryDistributedElements(e){let t=this.getEffectiveChildNodes(),n=[];for(let i,r=0,s=t.length;r<s&&(i=t[r]);r++)i.nodeType===Node.ELEMENT_NODE&&d(i,e)&&n.push(i);return n}get activeElement(){let e=this.node;return void 0!==e._activeElement?e._activeElement:e.activeElement}}function u(e,t){for(let n=0;n<t.length;n++){let i=t[n];Object.defineProperty(e,i,{get:function(){return this.node[i]},configurable:!0})}}class h{constructor(e){this.event=e}get rootTarget(){return this.path[0]}get localTarget(){return this.event.target}get path(){return this.event.composedPath()}}c.prototype.cloneNode,c.prototype.appendChild,c.prototype.insertBefore,c.prototype.removeChild,c.prototype.replaceChild,c.prototype.setAttribute,c.prototype.removeAttribute,c.prototype.querySelector,c.prototype.querySelectorAll,c.prototype.parentNode,c.prototype.firstChild,c.prototype.lastChild,c.prototype.nextSibling,c.prototype.previousSibling,c.prototype.firstElementChild,c.prototype.lastElementChild,c.prototype.nextElementSibling,c.prototype.previousElementSibling,c.prototype.childNodes,c.prototype.children,c.prototype.classList,c.prototype.textContent,c.prototype.innerHTML;let f=c;if(window.ShadyDOM&&window.ShadyDOM.inUse&&window.ShadyDOM.noPatch&&window.ShadyDOM.Wrapper){class e extends window.ShadyDOM.Wrapper{}Object.getOwnPropertyNames(c.prototype).forEach((t=>{"activeElement"!=t&&(e.prototype[t]=c.prototype[t])})),u(e.prototype,["classList"]),f=e,Object.defineProperties(h.prototype,{localTarget:{get(){const e=this.event.currentTarget,t=e&&_(e).getOwnerRoot(),n=this.path;for(let e=0;e<n.length;e++){const i=n[e];if(_(i).getOwnerRoot()===t)return i}},configurable:!0},path:{get(){return window.ShadyDOM.composedPath(this.event)},configurable:!0}})}else!function(e,t){for(let n=0;n<t.length;n++){let i=t[n];e[i]=function(){return this.node[i].apply(this.node,arguments)}}}(c.prototype,["cloneNode","appendChild","insertBefore","removeChild","replaceChild","setAttribute","removeAttribute","querySelector","querySelectorAll","attachShadow"]),u(c.prototype,["parentNode","firstChild","lastChild","nextSibling","previousSibling","firstElementChild","lastElementChild","nextElementSibling","previousElementSibling","childNodes","children","classList","shadowRoot"]),function(e,t){for(let n=0;n<t.length;n++){let i=t[n];Object.defineProperty(e,i,{get:function(){return this.node[i]},set:function(e){this.node[i]=e},configurable:!0})}}(c.prototype,["textContent","innerHTML","className"]);const _=function(e){if((e=e||document)instanceof f)return e;if(e instanceof h)return e;let t=e.__domApi;return t||(t=e instanceof Event?new h(e):new f(e),e.__domApi=t),t}},581:(e,t,n)=>{n.d(t,{SH:()=>f,PP:()=>h}),n(7894);var i=n(9387),r=n(1014),s=n(9836),o=n(9967),a=n(4262),l=n(7999),p=n(3501),d=n(7221);const c=(0,r.o)((e=>{const t=(0,d.e)(e);function n(e){const t=Object.getPrototypeOf(e);return t.prototype instanceof r?t:null}function i(e){if(!e.hasOwnProperty(JSCompiler_renameProperty("__ownProperties",e))){let t=null;if(e.hasOwnProperty(JSCompiler_renameProperty("properties",e))){const n=e.properties;n&&(t=function(e){const t={};for(let n in e){const i=e[n];t[n]="function"==typeof i?{type:i}:i}return t}(n))}e.__ownProperties=t}return e.__ownProperties}class r extends t{static get observedAttributes(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__observedAttributes",this))){(0,p.z2)(this.prototype);const e=this._properties;this.__observedAttributes=e?Object.keys(e).map((e=>this.prototype._addPropertyToAttributeMap(e))):[]}return this.__observedAttributes}static finalize(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__finalized",this))){const e=n(this);e&&e.finalize(),this.__finalized=!0,this._finalizeClass()}}static _finalizeClass(){const e=i(this);e&&this.createProperties(e)}static get _properties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__properties",this))){const e=n(this);this.__properties=Object.assign({},e&&e._properties,i(this))}return this.__properties}static typeForProperty(e){const t=this._properties[e];return t&&t.type}_initializeProperties(){(0,p.Gd)(),this.constructor.finalize(),super._initializeProperties()}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._enableProperties()}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback()}}return r}));var u=n(1342);const h=window.ShadyCSS&&window.ShadyCSS.cssBuild,f=(0,r.o)((e=>{const t=c((0,l.q)(e));return class extends t{static get polymerElementVersion(){return"3.5.1"}static _finalizeClass(){t._finalizeClass.call(this);const e=((n=this).hasOwnProperty(JSCompiler_renameProperty("__ownObservers",n))||(n.__ownObservers=n.hasOwnProperty(JSCompiler_renameProperty("observers",n))?n.observers:null),n.__ownObservers);var n;e&&this.createObservers(e,this._properties),this._prepareTemplate()}static _prepareTemplate(){let e=this.template;e&&("string"==typeof e?(console.error("template getter must return HTMLTemplateElement"),e=null):i.nL||(e=e.cloneNode(!0))),this.prototype._template=e}static createProperties(e){for(let s in e)t=this.prototype,n=s,r=e,(i=e[s]).computed&&(i.readOnly=!0),i.computed&&(t._hasReadOnlyEffect(n)?console.warn(`Cannot redefine computed property '${n}'.`):t._createComputedProperty(n,i.computed,r)),i.readOnly&&!t._hasReadOnlyEffect(n)?t._createReadOnlyProperty(n,!i.computed):!1===i.readOnly&&t._hasReadOnlyEffect(n)&&console.warn(`Cannot make readOnly property '${n}' non-readOnly.`),i.reflectToAttribute&&!t._hasReflectEffect(n)?t._createReflectedProperty(n):!1===i.reflectToAttribute&&t._hasReflectEffect(n)&&console.warn(`Cannot make reflected property '${n}' non-reflected.`),i.notify&&!t._hasNotifyEffect(n)?t._createNotifyingProperty(n):!1===i.notify&&t._hasNotifyEffect(n)&&console.warn(`Cannot make notify property '${n}' non-notify.`),i.observer&&t._createPropertyObserver(n,i.observer,r[i.observer]),t._addPropertyToAttributeMap(n);var t,n,i,r}static createObservers(e,t){const n=this.prototype;for(let i=0;i<e.length;i++)n._createMethodObserver(e[i],t)}static get template(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_template",this))){let e=this.prototype.hasOwnProperty(JSCompiler_renameProperty("_template",this.prototype))?this.prototype._template:void 0;"function"==typeof e&&(e=e()),this._template=void 0!==e?e:this.hasOwnProperty(JSCompiler_renameProperty("is",this))&&function(e){let t=null;if(e&&(!i.XN||i.ZN)&&(t=a.t.import(e,"template"),i.XN&&!t))throw new Error(`strictTemplatePolicy: expecting dom-module or null template for ${e}`);return t}(this.is)||Object.getPrototypeOf(this.prototype).constructor.template}return this._template}static set template(e){this._template=e}static get importPath(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_importPath",this))){const e=this.importMeta;if(e)this._importPath=(0,o.iY)(e.url);else{const e=a.t.import(this.is);this._importPath=e&&e.assetpath||Object.getPrototypeOf(this.prototype).constructor.importPath}}return this._importPath}constructor(){super(),this._template,this._importPath,this.rootPath,this.importPath,this.root,this.$}_initializeProperties(){this.constructor.finalize(),this.constructor._finalizeTemplate(this.localName),super._initializeProperties(),this.rootPath=i.sM,this.importPath=this.constructor.importPath;let e=function(e){if(!e.hasOwnProperty(JSCompiler_renameProperty("__propertyDefaults",e))){e.__propertyDefaults=null;let t=e._properties;for(let n in t){let i=t[n];"value"in i&&(e.__propertyDefaults=e.__propertyDefaults||{},e.__propertyDefaults[n]=i)}}return e.__propertyDefaults}(this.constructor);if(e)for(let t in e){let n=e[t];if(this._canApplyPropertyDefault(t)){let e="function"==typeof n.value?n.value.call(this):n.value;this._hasAccessor(t)?this._setPendingProperty(t,e,!0):this[t]=e}}}_canApplyPropertyDefault(e){return!this.hasOwnProperty(e)}static _processStyleText(e,t){return(0,o.Rq)(e,t)}static _finalizeTemplate(e){const t=this.prototype._template;if(t&&!t.__polymerFinalized){t.__polymerFinalized=!0;const n=this.importPath;!function(e,t,n,r){if(!h){const i=t.content.querySelectorAll("style"),o=(0,s.uT)(t),a=(0,s.lx)(n),l=t.content.firstElementChild;for(let n=0;n<a.length;n++){let i=a[n];i.textContent=e._processStyleText(i.textContent,r),t.content.insertBefore(i,l)}let p=0;for(let t=0;t<o.length;t++){let n=o[t],s=i[p];s!==n?(n=n.cloneNode(!0),s.parentNode.insertBefore(n,s)):p++,n.textContent=e._processStyleText(n.textContent,r)}}if(window.ShadyCSS&&window.ShadyCSS.prepareTemplate(t,n),i.md&&h&&i.FV){const n=t.content.querySelectorAll("style");if(n){let t="";Array.from(n).forEach((e=>{t+=e.textContent,e.parentNode.removeChild(e)})),e._styleSheet=new CSSStyleSheet,e._styleSheet.replaceSync(t)}}}(this,t,e,n?(0,o.Kk)(n):""),this.prototype._bindTemplate(t)}}connectedCallback(){window.ShadyCSS&&this._template&&window.ShadyCSS.styleElement(this),super.connectedCallback()}ready(){this._template&&(this.root=this._stampTemplate(this._template),this.$=this.root.$),super.ready()}_readyClients(){this._template&&(this.root=this._attachDom(this.root)),super._readyClients()}_attachDom(e){const t=(0,u.r)(this);if(t.attachShadow)return e?(t.shadowRoot||(t.attachShadow({mode:"open",shadyUpgradeFragment:e}),t.shadowRoot.appendChild(e),this.constructor._styleSheet&&(t.shadowRoot.adoptedStyleSheets=[this.constructor._styleSheet])),i.Hr&&window.ShadyDOM&&window.ShadyDOM.flushInitial(t.shadowRoot),t.shadowRoot):null;throw new Error("ShadowDOM not available. PolymerElement can create dom as children instead of in ShadowDOM by setting `this.root = this;` before `ready`.")}updateStyles(e){window.ShadyCSS&&window.ShadyCSS.styleSubtree(this,e)}resolveUrl(e,t){return!t&&this.importPath&&(t=(0,o.Kk)(this.importPath)),(0,o.Kk)(e,t)}static _parseTemplateContent(e,n,i){return n.dynamicFns=n.dynamicFns||this._properties,t._parseTemplateContent.call(this,e,n,i)}static _addTemplatePropertyEffect(e,n,r){return!i.a2||n in this._properties||r.info.part.signature&&r.info.part.signature.static||r.info.part.hostProp||e.nestedTemplate||console.warn(`Property '${n}' used in template but not declared in 'properties'; attribute will not be observed.`),t._addTemplatePropertyEffect.call(this,e,n,r)}}}))},6163:(e,t,n)=>{n.d(t,{_:()=>s}),n(7894);var i=n(1014),r=n(4010);const s=(0,i.o)((e=>class extends e{_addEventListenerToNode(e,t,n){(0,r.NH)(e,t,n)||super._addEventListenerToNode(e,t,n)}_removeEventListenerFromNode(e,t,n){(0,r.ys)(e,t,n)||super._removeEventListenerFromNode(e,t,n)}}))},7221:(e,t,n)=>{n.d(t,{e:()=>a}),n(7894);var i=n(1014),r=n(2224),s=n(1342);const o=r.YA,a=(0,i.o)((e=>class extends e{static createProperties(e){const t=this.prototype;for(let n in e)n in t||t._createPropertyAccessor(n)}static attributeNameForProperty(e){return e.toLowerCase()}static typeForProperty(e){}_createPropertyAccessor(e,t){this._addPropertyToAttributeMap(e),this.hasOwnProperty(JSCompiler_renameProperty("__dataHasAccessor",this))||(this.__dataHasAccessor=Object.assign({},this.__dataHasAccessor)),this.__dataHasAccessor[e]||(this.__dataHasAccessor[e]=!0,this._definePropertyAccessor(e,t))}_addPropertyToAttributeMap(e){this.hasOwnProperty(JSCompiler_renameProperty("__dataAttributes",this))||(this.__dataAttributes=Object.assign({},this.__dataAttributes));let t=this.__dataAttributes[e];return t||(t=this.constructor.attributeNameForProperty(e),this.__dataAttributes[t]=e),t}_definePropertyAccessor(e,t){Object.defineProperty(this,e,{get(){return this.__data[e]},set:t?function(){}:function(t){this._setPendingProperty(e,t,!0)&&this._invalidateProperties()}})}constructor(){super(),this.__dataEnabled=!1,this.__dataReady=!1,this.__dataInvalid=!1,this.__data={},this.__dataPending=null,this.__dataOld=null,this.__dataInstanceProps=null,this.__dataCounter=0,this.__serializing=!1,this._initializeProperties()}ready(){this.__dataReady=!0,this._flushProperties()}_initializeProperties(){for(let e in this.__dataHasAccessor)this.hasOwnProperty(e)&&(this.__dataInstanceProps=this.__dataInstanceProps||{},this.__dataInstanceProps[e]=this[e],delete this[e])}_initializeInstanceProperties(e){Object.assign(this,e)}_setProperty(e,t){this._setPendingProperty(e,t)&&this._invalidateProperties()}_getProperty(e){return this.__data[e]}_setPendingProperty(e,t,n){let i=this.__data[e],r=this._shouldPropertyChange(e,t,i);return r&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),this.__dataOld&&!(e in this.__dataOld)&&(this.__dataOld[e]=i),this.__data[e]=t,this.__dataPending[e]=t),r}_isPropertyPending(e){return!(!this.__dataPending||!this.__dataPending.hasOwnProperty(e))}_invalidateProperties(){!this.__dataInvalid&&this.__dataReady&&(this.__dataInvalid=!0,o.run((()=>{this.__dataInvalid&&(this.__dataInvalid=!1,this._flushProperties())})))}_enableProperties(){this.__dataEnabled||(this.__dataEnabled=!0,this.__dataInstanceProps&&(this._initializeInstanceProperties(this.__dataInstanceProps),this.__dataInstanceProps=null),this.ready())}_flushProperties(){this.__dataCounter++;const e=this.__data,t=this.__dataPending,n=this.__dataOld;this._shouldPropertiesChange(e,t,n)&&(this.__dataPending=null,this.__dataOld=null,this._propertiesChanged(e,t,n)),this.__dataCounter--}_shouldPropertiesChange(e,t,n){return Boolean(t)}_propertiesChanged(e,t,n){}_shouldPropertyChange(e,t,n){return n!==t&&(n==n||t==t)}attributeChangedCallback(e,t,n,i){t!==n&&this._attributeToProperty(e,n),super.attributeChangedCallback&&super.attributeChangedCallback(e,t,n,i)}_attributeToProperty(e,t,n){if(!this.__serializing){const i=this.__dataAttributes,r=i&&i[e]||e;this[r]=this._deserializeValue(t,n||this.constructor.typeForProperty(r))}}_propertyToAttribute(e,t,n){this.__serializing=!0,n=arguments.length<3?this[e]:n,this._valueToNodeAttribute(this,n,t||this.constructor.attributeNameForProperty(e)),this.__serializing=!1}_valueToNodeAttribute(e,t,n){const i=this._serializeValue(t);"class"!==n&&"name"!==n&&"slot"!==n||(e=(0,s.r)(e)),void 0===i?e.removeAttribute(n):e.setAttribute(n,""===i&&window.trustedTypes?window.trustedTypes.emptyScript:i)}_serializeValue(e){return"boolean"==typeof e?e?"":void 0:null!=e?e.toString():void 0}_deserializeValue(e,t){switch(t){case Boolean:return null!==e;case Number:return Number(e);default:return e}}}))},3104:(e,t,n)=>{n.d(t,{Q:()=>p}),n(7894);var i=n(1014),r=n(9027),s=n(7221);const o={};let a=HTMLElement.prototype;for(;a;){let e=Object.getOwnPropertyNames(a);for(let t=0;t<e.length;t++)o[e[t]]=!0;a=Object.getPrototypeOf(a)}const l=window.trustedTypes?e=>trustedTypes.isHTML(e)||trustedTypes.isScript(e)||trustedTypes.isScriptURL(e):()=>!1,p=(0,i.o)((e=>{const t=(0,s.e)(e);return class extends t{static createPropertiesForAttributes(){let e=this.observedAttributes;for(let t=0;t<e.length;t++)this.prototype._createPropertyAccessor((0,r.z)(e[t]))}static attributeNameForProperty(e){return(0,r.n)(e)}_initializeProperties(){this.__dataProto&&(this._initializeProtoProperties(this.__dataProto),this.__dataProto=null),super._initializeProperties()}_initializeProtoProperties(e){for(let t in e)this._setProperty(t,e[t])}_ensureAttribute(e,t){this.hasAttribute(e)||this._valueToNodeAttribute(this,t,e)}_serializeValue(e){if("object"==typeof e){if(e instanceof Date)return e.toString();if(e){if(l(e))return e;try{return JSON.stringify(e)}catch(e){return""}}}return super._serializeValue(e)}_deserializeValue(e,t){let n;switch(t){case Object:try{n=JSON.parse(e)}catch(t){n=e}break;case Array:try{n=JSON.parse(e)}catch(t){n=null,console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${e}`)}break;case Date:n=isNaN(e)?String(e):Number(e),n=new Date(n);break;default:n=super._deserializeValue(e,t)}return n}_definePropertyAccessor(e,t){!function(e,t){if(!o[t]){let n=e[t];void 0!==n&&(e.__data?e._setPendingProperty(t,n):(e.__dataProto?e.hasOwnProperty(JSCompiler_renameProperty("__dataProto",e))||(e.__dataProto=Object.create(e.__dataProto)):e.__dataProto={},e.__dataProto[t]=n))}}(this,e),super._definePropertyAccessor(e,t)}_hasAccessor(e){return this.__dataHasAccessor&&this.__dataHasAccessor[e]}_isPropertyPending(e){return Boolean(this.__dataPending&&e in this.__dataPending)}}}))},7999:(e,t,n)=>{n.d(t,{q:()=>Q}),n(7894);var i=n(1342),r=n(1014),s=n(1446),o=n(9027),a=n(3104);const l={"dom-if":!0,"dom-repeat":!0};let p=!1,d=!1;const c=(()=>{const e=window.trustedTypes&&window.trustedTypes.createPolicy("polymer-template-event-attribute-policy",{createScript:e=>e});return(t,n,i)=>{const r=n.getAttribute(i);e&&i.startsWith("on-")?t.setAttribute(i,e.createScript(r,i)):t.setAttribute(i,r)}})();function u(e){let t=e.getAttribute("is");if(t&&l[t]){let n=e;for(n.removeAttribute("is"),e=n.ownerDocument.createElement(t),n.parentNode.replaceChild(e,n),e.appendChild(n);n.attributes.length;){const{name:t}=n.attributes[0];c(e,n,t),n.removeAttribute(t)}}return e}function h(e,t){let n=t.parentInfo&&h(e,t.parentInfo);if(!n)return e;for(let e=n.firstChild,i=0;e;e=e.nextSibling)if(t.parentIndex===i++)return e}function f(e,t,n,i){i.id&&(t[i.id]=n)}function _(e,t,n){if(n.events&&n.events.length)for(let i,r=0,s=n.events;r<s.length&&(i=s[r]);r++)e._addMethodEventListenerToNode(t,i.name,i.value,e)}function m(e,t,n,i){n.templateInfo&&(t._templateInfo=n.templateInfo,t._parentTemplateInfo=i)}const y=(0,r.o)((e=>class extends e{static _parseTemplate(e,t){if(!e._templateInfo){let n=e._templateInfo={};n.nodeInfoList=[],n.nestedTemplate=Boolean(t),n.stripWhiteSpace=t&&t.stripWhiteSpace||e.hasAttribute&&e.hasAttribute("strip-whitespace"),this._parseTemplateContent(e,n,{parent:null})}return e._templateInfo}static _parseTemplateContent(e,t,n){return this._parseTemplateNode(e.content,t,n)}static _parseTemplateNode(e,t,n){let i=!1,r=e;return"template"!=r.localName||r.hasAttribute("preserve-content")?"slot"===r.localName&&(t.hasInsertionPoint=!0):i=this._parseTemplateNestedTemplate(r,t,n)||i,function(e){(function(){if(!p){p=!0;const e=document.createElement("textarea");e.placeholder="a",d=e.placeholder===e.textContent}return d})()&&"textarea"===e.localName&&e.placeholder&&e.placeholder===e.textContent&&(e.textContent=null)}(r),r.firstChild&&this._parseTemplateChildNodes(r,t,n),r.hasAttributes&&r.hasAttributes()&&(i=this._parseTemplateNodeAttributes(r,t,n)||i),i||n.noted}static _parseTemplateChildNodes(e,t,n){if("script"!==e.localName&&"style"!==e.localName)for(let i,r=e.firstChild,s=0;r;r=i){if("template"==r.localName&&(r=u(r)),i=r.nextSibling,r.nodeType===Node.TEXT_NODE){let n=i;for(;n&&n.nodeType===Node.TEXT_NODE;)r.textContent+=n.textContent,i=n.nextSibling,e.removeChild(n),n=i;if(t.stripWhiteSpace&&!r.textContent.trim()){e.removeChild(r);continue}}let o={parentIndex:s,parentInfo:n};this._parseTemplateNode(r,t,o)&&(o.infoIndex=t.nodeInfoList.push(o)-1),r.parentNode&&s++}}static _parseTemplateNestedTemplate(e,t,n){let i=e,r=this._parseTemplate(i,t);return(r.content=i.content.ownerDocument.createDocumentFragment()).appendChild(i.content),n.templateInfo=r,!0}static _parseTemplateNodeAttributes(e,t,n){let i=!1,r=Array.from(e.attributes);for(let s,o=r.length-1;s=r[o];o--)i=this._parseTemplateNodeAttribute(e,t,n,s.name,s.value)||i;return i}static _parseTemplateNodeAttribute(e,t,n,i,r){return"on-"===i.slice(0,3)?(e.removeAttribute(i),n.events=n.events||[],n.events.push({name:i.slice(3),value:r}),!0):"id"===i&&(n.id=r,!0)}static _contentForTemplate(e){let t=e._templateInfo;return t&&t.content||e.content}_stampTemplate(e,t){e&&!e.content&&window.HTMLTemplateElement&&HTMLTemplateElement.decorate&&HTMLTemplateElement.decorate(e);let n=(t=t||this.constructor._parseTemplate(e)).nodeInfoList,i=t.content||e.content,r=document.importNode(i,!0);r.__noInsertionPoint=!t.hasInsertionPoint;let s=r.nodeList=new Array(n.length);r.$={};for(let e,i=0,o=n.length;i<o&&(e=n[i]);i++){let n=s[i]=h(r,e);f(0,r.$,n,e),m(0,n,e,t),_(this,n,e)}return r}_addMethodEventListenerToNode(e,t,n,i){let r=function(e,t,n){return e=e._methodHost||e,function(t){e[n]?e[n](t,t.detail):console.warn("listener method `"+n+"` not defined")}}(i=i||e,0,n);return this._addEventListenerToNode(e,t,r),r}_addEventListenerToNode(e,t,n){e.addEventListener(t,n)}_removeEventListenerFromNode(e,t,n){e.removeEventListener(t,n)}}));var g=n(9387);let b=0;const v=[],w={COMPUTE:"__computeEffects",REFLECT:"__reflectEffects",NOTIFY:"__notifyEffects",PROPAGATE:"__propagateEffects",OBSERVE:"__observeEffects",READ_ONLY:"__readOnly"},C="__computeInfo",P=/[A-Z]/;function S(e,t,n){let i=e[t];if(i){if(!e.hasOwnProperty(t)&&(i=e[t]=Object.create(e[t]),n))for(let e in i){let t=i[e],n=i[e]=Array(t.length);for(let e=0;e<t.length;e++)n[e]=t[e]}}else i=e[t]={};return i}function x(e,t,n,i,r,o){if(t){let a=!1;const l=b++;for(let p in n){let d=t[r?(0,s.Jz)(p):p];if(d)for(let t,s=0,c=d.length;s<c&&(t=d[s]);s++)t.info&&t.info.lastRun===l||r&&!A(p,t.trigger)||(t.info&&(t.info.lastRun=l),t.fn(e,p,n,i,t.info,r,o),a=!0)}return a}return!1}function E(e,t,n,i,r,o,a,l){let p=!1,d=t[a?(0,s.Jz)(i):i];if(d)for(let t,s=0,c=d.length;s<c&&(t=d[s]);s++)t.info&&t.info.lastRun===n||a&&!A(i,t.trigger)||(t.info&&(t.info.lastRun=n),t.fn(e,i,r,o,t.info,a,l),p=!0);return p}function A(e,t){if(t){let n=t.name;return n==e||!(!t.structured||!(0,s.jg)(n,e))||!(!t.wildcard||!(0,s.SG)(n,e))}return!0}function O(e,t,n,i,r){let s="string"==typeof r.method?e[r.method]:r.method,o=r.property;s?s.call(e,e.__data[o],i[o]):r.dynamicFn||console.warn("observer method `"+r.method+"` not defined")}function T(e,t,n){let i=(0,s.Jz)(t);return i!==t&&(k(e,(0,o.n)(i)+"-changed",n[t],t),!0)}function k(e,t,n,r){let s={value:n,queueProperty:!0};r&&(s.path=r),(0,i.r)(e).dispatchEvent(new CustomEvent(t,{detail:s}))}function N(e,t,n,i,r,o){let a=(o?(0,s.Jz)(t):t)!=t?t:null,l=a?(0,s.U2)(e,a):e.__data[t];a&&void 0===l&&(l=n[t]),k(e,r.eventName,l,a)}function I(e,t,n,i,r){let s=e.__data[t];g.v1&&(s=(0,g.v1)(s,r.attrName,"attribute",e)),e._propertyToAttribute(t,r.attrName,s)}const M=(e,t,n)=>{let i=0,r=t.length-1,s=-1;for(;i<=r;){const o=i+r>>1,a=n.get(t[o].methodInfo)-n.get(e.methodInfo);if(a<0)i=o+1;else{if(!(a>0)){s=o;break}r=o-1}}s<0&&(s=r+1),t.splice(s,0,e)},L=(e,t,n,i,r)=>{const o=t[r?(0,s.Jz)(e):e];if(o)for(let t=0;t<o.length;t++){const s=o[t];s.info.lastRun===b||r&&!A(e,s.trigger)||(s.info.lastRun=b,M(s.info,n,i))}};function D(e,t,n,i,r){let s=j(e,t,n,0,r);if(s===v)return!1;let o=r.methodInfo;return e.__dataHasAccessor&&e.__dataHasAccessor[o]?e._setPendingProperty(o,s,!0):(e[o]=s,!1)}function R(e,t,n,i,r,s,a){n.bindings=n.bindings||[];let l={kind:i,target:r,parts:s,literal:a,isCompound:1!==s.length};if(n.bindings.push(l),function(e){return Boolean(e.target)&&"attribute"!=e.kind&&"text"!=e.kind&&!e.isCompound&&"{"===e.parts[0].mode}(l)){let{event:e,negate:t}=l.parts[0];l.listenerEvent=e||(0,o.n)(r)+"-changed",l.listenerNegate=t}let p=t.nodeInfoList.length;for(let n=0;n<l.parts.length;n++){let i=l.parts[n];i.compoundIndex=n,F(e,t,l,i,p)}}function F(e,t,n,i,r){if(!i.literal)if("attribute"===n.kind&&"-"===n.target[0])console.warn("Cannot set attribute "+n.target+' because "-" is not a valid attribute starting character');else{let s=i.dependencies,o={index:r,binding:n,part:i,evaluator:e};for(let n=0;n<s.length;n++){let i=s[n];"string"==typeof i&&(i=W(i),i.wildcard=!0),e._addTemplatePropertyEffect(t,i.rootProperty,{fn:B,info:o,trigger:i})}}}function B(e,t,n,i,r,o,a){let l=a[r.index],p=r.binding,d=r.part;if(o&&d.source&&t.length>d.source.length&&"property"==p.kind&&!p.isCompound&&l.__isPropertyEffectsClient&&l.__dataHasAccessor&&l.__dataHasAccessor[p.target]){let i=n[t];t=(0,s.Iu)(d.source,p.target,t),l._setPendingPropertyOrPath(t,i,!1,!0)&&e._enqueueClient(l)}else{let s=r.evaluator._evaluateBinding(e,d,t,n,i,o);s!==v&&function(e,t,n,i,r){if(r=function(e,t,n,i){if(n.isCompound){let r=e.__dataCompoundStorage[n.target];r[i.compoundIndex]=t,t=r.join("")}return"attribute"!==n.kind&&("textContent"!==n.target&&("value"!==n.target||"input"!==e.localName&&"textarea"!==e.localName)||(t=null==t?"":t)),t}(t,r,n,i),g.v1&&(r=(0,g.v1)(r,n.target,n.kind,t)),"attribute"==n.kind)e._valueToNodeAttribute(t,r,n.target);else{let i=n.target;t.__isPropertyEffectsClient&&t.__dataHasAccessor&&t.__dataHasAccessor[i]?t[w.READ_ONLY]&&t[w.READ_ONLY][i]||t._setPendingProperty(i,r)&&e._enqueueClient(t):e._setUnmanagedPropertyToNode(t,i,r)}}(e,l,p,d,s)}}function H(e,t){if(t.isCompound){let n=e.__dataCompoundStorage||(e.__dataCompoundStorage={}),r=t.parts,s=new Array(r.length);for(let e=0;e<r.length;e++)s[e]=r[e].literal;let o=t.target;n[o]=s,t.literal&&"property"==t.kind&&("className"===o&&(e=(0,i.r)(e)),e[o]=t.literal)}}function z(e,t,n){if(n.listenerEvent){let i=n.parts[0];e.addEventListener(n.listenerEvent,(function(e){!function(e,t,n,i,r){let o,a=e.detail,l=a&&a.path;l?(i=(0,s.Iu)(n,i,l),o=a&&a.value):o=e.currentTarget[n],o=r?!o:o,t[w.READ_ONLY]&&t[w.READ_ONLY][i]||!t._setPendingPropertyOrPath(i,o,!0,Boolean(l))||a&&a.queueProperty||t._invalidateProperties()}(e,t,n.target,i.source,i.negate)}))}}function $(e,t,n,i,r,s){s=t.static||s&&("object"!=typeof s||s[t.methodName]);let o={methodName:t.methodName,args:t.args,methodInfo:r,dynamicFn:s};for(let r,s=0;s<t.args.length&&(r=t.args[s]);s++)r.literal||e._addPropertyEffect(r.rootProperty,n,{fn:i,info:o,trigger:r});return s&&e._addPropertyEffect(t.methodName,n,{fn:i,info:o}),o}function j(e,t,n,i,r){let s=e._methodHost||e,o=s[r.methodName];if(o){let i=e._marshalArgs(r.args,t,n);return i===v?v:o.apply(s,i)}r.dynamicFn||console.warn("method `"+r.methodName+"` not defined")}const V=[],U="(?:[a-zA-Z_$][\\w.:$\\-*]*)",q="(?:("+U+"|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*)",Y=new RegExp("(\\[\\[|{{)\\s*(?:(!)\\s*)?("+U+"\\s*(?:\\(\\s*(?:(?:"+q+"(?:,\\s*"+q+")*)?)\\)\\s*)?)(?:]]|}})","g");function K(e){let t="";for(let n=0;n<e.length;n++)t+=e[n].literal||"";return t}function J(e){let t=e.match(/([^\s]+?)\(([\s\S]*)\)/);if(t){let e={methodName:t[1],static:!0,args:V};return t[2].trim()?function(e,t){return t.args=e.map((function(e){let n=W(e);return n.literal||(t.static=!1),n}),this),t}(t[2].replace(/\\,/g,"&comma;").split(","),e):e}return null}function W(e){let t=e.trim().replace(/&comma;/g,",").replace(/\\(.)/g,"$1"),n={name:t,value:"",literal:!1},i=t[0];switch("-"===i&&(i=t[1]),i>="0"&&i<="9"&&(i="#"),i){case"'":case'"':n.value=t.slice(1,-1),n.literal=!0;break;case"#":n.value=Number(t),n.literal=!0}return n.literal||(n.rootProperty=(0,s.Jz)(t),n.structured=(0,s.AZ)(t),n.structured&&(n.wildcard=".*"==t.slice(-2),n.wildcard&&(n.name=t.slice(0,-2)))),n}function X(e,t,n){let i=(0,s.U2)(e,n);return void 0===i&&(i=t[n]),i}function G(e,t,n,i){const r={indexSplices:i};g.HY&&!e._overrideLegacyUndefined&&(t.splices=r),e.notifyPath(n+".splices",r),e.notifyPath(n+".length",t.length),g.HY&&!e._overrideLegacyUndefined&&(r.indexSplices=[])}function Z(e,t,n,i,r,s){G(e,t,n,[{index:i,addedCount:r,removed:s,object:t,type:"splice"}])}const Q=(0,r.o)((e=>{const t=y((0,a.Q)(e));return class extends t{constructor(){super(),this.__isPropertyEffectsClient=!0,this.__dataClientsReady,this.__dataPendingClients,this.__dataToNotify,this.__dataLinkedPaths,this.__dataHasPaths,this.__dataCompoundStorage,this.__dataHost,this.__dataTemp,this.__dataClientsInitialized,this.__data,this.__dataPending,this.__dataOld,this.__computeEffects,this.__computeInfo,this.__reflectEffects,this.__notifyEffects,this.__propagateEffects,this.__observeEffects,this.__readOnly,this.__templateInfo,this._overrideLegacyUndefined}get PROPERTY_EFFECT_TYPES(){return w}_initializeProperties(){super._initializeProperties(),this._registerHost(),this.__dataClientsReady=!1,this.__dataPendingClients=null,this.__dataToNotify=null,this.__dataLinkedPaths=null,this.__dataHasPaths=!1,this.__dataCompoundStorage=this.__dataCompoundStorage||null,this.__dataHost=this.__dataHost||null,this.__dataTemp={},this.__dataClientsInitialized=!1}_registerHost(){if(ee.length){let e=ee[ee.length-1];e._enqueueClient(this),this.__dataHost=e}}_initializeProtoProperties(e){this.__data=Object.create(e),this.__dataPending=Object.create(e),this.__dataOld={}}_initializeInstanceProperties(e){let t=this[w.READ_ONLY];for(let n in e)t&&t[n]||(this.__dataPending=this.__dataPending||{},this.__dataOld=this.__dataOld||{},this.__data[n]=this.__dataPending[n]=e[n])}_addPropertyEffect(e,t,n){this._createPropertyAccessor(e,t==w.READ_ONLY);let i=S(this,t,!0)[e];i||(i=this[t][e]=[]),i.push(n)}_removePropertyEffect(e,t,n){let i=S(this,t,!0)[e],r=i.indexOf(n);r>=0&&i.splice(r,1)}_hasPropertyEffect(e,t){let n=this[t];return Boolean(n&&n[e])}_hasReadOnlyEffect(e){return this._hasPropertyEffect(e,w.READ_ONLY)}_hasNotifyEffect(e){return this._hasPropertyEffect(e,w.NOTIFY)}_hasReflectEffect(e){return this._hasPropertyEffect(e,w.REFLECT)}_hasComputedEffect(e){return this._hasPropertyEffect(e,w.COMPUTE)}_setPendingPropertyOrPath(e,t,n,i){if(i||(0,s.Jz)(Array.isArray(e)?e[0]:e)!==e){if(!i){let n=(0,s.U2)(this,e);if(!(e=(0,s.t8)(this,e,t))||!super._shouldPropertyChange(e,t,n))return!1}if(this.__dataHasPaths=!0,this._setPendingProperty(e,t,n))return function(e,t,n){let i=e.__dataLinkedPaths;if(i){let r;for(let o in i){let a=i[o];(0,s.SG)(o,t)?(r=(0,s.Iu)(o,a,t),e._setPendingPropertyOrPath(r,n,!0,!0)):(0,s.SG)(a,t)&&(r=(0,s.Iu)(a,o,t),e._setPendingPropertyOrPath(r,n,!0,!0))}}}(this,e,t),!0}else{if(this.__dataHasAccessor&&this.__dataHasAccessor[e])return this._setPendingProperty(e,t,n);this[e]=t}return!1}_setUnmanagedPropertyToNode(e,t,n){n===e[t]&&"object"!=typeof n||("className"===t&&(e=(0,i.r)(e)),e[t]=n)}_setPendingProperty(e,t,n){let i=this.__dataHasPaths&&(0,s.AZ)(e),r=i?this.__dataTemp:this.__data;return!!this._shouldPropertyChange(e,t,r[e])&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),e in this.__dataOld||(this.__dataOld[e]=this.__data[e]),i?this.__dataTemp[e]=t:this.__data[e]=t,this.__dataPending[e]=t,(i||this[w.NOTIFY]&&this[w.NOTIFY][e])&&(this.__dataToNotify=this.__dataToNotify||{},this.__dataToNotify[e]=n),!0)}_setProperty(e,t){this._setPendingProperty(e,t,!0)&&this._invalidateProperties()}_invalidateProperties(){this.__dataReady&&this._flushProperties()}_enqueueClient(e){this.__dataPendingClients=this.__dataPendingClients||[],e!==this&&this.__dataPendingClients.push(e)}_flushClients(){this.__dataClientsReady?this.__enableOrFlushClients():(this.__dataClientsReady=!0,this._readyClients(),this.__dataReady=!0)}__enableOrFlushClients(){let e=this.__dataPendingClients;if(e){this.__dataPendingClients=null;for(let t=0;t<e.length;t++){let n=e[t];n.__dataEnabled?n.__dataPending&&n._flushProperties():n._enableProperties()}}}_readyClients(){this.__enableOrFlushClients()}setProperties(e,t){for(let n in e)!t&&this[w.READ_ONLY]&&this[w.READ_ONLY][n]||this._setPendingPropertyOrPath(n,e[n],!0);this._invalidateProperties()}ready(){this._flushProperties(),this.__dataClientsReady||this._flushClients(),this.__dataPending&&this._flushProperties()}_propertiesChanged(e,t,n){let i,r=this.__dataHasPaths;this.__dataHasPaths=!1,function(e,t,n,i){let r=e[w.COMPUTE];if(r)if(g.ls){b++;const s=function(e){let t=e.constructor.__orderedComputedDeps;if(!t){t=new Map;const n=e[w.COMPUTE];let i,{counts:r,ready:s,total:o}=function(e){const t=e[C],n={},i=e[w.COMPUTE],r=[];let s=0;for(let e in t){const i=t[e];s+=n[e]=i.args.filter((e=>!e.literal)).length+(i.dynamicFn?1:0)}for(let e in i)t[e]||r.push(e);return{counts:n,ready:r,total:s}}(e);for(;i=s.shift();){t.set(i,t.size);const e=n[i];e&&e.forEach((e=>{const t=e.info.methodInfo;--o,0==--r[t]&&s.push(t)}))}if(0!==o){const t=e;console.warn(`Computed graph for ${t.localName} incomplete; circular?`)}e.constructor.__orderedComputedDeps=t}return t}(e),o=[];for(let e in t)L(e,r,o,s,i);let a;for(;a=o.shift();)D(e,"",t,0,a)&&L(a.methodInfo,r,o,s,i);Object.assign(n,e.__dataOld),Object.assign(t,e.__dataPending),e.__dataPending=null}else{let s=t;for(;x(e,r,s,n,i);)Object.assign(n,e.__dataOld),Object.assign(t,e.__dataPending),s=e.__dataPending,e.__dataPending=null}}(this,t,n,r),i=this.__dataToNotify,this.__dataToNotify=null,this._propagatePropertyChanges(t,n,r),this._flushClients(),x(this,this[w.REFLECT],t,n,r),x(this,this[w.OBSERVE],t,n,r),i&&function(e,t,n,i,r){let s,o,a=e[w.NOTIFY],l=b++;for(let o in t)t[o]&&(a&&E(e,a,l,o,n,i,r)||r&&T(e,o,n))&&(s=!0);s&&(o=e.__dataHost)&&o._invalidateProperties&&o._invalidateProperties()}(this,i,t,n,r),1==this.__dataCounter&&(this.__dataTemp={})}_propagatePropertyChanges(e,t,n){this[w.PROPAGATE]&&x(this,this[w.PROPAGATE],e,t,n),this.__templateInfo&&this._runEffectsForTemplate(this.__templateInfo,e,t,n)}_runEffectsForTemplate(e,t,n,i){const r=(t,i)=>{x(this,e.propertyEffects,t,n,i,e.nodeList);for(let r=e.firstChild;r;r=r.nextSibling)this._runEffectsForTemplate(r,t,n,i)};e.runEffects?e.runEffects(r,t,i):r(t,i)}linkPaths(e,t){e=(0,s.Fv)(e),t=(0,s.Fv)(t),this.__dataLinkedPaths=this.__dataLinkedPaths||{},this.__dataLinkedPaths[e]=t}unlinkPaths(e){e=(0,s.Fv)(e),this.__dataLinkedPaths&&delete this.__dataLinkedPaths[e]}notifySplices(e,t){let n={path:""};G(this,(0,s.U2)(this,e,n),n.path,t)}get(e,t){return(0,s.U2)(t||this,e)}set(e,t,n){n?(0,s.t8)(n,e,t):this[w.READ_ONLY]&&this[w.READ_ONLY][e]||this._setPendingPropertyOrPath(e,t,!0)&&this._invalidateProperties()}push(e,...t){let n={path:""},i=(0,s.U2)(this,e,n),r=i.length,o=i.push(...t);return t.length&&Z(this,i,n.path,r,t.length,[]),o}pop(e){let t={path:""},n=(0,s.U2)(this,e,t),i=Boolean(n.length),r=n.pop();return i&&Z(this,n,t.path,n.length,0,[r]),r}splice(e,t,n,...i){let r,o={path:""},a=(0,s.U2)(this,e,o);return t<0?t=a.length-Math.floor(-t):t&&(t=Math.floor(t)),r=2===arguments.length?a.splice(t):a.splice(t,n,...i),(i.length||r.length)&&Z(this,a,o.path,t,i.length,r),r}shift(e){let t={path:""},n=(0,s.U2)(this,e,t),i=Boolean(n.length),r=n.shift();return i&&Z(this,n,t.path,0,0,[r]),r}unshift(e,...t){let n={path:""},i=(0,s.U2)(this,e,n),r=i.unshift(...t);return t.length&&Z(this,i,n.path,0,t.length,[]),r}notifyPath(e,t){let n;if(1==arguments.length){let i={path:""};t=(0,s.U2)(this,e,i),n=i.path}else n=Array.isArray(e)?(0,s.Fv)(e):e;this._setPendingPropertyOrPath(n,t,!0,!0)&&this._invalidateProperties()}_createReadOnlyProperty(e,t){var n;this._addPropertyEffect(e,w.READ_ONLY),t&&(this["_set"+(n=e,n[0].toUpperCase()+n.substring(1))]=function(t){this._setProperty(e,t)})}_createPropertyObserver(e,t,n){let i={property:e,method:t,dynamicFn:Boolean(n)};this._addPropertyEffect(e,w.OBSERVE,{fn:O,info:i,trigger:{name:e}}),n&&this._addPropertyEffect(t,w.OBSERVE,{fn:O,info:i,trigger:{name:t}})}_createMethodObserver(e,t){let n=J(e);if(!n)throw new Error("Malformed observer expression '"+e+"'");$(this,n,w.OBSERVE,j,null,t)}_createNotifyingProperty(e){this._addPropertyEffect(e,w.NOTIFY,{fn:N,info:{eventName:(0,o.n)(e)+"-changed",property:e}})}_createReflectedProperty(e){let t=this.constructor.attributeNameForProperty(e);"-"===t[0]?console.warn("Property "+e+" cannot be reflected to attribute "+t+' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.'):this._addPropertyEffect(e,w.REFLECT,{fn:I,info:{attrName:t}})}_createComputedProperty(e,t,n){let i=J(t);if(!i)throw new Error("Malformed computed expression '"+t+"'");const r=$(this,i,w.COMPUTE,D,e,n);S(this,C)[e]=r}_marshalArgs(e,t,n){const i=this.__data,r=[];for(let o=0,a=e.length;o<a;o++){let{name:a,structured:l,wildcard:p,value:d,literal:c}=e[o];if(!c)if(p){const e=(0,s.SG)(a,t),r=X(i,n,e?t:a);d={path:e?t:a,value:r,base:e?(0,s.U2)(i,a):r}}else d=l?X(i,n,a):i[a];if(g.HY&&!this._overrideLegacyUndefined&&void 0===d&&e.length>1)return v;r[o]=d}return r}static addPropertyEffect(e,t,n){this.prototype._addPropertyEffect(e,t,n)}static createPropertyObserver(e,t,n){this.prototype._createPropertyObserver(e,t,n)}static createMethodObserver(e,t){this.prototype._createMethodObserver(e,t)}static createNotifyingProperty(e){this.prototype._createNotifyingProperty(e)}static createReadOnlyProperty(e,t){this.prototype._createReadOnlyProperty(e,t)}static createReflectedProperty(e){this.prototype._createReflectedProperty(e)}static createComputedProperty(e,t,n){this.prototype._createComputedProperty(e,t,n)}static bindTemplate(e){return this.prototype._bindTemplate(e)}_bindTemplate(e,t){let n=this.constructor._parseTemplate(e),i=this.__preBoundTemplateInfo==n;if(!i)for(let e in n.propertyEffects)this._createPropertyAccessor(e);if(t)if(n=Object.create(n),n.wasPreBound=i,this.__templateInfo){const t=e._parentTemplateInfo||this.__templateInfo,i=t.lastChild;n.parent=t,t.lastChild=n,n.previousSibling=i,i?i.nextSibling=n:t.firstChild=n}else this.__templateInfo=n;else this.__preBoundTemplateInfo=n;return n}static _addTemplatePropertyEffect(e,t,n){(e.hostProps=e.hostProps||{})[t]=!0;let i=e.propertyEffects=e.propertyEffects||{};(i[t]=i[t]||[]).push(n)}_stampTemplate(e,t){t=t||this._bindTemplate(e,!0),ee.push(this);let n=super._stampTemplate(e,t);if(ee.pop(),t.nodeList=n.nodeList,!t.wasPreBound){let e=t.childNodes=[];for(let t=n.firstChild;t;t=t.nextSibling)e.push(t)}return n.templateInfo=t,function(e,t){let{nodeList:n,nodeInfoList:i}=t;if(i.length)for(let t=0;t<i.length;t++){let r=i[t],s=n[t],o=r.bindings;if(o)for(let t=0;t<o.length;t++){let n=o[t];H(s,n),z(s,e,n)}s.__dataHost=e}}(this,t),this.__dataClientsReady&&(this._runEffectsForTemplate(t,this.__data,null,!1),this._flushClients()),n}_removeBoundDom(e){const t=e.templateInfo,{previousSibling:n,nextSibling:r,parent:s}=t;n?n.nextSibling=r:s&&(s.firstChild=r),r?r.previousSibling=n:s&&(s.lastChild=n),t.nextSibling=t.previousSibling=null;let o=t.childNodes;for(let e=0;e<o.length;e++){let t=o[e];(0,i.r)((0,i.r)(t).parentNode).removeChild(t)}}static _parseTemplateNode(e,n,i){let r=t._parseTemplateNode.call(this,e,n,i);if(e.nodeType===Node.TEXT_NODE){let t=this._parseBindings(e.textContent,n);t&&(e.textContent=K(t)||" ",R(this,n,i,"text","textContent",t),r=!0)}return r}static _parseTemplateNodeAttribute(e,n,i,r,s){let a=this._parseBindings(s,n);if(a){let t=r,s="property";P.test(r)?s="attribute":"$"==r[r.length-1]&&(r=r.slice(0,-1),s="attribute");let l=K(a);return l&&"attribute"==s&&("class"==r&&e.hasAttribute("class")&&(l+=" "+e.getAttribute(r)),e.setAttribute(r,l)),"attribute"==s&&"disable-upgrade$"==t&&e.setAttribute(r,""),"input"===e.localName&&"value"===t&&e.setAttribute(t,""),e.removeAttribute(t),"property"===s&&(r=(0,o.z)(r)),R(this,n,i,s,r,a,l),!0}return t._parseTemplateNodeAttribute.call(this,e,n,i,r,s)}static _parseTemplateNestedTemplate(e,n,i){let r=t._parseTemplateNestedTemplate.call(this,e,n,i);const s=e.parentNode,o=i.templateInfo,a="dom-if"===s.localName,l="dom-repeat"===s.localName;g.gx&&(a||l)&&(s.removeChild(e),(i=i.parentInfo).templateInfo=o,i.noted=!0,r=!1);let p=o.hostProps;if(g.ew&&a)p&&(n.hostProps=Object.assign(n.hostProps||{},p),g.gx||(i.parentInfo.noted=!0));else{let e="{";for(let t in p)R(this,n,i,"property","_host_"+t,[{mode:e,source:t,dependencies:[t],hostProp:!0}])}return r}static _parseBindings(e,t){let n,i=[],r=0;for(;null!==(n=Y.exec(e));){n.index>r&&i.push({literal:e.slice(r,n.index)});let s=n[1][0],o=Boolean(n[2]),a=n[3].trim(),l=!1,p="",d=-1;"{"==s&&(d=a.indexOf("::"))>0&&(p=a.substring(d+2),a=a.substring(0,d),l=!0);let c=J(a),u=[];if(c){let{args:e,methodName:n}=c;for(let t=0;t<e.length;t++){let n=e[t];n.literal||u.push(n)}let i=t.dynamicFns;(i&&i[n]||c.static)&&(u.push(n),c.dynamicFn=!0)}else u.push(a);i.push({source:a,mode:s,negate:o,customEvent:l,signature:c,dependencies:u,event:p}),r=Y.lastIndex}if(r&&r<e.length){let t=e.substring(r);t&&i.push({literal:t})}return i.length?i:null}static _evaluateBinding(e,t,n,i,r,o){let a;return a=t.signature?j(e,n,i,0,t.signature):n!=t.source?(0,s.U2)(e,t.source):o&&(0,s.AZ)(n)?(0,s.U2)(e,n):e.__data[n],t.negate&&(a=!a),a}}})),ee=[]},8341:(e,t,n)=>{function i(e,t,n){return{index:e,removed:t,addedCount:n}}function r(e,t){return function(e,t,n,r,o,a){let l,p=0,d=0,c=Math.min(n-t,a-o);if(0==t&&0==o&&(p=function(e,t,n){for(let i=0;i<n;i++)if(!s(e[i],t[i]))return i;return n}(e,r,c)),n==e.length&&a==r.length&&(d=function(e,t,n){let i=e.length,r=t.length,o=0;for(;o<n&&s(e[--i],t[--r]);)o++;return o}(e,r,c-p)),o+=p,a-=d,(n-=d)-(t+=p)==0&&a-o==0)return[];if(t==n){for(l=i(t,[],0);o<a;)l.removed.push(r[o++]);return[l]}if(o==a)return[i(t,[],n-t)];let u=function(e){let t=e.length-1,n=e[0].length-1,i=e[t][n],r=[];for(;t>0||n>0;){if(0==t){r.push(2),n--;continue}if(0==n){r.push(3),t--;continue}let s,o=e[t-1][n-1],a=e[t-1][n],l=e[t][n-1];s=a<l?a<o?a:o:l<o?l:o,s==o?(o==i?r.push(0):(r.push(1),i=o),t--,n--):s==a?(r.push(3),t--,i=a):(r.push(2),n--,i=l)}return r.reverse(),r}(function(e,t,n,i,r,o){let a=o-r+1,l=n-t+1,p=new Array(a);for(let e=0;e<a;e++)p[e]=new Array(l),p[e][0]=e;for(let e=0;e<l;e++)p[0][e]=e;for(let n=1;n<a;n++)for(let o=1;o<l;o++)if(s(e[t+o-1],i[r+n-1]))p[n][o]=p[n-1][o-1];else{let e=p[n-1][o]+1,t=p[n][o-1]+1;p[n][o]=e<t?e:t}return p}(e,t,n,r,o,a));l=void 0;let h=[],f=t,_=o;for(let e=0;e<u.length;e++)switch(u[e]){case 0:l&&(h.push(l),l=void 0),f++,_++;break;case 1:l||(l=i(f,[],0)),l.addedCount++,f++,l.removed.push(r[_]),_++;break;case 2:l||(l=i(f,[],0)),l.addedCount++,f++;break;case 3:l||(l=i(f,[],0)),l.removed.push(r[_]),_++}return l&&h.push(l),h}(e,0,e.length,t,0,t.length)}function s(e,t){return e===t}n.d(t,{c:()=>r}),n(7894)},2224:(e,t,n)=>{n.d(t,{Wc:()=>p,YA:()=>d}),n(7894);let i=0,r=0,s=[],o=0,a=!1,l=document.createTextNode("");new window.MutationObserver((function(){a=!1;const e=s.length;for(let t=0;t<e;t++){let e=s[t];if(e)try{e()}catch(e){setTimeout((()=>{throw e}))}}s.splice(0,e),r+=e})).observe(l,{characterData:!0});const p={after:e=>({run:t=>window.setTimeout(t,e),cancel(e){window.clearTimeout(e)}}),run:(e,t)=>window.setTimeout(e,t),cancel(e){window.clearTimeout(e)}},d={run:e=>(a||(a=!0,l.textContent=o++),s.push(e),i++),cancel(e){const t=e-r;if(t>=0){if(!s[t])throw new Error("invalid async handle: "+e);s[t]=null}}}},7894:()=>{window.JSCompiler_renameProperty=function(e,t){return e}},9027:(e,t,n)=>{n.d(t,{n:()=>a,z:()=>o}),n(7894);const i={},r=/-[a-z]/g,s=/([A-Z])/g;function o(e){return i[e]||(i[e]=e.indexOf("-")<0?e:e.replace(r,(e=>e[1].toUpperCase())))}function a(e){return i[e]||(i[e]=e.replace(s,"-$1").toLowerCase())}},5313:(e,t,n)=>{n.d(t,{Ex:()=>s,Jk:()=>o,dx:()=>i}),n(7894),n(1014),n(2224);class i{constructor(){this._asyncModule=null,this._callback=null,this._timer=null}setConfig(e,t){this._asyncModule=e,this._callback=t,this._timer=this._asyncModule.run((()=>{this._timer=null,r.delete(this),this._callback()}))}cancel(){this.isActive()&&(this._cancelAsync(),r.delete(this))}_cancelAsync(){this.isActive()&&(this._asyncModule.cancel(this._timer),this._timer=null)}flush(){this.isActive()&&(this.cancel(),this._callback())}isActive(){return null!=this._timer}static debounce(e,t,n){return e instanceof i?e._cancelAsync():e=new i,e.setConfig(t,n),e}}let r=new Set;const s=function(e){r.add(e)},o=function(){const e=Boolean(r.size);return r.forEach((e=>{try{e.flush()}catch(e){setTimeout((()=>{throw e}))}})),e}},5218:(e,t,n)=>{n.d(t,{E:()=>i.Ex,y:()=>r}),n(7894);var i=n(5313);const r=function(){let e,t;do{e=window.ShadyDOM&&ShadyDOM.flush(),window.ShadyCSS&&window.ShadyCSS.ScopingShim&&window.ShadyCSS.ScopingShim.flush(),t=(0,i.Jk)()}while(e||t)}},4010:(e,t,n)=>{n.d(t,{BP:()=>R,NH:()=>M,ys:()=>L}),n(7894);var i=n(2224),r=n(5313),s=n(9387),o=n(1342);let a="string"==typeof document.head.style.touchAction,l="__polymerGestures",p="__polymerGesturesHandled",d="__polymerGesturesTouchAction",c=["mousedown","mousemove","mouseup","click"],u=[0,1,4,2],h=function(){try{return 1===new MouseEvent("test",{buttons:1}).buttons}catch(e){return!1}}();function f(e){return c.indexOf(e)>-1}let _=!1;function m(e){if(!f(e)&&"touchend"!==e)return a&&_&&s.f6?{passive:!0}:void 0}!function(){try{let e=Object.defineProperty({},"passive",{get(){_=!0}});window.addEventListener("test",null,e),window.removeEventListener("test",null,e)}catch(e){}}();let y=navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);const g=[],b={button:!0,input:!0,keygen:!0,meter:!0,output:!0,textarea:!0,progress:!0,select:!0},v={button:!0,command:!0,fieldset:!0,input:!0,keygen:!0,optgroup:!0,option:!0,select:!0,textarea:!0};function w(e){let t=Array.prototype.slice.call(e.labels||[]);if(!t.length){t=[];try{let n=e.getRootNode();if(e.id){let i=n.querySelectorAll(`label[for = '${e.id}']`);for(let e=0;e<i.length;e++)t.push(i[e])}}catch(e){}}return t}let C=function(e){let t=e.sourceCapabilities;var n;if((!t||t.firesTouchEvents)&&(e[p]={skip:!0},"click"===e.type)){let t=!1,i=O(e);for(let e=0;e<i.length;e++){if(i[e].nodeType===Node.ELEMENT_NODE)if("label"===i[e].localName)g.push(i[e]);else if(n=i[e],b[n.localName]){let n=w(i[e]);for(let e=0;e<n.length;e++)t=t||g.indexOf(n[e])>-1}if(i[e]===x.mouse.target)return}if(t)return;e.preventDefault(),e.stopPropagation()}};function P(e){let t=y?["click"]:c;for(let n,i=0;i<t.length;i++)n=t[i],e?(g.length=0,document.addEventListener(n,C,!0)):document.removeEventListener(n,C,!0)}function S(e){let t=e.type;if(!f(t))return!1;if("mousemove"===t){let t=void 0===e.buttons?1:e.buttons;return e instanceof window.MouseEvent&&!h&&(t=u[e.which]||0),Boolean(1&t)}return 0===(void 0===e.button?0:e.button)}let x={mouse:{target:null,mouseIgnoreJob:null},touch:{x:0,y:0,id:-1,scrollDecided:!1}};function E(e,t,n){e.movefn=t,e.upfn=n,document.addEventListener("mousemove",t),document.addEventListener("mouseup",n)}function A(e){document.removeEventListener("mousemove",e.movefn),document.removeEventListener("mouseup",e.upfn),e.movefn=null,e.upfn=null}s.z2&&document.addEventListener("touchend",(function(e){s.z2&&(x.mouse.mouseIgnoreJob||P(!0),x.mouse.target=O(e)[0],x.mouse.mouseIgnoreJob=r.dx.debounce(x.mouse.mouseIgnoreJob,i.Wc.after(2500),(function(){P(),x.mouse.target=null,x.mouse.mouseIgnoreJob=null})))}),!!_&&{passive:!0});const O=window.ShadyDOM&&window.ShadyDOM.noPatch?window.ShadyDOM.composedPath:e=>e.composedPath&&e.composedPath()||[],T={},k=[];function N(e){const t=O(e);return t.length>0?t[0]:e.target}function I(e){let t,n=e.type,i=e.currentTarget[l];if(!i)return;let r=i[n];if(r){if(!e[p]&&(e[p]={},"touch"===n.slice(0,5))){let t=e.changedTouches[0];if("touchstart"===n&&1===e.touches.length&&(x.touch.id=t.identifier),x.touch.id!==t.identifier)return;a||"touchstart"!==n&&"touchmove"!==n||function(e){let t=e.changedTouches[0],n=e.type;if("touchstart"===n)x.touch.x=t.clientX,x.touch.y=t.clientY,x.touch.scrollDecided=!1;else if("touchmove"===n){if(x.touch.scrollDecided)return;x.touch.scrollDecided=!0;let n=function(e){let t="auto",n=O(e);for(let e,i=0;i<n.length;i++)if(e=n[i],e[d]){t=e[d];break}return t}(e),i=!1,r=Math.abs(x.touch.x-t.clientX),s=Math.abs(x.touch.y-t.clientY);e.cancelable&&("none"===n?i=!0:"pan-x"===n?i=s>r:"pan-y"===n&&(i=r>s)),i?e.preventDefault():B("track")}}(e)}if(t=e[p],!t.skip){for(let n,i=0;i<k.length;i++)n=k[i],r[n.name]&&!t[n.name]&&n.flow&&n.flow.start.indexOf(e.type)>-1&&n.reset&&n.reset();for(let i,s=0;s<k.length;s++)i=k[s],r[i.name]&&!t[i.name]&&(t[i.name]=!0,i[n](e))}}}function M(e,t,n){return!!T[t]&&(function(e,t,n){let i=T[t],r=i.deps,s=i.name,o=e[l];o||(e[l]=o={});for(let t,n,i=0;i<r.length;i++)t=r[i],y&&f(t)&&"click"!==t||(n=o[t],n||(o[t]=n={_count:0}),0===n._count&&e.addEventListener(t,I,m(t)),n[s]=(n[s]||0)+1,n._count=(n._count||0)+1);e.addEventListener(t,n),i.touchAction&&R(e,i.touchAction)}(e,t,n),!0)}function L(e,t,n){return!!T[t]&&(function(e,t,n){let i=T[t],r=i.deps,s=i.name,o=e[l];if(o)for(let t,n,i=0;i<r.length;i++)t=r[i],n=o[t],n&&n[s]&&(n[s]=(n[s]||1)-1,n._count=(n._count||1)-1,0===n._count&&e.removeEventListener(t,I,m(t)));e.removeEventListener(t,n)}(e,t,n),!0)}function D(e){k.push(e);for(let t=0;t<e.emits.length;t++)T[e.emits[t]]=e}function R(e,t){a&&e instanceof HTMLElement&&i.YA.run((()=>{e.style.touchAction=t})),e[d]=t}function F(e,t,n){let i=new Event(t,{bubbles:!0,cancelable:!0,composed:!0});if(i.detail=n,(0,o.r)(e).dispatchEvent(i),i.defaultPrevented){let e=n.preventer||n.sourceEvent;e&&e.preventDefault&&e.preventDefault()}}function B(e){let t=function(e){for(let t,n=0;n<k.length;n++){t=k[n];for(let n,i=0;i<t.emits.length;i++)if(n=t.emits[i],n===e)return t}return null}(e);t.info&&(t.info.prevent=!0)}function H(e,t,n,i){t&&F(t,e,{x:n.clientX,y:n.clientY,sourceEvent:n,preventer:i,prevent:function(e){return B(e)}})}function z(e,t,n){if(e.prevent)return!1;if(e.started)return!0;let i=Math.abs(e.x-t),r=Math.abs(e.y-n);return i>=5||r>=5}function $(e,t,n){if(!t)return;let i,r=e.moves[e.moves.length-2],s=e.moves[e.moves.length-1],o=s.x-e.x,a=s.y-e.y,l=0;r&&(i=s.x-r.x,l=s.y-r.y),F(t,"track",{state:e.state,x:n.clientX,y:n.clientY,dx:o,dy:a,ddx:i,ddy:l,sourceEvent:n,hover:function(){return function(e,t){let n=document.elementFromPoint(e,t),i=n;for(;i&&i.shadowRoot&&!window.ShadyDOM;){let r=i;if(i=i.shadowRoot.elementFromPoint(e,t),r===i)break;i&&(n=i)}return n}(n.clientX,n.clientY)}})}function j(e,t,n){let i=Math.abs(t.clientX-e.x),r=Math.abs(t.clientY-e.y),s=N(n||t);!s||v[s.localName]&&s.hasAttribute("disabled")||(isNaN(i)||isNaN(r)||i<=25&&r<=25||function(e){if("click"===e.type){if(0===e.detail)return!0;let t=N(e);if(!t.nodeType||t.nodeType!==Node.ELEMENT_NODE)return!0;let n=t.getBoundingClientRect(),i=e.pageX,r=e.pageY;return!(i>=n.left&&i<=n.right&&r>=n.top&&r<=n.bottom)}return!1}(t))&&(e.prevent||F(s,"tap",{x:t.clientX,y:t.clientY,sourceEvent:t,preventer:n}))}D({name:"downup",deps:["mousedown","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["down","up"],info:{movefn:null,upfn:null},reset:function(){A(this.info)},mousedown:function(e){if(!S(e))return;let t=N(e),n=this;E(this.info,(function(e){S(e)||(H("up",t,e),A(n.info))}),(function(e){S(e)&&H("up",t,e),A(n.info)})),H("down",t,e)},touchstart:function(e){H("down",N(e),e.changedTouches[0],e)},touchend:function(e){H("up",N(e),e.changedTouches[0],e)}}),D({name:"track",touchAction:"none",deps:["mousedown","touchstart","touchmove","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["track"],info:{x:0,y:0,state:"start",started:!1,moves:[],addMove:function(e){this.moves.length>2&&this.moves.shift(),this.moves.push(e)},movefn:null,upfn:null,prevent:!1},reset:function(){this.info.state="start",this.info.started=!1,this.info.moves=[],this.info.x=0,this.info.y=0,this.info.prevent=!1,A(this.info)},mousedown:function(e){if(!S(e))return;let t=N(e),n=this,i=function(e){let i=e.clientX,r=e.clientY;z(n.info,i,r)&&(n.info.state=n.info.started?"mouseup"===e.type?"end":"track":"start","start"===n.info.state&&B("tap"),n.info.addMove({x:i,y:r}),S(e)||(n.info.state="end",A(n.info)),t&&$(n.info,t,e),n.info.started=!0)};E(this.info,i,(function(e){n.info.started&&i(e),A(n.info)})),this.info.x=e.clientX,this.info.y=e.clientY},touchstart:function(e){let t=e.changedTouches[0];this.info.x=t.clientX,this.info.y=t.clientY},touchmove:function(e){let t=N(e),n=e.changedTouches[0],i=n.clientX,r=n.clientY;z(this.info,i,r)&&("start"===this.info.state&&B("tap"),this.info.addMove({x:i,y:r}),$(this.info,t,n),this.info.state="track",this.info.started=!0)},touchend:function(e){let t=N(e),n=e.changedTouches[0];this.info.started&&(this.info.state="end",this.info.addMove({x:n.clientX,y:n.clientY}),$(this.info,t,n))}}),D({name:"tap",deps:["mousedown","click","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["click","touchend"]},emits:["tap"],info:{x:NaN,y:NaN,prevent:!1},reset:function(){this.info.x=NaN,this.info.y=NaN,this.info.prevent=!1},mousedown:function(e){S(e)&&(this.info.x=e.clientX,this.info.y=e.clientY)},click:function(e){S(e)&&j(this.info,e)},touchstart:function(e){const t=e.changedTouches[0];this.info.x=t.clientX,this.info.y=t.clientY},touchend:function(e){j(this.info,e.changedTouches[0],e)}})},1121:(e,t,n)=>{n.d(t,{d:()=>o}),n(7894);const i=window.trustedTypes&&trustedTypes.createPolicy("polymer-html-literal",{createHTML:e=>e});class r{constructor(e,t){a(e,t);const n=t.reduce(((t,n,i)=>t+s(n)+e[i+1]),e[0]);this.value=n.toString()}toString(){return this.value}}function s(e){if(e instanceof r)return e.value;throw new Error(`non-literal value passed to Polymer's htmlLiteral function: ${e}`)}const o=function(e,...t){a(e,t);const n=document.createElement("template");let o=t.reduce(((t,n,i)=>t+function(e){if(e instanceof HTMLTemplateElement)return e.innerHTML;if(e instanceof r)return s(e);throw new Error(`non-template value passed to Polymer's html function: ${e}`)}(n)+e[i+1]),e[0]);return i&&(o=i.createHTML(o)),n.innerHTML=o,n},a=(e,t)=>{if(!Array.isArray(e)||!Array.isArray(e.raw)||t.length!==e.length-1)throw new TypeError("Invalid call to the html template tag")}},1014:(e,t,n)=>{n.d(t,{o:()=>s}),n(7894);let i=0;function r(){}r.prototype.__mixinApplications,r.prototype.__mixinSet;const s=function(e){let t=e.__mixinApplications;t||(t=new WeakMap,e.__mixinApplications=t);let n=i++;return function(i){let r=i.__mixinSet;if(r&&r[n])return i;let s=t,o=s.get(i);if(!o){o=e(i),s.set(i,o);let t=Object.create(o.__mixinSet||r||null);t[n]=!0,o.__mixinSet=t}return o}}},1446:(e,t,n)=>{function i(e){return e.indexOf(".")>=0}function r(e){let t=e.indexOf(".");return-1===t?e:e.slice(0,t)}function s(e,t){return 0===e.indexOf(t+".")}function o(e,t){return 0===t.indexOf(e+".")}function a(e,t,n){return t+n.slice(e.length)}function l(e,t){return e===t||s(e,t)||o(e,t)}function p(e){if(Array.isArray(e)){let t=[];for(let n=0;n<e.length;n++){let i=e[n].toString().split(".");for(let e=0;e<i.length;e++)t.push(i[e])}return t.join(".")}return e}function d(e){return Array.isArray(e)?p(e).split("."):e.toString().split(".")}function c(e,t,n){let i=e,r=d(t);for(let e=0;e<r.length;e++){if(!i)return;i=i[r[e]]}return n&&(n.path=r.join(".")),i}function u(e,t,n){let i=e,r=d(t),s=r[r.length-1];if(r.length>1){for(let e=0;e<r.length-1;e++)if(i=i[r[e]],!i)return;i[s]=n}else i[t]=n;return r.join(".")}n.d(t,{AZ:()=>i,Fv:()=>p,Iu:()=>a,Jz:()=>r,SG:()=>o,U2:()=>c,jg:()=>s,t8:()=>u,wB:()=>l}),n(7894)},2223:(e,t,n)=>{n(7894)},9967:(e,t,n)=>{n.d(t,{Kk:()=>a,Rq:()=>l,iY:()=>p}),n(7894);let i,r,s=/(url\()([^)]*)(\))/g,o=/(^\/[^\/])|(^#)|(^[\w-\d]*:)/;function a(e,t){if(e&&o.test(e))return e;if("//"===e)return e;if(void 0===i){i=!1;try{const e=new URL("b","http://a");e.pathname="c%20d",i="http://a/c%20d"===e.href}catch(e){}}if(t||(t=document.baseURI||window.location.href),i)try{return new URL(e,t).href}catch(t){return e}return r||(r=document.implementation.createHTMLDocument("temp"),r.base=r.createElement("base"),r.head.appendChild(r.base),r.anchor=r.createElement("a"),r.body.appendChild(r.anchor)),r.base.href=t,r.anchor.href=e,r.anchor.href||e}function l(e,t){return e.replace(s,(function(e,n,i,r){return n+"'"+a(i.replace(/["']/g,""),t)+"'"+r}))}function p(e){return e.substring(0,e.lastIndexOf("/")+1)}},9387:(e,t,n)=>{n.d(t,{FV:()=>s,HY:()=>f,Hr:()=>h,XN:()=>p,ZN:()=>d,a2:()=>u,dJ:()=>b,ew:()=>g,f6:()=>l,gx:()=>y,j8:()=>v,ls:()=>_,md:()=>w,my:()=>r,nL:()=>c,sM:()=>o,v1:()=>a,z2:()=>m}),n(7894);var i=n(9967);const r=!window.ShadyDOM||!window.ShadyDOM.inUse,s=(Boolean(!window.ShadyCSS||window.ShadyCSS.nativeCss),window.customElements.polyfillWrapFlushCallback,r&&"adoptedStyleSheets"in Document.prototype&&"replaceSync"in CSSStyleSheet.prototype&&(()=>{try{const e=new CSSStyleSheet;e.replaceSync("");const t=document.createElement("div");return t.attachShadow({mode:"open"}),t.shadowRoot.adoptedStyleSheets=[e],t.shadowRoot.adoptedStyleSheets[0]===e}catch(e){return!1}})());let o=window.Polymer&&window.Polymer.rootPath||(0,i.iY)(document.baseURI||window.location.href),a=window.Polymer&&window.Polymer.sanitizeDOMValue||void 0,l=window.Polymer&&window.Polymer.setPassiveTouchGestures||!1,p=window.Polymer&&window.Polymer.strictTemplatePolicy||!1,d=window.Polymer&&window.Polymer.allowTemplateFromDomModule||!1,c=window.Polymer&&window.Polymer.legacyOptimizations||!1,u=window.Polymer&&window.Polymer.legacyWarnings||!1,h=window.Polymer&&window.Polymer.syncInitialRender||!1,f=window.Polymer&&window.Polymer.legacyUndefined||!1,_=window.Polymer&&window.Polymer.orderedComputed||!1,m=!0,y=window.Polymer&&window.Polymer.removeNestedTemplates||!1,g=window.Polymer&&window.Polymer.fastDomIf||!1,b=window.Polymer&&window.Polymer.suppressTemplateNotifications||!1,v=window.Polymer&&window.Polymer.legacyNoObservedAttributes||!1,w=window.Polymer&&window.Polymer.useAdoptedStyleSheetsWithBuiltCSS||!1},9836:(e,t,n)=>{n.d(t,{jv:()=>h,lx:()=>c,uT:()=>d});var i=n(4262),r=n(9967);const s="shady-unscoped";function o(e){return i.t.import(e)}function a(e){let t=e.body?e.body:e;const n=(0,r.Rq)(t.textContent,e.baseURI),i=document.createElement("style");return i.textContent=n,i}function l(e){const t=e.trim().split(/\s+/),n=[];for(let e=0;e<t.length;e++)n.push(...p(t[e]));return n}function p(e){const t=o(e);if(!t)return console.warn("Could not find style data in module named",e),[];if(void 0===t._styles){const e=[];e.push(...u(t));const n=t.querySelector("template");n&&e.push(...d(n,t.assetpath)),t._styles=e}return t._styles}function d(e,t){if(!e._styles){const n=[],i=e.content.querySelectorAll("style");for(let e=0;e<i.length;e++){let s=i[e],o=s.getAttribute("include");o&&n.push(...l(o).filter((function(e,t,n){return n.indexOf(e)===t}))),t&&(s.textContent=(0,r.Rq)(s.textContent,t)),n.push(s)}e._styles=n}return e._styles}function c(e){let t=o(e);return t?u(t):[]}function u(e){const t=[],n=e.querySelectorAll("link[rel=import][type~=css]");for(let e=0;e<n.length;e++){let i=n[e];if(i.import){const e=i.import,n=i.hasAttribute(s);if(n&&!e._unscopedStyle){const t=a(e);t.setAttribute(s,""),e._unscopedStyle=t}else e._style||(e._style=a(e));t.push(n?e._unscopedStyle:e._style)}}return t}function h(e){let t=e.trim().split(/\s+/),n="";for(let e=0;e<t.length;e++)n+=f(t[e]);return n}function f(e){let t=o(e);if(t&&void 0===t._cssText){let e=function(e){let t="",n=u(e);for(let e=0;e<n.length;e++)t+=n[e].textContent;return t}(t),n=t.querySelector("template");n&&(e+=function(e,t){let n="";const i=d(e,t);for(let e=0;e<i.length;e++){let t=i[e];t.parentNode&&t.parentNode.removeChild(t),n+=t.textContent}return n}(n,t.assetpath)),t._cssText=e||null}return t||console.warn("Could not find style data in module named",e),t&&t._cssText||""}},3501:(e,t,n)=>{function i(){}n.d(t,{Gd:()=>i,z2:()=>s});const r=[];function s(e){r.push(e)}},1342:(e,t,n)=>{n.d(t,{r:()=>i});const i=window.ShadyDOM&&window.ShadyDOM.noPatch&&window.ShadyDOM.wrap?window.ShadyDOM.wrap:window.ShadyDOM?e=>ShadyDOM.patch(e):e=>e},4673:(e,t,n)=>{n.d(t,{H3:()=>r});var i=n(581);n(1121);const r=(0,i.SH)(HTMLElement)},6550:(e,t,n)=>{var i=n(2205),r=(n(3505),n(7894),n(7999)),s=n(1014);function o(e,t,n,i,r){let s;r&&(s="object"==typeof n&&null!==n,s&&(i=e.__dataTemp[t]));let o=i!==n&&(i==i||n==n);return s&&o&&(e.__dataTemp[t]=n),o}const a=(0,s.o)((e=>class extends e{_shouldPropertyChange(e,t,n){return o(this,e,t,n,!0)}})),l=(0,s.o)((e=>class extends e{static get properties(){return{mutableData:Boolean}}_shouldPropertyChange(e,t,n){return o(this,e,t,n,this.mutableData)}}));a._mutablePropertyChange=o;var p=n(9387),d=n(1342);let c=null;function u(){return c}u.prototype=Object.create(HTMLTemplateElement.prototype,{constructor:{value:u,writable:!0}});const h=(0,r.q)(u),f=a(h),_=(0,r.q)(class{});function m(e,t){for(let n=0;n<t.length;n++){let i=t[n];if(Boolean(e)!=Boolean(i.__hideTemplateChildren__))if(i.nodeType===Node.TEXT_NODE)e?(i.__polymerTextContent__=i.textContent,i.textContent=""):i.textContent=i.__polymerTextContent__;else if("slot"===i.localName)if(e)i.__polymerReplaced__=document.createComment("hidden-slot"),(0,d.r)((0,d.r)(i).parentNode).replaceChild(i.__polymerReplaced__,i);else{const e=i.__polymerReplaced__;e&&(0,d.r)((0,d.r)(e).parentNode).replaceChild(i,e)}else i.style&&(e?(i.__polymerDisplay__=i.style.display,i.style.display="none"):i.style.display=i.__polymerDisplay__);i.__hideTemplateChildren__=e,i._showHideChildren&&i._showHideChildren(e)}}class y extends _{constructor(e){super(),this._configureProperties(e),this.root=this._stampTemplate(this.__dataHost);let t=[];this.children=t;for(let e=this.root.firstChild;e;e=e.nextSibling)t.push(e),e.__templatizeInstance=this;this.__templatizeOwner&&this.__templatizeOwner.__hideTemplateChildren__&&this._showHideChildren(!0);let n=this.__templatizeOptions;(e&&n.instanceProps||!n.instanceProps)&&this._enableProperties()}_configureProperties(e){if(this.__templatizeOptions.forwardHostProp)for(let e in this.__hostProps)this._setPendingProperty(e,this.__dataHost["_host_"+e]);for(let t in e)this._setPendingProperty(t,e[t])}forwardHostProp(e,t){this._setPendingPropertyOrPath(e,t,!1,!0)&&this.__dataHost._enqueueClient(this)}_addEventListenerToNode(e,t,n){if(this._methodHost&&this.__templatizeOptions.parentModel)this._methodHost._addEventListenerToNode(e,t,(e=>{e.model=this,n(e)}));else{let i=this.__dataHost.__dataHost;i&&i._addEventListenerToNode(e,t,n)}}_showHideChildren(e){m(e,this.children)}_setUnmanagedPropertyToNode(e,t,n){e.__hideTemplateChildren__&&e.nodeType==Node.TEXT_NODE&&"textContent"==t?e.__polymerTextContent__=n:super._setUnmanagedPropertyToNode(e,t,n)}get parentModel(){let e=this.__parentModel;if(!e){let t;e=this;do{e=e.__dataHost.__dataHost}while((t=e.__templatizeOptions)&&!t.parentModel);this.__parentModel=e}return e}dispatchEvent(e){return!0}}y.prototype.__dataHost,y.prototype.__templatizeOptions,y.prototype._methodHost,y.prototype.__templatizeOwner,y.prototype.__hostProps;const g=a(y);function b(e){let t=e.__dataHost;return t&&t._methodHost||t}function v(e,t){return function(e,n,i){t.call(e.__templatizeOwner,n.substring("_host_".length),i[n])}}function w(e,t){return function(e,n,i){t.call(e.__templatizeOwner,e,n,i[n])}}function C(e,t,n){if(p.XN&&!b(e))throw new Error("strictTemplatePolicy: template owner not trusted");if(n=n||{},e.__templatizeOwner)throw new Error("A <template> can only be templatized once");e.__templatizeOwner=t;let i=(t?t.constructor:y)._parseTemplate(e),r=i.templatizeInstanceClass;r||(r=function(e,t,n){let i=n.mutableData?g:y;C.mixin&&(i=C.mixin(i));let r=class extends i{};return r.prototype.__templatizeOptions=n,r.prototype._bindTemplate(e),function(e,t,n,i){let r=n.hostProps||{};for(let t in i.instanceProps){delete r[t];let n=i.notifyInstanceProp;n&&e.prototype._addPropertyEffect(t,e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:w(0,n)})}if(i.forwardHostProp&&t.__dataHost)for(let t in r)n.hasHostProps||(n.hasHostProps=!0),e.prototype._addPropertyEffect(t,e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:function(e,t,n){e.__dataHost._setPendingPropertyOrPath("_host_"+t,n[t],!0,!0)}})}(r,e,t,n),r}(e,i,n),i.templatizeInstanceClass=r);const s=b(e);!function(e,t,n,i){let r=n.forwardHostProp;if(r&&t.hasHostProps){const a="template"==e.localName;let l=t.templatizeTemplateClass;if(!l){if(a){let e=n.mutableData?f:h;class i extends e{}l=t.templatizeTemplateClass=i}else{const n=e.constructor;class i extends n{}l=t.templatizeTemplateClass=i}let s=t.hostProps;for(let e in s)l.prototype._addPropertyEffect("_host_"+e,l.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE,{fn:v(0,r)}),l.prototype._createNotifyingProperty("_host_"+e);p.a2&&i&&function(e,t,n){const i=n.constructor._properties,{propertyEffects:r}=e,{instanceProps:s}=t;for(let e in r)if(!(i[e]||s&&s[e])){const t=r[e];for(let n=0;n<t.length;n++){const{part:i}=t[n].info;if(!i.signature||!i.signature.static){console.warn(`Property '${e}' used in template but not declared in 'properties'; attribute will not be observed.`);break}}}}(t,n,i)}if(e.__dataProto&&Object.assign(e.__data,e.__dataProto),a)o=l,c=s=e,Object.setPrototypeOf(s,o.prototype),new o,c=null,e.__dataTemp={},e.__dataPending=null,e.__dataOld=null,e._enableProperties();else{Object.setPrototypeOf(e,l.prototype);const n=t.hostProps;for(let t in n)if(t="_host_"+t,t in e){const n=e[t];delete e[t],e.__data[t]=n}}}var s,o}(e,i,n,s);let o=class extends r{};return o.prototype._methodHost=s,o.prototype.__dataHost=e,o.prototype.__templatizeOwner=t,o.prototype.__hostProps=i.hostProps,o}var P=n(6163);let S=!1;function x(){if(p.nL&&!p.my){if(!S){S=!0;const e=document.createElement("style");e.textContent="dom-bind,dom-if,dom-repeat{display:none;}",document.head.appendChild(e)}return!0}return!1}const E=(0,P._)(l((0,r.q)(HTMLElement)));customElements.define("dom-bind",class extends E{static get observedAttributes(){return["mutable-data"]}constructor(){if(super(),p.XN)throw new Error("strictTemplatePolicy: dom-bind not allowed");this.root=null,this.$=null,this.__children=null}attributeChangedCallback(e,t,n,i){this.mutableData=!0}connectedCallback(){x()||(this.style.display="none"),this.render()}disconnectedCallback(){this.__removeChildren()}__insertChildren(){(0,d.r)((0,d.r)(this).parentNode).insertBefore(this.root,this)}__removeChildren(){if(this.__children)for(let e=0;e<this.__children.length;e++)this.root.appendChild(this.__children[e])}render(){let e;if(!this.__children){if(e=e||this.querySelector("template"),!e){let t=new MutationObserver((()=>{if(e=this.querySelector("template"),!e)throw new Error("dom-bind requires a <template> child");t.disconnect(),this.render()}));return void t.observe(this,{childList:!0})}this.root=this._stampTemplate(e),this.$=this.root.$,this.__children=[];for(let e=this.root.firstChild;e;e=e.nextSibling)this.__children[this.__children.length]=e;this._enableProperties()}this.__insertChildren(),this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0}))}});var A=n(4673),O=n(5313),T=n(5218),k=n(1446),N=n(2224);const I=l(A.H3);class M extends I{static get is(){return"dom-repeat"}static get template(){return null}static get properties(){return{items:{type:Array},as:{type:String,value:"item"},indexAs:{type:String,value:"index"},itemsIndexAs:{type:String,value:"itemsIndex"},sort:{type:Function,observer:"__sortChanged"},filter:{type:Function,observer:"__filterChanged"},observe:{type:String,observer:"__observeChanged"},delay:Number,renderedItemCount:{type:Number,notify:!p.dJ,readOnly:!0},initialCount:{type:Number},targetFramerate:{type:Number,value:20},_targetFrameTime:{type:Number,computed:"__computeFrameTime(targetFramerate)"},notifyDomChange:{type:Boolean},reuseChunkedInstances:{type:Boolean}}}static get observers(){return["__itemsChanged(items.*)"]}constructor(){super(),this.__instances=[],this.__renderDebouncer=null,this.__itemsIdxToInstIdx={},this.__chunkCount=null,this.__renderStartTime=null,this.__itemsArrayChanged=!1,this.__shouldMeasureChunk=!1,this.__shouldContinueChunking=!1,this.__chunkingId=0,this.__sortFn=null,this.__filterFn=null,this.__observePaths=null,this.__ctor=null,this.__isDetached=!0,this.template=null,this._templateInfo}disconnectedCallback(){super.disconnectedCallback(),this.__isDetached=!0;for(let e=0;e<this.__instances.length;e++)this.__detachInstance(e);this.__chunkingId&&cancelAnimationFrame(this.__chunkingId)}connectedCallback(){if(super.connectedCallback(),x()||(this.style.display="none"),this.__isDetached){this.__isDetached=!1;let e=(0,d.r)((0,d.r)(this).parentNode);for(let t=0;t<this.__instances.length;t++)this.__attachInstance(t,e);this.__chunkingId&&this.__render()}}__ensureTemplatized(){if(!this.__ctor){const e=this;let t=this.template=e._templateInfo?e:this.querySelector("template");if(!t){let e=new MutationObserver((()=>{if(!this.querySelector("template"))throw new Error("dom-repeat requires a <template> child");e.disconnect(),this.__render()}));return e.observe(this,{childList:!0}),!1}let n={};n[this.as]=!0,n[this.indexAs]=!0,n[this.itemsIndexAs]=!0,this.__ctor=C(t,this,{mutableData:this.mutableData,parentModel:!0,instanceProps:n,forwardHostProp:function(e,t){let n=this.__instances;for(let i,r=0;r<n.length&&(i=n[r]);r++)i.forwardHostProp(e,t)},notifyInstanceProp:function(e,t,n){if((0,k.wB)(this.as,t)){let i=e[this.itemsIndexAs];t==this.as&&(this.items[i]=n);let r=(0,k.Iu)(this.as,`${JSCompiler_renameProperty("items",this)}.${i}`,t);this.notifyPath(r,n)}}})}return!0}__getMethodHost(){return this.__dataHost._methodHost||this.__dataHost}__functionFromPropertyValue(e){if("string"==typeof e){let t=e,n=this.__getMethodHost();return function(){return n[t].apply(n,arguments)}}return e}__sortChanged(e){this.__sortFn=this.__functionFromPropertyValue(e),this.items&&this.__debounceRender(this.__render)}__filterChanged(e){this.__filterFn=this.__functionFromPropertyValue(e),this.items&&this.__debounceRender(this.__render)}__computeFrameTime(e){return Math.ceil(1e3/e)}__observeChanged(){this.__observePaths=this.observe&&this.observe.replace(".*",".").split(" ")}__handleObservedPaths(e){if(this.__sortFn||this.__filterFn)if(e){if(this.__observePaths){let t=this.__observePaths;for(let n=0;n<t.length;n++)0===e.indexOf(t[n])&&this.__debounceRender(this.__render,this.delay)}}else this.__debounceRender(this.__render,this.delay)}__itemsChanged(e){this.items&&!Array.isArray(this.items)&&console.warn("dom-repeat expected array for `items`, found",this.items),this.__handleItemPath(e.path,e.value)||("items"===e.path&&(this.__itemsArrayChanged=!0),this.__debounceRender(this.__render))}__debounceRender(e,t=0){this.__renderDebouncer=O.dx.debounce(this.__renderDebouncer,t>0?N.Wc.after(t):N.YA,e.bind(this)),(0,T.E)(this.__renderDebouncer)}render(){this.__debounceRender(this.__render),(0,T.y)()}__render(){if(!this.__ensureTemplatized())return;let e=this.items||[];const t=this.__sortAndFilterItems(e),n=this.__calculateLimit(t.length);this.__updateInstances(e,n,t),this.initialCount&&(this.__shouldMeasureChunk||this.__shouldContinueChunking)&&(cancelAnimationFrame(this.__chunkingId),this.__chunkingId=requestAnimationFrame((()=>{this.__chunkingId=null,this.__continueChunking()}))),this._setRenderedItemCount(this.__instances.length),p.dJ&&!this.notifyDomChange||this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0}))}__sortAndFilterItems(e){let t=new Array(e.length);for(let n=0;n<e.length;n++)t[n]=n;return this.__filterFn&&(t=t.filter(((t,n,i)=>this.__filterFn(e[t],n,i)))),this.__sortFn&&t.sort(((t,n)=>this.__sortFn(e[t],e[n]))),t}__calculateLimit(e){let t=e;const n=this.__instances.length;if(this.initialCount){let i;!this.__chunkCount||this.__itemsArrayChanged&&!this.reuseChunkedInstances?(t=Math.min(e,this.initialCount),i=Math.max(t-n,0),this.__chunkCount=i||1):(i=Math.min(Math.max(e-n,0),this.__chunkCount),t=Math.min(n+i,e)),this.__shouldMeasureChunk=i===this.__chunkCount,this.__shouldContinueChunking=t<e,this.__renderStartTime=performance.now()}return this.__itemsArrayChanged=!1,t}__continueChunking(){if(this.__shouldMeasureChunk){const e=performance.now()-this.__renderStartTime,t=this._targetFrameTime/e;this.__chunkCount=Math.round(this.__chunkCount*t)||1}this.__shouldContinueChunking&&this.__debounceRender(this.__render)}__updateInstances(e,t,n){const i=this.__itemsIdxToInstIdx={};let r;for(r=0;r<t;r++){let t=this.__instances[r],s=n[r],o=e[s];i[s]=r,t?(t._setPendingProperty(this.as,o),t._setPendingProperty(this.indexAs,r),t._setPendingProperty(this.itemsIndexAs,s),t._flushProperties()):this.__insertInstance(o,r,s)}for(let e=this.__instances.length-1;e>=r;e--)this.__detachAndRemoveInstance(e)}__detachInstance(e){let t=this.__instances[e];const n=(0,d.r)(t.root);for(let e=0;e<t.children.length;e++){let i=t.children[e];n.appendChild(i)}return t}__attachInstance(e,t){let n=this.__instances[e];t.insertBefore(n.root,this)}__detachAndRemoveInstance(e){this.__detachInstance(e),this.__instances.splice(e,1)}__stampInstance(e,t,n){let i={};return i[this.as]=e,i[this.indexAs]=t,i[this.itemsIndexAs]=n,new this.__ctor(i)}__insertInstance(e,t,n){const i=this.__stampInstance(e,t,n);let r=this.__instances[t+1],s=r?r.children[0]:this;return(0,d.r)((0,d.r)(this).parentNode).insertBefore(i.root,s),this.__instances[t]=i,i}_showHideChildren(e){for(let t=0;t<this.__instances.length;t++)this.__instances[t]._showHideChildren(e)}__handleItemPath(e,t){let n=e.slice(6),i=n.indexOf("."),r=i<0?n:n.substring(0,i);if(r==parseInt(r,10)){let e=i<0?"":n.substring(i+1);this.__handleObservedPaths(e);let s=this.__itemsIdxToInstIdx[r],o=this.__instances[s];if(o){let n=this.as+(e?"."+e:"");o._setPendingPropertyOrPath(n,t,!1,!0),o._flushProperties()}return!0}}itemForElement(e){let t=this.modelForElement(e);return t&&t[this.as]}indexForElement(e){let t=this.modelForElement(e);return t&&t[this.indexAs]}modelForElement(e){return function(e,t){let n;for(;t;)if(n=t.__dataHost?t:t.__templatizeInstance){if(n.__dataHost==e)return n;t=n.__dataHost}else t=(0,d.r)(t).parentNode;return null}(this.template,e)}}customElements.define(M.is,M);class L extends A.H3{static get is(){return"dom-if"}static get template(){return null}static get properties(){return{if:{type:Boolean,observer:"__debounceRender"},restamp:{type:Boolean,observer:"__debounceRender"},notifyDomChange:{type:Boolean}}}constructor(){super(),this.__renderDebouncer=null,this._lastIf=!1,this.__hideTemplateChildren__=!1,this.__template,this._templateInfo}__debounceRender(){this.__renderDebouncer=O.dx.debounce(this.__renderDebouncer,N.YA,(()=>this.__render())),(0,T.E)(this.__renderDebouncer)}disconnectedCallback(){super.disconnectedCallback();const e=(0,d.r)(this).parentNode;e&&(e.nodeType!=Node.DOCUMENT_FRAGMENT_NODE||(0,d.r)(e).host)||this.__teardownInstance()}connectedCallback(){super.connectedCallback(),x()||(this.style.display="none"),this.if&&this.__debounceRender()}__ensureTemplate(){if(!this.__template){const e=this;let t=e._templateInfo?e:(0,d.r)(e).querySelector("template");if(!t){let e=new MutationObserver((()=>{if(!(0,d.r)(this).querySelector("template"))throw new Error("dom-if requires a <template> child");e.disconnect(),this.__render()}));return e.observe(this,{childList:!0}),!1}this.__template=t}return!0}__ensureInstance(){let e=(0,d.r)(this).parentNode;if(this.__hasInstance()){let t=this.__getInstanceNodes();if(t&&t.length&&(0,d.r)(this).previousSibling!==t[t.length-1])for(let n,i=0;i<t.length&&(n=t[i]);i++)(0,d.r)(e).insertBefore(n,this)}else{if(!e)return!1;if(!this.__ensureTemplate())return!1;this.__createAndInsertInstance(e)}return!0}render(){(0,T.y)()}__render(){if(this.if){if(!this.__ensureInstance())return}else this.restamp&&this.__teardownInstance();this._showHideChildren(),p.dJ&&!this.notifyDomChange||this.if==this._lastIf||(this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0})),this._lastIf=this.if)}__hasInstance(){}__getInstanceNodes(){}__createAndInsertInstance(e){}__teardownInstance(){}_showHideChildren(){}}const D=p.ew?class extends L{constructor(){super(),this.__instance=null,this.__syncInfo=null}__hasInstance(){return Boolean(this.__instance)}__getInstanceNodes(){return this.__instance.templateInfo.childNodes}__createAndInsertInstance(e){const t=this.__dataHost||this;if(p.XN&&!this.__dataHost)throw new Error("strictTemplatePolicy: template owner not trusted");const n=t._bindTemplate(this.__template,!0);n.runEffects=(e,t,n)=>{let i=this.__syncInfo;if(this.if)i&&(this.__syncInfo=null,this._showHideChildren(),t=Object.assign(i.changedProps,t)),e(t,n);else if(this.__instance)if(i||(i=this.__syncInfo={runEffects:e,changedProps:{}}),n)for(const e in t){const t=(0,k.Jz)(e);i.changedProps[t]=this.__dataHost[t]}else Object.assign(i.changedProps,t)},this.__instance=t._stampTemplate(this.__template,n),(0,d.r)(e).insertBefore(this.__instance,this)}__syncHostProperties(){const e=this.__syncInfo;e&&(this.__syncInfo=null,e.runEffects(e.changedProps,!1))}__teardownInstance(){const e=this.__dataHost||this;this.__instance&&(e._removeBoundDom(this.__instance),this.__instance=null,this.__syncInfo=null)}_showHideChildren(){const e=this.__hideTemplateChildren__||!this.if;this.__instance&&Boolean(this.__instance.__hidden)!==e&&(this.__instance.__hidden=e,m(e,this.__instance.templateInfo.childNodes)),e||this.__syncHostProperties()}}:class extends L{constructor(){super(),this.__ctor=null,this.__instance=null,this.__invalidProps=null}__hasInstance(){return Boolean(this.__instance)}__getInstanceNodes(){return this.__instance.children}__createAndInsertInstance(e){this.__ctor||(this.__ctor=C(this.__template,this,{mutableData:!0,forwardHostProp:function(e,t){this.__instance&&(this.if?this.__instance.forwardHostProp(e,t):(this.__invalidProps=this.__invalidProps||Object.create(null),this.__invalidProps[(0,k.Jz)(e)]=!0))}})),this.__instance=new this.__ctor,(0,d.r)(e).insertBefore(this.__instance.root,this)}__teardownInstance(){if(this.__instance){let e=this.__instance.children;if(e&&e.length){let t=(0,d.r)(e[0]).parentNode;if(t){t=(0,d.r)(t);for(let n,i=0;i<e.length&&(n=e[i]);i++)t.removeChild(n)}}this.__invalidProps=null,this.__instance=null}}__syncHostProperties(){let e=this.__invalidProps;if(e){this.__invalidProps=null;for(let t in e)this.__instance._setPendingProperty(t,this.__dataHost[t]);this.__instance._flushProperties()}}_showHideChildren(){const e=this.__hideTemplateChildren__||!this.if;this.__instance&&Boolean(this.__instance.__hidden)!==e&&(this.__instance.__hidden=e,this.__instance._showHideChildren(e)),e||this.__syncHostProperties()}};customElements.define(D.is,D);var R=n(8341),F=n(581);let B=(0,s.o)((e=>{let t=(0,F.SH)(e);return class extends t{static get properties(){return{items:{type:Array},multi:{type:Boolean,value:!1},selected:{type:Object,notify:!0},selectedItem:{type:Object,notify:!0},toggle:{type:Boolean,value:!1}}}static get observers(){return["__updateSelection(multi, items.*)"]}constructor(){super(),this.__lastItems=null,this.__lastMulti=null,this.__selectedMap=null}__updateSelection(e,t){let n=t.path;if(n==JSCompiler_renameProperty("items",this)){let n=t.base||[],i=this.__lastItems;if(e!==this.__lastMulti&&this.clearSelection(),i){let e=(0,R.c)(n,i);this.__applySplices(e)}this.__lastItems=n,this.__lastMulti=e}else if(t.path==`${JSCompiler_renameProperty("items",this)}.splices`)this.__applySplices(t.value.indexSplices);else{let e=n.slice(`${JSCompiler_renameProperty("items",this)}.`.length),t=parseInt(e,10);e.indexOf(".")<0&&e==t&&this.__deselectChangedIdx(t)}}__applySplices(e){let t=this.__selectedMap;for(let n=0;n<e.length;n++){let i=e[n];t.forEach(((e,n)=>{e<i.index||(e>=i.index+i.removed.length?t.set(n,e+i.addedCount-i.removed.length):t.set(n,-1))}));for(let e=0;e<i.addedCount;e++){let n=i.index+e;t.has(this.items[n])&&t.set(this.items[n],n)}}this.__updateLinks();let n=0;t.forEach(((e,i)=>{e<0?(this.multi?this.splice(JSCompiler_renameProperty("selected",this),n,1):this.selected=this.selectedItem=null,t.delete(i)):n++}))}__updateLinks(){if(this.__dataLinkedPaths={},this.multi){let e=0;this.__selectedMap.forEach((t=>{t>=0&&this.linkPaths(`${JSCompiler_renameProperty("items",this)}.${t}`,`${JSCompiler_renameProperty("selected",this)}.${e++}`)}))}else this.__selectedMap.forEach((e=>{this.linkPaths(JSCompiler_renameProperty("selected",this),`${JSCompiler_renameProperty("items",this)}.${e}`),this.linkPaths(JSCompiler_renameProperty("selectedItem",this),`${JSCompiler_renameProperty("items",this)}.${e}`)}))}clearSelection(){this.__dataLinkedPaths={},this.__selectedMap=new Map,this.selected=this.multi?[]:null,this.selectedItem=null}isSelected(e){return this.__selectedMap.has(e)}isIndexSelected(e){return this.isSelected(this.items[e])}__deselectChangedIdx(e){let t=this.__selectedIndexForItemIndex(e);if(t>=0){let e=0;this.__selectedMap.forEach(((n,i)=>{t==e++&&this.deselect(i)}))}}__selectedIndexForItemIndex(e){let t=this.__dataLinkedPaths[`${JSCompiler_renameProperty("items",this)}.${e}`];if(t)return parseInt(t.slice(`${JSCompiler_renameProperty("selected",this)}.`.length),10)}deselect(e){let t=this.__selectedMap.get(e);if(t>=0){let n;this.__selectedMap.delete(e),this.multi&&(n=this.__selectedIndexForItemIndex(t)),this.__updateLinks(),this.multi?this.splice(JSCompiler_renameProperty("selected",this),n,1):this.selected=this.selectedItem=null}}deselectIndex(e){this.deselect(this.items[e])}select(e){this.selectIndex(this.items.indexOf(e))}selectIndex(e){let t=this.items[e];this.isSelected(t)?this.toggle&&this.deselectIndex(e):(this.multi||this.__selectedMap.clear(),this.__selectedMap.set(t,e),this.__updateLinks(),this.multi?this.push(JSCompiler_renameProperty("selected",this),t):this.selected=this.selectedItem=t)}}}))(A.H3);class H extends B{static get is(){return"array-selector"}static get template(){return null}}customElements.define(H.is,H);var z=n(3734),$=n(1322),j=n(3027);const V=new z.ZP;window.ShadyCSS||(window.ShadyCSS={prepareTemplate(e,t,n){},prepareTemplateDom(e,t){},prepareTemplateStyles(e,t,n){},styleSubtree(e,t){V.processStyles(),(0,$.wW)(e,t)},styleElement(e){V.processStyles()},styleDocument(e){V.processStyles(),(0,$.wW)(document.body,e)},getComputedStyleValue:(e,t)=>(0,$.B7)(e,t),flushCustomStyles(){},nativeCss:j.rd,nativeShadow:j.WA,cssBuild:j.Cp,disableRuntime:j.jF}),window.ShadyCSS.CustomStyleInterface=V;var U=n(9836);const q="include",Y=window.ShadyCSS.CustomStyleInterface;class K extends HTMLElement{constructor(){super(),this._style=null,Y.addCustomStyle(this)}getStyle(){if(this._style)return this._style;const e=this.querySelector("style");if(!e)return null;this._style=e;const t=e.getAttribute(q);return t&&(e.removeAttribute(q),e.textContent=(0,U.jv)(t)+e.textContent),this.ownerDocument!==window.document&&window.document.head.appendChild(this),this._style}}let J;window.customElements.define("custom-style",K),J=a._mutablePropertyChange,Boolean,n(1121),(0,i.x)(HTMLElement).prototype},9669:(e,t,n)=>{n.d(t,{$T:()=>r,CN:()=>i,mA:()=>s});const i=/(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,r=/(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,s=/@media\s(.*)/},1322:(e,t,n)=>{n.d(t,{B7:()=>s,OH:()=>o,wW:()=>r});var i=n(9669);function r(e,t){for(let n in t)null===n?e.style.removeProperty(n):e.style.setProperty(n,t[n])}function s(e,t){const n=window.getComputedStyle(e).getPropertyValue(t);return n?n.trim():""}function o(e){const t=i.$T.test(e)||i.CN.test(e);return i.$T.lastIndex=0,i.CN.lastIndex=0,t}},3734:(e,t,n)=>{n.d(t,{ZP:()=>c});let i,r=null,s=window.HTMLImports&&window.HTMLImports.whenReady||null;function o(e){requestAnimationFrame((function(){s?s(e):(r||(r=new Promise((e=>{i=e})),"complete"===document.readyState?i():document.addEventListener("readystatechange",(()=>{"complete"===document.readyState&&i()}))),r.then((function(){e&&e()})))}))}const a="__seenByShadyCSS",l="__shadyCSSCachedStyle";let p=null,d=null;class c{constructor(){this.customStyles=[],this.enqueued=!1,o((()=>{window.ShadyCSS.flushCustomStyles&&window.ShadyCSS.flushCustomStyles()}))}enqueueDocumentValidation(){!this.enqueued&&d&&(this.enqueued=!0,o(d))}addCustomStyle(e){e[a]||(e[a]=!0,this.customStyles.push(e),this.enqueueDocumentValidation())}getStyleForCustomStyle(e){if(e[l])return e[l];let t;return t=e.getStyle?e.getStyle():e,t}processStyles(){const e=this.customStyles;for(let t=0;t<e.length;t++){const n=e[t];if(n[l])continue;const i=this.getStyleForCustomStyle(n);if(i){const e=i.__appliedElement||i;p&&p(e),n[l]=e}}return e}}c.prototype.addCustomStyle=c.prototype.addCustomStyle,c.prototype.getStyleForCustomStyle=c.prototype.getStyleForCustomStyle,c.prototype.processStyles=c.prototype.processStyles,Object.defineProperties(c.prototype,{transformCallback:{get:()=>p,set(e){p=e}},validateCallback:{get:()=>d,set(e){let t=!1;d||(t=!0),d=e,t&&this.enqueueDocumentValidation()}}})},3027:(e,t,n)=>{n.d(t,{Cp:()=>s,WA:()=>i,jF:()=>a,rd:()=>l});const i=!(window.ShadyDOM&&window.ShadyDOM.inUse);let r,s;function o(e){r=(!e||!e.shimcssproperties)&&(i||Boolean(!navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/)&&window.CSS&&CSS.supports&&CSS.supports("box-shadow","0 0 0 var(--foo)")))}window.ShadyCSS&&void 0!==window.ShadyCSS.cssBuild&&(s=window.ShadyCSS.cssBuild);const a=Boolean(window.ShadyCSS&&window.ShadyCSS.disableRuntime);window.ShadyCSS&&void 0!==window.ShadyCSS.nativeCss?r=window.ShadyCSS.nativeCss:window.ShadyCSS?(o(window.ShadyCSS),window.ShadyCSS=void 0):o(window.WebComponents&&window.WebComponents.flags);const l=r}},t={};function n(i){var r=t[i];if(void 0!==r)return r.exports;var s=t[i]={exports:{}};return e[i](s,s.exports,n),s.exports}n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{n(6550),n(6358);var e=n(299),t=n(3041),i=n(3505),r=n(8876),s=n(1121);(0,i.k)({_template:s.d`
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
`,is:"iron-autogrow-textarea",behaviors:[t.x,e.a],properties:{value:{observer:"_valueChanged",type:String,notify:!0},bindValue:{observer:"_bindValueChanged",type:String,notify:!0},rows:{type:Number,value:1,observer:"_updateCached"},maxRows:{type:Number,value:0,observer:"_updateCached"},autocomplete:{type:String,value:"off"},autofocus:{type:Boolean,value:!1},autocapitalize:{type:String,value:"none"},inputmode:{type:String},placeholder:{type:String},readonly:{type:String},required:{type:Boolean},minlength:{type:Number},maxlength:{type:Number},label:{type:String}},listeners:{input:"_onInput"},get textarea(){return this.$.textarea},get selectionStart(){return this.$.textarea.selectionStart},get selectionEnd(){return this.$.textarea.selectionEnd},set selectionStart(e){this.$.textarea.selectionStart=e},set selectionEnd(e){this.$.textarea.selectionEnd=e},attached:function(){navigator.userAgent.match(/iP(?:[oa]d|hone)/)&&!navigator.userAgent.match(/OS 1[3456789]/)&&(this.$.textarea.style.marginLeft="-3px")},validate:function(){var e=this.$.textarea.validity.valid;return e&&(this.required&&""===this.value?e=!1:this.hasValidator()&&(e=t.x.validate.call(this,this.value))),this.invalid=!e,this.fire("iron-input-validate"),e},_bindValueChanged:function(e){this.value=e},_valueChanged:function(e){var t=this.textarea;t&&(t.value!==e&&(t.value=e||0===e?e:""),this.bindValue=e,this.$.mirror.innerHTML=this._valueForMirror(),this.fire("bind-value-changed",{value:this.bindValue}))},_onInput:function(e){var t=(0,r.vz)(e).path;this.value=t?t[0].value:e.target.value},_constrain:function(e){var t;for(e=e||[""],t=this.maxRows>0&&e.length>this.maxRows?e.slice(0,this.maxRows):e.slice(0);this.rows>0&&t.length<this.rows;)t.push("");return t.join("<br/>")+"&#160;"},_valueForMirror:function(){var e=this.textarea;if(e)return this.tokens=e&&e.value?e.value.replace(/&/gm,"&amp;").replace(/"/gm,"&quot;").replace(/'/gm,"&#39;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").split("\n"):[""],this._constrain(this.tokens)},_updateCached:function(){this.$.mirror.innerHTML=this._constrain(this.tokens)}}),n(438),n(7631),n(9679);var o=n(7122),a=n(8056);(0,i.k)({_template:s.d`
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
`,is:"paper-textarea",behaviors:[a.d0,o.V],properties:{_ariaLabelledBy:{observer:"_ariaLabelledByChanged",type:String},_ariaDescribedBy:{observer:"_ariaDescribedByChanged",type:String},value:{type:String},rows:{type:Number,value:1},maxRows:{type:Number,value:0}},get selectionStart(){return this.$.input.textarea.selectionStart},set selectionStart(e){this.$.input.textarea.selectionStart=e},get selectionEnd(){return this.$.input.textarea.selectionEnd},set selectionEnd(e){this.$.input.textarea.selectionEnd=e},_ariaLabelledByChanged:function(e){this._focusableElement.setAttribute("aria-labelledby",e)},_ariaDescribedByChanged:function(e){this._focusableElement.setAttribute("aria-describedby",e)},get _focusableElement(){return this.inputElement.textarea}})})()})();