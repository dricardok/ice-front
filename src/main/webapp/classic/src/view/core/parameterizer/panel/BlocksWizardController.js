/**
 * Created by danie on 22/01/2019.
 */
Ext.define('Ice.view.core.parameterizer.panel.BlocksWizardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.blockswizard',


    selectBlock: function ( record ) {

        this.block = record.data.name;

        var store = this.lookupReference('blocksattributes').getStore();
        store.removeAll();

        Ext.each( record.data.attributes , function ( atr ) {
           store.add({ name: atr.toLowerCase() });
        });

        this.getView().setActiveItem(1);
    },

	returnToBlocks: function(){
		this.getView().setActiveItem(0);
    },

    selectAttribute: function ( record ) {

        this.attribute = record.data.name;

        var str = this.block+'.'+this.attribute;

        this.getView().fireEvent( 'selection', str );

    }

});