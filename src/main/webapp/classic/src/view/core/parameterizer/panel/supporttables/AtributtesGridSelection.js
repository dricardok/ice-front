/**
 * Created by danie on 21/01/2019.
 */
Ext.define('Ice.view.core.parameterizer.panel.supporttables.AtributtesGridSelection', {
    extend: 'Ext.grid.Panel',

    xtype: 'attributesselection',

	requires: [
		'Ext.data.Store'
	],

	listeners:{
		rowdblclick: function( table , record ){
			this.fireEvent('selection', record );
		},
		cellkeydown: function( table, td, cellIndex, record, tr, rowIndex, e, eOpts ){
			if( e.getKey() === 13  ){
				this.fireEvent('selection', record );
			}
		}
	},

	initComponent: function () {

        var store = Ext.create('Ext.data.Store',{
            fields: ['code','nombre']
        });

        Ext.apply( this, {
            store: store
        });
        this.callParent();
    },

    columns:[{
        dataIndex: 'nombre',
        flex:1,
        renderer: function ( name , meta , record ) {
            return '<div style="margin: 10px; font-size: 12pt">' +
                //'<span>'+ record.data.code +'</span>' +
                '<span style="margin-left: 20px">'+ record.data.nombre +'</span>' +
            '</div>';
        }
    }]


});