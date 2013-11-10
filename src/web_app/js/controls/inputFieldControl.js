var cInputFieldControl = Class.create();
cInputFieldControl.prototype = Object.extend(new cBasicControl(), {
	initialize: function(id, obj) {
		this.basicInitialize(id, obj);
		if(obj.type){
			this.type = obj.type;
		}
		if(obj.readonly){
			this.readonly = obj.readonly;
		}
		else{
			this.readonly = false;
		}
		if(obj.value){
			this.value = obj.value;
		}
		else{
			this.value = "";
		}
		if(obj.spellcheck){
			this.spellcheck = obj.spellcheck;
		}
		else{
			this.spellcheck = false;
		}
	},
	
	render: function(){
		var sHtml = "";
		sHtml = sHtml + "<input id=" + this.id + " type=" + this.type + " class=\"inputFieldControl ";
		for(var i = 0; i < this.styleClasses.length; i++){
			sHtml = sHtml + this.styleClasses[i] + " ";
		}		
		if(this.getValue()){
			sHtml = sHtml + "\" value=\"" + this.getValue();
		}
		sHtml = sHtml + "\"";
		if(this.getReadonly()){
			sHtml = sHtml + " readonly=redonly";
		}	
		sHtml = sHtml + " spellcheck=" + this.spellcheck + ">";
		
		return sHtml;		
	},

	setReadonly: function(bValue, bNotRerender){
		this.readonly = bValue;
		if(bNotRerender === false || bNotRerender === undefined){
			this.rerender();			
		}	
	},
	
	getReadonly: function(){
		return this.readonly;
	},
	
	setValue: function(sValue, bNotRerender){
		this.value = sValue; //toUnicode(sValue);
		if(bNotRerender === false || bNotRerender === undefined){
			this.rerender();			
		}
	},
	
	getValue: function(){
		return this.value;
	},
	
	getType: function(){
		return this.type;
	},
	
	onAfterRendering: function(obj){
		if(obj){
			$("#" + obj.getId()).bind('blur', obj, function(oEvent){
				oEvent.data.setValue($("#" + obj.getId()).val(), true);
			});				
		}
		else{
			var that = this;
			$("#" + this.getId()).bind('blur', this, function(oEvent){
				oEvent.data.setValue($("#" + that.getId()).val(), true);
			});	
		}
	},
	
	onKeyUp: function(obj, fnEventHandler){
		var that = this;
		var fnOnAfterRendering = this.onAfterRendering;
		this.onAfterRendering = function(){
			fnOnAfterRendering(that);
			$("#" + that.id).bind('keyup', obj, function(event){
				event.data.setValue($("#" + obj.getId()).val(), true);
				fnEventHandler(obj, event);
			});
		};
	},		
	
	setFocus: function(){
		$('#' + this.getId()).focus();
	},
	
});