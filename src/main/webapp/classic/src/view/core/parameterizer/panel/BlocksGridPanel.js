
Ext.define('Ice.view.core.parameterizer.panel.BlocksGridPanel', {
    extend: 'Ext.grid.Panel',

	requires: [
		'Ice.store.core.products.blocks.BlocksStore'
	],

    xtype: 'blocksgrid',

	store: {
		type: 'blocks'
	},

	hideHeaders: true,

	listeners:{
		cellkeydown: function( table, td, cellIndex, record, tr, rowIndex, e, eOpts ){
			if( e.getKey() === 13  ){
				this.fireEvent('selection', record );
			}
		}
	},

	columns: [
		{
			dataIndex: 'expression',
			flex: 1,
			renderer: function ( name , meta , record  ) {

				return  '<div style="margin-top: 10px; margin-bottom: 10px;">' +
					'<div style="font-size: 12pt;">' +
					'<span><b>' + record.data.name + '</b></span>' +
					'<span style="font-size: 9pt; color: #BDBDBD ; margin-left: 5px"> '+ record.data.bloque +' </span>' +
					'<div style="font-size: 7pt; color: #BDBDBD ; margin-left: 5px"> '+ record.data.comment +' </div>' +
					'</div>' +
					'</div>';
			}
		}
	]


});