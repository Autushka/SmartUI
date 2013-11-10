var cVerticalLayoutControl = Class.create();
cVerticalLayoutControl.prototype = Object.extend(new cBasicControl(), {
	initialize: function(id, obj) {
		this.basicInitialize(id, obj);
		if(obj && obj.content){
			this.content = obj.content;
		}
		else{
			this.content = [];
		}
		this.contentItemStyleClass = "verticalLayoutItem";
	},
	
	render: function(){
		var sHtml = "";
		sHtml = sHtml + "<table id=" + this.id + " class=\"verticalLayoutControl "; 
		for(var i = 0; i < this.styleClasses.length; i++){
		sHtml = sHtml + this.styleClasses[i] + " ";
	}		
	sHtml = sHtml + "\">";		
		for(var i = 0; i < this.content.length; i++){
			sHtml = sHtml + "<tr class=\"verticalLayoutControlContentItem\">";
			sHtml = sHtml + "<td>";
			sHtml = sHtml + this.content[i].render();
			sHtml = sHtml + "</td>";			
			sHtml = sHtml + "</tr>";
		}
		sHtml = sHtml + "</table>"; 
		return sHtml;		
	},
	
	removeMessages: function(){
		$("#" + this.getId() + " .verticalLayoutMessage").remove();
	},
	
	addMessage: function(sMessage, sMessageType){
		this.removeMessages();
		var oMessage = new cLabelControl(this.getId() + "Message",{text: sMessage});		
		var oImage = new cImageControl(this.getId() + "Icon", {
			url: ""
		});			 
	
		var sMessageHtml = "<tr class=\"verticalLayoutMessage\">";
		switch (sMessageType){
			case "E":
				oImage.setUrl("img/alert_red_16.png");
				break;
			case "S":
				oImage.setUrl("img/accept_16.png");
				break;
			case "W":
				oImage.setUrl("img/alert_orange_16.png");
				break;				
		}
		sMessageHtml = sMessageHtml + "<td>";
		sMessageHtml = sMessageHtml + oImage.render();	
		sMessageHtml = sMessageHtml + "</td>";	
		sMessageHtml = sMessageHtml + "<td>";		
		sMessageHtml = sMessageHtml + oMessage.render();
		sMessageHtml = sMessageHtml + "</td>";			
		sMessageHtml = sMessageHtml + "</tr>";		

		$("#" + this.getId()).append(sMessageHtml);
	},
	
	appendContent: function(oItem){
		this.content.push(oItem);

		var sHtmlToAppend = "<tr class=\"verticalLayoutControlContentItem\">";
		sHtmlToAppend = sHtmlToAppend + "<td>";
		sHtmlToAppend = sHtmlToAppend + oItem.render();	
		sHtmlToAppend = sHtmlToAppend + "</td>";
		sHtmlToAppend = sHtmlToAppend + "</tr>";	
		
		$("#" + this.getId()).append(sHtmlToAppend);
		oItem._onAfterRendering(oItem);
	},
	
	showBusyIndicator: function(){
		var oImage = new cImageControl(this.getId() + "BusyIndicator", {
			url: "img/busyIndicator.gif"
		});	
		
		var sBusyIndicatorHtml = "<tr class=\"verticalLayoutBusyIndicator\">";
		sBusyIndicatorHtml = sBusyIndicatorHtml + "<td>";
		sBusyIndicatorHtml = sBusyIndicatorHtml + oImage.render();	
		sBusyIndicatorHtml = sBusyIndicatorHtml + "</td>";	
		sBusyIndicatorHtml = sBusyIndicatorHtml + "</tr>";	
		
		$("#" + this.getId()).append(sBusyIndicatorHtml);		
	},
	
	hideBusyIndicator: function(){
		$("#" + this.getId() + " .verticalLayoutBusyIndicator").remove();
	}
});