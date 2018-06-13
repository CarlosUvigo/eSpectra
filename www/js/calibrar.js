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
var imageURI = "";
var image = new Image();

var picosb = [];
var picosg = [];
var posB = 0;
var posG = 0;

var limiteinf = 0;
var limitesup = 639;
var inc = 1;


var hayimagen = false;


function funcionejemplo() {

    var boton1 = document.getElementById('botonreset');
    var boton2 = document.getElementById('botongaleria');
    boton1.disabled = true;
    boton2.disabled = true;
    document.getElementById("loader").style.display = 'block';
    var largeImage = document.getElementById('fotovisualizar');
    largeImage.style.display = 'block';
    largeImage.src = "espectros/CFL1.png";
    this.imageURI = "espectros/CFL1.png";
    setTimeout(funciondatosfoto, 1000);
    //funciondatosfoto("espectros/test2.png");
}

function funciongaleria(source) {

    var boton1 = document.getElementById('botonreset');
    var boton2 = document.getElementById('botongaleria');
    boton1.disabled = true;
    boton2.disabled = true;
    document.getElementById("loader").style.display = 'block';
    
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source});
}
function onPhotoURISuccess(imageURI) {
    var largeImage = document.getElementById('fotovisualizar');
    largeImage.style.display = 'block';
    largeImage.src = imageURI;
    this.imageURI = imageURI;
    setTimeout(funciondatosfoto, 1000);
}
function onFail(message) {
    var boton1 = document.getElementById('botonreset');
    var boton2 = document.getElementById('botongaleria');
    boton1.disabled = false;
    boton2.disabled = false;
    document.getElementById("loader").style.display = 'none';
}


function funciondatosfoto() {

    this.limiteinf = 0;
    this.limitesup = 639;
    this.inc = 1;

    this.hayimagen = true;

    var boton5 = document.getElementById('botoncalibrar');
    boton5.disabled = false;


    var imageURI = this.imageURI;
    //alert("Imagen cargada: " + imageURI);

    var options = {
        "row": "",
        "format": "json",
        "file": "",
        "height": "",
        "width": ""
    };
    options.file = imageURI;
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


    /*console.log("options.width= " + options.width);
     console.log("options.height= " + options.height);
     console.log("options.row= " + options.row);*/


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
    this.data.data.lines = output;
    funcionbotongrafica()
}


function funcionbotongrafica() {

    $('#graph').html("");
    document.getElementById("graph").style.display = 'block';
    jQuery(document).ready(function ($) {

        graph = new SpectralWorkbench.Graph({});
        spectrum = new SpectralWorkbench.Spectrum(data, graph); // graph is optional but needed if you want changes to spectrum to display

        graph.load(spectrum);
        graph.datum.addAndParseTag('smooth:3');
        document.getElementById("posicionfrec").style.display = 'block';
        var boton1 = document.getElementById('botonreset');
        var boton2 = document.getElementById('botongaleria');
        boton1.disabled = false;
        boton2.disabled = false;
        document.getElementById("loader").style.display = 'none';
        calibracionautom();
    });
}


function calibracionautom() {

    encuentrapicos("b");
    encuentrapicos("g");

    var longB = Object.keys(this.picosb).length;
    var longG = Object.keys(this.picosg).length;

    if (longB >= 2) {
        muestralinea(this.picosb[1].pixel, "b");
        this.posB = 1;
    } else {
        muestralinea(this.picosb[0].pixel, "b");
        this.posB = 0;
    }

    if (longG >= 2) {
        muestralinea(this.picosg[1].pixel, "g");
        this.posG = 1;
    } else {
        muestralinea(this.picosg[0].pixel, "g");
        this.posG = 0;
    }

}


function muestralinea(tipopico, color) {
    if (this.limiteinf <= 0) {
        var pixel = tipopico + (-this.limiteinf);
    } else {
        var pixel = tipopico - this.limiteinf;
    }
    pixel = pixel / this.inc;

    var tipo = color;

    if (tipo == "b") {
        var c = document.getElementById("lineasB");
    } else {
        var c = document.getElementById("lineasG");
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
    if (tipo == "b") {
        ctx.strokeStyle = 'blue';
    } else {
        ctx.strokeStyle = 'green';
    }
    ctx.stroke();

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

//Obtener media para eliminar picos de poco valor

    console.log("");
    for (var i = 0; i < this.data.data.lines.length; i++) {

        if (tipo == "b") {
            suma = suma + this.data.data.lines[i].b;
        } else {
            suma = suma + this.data.data.lines[i].r;
        }
    }

    var media = (suma / this.data.data.lines.length) + 10;
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
            }//END BLOQUE B
        } else {
            //BLOQUE PARA G
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
            }//END BLOQUE G
        }
    }//Output conseguido

    if (tipo == "b") {
        for (var i = 0; i < Object.keys(this.picosb).length; i++) {
            console.log("Picos azul-> Valor: " + this.picosb[i].b + " Pixel: " + this.picosb[i].pixel);
        }
    } else {
        for (var i = 0; i < Object.keys(this.picosg).length; i++) {
            console.log("Picos verde-> Valor: " + this.picosg[i].g + " Pixel: " + this.picosg[i].pixel);
        }
    }
}


function cambiapico(color, direccion) {

    var boton1 = document.getElementById('botonizquierdab');
    var boton2 = document.getElementById('botonderechab');
    var boton3 = document.getElementById('botonizquierdag');
    var boton4 = document.getElementById('botonderechag');
    var boton5 = document.getElementById('botoncalibrar');
    boton1.disabled = true;
    boton2.disabled = true;
    boton3.disabled = true;
    boton4.disabled = true;
    boton5.disabled = true;

    var tipo = color;
    var dir = direccion;



    //Azul
    if (tipo == "b") {
        var longB = Object.keys(this.picosb).length;
        //derecha
        if (dir == "der") {

            //si se pasa, vuelve
            if (longB === (this.posB + 1)) {
                this.posB = 0;
                muestralinea(this.picosb[this.posB].pixel, "b");
            } else {
                this.posB = this.posB + 1;
                muestralinea(this.picosb[this.posB].pixel, "b");
            }

        }
        //izquierda
        if (dir == "izq") {

            //si se pasa, vuelve
            if (this.posB === 0) {
                this.posB = longB - 1;
                muestralinea(this.picosb[this.posB].pixel, "b");
            } else {
                this.posB = this.posB - 1;
                muestralinea(this.picosb[this.posB].pixel, "b");
            }

        }



        //Verde
    }
    if (tipo == "g") {
        var longG = Object.keys(this.picosg).length;
        //derecha
        if (dir == "der") {
            //si se pasa, vuelve
            if (longG === (this.posG + 1)) {
                this.posG = 0;
                muestralinea(this.picosg[this.posG].pixel, "g");
            } else {
                this.posG = this.posG + 1;
                muestralinea(this.picosg[this.posG].pixel, "g");
            }
        }
        //izquierda
        if (dir == "izq") {
            //si se pasa, vuelve
            if (this.posG === 0) {
                this.posG = longG - 1;
                muestralinea(this.picosg[this.posG].pixel, "g");
            } else {
                this.posG = this.posG - 1;
                muestralinea(this.picosg[this.posG].pixel, "g");
            }
        }

    }

    boton1.disabled = false;
    boton2.disabled = false;
    boton3.disabled = false;
    boton4.disabled = false;
    boton5.disabled = false;

}


function calibrar() {

    var boton1 = document.getElementById('botonreset');
    var boton2 = document.getElementById('botongaleria');
    boton1.disabled = true;
    boton2.disabled = true;
    document.getElementById("loader").style.display = 'block';
    var boton5 = document.getElementById('botoncalibrar');
    boton5.disabled = true;

    var posB = this.picosb[this.posB].pixel;
    var posG = this.picosg[this.posG].pixel;



    var intervalo = 0;
    var numeropuntos = 0;

    var totalpuntos = this.data.data.lines.length;

    if (posG >= posB) {
        intervalo = 546.5 - 436.6;
        console.log("");
        console.log("intervalo: " + intervalo);

        numeropuntos = posG - posB;

        console.log("Numero puntos: " + numeropuntos);

        var incremento = intervalo / numeropuntos;

        console.log("Incremento: " + incremento);

        var limiteinferior = 436.6;
        var limitesuperior = 546.5;

        for (var i = posB; i > 0; i--) {
            limiteinferior = limiteinferior - incremento;
        }

        for (var i = posG; i < totalpuntos; i++) {
            limitesuperior = limitesuperior + incremento;
        }

        console.log("Min = " + limiteinferior);
        console.log("Max = " + limitesuperior);

        var incrementofinal = limiteinferior + incremento;

        console.log("Segundo parametro = " + incrementofinal);


        var spectrum = new SpectralWorkbench.Spectrum(this.data);

        spectrum.json.data.lines = spectrum.calibrate(limiteinferior, incrementofinal, 0, 1);

        spectrum.load(); // calibrate does not save 

        this.data.data.lines = spectrum.getJSON();

        this.limiteinf = limiteinferior;
        this.limitesup = limitesuperior;
        this.inc = incremento;

        localStorage.incremento = incremento;
        localStorage.limiteinferior = limiteinferior;
        localStorage.limitesuperior = limitesuperior;
        localStorage.incrementofinal = incrementofinal;

        console.log("Local Set-> Incremento: " + localStorage.incremento + " limiteinferior " + localStorage.limiteinferior + " limitesuperior " + localStorage.limitesuperior + " incrementofinal " + localStorage.incrementofinal);


        funcionbotongrafica();

    } else {
        alert("Tu imagen está invertida. Edítala, por favor.");
    }


}


function resetcalibracion() {

    this.limiteinf = 0;
    this.limitesup = 639;
    this.inc = 1;

    localStorage.incremento = "1";
    localStorage.limiteinferior = "0";
    localStorage.limitesuperior = "639";
    localStorage.incrementofinal = "";

    console.log("Local Reset-> Incremento: " + localStorage.incremento + " limiteinferior " + localStorage.limiteinferior + " limitesuperior " + localStorage.limitesuperior + " incrementofinal " + localStorage.incrementofinal);

    var boton1 = document.getElementById('botonreset');
    var boton2 = document.getElementById('botongaleria');
    boton1.disabled = true;
    boton2.disabled = true;
    document.getElementById("loader").style.display = 'block';

    if (this.hayimagen) {
        setTimeout(funciondatosfoto, 1000);
    } else {
        var boton1 = document.getElementById('botonreset');
        var boton2 = document.getElementById('botongaleria');
        boton1.disabled = false;
        boton2.disabled = false;
        document.getElementById("loader").style.display = 'none';
    }

    alert("Valores de calibración resetedos.");

}

