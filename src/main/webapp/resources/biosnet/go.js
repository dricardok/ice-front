
var go = go || {};

(function ( ){

    go.money = Ext.util.Format.usMoney;

    go.mask = function( msg ){
        msg = msg || "Guardando...";
        Ext.getBody().mask({
            message: msg,
            html:'<div class="center">\n' +
                '        <div class="dotcon dc1">\n' +
                '        <div class="dot01"></div>\n' +
                '        </div>\n' +
                '    \n' +
                '        <div class="dotcon dc2">\n' +
                '        <div class="dot02"></div>\n' +
                '        </div>\n' +
                '    \n' +
                '        <div class="dotcon dc3">\n' +
                '        <div class="dot01"></div>\n' +
                '        </div>\n' +
                '</div> '
        });
    };

    go.unmask = function(){
        Ext.getBody().unmask();
    };

    go.genericErrorFn = function( response ){
        swal({
            title: response.status || "500",
            text: "Server side error!",
            icon: "error",
            closeOnClickOutside: false,
            closeOnEsc: false,
            buttons: false,
            timer: 2000,
        });
    };

    go.Request = function( obj ){
        Ext.Ajax.request({
            async: obj.async || true,
            url: obj.url,
            method: obj.method ,
            params: obj.params || {},
            success: obj.success,
            failure: obj.failure || go.genericErrorFn ,
            callback: obj.callback || Ext.emptyFn
        });
    };

    go.PUT = function( obj ){
        Ext.Ajax.useDefaultXhrHeader = false;
        Ext.Ajax.request({
            async: obj.async || true,
            url: obj.url,
            method: 'PUT',
            params: obj.params || {},
            success: obj.success,
            failure: obj.failure || go.genericErrorFn ,
            callback: obj.callback || Ext.emptyFn
        });
    };

    go.DELETE = function( obj ){
        Ext.Ajax.useDefaultXhrHeader = false;
        Ext.Ajax.request({
            async: obj.async || true,
            url: obj.url,
            method: 'DELETE',
            params: obj.params || {},
            success: obj.success,
            failure: obj.failure || go.genericErrorFn ,
            callback: obj.callback || Ext.emptyFn
        });
    };

    go.POST = function( obj ){
        Ext.Ajax.request({
            async: obj.async || true,
            url: obj.url,
            method: 'POST',
            params: obj.params || {},
            success: obj.success,
            failure: obj.failure || go.genericErrorFn ,
            callback: obj.callback || Ext.emptyFn
        });
    };

    go.GET = function( obj ){
        Ext.Ajax.request({
            async: obj.async || true,
            url: obj.url,
            method: 'GET',
            params: obj.params || {},
            success: obj.success,
            failure: obj.failure || go.genericErrorFn ,
            callback: obj.callback || Ext.emptyFn
        });
    };

    go.success = function ( msg ) {
        swal({
            title: "Excelente!",
            text: msg,
            icon: "success",
            closeOnClickOutside: false,
            closeOnEsc: false,
            buttons: false,
            timer: 2000,
        });
    };

    go.confirm = function ( obj ) {
        swal({
            title: "Estás seguro?",
            text: "Una vez eliminado, no podrás recuperarlo",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(( willDelete ) => {

            if ( willDelete ) {
                // swal("Poof! Your imaginary file has been deleted!", {
                //     icon: "success",
                // });
                obj.ok();

            } else {
                let cancel = Ext.isEmpty( obj.cancel ) ? Ext.emptyFn : obj.cancel;
                cancel();
            }
        });
    };

}());