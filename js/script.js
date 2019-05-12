// Fondo
$(function fondo() {
    var d = new Date();
    var time = d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
    var giro = Math.round((time) * -1);
    $('.hora').css('animation-delay', giro + 's');
    $('.hora').css('-webkit-animation-delay', giro + 's');
    cambiarPorcentajes(1);
    calculaCirculo();
});


$(function nubes(){
    generarNubes();
    generarNubes();    
});

function generarNubes(){
    var num1 = Math.floor((Math.random() * 1250) + 100);
    var num2 = Math.floor((Math.random() * 1250) + 100);
    var parte1 = Math.floor((Math.random() * 10) + 1);
    var parte2 = Math.floor((Math.random() * 4) + 1);
    var lista = ["img/nube1.png","img/nube2.png","img/nube3.png", "img/nube4.png", "img/nube5.png"];
    var nube = lista[Math.floor(Math.random() * lista.length)];
    var nube2 = lista[Math.floor(Math.random() * lista.length)];
    if(nube2 == nube){
        nube2 = lista[Math.floor(Math.random() * lista.length)];
    }
    $(".nubes").append('<img src='+nube+' class="nube" style="animation: nube '+num1+'s cubic-bezier(0.06, 0.35, 0.84, 0.32) infinite;animation-delay: '+-num1/parte1+'s;"/>');
    $(".nubes").append('<img src='+nube2+' class="nube" style="animation: nube '+num2+'s cubic-bezier(0.43, 1.12, 0.85, 1) infinite;animation-delay: '+-num2/parte2+'s;"/>');
}

// Menú superior

function abrirmenu(grados){
    if($(".menuitem").hasClass('abierto')){
        $(".menuitem").removeClass('abierto');
    }
    else{
        $(".menuitem").addClass('abierto');   
    }

}
// Menú Stats

$(window).resize(function calculaCirculo2() {
  setTimeout(function() {
    calculaCirculo();
}, 150); 
});

function calculaCirculo() {
    var ancho = $('.menucircular')[0].getBoundingClientRect().height;
    $('body').css('--circulo', ancho + 'px');
}

function giramenu(grados, planta) {
    var deg = parseInt(grados);
    var actual = parseInt($('body').css('--rotacion'));
    if (actual == -270 && deg == 0) {
        $('body').css('--rotacion', (-1) * 360 + 'deg');
        setTimeout(function() {
            $('.menucircular').css('transition', '0s');
            $('body').css('--rotacion', 0 + 'deg');
        }, 1000);
    } else if (actual == 0 && deg == 270) {
        $('body').css('--rotacion', 90 + 'deg');
        setTimeout(function() {
            $('.menucircular').css('transition', '0s');
            $('body').css('--rotacion', -270 + 'deg');
        }, 1000);
    } else {
        $('body').css('--rotacion', (-1) * deg + 'deg');
    }
    $('.menucircular').css('transition', '1s');
    cambiarPorcentajes(planta);
}

// function cambiarPorcentajes(planta) {
//     $.ajax({
//         type: "GET",
//         url: "xml/datos.xml",   
//         dataType: "xml",
//         success: function(xml) {
//             var temperatura = 0;
//             var humaire = 0;
//             var humtierra = 0;
//             var luminosidad = 0;
//             var id;
//             $(xml).find("planta:eq(" + (planta - 1) + ")").each(function() {
//                 id = $(this).attr("id");
//             });
//             for (var i = 0; i < $(xml).find("registro").length && temperatura == 0; i++) {
//                 $(xml).find("registro:eq(" + i + ")").each(function() {
//                     if ($(this).attr("planta") == id) {
//                         temperatura = $(this).find("temperatura").text();
//                         humaire = $(this).find("humedad_aire").text();
//                         humtierra = $(this).find("humedad_tierra").text();
//                         luminosidad = $(this).find("luminosidad").text();
//                     }
//                 });
//             }
//             $(".temp span").html(temperatura + "ºC");
//             $(".humaire span").html(humaire + "%");
//             $(".humagua span").html(humtierra + "%");
//             $(".luz span").html(luminosidad + "%");
//             $("#statcirculosvg").css("--porcentajetempe", 0 + "");
//             $("#statcirculosvg").css("--porcentajehumai", 0 + "");
//             $("#statcirculosvg").css("--porcentajehumti", 0 + "");
//             $("#statcirculosvg").css("--porcentajelumi", 0 + "");
//             setTimeout(function() {
//                 $("#statcirculosvg").css("--porcentajetempe", parseInt(temperatura) + "");
//                 $("#statcirculosvg").css("--porcentajehumai", parseInt(humaire) + "");
//                 $("#statcirculosvg").css("--porcentajelumi", parseInt(luminosidad) + "");
//                 $("#statcirculosvg").css("--porcentajehumti", parseInt(humtierra) + "");
//             }, 1000);
//         }
//     });
// }

function cambiarPorcentajes(planta) {
    $(".temp span").html(obtenerXML() + "ºC");
}

function obtenerXML(){
    $.ajax({
        type: "GET",
        url: "xml/datos.xml",   
        dataType: "xml",
        success: function(xml) {
            return xml;
        }
    });
}


function obtenerIdPlanta(planta){
    $(obtenerXML()).find("planta:eq(" + (planta - 1) + ")").each(function() {
     return $(this).attr("id");
 });    
}

function obtenerTemperaturaActual(planta){
    for (var i = 0; i < $(obtenerXML()).find("registro").length && temperatura == 0; i++) {
        $(obtenerXML()).find("registro:eq(" + i + ")").each(function() {
            if ($(this).attr("planta") == obtenerIdPlanta(planta)) {
                return $(this).find("temperatura").text();
            }
        });
    }
}

