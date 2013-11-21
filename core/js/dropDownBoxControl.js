var cDropDownBoxControl = Class.create();
cDropDownBoxControl.prototype = Object.extend(new cBasicControl(), {
	initialize: function(id, obj) {
		this.basicInitialize(id, obj);
		if(obj.value){
			this.value = obj.value;				
		}
		if(obj.items){
			this.items = obj.items;
		}
		else{
			this.items = [];
		}
	},
	
	render: function(){
		var sHtml = "";
		sHtml = sHtml + "<select id = \"" + this.getId() + "\" class=\"dropDownBoxControl "; 
		for(var i = 0; i < this.styleClasses.length; i++){
			sHtml = sHtml + this.styleClasses[i] + " ";
		}		
		sHtml = sHtml + "\">";
		for(var i = 0; i < this.items.length; i++){
			sHtml = sHtml + "<option value=\"" + this.items[i].getText() + "\">" + this.items[i].getText() + "</option>";
		}
		sHtml = sHtml + "</select>"; 
		return sHtml;		
	},
	
	getValue: function(){
		return this.value;
	},
	
	setValue: function(sValue, bNotRerender){
		this.value = sValue;
		if(bNotRerender === false || bNotRerender === undefined){
			//this.rerender();
			$("#" + this.getId()).val(sValue);
		}		
	},	
	
	onAfterRendering: function(obj){
		if(obj){
			$("#" + obj.getId()).bind('change', obj, function(oEvent){
				oEvent.data.setValue($("#" + obj.getId()).val(), true);
			});				
		}
		else{
			var that = this;
			$("#" + this.getId()).bind('change', this, function(oEvent){
				oEvent.data.setValue($("#" + that.getId()).val(), true);
			});	
		}		
	},
	
//	onChange: function(obj, fnEventHandler){
//		var that = this;
//		var fnOnAfterRendering = this.onAfterRendering;
//		this.onAfterRendering = function(){
//			fnOnAfterRendering(that);
//			$("#" + that.id).bind('change', obj, function(){
//				fnEventHandler(obj);
//			});
//		};
//	}	
});