// Ventana Responsive
$(window).on('load', function cargando() {
        $(".cargando").css("opacity","0");
        setTimeout(function() { 
            $(".cargando").hide();
        }, 1000);
        
});

$(window).resize(function redimensionar() {
    setTimeout(function() { calculaCirculo(); }, 150); 
});

function calculaCirculo() {
    var ancho = $('.menucircular')[0].getBoundingClientRect().height;
    $('body').css('--circulo', ancho + 'px');
}


// Cielo y config inicial
$(function fondo() {
    var d = new Date();
    var time = d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
    var desplazar = Math.round((time) * -1);
    $('.hora').css('animation-delay', desplazar + 's');
    $('.hora').css('-webkit-animation-delay', desplazar + 's');
    if(desplazar > -21000 || desplazar < -75000){
        $('.planta').css("filter", "hue-rotate(31deg) saturate(0.8) brightness(0.7)");
    }
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

function muestraOptimos(){
    if($(".optima").hasClass('mostrar')){
        $(".optima").removeClass('mostrar');
    }
    else{
        $(".optima").addClass('mostrar');   
    }
}

// Advertencias

function cierraAdvertencias(){
    if($(".advertencia").hasClass('cerrado')){
        $(".advertencia").removeClass('cerrado');
    }
    else{
        $(".advertencia").addClass('cerrado');   
    }   
}

function compruebaAdvertencias(){
    var advertencias = "";
    if($("#statcirculosvg").css("--porcentajetempe") <= "0"){
        advertencias += "Temperatura demasiado baja. <br>";
    }
    if($("#statcirculosvg").css("--porcentajetempe") >= "100"){
        advertencias += "Temperatura demasiado alta. <br>";
    }

    if($("#statcirculosvg").css("--porcentajehumai") <= "0"){
        advertencias += "Insuficiente humedad en el aire. <br>";
    }
    if($("#statcirculosvg").css("--porcentajehumai") >= "100"){
        advertencias += "Demasiada humedad en el aire. <br>";
    }

    if($("#statcirculosvg").css("--porcentajehumti") <= "0"){
        advertencias += "Insuficiente humedad en la tierra. <br>";
    }
    if($("#statcirculosvg").css("--porcentajehumti") >= "100"){
        advertencias += "Demasiada humedad en la tierra. <br>";
    }

    if($("#statcirculosvg").css("--porcentajelumi") <= "0"){
        advertencias += "Necesita más luz solar. <br>";
    }
    if($("#statcirculosvg").css("--porcentajelumi") >= "100"){
        advertencias += "Demasiada luz solar. <br>";
    }

    $(".advertencia .media-body").append(advertencias);        
    if(advertencias != ""){
        $(".advertencia").show();
    }
    else{
        $(".advertencia").hide();   
    }
}
// Menú plantas y estadisticas radial
function giramenu(grados, planta) {
    cambiarPorcentajes(planta);
    cambiarImgPlanta(planta);
    var deg = parseInt(grados);
    var actual = parseInt($('body').css('--rotacion'));
    if (actual == -270 && deg === 0) {
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
}

function cambiarImgPlanta(planta){
    var img = "";
    if(planta == 1){
        img= "img/gardenia.svg";
        $('.planta > object').css('width', 'calc(var(--circulo)/1.5)');
    }
    if(planta == 2){
        img= "img/poto.svg";
    }
    if(planta == 3){
        img= "img/cactus.svg";
        $('.planta > object').css('width', 'calc(var(--circulo)/1.1)');
    }
    if(planta == 4){
        img= "img/culantrillo.svg";
    }
    $(".planta > object").attr("data", img);
    
}

// Coger datos del XML
function cambiarPorcentajes(planta) {
    $.ajax({
        type: "GET",
        url: "xml/datos.xml",   
        dataType: "xml",
        success: function(xml) {
            var id;
            var temperatura = 0;
            var tempopt = 0;
            var humaire = 0;
            var haiopt = 0;
            var humtierra = 0;
            var htiopt = 0;
            var luminosidad = 0;
            var lumiopt = 0;

            $(xml).find("planta:eq(" + (planta - 1) + ")").each(function() {
                id = $(this).attr("id");
                tempopt= $(this).find("temperatura_opt");
                haiopt= $(this).find("humedad_aire_opt");
                htiopt= $(this).find("humedad_tierra_opt");
                lumiopt= $(this).find("luminosidad_opt");
            });
            for (var i = 0; i < $(xml).find("registro").length && temperatura === 0; i++) {
                $(xml).find("registro:eq(" + i + ")").each(function() {
                    if ($(this).attr("planta") == id) {
                        temperatura = $(this).find("temperatura").text();
                        humaire = $(this).find("humedad_aire").text();
                        humtierra = $(this).find("humedad_tierra").text();
                        luminosidad = $(this).find("luminosidad").text();
                    }
                });
            }
            // Concretos
            $(".temp.concreta span").html(temperatura + "ºC");
            $(".humaire.concreta span").html(humaire + "%");
            $(".humagua.concreta span").html(humtierra + "%");
            $(".luz.concreta span").html(luminosidad + "%");
            
            //Optimos
            $(".temp.optima span").html(tempopt.attr("min") + "ºC / " + tempopt.attr("max") + "ºC");
            $(".humaire.optima span").html(haiopt.attr("min") + "% / " + haiopt.attr("max") + "%");
            $(".humagua.optima span").html(htiopt.attr("min") + "% / " + htiopt.attr("max") + "%");
            $(".luz.optima span").html(lumiopt.attr("min") + "% / " + lumiopt.attr("max") + "%");

            // Circular
            $("#statcirculosvg").css("--porcentajetempe", 0 +"");
            $("#statcirculosvg").css("--porcentajehumai", 0 + "");
            $("#statcirculosvg").css("--porcentajehumti", 0 + "");
            $("#statcirculosvg").css("--porcentajelumi", 0 + "");
            setTimeout(function() {
                var suma = (parseInt(temperatura) - parseInt(tempopt.attr("min"))) *100 /(parseInt(tempopt.attr("max")) - parseInt(tempopt.attr("min")));
                $("#statcirculosvg").css("--porcentajetempe", suma+"");
                suma = (parseInt(humaire) - parseInt(haiopt.attr("min"))) *100 /(parseInt(haiopt.attr("max")) - parseInt(haiopt.attr("min")));
                $("#statcirculosvg").css("--porcentajehumai", suma + "");
                suma = (parseInt(luminosidad) - parseInt(lumiopt.attr("min"))) *100 /(parseInt(lumiopt.attr("max")) - parseInt(lumiopt.attr("min")));
                $("#statcirculosvg").css("--porcentajelumi", suma + "");
                suma = (parseInt(humtierra) - parseInt(htiopt.attr("min"))) *100 /(parseInt(htiopt.attr("max")) - parseInt(htiopt.attr("min")));
                $("#statcirculosvg").css("--porcentajehumti", suma + "");
            }, 1000);
            
            compruebaAdvertencias();
        }
    });
}
