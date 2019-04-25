// Fondo
$(function fondo() {
    var d = new Date();
    var time = d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
    var giro = Math.round((time) * -1);
    $('.hora').css('animation-delay', giro + 's');
    $('.hora').css('-webkit-animation-delay', giro + 's');
    cambiarPorcentajes(1);
});


// Menú circular
$(function calculaCirculo() {
    ancho = $('.menucircular')[0].getBoundingClientRect().height;
    $('body').css('--circulo', ancho + 'px');
});

$(window).resize(function calculaCirculo() {
    var ancho = $('.menucircular')[0].getBoundingClientRect().height;
    $('body').css('--circulo', ancho + 'px');
});

function giramenu(grados, planta) {
    var deg = parseInt(grados);
    var actual = parseInt($('body').css('--rotacion'));
    if (actual == -270 && deg == 0) {
        $('body').css('--rotacion', (-1) * 360 + 'deg');
        setTimeout(function() {
            $('.menucircular').css('transition', '0s');
            $('body').css('--rotacion', 0 + 'deg')
        }, 1000);
    } else if (actual == 0 && deg == 270) {
        $('body').css('--rotacion', 90 + 'deg');
        setTimeout(function() {
            $('.menucircular').css('transition', '0s');
            $('body').css('--rotacion', -270 + 'deg')
        }, 1000);
    } else {
        $('body').css('--rotacion', (-1) * deg + 'deg');
    }

    $('.menucircular').css('transition', '1s');
    cambiarPorcentajes(planta);
}

function cambiarPorcentajes(planta) {
    var archivo = "xml/datos.xml";
    var xml = new JKL.ParseXML(archivo);
    var datos = xml.parse();
    var temperatura = 0;
    var humaire = 0;
    var humtierra = 0;
    var luminosidad = 0;

    for (var i = 0; i < Object.keys(datos.APAM.registros.registro).length && temperatura == 0; i++) {
        if (datos.APAM.registros.registro[i].planta === datos.APAM.plantas.planta[planta - 1].id) {
            temperatura = datos.APAM.registros.registro[i].temperatura;
            humaire = datos.APAM.registros.registro[i].humedad_aire;
            humtierra = datos.APAM.registros.registro[i].humedad_tierra;
            luminosidad = datos.APAM.registros.registro[i].luminosidad;
        }
    }
    $(".temp span").html(temperatura + "ºC");
    $("#statcirculosvg").css("--porcentajetempe", 0 + "");
    $("#statcirculosvg").css("--porcentajetempe", parseInt(temperatura) + "");
    $(".humaire span").html(humaire + "%");
    $("#statcirculosvg").css("--porcentajehumai", 0 + "");
    $("#statcirculosvg").css("--porcentajehumai", parseInt(humaire) + "");
    $(".humagua span").html(humtierra + "%");
    $("#statcirculosvg").css("--porcentajehumti", 0 + "").wait(5000).then(function(){
    $("#statcirculosvg").css("--porcentajehumti", parseInt(humtierra) + "");});
    $(".luz span").html(luminosidad + "%");
    $("#statcirculosvg").css("--porcentajelumi", 0 + "");
    $("#statcirculosvg").css("--porcentajelumi", parseInt(luminosidad) + "");

}
