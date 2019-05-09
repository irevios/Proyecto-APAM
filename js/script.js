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
