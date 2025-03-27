import{Wa as W,aa as Y,ia as w,ua as Z,va as J,wa as K,wb as X}from"./chunk-IOXFKTXG.js";import{$b as T,Ba as i,Bc as q,Ca as F,Cc as $,Da as D,Ea as A,Jb as v,Na as R,Nb as L,Oa as V,Ob as u,Pb as d,Rb as k,Sa as E,Va as O,Wa as c,Wb as y,Zc as C,ac as N,bc as b,bd as l,fc as j,ic as I,kc as M,lc as P,mc as H,pc as U,qa as G,qc as z,rc as S,sa as B,sb as g,sc as x,tb as r,tc as Q,ua as _}from"./chunk-6VSO6ENM.js";var nt=["button"],it=["*"];function lt(a,h){if(a&1&&b(0,"mat-pseudo-checkbox",3),a&2){let t=M();d("disabled",t.disabled)}}function rt(a,h){if(a&1&&b(0,"mat-pseudo-checkbox",3),a&2){let t=M();d("disabled",t.disabled)}}var tt=new _("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:st});function st(){return{hideSingleSelectionIndicator:!1,hideMultipleSelectionIndicator:!1}}var et=new _("MatButtonToggleGroup"),dt={provide:X,useExisting:G(()=>ct),multi:!0},ot=0,p=class{constructor(h,t){this.source=h,this.value=t}},ct=(()=>{class a{get name(){return this._name}set name(t){this._name=t,this._markButtonsForCheck()}get value(){let t=this._selectionModel?this._selectionModel.selected:[];return this.multiple?t.map(e=>e.value):t[0]?t[0].value:void 0}set value(t){this._setSelectionByValue(t),this.valueChange.emit(this.value)}get selected(){let t=this._selectionModel?this._selectionModel.selected:[];return this.multiple?t:t[0]||null}get multiple(){return this._multiple}set multiple(t){this._multiple=t,this._markButtonsForCheck()}get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._markButtonsForCheck()}get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(t){this._hideSingleSelectionIndicator=t,this._markButtonsForCheck()}get hideMultipleSelectionIndicator(){return this._hideMultipleSelectionIndicator}set hideMultipleSelectionIndicator(t){this._hideMultipleSelectionIndicator=t,this._markButtonsForCheck()}constructor(t,e){this._changeDetector=t,this._multiple=!1,this._disabled=!1,this._controlValueAccessorChangeFn=()=>{},this._onTouched=()=>{},this._name=`mat-button-toggle-group-${ot++}`,this.valueChange=new c,this.change=new c,this.appearance=e&&e.appearance?e.appearance:"standard",this.hideSingleSelectionIndicator=e?.hideSingleSelectionIndicator??!1,this.hideMultipleSelectionIndicator=e?.hideMultipleSelectionIndicator??!1}ngOnInit(){this._selectionModel=new W(this.multiple,void 0,!1)}ngAfterContentInit(){this._selectionModel.select(...this._buttonToggles.filter(t=>t.checked))}writeValue(t){this.value=t,this._changeDetector.markForCheck()}registerOnChange(t){this._controlValueAccessorChangeFn=t}registerOnTouched(t){this._onTouched=t}setDisabledState(t){this.disabled=t}_emitChangeEvent(t){let e=new p(t,this.value);this._rawValue=e.value,this._controlValueAccessorChangeFn(e.value),this.change.emit(e)}_syncButtonToggle(t,e,o=!1,n=!1){!this.multiple&&this.selected&&!t.checked&&(this.selected.checked=!1),this._selectionModel?e?this._selectionModel.select(t):this._selectionModel.deselect(t):n=!0,n?Promise.resolve().then(()=>this._updateModelValue(t,o)):this._updateModelValue(t,o)}_isSelected(t){return this._selectionModel&&this._selectionModel.isSelected(t)}_isPrechecked(t){return typeof this._rawValue>"u"?!1:this.multiple&&Array.isArray(this._rawValue)?this._rawValue.some(e=>t.value!=null&&e===t.value):t.value===this._rawValue}_setSelectionByValue(t){this._rawValue=t,this._buttonToggles&&(this.multiple&&t?(Array.isArray(t),this._clearSelection(),t.forEach(e=>this._selectValue(e))):(this._clearSelection(),this._selectValue(t)))}_clearSelection(){this._selectionModel.clear(),this._buttonToggles.forEach(t=>t.checked=!1)}_selectValue(t){let e=this._buttonToggles.find(o=>o.value!=null&&o.value===t);e&&(e.checked=!0,this._selectionModel.select(e))}_updateModelValue(t,e){e&&this._emitChangeEvent(t),this.valueChange.emit(this.value)}_markButtonsForCheck(){this._buttonToggles?.forEach(t=>t._markForCheck())}static{this.\u0275fac=function(e){return new(e||a)(r(C),r(tt,8))}}static{this.\u0275dir=A({type:a,selectors:[["mat-button-toggle-group"]],contentQueries:function(e,o,n){if(e&1&&U(n,at,5),e&2){let s;S(s=x())&&(o._buttonToggles=s)}},hostAttrs:["role","group",1,"mat-button-toggle-group"],hostVars:5,hostBindings:function(e,o){e&2&&(u("aria-disabled",o.disabled),k("mat-button-toggle-vertical",o.vertical)("mat-button-toggle-group-appearance-standard",o.appearance==="standard"))},inputs:{appearance:"appearance",name:"name",vertical:[i.HasDecoratorInputTransform,"vertical","vertical",l],value:"value",multiple:[i.HasDecoratorInputTransform,"multiple","multiple",l],disabled:[i.HasDecoratorInputTransform,"disabled","disabled",l],hideSingleSelectionIndicator:[i.HasDecoratorInputTransform,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",l],hideMultipleSelectionIndicator:[i.HasDecoratorInputTransform,"hideMultipleSelectionIndicator","hideMultipleSelectionIndicator",l]},outputs:{valueChange:"valueChange",change:"change"},exportAs:["matButtonToggleGroup"],standalone:!0,features:[q([dt,{provide:et,useExisting:a}]),v]})}}return a})(),at=(()=>{class a{get buttonId(){return`${this.id}-button`}get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(t){this._appearance=t}get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(t){t!==this._checked&&(this._checked=t,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck())}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(t){this._disabled=t}constructor(t,e,o,n,s,m){this._changeDetectorRef=e,this._elementRef=o,this._focusMonitor=n,this._checked=!1,this.ariaLabelledby=null,this._disabled=!1,this.change=new c;let f=Number(s);this.tabIndex=f||f===0?f:null,this.buttonToggleGroup=t,this.appearance=m&&m.appearance?m.appearance:"standard"}ngOnInit(){let t=this.buttonToggleGroup;this.id=this.id||`mat-button-toggle-${ot++}`,t&&(t._isPrechecked(this)?this.checked=!0:t._isSelected(this)!==this._checked&&t._syncButtonToggle(this,this._checked))}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0)}ngOnDestroy(){let t=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),t&&t._isSelected(this)&&t._syncButtonToggle(this,!1,!1,!0)}focus(t){this._buttonElement.nativeElement.focus(t)}_onButtonClick(){let t=this._isSingleSelector()?!0:!this._checked;t!==this._checked&&(this._checked=t,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,!0),this.buttonToggleGroup._onTouched())),this.change.emit(new p(this,this.value))}_markForCheck(){this._changeDetectorRef.markForCheck()}_getButtonName(){return this._isSingleSelector()?this.buttonToggleGroup.name:this.name||null}_isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static{this.\u0275fac=function(e){return new(e||a)(r(et,8),r(C),r(O),r(Y),E("tabindex"),r(tt,8))}}static{this.\u0275cmp=F({type:a,selectors:[["mat-button-toggle"]],viewQuery:function(e,o){if(e&1&&z(nt,5),e&2){let n;S(n=x())&&(o._buttonElement=n.first)}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:12,hostBindings:function(e,o){e&1&&I("focus",function(){return o.focus()}),e&2&&(u("aria-label",null)("aria-labelledby",null)("id",o.id)("name",null),k("mat-button-toggle-standalone",!o.buttonToggleGroup)("mat-button-toggle-checked",o.checked)("mat-button-toggle-disabled",o.disabled)("mat-button-toggle-appearance-standard",o.appearance==="standard"))},inputs:{ariaLabel:[i.None,"aria-label","ariaLabel"],ariaLabelledby:[i.None,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[i.HasDecoratorInputTransform,"disableRipple","disableRipple",l],appearance:"appearance",checked:[i.HasDecoratorInputTransform,"checked","checked",l],disabled:[i.HasDecoratorInputTransform,"disabled","disabled",l]},outputs:{change:"change"},exportAs:["matButtonToggle"],standalone:!0,features:[v,$],ngContentSelectors:it,decls:8,vars:11,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-label-content"],["state","checked","aria-hidden","true","appearance","minimal",1,"mat-mdc-option-pseudo-checkbox",3,"disabled"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"]],template:function(e,o){if(e&1){let n=j();P(),T(0,"button",1,0),I("click",function(){return R(n),V(o._onButtonClick())}),T(2,"span",2),L(3,lt,1,1,"mat-pseudo-checkbox",3)(4,rt,1,1,"mat-pseudo-checkbox",3),H(5),N()(),b(6,"span",4)(7,"span",5)}if(e&2){let n=Q(1);d("id",o.buttonId)("disabled",o.disabled||null),u("tabindex",o.disabled?-1:o.tabIndex)("aria-pressed",o.checked)("name",o._getButtonName())("aria-label",o.ariaLabel)("aria-labelledby",o.ariaLabelledby),g(3),y(3,o.buttonToggleGroup&&o.checked&&!o.buttonToggleGroup.multiple&&!o.buttonToggleGroup.hideSingleSelectionIndicator?3:-1),g(),y(4,o.buttonToggleGroup&&o.checked&&o.buttonToggleGroup.multiple&&!o.buttonToggleGroup.hideMultipleSelectionIndicator?4:-1),g(3),d("matRippleTrigger",n)("matRippleDisabled",o.disableRipple||o.disabled)}},dependencies:[Z,K],styles:[".mat-button-toggle-standalone,.mat-button-toggle-group{position:relative;display:inline-flex;flex-direction:row;white-space:nowrap;overflow:hidden;-webkit-tap-highlight-color:rgba(0,0,0,0);transform:translateZ(0);border-radius:var(--mat-legacy-button-toggle-shape)}.mat-button-toggle-standalone:not([class*=mat-elevation-z]),.mat-button-toggle-group:not([class*=mat-elevation-z]){box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)}.cdk-high-contrast-active .mat-button-toggle-standalone,.cdk-high-contrast-active .mat-button-toggle-group{outline:solid 1px}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard,.mat-button-toggle-group-appearance-standard{border-radius:var(--mat-standard-button-toggle-shape);border:solid 1px var(--mat-standard-button-toggle-divider-color)}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard .mat-pseudo-checkbox,.mat-button-toggle-group-appearance-standard .mat-pseudo-checkbox{--mat-minimal-pseudo-checkbox-selected-checkmark-color: var( --mat-standard-button-toggle-selected-state-text-color )}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard:not([class*=mat-elevation-z]),.mat-button-toggle-group-appearance-standard:not([class*=mat-elevation-z]){box-shadow:none}.cdk-high-contrast-active .mat-button-toggle-standalone.mat-button-toggle-appearance-standard,.cdk-high-contrast-active .mat-button-toggle-group-appearance-standard{outline:0}.mat-button-toggle-vertical{flex-direction:column}.mat-button-toggle-vertical .mat-button-toggle-label-content{display:block}.mat-button-toggle{white-space:nowrap;position:relative;color:var(--mat-legacy-button-toggle-text-color);font-family:var(--mat-legacy-button-toggle-label-text-font);font-size:var(--mat-legacy-button-toggle-label-text-size);line-height:var(--mat-legacy-button-toggle-label-text-line-height);font-weight:var(--mat-legacy-button-toggle-label-text-weight);letter-spacing:var(--mat-legacy-button-toggle-label-text-tracking);--mat-minimal-pseudo-checkbox-selected-checkmark-color: var( --mat-legacy-button-toggle-selected-state-text-color )}.mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay{opacity:var(--mat-legacy-button-toggle-focus-state-layer-opacity)}.mat-button-toggle .mat-icon svg{vertical-align:top}.mat-button-toggle .mat-pseudo-checkbox{margin-right:12px}[dir=rtl] .mat-button-toggle .mat-pseudo-checkbox{margin-right:0;margin-left:12px}.mat-button-toggle-checked{color:var(--mat-legacy-button-toggle-selected-state-text-color);background-color:var(--mat-legacy-button-toggle-selected-state-background-color)}.mat-button-toggle-disabled{color:var(--mat-legacy-button-toggle-disabled-state-text-color);background-color:var(--mat-legacy-button-toggle-disabled-state-background-color);--mat-minimal-pseudo-checkbox-disabled-selected-checkmark-color: var( --mat-legacy-button-toggle-disabled-state-text-color )}.mat-button-toggle-disabled.mat-button-toggle-checked{background-color:var(--mat-legacy-button-toggle-disabled-selected-state-background-color)}.mat-button-toggle-appearance-standard{color:var(--mat-standard-button-toggle-text-color);background-color:var(--mat-standard-button-toggle-background-color);font-family:var(--mat-standard-button-toggle-label-text-font);font-size:var(--mat-standard-button-toggle-label-text-size);line-height:var(--mat-standard-button-toggle-label-text-line-height);font-weight:var(--mat-standard-button-toggle-label-text-weight);letter-spacing:var(--mat-standard-button-toggle-label-text-tracking)}.mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard+.mat-button-toggle-appearance-standard{border-left:solid 1px var(--mat-standard-button-toggle-divider-color)}[dir=rtl] .mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard+.mat-button-toggle-appearance-standard{border-left:none;border-right:solid 1px var(--mat-standard-button-toggle-divider-color)}.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle-appearance-standard+.mat-button-toggle-appearance-standard{border-left:none;border-right:none;border-top:solid 1px var(--mat-standard-button-toggle-divider-color)}.mat-button-toggle-appearance-standard.mat-button-toggle-checked{color:var(--mat-standard-button-toggle-selected-state-text-color);background-color:var(--mat-standard-button-toggle-selected-state-background-color)}.mat-button-toggle-appearance-standard.mat-button-toggle-disabled{color:var(--mat-standard-button-toggle-disabled-state-text-color);background-color:var(--mat-standard-button-toggle-disabled-state-background-color)}.mat-button-toggle-appearance-standard.mat-button-toggle-disabled .mat-pseudo-checkbox{--mat-minimal-pseudo-checkbox-disabled-selected-checkmark-color: var( --mat-standard-button-toggle-disabled-selected-state-text-color )}.mat-button-toggle-appearance-standard.mat-button-toggle-disabled.mat-button-toggle-checked{color:var(--mat-standard-button-toggle-disabled-selected-state-text-color);background-color:var(--mat-standard-button-toggle-disabled-selected-state-background-color)}.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay{background-color:var(--mat-standard-button-toggle-state-layer-color)}.mat-button-toggle-appearance-standard:not(.mat-button-toggle-disabled):hover .mat-button-toggle-focus-overlay{opacity:var(--mat-standard-button-toggle-hover-state-layer-opacity)}.mat-button-toggle-appearance-standard.cdk-keyboard-focused:not(.mat-button-toggle-disabled) .mat-button-toggle-focus-overlay{opacity:var(--mat-standard-button-toggle-focus-state-layer-opacity)}@media(hover: none){.mat-button-toggle-appearance-standard:not(.mat-button-toggle-disabled):hover .mat-button-toggle-focus-overlay{display:none}}.mat-button-toggle-label-content{-webkit-user-select:none;user-select:none;display:inline-block;padding:0 16px;line-height:var(--mat-legacy-button-toggle-height);position:relative}.mat-button-toggle-appearance-standard .mat-button-toggle-label-content{padding:0 12px;line-height:var(--mat-standard-button-toggle-height)}.mat-button-toggle-label-content>*{vertical-align:middle}.mat-button-toggle-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:inherit;pointer-events:none;opacity:0;background-color:var(--mat-legacy-button-toggle-state-layer-color)}.cdk-high-contrast-active .mat-button-toggle-checked .mat-button-toggle-focus-overlay{border-bottom:solid 500px;opacity:.5;height:0}.cdk-high-contrast-active .mat-button-toggle-checked:hover .mat-button-toggle-focus-overlay{opacity:.6}.cdk-high-contrast-active .mat-button-toggle-checked.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay{border-bottom:solid 500px}.mat-button-toggle .mat-button-toggle-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-button-toggle-button{border:0;background:none;color:inherit;padding:0;margin:0;font:inherit;outline:none;width:100%;cursor:pointer}.mat-button-toggle-disabled .mat-button-toggle-button{cursor:default}.mat-button-toggle-button::-moz-focus-inner{border:0}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard{--mat-focus-indicator-border-radius:var(--mat-standard-button-toggle-shape)}.mat-button-toggle-group-appearance-standard .mat-button-toggle:last-of-type .mat-button-toggle-button::before{border-top-right-radius:var(--mat-standard-button-toggle-shape);border-bottom-right-radius:var(--mat-standard-button-toggle-shape)}.mat-button-toggle-group-appearance-standard .mat-button-toggle:first-of-type .mat-button-toggle-button::before{border-top-left-radius:var(--mat-standard-button-toggle-shape);border-bottom-left-radius:var(--mat-standard-button-toggle-shape)}"],encapsulation:2,changeDetection:0})}}return a})(),Gt=(()=>{class a{static{this.\u0275fac=function(e){return new(e||a)}}static{this.\u0275mod=D({type:a})}static{this.\u0275inj=B({imports:[w,J,at,w]})}}return a})();export{ct as a,at as b,Gt as c};
