var cButtonControl = Class.create();
cButtonControl.prototype = Object.extend(new cBasicControl(), {
	initialize: function(id, obj) {
		this.basicInitialize(id, obj);
		if(obj && obj.text){
			this.text = obj.text;
		}
		if(obj && obj.disabled){
			this.disabled = true;
		}
		else{
			this.disabled = false;
		}
		this.textCode = "";
		if(obj && obj.textCode){
			this.textCode = obj.textCode;
		}	
		this.textCodeParameters = [];
		if(obj && obj.textCodeParameters){
			this.textCodeParameters = obj.textCodeParameters;
		}		
	},
	
	render: function(){
		var sHtml = "";
		sHtml = sHtml + "<button id = " + this.id + " class=\"buttonControl "; 
		for(var i = 0; i < this.styleClasses.length; i++){
			sHtml = sHtml + this.styleClasses[i] + " ";
		}
		sHtml = sHtml + "\"";
		if(this.disabled){
			sHtml = sHtml + " disabled";
		}
		sHtml = sHtml + ">";
		if(this.getTextCode() !== ""){
			var aClone = this.textCodeParameters.slice(0);// copy of the array...
			sHtml = sHtml + UI_CONSTANTS.fnTextCodesHandeler(this.getTextCode(), aClone);
		}
		else
		{
			sHtml = sHtml + this.getText();
		}		

		sHtml = sHtml + "</button>"; 
		return sHtml;		
	},
	
	getText: function(){
		if(this.getTextCode() !== ""){
			var aClone = this.textCodeParameters.slice(0);
			return UI_CONSTANTS.fnTextCodesHandeler(this.getTextCode(), aClone);
		}
		else{
			return this.text;
		}
	},
	
	setText: function(sText, bNotRerender){
		this.text = sText;
		if(bNotRerender === false || bNotRerender === undefined){
			this.rerender();			
		}		
	},	
	
	getDisabled: function(){
		return this.disabled;
	},
	
	setDisabled: function(bValue, bNotRerender){
		this.disabled = bValue;
		if(bNotRerender === false || bNotRerender === undefined){
			this.rerender();			
		}		
	},
	
	getTextCode: function(){
		return this.textCode;
	},
	
	setTextCode: function(sTextCode, bNotRerender){
		this.textCode = sTextCode;
		if(bNotRerender === false || bNotRerender === undefined){
			this.rerender();			
		}		
	},		

	onClick: function(obj, fnEventHandler){
		var that = this;
		var fnOnAfterRendering = this.onAfterRendering;
		this.onAfterRendering = function(){
			fnOnAfterRendering(that);
			$("#" + that.id).unbind();//to clear all bindings first...
			$("#" + that.id).bind('click', obj, function(){
				fnEventHandler(obj);
			});
		};
	},
	
	translate: function(){
		this.setTextCode(this.getTextCode());
	}	

});