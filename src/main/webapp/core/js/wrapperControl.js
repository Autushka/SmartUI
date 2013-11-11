var cWrapperControl = Class.create();
cWrapperControl.prototype = Object.extend(new cBasicControl(), {
	initialize: function(id, obj) {
		this.basicInitialize(id, obj);
		if(obj && obj.content){
			this.content = obj.content;
		}
		else{
			this.content = [];
		}
	},
	
	render: function(){
		var sHtml = "";
		
		sHtml = sHtml + "<div";
		
		if(this.getId()){
			sHtml = sHtml + " id = \"" + this.getId() + "\"";
		}
		
		sHtml = sHtml + " class=\"wrapperControl "; 			

		for(var i = 0; i < this.styleClasses.length; i++){
			sHtml = sHtml + this.styleClasses[i] + " ";
		}		
		sHtml = sHtml + "\">";

		for(var i = 0; i < this.content.length; i++){
			sHtml = sHtml + this.content[i].render();
		}	
		
		sHtml = sHtml + "</div>"; 
		return sHtml;		
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

});