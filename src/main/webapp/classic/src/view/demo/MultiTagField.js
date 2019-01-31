/*
* @Author Ing. Daniel Hernández
* @Email daniel@extjs.mx
* Date August 17th, 2018 Mexico, City
*/


Ext.define('Ice.view.demo.MultiTagField', {
    extend: 'Ext.form.field.Tag',

    alias: 'widget.multipletagfield',

    urls: [

        'server/cars.json',
        'server/years.json',
        'server/tercera.json',
        'server/cuarta.json',
    ],

    selectedRecords: [],
    selectedIds: [],

    index: 0,
    indexDeleted: 100000,

    initComponent: function() {


        var store = Ext.create( 'Ext.data.Store', {

                fields:['id','value','indice_insercion'],

                data:[]
            }),

            me = this;


        Ext.apply( this , {

            store: store ,
            displayField: 'value',
            valueField: 'id',
            queryMode: 'local',
            filterPickList: true,
            editable: false,
            selectOnFocus: false,

            listeners:{

                scope: this,

                beforedeselect: function( tagfield , record, index ) {

                    var me = this;

                    //se eliminan los elemntos que estan a la derecha del elemento seleccionado
                    if( record.data.indice_insercion < me.indexDeleted ){

                        //Se identifica el elemento que se elimino para poder eliminar
                        //todos los que estan a la derecha de el.
                        me.indexDeleted = record.data.indice_insercion;

                        //se restaura el indice general para que se pueda volver a
                        //cargar la url correcta.
                        me.index = record.data.indice_insercion;


                        //De entre todos los elementos seleccionados

                        var it = 0;
                        Ext.each( me.selectedRecords ,  function( p ) {
                            //si esta a la derecha...
                            if( p.indice_insercion >= record.data.indice_insercion ){

                                //se deselecciona del tagfield...
                                tagfield.removeValue( p.id );
                                it++;
                            }
                        });

                        //se elimina el array de objetos seleccionados...
                        me.selectedRecords.splice( me.indexDeleted , it );

                        //se elimina del arrays de ids seleccionados...
                        me.selectedIds.splice( me.indexDeleted , it );

                        me.reloadStoreFromDelete( tagfield , store );

                    }
                },

                select: function( tagfield , records , opt ) {

                    if( records.length > me.selectedIds.length ){
                        // Si aun existen urls que cargar...
                        if( me.index < me.urls.length ){
                            me.loadNewStore( tagfield , records , store );
                        }
                        else{
                            //se obtienen objetos y los ids que estan ya seleccionados en el tagfield

                            me.selectedRecords = [];
                            me.selectedIds = [];

                            Ext.each( records , function( p ) {
                                me.selectedRecords.push( p.data );
                                me.selectedIds.push( p.data.id );
                            });
                        }
                    }
                },

                afterRender: function() {


                    me.urlsLength = me.urls.lenght;

                    var firstUrl = me.urls[ me.index ];

	                Ext.Ajax.request({
		                async: true,
		                url: firstUrl,
		                method: 'POST',
		                success: function ( response , opts  ) {
			                var data = Ext.decode( response.responseText ).data ;
			                Ext.each( data , function (p) {
				                p.indice_insercion = me.index ;
			                });
			                me.index++;
			                store.setData( data );
		                },
		                failure: function( response , opts ) {
			                console.log('Error en el servidor');
		                }
	                });
                }
            }

        });

        this.callParent(arguments);
    },

    loadNewStore: function ( tagfield , records , store ) {

        var me = this;

        me.selectedRecords = [];
        me.selectedIds = [];

        //se obtienen objetos y los ids que estan ya seleccionados en el tagfield
        Ext.each( records , function( p ) {
            me.selectedRecords.push( p.data );
            me.selectedIds.push( p.data.id );
        });

        //se obtiene si guiente url que se va a cargar
        var nextUrl = me.urls[ me.index ];


	    Ext.Ajax.request({
		    async: true,
		    url: nextUrl,
		    method: 'POST',
		    params: { id : records[ me.selectedRecords.length - 1 ].data.id },
		    success: function( response , opt ) {

			    //se obtiene el conjunto de los nuevos objetos del store...
			    var newStoreData = Ext.decode( response.responseText ).data ;

			    Ext.each( newStoreData , function( p ) {
				    p.indice_insercion = me.index;
			    });

			    me.indexDeleted = ++me.index;

			    //le agregamos los objetos que ya habian sido seleccionados...
			    Ext.each( me.selectedRecords , function( p ) {
				    newStoreData.push( p );
			    });

			    //se eliminan todos los objetos del store...
			    store.removeAll();

			    //cargamos los nuevos datos con los seleccionados en el store...
			    store.setData( newStoreData );

			    //se vuelven a seleccionar los elementos que ya lo estaban...
			    tagfield.setValue( me.selectedIds );

		    },
		    failure: function( response , opt ) {
			    console.log('Error en el servidor');
		    }
	    });
    },

    reloadStoreFromDelete: function( tagfield , store ) {

        var me = this;

        //se obtiene si guiente url que se va a cargar
        var nextUrl = me.urls[ me.index ];

	    Ext.Ajax.request({
		    async: true,
		    url: nextUrl,
		    method: 'POST',
		    params: { id : me.selectedIds[ me.selectedIds.lenght - 1 ] },
		    success: function( response , opt ) {

			    //se obtiene el conjunto de los nuevos objetos del store...
			    var newStoreData = Ext.decode( response.responseText ).data ;

			    Ext.each( newStoreData , function( p ) {
				    p.indice_insercion = me.index;
			    });

			    me.indexDeleted = ++me.index;

			    //le agregamos los objetos que ya habian sido seleccionados...
			    Ext.each( me.selectedRecords , function( p ) {
				    newStoreData.push( p );
			    });

			    //se eliminan todos los objetos del store...
			    store.removeAll();

			    //cargamos los nuevos datos con los seleccionados en el store...
			    store.setData( newStoreData );

			    //se vuelven a seleccionar los elementos que ya lo estaban...
			    tagfield.setValue( me.selectedIds );

		    },
		    failure: function( response , opt ) {
			    console.log('Error en el servidor');
		    }
	    });
    }
});