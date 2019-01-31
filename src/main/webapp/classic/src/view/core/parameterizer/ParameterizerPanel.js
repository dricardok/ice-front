/**
 * Main Container class of the new version of parameterizer
 *
 * @Author Ing. Daniel Hernández
 * date October 27th, 2018, Mexico City.
 * @email daniel@extjs.mx
 */

Ext.define('Ice.view.core.parameterizer.ParameterizerPanel', {
    extend: 'Ext.panel.Panel',

    xtype:'parameterizerpanel',

    controller: 'parameterizer',

	requires: [
		'Ext.container.Container',
		'Ext.form.field.Text',
		'Ext.form.field.TextArea',
		'Ext.layout.container.Border',
		'Ext.layout.container.Fit',
		'Ext.layout.container.HBox',
		'Ext.panel.Panel',
		'Ext.toolbar.Fill',
		'Ice.view.core.parameterizer.ParameterizerController',
		'Ice.view.core.parameterizer.panel.SupportTableAccessSelectedGrid'
	],

	layout:'border',

	showSupportTables: true,
	showGeneralInfoPanel: true,
	showSaveBtn: true,

	initComponent: function () {

    	const me = this;

    	Ext.apply( this, {

		    tbar:[{
			    text: 'Tabla de Apoyo',
			    cls: 'info-btn',
			    hidden: !me.showSupportTables,
			    tooltip:'Agrega un accesso a una tabla de apoyo Crt + A',
			    handler: 'supportTableAccess'
		    },{
		    	text:'getValue',
			    cls: 'info-btn',
			    handler:'getValue'
		    }],

		    bbar:['->',{
			    text:'Guardar',
			    iconCls:'fas fa-save',
			    cls: 'success-btn',
			    handler: 'onSave',
			    hidden: !me.showSaveBtn
		    }],

		    items: [{
			    region: 'south',
			    hidden: !me.showGeneralInfoPanel,
			    title:'Datos Generales',
			    split: true,
			    collapsed: true,
			    collapsible: true,
			    xtype: 'panel',
			    height: 200,
			    layout: 'border',
			    items:[{
				    region: 'center',
				    xtype: 'panel',
				    margin: '5 5 5 5',
				    flex: .6,
				    layout:{
					    type:'hbox',
					    align:'stretch'
				    },
				    items:[{
					    xtype:'container',
					    flex: 1,
					    margin: '5 5 5 10',
					    items:[{
						    xtype:'textfield',
						    labelWidth: 80 ,
						    fieldLabel: 'Nombre'
					    },{
						    xtype:'textfield',
						    labelWidth: 80 ,
						    fieldLabel: 'Tipo'
					    }]
				    },{
					    xtype: 'container',
					    width: 400,
					    margin: '5 20 5 5',
					    items:[{
						    xtype:'textarea',
						    labelWidth: 80 ,
						    width: 400,
						    height: 70,
						    fieldLabel: 'Descripción'
					    }]
				    }]
			    },{
				    title: 'Tablas de apoyo',
				    region: 'east',
				    xtype: 'panel',
				    scrollable: 'y',
				    flex: .4,
				    margin: '5 5 5 5',
				    items:[{
					    xtype:'supportableaccessselectedgrid',
					    reference: 'accessgrid',
					    listeners: {
						    editaccess: function( record ){
						    	me.fireEvent( 'showSupportTables', record );
						    }
					    }
				    }]
			    }]
		    },{
			    title: 'Árbol',
			    region:'east',
			    xtype: 'panel',
			    tbar:['->',{
				    cls: 'info-btn',
				    margin:'0 20 0 0',
				    iconCls: 'fas fa-print',
				    handler:'printTree',
				    width: 50,
				    height: 30
			    }],
			    margin: '5 5 5 5',
			    width: 600,
			    split: true,
			    collapsed: true,
			    collapsible: true,
			    layout: 'fit',
			    items:[{
				    xtype:'container',
				    autoScroll: true,
				    reference: 'tree',
				    margin: '10 10 10 10',
				    html: '<div class="tree"></div>'
			    }]
		    },{
			    title: 'Editor de Expresiones',
			    region: 'center',
			    xtype: 'panel',
			    margin: '5 5 5 5',
			    items:[{
				    xtype: 'panel',
				    listeners: {
					    afterrender: 'startEditor'
				    }
			    }],
			    bbar:[{
				    xtype: 'container',
				    layout: 'fit',
				    height: 20,
				    flex: 1,
				    reference: 'alert',
				    html:'<div style=" margin: 0 10px 0 10px; width: 100%" > ' +
					    '<span class="fas fa-code"></span>' +
					    '<span style="margin-left: 10px" >Linea: 0</span>' +
					    '<span style="margin-left: 10px" >Posición: 0</span>' +
					    '<span style="float: right; margin-right: 10px">0</span>' +
					    '</div>'
			    }]
		    }]

	    });

    	this.callParent();
	},

	getRawValue: function () {
    	return this.getController().getRawValue();
	},

	insertAccessRecord: function ( record ) {
		this.getController().insertAccessRecord( record );
	},

	getDictionary: function () {
		return this.getController().getDictionary();
	},

	setValue: function ( str ) {
		this.getController().insertText( str );
	}

});