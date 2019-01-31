
Ext.define('Ice.view.core.products.ProductsForm', {
    extend: 'Ext.form.Panel',

    xtype: 'productsgeneralinformation',

    title: 'Datos Generales',
    iconCls: 'x-fa fa-info',

	requires: [
		'Ext.container.Container',
		'Ext.form.FieldSet',
		'Ext.form.field.Number',
		'Ext.form.field.Text',
		'Ext.form.field.TextArea',
		'Ext.layout.container.HBox',
		'Ext.layout.container.VBox',
		'Ext.tab.Panel',
		'Ext.toolbar.Fill',
		'Ice.view.core.products.fields.BranchTypesComboBox',
		'Ice.view.core.products.fields.BusinessLineCombobox'
	],

	layout:{
        type: 'vbox',
        align: 'stretch'
    },

    margin: '5 5 5 5',

    bbar:['->',{
        text:'Limpiar',
        iconCls: 'fas fa-broom',
        cls: 'info-btn',
        handler: function(){
            this.up().up().reset();
        }
    },{
        text:'Guardar',
        iconCls: 'fas fa-save',
        cls: 'success-btn',
        handler: function(){
            let form = this.up().up();
            form.fireEvent( 'saveform', form );
        }
    }],

    items:[{
        xtype: 'container',
        margin: '10 10 10 10',
        layout:{
            type: 'hbox',
            align: 'stretch'
        },
        height: 250,
        items:[{
            xtype:'fieldset',
            title: 'Informacion General',
            height: 250,
            flex: 1,
            margin: '0 10 0 0',
            defaults:{
                width: '100%',
                labelWidth: 100
            },
            items:[{
                xtype:'numberfield',
                fieldLabel: 'Clave',
                hideTrigger: true,
                keyNavEnabled: false,
                mouseWheelEnabled: false,
                allowDecimals: false,
                minValue: 0,
                maxValue: 999
            },{
                xtype: 'textfield',
                fieldLabel: 'Nombre'
            },{
                xtype:'textarea',
                height: 100,
                fieldLabel: 'Descripcion'
            }]
        },{
            xtype:'fieldset',
            title: 'Informacion General',
            margin: '0 0 0 10',
            height: 250,
            flex : 1,
            defaults:{
                width: '100%',
                labelWidth: 100
            },
            items:[{
                xtype: 'businesslinecombo'
            },{
                xtype: 'branchtypescombo',
                fieldLabel: 'Tipo de ramo'
            },{
                xtype: 'branchtypescombo',
                fieldLabel: 'Tipo de póliza'
            },{
                xtype: 'branchtypescombo',
                fieldLabel: 'Tipo de seguro'
            }]
        }]
    },{
        xtype:'tabpanel',
        items:[{
            title: 'Definicion',
            layout:{
                type: 'hbox',
                align: 'stretch'
            },
            items:[{
                xtype:'fieldset',
                flex: 1,
                margin: '0 0 0 10',
                title: 'Temporalidad de las polizas',
                defaultType: 'checkboxfield',
                layout:{
                    type: 'hbox',
                    align: 'middle'
                },
                items: [{
                    boxLabel  : 'Renovable',
                    inputValue: '1',
                    margin: '0 20 0 0'
                }, {
                    boxLabel  : 'Temporal',
                    inputValue: '2',
                    margin: '0 20 0 0'
                }, {
                    boxLabel  : 'Vida Entera',
                    inputValue: '3'
                }]
            },{
                xtype:'fieldset',
                title: 'Propiedades',
                flex: 1,
                margin: '0 0 0 10',
                layout:{
                    type: 'hbox',
                    align: 'middle'
                },
                defaultType: 'checkboxfield',
                items: [{
                    boxLabel  : 'Cancelacion',
                    inputValue: '1',
                    margin: '0 20 0 0'
                }, {
                    boxLabel  : 'Renovacion',
                    inputValue: '2',
                    margin: '0 20 0 0'
                }, {
                    boxLabel  : 'Endosos',
                    inputValue: '3'
                }]
            }]

        },{
            title: 'Clausulas'
        },{
            title:'Periodos'
        }]
    }]

});