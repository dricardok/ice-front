
Ext.define('Ice.view.core.products.ProductsGridPanel', {
    extend: 'Extmx.AbstractGridPanel',

    xtype:'productsgridpanel',

	requires: [
		'Ext.form.Panel',
		'Ext.form.field.Number',
		'Ext.form.field.Text',
		'Ext.layout.container.VBox'
	],

	storeClass: 'Ice.store.core.products.ProductsStore',

    crudBtns: true,

	editIconCls: 'x-fa fa-gear',

    getTbar: function () {
        return [{
            text: 'Agregar<br>Producto',
            iconCls: 'x-fa fa-2x fa-plus',
            tooltip: 'Crear Nuevo Reporte',
            iconAlign: 'top',
            cls: 'success-btn',
	        height: 70,
	        width: 80,
            margin: '0 0 0 0',
            handler: function () {
                let grid = this.up().up();
                grid.fireEvent('addProduct');
            }
        }]
    },
    
    getColumns: function () {
        return [{
            text: 'Name',
            dataIndex: 'name',
            flex: 1,
            renderer: function ( value , metaData , record ) {
                return '<div>' +
                    '<span style="font-size: 12pt">' + record.data.key +' '+record.data.name + '</span>' +
                    '</div>' +
                    '<div style="font-size: 11pt; margin-top: 5px; margin-bottom: 10px;">' + record.data.description + '<div>';
            }
        }];
    },

	easySearchForm: function () {

        return {
            xtype: 'form',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items:[{
	            xtype:'numberfield',
                emptyText: 'Clave + ENTER',
	            hideTrigger: true,
	            keyNavEnabled: false,
	            mouseWheelEnabled: false,
	            allowDecimals: false,
	            minValue: 0,
	            maxValue: 999,
                width: 200,
                margin: '10 0 5 0'
            },{
	            xtype: 'textfield',
	            emptyText: 'Nombre + ENTER',
                width: 200
            }]
        }
	}
});