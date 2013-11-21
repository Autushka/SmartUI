var cPanelControl = Class.create();
cPanelControl.prototype = Object.extend(new cBasicControl(), {
	initialize: function(id, obj) {
		this.basicInitialize(id, obj);
		this.content = [];
		if(obj && obj.content){
			this.content = obj.content;
		}
		this.headerText = "";
		if(obj && obj.text){
			this.setHeaderText(obj.headerText, true);
		}

		this.headerTextCode = "";
		if(obj && obj.headerTextCode){
			this.setHeaderTextCode(obj.headerTextCode, true);
		}	
		this.headerTextCodeParameters = [];
		if(obj && obj.headerTextCodeParameters){
			this.setHeaderTextCodeParameters(obj.headerTextCodeParameters, true);
		}			
		
		this.headerLb = new cLabelControl(this.getId() + "HeaderLb", {
			text: this.getHeaderText(),
			textCode: this.getHeaderTextCode(),
			textCodeParameters: this.getHeaderTextCodeParameters(),
		});
		this.headerLb.addStyleClass("panelHeaderLb", true);
		
		this.collapseImg = new cImageControl(this.getId() + "HeaderCollapseImg", {
			 url: "img/expand.gif"
		});
		this.collapseImg.addStyleClass("panelHeaderImg", true);
		
		this.headerWp = new cWrapperControl(this.getId() + "HeaderWp", {content: [this.headerLb, this.collapseImg]});
		this.headerWp.addStyleClass("panelHeader", true);
		this.headerWp.onClick(this, this.onHeaderWpClick);
		
		this.expanded = false;
		if(obj && obj.expanded){
			this.setExpanded(obj.expanded);
		}
	},
	
	getHeaderText: function(){
		if(this.getHeaderTextCode() !== ""){
			var aClone = this.headerTextCodeParameters.slice(0);
			return UI_CONSTANTS.fnTextCodesHandeler(this.getHeaderTextCode(), aClone);
		}
		else{
			return this.headerText;
		}		
	},
	
	setHeaderText: function(sValue, bNotRerender){
		this.headerText = htmlEncode(sValue);//toUnicode(sText);
		if(bNotRerender === false || bNotRerender === undefined){
			this.rerender();			
		}			
	},
	
	getHeaderTextCode: function(){
		return this.headerTextCode;
	},
	
	setHeaderTextCode: function(sValue, bNotRerender){
		this.headerTextCode = sValue;
		if(bNotRerender === false || bNotRerender === undefined){
			this.rerender();			
		}		
	},
	
	getHeaderTextCodeParameters: function(){
		return this.headerTextCodeParameters;		
	},
	
	setHeaderTextCodeParameters: function(aValues, bNotRerender){
		this.textCodeParameters = aValues;
		if(bNotRerender === false || bNotRerender === undefined){
			this.rerender();			
		}			
	},
	
	getExpanded: function(){
		return this.expanded;
	},
	
	setExpanded: function(bValue){
		this.expanded = bValue;
	}, 
	
	render: function(){
		var sHtml = "";
		
		sHtml = sHtml + "<div";
		
		if(this.getId()){
			sHtml = sHtml + " id = \"" + this.getId() + "\"";
		}
		sHtml = sHtml + " class=\"panelControl "; 			

		for(var i = 0; i < this.styleClasses.length; i++){
			sHtml = sHtml + this.styleClasses[i] + " ";
		}		
		sHtml = sHtml + "\">";

		sHtml = sHtml + this.headerWp.render();
		
		sHtml = sHtml + "<div class=\"panelControlContent";
		
		if(this.expanded === false){
			sHtml = sHtml + "\" style=\"display: none;";
		}		
		sHtml = sHtml + "\">";
		
		for(var i = 0; i < this.content.length; i++){
			sHtml = sHtml + this.content[i].render();
		}	
		
		sHtml = sHtml + "</div>"; 
		
		sHtml = sHtml + "</div>"; 
		return sHtml;		
	},
	
	onHeaderWpClick: function(obj){
		obj.setExpanded(!obj.getExpanded());
		
		if(obj.getExpanded() === true){
			//$('#' + obj.getId() + ' .panelControlContent').removeClass('hiddenElement');
			obj.collapseImg.setUrl("img/collapse.gif");
			$('#' + obj.getId() + ' .panelControlContent').slideDown('slow');
		}
		else{
			//$('#' + obj.getId() + ' .panelControlContent').removeClasse('hiddenElement');
			obj.collapseImg.setUrl("img/expand.gif");
			$('#'+ obj.getId() + ' .panelControlContent').slideUp('slow');
		}		
		
		//$('#target').slideDown('slow');
		//some animation logic...
	},
	
//	onCollapseImgClick: function(obj){
//		if(!obj.bExpanded){
//			$("#" + obj.getId() + " .panelControlContent").removeClass("hiddenElement");
//			obj.oCollapseImg.setUrl("img/collapse.gif");
//			obj.bExpanded = true;
//		}
//		else{
//			$("#" + obj.getId() + " .panelControlContent").addClass("hiddenElement");
//			obj.oCollapseImg.setUrl("img/expand.gif");
//			obj.bExpanded = false;
//		}
//	},
//	
	onAfterRendering: function(){
			this.headerWp._onAfterRendering(this.headerWp);
	},
//	
//	onClick: function(obj, fnEventHandler){
//		var that = this;
//		var fnOnAfterRendering = this.onAfterRendering;
//		this.onAfterRendering = function(){
//			fnOnAfterRendering(that);
//			$("#" + that.id).unbind();//to clear all bindings first...
//			$("#" + that.id).bind('click', obj, function(){
//				fnEventHandler(obj);
//			});
//		};
//	},	
});