$(document).ready(function() {
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 70
        }, 800);
    });
    
    const dataFinal = new Date();
    dataFinal.setDate(dataFinal.getDate() + 7);
    
    function atualizarContador() {
        const agora = new Date();
        const diferenca = dataFinal - agora;
        
        if (diferenca <= 0) {
            clearInterval(intervalo);
            $('#contador').html('<p>Promoção encerrada!</p>');
            return;
        }
        
        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);
        
        $('#dias').text(dias < 10 ? '0' + dias : dias);
        $('#horas').text(horas < 10 ? '0' + horas : horas);
        $('#minutos').text(minutos < 10 ? '0' + minutos : minutos);
        $('#segundos').text(segundos < 10 ? '0' + segundos : segundos);
    }
    
    const intervalo = setInterval(atualizarContador, 1000);
    atualizarContador();
    
    $(window).scroll(function() {
        $('.section-title').each(function() {
            const posicaoElemento = $(this).offset().top;
            const posicaoScroll = $(window).scrollTop();
            const alturaJanela = $(window).height();
            
            if (posicaoScroll > posicaoElemento - alturaJanela + 100) {
                $(this).addClass('animated fadeIn');
            }
        });
    });
    
    $('#form-contato').submit(function(event) {
        event.preventDefault();
        
        const nome = $('#nome').val();
        alert(`Obrigado pelo contato, ${nome}! Retornaremos em breve.`);
        
        this.reset();
    });
    
    $('#form-newsletter').submit(function(event) {
        event.preventDefault();
        
        alert('Obrigado por assinar nossa newsletter!');
        
        this.reset();
    });

    $('#btn-promocao').click(function() {
        alert('Cupom gerado! Apresente este alerta na próxima visita para ganhar um café grátis!');
    });
});