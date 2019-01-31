
Ext.define('Extmx.view.window.SelectionWindow', {
    extend: 'Extmx.view.window.ModalWindow',

    grid: {},
    initComponent: function () {
        var me = this;
        Ext.apply( this,{
            items: this.grid,
            buttons:[{
                text:'Cancel',
                handler: function () {
                    this.hide();
                }
            },{
                text:'Select',
                handler: function () {
                    var record = me.grid.setSelection();
                    me.fireEvent('selection', record );
                    me.hide();
                }
            }]
        });
        this.callParent();
    }

});