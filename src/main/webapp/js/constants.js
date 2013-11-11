var CONSTANTS = (function ($) {
	var constants = {};
	// General Constants 
	constants.defaultUILanguage = 'en';
	constants.avatarServiceURL = "http://en.gravatar.com/";
	constants.FMServerURL = "rtmp://qww7c0.live.cloud.influxis.com/qww7c0/_definst_/";
	constants.trDescriptionPayPalCompleted = "PayPalCompleted";
	constants.trDescriptionPayPalPending = "PayPalPending";
	constants.refreshParticipantsInterval = 3000;
	
	constants.fnTextCodesHandeler = function(sTextCode, aParameters){// part of the UI lib...
		if(aParameters.length >= 1){
			aParameters.unshift(sTextCode); //add element to the beginning of the array
			return jQuery.i18n.prop.apply(undefined, aParameters); //apply can call function with dynamic array of parameters
		}
		else{
			return jQuery.i18n.prop(sTextCode);
		}
		
	};
	constants.defaultNotificationMessageDuration = 5000;
	return constants;
}(jQuery));