// Fondo
$(function fondo(){
	var d = new Date();
	var time = d.getHours()*3600 + d.getMinutes()*60 + d.getSeconds();
	var giro = Math.round((time)*-1);
	$('.hora').css('animation-delay',giro+'s');
	$('.hora').css('-webkit-animation-delay',giro+'s');
});


// Menú circular
$(function calculaCirculo(){
	ancho = $('.menucircular')[0].getBoundingClientRect().height;
	$('body').css('--circulo',ancho+'px');
});

$(window).resize(function calculaCirculo(){
	var ancho = $('.menucircular')[0].getBoundingClientRect().height;
	$('body').css('--circulo',ancho+'px');
});

function giramenu(grados){
	var deg = parseInt(grados);
	var actual = parseInt($('body').css('--rotacion'));
	if(actual == -270 && deg == 0){
		$('body').css('--rotacion',(-1)*360+'deg');
		setTimeout(function(){
			$('.menucircular').css('transition','0s');
			$('body').css('--rotacion',0+'deg')
		},1000); 
	}
	else if(actual == 0 && deg == 270){
		$('body').css('--rotacion',90+'deg');
		setTimeout(function(){
			$('.menucircular').css('transition','0s');
			$('body').css('--rotacion',-270+'deg')
		},1000); 
	}
	else{
		$('body').css('--rotacion',(-1)*deg+'deg');
	}

	$('.menucircular').css('transition','1s');
}


$(function cambiarPorcentajes(){
	var archivo = "xml/datos.xml";
    var xml = new JKL.ParseXML(archivo);
    var datos = xml.parse();
    var temperatura = 0;

    for(var i=0;i<Object.keys(datos.APAM.registros.registro).length;i++){
    	if(datos.APAM.registros[i].planta === datos.APAM.plantas.planta[0].id){
    		temperatura = datos.APAM.registros[i].temperatura;		
    	}
    }
    $(".temp span").text("aºC");
});
