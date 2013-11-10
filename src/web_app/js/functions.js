function navigateToView(sPlaceHolder, oFromView, oToView, bRefreshContent, bTriggeredFromHistory, bWithoutAnimation){
	if(oFromView){ 
		if(sGlobalRole === ""){
			sGlobalRole = getUserRole();	
		}
		var sRole = sGlobalRole;	
		
		if(!oToView.isStatic){
			if(!checkAuthorizationForNavigation(oToView, sRole)){
				//showNotificationMessage("E", "global.NavigationNotAllowed", null, [oToView.getId()]);
				history.replaceState(null, null, "#" + oCurrentView.getId());
				return;
			}		
		}			
		
		if(sRole != "Guest"){
			var bShouldProceed = oFromView.exitConfirmation();
			
			if(!bShouldProceed){
				history.replaceState(null, null, "#" + oCurrentView.getId());
				return false;
			}			
		}
	
		oFromView._onExit();
	}
	
	if(oToView.content.length == 0 || bRefreshContent === true){
		oToView.removeContent(oToView);
		oToView.createContent(sRole);		
		
		if(oToView.content){	
			for(var i = 0; i < oToView.content.length; i++){// there is nor recursion yet, so only one child view is supported...
				if(typeof oToView.content[i].createContent === 'function'){// if content element has it's on method to create content
					oToView.content[i].createContent(sRole);
				}
			}
		}		
	}

	if(oToView.isStatic){ // for static views oCurrentView should not be changed while the navigation
		$("#" + sPlaceHolder).html("");
		oToView.placeAt(sPlaceHolder);		
		return;
	}
	
	if(!bWithoutAnimation){
		$("#" + sPlaceHolder).fadeOut(250, $.proxy(function(){
			$("#" + sPlaceHolder).html("");
			oToView.placeAt(sPlaceHolder);
			
			$("#" + sPlaceHolder).fadeIn(250, $.proxy(function(){
				oCurrentView = oToView;
				console.log("oCurrentView was set to " + oToView.getId());
				if(!bTriggeredFromHistory){
					history.pushState(null, null, "#" + oCurrentView.getId());//as first parameter any object can be past and will be available for the popstate 
				}				
			}));
		}, this));		
	}
	else{
		$("#" + sPlaceHolder).html("");
		oToView.placeAt(sPlaceHolder);
		oCurrentView = oToView;
		console.log("oCurrentView was set to " + oToView.getId());
		if(!bTriggeredFromHistory){
			history.pushState(null, null, "#" + oCurrentView.getId());//as first parameter any object can be past and will be available for the popstate 
		}
		
	}
}

function checkAuthorizationForNavigation(oToView, sRole){
	if(oToView.oAllowedRoles){
		if(oToView.oAllowedRoles[sRole]){
			return true;
		}
		else{
			return false;
		}
	}
	else{
		return true;
	}
}

function ajaxRequest(sUrl, oData, bAsync, oMessageVL, oEventHandeler){
	$.ajax({
		  type: "POST",
		  async: bAsync,		  
		  url: sUrl,
		  data: oData,
		  beforeSend: function(){
			  if(oMessageVL){
				  oMessageVL.removeMessages();
				  oMessageVL.showBusyIndicator();
			  }
		  },		  
		  success: function(oData) {
			  if(oMessageVL){
				  oMessageVL.hideBusyIndicator();				  
			  }
			  if(oEventHandeler && oEventHandeler.onSuccess){
				  oEventHandeler.onSuccess(oData);
			  }
		  },
		  error: function(oData) {
			  if(oMessageVL){
				  oMessageVL.hideBusyIndicator();				  
			  }
			  if(oEventHandeler && oEventHandeler.onError){
				  oEventHandeler.onError(oData);
			  }			  
		  }
	});		
}

function getParameterByName(sName)
{
	var sURL = location.href.replace("#", "");	
	sName = sName.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+sName+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( sURL );
	if( results == null )
		return "";
	else
		return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function initializeSessionVariables(){
	 ajaxRequest("jsp/initializeSessionVariables.jsp", {}, false, null);	
}

function login(sUserName, sPassword, bFromSignInView){
	if(bFromSignInView){
		sPassword = CryptoJS.MD5(sPassword).toString();
	}
	ajaxRequest("jsp/account/login.jsp", {userName: sUserName, password: sPassword}, true, oSignInView.oSignInFieldsVL, {
		 onSuccess: $.proxy(function(oData){
			  var json = $.parseJSON(oData);
			  if(json.messages.length == 0){//when successfully loged in
				  //var sRole = getUserRole();
				  var oProfileData = getProfileData();
				  sGlobalRole = getUserRole(oProfileData);
				  sGlobalUserName = oProfileData.userName;				  
				  
				  switch (sGlobalRole){
				  	case "Performer":
				  		navigateToView("contentArea", oCurrentView, oPerformerAreaView, true);
				  		break;
				  	case "TechnicalAdministrator":
				  		navigateToView("contentArea", oCurrentView, oTechnicalAdministratorAreaView, true);
				  		break;	
				  	default:
				  		navigateToView("contentArea", oCurrentView, oOpenRoomsView);
				  		break;				  		
				  }
				  navigateToView("header", oHeaderView, oHeaderView, true);
				  navigateToView("navigationPanel", oNavigationView, oNavigationView, true);
				  oNavigationView.oSignInLb.setTextCode('navigationView.SignOut');				  
			  }
			  else{
				  showBackEndMessages(null, oData);
			  }
		}, this),
	});		
}

function showBackEndMessages(oVL, data){//only one backend message is supported so far...
	var json = $.parseJSON(data);
	var sMessageType;
	for(var i = 0; i < json.messages.length; i++){
		sMessageType = "";
		switch(json.messages[i].messageCode.toString().substring(0,1)){
			case "1":
				sMessageType = "S";
				break;
			case "2":
				sMessageType = "E";
				break;
			case "3":
				sMessageType = "W";				
				break;			
		}
		if(oVL){
			oVL.addMessage(jQuery.i18n.prop('messages.m' + json.messages[i].messageCode.toString()), sMessageType);			
		}
		else{
			showNotificationMessage(sMessageType, 'messages.m' + json.messages[i].messageCode.toString());
		}
	}
}

function showNotificationMessage(sType, sText, iDuration, aTextCodeParameters){
		$("#notificationMessage").remove();
	    var oNotivicationMessage = new cNotificationMessageControl("notificationMessage",{
		   type: sType,
		   textCode: sText,
		   textCodeParameters: aTextCodeParameters
	    });
	    if(iDuration){
	    	oNotivicationMessage.setDuration(iDuration);
	    }
	    
	    oNotivicationMessage.placeAt("html");		
}

function getProfileData()
{
	var oProfileData = {};
	ajaxRequest("jsp/account/getProfileData.jsp", {}, false, null, {
		 onSuccess: $.proxy(function(oData){
			  jsonArray = JSON.parse(oData);
			  if(jsonArray[0] === null){
				  oProfileData.roles = ["Guest"];
				  oProfileData.userName = "Guest";
			  }
			  else{
				  oProfileData = jsonArray[0];
			  }
		}, this)		
	});			

	return oProfileData;
}

function getUserRole(oProfileData){
//	var oProfileData = getProfileData();
	//console.log("getProfileData was called from getUserRole");
	var sRole = "Guest";
	var bIsPerformer = false;
	
	if(oProfileData && oProfileData.usersRolesRelations){
		for(var i = 0; i < oProfileData.usersRolesRelations.length; i++){
			if(oProfileData.usersRolesRelations[i].role === "performer"){
				sRole = "Performer";
				bIsPerformer = true;
			}
		}
		if(!bIsPerformer){
			for(var i = 0; i < oProfileData.usersRolesRelations.length; i++){
				if(oProfileData.usersRolesRelations[i].role === "member"){
					sRole = "Member";
				}
			}		
		}
		for(var i = 0; i < oProfileData.usersRolesRelations.length; i++){
			if(oProfileData.usersRolesRelations[i].role === "technicalAdministrator"){
				sRole = "TechnicalAdministrator";
				bIsPerformer = true;
			}
		}		
	}
	return sRole;
}

function emailVerification(sEV){
	var bSuccess = false;
	ajaxRequest("jsp/account/eMailVerify.jsp",{eMailVerCode: sEV}, false, null, {
		 onSuccess: $.proxy(function(oData){
			  var json = $.parseJSON(oData);
			  if(json.messages.length != 0){//when successfully verified
				  bSuccess = true;
			  }
		}, this)		
	});		
	return bSuccess;
}

function prVerification(sPR){
	var bSuccess = false;
	ajaxRequest("jsp/account/passwordRecoveryVerify.jsp",{passwordRecoveryCode: sPR}, false, null, {
		 onSuccess: $.proxy(function(oData){
			  var json = $.parseJSON(oData);
			  if(json.messages.length != 0){//when successfully verified
				  bSuccess = true;
			  }
		}, this)		
	});	
	return bSuccess;	
}

function hasTooLongWords(sText, iWhatIsTooLong){
	var aWords = sText.split(" ");
	var bHasTooLongWords = false;
	for(var i = 0; i < aWords.length; i++){
		if(aWords[i].length >= iWhatIsTooLong){
			bHasTooLongWords = true;			
		}
	}
	return bHasTooLongWords;
}

function fnExecutOnExit(obj){
	for(var i = 0; i < obj.content.length; i++){
		if( obj.content[i].content !== undefined &&  obj.content[i].content !== 0){
			fnExecutOnExit( obj.content[i]);
		}
	}
	if(typeof obj.onExit === 'function'){

		obj.onExit();						
	}
}

function toUnicode(theString) {
	  var unicodeString = "";
	  for (var i=0; i < theString.length; i++) {
	    var theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
	    while (theUnicode.length < 4) {
	      theUnicode = "0" + theUnicode;
	    }
	    theUnicode = "\\u" + theUnicode;
	    unicodeString += theUnicode;
	  }
	  return unicodeString;
}

function htmlEncode(str)
{
	if(typeof str.replace === 'function'){
		str = str.replace(/>/g, "&gt;");
		str = str.replace(/</g, "&lt;");
		str = str.replace(/"/g, "&quot;");
		str = str.replace(/'/g, "&#039;");
		str = str.replace(/\(/g, "&#40;"); // \.*?+[{|()^$ must be preceded by a backslash to be seen as literal. For example, \.
		str = str.replace(/\)/g, "&#41;"); 
		str = str.replace(/{/g, "&#123;");
		str = str.replace(/}/g, "&#125;");		
	}
	return str;
}

function getCurrentChatRoom(){
	var sCurrentRoom;
	ajaxRequest("jsp/chat/getCurrentChatRoom.jsp",{}, false, null, {
		 onSuccess: $.proxy(function(sValue){
			 sCurrentRoom = sValue;
		})		
	});		
	return sCurrentRoom;	
}

function getCurrentProfile(){
	var sCurrentProfile;
	ajaxRequest("jsp/account/getCurrentProfile.jsp",{}, false, null, {
		 onSuccess: $.proxy(function(sValue){
			 sCurrentProfile = sValue;
		})		
	});		
	return sCurrentProfile;	
}


function replaceURLWithHTMLLinks(text)
{
  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  return text.replace(exp,"<a href='$1' target=\"_tab\">$1</a>"); 
}
