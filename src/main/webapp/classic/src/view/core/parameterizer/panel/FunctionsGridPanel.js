
Ext.define('Ice.view.core.parameterizer.panel.FunctionsGridPanel', {
    extend: 'Ext.grid.Panel',

    xtype:'functionsgrid',

    requires: [
        'Ice.store.FunctionsStore'
    ],

    store: {
        type: 'functions'
    },

	hideHeaders:true,

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

    columns: [
        {
            dataIndex: 'expression',
            flex: 1,
            renderer: function ( name , meta , record  ) {

                return  '<div style="word-break: break-word;">' +
                            '</div>' +
                                '<div style="font-size: 9pt;">' +
                                    '<span><b>' + record.data.name + '</b></span>' +
                                    '<span style="font-size: 7pt; color: #BDBDBD ; margin-left: 5px"> función </span>' +
                            '</div>' +
	                    '<div style="font-size: 7pt; color: #BDBDBD ; margin-left: 5px" > Ejemplo  </div>'+
                        '<div style="font-size: 9pt; margin-left: 15px;">' + record.data.example + ' </div>'+
	                    '<div style="font-size: 7pt; color: #BDBDBD ; margin-left: 5px" > Resumen  </div>'+
                        '<div style="font-size: 9pt; margin-left: 15px; word-break: break-word;">' +
                            record.data.description +
                        ' </div>' +
                    '</div>';
            }
        }
    ]
});