
Ext.define('Ice.view.core.parameterizer.panel.TablesGridPanel', {
    extend: 'Ext.grid.Panel',

    xtype: 'tablesgridpanel',

	requires: [
		'Ice.store.core.products.support.SupportTablesStore'
	],

	listeners:{
		cellkeydown: function( table, td, cellIndex, record, tr, rowIndex, e, eOpts ){
			if( e.getKey() === 13  ){
				this.fireEvent('selection', record );
			}
		}
	},

	initComponent: function () {

        var store = Ext.create('Ice.store.core.products.support.SupportTablesStore');

        Ext.apply( this , {
	        store: store,
	        columns: [
		        {
		        	dataIndex: 'codigo',
			        flex: 1 ,
			        renderer: function ( code , meta , record  ) {
				        var data = record.data,
				            str = '<div style="margin-top: 10px; margin-bottom: 10px;">';

			            str += '<div style="font-size: 14pt; font-weight: bold;">' +
				            '<span style="padding-left: 10px">' + data.nombre + '</span>' +
				        '</div>';

				        str += '<div style=" margin-bottom: 5px; font-size: 9pt; color: #a5a5a5">' +
					        '<span style="margin-left: 20px;">'+ data.descripcion + '</span>' +
					        '</div>';

				        str += '<div>' +
					        '<span style="margin-left: 20px; font-size: 9pt; font-weight: bold;"> Llaves de Acceso: </span>';

				        Ext.each( data.llaves , function ( key ) {
					        str += '<span style="margin-left: 10px; font-size: 9pt; color: #a5a5a5">'+ key.nombre + '</span>';
				        });

				        str += '</div>';


				        str += '<div>' +
					        '<span style="margin-left: 20px; font-size: 9pt; font-weight: bold;"> Atributos Disponibles: </span>';

				        Ext.each( data.columnas , function ( column ) {
					        str += '<span style="margin-left: 10px; font-size: 9pt; color: #a5a5a5">'+ column.nombre + '</span>';
				        });

				        str += '</div>';

				            str += '</div>';

				        return str;
			        }
		        }
	        ],
        });

        this.callParent();
    }

});