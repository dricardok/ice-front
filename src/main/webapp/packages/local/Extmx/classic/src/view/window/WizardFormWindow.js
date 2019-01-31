/**
* Author Ing. Daniel Hernández
* Date November 12, 2018 Mexico City
*
* Base class of a modal window with wizard behavior.
* This class use obligatorily a form wizard instance ( form attribute )
* as unique child.
* */
Ext.define('Extmx.view.window.WizardFormWindow', {
    extend: 'Extmx.view.window.ModalWindow',
    /**
     * The number of steps in the wizard, this number has must to correspond
     * to the number of pages in the form.
     * */
    numCards: 0,
    /**
     * The page active id of the form.
     * */
    activeItem: 0,

    initComponent: function () {
        var me = this;
        Ext.apply( this,{
            items: me.form,
            buttons:[{
                text:'Cancel',
                handler: function () {
                    me.resetWindow();
                    me.hide();
                }
            },{
                text:'Previous',
                itemId: 'previousbtn',
                hidden: true,
                scope: this,
                handler: me.goPreviousPage
            },{
                text:'Next',
                itemId: 'nextbtn',
                scope: this,
                handler: me.goNextPage
            },{
                text:'Save',
                hidden: true,
                scope: this,
                itemId: 'savebtn',
                handler: me.save
            }]
        });
        this.callParent();
    },
    /**
     * Reset the window buttons to the initial state, reset the form values and
     * returns the active page to the first one.
     * */
    resetWindow: function () {
        this.down('#previousbtn').hide();
        this.down('#nextbtn').show();
        this.down('#savebtn').hide();
        this.activeItem = 0;
        this.form.getLayout().setActiveItem( this.activeItem );
        this.form.reset();
    },
    /**
     * Returns the wizard to the previous page if there exist and is valid.
     * */
    goPreviousPage: function ( btn ) {
        if( this.form.isValidPage( this.activeItem ) ){
            this.activeItem--;
            this.form.getLayout().setActiveItem( this.activeItem );
            this.down('#nextbtn').show();
            if( this.activeItem === 0 ){ // this is the first page
                btn.hide();
            }
            this.down('#savebtn').hide();
        }
    },
    /**
     * Returns the wizard to the next page if there exist and is valid.
     * */
    goNextPage: function ( btn ) {
        if( this.form.isValidPage( this.activeItem ) ){
            this.activeItem++;
            this.form.getLayout().setActiveItem( this.activeItem );
            this.down('#previousbtn').show();
            if( this.activeItem === this.numCards-1 ){
                btn.hide();
                this.down('#savebtn').show();
            }
            else{
                this.down('#savebtn').hide();
            }
        }
    },
    /**
     * If the hole form is valid, calls its submit method.
     * */
    save: function ( btn ) {
        if( this.form.isValidPage( this.activeItem ) ){
            this.form.submit();
        }
    },

    show: function ( record ) {
        this.resetWindow();
        if( !Ext.isEmpty( record ) ){
            this.form.setRecord( record );
        }
        this.callParent();
    }
});