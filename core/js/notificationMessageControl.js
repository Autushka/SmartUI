var cNotificationMessageControl = Class.create();
cNotificationMessageControl.prototype = Object.extend(new cBasicControl(), {
	initialize: function(id, obj) {
		this.basicInitialize(id, obj);
		this.type = "S";
		if(obj && obj.type){
			this.setType(obj.type);
		}
		this.text = "";
		if(obj && obj.text){
			this.setText(obj.text);
		}		
		this.textCode = "";
		if(obj && obj.textCode){
			this.textCode = obj.textCode;
		}	
		this.textCodeParameters = [];
		if(obj && obj.textCodeParameters){
			this.textCodeParameters = obj.textCodeParameters;
		}	
		
		this.duration = UI_CONSTANTS.defaultNotificationMessageDuration;
		if(obj && obj.duration){
			this.duration = obj.duration;
		}		
		
		switch (this.type){
			case "E":
				this.addStyleClass("notificationErrorMessage", true);
				break;
			case "S":
				this.addStyleClass("notificationSuccessMessage", true);
				break;
			case "W":
				this.addStyleClass("notificationWorningMessage", true);
				break;			
		}		
	},
	
	render: function(){
		var sHtml = "";
		sHtml = sHtml + "<div id = \"" + this.getId() + "\" class=\"notificationMessageControl "; 
		for(var i = 0; i < this.styleClasses.length; i++){
			sHtml = sHtml + this.styleClasses[i] + " ";
		}		
		sHtml = sHtml + "\">";
		if(this.getTextCode() !== ""){
			var aClone = [];
			if(this.textCodeParameters){
				aClone = this.textCodeParameters.slice(0);// copy of the array...
			}
			sHtml = sHtml + UI_CONSTANTS.fnTextCodesHandeler(this.getTextCode(), aClone);
		}
		else
		{
			sHtml = sHtml + this.getText();
		}
		sHtml = sHtml + "</div>"; 
		return sHtml;		
	},
	
	getText: function(){
		if(this.getTextCode() !== ""){
			var aClone = this.textCodeParameters.slice(0);
			return UI_CONSTANTS.fnTextCodesHandeler(this.getTextCode(), aClone);
		}
		else{
			return this.text;
		}
	},
	
	setText: function(sText){
		this.text = htmlEncode(sText);
	},
	
	getTextCodeParameters: function(){
		return this.textCodeParameters;
	},
	
	setTextCodeParameters: function(aTextCodeParameters){
		this.textCodeParameters = aTextCodeParameters;
	},	
	
	getTextCode: function(){
		return this.textCode;
	},
	
	setTextCode: function(sTextCode){
		this.textCode = sTextCode;
	},	
	
	getType: function(){
		return this.type;
	},
	
	setType: function(sType){
		this.type = sType;
	},		
	
	onAfterRendering: function(obj){
		var iLeftValue = parseInt(($( document ).width() - $("#" + obj.getId()).width())/2);// centering the message horizontally...
		$("#" + obj.getId()).css("left", iLeftValue + "px");
		
		obj.timeOutId = setTimeout($.proxy(function(){
			$("#" + this.getId()).fadeOut("slow", $.proxy(function(){
				this.destroy();
			}, this));
		}, obj), obj.duration);

		$("#" + obj.getId()).bind('click', obj, function(oEvent){
			clearTimeout(oEvent.data.timeOutId);
			//oEvent.data.destroy();
			$("#" + obj.getId()).fadeOut("slow", $.proxy(function(){
				this.destroy();
			}, obj));			
		});		
	}
});