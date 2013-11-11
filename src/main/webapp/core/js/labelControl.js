var cLabelControl = Class.create();
cLabelControl.prototype = Object.extend(new cBasicControl(), {
	initialize: function(id, obj) {
		this.basicInitialize(id, obj);
		this.text = "";
		if(obj && obj.text){
			//this.text = obj.text;
			this.setText(obj.text);
		}
		this.backgroundImg = "";	
		if(obj && obj.backgroundImg){
			this.backgroundImg = obj.backgroundImg;
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
		
		sHtml = sHtml + "<span";
		
		if(this.getId()){
			sHtml = sHtml + " id = \"" + this.getId() + "\"";
		}
		
		sHtml = sHtml + " class=\"labelControl "; 
		for(var i = 0; i < this.styleClasses.length; i++){
			sHtml = sHtml + this.styleClasses[i] + " ";
		}		
		sHtml = sHtml + "\">";
		if(this.getTextCode() !== ""){
			var aClone = [];
			if(this.textCodeParameters){
				aClone = this.textCodeParameters.slice(0);// copy of the array...
			}
			sHtml = sHtml + UI_CONSTANTS.fnTextCodesHandeler(this.getTextCode(), aClone);
		}
		else
		{
			sHtml = sHtml + this.getText();
		}
		sHtml = sHtml + "</span>"; 
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
		this.text = htmlEncode(sText);//toUnicode(sText);
		if(bNotRerender === false || bNotRerender === undefined){
			this.rerender();			
		}		
	},
	
	getTextCodeParameters: function(){
		return this.textCodeParameters;
	},
	
	setTextCodeParameters: function(aTextCodeParameters, bNotRerender){
		this.textCodeParameters = aTextCodeParameters;
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
	
	getBackgroundImg: function(){
		return this.backgroundImg;
	},
	
	setBackgroundImg: function(sValue){
		this.backgroundImg = sValue;
		this.rerender();		
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
	
	onAfterRendering: function(obj){
		if(obj.getBackgroundImg() !== "" && obj.getBackgroundImg() !== undefined){
			$("#" + obj.getId()).css('background-image', "url(\"" + obj.getBackgroundImg() + "\")");
			$("#" + obj.getId()).css('background-repeat', "no-repeat");
			$("#" + obj.getId()).css('background-size', "cover");
		}
	},
	
	translate: function(){
		this.setTextCode(this.getTextCode());
	}
});