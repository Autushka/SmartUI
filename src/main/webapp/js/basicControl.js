var cBasicControl = Class.create();
cBasicControl.prototype = {
	
	basicInitialize: function(id, obj) {
		this.id = id;		
		this.styleClasses = [];
	},
	initialize: function() {},
	
	render: function(){},
	
	destroy: function(){
		$("#" + this.id).remove();
		$("#" + this.id).unbind();			
	},
	
	placeAt: function(sDomElement){
		this._onBeforeRendering(this);		
		var sHtml = this.render();
		$($("#" + sDomElement)[0]).append(sHtml);
		this._onAfterRendering(this);	
	},
	
	rerender: function(bWithoutOnBeforeRendering, bWithoutOnAfterRendering){
		if(!bWithoutOnBeforeRendering){
			this._onBeforeRendering(this);			
		}
		
		var sHtml = this.render();
		var index = $($("#" + this.id).parent()[0]).children().index($("#" + this.id));
		$($($("#" + this.id).parent()[0]).children()[index]).after(sHtml);
		this.destroy();//I guess here also recursion is needed for the children...

		if(!bWithoutOnAfterRendering){
			this._onAfterRendering(this);			
		}		
	},
	
	addStyleClass: function(sClassName, bNotRerender){
		this.removeStyleClass(sClassName, true);//to prevent duplicated classes 
		this.styleClasses.push(sClassName);
		if(bNotRerender === false || bNotRerender === undefined){
			this.rerender();
		}
	},	
	
	removeStyleClass: function(sClassName, bNotRerender){
		for(var i = 0; i < this.styleClasses.length; i++){
			if(this.styleClasses[i] == sClassName){
				this.styleClasses.splice(i, 1);
				break;				
			}
		}
		if(bNotRerender === false || bNotRerender === undefined){
			this.rerender();
		}		
	},	
	
	hasStyleClass: function(sClassName){
		for(var i = 0; i < this.styleClasses.length; i++){
			if(this.styleClasses[i] == sClassName){
				return true;
			}
		}	
		return false;
	},
	
	onBeforeRendering: function(){},
	
	_onBeforeRendering: function(obj){
		obj.onBeforeRendering();
		if(obj && obj.content && obj.content.length){
			for(var i = 0; i < obj.content.length; i++){
				obj.content[i]._onBeforeRendering(obj.content[i]);
			}
		}		
	},
	
	onAfterRendering: function(obj){},

	_onAfterRendering: function(obj){
		obj.onAfterRendering(obj);			

		this.onContentAfterRendering(obj);
		
		this.onFinalAfterRendering(obj);
	},	
	
	onContentAfterRendering: function(obj){
		if(obj && obj.content && obj.content.length){
			for(var i = 0; i < obj.content.length; i++){
				obj.content[i]._onAfterRendering(obj.content[i]);
			}
		}		
	},
	
	onFinalAfterRendering: function(obj){
		
	},
	
	addContent: function(aContentItems){
		for(var i = 0; i < aContentItems.length; i++){
			this.content.push(aContentItems[i]);
		}
	},
	
	removeContent: function(obj){
		for(var i = 0; i < obj.content.length; i++){
			if(obj.content[i].content && obj.content[i].length > 0){
				obj.removeContent(obj.content[i]);
			}
		}
		while(obj.content.length){
			obj.content.splice(0, 1);
		}		
	},	
	
	getId: function(){
		return this.id;
	},
	
	translate: function(obj){
        if(!obj || !obj.content){
            return;     
         }  		
		for(var i = 0; i < obj.content.length; i++){
			if(obj.content[i].content && obj.content[i].content.length > 0){
				obj.content[i].translate(obj.content[i]);
			}
		}
		for(var i = 0; i < obj.content.length; i++){
			obj.content[i].translate();
		}
	}
};