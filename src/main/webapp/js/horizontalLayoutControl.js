var cHorizontalLayoutControl = Class.create();
cHorizontalLayoutControl.prototype = Object.extend(new cBasicControl(), {
	initialize: function(id, obj) {
		this.basicInitialize(id, obj);
		if(obj && obj.content){
			this.content = obj.content;
		}
		else{
			this.content = [];
		}
		this.contentItemStyleClass = "horizontalLayoutItem";
	},
	
	render: function(){
		var sHtml = "";
		sHtml = sHtml + "<table id=" + this.id + " class=\"horizontalLayoutControl "; 
		for(var i = 0; i < this.styleClasses.length; i++){
			sHtml = sHtml + this.styleClasses[i] + " ";
		}		
		sHtml = sHtml + "\">";
		sHtml = sHtml + "<tr>"; 
		for(var i = 0; i < this.content.length; i++){
			sHtml = sHtml + "<td class=\"horizontalLayoutControlContentItem\">";
			sHtml = sHtml + this.content[i].render();
			sHtml = sHtml + "</td>";
		}		
		sHtml = sHtml + "</tr>"; 
		sHtml = sHtml + "</table>"; 
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