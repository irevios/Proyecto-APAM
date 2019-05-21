// Ventana Responsive
$(window).on('load', function cargando() {
	$(".cargando").css("opacity", "0");
	setTimeout(function() {
		$(".cargando").hide();
	}, 1000);
});

$(window).resize(function redimensionar() {
	setTimeout(function() {
		calculaCirculo();
	}, 150);
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
	if (desplazar > -21000 || desplazar < -75000) {
		$('.planta').css("filter", "hue-rotate(31deg) saturate(0.8) brightness(0.7)");
	}
	leeXML(1);
	calculaCirculo();
});

$(function nubes() {
	generarNubes();
	generarNubes();
});

function numAleatorio(minimo, maximo) {
	return (Math.floor(Math.random() * (maximo - minimo + 1)) + minimo);
}

function generarNubes() {
	var velocidadRandom1 = numAleatorio(1250, 100);
	var velocidadRandom2 = numAleatorio(1250, 100);
	var parte1 = numAleatorio(10, 1);
	var parte2 = numAleatorio(4, 1);
	var lista = ["img/nube1.png", "img/nube2.png", "img/nube3.png", "img/nube4.png", "img/nube5.png"];
	var nube = lista[Math.floor(Math.random() * lista.length)];
	var nube2 = lista[Math.floor(Math.random() * lista.length)];
	if (nube2 == nube) {
		nube2 = lista[Math.floor(Math.random() * lista.length)];
	}
	$(".nubes").append('<img src=' + nube + ' class="nube" style="animation: nube ' + velocidadRandom1 + 's cubic-bezier(0.06, 0.35, 0.84, 0.32) infinite;animation-delay: ' + -velocidadRandom1 / parte1 + 's;"/>');
	$(".nubes").append('<img src=' + nube2 + ' class="nube" style="animation: nube ' + velocidadRandom2 + 's cubic-bezier(0.43, 1.12, 0.85, 1) infinite;animation-delay: ' + -velocidadRandom2 / parte2 + 's;"/>');
}

// Menú superior
function abrirMenu(grados) {
	if ($(".menuitem").hasClass('abierto')) {
		$(".menuitem").removeClass('abierto');
	} else {
		$(".menuitem").addClass('abierto');
	}
}

function muestraOptimos() {
	if ($(".optima").hasClass('mostrar')) {
		$(".optima").removeClass('mostrar');
	} else {
		$(".optima").addClass('mostrar');
	}
}

// Estadisticas
function mostrarEstadisticas(){
	if ($(".estadisticas").hasClass('esconder')) {
		$(".estadisticas").removeClass('esconder');
		$(".boton img").css("margin","1.25em 0.25em");
		$(".boton img").css("transform","rotate(180deg)");
		$(".boton").addClass("gira");
	} else {
		$(".estadisticas").addClass('esconder');
		$(".boton img").css("margin","1.25em 0.15em");
		$(".boton img").css("transform","rotate(0deg)");
		$(".boton").removeClass("gira");
	}
}
// Advertencias
function cierraAdvertencias() {
	if ($(".advertencia").hasClass('cerrado')) {
		$(".advertencia").removeClass('cerrado');
		setTimeout(function() {
			$(".advertencia > .media-body").show();
		}, 950);
	} else {
		$(".advertencia > .media-body").hide();
		setTimeout(function() {
			$(".advertencia").addClass('cerrado');
		}, 500);
	}
}

function compruebaAdvertencias() {
	var advertencias = "";
	var valor = $("#statcirculosvg").css("--porcentajetempe");
	if (parseInt(valor) <= 0) {
		advertencias += "Temperatura demasiado baja. \n";
	}
	if (parseInt(valor) >= 100) {
		advertencias += "Temperatura demasiado alta. \n";
	}
	valor = $("#statcirculosvg").css("--porcentajehumai");
	if (parseInt(valor) <= 0) {
		advertencias += "Insuficiente humedad en el aire. \n";
	}
	if (parseInt(valor) >= 100) {
		advertencias += "Demasiada humedad en el aire. \n";
	}
	valor = $("#statcirculosvg").css("--porcentajehumti");
	if (parseInt(valor) <= 0) {
		advertencias += "Insuficiente humedad en la tierra. \n";
	}
	if (parseInt(valor) >= 100) {
		advertencias += "Demasiada humedad en la tierra. \n";
	}
	valor = $("#statcirculosvg").css("--porcentajelumi");
	if (parseInt(valor) <= 0) {
		advertencias += "Necesita más luz solar. \n";
	}
	if (parseInt(valor) >= 100) {
		advertencias += "Demasiada luz solar. \n";
	}

	$(".advertencia .media-body").text(advertencias);
	if (advertencias != "") {
		$(".advertencia").show();
		$(".boton").removeClass("no");
	} else {
		$(".advertencia").hide();
		$(".boton").addClass("no");
	}
}

// Regar planta
function regar() {
	$('.regar').append('<div class="agua"></div>');
	aguaCayendo();
	setTimeout(function() {
		$('.agua').remove();
	}, 5000);
}

function aguaCayendo() {
	for (i = 1; i < 150; i++) {
		var margenIzq = numAleatorio(0, 500);
		var margenDer = numAleatorio(-1000, 1400);
		$('.agua').append('<div class="gota" id="gota' + i + '"></div>');
		$('#gota' + i).css('left', margenIzq);
		$('#gota' + i).css('top', margenDer);
	}
}


// Menú plantas y estadisticas radial
function giraMenu(grados, planta) {
	leeXML(planta);
	cambiarImgPlanta(planta);
	var gradosGira = parseInt(grados);
	var actual = parseInt($('body').css('--rotacion'));
	if (actual == -270 && gradosGira === 0) {
		$('body').css('--rotacion', (-1) * 360 + 'deg');
		setTimeout(function() {
			$('.menucircular').css('transition', '0s');
			$('body').css('--rotacion', 0 + 'deg');
		}, 1000);
	} else if (actual == 0 && gradosGira == 270) {
		$('body').css('--rotacion', 90 + 'deg');
		setTimeout(function() {
			$('.menucircular').css('transition', '0s');
			$('body').css('--rotacion', -270 + 'deg');
		}, 1000);
	} else {
		$('body').css('--rotacion', (-1) * gradosGira + 'deg');
	}
	$('.menucircular').css('transition', '1s');
}

function cambiarImgPlanta(planta) {
	var img = "";
	if (planta == 1) {
		img = "img/gardenia.svg";
		$('.planta > object').css('width', 'calc(var(--circulo)/1.5)');
	}
	if (planta == 2) {
		img = "img/anturio.svg";
		$('.planta > object').css('width', 'calc(var(--circulo)/1.25)');
	}
	if (planta == 3) {
		img = "img/gardenia2.svg";
		$('.planta > object').css('width', 'calc(var(--circulo)/1.5)');
	}
	if (planta == 4) {
		img = "img/cactus.svg";
		$('.planta > object').css('width', 'calc(var(--circulo)/1.1)');
	}
	$(".planta > object").attr("data", img);

}

// Coger datos del XML
var temperatura;
var temperaturaMin;
var temperaturaMax;
var humedadAire;
var humedadAireMin;
var humedadAireMax;
var humedadTierra;
var humedadTierraMin;
var humedadTierraMax;
var luminosidad;
var luminosidadMin;
var luminosidadMax;

function leeXML(numPlanta) {
	temperatura = 0;
	humedadAire = 0;
	humedadTierra = 0;
	luminosidad = 0;
	$.ajax({
		type: "GET",
		//url: "xml/datos.xml",
		url: "https://raw.githubusercontent.com/irevios/apam/master/xml/datos.xml",
		dataType: "xml",
		success: function(xml) {
			obtenerDatosPlanta(xml,numPlanta);
			obtenerRegistroPlanta(xml,obtenerIdPlanta(xml,numPlanta));
			mostrarDatosConcretos();
			mostrarDatosOptimos();
			mostrarPorcentajesCircular()
		}
	});
}

function obtenerIdPlanta(xml,numPlanta){
	var id;
	$(xml).find("planta:eq(" + (numPlanta - 1) + ")").each(function() {
		id = $(this).attr("id");
	});
	return id;
}

function obtenerDatosPlanta(xml,numPlanta){
	$(xml).find("planta:eq(" + (numPlanta - 1) + ")").each(function() {
		temperaturaMin = $(this).find("temperatura_opt").attr("min");
		temperaturaMax = $(this).find("temperatura_opt").attr("max");
		humedadAireMin = $(this).find("humedad_aire_opt").attr("min");
		humedadAireMax = $(this).find("humedad_aire_opt").attr("max");
		humedadTierraMin = $(this).find("humedad_tierra_opt").attr("min");
		humedadTierraMax = $(this).find("humedad_tierra_opt").attr("max");
		luminosidadMin = $(this).find("luminosidad_opt").attr("min");
		luminosidadMax = $(this).find("luminosidad_opt").attr("max");
	});
}

function obtenerRegistroPlanta(xml,id){
	for (var i = 0; i < $(xml).find("registro").length && temperatura == 0; i++) {
		$(xml).find("registro:eq(" + i + ")").each(function() {
			if ($(this).attr("planta") == id) {
				temperatura = $(this).find("temperatura").text();
				humedadAire = $(this).find("humedad_aire").text();
				humedadTierra = $(this).find("humedad_tierra").text();
				luminosidad = $(this).find("luminosidad").text();
			}
		});
	}
}
function mostrarDatosConcretos(){
	$(".temperatura.concreta span").html(temperatura + "ºC");
	$(".humedadAire.concreta span").html(humedadAire + "%");
	$(".humedadTierra.concreta span").html(humedadTierra + "%");
	$(".luminosidad.concreta span").html(luminosidad + "%");
}

function mostrarDatosOptimos(){
	$(".temperatura.optima span").html(temperaturaMin + "ºC / " + temperaturaMax + "ºC");
	$(".humedadAire.optima span").html(humedadAireMin + "% / " + humedadAireMax + "%");
	$(".humedadTierra.optima span").html(humedadTierraMin + "% / " + humedadTierraMax + "%");
	$(".luminosidad.optima span").html(luminosidadMin + "% / " + luminosidadMax + "%");
}

function calculaPorcentaje(valor, valorMin, valorMax){
	var porcentaje = (parseInt(valor) - parseInt(valorMin)) * 100 / (parseInt(valorMax) - parseInt(valorMin));
	return porcentaje;
}
function mostrarPorcentajesCircular(){
	$("#statcirculosvg").css("--porcentajetempe", 0 + "");
	$("#statcirculosvg").css("--porcentajehumai", 0 + "");
	$("#statcirculosvg").css("--porcentajehumti", 0 + "");
	$("#statcirculosvg").css("--porcentajelumi", 0 + "");
	setTimeout(function() {
		$("#statcirculosvg").css("--porcentajetempe", calculaPorcentaje(temperatura, temperaturaMin, temperaturaMax) + "");
		$("#statcirculosvg").css("--porcentajehumai", calculaPorcentaje(humedadAire, humedadAireMin, humedadAireMax) + "");
		$("#statcirculosvg").css("--porcentajelumi", calculaPorcentaje(luminosidad, luminosidadMin, luminosidadMax) + "");
		$("#statcirculosvg").css("--porcentajehumti", calculaPorcentaje(humedadTierra, humedadTierraMin, humedadTierraMax) + "");
		compruebaAdvertencias();
	}, 1000);
}

