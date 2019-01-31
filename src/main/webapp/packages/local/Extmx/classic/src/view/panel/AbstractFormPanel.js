
Ext.define('Extmx.view.panel.AbstractFormPanel', {
    extend: 'Ext.form.Panel',

    requires: [
        'Ext.form.field.Text',
        'Ext.layout.container.VBox'
    ],

    getFields: Ext.emptyFn,

    margin: '20 20 20 20',

    modelClass: '',

    layout: {
        type: 'vbox',
        aling:'stretch'
    },

    defaults:{
        xtype: 'textfield',
        labelAling:'left',
        msgTarget:'Side',
        labelWidth: 150,
        width: '100%',
        allowBlank: false
    },

    isValid: function(){

        var invalid;

        Ext.suspendLayouts();

        invalid = this.form.getFields().filterBy( function( field ) {

            if( !field.hidden )
                return !field.validate();
        });

        Ext.resumeLayouts(true);

        return invalid.length < 1;
    },

    setRecord: function( record ){

        if( Ext.isEmpty( record ) ){
            this.record = Ext.create( this.modelClass );
        }
        else{
            this.record = record ;
            this.loadRecord( record );
        }
    },

    hideFields: Ext.emptyFn,

    submit: function(){

        if( this.isValid() ){
            this.updateRecord();
        }
    },

    updateRecord: function(){

        var values = this.getValues(),
            key;

        for( key in values ){

            if( !Ext.isEmpty( values[ key ] ) )
                this.record.set(  key , values[ key ] , { silent: true , dirty: true } );
        }

        this.fireEvent( 'recordupdated' , this.record );
    },

    resetForm: Ext.emptyFn,

    initComponent: function () {
        Ext.apply( this, {
            items: this.getFields()
        });
        this.callParent();
    }

});