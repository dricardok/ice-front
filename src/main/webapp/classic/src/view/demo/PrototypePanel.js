
Ext.define('Ice.view.demo.PrototypePanel', {
    extend: 'Ext.form.Panel',

    xtype: 'prototypepanel',

	requires: [
		'Ext.button.Button',
		'Ext.container.Container',
		'Ext.form.field.Checkbox',
		'Ext.form.field.Date',
		'Ext.form.field.Number',
		'Ext.form.field.Radio',
		'Ext.form.field.Text',
		'Ext.form.field.TextArea',
		'Ext.form.field.Time',
		'Ext.layout.container.HBox',
		'Ext.layout.container.VBox',
		'Ice.view.demo.GridTarifa',
		'Ice.view.demo.MultiTagField',
		'Ice.view.demo.PrototypeController'
	],

	controller: 'prototype',

    layout:{
        type: 'hbox',
        align: 'stretch'
    },

    items:[{
        xtype:'container',
        flex: 1,
        layout:{
            type: 'vbox',
            align: 'middle',
            pack: 'center'
        },
        items:[{
            xtype:'container',
            reference:'texto',
            html:'<div class="autos-title"> Cotizador de Seguros de Autos</div>'+
                '<div class="autos-text">Cotiza en segundos y contrata en minutos, todas nuestras opciones te' +
                ' protegen con Responsabiidad Civil Obligatoria.</div>'
        },{
            xtype: 'multipletagfield',
            fieldLabel: 'Datos del auto',
            reference: 'tag',
            allowBlank: false,
            width: 620
        },{
            xtype: 'textarea',
            reference: 'textarea',
            fieldLabel: 'Comentarios del vehículo',
            width: 620,
            allowBlank: false
        },{
            xtype: 'container',
            reference: 'form',
            layout:{
              type:'hbox',
              align:'stretch'
            },
            items:[{
                xtype:'container',
                flex: 1,
                items:[{
                    xtype: 'textfield',
                    fieldLabel: 'Nombre',
                    allowBlank: false,
                    width: 300
                },{
                    xtype: 'datefield',
                    fieldLabel: 'Fecha de Nacimiento',
                    allowBlank: false,
                    width: 300
                },{
                    xtype: 'radiofield',
                    name: 'radio1',
                    value: 'radiovalue1',
                    fieldLabel: 'Sexo',
                    boxLabel: 'Mujer'
                }, {
                    xtype: 'radiofield',
                    name: 'radio1',
                    value: 'radiovalue2',
                    fieldLabel: '',
                    labelSeparator: '',
                    hideEmptyLabel: false,
                    boxLabel: 'Hombre'
                }]
            },{
                xtype:'container',
                margin:'0 0 0 20',
                flex: 1,
                items:[{
                    xtype: 'textfield',
                    fieldLabel:'Apellidos',
                    allowBlank: false,
                    width: 300
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Número de conductores',
                    allowBlank: false,
                    width: 300
                },{
                    xtype: 'timefield',
                    fieldLabel: 'Hora de la cotización',
                    allowBlank: false,
                    width: 300,
                    minValue: '1:30 AM',
                    maxValue: '9:15 PM'
                }]
            }]
        },{
            xtype: 'checkboxfield',
            name: 'terminos',
            reference: 'terminos',
            boxLabel: 'Acepto los términos y condiciones',
            allowBlank: false
        },{
            xtype:'gridtarificacionpoc',
            reference:'gridtarifas'
        },{
            xtype:'button',
            text: 'Cotizar',
            reference: 'btn-cotizar',
            margin: '50 0 0 0',
            width: 300,
            cls: 'waves-effect btn btn-success',
            handler:'cotizar'
        },{
            xtype:'button',
            text: 'Emitir',
            margin: '50 0 0 0',
            width: 300,
            reference: 'btn-emitir',
            cls: 'waves-effect btn btn-success',
            handler:'confirmarEmision',
            hidden: true,
        }]
    }]

});