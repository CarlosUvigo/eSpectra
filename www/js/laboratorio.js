var SpectralWorkbench;
var spectrum = 0;
var data = {
    "data": {
        "name": "Test spectrum",
        "lines": [// as many data points as you like may be entered here:
            {"average": 0, "r": 0, "g": 0, "b": 0, "wavelength": 0},
        ]
    }
};
var data2 = {
    "data": {
        "name": "Test spectrum",
        "lines": [// as many data points as you like may be entered here:
            {"average": 0, "r": 0, "g": 0, "b": 0, "wavelength": 0},
        ]
    }
};

var dataaux = {
    "data": {
        "name": "Test spectrum",
        "lines": [// as many data points as you like may be entered here:
            {"average": 0, "r": 0, "g": 0, "b": 0, "wavelength": 0},
        ]
    }
};

var imageURI = "";

var image = new Image();

var intensidades = [];
var canalevaluar = "";

var placement = "";
var placement2 = "";
var modo = 0;
var count1 = 0;
var count2 = 0;
var countcal = 0;

var ecurecta = "";
var pendiente = 0;
var cortey = 0;

var puntosglobal;


var limiteinf = localStorage.limiteinferior;
var limitesup = localStorage.limitesuperior;
var inc = localStorage.incremento;

var picosb = [];
var picosg = [];
var picosr = [];

function funcionejemplo(placement, ejemplo, modo) {
    console.log("");
    console.log("funcionejemplo");

    var boton1 = document.getElementById('botongaleria');
    boton1.disabled = true;
    var boton2 = document.getElementById('botonejemplo');
    boton2.disabled = true;
    document.getElementById("loader").style.display = 'block';

    this.modo = modo;
    this.placement = placement;
    var largeImage = document.getElementById(placement);
    largeImage.style.display = 'block';
    largeImage.src = ejemplo;
    this.imageURI = ejemplo;
    setTimeout(funciondatosfoto, 1000);

}



function funcionejemplo2(placement1, placement2, ejemplo1, ejemplo2, modo) {
    console.log("");
    console.log("funcionejemplo2");
    this.modo = modo;
    this.placement = placement1;
    this.placement2 = placement2;
    var largeImage = document.getElementById(placement);
    largeImage.style.display = 'block';
    var largeImage2 = document.getElementById(placement2);
    largeImage2.style.display = 'block';
    largeImage.src = ejemplo1;
    largeImage2.src = ejemplo2;
    this.imageURI = ejemplo1;
    setTimeout(funciondatosfoto, 1000);

}

function funcionejemplo3(placement, modo) {
    console.log("");
    console.log("funcionejemplo3");
    var ejemplo = "";

    var boton = document.getElementById('botonejemplo3');
    boton.disabled = true;
    boton = document.getElementById('botoncalibra');
    boton.disabled = true;

    this.modo = modo;
    this.placement = placement;
    this.countcal = this.countcal + 1;
    switch (this.countcal) {
        case 1:
            console.log("Pulsado 1 vez");
            ejemplo = "espectros/1to2chlorophyll.png";
            break;
        case 2:
            console.log("Pulsado 2 veces");
            ejemplo = "espectros/1to3chlorophyll.png";
            break;
        case 3:
            console.log("Pulsado 3 veces");
            ejemplo = "espectros/1to4chlorophyll.png";
            break;
        case 4:
            console.log("Pulsado 4 veces");
            ejemplo = "espectros/1to5chlorophyll.png";
            break;
        case 5:
            console.log("Pulsado 5 veces");
            ejemplo = "espectros/1to6chlorophyll.png";
            break;
        case 6:
            console.log("Pulsado 6 veces");
            ejemplo = "espectros/1to7chlorophyll.png";
            break;
        case 7:
            console.log("Pulsado 7 veces");
            ejemplo = "espectros/1to8chlorophyll.png";
            break;
        case 8:
            console.log("Pulsado 8 veces");
            ejemplo = "espectros/1to9chlorophyll.png";
            break;
        default:
            console.log("Pulsado " + this.countcal + " veces");
            alert("No quedan más imagenes de ejemplo.");
            boton = document.getElementById('botonejemplo3');
            boton.disabled = false;
            boton = document.getElementById('botoncalibra');
            boton.disabled = false;
            break;

    }
    if (this.countcal < 9) {
        var largeImage = document.getElementById(placement);
        largeImage.style.display = 'block';
        largeImage.src = ejemplo;
        this.imageURI = ejemplo;
        setTimeout(funciondatosfoto, 1000);
    }
}

function limpiacontador() {
    console.log("");
    console.log("limpiacontador");

    this.countcal = 0;
    this.canalevaluar = "";
    this.intensidades.length = 0;
}


function funciongaleria(source, placement, modo) {
    console.log("");
    console.log("funciongaleria");

    this.modo = modo;
    this.placement = placement;

    if (modo == 1) {
        var boton1 = document.getElementById('botongaleria');
        boton1.disabled = true;
        var boton2 = document.getElementById('botonejemplo');
        boton2.disabled = true;
        document.getElementById("loader").style.display = 'block';
    }

    if (modo == 2 || modo == 3) {
        var boton1 = document.getElementById('botonespbase');
        boton1.disabled = true;
        var boton2 = document.getElementById('botonespdis');
        boton2.disabled = true;
        var boton3 = document.getElementById('botonejemplo2');
        boton3.disabled = true;
    }

    if (modo === 6) {
        var boton = document.getElementById('botonejemplo3');
        boton.disabled = true;
        boton = document.getElementById('botoncalibra');
        boton.disabled = true;
    }

    navigator.camera.getPicture(onPhotoURISuccess, onFail, {quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source});
}

function onPhotoURISuccess(imageURI) {
    var largeImage = document.getElementById(placement);
    largeImage.style.display = 'block';
    largeImage.src = imageURI;
    this.imageURI = imageURI;
    setTimeout(funciondatosfoto, 1000);
}

function onFail(message) {


    var boton1 = document.getElementById('botongaleria');
    boton1.disabled = false;
    var boton2 = document.getElementById('botonejemplo');
    boton2.disabled = false;
    document.getElementById("loader").style.display = 'none';



    var boton3 = document.getElementById('botonespbase');
    boton3.disabled = false;
    var boton4 = document.getElementById('botonespdis');
    boton4.disabled = false;
    var boton5 = document.getElementById('botonejemplo2');
    boton5.disabled = false;



    var boton6 = document.getElementById('botonejemplo3');
    boton6.disabled = false;
    var boton7 = document.getElementById('botoncalibra');
    boton7.disabled = false;

}


function funciondatosfoto() {
    console.log("");
    console.log("funciondatosfoto");



    var imageURI = this.imageURI;

    var options = {
        "row": "",
        "format": "json",
        "file": "",
        "height": "",
        "width": ""
    };

    options.file = imageURI;
    this.image = new Image();
    this.image.src = imageURI;
    document.images[0].src = this.image.src;


    if (this.image.width > 640) {
        console.log("options.width= resized");
        options.width = 640;

    } else {
        options.width = this.image.width;

    }

    if (this.image.height > 150) {
        console.log("options.height= resized");
        options.height = 150;
        options.row = 150 / 2;
    } else {
        options.height = this.image.height;
        options.row = image.height / 2;
    }

    /*
     console.log("options.width= " + options.width);
     console.log("options.height= " + options.height);
     console.log("options.row= " + options.row);
     */

    image = new SpectralWorkbench.Image(false, options);
    if (image.width === 0) {
        alert("Intentalo de nuevo, por favor");
    }

    var data = this.image.getLine(options.row);
    var output = [];
    data.forEach(function (line, i) {

        if (line[0] === 1) {
            line[0] = 0;
        }
        if (line[1] === 1) {
            line[1] = 0;
        }
        if (line[2] === 1) {
            line[2] = 0;
        }

        output.push({
            'average': (line[0] + line[1] + line[2]) / 3,
            'r': line[0],
            'g': line[1],
            'b': line[2],
            'pixel': i
        });
    });

    this.dataaux.data.lines = output;

    //Calibrado

    if (localStorage.incrementofinal != "") {
        var spectrum = new SpectralWorkbench.Spectrum(this.dataaux);
        spectrum.json.data.lines = spectrum.calibrate(localStorage.limiteinferior, localStorage.incrementofinal, 0, 1);
        spectrum.load(); // calibrate does not save 
        output = spectrum.getJSON();
    }

    //fin calibrado

    if (this.modo != 6) {
        compruebamodo(this.modo, output);

    } else {
        var boton1 = document.getElementById('botonvalorescal');
        boton1.disabled = false;
        var boton2 = document.getElementById('botongraficacalibrado');
        boton2.disabled = false;
        var boton3 = document.getElementById('botonvercal');
        boton3.disabled = false;

        var boton4 = document.getElementById('botonejemplo3');
        boton4.disabled = false;
        var boton5 = document.getElementById('botoncalibra');
        boton5.disabled = false;

        muestralinea(document.getElementById('textolongonda').value, 'cal');
        this.data.data.lines = output;
    }
}


function funcionbotongrafica() {
    console.log("");
    console.log("funcionbotongrafica");

    $('#graph').html("");

    jQuery(document).ready(function ($) {

        graph = new SpectralWorkbench.Graph({});
        spectrum = new SpectralWorkbench.Spectrum(data, graph); // graph is optional but needed if you want changes to spectrum to display

        graph.load(spectrum);
        graph.datum.addAndParseTag('smooth:3');

        var boton1 = document.getElementById('botongaleria');
        boton1.disabled = false;
        var boton2 = document.getElementById('botonejemplo');
        boton2.disabled = false;
        document.getElementById("loader").style.display = 'none';
    });

    document.getElementById("graph").style.display = 'block';
    document.getElementById("formoperaciones").style.display = 'block';


}


function funcioncalcular(funcion) {

    var seleccion = funcion.split(":");
    if (seleccion[0].trim() == "smooth") {
        document.getElementById("maximos").style.display = 'none';
        graph.datum.addAndParseTag('smooth:' + seleccion[1].trim());
    } else {
        if (seleccion[0].trim() == "range") {
            document.getElementById("maximos").style.display = 'none';
            var valores = seleccion[1].split("-");
            graph.datum.addAndParseTag('range:' + valores[0].trim() + '-' + valores[1].trim());
        } else {
            if (seleccion[0].trim() == "lista") {
                encuentrapicos("r");
                encuentrapicos("g");
                encuentrapicos("b");

                document.getElementById("maximos").style.display = 'block';
                document.getElementById('maxr').innerHTML = "Picos R: " + "";

                for (var i = 0; i < Object.keys(this.picosr).length; i++) {
                    document.getElementById('maxr').innerHTML = document.getElementById('maxr').innerHTML + " Valor: " + this.picosr[i].r + " Longitud de onda: " + this.picosr[i].pixel;
                }
                for (var i = 0; i < Object.keys(this.picosg).length; i++) {
                    document.getElementById('maxg').innerHTML = document.getElementById('maxg').innerHTML + " Valor: " + this.picosg[i].g + " Longitud de onda: " + this.picosg[i].pixel;
                }
                for (var i = 0; i < Object.keys(this.picosb).length; i++) {
                    document.getElementById('maxb').innerHTML = document.getElementById('maxb').innerHTML + " Valor: " + this.picosb[i].b + " Longitud de onda: " + this.picosb[i].pixel;
                }


            } else {
                document.getElementById("maximos").style.display = 'none';
                graph.datum.addAndParseTag('transform:' + funcion);
                graph.datum.addAndParseTag('smooth:3');
            }
        }
    }
}

function compruebamodo(modo, output) {

    console.log("");
    console.log("compruebamodo");

//modo operaciones
    if (modo === 1) {
        this.data.data.lines = output;
        funcionbotongrafica();
    }
//Modo espectrofotometro primer boton
    if (modo === 2) {
        this.data.data.lines = output;
        count1 = 1;

        setTimeout(activabotones, 1000);

        if (count1 === 1 && count2 === 1) {
            document.getElementById("formesp").style.display = 'block';
            var inf = parseFloat(localStorage.limiteinferior);
            var sup = parseFloat(localStorage.limitesuperior);
            document.getElementById('cotaslongonda').innerHTML = "Longitud de onda [" + inf.toFixed(2) + " , " + sup.toFixed(2) + "] (nm)";
            muestralinea(document.getElementById('textolanda').value, 'esp1');
            muestralinea(document.getElementById('textolanda').value, 'esp2');
        }
    }
//Modo espectrofotometro segundo boton
    if (modo === 3) {
        this.data2.data.lines = output;
        count2 = 1;

        setTimeout(activabotones, 500);

        if (count1 === 1 && count2 === 1) {
            document.getElementById("formesp").style.display = 'block';
            var inf = parseFloat(localStorage.limiteinferior);
            var sup = parseFloat(localStorage.limitesuperior);
            document.getElementById('cotaslongonda').innerHTML = "Longitud de onda [" + inf.toFixed(2) + " , " + sup.toFixed(2) + "] (nm)";
            muestralinea(document.getElementById('textolanda').value, 'esp1');
            muestralinea(document.getElementById('textolanda').value, 'esp2');
        }
    }
//Modo ejemplo primera foto
    if (modo === 4) {
        this.data.data.lines = output;
        this.imageURI = "espectros/1to3chlorophyll.png";
        this.modo = 5;
        setTimeout(funciondatosfoto, 500);
    }
//Modo ejemplo segunda foto
    if (modo === 5) {
        this.data2.data.lines = output;
        count2 = 1;
        count1 = 1;
        if (count1 === 1 && count2 === 1) {
            document.getElementById("formesp").style.display = 'block';
            var inf = parseFloat(localStorage.limiteinferior);
            var sup = parseFloat(localStorage.limitesuperior);
            document.getElementById('cotaslongonda').innerHTML = "Longitud de onda [" + inf.toFixed(2) + " , " + sup.toFixed(2) + "] (nm)";
            muestralinea(document.getElementById('textolanda').value, 'esp1');
            muestralinea(document.getElementById('textolanda').value, 'esp2');
        }
    }
    //Modo calibracion
    if (modo === 6) {
        //muestralinea(document.getElementById('textolongonda').value, 'cal');

        var longonda = document.getElementById("textolongonda").value;
        var numintensidades = this.intensidades.length;
        var r;
        var g;
        var b;
        var max;


        var lo = parseFloat(longonda);
        var coincidencia = false;
        var contador = 0;
        //this.data.data.lines = output;

        if (this.data.data.lines[0].pixel === undefined) {
//es wavelength

            while (coincidencia === false) {

                lo = lo + contador;

                for (var i = 0; i < this.data.data.lines.length; i++) {

                    var wl = parseFloat(this.data.data.lines[i].wavelength);

                    if (wl.toFixed() == lo.toFixed()) {

                        coincidencia = true;
                        r = this.data.data.lines[i].r;
                        g = this.data.data.lines[i].g;
                        b = this.data.data.lines[i].b;
                        if (this.canalevaluar === "") {
                            max = Math.max(r, g, b);
                            if (max === r) {
                                console.log("Cambiado a R");
                                this.canalevaluar = "r";
                            }
                            if (max === g) {
                                console.log("Cambiado a G");
                                this.canalevaluar = "g";
                            }
                            if (max === b) {
                                console.log("Cambiado a B");
                                this.canalevaluar = "b";
                            }
                        }
                        if (this.canalevaluar === "r") {
                            this.intensidades[numintensidades] = r;
                            console.log("Evaluado en R");
                        }
                        if (this.canalevaluar === "g") {
                            this.intensidades[numintensidades] = g;
                            console.log("Evaluado en G");
                        }
                        if (this.canalevaluar === "b") {
                            this.intensidades[numintensidades] = b;
                            console.log("Evaluado en B");
                        }
                    }
                }
                contador = contador + 1;
            }
        }

        if (this.data.data.lines[0].wavelength === undefined) {
//es pixel

            while (coincidencia === false) {

                lo = lo + contador;

                for (var i = 0; i < this.data.data.lines.length; i++) {

                    var pi = parseFloat(this.data.data.lines[i].pixel);

                    if (pi.toFixed() == lo.toFixed()) {
                        coincidencia = true;
                        r = this.data.data.lines[i].r;
                        g = this.data.data.lines[i].g;
                        b = this.data.data.lines[i].b;
                        if (this.canalevaluar === "") {
                            max = Math.max(r, g, b);
                            if (max === r) {
                                console.log("Cambiado a R");
                                this.canalevaluar = "r";
                            }
                            if (max === g) {
                                this.canalevaluar = "g";
                                console.log("Cambiado a G");
                            }
                            if (max === b) {
                                this.canalevaluar = "b";
                                console.log("Cambiado a B");
                            }
                        }
                        if (this.canalevaluar === "r") {
                            this.intensidades[numintensidades] = r;
                            console.log("Evaluado en R");
                        }
                        if (this.canalevaluar === "g") {
                            this.intensidades[numintensidades] = g;
                            console.log("Evaluado en G");
                        }
                        if (this.canalevaluar === "b") {
                            this.intensidades[numintensidades] = b;
                            console.log("Evaluado en B");
                        }
                    }
                }
                contador = contador + 1;
            }
        }

        for (var i = 0; i < this.intensidades.length; i++) {
            console.log(this.intensidades[i]);
        }

        document.getElementById('valoresobtenidos').innerHTML = "Valores obtenidos: " + this.intensidades.length;
        var boton = document.getElementById('botonejemplo3');
        boton.disabled = false;
        boton = document.getElementById('botoncalibra');
        boton.disabled = false;
        var boton1 = document.getElementById('botonvalorescal');
        boton1.disabled = true;
    }
}

function funcionconcentracion() {

    console.log("");
    console.log("funcionconcentracion");

    var longonda;
    var longitud;
    var epsilon;
    var i0;
    var i1;
    var transmitancia;
    var absorbancia;
    var concentracion;


    longonda = document.getElementById("textolanda").value;
    longitud = document.getElementById("textolong").value;
    epsilon = document.getElementById("textoepsilon").value;


    var maxwidth = this.image.width;
    var porcentaje = (longonda * 100) / maxwidth;

    //console.log(porcentaje + "%");

    this.canalevaluar = "";

    var r;
    var g;
    var b;
    var max;

    var lo = parseFloat(longonda);
    var coincidencia = false;

    var contador = 0;

    if (this.data.data.lines[0].pixel === undefined) {
//es wavelength

        while (coincidencia === false) {

            lo = lo + contador;

            for (var i = 0; i < this.data.data.lines.length; i++) {

                var wl = parseFloat(this.data.data.lines[i].wavelength);

                if (wl.toFixed() === lo.toFixed()) {

                    coincidencia = true;

                    r = this.data.data.lines[i].r;
                    g = this.data.data.lines[i].g;
                    b = this.data.data.lines[i].b;
                    if (this.canalevaluar === "") {
                        max = Math.max(r, g, b);
                        if (max === r) {
                            this.canalevaluar = "r";
                        }
                        if (max === g) {
                            this.canalevaluar = "g";
                        }
                        if (max === b) {
                            this.canalevaluar = "b";
                        }
                    }
                    if (this.canalevaluar === "r") {
                        i0 = r;
                    }
                    if (this.canalevaluar === "g") {
                        i0 = g;
                    }
                    if (this.canalevaluar === "b") {
                        i0 = b;
                    }
                }
            }
            contador = contador + 1;
        }


        for (var i = 0; i < this.data2.data.lines.length; i++) {

            var wl2 = parseFloat(this.data2.data.lines[i].wavelength);

            if (wl2.toFixed() === lo.toFixed()) {

                r = this.data2.data.lines[i].r;
                g = this.data2.data.lines[i].g;
                b = this.data2.data.lines[i].b;
                if (this.canalevaluar === "r") {
                    i1 = r;
                }
                if (this.canalevaluar === "g") {
                    i1 = g;
                }
                if (this.canalevaluar === "b") {
                    i1 = b;
                }
            }
        }
    }



    if (this.data.data.lines[0].wavelength === undefined) {
//es pixel
        console.log("Es pixel");

        while (coincidencia === false) {

            lo = lo + contador;


            for (var i = 0; i < this.data.data.lines.length; i++) {

                var pi = parseFloat(this.data.data.lines[i].pixel);

                if (pi.toFixed() === lo.toFixed()) {

                    coincidencia = true;

                    r = this.data.data.lines[i].r;
                    g = this.data.data.lines[i].g;
                    b = this.data.data.lines[i].b;

                    if (this.canalevaluar === "") {
                        max = Math.max(r, g, b);

                        if (max === r) {
                            this.canalevaluar = "r";
                        }
                        if (max === g) {
                            this.canalevaluar = "g";
                        }
                        if (max === b) {
                            this.canalevaluar = "b";
                        }
                    }
                    if (this.canalevaluar === "r") {
                        i0 = r;
                    }
                    if (this.canalevaluar === "g") {
                        i0 = g;
                    }
                    if (this.canalevaluar === "b") {
                        i0 = b;
                    }
                }
            }
            contador = contador + 1;
        }

        for (var i = 0; i < this.data2.data.lines.length; i++) {

            var pi2 = parseFloat(this.data2.data.lines[i].pixel);

            if (pi2.toFixed() === lo.toFixed()) {
                r = this.data2.data.lines[i].r;
                g = this.data2.data.lines[i].g;
                b = this.data2.data.lines[i].b;

                if (this.canalevaluar === "r") {
                    i1 = r;
                }
                if (this.canalevaluar === "g") {
                    i1 = g;
                }
                if (this.canalevaluar === "b") {
                    i1 = b;
                }
            }
        }
    }



    if (i1 < i0) {
        transmitancia = i1 / i0;
    } else
        transmitancia = i0 / i1;

    document.getElementById('i0').innerHTML = "I0: " + ((Math.max(i0, i1) * 100) / 255).toFixed(4) + "%";
    document.getElementById('i1').innerHTML = "I1: " + ((Math.min(i0, i1) * 100) / 255).toFixed(4) + "%";
    document.getElementById('transmitancia').innerHTML = "Transmitancia: " + transmitancia;
    absorbancia = Math.log10(1 / transmitancia);
    console.log("funcionconcentracion1--------------------> " + absorbancia);

    document.getElementById('absorbancia').innerHTML = "Absorbancia: " + absorbancia;
    concentracion = absorbancia / (epsilon * longitud);
    document.getElementById('concentracion').innerHTML = "Concentracion: " + concentracion;


    /*
     var incremento = (concentracion / 10);
     var pendiente = absorbancia / concentracion;
     /*var lineData = [{
     x: incremento,
     y: incremento * pendiente,
     c: 'black'
     }, {
     x: incremento * 2,
     y: incremento * 2 * pendiente,
     c: 'black'
     }, {
     x: incremento * 3,
     y: incremento * 3 * pendiente,
     c: 'black'
     }, {
     x: incremento * 4,
     y: incremento * 4 * pendiente,
     c: 'black'
     }, {
     x: incremento * 5,
     y: incremento * 5 * pendiente,
     c: 'black'
     }, {
     x: incremento * 6,
     y: incremento * 6 * pendiente,
     c: 'black'
     }, {
     x: incremento * 7,
     y: incremento * 7 * pendiente,
     c: 'black'
     }, {
     x: incremento * 8,
     y: incremento * 8 * pendiente,
     c: 'black'
     }, {
     x: incremento * 9,
     y: incremento * 9 * pendiente,
     c: 'black'
     }, {
     x: concentracion,
     y: absorbancia,
     c: 'black'
     }];*/

    var lineData = [{
            x: 0,
            y: 0,
            c: 'black'
        }, {x: concentracion,
            y: absorbancia,
            c: 'black'
        }];

    graficaconcentracion(lineData, '#visualisation');
}



function graficaconcentracion(lineDataO, visualization) {

    console.log("");
    console.log("graficaconcentracion");

    $(visualization).html("");
    var dataset = lineDataO;
    var w = 330;
    var h = 300;

    //SVG
    var svg = d3.select(visualization)
            .append("svg")
            .attr("width", w)
            .attr("height", h);

    var padding = 30;

    //Escala
    var xScale = d3.scale.linear()
            .domain([0, d3.max(dataset, function (d) {
                    return d.x;
                })])
            .range([padding, w - padding * 2]);

    var yScale = d3.scale.linear()
            .domain([0, d3.max(dataset, function (d) {
                    return d.y;
                })])
            .range([h - padding, padding]);

    //Definir eje X
    var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom");

    //Definir eje Y
    var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");


    //Lineas

    //Funcion de minimos cuadrados para sacar la recta que mejor se ajusta

    var puntosrecta = minimoscuadrados(dataset);

    var lineFunction = d3.svg.line()
            .x(function (d) {
                return xScale(d.x);
            })
            .y(function (d) {
                return yScale(d.y);
            })
            .interpolate("linear");

    svg.append("path")
            .attr("d", lineFunction(puntosrecta))
            .style("stroke-width", 2)
            .style("stroke", "rgb(6,120,155)")
            .style("fill", "none")
            .on("mouseover", function () {
                d3.select(this)
                        .style("stroke", "orange");
            })
            .on("mouseout", function () {
                d3.select(this)
                        .style("stroke", "rgb(6,120,155)");
            });



    //Circulos
    var circles = svg.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle");


    circles.attr("cx", function (d) {
        return xScale(d.x);
    })
            .attr("cy", function (d) {
                return yScale(d.y);
            })
            .attr("r", 3)
            .attr("fill", function (d) {
                return d.c;
            });


    //Texto
    svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .text(function (d) {
                return Math.round(1000 * d.x) / 1000 + "," + Math.round(1000 * d.y) / 1000;
            })

            .attr("x", function (d) {
                return xScale(d.x);
            })
            .attr("y", function (d) {
                return yScale(d.y);
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "9px")
            .attr("fill", "white");

    //Ejes
    svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .call(xAxis);
    svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis);

}

function funcionmodocalibrado() {

    console.log("");
    console.log("funcionmodocalibrado");

    var i0 = 0;
    var i1 = 0;

    var concentracion;
    var absorbancia;
    var transmitancia;

    var puntos = [];
    puntos.push({
        x: 0,
        y: 0
    });


    this.intensidades.sort(function (a, b) {
        return b - a;
    });

    if (this.intensidades.length >= 2) {

        /*console.log("Array ordenado-------------------------");
         for (var i = 0; i < this.intensidades.length; i++) {
         console.log(this.intensidades[i]);
         }
         */

        for (var i = 0; i < this.intensidades.length; i++) {
            if (i === 0) {
                i0 = this.intensidades[i];
                console.log("funcionmodocalibrado agua I0--------------------> " + i0);
            } else {
                i1 = this.intensidades[i];
                console.log("funcionmodocalibrado I1--------------------> " + i1);
                transmitancia = +i1 / +i0;
                console.log("funcionmodocalibrado transmitancia--------------------> " + transmitancia);
                absorbancia = Math.log10(1 / +transmitancia);
                console.log("funcionmodocalibrado absorbancia--------------------> " + absorbancia);

                var e = document.getElementById("textoepsilon2").value;
                var l = document.getElementById("textolong2").value;

                concentracion = +absorbancia / (+e * +l); //considerada logn cubeta = 10mm y epsilon =1
                console.log("funcionmodocalibrado concentracion--------------------> " + concentracion);
                
               
                var absortividad = (-(Math.log10(+transmitancia)))/(+l*+e);
                console.log("funcionmodocalibrado absortividad--------------------> "+absortividad);
                
                transmitancia = Math.pow(10,(-absortividad*concentracion*l));
                console.log("funcionmodocalibrado nueva transmitancia--------------------> " + transmitancia);
                
                concentracion = +absorbancia/(+absortividad*(+l));
                
                console.log("funcionmodocalibrado nueva concentracion--------------------> "+absorbancia+"/"+absortividad+"*"+l+" " + concentracion);
                
                
                
                puntos.push({
                    x: concentracion,
                    y: absorbancia,
                    c: 'black'
                });

            }
        }

        this.puntosglobal = puntos;

        graficaconcentracion(puntos, '#visualisation2');

        document.getElementById('rectaaproximadaresul').innerHTML = this.ecurecta;
        document.getElementById("formconc").style.display = 'block';


    } else {
        alert("Es necesario cargar mínimo 2 espectros.");
    }

    /*console.log("Puntos a representar-------------------------");
     for (var i = 0; i < puntos.length; i++) {
     console.log("X: " + puntos[i].x + " Y: " + puntos[i].y);
     }*/


}


function minimoscuadrados(dataset) {

    console.log("");
    console.log("minimoscuadrados");

    var dataset = dataset;

    var sumx = 0;
    var sumy = 0;
    var sumxy = 0;
    var sumx2 = 0;
    var n = dataset.length;


    for (var i = 0; i < n; i++) {

        sumx = parseFloat(sumx) + parseFloat(dataset[i].x);
        sumy = parseFloat(sumy) + parseFloat(dataset[i].y);
        sumxy = sumxy + (dataset[i].x * dataset[i].y);
        sumx2 = sumx2 + (dataset[i].x * dataset[i].x);

    }

    var exey = (sumx * sumy);
    var ex2 = (sumx * sumx);
    var exeyn = exey / n;
    var ex2n = ex2 / n;

    var m = ((sumxy - exeyn) / (sumx2 - ex2n));

    var mediax = sumx / n;
    var mediay = sumy / n;

    var b = mediay - (m * mediax);

    //console.log("Ecuacion de la recta que mejor se ajusta: y=" + m.toFixed(5) + "x+" + b.toFixed(5));

    this.ecurecta = "y = " + m + "x + " + b;
    this.pendiente = m;
    this.cortey = b;

    var puntosfinal = [];

    var aux;

    for (var i = 0; i < dataset.length; i++) {
        for (var a = 0; a < dataset.length; a++) {
            if (dataset[i].x > dataset[a].x) {
                aux = dataset[i];
                dataset[i] = dataset[a];
                dataset[a] = aux;
            }
        }
    }



    var maxx = dataset[0].x;

    puntosfinal.push({
        x: 0,
        y: b
    });

    puntosfinal.push({
        x: maxx,
        y: m * maxx + b
    });


    return puntosfinal;

}

function funcioncalculoac(modo) {

    console.log("");
    console.log("funcioncalculoac");

    var x = document.getElementById("textoabsorbanciaconocida").value;
    var y = document.getElementById("textoconcentracionconocida").value;

    var modo = modo;

    var m = this.pendiente;
    var b = this.cortey;

    var absorbanciaclaculada;
    var concentracioncalculada;

    var dataset = this.puntosglobal;

    if (modo == 'a') {

        //Calculo concentracion c=mx+b
        concentracioncalculada = (m * x) + b;

        dataset.push({
            x: x,
            y: concentracioncalculada,
            c: '#EBD077'
        });

        graficaconcentracion(dataset, '#visualisation2');


        document.getElementById('resultadoc').innerHTML = " C = " + concentracioncalculada;


    }

    if (modo == 'c') {

        //Calculo absorbancia a=(y-b)/m
        absorbanciaclaculada = (y - b) / m;


        dataset.push({
            x: absorbanciaclaculada,
            y: y,
            c: 'pink'
        });

        graficaconcentracion(dataset, '#visualisation2');

        document.getElementById('resultadoa').innerHTML = " A = " + absorbanciaclaculada;

    }

}


function muestralinea(tipopico, color) {

    console.log("");
    console.log("muestralinea");

    if (this.limiteinf <= 0) {
        var pixel = parseFloat(tipopico) + (-this.limiteinf);
    } else {
        var pixel = parseFloat(tipopico) - this.limiteinf;
    }

    pixel = pixel / this.inc;

    var tipo = color;

    if (tipo == "cal") {
        var c = document.getElementById("lineasCal");
    }
    if (tipo == "esp1") {
        var c = document.getElementById("lineasEsp1");
    }
    if (tipo == "esp2") {
        var c = document.getElementById("lineasEsp2");
    }

    c.style.display = 'block';
    var ctx = c.getContext("2d");

    ctx.clearRect(0, 0, c.width, c.height);

    pixel = pixel * c.width;

    pixel = pixel / 639;
    ctx.beginPath();
    ctx.moveTo(pixel, 0);
    ctx.lineTo(pixel, c.height);
    ctx.lineCap = "round";

    ctx.strokeStyle = 'white';

    ctx.stroke();

}


function vermodoesp() {
    muestralinea(document.getElementById('textolanda').value, 'esp1');
    muestralinea(document.getElementById('textolanda').value, 'esp2');
}


function activabotones() {
    var boton1 = document.getElementById('botonespbase');
    boton1.disabled = false;
    var boton2 = document.getElementById('botonespdis');
    boton2.disabled = false;
    var boton3 = document.getElementById('botonejemplo2');
    boton3.disabled = false;
    setTimeout(activabotones, 1000);
}

function escribefuncion(funcion) {

    document.getElementById('textooperacion').value = funcion;

}


function encuentrapicos(color) {
    var suma = 0;
    var aux = 0;
    var max = 0;
    var pixel = 0;
    var estoyenpico = false;

    var tipo = color;

    if (tipo == "b") {
        this.picosb = [];
    }
    if (tipo == "g") {
        this.picosg = [];
    }
    if (tipo == "r") {
        this.picosr = [];
    }

//Obtener media para eliminar picos de poco valor

    console.log("");
    for (var i = 0; i < this.data.data.lines.length; i++) {

        if (tipo == "b") {
            suma = suma + this.data.data.lines[i].b;
        } else {
            if (tipo == "r") {
                suma = suma + this.data.data.lines[i].r;
            } else {
                suma = suma + this.data.data.lines[i].g;
            }
        }
    }

    var media = (suma / this.data.data.lines.length) + 30;
    console.log("media " + media);



//Encontrar picos en la funcion
    for (var i = 0; i < this.data.data.lines.length; i++) {


        if (tipo == "b") {
            //BLOQUE PARA B
            if (this.data.data.lines[i].b > media) {

                if (!estoyenpico) {
                    max = this.data.data.lines[i].b;
                    if (this.data.data.lines[0].pixel === undefined) {
                        pixel = this.data.data.lines[i].wavelength;
                    } else {
                        pixel = this.data.data.lines[i].pixel;
                    }

                }

                estoyenpico = true;

                aux = this.data.data.lines[i].b;
                if (aux >= max) {

                    max = aux;
                    if (this.data.data.lines[0].pixel === undefined) {
                        pixel = this.data.data.lines[i].wavelength;
                    } else {
                        pixel = this.data.data.lines[i].pixel;
                    }
                }
            } else {
                if (estoyenpico) {
                    estoyenpico = false;
                    //elimina picos por debajo de I=30 (muy pequeños) quitar restriccion si se ve que los picos buscados están ahi en algun caso
                    if (max >= 30) {
                        this.picosb.push({
                            b: max,
                            pixel: pixel
                        });
                    }
                }
            }
        }//END BLOQUE B
        //BLOQUE PARA G
        if (tipo == "g") {
            if (this.data.data.lines[i].g > media) {

                if (!estoyenpico) {
                    max = this.data.data.lines[i].g;
                    if (this.data.data.lines[0].pixel === undefined) {
                        pixel = this.data.data.lines[i].wavelength;
                    } else {
                        pixel = this.data.data.lines[i].pixel;
                    }

                }

                estoyenpico = true;

                aux = this.data.data.lines[i].g;
                if (aux >= max) {

                    max = aux;
                    if (this.data.data.lines[0].pixel === undefined) {
                        pixel = this.data.data.lines[i].wavelength;
                    } else {
                        pixel = this.data.data.lines[i].pixel;
                    }
                }
            } else {
                if (estoyenpico) {
                    estoyenpico = false;
                    //elimina picos por debajo de I=30 (muy pequeños) quitar restriccion si se ve que los picos buscados están ahi en algun caso
                    if (max >= 30) {
                        this.picosg.push({
                            g: max,
                            pixel: pixel
                        });
                    }
                }
            }
        }//END BLOQUE G
        //BLOQUE PARA R
        if (tipo == "r") {

            if (this.data.data.lines[i].r > media) {

                if (!estoyenpico) {
                    max = this.data.data.lines[i].r;
                    if (this.data.data.lines[0].pixel === undefined) {
                        pixel = this.data.data.lines[i].wavelength;
                    } else {
                        pixel = this.data.data.lines[i].pixel;
                    }

                }

                estoyenpico = true;

                aux = this.data.data.lines[i].r;
                if (aux >= max) {

                    max = aux;
                    if (this.data.data.lines[0].pixel === undefined) {
                        pixel = this.data.data.lines[i].wavelength;
                    } else {
                        pixel = this.data.data.lines[i].pixel;
                    }
                }
            } else {
                if (estoyenpico) {
                    estoyenpico = false;
                    //elimina picos por debajo de I=30 (muy pequeños) quitar restriccion si se ve que los picos buscados están ahi en algun caso
                    if (max >= 30) {
                        this.picosr.push({
                            r: max,
                            pixel: pixel
                        });
                    }
                }
            }
        }//END BLOQUE R
    }//Output conseguido

    if (tipo == "b") {
        for (var i = 0; i < Object.keys(this.picosb).length; i++) {
            console.log("Picos azul-> Valor: " + this.picosb[i].b + " Pixel: " + this.picosb[i].pixel);
        }
    }
    if (tipo == "r") {
        for (var i = 0; i < Object.keys(this.picosr).length; i++) {
            console.log("Picos rojo-> Valor: " + this.picosr[i].r + " Pixel: " + this.picosr[i].pixel);
        }
    } else {
        for (var i = 0; i < Object.keys(this.picosg).length; i++) {
            console.log("Picos verde-> Valor: " + this.picosg[i].g + " Pixel: " + this.picosg[i].pixel);
        }
    }
}
