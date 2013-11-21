var cHtmlControl = Class.create();
cHtmlControl.prototype = Object.extend(new cBasicControl(), {
	initialize: function(id, obj) {
		this.basicInitialize(id, obj);
		if(obj && obj.html){
			this.html = obj.html;
		}
	},
	
	render: function(){
		var sHtml = "";
		sHtml = sHtml + "<div id = \"" + this.getId() + "\" class=\"htmlControl "; 
		for(var i = 0; i < this.styleClasses.length; i++){
			sHtml = sHtml + this.styleClasses[i] + " ";
		}		
		sHtml = sHtml + "\">";
		if(this.getHtml()){
			sHtml = sHtml + this.getHtml();
		}
		sHtml = sHtml + "</div>"; 
		return sHtml;		
	},
	
	getHtml: function(){
		return this.html;
	},
	
	setHtml: function(sHtml){
		this.html = sHtml;
		this.rerender();		
	},	
});