/*
*  @Author Ing. Daniel Hernández
*  Date December 4th, 2018 Mexico City
*  @Email Daniel@extjs.mx
*  Controller class for the POC's main panel.
* */

Ext.define('Ice.view.demo.PrototypeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prototype',

    requires: [
        'Ice.model.poc.PolicyModel'
    ],

    init: function(){
        this.poliza = Ext.create('Ice.model.poc.PolicyModel',{
            cdunieco: 0,
            cdramo: 420,
            estado: "2",
            nmpoliza: 1882,
            nmsuplem:'112'
        });
        this.callParent();
    },

    cotizar: function () {
        let me = this,
            form = this.getView();
        if( form.isValid() ){
            go.mask('Cotizando...');
            this.poliza.cotizar({
                success: function ( response ) {
                    go.mask();
                    me.poliza.getRate({
                        success: function ( response ) {
                            let responseText = Ext.decode( response.responseText ),
                                grid = me.lookupReference('gridtarifas'),
                                store = grid.getStore();
                            store.setData( responseText.list );
                            grid.show();
                            me.emitir();
                        },
                        callback: function () {
                            go.unmask();
                        }
                    });
                },
                callback: function () {
                    go.unmask();
                }
            });
        }
    },

    emitir: function ( ) {
        let panel =  this.lookupReference('texto'),
            tag = this.lookupReference('tag'),
            container = this.lookupReference('form'),
            terminos = this.lookupReference('terminos'),
            text = this.lookupReference('textarea'),
            emitirBtn = this.lookupReference('btn-emitir'),
            cotizarbtn = this.lookupReference('btn-cotizar'),
            msg = '<div class="autos-title"> Emisión de póliza de autos</div>';
        tag.hide();
        text.hide();
        terminos.hide();
        container.hide();
        emitirBtn.show();
        cotizarbtn.hide();
        panel.update( msg );
    },

    confirmarEmision: function () {
        let me = this;
        go.mask('Emitiendo...');
        me.poliza.emitir({
            success: function ( response ) {
                let ans = Ext.decode( response.responseText ),
                                div = document.createElement("div");
                            div.innerText = "El número de póliza es  " + ans.data.nmpoliza ;
                            div.class = "autos-text";
                swal({
                    title: "Emitida!",
                    content: div,
                    icon: "success",
                    closeOnClickOutside: false,
                    closeOnEsc: false,
                    buttons: ["Cancelar","Hecho"],
                }).then((value) => {
                    me.reiniciar();
                });
            },
            callback: function () {
                 go.unmask();
            }
        });
    },

    reiniciar: function () {
        let panel =  this.lookupReference('texto'),
            tag = this.lookupReference('tag'),
            container = this.lookupReference('form'),
            terminos = this.lookupReference('terminos'),
            grid = this.lookupReference('gridtarifas'),
            text = this.lookupReference('textarea'),
            emitirBtn = this.lookupReference('btn-emitir'),
            cotizarbtn = this.lookupReference('btn-cotizar'),
            msg = '<div class="autos-title"> Cotizador de Seguros de Autos</div>'+
	            '<div class="autos-text">Cotiza en segundos y contrata en minutos, todas nuestras opciones te' +
	            ' protegen con Responsabiidad Civil Obligatoria.</div>';
        this.getView().reset();
        tag.show();
        text.show();
        grid.hide();
        container.show();
        terminos.show();
        emitirBtn.hide();
        cotizarbtn.show();
        panel.update( msg );
    }
});