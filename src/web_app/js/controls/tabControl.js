var cTabControl = Class.create();
cTabControl.prototype = Object.extend(new cBasicControl(), {
	initialize: function(id, obj) {
		this.basicInitialize(id, obj);
		
		if(obj.headers === undefined || obj.headers === []){
			console.log("There were no headers provided for the tabControl...");
			return;
		}
		if(obj.content === undefined || obj.content === []){
			console.log("There were no items provided for the tabControl...");
			return;
		}	
		if(obj.headers.length !== obj.content.length){
			console.log("Number of the headers is not equal to the number of the items in the tabControl...");
			return;
		}
		
		this.headers = obj.headers;
		this.content = obj.content;
		
		for(var i = 0; i < this.headers.length; i++){
			this.headers[i].parent = this;
			this.headers[i].addStyleClass("tabControlHeadersItem", true);
			this.headers[i].onClick(this.headers[i], this.onHeaderClick);
		}
		for(var i = 0; i < this.content.length; i++){
			this.content[i].parent = this;
			this.content[i].removeStyleClass("tabControlItem", true);//for the global objects like views
			this.content[i].removeStyleClass("tabControlSelectedItem", true);//for the global objects like views
			
			this.content[i].addStyleClass("tabControlItem", true);
			if(typeof this.content[i].createContent === 'function'){// if content element has it's on method to create content
				this.content[i].removeContent(this.content[i]);
				this.content[i].createContent(this.content[i]);
			}
		}		
		this.bPreviousSelectionFinished = true;
		if(obj.selectedIndex){
			this.setSelectedIndex(obj.selectedIndex);
		}
		else{
			this.setSelectedIndex(0, true);
		}
	},
	
	render: function(){
		
		var sHtml = "";
		sHtml = sHtml + "<div \id=" + this.getId() + " class=\"tabControl ";
		for(var i = 0; i < this.styleClasses.length; i++){
			sHtml = sHtml + this.styleClasses[i] + " ";
		}		
		sHtml = sHtml + "\">";

		sHtml = sHtml + "<div  id=" + this.getId() + "Headers" + " class=\"tabControlHeaders\">";
		for(var i = 0; i < this.headers.length; i++){
			sHtml = sHtml + this.headers[i].render();
		}
		sHtml = sHtml + "</div>";
		
		sHtml = sHtml + "<div  id=" + this.getId() + "Items" + " class=\"tabControlItems\">";
		for(var i = 0; i < this.content.length; i++){
			sHtml = sHtml + this.content[i].render();
		}		
		sHtml = sHtml + "</div>";		
		
		sHtml = sHtml + "</div>";
		return sHtml;			
	},
	
	translate: function(obj){
		if(obj && obj.headers){
			for(var i = 0; i < obj.headers.length; i++){
				obj.headers[i].translate(obj.headers[i]);
			}			
		}
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
	},
	
	getSelectedIndex: function(){
		return this.selectedIndex;
	},
	
	setSelectedIndex: function(iSelectedIndex, bNotRerender){
		if(!this.bPreviousSelectionFinished){
			return;
		}
		this.bPreviousSelectionFinished = false;	
		if(!(iSelectedIndex >= 0 && iSelectedIndex < this.headers.length)){
			console.log("Wrong new selected index specified for the tabControl...");
			this.bPreviousSelectionFinished = true;
			return;
		}
		if(this.getSelectedIndex() !== undefined){
			this.headers[this.getSelectedIndex()].removeStyleClass("tabControlSelectedHeadersItem", true);
			this.content[this.getSelectedIndex()].removeStyleClass("tabControlSelectedItem", true);	
			
			this.headers[this.getSelectedIndex()].addStyleClass("tabControlHeadersItem", true);
			this.content[this.getSelectedIndex()].addStyleClass("tabControlItem", true);	
		}
		
		this.headers[iSelectedIndex].removeStyleClass("tabControlHeadersItem", true);
		this.headers[iSelectedIndex].addStyleClass("tabControlSelectedHeadersItem", true);
		
		this.content[iSelectedIndex].removeStyleClass("tabControlItem", true);
		this.content[iSelectedIndex].addStyleClass("tabControlSelectedItem", true);
		
		if(this.getSelectedIndex() !== undefined && $("#" + this.getId()).length > 0){
			$("#" + this.getId() + " .tabControlItems:first").fadeOut(250, $.proxy(function(){
				for(var i = 0; i < this.headers.length; i++){
					this.headers[i].rerender();
				}
				if(this.content[this.getSelectedIndex()]){
					this.content[this.getSelectedIndex()].rerender(true, true);					
				}
				this.content[iSelectedIndex].rerender();
				setTimeout($.proxy(function(){this.scrollDownItemsArea()}, this), 50);
				$("#" + this.getId()).find(".tabControlItems:first").fadeIn(250, $.proxy(function(){
					this.selectedIndex = iSelectedIndex;
					this.bPreviousSelectionFinished = true;
				}, this));
				
			}, this));			
		}
		else{
			this.selectedIndex = iSelectedIndex;
			this.bPreviousSelectionFinished = true;
		}
	},
	
	onAfterRendering: function(){
		for(var i = 0; i < this.headers.length; i++){
			this.headers[i]._onAfterRendering(this.headers[i]);
		}
	},
	
	onHeaderClick: function(obj){
		for(var i = 0; i < obj.parent.headers.length; i++){
			if(obj.parent.headers[i].getId() === obj.getId()){
				obj.parent.setSelectedIndex(i);
			}
		}
		
	},
	
	scrollDownItemsArea: function(){//Tab content area can have scrolling. This method will scroll down tab content area 
		$("#" + this.getId()).find(".tabControlItems").prop("scrollTop", $("#" + this.getId()).find(".tabControlItems").prop("scrollHeight"));	
	}
});