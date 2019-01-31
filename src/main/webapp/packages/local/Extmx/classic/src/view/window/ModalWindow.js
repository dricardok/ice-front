/**
 *  Window class that defines modal window's defaults behavior.
 * */

Ext.define('Extmx.view.window.ModalWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.layout.container.Fit'
    ],

    layout: 'fit',

    /**
     * True to make the floated component modal and mask everything behind it when displayed, false to display it without restricting access to other UI elements.
     * */
    modal: true,
    /**
     * Specify as true to allow user resizing at each edge and corner of the window.
     * */
    resizable: false,
    /**
     *True to allow the window to be dragged by the header bar, false to disable dragging.
     * */
    draggable: false,
    /**
     * True to display the 'close' tool button and allow the user to close the window.
     * */
    closable: false,

	closeAction: 'destroy',


    /**
     * Hide and delete de the window's model record if exist.
     * */
    hide: function () {
        if( !Ext.isEmpty( this.record ))
            delete this.record;
        this.callParent();
    }

});