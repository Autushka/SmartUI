var cVideoControl = Class.create();
cVideoControl.prototype = Object.extend(new cBasicControl(), {
	initialize: function(id, obj) {
		this.basicInitialize(id, obj);
		if(obj){
			if(obj.src){
				this.src = obj.src;				
			}
			if(obj.height){
				this.height = obj.height;			
			}
			if(obj.width){
				this.width = obj.width;			
			}			
		}
	},
	
	getSrc: function(){
		return this.src;
	},
	
	setSrc: function(sSrc){
		this.src = sSrc;
		this.rerender();		
	},	
	
	getHeight: function(){
		return this.height;
	},
	
	setHeight: function(sHeight){
		this.height = sHeight;
		this.rerender();		
	},	
	
	getWidth: function(){
		return this.width;
	},
	
	setWidth: function(sWidth){
		this.width = sWidth;
		this.rerender();		
	},		
	
	render: function(){
		var sHtml = "";
		sHtml = sHtml + "<video id=" + this.id + " class=\"videoControl "; 
		for(var i = 0; i < this.styleClasses.length; i++){
			sHtml = sHtml + this.styleClasses[i] + " ";
		}		
		sHtml = sHtml + "\" height=\"" +  this.height  + "\" width=\"" + this.width +"\" controls>";
		sHtml = sHtml + "<source src=\"" + this.src + "\"" + "type=\"video/mp4\" >" + "</video>"; 
		return sHtml;		
	},
});