var cTextAreaControl = Class.create();
cTextAreaControl.prototype = Object.extend(new cBasicControl(), {
	initialize: function(id, obj) {
		this.basicInitialize(id, obj);
		if(obj){
			if(obj.rows){
				this.rows = obj.rows;				
			}
			if(obj.cols){
				this.cols = obj.cols;				
			}
			if(obj.text){
				this.text = obj.text;				
			}
			if(obj.spellcheck){
				this.spellcheck = obj.spellcheck;
			}
			else{
				this.spellcheck = false;
			}			
		}
		
	},
	
	render: function(){
		var sHtml = "";
		sHtml = sHtml + "<textarea  id=" + this.getId() + " rows=" + this.getRows() +  " cols=" + this.getCols() +" class=\"textAreaControl ";
		for(var i = 0; i < this.styleClasses.length; i++){
			sHtml = sHtml + this.styleClasses[i] + " ";
		}		
		sHtml = sHtml + "\" spellcheck=" + this.spellcheck + ">";
		if(this.getText()){
			sHtml = sHtml + this.getText();			
		}

		sHtml = sHtml + "</textarea>";
		return sHtml;		
	},
	
	getRows: function(){
		return this.rows;
	},
	
	setRows: function(iRows){
		this.rows = iRows;
		this.rerender();
	},
	
	getCols: function(){
		return this.cols;		
	},
	
	setCols: function(iCols){
		this.cols = iCols;
		this.rerender();		
	},	
	
	getText: function(){
		return this.text;		
	},
	
	setText: function(sText){
		this.text = sText;
		if(this.text !== sText){
			this.text = "";
			alert("Bad content in the textArea! TextArea's content was removed...");
			this.rerender();
			return;
		}		
		this.rerender();		
	},	
	
	onAfterRendering: function(){
		$("#" + this.getId()).bind('blur', this, function(oEvent){
			oEvent.data.setText($("#" + this.id).val(), true);
		});		
	},
	
//	onBlur: function(obj, fnEventHandler){
//		var that = this;
//		var fnOnAfterRendering = this.onAfterRendering;
//		this.onAfterRendering = function(){
//			fnOnAfterRendering(that);
//			$("#" + that.getId()).bind('blur', that, function(){
//				fnEventHandler(that);
//			});
//		};		
//	},	
});