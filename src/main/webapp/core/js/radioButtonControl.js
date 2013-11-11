var cRadioButtonControl = Class.create();
cRadioButtonControl.prototype = Object.extend(new cBasicControl(), {
	initialize: function(id, obj) {
		this.basicInitialize(id, obj);
		this.label = "";
		if(obj && obj.label){
			this.label = obj.label;
		}			
		this.name = "";
		if(obj && obj.name){
			this.name = obj.name;
		}	
		this.checked = false;
		if(obj.checked){
			this.checked = obj.checked;				
		}			
		this.labelCode = "";
		if(obj && obj.labelCode){
			this.labelCode = obj.labelCode;
		}	
		this.labelCodeParameters = [];
		if(obj && obj.labelCodeParameters){
			this.labelCodeParameters = obj.labelCodeParameters;
		}			
	},
	
	render: function(){
		var sHtml = "";
		sHtml = sHtml + "<div id=" + this.getId() + " class=\"radioButtonControl ";
		for(var i = 0; i < this.styleClasses.length; i++){
			sHtml = sHtml + this.styleClasses[i] + " ";
		}			
		sHtml = sHtml + "\">";
		
		sHtml = sHtml + "<table><tr><td>";
		sHtml = sHtml + "<input id=" + this.getId() + "Content" + " type=radio name =" + this.getName();
		if(this.getChecked() ){
			sHtml = sHtml + " checked=checked";
		}
		sHtml = sHtml + ">";
		sHtml = sHtml + "</td>";		
		sHtml = sHtml + "<td>";
		sHtml = sHtml + "<span>";
		if(this.getLabelCode() !== ""){
			var aClone = this.labelCodeParameters.slice(0);// copy of the array...
			sHtml = sHtml + CONSTANTS.fnTextCodesHandeler(this.getLabelCode(), aClone);
		}
		else
		{
			sHtml = sHtml + this.getLabel();
		}		
		sHtml = sHtml + "</span>";
		sHtml = sHtml + "</td> </tr> </table>  ";
		sHtml = sHtml + "</div>";
		return sHtml;		
	},
	
	getLabel: function(){
		return this.label;
	},
	
	setLabel: function(sLabel){
		this.label = sLabel;
		this.rerender();
	},
	
	getName: function(){
		return this.name;
	},
	
	setName: function(sName){
		this.name = sName;
		this.rerender();
	},
	
	getChecked: function(){
		return this.checked;
	},
	
	setChecked: function(sChecked){
		this.checked = sChecked;
		this.rerender();
	},	
	
	setParent: function(obj){
		this.parent = obj;
	},
	
	getParent: function(){
		return this.parent;
	},	
	
	getLabelCodeParameters: function(){
		return this.textLabelParameters;
	},
	
	setLabelCodeParameters: function(aLabelCodeParameters, bNotRerender){
		this.labelCodeParameters = aLabelCodeParameters;
		if(bNotRerender === false || bNotRerender === undefined){
			this.rerender();			
		}		
	},	
	
	getLabelCode: function(){
		return this.labelCode;
	},
	
	setLabelCode: function(sLabelCode, bNotRerender){
		this.labelCode = sLabelCode;
		if(bNotRerender === false || bNotRerender === undefined){
			this.rerender();			
		}		
	},		
	
	onAfterRendering: function(obj){
		if(obj){
			$("#" + obj.getId()).bind('click', obj, function(oEvent){
				oEvent.data.setChecked(true);
				for(var i = 0; i < obj.getParent().content.length; i++){
					if( obj.getParent().content[i].getId() != obj.getId()){
						obj.getParent().content[i].setChecked(false);
					}
					else{
						obj.getParent().setSelectedIndex(i);
					}					
				}
			});				
		}
		else{
			$("#" + this.getId()).bind('blur', this, function(oEvent){
				oEvent.data.setChecked(true);
				for(var i = 0; i < this.getParent().itcontentems.length; i++){
					if( this.getParent().content[i].getId() != this.getId()){
						this.getParent().content[i].setChecked(false);
					}
					else{
						this.getParent.setSelectedIndex(i);
					}
				}				
			});	
		}
	},	
	
	
	translate: function(){
		this.setLabelCode(this.getLabelCode());
	}
});

var cRadioButtonGroupControl = Class.create();
cRadioButtonGroupControl.prototype = Object.extend(new cBasicControl(), {
	initialize: function(id, obj) {
		this.basicInitialize(id, obj);		
		if(obj){
			if(obj.content){
				this.content = obj.content;
				for(var i = 0; i < this.content.length; i++){
					this.content[i].setParent(this);
				}
			}
			else{
				this.content = [];
			}
		}
		this.setSelectedIndex(0);
	},
	
	render: function(){
		var sHtml = "";
		for(var i = 0; i < this.content.length; i++){
			sHtml = sHtml + this.content[i].render();
		}
		return sHtml;		
	},
	
	setSelectedIndex: function(iValue){
		this.selectedIndex = iValue;
	},
	
	getSelectedIndex: function(){
		return this.selectedIndex;
	},	
	
	translate: function(){
		$.each (this.content, function(i, content){
			content.translate();
		});
	}	
});