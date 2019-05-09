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
    var ancho = $('.menucircular')[0].getBoundingClientRect().height;
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

function cambiarPorcentajes(planta) {
    $.ajax({
        type: "GET",
        url: "https://apamiv.netlify.com/xml/datos.xml",
        dataType: "xml",
        success: function(xml) {
            setTimeout(function() {
                $("#statcirculosvg").css("--porcentajehumti", "60");
            }, 1000);
            }
    });
}


function abrirmenu(grados){
    if($(".menuitem").hasClass('abierto')){
        $(".menuitem").removeClass('abierto');
    }
    else{
        $(".menuitem").addClass('abierto');   
    }

}
