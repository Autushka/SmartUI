var cHtmlEditorControl = Class.create();
cHtmlEditorControl.prototype = Object.extend(new cBasicControl(), {
	initialize: function(id, obj) {
		this.basicInitialize(id, obj);
		this.html = "";
		if(obj && obj.html){
			this.setHtml(obj.html, true);
		}
		this.editable = false;
		if(obj && obj.editable){
			this.setEditable(obj.editable, true);
		}
		this.addStyleClass("clear", true);
	},
	
	render: function(){
		var sHtml = "";
		
		sHtml = sHtml + "<div id = \"" + this.getId() + "\" class=\"htmlEditorControl "; 
		for(var i = 0; i < this.styleClasses.length; i++){
			sHtml = sHtml + this.styleClasses[i] + " ";
		}		
		sHtml = sHtml + "\">";
		
		sHtml = sHtml + "<div id = \"" + this.getId() + "Toolbar" + "\" class=\"htmlEditorControlToolbar\"> </div>";
		sHtml = sHtml + "<div id = \"" + this.getId() + "Editor" + "\" class=\"htmlEditorControlEditor\">";
		
		if(this.getHtml()){
			sHtml = sHtml + this.getHtml();
		}
		sHtml = sHtml + "</div>";
		
		sHtml = sHtml + "</div>"; 
		return sHtml;		
	},
	
	onAfterRendering: function(obj){
        $('#' + this.getId() + "Editor").freshereditor({toolbar_selector: "#" + this.getId() + "Toolbar", excludes: ['removeFormat', 'insertheading4']});
        $('#' + this.getId() + "Editor").freshereditor("edit", this.getEditable());
        if(!this.getEditable){
        	$('#' + this.getId() + "Toolbar" ).css("dislay, none");
        }
        else{
        	$('#' + this.getId() + "Toolbar").css("dislay, block");
        }
        
		if(obj){
			$("#" + obj.getId() + "Editor").bind('blur', obj, function(oEvent){
				oEvent.data.setHtml($("#" + obj.getId() + "Editor").html(), true);
			});				
		}
		else{
			var that = this;
			$("#" + this.getId() + "Editor").bind('blur', this, function(oEvent){
				oEvent.data.setHtml($("#" + that.getId() + "Editor").html(), true);
			});	
		}        
	},
	
	getHtml: function(){
		return this.html;
	},
	
	getHtmlContent: function(){
		return $('#' + this.getId() + "Editor").html();
	},
	
	setHtml: function(sHtml, bNotRerender){
		this.html = sHtml;
		if(bNotRerender === false || bNotRerender === undefined){
			this.rerender();			
		}		
	},	
	
	getEditable: function(){
		return this.editable;
	},
	
	setEditable: function(bValue, bNotRerender){
		this.editable = bValue;
		if(bNotRerender === false || bNotRerender === undefined){
			this.rerender();			
		}		
	},	
});