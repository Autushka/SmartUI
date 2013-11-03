var cImageControl = Class.create();
cImageControl.prototype = Object.extend(new cBasicControl(), {
	initialize: function(id, obj) {
		this.basicInitialize(id, obj);
		this.url = "";
		if(obj && obj.url){
			this.url = obj.url;
		}
	},
	
	render: function(){
		var sHtml = "";
		sHtml = sHtml + "<span id=" + this.getId() +"Wrapper >";
		sHtml = sHtml + "<img id='" + this.getId() + "' src='" + this.getUrl() + "' class=\"imageControl ";
		for(var i = 0; i < this.styleClasses.length; i++){
			sHtml = sHtml + this.styleClasses[i] + " ";
		}		
		sHtml = sHtml + "\">";		
		sHtml = sHtml + "</span>";
		return sHtml;		
	},
	
	getUrl: function(){
		return this.url;
	},
	
	refresh: function(sUrl){
		$( "#" + this.getId() ).attr( "src", this.getUrl() );
	},
	
	setUrl: function(sUrl){
		this.url = sUrl;
		if (this.url !== "") this.refresh();
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