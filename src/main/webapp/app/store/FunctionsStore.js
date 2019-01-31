


Ext.define('Ice.store.FunctionsStore', {
    extend: 'Ext.data.Store',

    alias: 'store.functions',

    fields: ['name', 'description','expression','example'],

    data : [
        {
            "name":"Suma",
            "description":"Operación aritmética que consiste en reunir varias cantidades en una sola" ,
            "expression":"SUM[]",
            "example":"#SUM[ valor 1, valor...n ]",
        },{
		    "name":"Resta",
		    "description":"Operación aritmética que consiste en quitar una cantidad (el sustraendo) de otra (el minuendo) para averiguar la diferencia entre las dos" ,
		    "expression":"RES[]",
		    "example":"#RES[ valor 1, valor...n ]",
	    },{
		    "name":"Multiplicación",
		    "description":"Operación aritmética que consiste en calcular el resultado (producto) de sumar un mismo número (multiplicando) tantas veces como indica otro número (multiplicador)" ,
		    "expression":"Mult[]",
		    "example":"#MULT[ valor 1, valor...n ]",
	    }
    ]

});