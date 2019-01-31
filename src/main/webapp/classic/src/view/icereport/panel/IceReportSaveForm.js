
Ext.define('Ice.view.icereport.panel.IceReportSaveForm', {
    extend: 'Extmx.view.panel.AbstractFormPanel',

    requires: [
        'Ext.form.field.TextArea'
    ],

    modelClass: 'Ice.model.icereport.IceReportModel',

    getFields: function(){
        return [{
            xtype: 'textfield',
            width: 500,
            allowBlank: false,
            name: 'nombre',
            fieldLabel: 'Nombre'
        },{
            xtype: 'textarea',
            width: 500,
            name: 'descrip',
            allowBlank: false,
            fieldLabel: 'Descripción'
        }];
    },


    updateRecord: function(){

        let values = this.getValues(),
            key;

        values.json = Ext.encode( $( this.selector ).reportBro().getReport() ) ;

        for( key in values ){
            if( !Ext.isEmpty( values[ key ] ) )
                this.record.set(  key , values[ key ] , { silent: true , dirty: true } );
        }

        this.fireEvent( 'recordupdated' , this.record );
    }


});