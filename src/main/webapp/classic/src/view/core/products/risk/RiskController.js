

Ext.define('Ice.view.core.products.risk.RiskController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.risk',

	requires: [
		'Ext.fx.Anim',
		'Ice.view.core.parameterizer.ParameterizerWindow'
	],


	showVariableDataPanel: function () {
        this.changeCard(1);
        let title = 'Situaciones de Riesgo > ' + this.itemSelected.data.name + ' > Datos Variables';
        this.getView().setTitle( title );
	},

	showConceptsPanel: function(){
		this.changeCard(4);
	},

	showCoveragesPanel: function(){
		this.changeCard(3);
		let title = 'Situaciones de Riesgo > ' + this.itemSelected.data.name + ' > Planes > '+ this.planSelected.data.name +' > Coberturas';
		this.getView().setTitle( title );
	},

	showPlanPanel: function(){
		this.changeCard(2);
		let title = 'Situaciones de Riesgo > ' + this.itemSelected.data.name + ' > Planes';
		this.getView().setTitle( title );
	},

	returnRiskList: function () {
		this.changeCard(0);
		let title = 'Situaciones de Riesgo ';
		this.getView().setTitle( title );
	},

	changeCard: function ( id ) {
		let panel = this.getView();
		panel.setActiveItem(id);
	},

	planSelection: function( record ){
    	this.planSelected = record;
    	this.lookupReference('coveragesBtn').enable();
	},

	rowselection: function ( record ) {
		this.itemSelected = record ;
		this.lookupReference('variabledatabtn').enable();
		this.lookupReference('planbtn').enable();
	},

	showExpEditor: function () {

		let window = Ext.create('Ice.view.core.parameterizer.ParameterizerWindow');

		Ext.create('Ext.fx.Anim',{
			target:window,
			duration: 500,
			from:{
				y:-2000
			},
			to:{
				y:50
			},
			listeners: {
				beforeanimate:function(){
					window.show();
				}
			}
		});


	}
});