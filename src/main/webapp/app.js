/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'Ice.Application',

    name: 'Ice',

    requires: [
        // This will automatically load all classes in the Ice namespace
        // so that application classes do not need to require each other.
        'Ice.*',
        'Ext.*'
    ],

    launch: function( profile ){
      Ext.Loader.loadScript('resources/biosnet/go.js');
    },

    // The name of the initial view to create.
    mainView: 'Ice.view.main.MainPanel'
});
