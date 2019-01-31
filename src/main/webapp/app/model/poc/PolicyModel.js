
Ext.define('Ice.model.poc.PolicyModel', {
    extend: 'Ext.data.Model',

    idProperty: 'nmpoliza',

    api:{
        cotizar:'http://10.67.4.17:9080/icePocServices/ice/poc/cotizar',
        emitir:'http://10.67.4.17:9080/icePocServices/ice/poc/emitir',
        rate:'http://10.67.4.17:9080/icePocServices/ice/poc/obtenerTarifa'
	   // cotizar:'server/cotizar.json',
	   // emitir:'server/emitir.json',
	  //  rate:'server/tarifa.json'
    },

    fields: [
        { name: 'cdunieco',     type: 'int' },
        { name: 'cdramo',      type: 'int' },
        { name: 'estado',    type: 'string' },
        { name: 'nmpoliza',   type: 'int' },
        { name: 'nmsuplem', type: 'string' }
    ],

    getRate: function( options ){

        let me = this;
        Ext.Ajax.request({
            disableCaching : false,
            async: options.async || true,
            url: me.api.rate,
            method: 'POST',
	        jsonData: me.getData() ,
            success: options.success || Ext.emptyFn,
            failure: options.failure || me.failureFn ,
            callback: options.callback || Ext.emptyFn
        });

    },

    cotizar: function ( options ) {

        let me = this;

        Ext.Ajax.request({
            async: options.async || true,
            url: me.api.cotizar,
            disableCaching : false,
            method: 'POST',
	        jsonData: me.getData() ,
            success: options.success || Ext.emptyFn,
            failure: options.failure || me.failureFn ,
            callback: options.callback || Ext.emptyFn
        });

    },
    
    emitir: function ( options ) {

        let me = this;
        Ext.Ajax.request({
            disableCaching : false,
            async: options.async || true,
            url: me.api.emitir,
            method: 'POST',
	        jsonData:  me.getData() ,
            success: options.success || Ext.emptyFn,
            failure: options.failure || me.failureFn ,
            callback: options.callback || Ext.emptyFn
        });
    },

    failureFn: function ( response ) {
        let responseText = Ext.decode( response.responseText );
        console.log( responseText );
    }

});