var cAudioControl = Class.create();
cAudioControl.prototype = Object.extend(new cBasicControl(), {
	initialize: function(id, obj) {
		this.basicInitialize(id, obj);
		if(obj && obj.src){
			this.src = obj.src;
		}
	},
	
	render: function(){
		var sHtml = "";
		sHtml = sHtml + "<audio id = \"" + this.getId() + "\" class=\"audioControl "; 
		for(var i = 0; i < this.styleClasses.length; i++){
			sHtml = sHtml + this.styleClasses[i] + " ";
		}		
		sHtml = sHtml + "\">";
		sHtml = sHtml + "<source src=" + this.getSrc() + "></source>"
		sHtml = sHtml + "</audio>"; 
		return sHtml;		
	},
	
	getSrc: function(){
		return this.src;
	},
	
	setSrc: function(sSrc){
		this.src = sSrc;
		this.rerender();		
	},	
});