var cCheckBoxControl = Class.create();
cCheckBoxControl.prototype = Object.extend(new cBasicControl(), {
	initialize: function(id, obj) {
		this.basicInitialize(id, obj);
		if(obj){
			if(obj.label){
				this.label = obj.label;				
			}
			if(obj.name){
				this.name = obj.name;				
			}
			if(obj.checked){
				this.checked = obj.checked;				
			}		
			if(obj.disabled){
				this.disabled = obj.disabled;				
			}				
		}
	},
	
	setLabel: function(sValue){
		this.label = sValue;
		this.rerender();		
	},
	
	getLabel: function(){
		return this.label;		
	},
	
	setName: function(sValue){
		this.name = sValue;
		this.rerender();		
	},
	
	getName: function(){
		return this.name;		
	},	
	
	setChecked: function(bValue){
		this.checked = bValue;
		this.rerender();
	},	
	
	setDisabled: function(bValue){
		this.disabled = bValue;
		this.rerender();
	},
	
	getChecked: function(){
		return this.checked;
	},
	
	getDisabled: function(){
		return this.disabled;
	},
	
	render: function(){
		var sHtml = "";
		sHtml = sHtml + "<div id=" + this.getId() + " class=\"checkBoxControl ";
		for(var i = 0; i < this.styleClasses.length; i++){
			sHtml = sHtml + this.styleClasses[i] + " ";
		}			
		sHtml = sHtml + "\">";
		sHtml = sHtml + " <input id=" + this.getId() + "Content" + " type=checkbox name=" + this.getName();
		if(this.getChecked()){
			sHtml = sHtml + " checked=checked";
		}
		if(this.getDisabled()){
			sHtml = sHtml + " disabled=disabled";
		}		
		sHtml = sHtml + ">" + "<span>" + this.getLabel() + "</span>";
		sHtml = sHtml + "</div>";
		return sHtml;		
	},
	
	onClick: function(obj, fnEventHandler){
		var that = this;
		var fnOnAfterRendering = this.onAfterRendering;
		this.onAfterRendering = function(){
			fnOnAfterRendering(that);
			$("#" + that.getId() + "Content").bind('click', that, function(){
				fnEventHandler(that);
			});
		};
	},
});

