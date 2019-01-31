/**
 * Created by danie on 22/01/2019.
 */
Ext.define('Ice.view.core.parameterizer.panel.BlocksAttributesGridPanel', {
	extend: 'Ext.grid.Panel',

	requires: [
		'Ext.data.Store'
	],

	xtype: 'blocksattributesgrid',

	hideHeaders: true,

	listeners:{
		cellkeydown: function( table, td, cellIndex, record, tr, rowIndex, e, eOpts ){
			if( e.getKey() === 13  ){
				this.fireEvent('selection', record );
			}
		}
	},

    initComponent: function(){

	    var store = Ext.create('Ext.data.Store',{
	        fields:['name']
        });

	    Ext.apply( this, {
	        store: store
        });

	    this.callParent();
    },


	columns: [
		{
			dataIndex: 'expression',
			flex: 1,
			renderer: function ( name , meta , record  ) {

				return  '<div style="margin-top: 10px; margin-bottom: 10px;">' +
					'<div style="font-size: 12pt;">' +
					'<span><b>' + record.data.name + '</b></span>' +
					'</div>' +
					'</div>';
			}
		}
	]
});