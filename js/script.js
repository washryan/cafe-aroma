$(document).ready(() => {
  // Preloader
  setTimeout(() => {
    $("#preloader").fadeOut(500)
  }, 1500)

  // Inicializar AOS (Animate on Scroll)
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  })

  // Rolagem suave para links internos
  $('a[href^="#"]').on("click", function (event) {
    event.preventDefault()

    $("html, body").animate(
      {
        scrollTop: $($.attr(this, "href")).offset().top - 80,
      },
      800,
    )
  })

  // Botão voltar ao topo
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").addClass("active")
    } else {
      $(".back-to-top").removeClass("active")
    }
  })

  $(".back-to-top").click((e) => {
    e.preventDefault()
    $("html, body").animate({ scrollTop: 0 }, 800)
  })

  // Navegação fixa com mudança de cor ao rolar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $(".header").addClass("scrolled")
    } else {
      $(".header").removeClass("scrolled")
    }
  })

  // Ativar link de navegação ao rolar
  $(window).scroll(() => {
    var scrollPosition = $(document).scrollTop() + 100

    $("section").each(function () {
      var targetPosition = $(this).offset().top
      var id = $(this).attr("id")

      if (scrollPosition >= targetPosition) {
        $(".nav-link").removeClass("active")
        $('.nav-link[href="#' + id + '"]').addClass("active")
      }
    })
  })

  // Menu mobile
  $(".navbar-toggler").click(function () {
    $(this).toggleClass("active")
  })

  // Fechar menu mobile ao clicar em um link
  $(".nav-link").click(() => {
    if ($(".navbar-collapse").hasClass("show")) {
      $(".navbar-toggler").click()
    }
  })

  // Filtro do Menu
  $(".filter-btn").click(function () {
    var filterValue = $(this).attr("data-filter")

    $(".filter-btn").removeClass("active")
    $(this).addClass("active")

    if (filterValue === "all") {
      $(".menu-item-col").show(300)
    } else {
      $(".menu-item-col").hide(300)
      $(".menu-item-col[data-category='" + filterValue + "']").show(300)
    }
  })

  // Slider de Depoimentos
  var currentSlide = 0
  var totalSlides = $(".testimonial-item").length
  var slideWidth = $(".testimonial-item").outerWidth(true)

  function goToSlide(slideIndex) {
    if (slideIndex < 0) {
      slideIndex = totalSlides - 1
    } else if (slideIndex >= totalSlides) {
      slideIndex = 0
    }

    currentSlide = slideIndex
    var translateValue = -currentSlide * 100 + "%"

    $(".testimonial-track").css("transform", "translateX(" + translateValue + ")")
    $(".dot").removeClass("active")
    $(".dot[data-slide='" + currentSlide + "']").addClass("active")
  }

  $(".testimonial-next").click(() => {
    goToSlide(currentSlide + 1)
  })

  $(".testimonial-prev").click(() => {
    goToSlide(currentSlide - 1)
  })

  $(".dot").click(function () {
    var slideIndex = $(this).attr("data-slide")
    goToSlide(Number.parseInt(slideIndex))
  })

  // Auto slide para depoimentos
  setInterval(() => {
    goToSlide(currentSlide + 1)
  }, 5000)

  // Contador regressivo
  function updateCountdown() {
    // Data final: 7 dias a partir de agora
    var endDate = new Date()
    endDate.setDate(endDate.getDate() + 7)

    var now = new Date().getTime()
    var distance = endDate - now

    var days = Math.floor(distance / (1000 * 60 * 60 * 24))
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((distance % (1000 * 60)) / 1000)

    $("#countdown-days").text(days < 10 ? "0" + days : days)
    $("#countdown-hours").text(hours < 10 ? "0" + hours : hours)
    $("#countdown-minutes").text(minutes < 10 ? "0" + minutes : minutes)
    $("#countdown-seconds").text(seconds < 10 ? "0" + seconds : seconds)

    if (distance < 0) {
      clearInterval(countdownInterval)
      $("#countdown-days").text("00")
      $("#countdown-hours").text("00")
      $("#countdown-minutes").text("00")
      $("#countdown-seconds").text("00")
    }
  }

  updateCountdown()
  var countdownInterval = setInterval(updateCountdown, 1000)

  // Lightbox para galeria
  $(".gallery-link").click(function (e) {
    e.preventDefault()

    var imgSrc = $(this).attr("href")
    var imgAlt = $(this).parent().parent().attr("alt") || "Imagem da galeria"

    $(".lightbox-content").attr("src", imgSrc)
    $(".lightbox-caption").text(imgAlt)
    $(".lightbox-modal").fadeIn()

    // Armazenar todas as imagens da galeria
    var galleryImages = []
    var currentIndex = 0

    $(".gallery-link").each(function (index) {
      galleryImages.push($(this).attr("href"))
      if ($(this).attr("href") === imgSrc) {
        currentIndex = index
      }
    })

    // Navegação do lightbox
    $(".lightbox-next").click(() => {
      currentIndex = (currentIndex + 1) % galleryImages.length
      $(".lightbox-content").attr("src", galleryImages[currentIndex])
    })

    $(".lightbox-prev").click(() => {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length
      $(".lightbox-content").attr("src", galleryImages[currentIndex])
    })
  })

  $(".lightbox-close").click(() => {
    $(".lightbox-modal").fadeOut()
  })

  $(document).keydown((e) => {
    if (e.key === "Escape") {
      $(".lightbox-modal").fadeOut()
    }
  })

  // Validação e envio do formulário de reserva
  $("#reservation-form").submit(function (event) {
    event.preventDefault()

    // Animação do botão
    var $btn = $(this).find(".btn-submit")
    $btn.html('<i class="fas fa-spinner fa-spin"></i>')

    // Simulação de envio
    setTimeout(() => {
      $btn.html('<i class="fas fa-check"></i> Enviado!')

      setTimeout(() => {
        $btn.html('<span>Enviar Mensagem</span><i class="fas fa-paper-plane"></i>')
        alert("Reserva enviada com sucesso! Entraremos em contato em breve para confirmar.")
        $("#reservation-form")[0].reset()
      }, 1500)
    }, 2000)
  })

  // Efeito parallax para backgrounds
  $(window).scroll(function () {
    var scrollPosition = $(this).scrollTop()

    $(".parallax-bg").css({
      transform: "translateY(" + scrollPosition * 0.5 + "px)",
    })
  })

  // Animação para elementos ao entrar na tela
  function animateOnScroll() {
    $(".section-title, .menu-item, .testimonial-item, .feature-box, .contact-item").each(function () {
      var elementPosition = $(this).offset().top
      var topOfWindow = $(window).scrollTop()
      var windowHeight = $(window).height()

      if (elementPosition < topOfWindow + windowHeight - 100) {
        $(this).addClass("animate")
      }
    })
  }

  // Executar animação ao carregar e ao rolar
  $(window).on("load scroll", animateOnScroll)
})
