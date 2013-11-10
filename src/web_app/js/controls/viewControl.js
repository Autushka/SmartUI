var cViewControl = Class.create();
cViewControl.prototype  = Object.extend(new cBasicControl(), {
	initialize: function(id, obj) {
		this.basicInitialize(id, obj);
		if(obj){
			if(obj.content){
				this.content = obj.content;
			}
			else{
				this.content = [];
			}
			if(obj.oTitle){
				this.oTitle = obj.oTitle;
			}
			if(obj.isStatic){
				this.isStatic = obj.isStatic;
			}			
			if(obj.roleDependentContent === false){
				this.roleDependentContent = obj.roleDependentContent;
			}
			else{
				this.roleDependentContent = true;				
			}
			if(obj.oAllowedRoles){
				this.oAllowedRoles = obj.oAllowedRoles;
			}
		}
	},
	
	render: function(){
		var sHtml = "";
		sHtml = "<div id=" + this.id + " class=\"viewControl ";
		
		for(var i = 0; i < this.styleClasses.length; i++){
			sHtml = sHtml + this.styleClasses[i] + " ";
		}		
		sHtml = sHtml + "\">";
		
		if(this.oTitle){
			sHtml = sHtml + "<div id=" + this.id + "Title class=viewControlTitle>" + this.oTitle.render() + "</div>";
		}
		sHtml = sHtml + "<div id=" + this.id + "Content class=viewControlContent>"; 
		for(var i = 0; i < this.content.length; i++){
			sHtml = sHtml + this.content[i].render();
		}
		sHtml = sHtml + "</div>";
		sHtml = sHtml + "</div>"; 
		return sHtml;		
	},
	
	translate: function(obj){
		if(obj && obj.oTitle){
			obj.oTitle.translate(obj.oTitle);			
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
	
	createContent: function(sRole){	
		if(!this.getRoleDependentContent()){
			this._createContentForGuest();
			return;
		}
		switch(sRole){
			case "Guest":
				this._createContentForGuest();
				break;			
			case "Member":
				this._createContentForMember();
				break;
			case "Performer":
				this._createContentForPerformer();
				break;	
			case "TechnicalAdministrator":
				this._createContentForTechAdmin();
				break;					
		}
	},
	
	_createContentForGuest: function(){},
	_createContentForMember: function(){},
	_createContentForPerformer: function(){},
	_createContentForTechAdmin: function(){},
	_createContent: function(){},
	
	_exitGuest: function(){},
	_exitMember: function(){},
	_exitPerformer: function(){},	
	

	onExit: function(){},
	
	_onExit: function(bRefreshContent){
		fnExecutOnExit(this);		
	},
	
	getRoleDependentContent: function(){
		return this.roleDependentContent;
	},
	
	setRoleDependentContent: function(bValue){
		this.roleDependentContent = bValue;
		this.rerender();		
	},
	
	getTitle: function(){
		return this.oTitle;
	},
	
	setTitle: function(oValue, bNotRerender){
		this.oTitle = oValue;
		if(bNotRerender === false || bNotRerender === undefined){
			this.rerender();			
		}
	},
	
	getTitleTextId: function(){
		return this.titleTextId;
	},
	
	setTitleTextId: function(sValue){
		this.titleTExtId = sValue;

	},	
	
	onExit: function(sRole){},
	
	exitConfirmation: function(){
		return true;
	},
	
	onAfterRendering: function(obj, bWithoutOnViewInstanceAfterRendering){
		if(!this.isStatic){
			var iOccupiedSpace = $("#header").height() + $("#navigationPanel").height();
			iOccupiedSpace = iOccupiedSpace + $("#" + this.getId() + "Content").height() + $("#footer").height() + 32;
			
			if(iOccupiedSpace < $(window).height()){
				$("#contentArea").css("min-height", $("#" + this.getId() + "Content").height() + $(window).height() - iOccupiedSpace + "px");
//				var iFooterMarginTop = $(window).height() - $("#header").height() - $("#navigationPanel").height();
//				iFooterMarginTop = iFooterMarginTop - $("#contentArea").height() - $("#footer").height() - 32;
//				$("#footer").css("margin-top", iFooterMarginTop + "px");
			}			
		}
		if(!bWithoutOnViewInstanceAfterRendering){
			this.onViewInstanceAfterRendering();			
		}

	},
	
	onViewInstanceAfterRendering: function(){}
});


	
