/**
 * Created by danie on 17/12/2018.
 */
Ext.define('Ice.view.icereport.main.IceReportController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.icereport',

	requires: [
		'Ext.layout.container.Fit',
		'Extmx.view.window.FormWindow',
		'Ice.view.icereport.panel.IceReportSaveForm'
	],

	hidetoolpanel: function(){

        let document = $('#rbro_document_panel');

        if( this.statuspanel ){
            $('#rbro_detail_panel').hide();
            document.css("width", "100%");
            this.statuspanel = false;
        }
        else{
            $('#rbro_detail_panel').show();
            document.css("width", "calc(100% - 630px)");
            this.statuspanel = true;
        }
    },

    editReport: function( record ){

        let me = this;
        this.activeRecord = record;
        go.mask('Recuperando Reporte...');

        go.GET({
            url: Urls.report.getReport,
            params: {
                id_template : record.data.id_template
            },
            success: function( response, opts ) {
                try{
                    let ans = Ext.decode( response.responseText ).items[0];
                    me.showReporterEditor( ans.json , record );
                }
                catch (e) {

                }
            },
            callback: function () {
                Ext.getBody().unmask();
            }
        });

    },

    deleteReport: function( record ){
        let me = this;
        go.confirm({
            ok: function () {
                go.mask("Eliminando...");
                record.erase({
                    success: function() {
                        me.reloadGrid();
                        go.success("El reporte se ha eliminado!");
                    },
                    callback: function () {
                        go.unmask();
                    }
                });
            }
        });
    },

    saveReport: function( bnt ){

        let me = this,
            form = Ext.create('Ice.view.icereport.panel.IceReportSaveForm',{
                selector: me.selector,
                listeners:{
                    recordupdated: function( record ){


                        me.saveWindow.hide();
                        go.mask();

                        record.save({
                            success: function ( record ) {
                                //me.returnToGrid();
                                //me.reloadGrid();
                                me.activeRecord = record;
                                me.timer = setInterval(function() {
                                    me.autoSave();
                                }, 15000 ); //5 min3000000
                                go.success("El reporte se guardo con éxito");
                                me.reloadGrid();
                            },
                            callback: function () {
                                go.unmask();
                            }
                        });
                    }
                }
            });

        clearTimeout( me.timer );
        me.saveWindow = Ext.create('Extmx.view.window.FormWindow',{
            width: 600,
            height: 300,
            form: form,
            layout: 'fit'
        });

        if( !Ext.isEmpty( this.activeRecord ) )
            me.saveWindow.show( this.activeRecord );
        else
            me.saveWindow.show();
    },

    returnToGrid: function(){

        let panel = this.getView(),
            refs = this.getReferences(),
            me = this;

        panel.setActiveItem(0);
        refs.savebtn.hide();
        refs.cancelbtn.hide();
        refs.hidetoolpanel.hide();

        clearTimeout( me.timer );

    },

    showReporterEditor: function ( json , record ) {

        let panel = this.getView(),
            refs = this.getReferences(),
            me = this;

        this.selector = this.startReporter( json );

        panel.setActiveItem(1);
        refs.savebtn.show();
        refs.cancelbtn.show();
        refs.hidetoolpanel.show();

        if( !Ext.isEmpty( json ) ){
            $( this.selector ).reportBro().load( Ext.decode( json ) );
        }
        else{
            delete this.activeRecord;
        }

        me.timer = setInterval(function() {
            me.autoSave({});
        }, 15000 ); //5 min3000000

    },

    autoSave: function( record ){

        let json = Ext.encode( $( this.selector ).reportBro().getReport() ),
            status = this.lookupReference('statusbar'),
            me = this;



        /*if( Ext.isEmpty( this.activeRecord ) ){
            this.activeRecord = Ext.create('ReportGenerator.model.ReportsModel');
            this.activeRecord.set( 'nombre' , 'Draft' , { silent: true , dirty: true } );
            this.activeRecord.set( 'descrip' , '' , { silent: true , dirty: true } );
        }

        this.activeRecord.set(  'json' , json , { silent: true , dirty: true } );

        status.showBusy({
            config:'Guardando...'
        });

        this.activeRecord.save({
            success: function ( record , operation ) {


                me.activeRecord = record;

                status.setStatus({
                    text: 'Guardado',
                    iconCls: 'x-fa fa-check',
                    clear: true
                });

            },
            callback: function () {

            }
        });*/

    },

    startReporter: function ( json ) {

        let id = Ext.id(),
            selector = '#editor' + id;

        this.statuspanel = true;

        this.lookupReference('editor').update('<div id="editor'+id+'" style="height: 100%" ></div>');

        $( selector ).reportBro({
            reportServerUrl: 'http://localhost:8080/Reporte/requestPreview'
        });

	    this.initParameters( selector );

        if( Ext.isEmpty( json ) ){
	        go.POST({
		        url: 'server/document.json',
		        success: function ( response ) {
			        var report = Ext.decode( response.responseText );
			        $( selector ).reportBro( 'load', report.data.report );
		        }
	        });
        }

        return selector;
    },

    reloadGrid: function(){
        this.lookupReference('reportsgrid').getStore().reload();
    },

    initParameters: function ( selector ) {

    	go.GET({
		    url: 'http://localhost:8080/Reporte/ObtieneObjetos',
		    async: false,
		    success: function ( response ) {
			    var objetos = Ext.decode( response.responseText );

			    Ext.each( objetos.Objetos , function ( record ) {
				    let name = "",
					    it = 3;

				    Ext.each( record.CAMPOS , function ( item ) {
					    it++;
					    name = item.RELACION;

					    $( selector ).reportBro('createParameter',{
						    id: it,
						    name: name,
						    Type: 'Text'
					    })
				    })
			    });
		    }
	    });


    }
});