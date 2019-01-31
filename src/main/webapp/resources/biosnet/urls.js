
var Urls = Urls || {};

(function ( ){

    Urls.reportHome = 'http://localhost:8080/Reporte/';

    Urls.report = {
        getAll :        Urls.reportHome + 'listadoReporte/',
        getObjs:        Urls.reportHome + 'ObtieneObjetos/',
        getReport:      Urls.reportHome + 'consultaReporte/',
        updateReport:   Urls.reportHome + 'actualizaReporte/',
        createReport:   Urls.reportHome + 'insertaReporte/',
        deleteReport:   Urls.reportHome + 'borraReporte/'
    };

    Urls.getMenu = 'server/menu.json';

    Urls.getProductsMenu = 'server/pmenu.json';

    Urls.poc = {
        emit : 'http://localhost:8080/ice/poc/emitir/',
        quote: 'http://localhost:8080/ice/poc/cotizar/'
    }

}());