
/**
*
* Modal window that has as a single child element a form that controls through two buttons, save and cancel.
* This window needs a form panel instance in his form attribute to work.
* */

Ext.define('Extmx.view.window.FormWindow', {
    extend: 'Extmx.view.window.ModalWindow',

    /**
     * Defines the alignment of the window's control buttons.
     * */
    buttonAlign: 'right',
	/**
	 * Defines the text in the window's title when a new model instance is created.
	 * */
    addText: 'Add',
	/**
	 * Defines the text in the window's title when a model instance is edited.
	 * */
    editText: 'Edit',

    initComponent: function () {
        var me = this;
        Ext.apply( this, {
            items: me.form,
            buttons:[{
                text: 'Save',
                handler: function ( btn ) {
                    btn.disable();
                    if( me.form.isValid() ){
                        me.form.submit();
                    }
                    btn.enable();
                }
            },{
                text:'Cancel',
                handler: function ( btn ) {
                    me.form.reset();
                    me.hide();
                }
            }]
        });
        this.callParent();
    },

    /**
     * Returns the form instance of the window.
     * @returns {Ext.form.Panel} The window's form panel instance.
     * */
    getForm: function () {
        return this.form;
    },

    /**
     * Shows the window with the record loaded on the form when exist.
     * */
    show: function ( record ) {
        this.form.reset();

        if( Ext.isEmpty( record ) ){
            this.setTitle( this.addText );
            this.form.record = Ext.create( this.form.modelClass );
        }
        else{
            this.form.setRecord( record );
            this.form.record = record;
            this.setTitle( this.editText );
        }
        this.callParent();
    }


});