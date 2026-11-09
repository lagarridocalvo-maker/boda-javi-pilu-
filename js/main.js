(function () {
  "use strict";

  var C = window.BODA_CONFIG || {};
  var D = window.BODA_DATOS || { hoteles: [], parkings: [], turismo: [] };
  var raiz = document.documentElement;
  var reducirMovimiento = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (C.mostrarHuecos) raiz.classList.add("modo-huecos");

  /* ---------- utilidades ---------- */
  function esc(t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function icono(id, clase) { return '<svg' + (clase ? ' class="' + clase + '"' : "") + ' aria-hidden="true"><use href="#' + id + '"/></svg>'; }
  function estrellas(n) {
    var s = "";
    for (var i = 0; i < n; i++) s += icono("i-estrella");
    return '<span class="estrellas" role="img" aria-label="' + n + ' estrellas">' + s + "</span>";
  }
  function hueco(archivo, medidas, iconoId, alt, clase) {
    return '<figure class="hueco ' + (clase || "") + '" data-archivo="' + esc(archivo) + '" data-medidas="' + esc(medidas) + '" data-icono="' + iconoId + '">' +
      '<img src="img/' + esc(archivo) + '" alt="' + esc(alt || "") + '" loading="lazy"></figure>';
  }
  var avisoEl = document.getElementById("aviso"), avisoT;
  function aviso(texto) {
    avisoEl.textContent = texto;
    avisoEl.classList.add("visible");
    clearTimeout(avisoT);
    avisoT = setTimeout(function () { avisoEl.classList.remove("visible"); }, 2200);
  }
  function copiar(texto) {
    var hecho = function () { aviso("Copiado: " + texto); };
    var fallo = function () {
      var t = document.createElement("textarea");
      t.value = texto; t.setAttribute("readonly", ""); t.style.position = "fixed"; t.style.opacity = "0";
      document.body.appendChild(t); t.select();
      try { document.execCommand("copy"); hecho(); } catch (e) { aviso("Selecciona el texto para copiarlo"); }
      document.body.removeChild(t);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(texto).then(hecho, fallo);
    else fallo();
  }

  /* ---------- ALOJAMIENTO ---------- */
  function urlHotel(h) {
    if (h.url && h.url.indexOf("CONFIG:") === 0) return C[h.url.slice(7)] || "";
    return h.url || "";
  }
  function pintarHoteles() {
    var tabla = document.getElementById("tabla-hoteles");
    var ordenados = D.hoteles.filter(function (h) { return h.enTabla !== false; }).sort(function (a, b) { return a.min - b.min; });
    tabla.innerHTML = ordenados.map(function (h) {
      return '<tr class="' + (h.especial ? "especial" : "") + '">' +
        "<td>" + (h.mapa ? '<span class="num-mapa">' + h.mapa + "</span>" : '<span class="num-mapa sin" title="No aparece en el mapa">·</span>') + "</td>" +
        "<td>" + esc(h.nombre) + "</td>" +
        "<td>" + h.min + " min</td>" +
        "<td>" + estrellas(h.estrellas) + "</td>" +
        "<td>" + (h.descuento ? esc(h.descuento) : "—") + "</td></tr>";
    }).join("");

    var tarjeta = function (h) {
      var url = urlHotel(h);
      var boton = url
        ? '<a class="boton boton-oro" href="' + esc(url) + '" target="_blank" rel="noopener">' + (h.especial ? "Reservar" : "Ver alojamiento") + icono("i-externo") + "</a>"
        : '<span class="boton boton-oro" aria-disabled="true">Enlace muy pronto</span>';
      var extra = "";
      if (h.especial) {
        extra += '<p class="hotel-tarifa">' + icono("i-rama") + "Tarifa especial para nuestros invitados" + icono("i-rama") + "</p>";
        extra += h.codigo
          ? '<div class="codigo"><span class="codigo-etq">Código</span><span class="codigo-valor">' + esc(h.codigo) +
            ' <button class="copiar" type="button" data-texto="' + esc(h.codigo) + '" aria-label="Copiar código ' + esc(h.codigo) + '">' + icono("i-copiar") + "<span>Copiar</span></button></span></div>"
          : '<div class="codigo"><span class="codigo-texto">' + esc(h.textoReserva || "") + "</span></div>";
      }
      return '<article class="tarjeta hotel">' +
        hueco(h.imagen, "600×420 · línea azul, PNG transparente", "i-edificio", "Ilustración de " + h.nombre, "hotel-ilu") +
        "<h4>" + esc(h.nombre) + "</h4>" + estrellas(h.estrellas) +
        '<p class="hotel-dist">A ' + h.min + " min de Plaza del Pilar</p>" + extra +
        '<span class="espaciador"></span>' + boton + "</article>";
    };
    document.getElementById("hoteles-especiales").innerHTML = D.hoteles.filter(function (h) { return h.especial; }).map(tarjeta).join("");
    document.getElementById("hoteles-otros").innerHTML = D.hoteles.filter(function (h) { return !h.especial; }).map(tarjeta).join("");
  }

  /* ---------- APARCAMIENTOS ---------- */
  function pintarParkings() {
    document.getElementById("parkings").innerHTML = D.parkings.map(function (p) {
      return '<li class="tarjeta parking"><div class="parking-cab">' + icono("i-parking") + "<h4>" + esc(p.nombre) + "</h4></div>" +
        "<p>" + icono("i-pin") + "<span>" + esc(p.direccion) + "</span></p>" +
        "<p>" + icono("i-reloj") + "<span>" + esc(p.distancia) + "</span></p>" +
        '<span class="espaciador"></span><a class="boton boton-oro" href="' + esc(p.url) + '" target="_blank" rel="noopener">' + icono("i-pin") + "Ver ubicación</a></li>";
    }).join("");
  }

  /* ---------- TURISMO ---------- */
  function pintarTurismo() {
    document.getElementById("turismo-categorias").innerHTML = D.turismo.map(function (cat, i) {
      var cols = cat.lugares.length % 4 === 0 ? "cols-4" : "";
      return '<div class="categoria"><div class="cat-cab">' + icono(cat.icono) +
        '<h3 class="versal"><span>' + (i + 1) + ".</span>" + esc(cat.titulo) + "</h3><p>" + esc(cat.intro) + "</p>" +
        '<svg class="orn orn-mini" aria-hidden="true"><use href="#orn"/></svg></div>' +
        '<div class="cat-tarjetas ' + cols + '">' + cat.lugares.map(function (l) {
          return '<article class="tarjeta lugar-tur">' +
            hueco(l.imagen, "600×450 · ilustración línea azul", cat.icono, "Ilustración de " + l.nombre) +
            "<h4>" + esc(l.nombre) + "</h4><p>" + esc(l.texto) + "</p>" +
            '<span class="espaciador"></span>' +
            (l.favorito ? '<span class="favorito">' + icono("i-corazon") + "Nuestro favorito</span>" : "") +
            "</article>";
        }).join("") + "</div></div>";
    }).join("");
  }

  /* ---------- Huecos de imágenes que aún no existen ---------- */
  function prepararHuecos() {
    document.querySelectorAll(".hueco").forEach(function (fig) {
      if (fig.dataset.listo) return;
      fig.dataset.listo = "1";
      var img = fig.querySelector("img");
      var marcar = function () {
        fig.classList.add("vacio");
        if (fig.classList.contains("hueco-decor") && !C.mostrarHuecos) { fig.hidden = true; return; }
        if (fig.querySelector(".hueco-relleno")) return;
        var ic = fig.dataset.icono ? icono(fig.dataset.icono) : "";
        fig.insertAdjacentHTML("beforeend",
          '<div class="hueco-relleno" aria-hidden="true">' + ic +
          '<span class="hueco-etiqueta">img/' + esc(fig.dataset.archivo) + "<small>" + esc(fig.dataset.medidas || "") + "</small></span></div>");
      };
      if (!img) return marcar();
      if (img.complete && img.naturalWidth === 0) marcar();
      else img.addEventListener("error", marcar);
    });
  }

  /* ---------- Carruseles ---------- */
  function prepararCarruseles() {
    document.querySelectorAll("[data-carrusel]").forEach(function (c) {
      var pista = c.querySelector(".carrusel-pista");
      var prev = c.querySelector(".carrusel-prev");
      var sig = c.querySelector(".carrusel-sig");
      var paso = function () { var t = pista.firstElementChild; return t ? t.getBoundingClientRect().width + 19 : 300; };
      var estado = function () {
        prev.disabled = pista.scrollLeft < 8;
        sig.disabled = pista.scrollLeft + pista.clientWidth >= pista.scrollWidth - 8;
      };
      prev.addEventListener("click", function () { pista.scrollBy({ left: -paso(), behavior: reducirMovimiento ? "auto" : "smooth" }); });
      sig.addEventListener("click", function () { pista.scrollBy({ left: paso(), behavior: reducirMovimiento ? "auto" : "smooth" }); });
      pista.addEventListener("scroll", estado, { passive: true });
      window.addEventListener("resize", estado);
      estado();
    });
  }

  /* ---------- Cuenta atrás ---------- */
  function cuentaAtras() {
    var objetivo = new Date(C.fechaBoda || "2027-07-24T17:30:00+02:00").getTime();
    var el = document.getElementById("cuenta");
    var campos = {};
    el.querySelectorAll("b").forEach(function (b) { campos[b.dataset.u] = b; });
    var tic = function () {
      var r = Math.max(0, objetivo - Date.now());
      var s = Math.floor(r / 1000);
      campos.d.textContent = Math.floor(s / 86400);
      campos.h.textContent = String(Math.floor(s % 86400 / 3600)).padStart(2, "0");
      campos.m.textContent = String(Math.floor(s % 3600 / 60)).padStart(2, "0");
      campos.s.textContent = String(s % 60).padStart(2, "0");
      el.setAttribute("aria-label", "Faltan " + Math.floor(s / 86400) + " días");
    };
    tic();
    setInterval(tic, 1000);
  }

  /* ---------- Datos pendientes (config) ---------- */
  function aplicarConfig() {
    var bf = document.getElementById("boton-formulario");
    if (C.formularioURL) {
      bf.href = C.formularioURL;
    } else {
      bf.removeAttribute("href");
      bf.setAttribute("aria-disabled", "true");
      bf.textContent = "Formulario muy pronto";
    }
    var iban = document.getElementById("iban");
    if (C.iban) {
      iban.textContent = C.iban;
    } else {
      iban.textContent = "La compartiremos muy pronto";
      iban.parentElement.classList.add("pendiente");
      document.getElementById("copiar-iban").hidden = true;
    }
    document.getElementById("titulares").textContent = C.titulares || "";
  }

  /* ---------- Menú: sección activa y móvil ---------- */
  function navegacion() {
    var enlaces = document.querySelectorAll("a[data-sec]");
    var botonMenu = document.getElementById("nav-boton");
    var menu = document.getElementById("menu-movil");
    var cerrar = function () { menu.hidden = true; botonMenu.setAttribute("aria-expanded", "false"); };
    botonMenu.addEventListener("click", function () {
      var abrir = menu.hidden;
      menu.hidden = !abrir;
      botonMenu.setAttribute("aria-expanded", String(abrir));
    });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) cerrar(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") cerrar(); });

    var marcar = function (id) {
      enlaces.forEach(function (a) {
        var on = a.dataset.sec === id;
        a.classList.toggle("activo", on);
        if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
      });
    };
    if ("IntersectionObserver" in window) {
      var obs = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (en) { if (en.isIntersecting) marcar(en.target.id); });
      }, { rootMargin: "-40% 0px -55% 0px" });
      document.querySelectorAll("main > section[id]").forEach(function (s) { obs.observe(s); });
    }
    marcar("inicio");
  }

  /* ---------- Intro: sobre ---------- */
  function intro() {
    var el = document.getElementById("intro");
    var abierto = false;
    var abrir = function () {
      if (abierto) return;
      abierto = true;
      el.classList.add("abierto");
      var d = document.getElementById("descubrir");
      d.tabIndex = 0;
      setTimeout(function () { d.focus({ preventScroll: true }); }, reducirMovimiento ? 0 : 1600);
    };
    var entrar = function () {
      el.classList.add("saliendo");
      document.body.classList.remove("intro-activa");
      var fin = function () {
        el.hidden = true;
        var h = document.getElementById("hero-titulo");
        if (h) h.focus({ preventScroll: true });
      };
      setTimeout(fin, reducirMovimiento ? 0 : 800);
    };
    document.getElementById("abrir").addEventListener("click", abrir);
    document.getElementById("abrir-sello").addEventListener("click", function (e) { e.stopPropagation(); abrir(); });
    document.getElementById("sobre").addEventListener("click", abrir);
    document.getElementById("descubrir").addEventListener("click", function (e) { e.stopPropagation(); entrar(); });
    document.getElementById("saltar").addEventListener("click", entrar);

    // Si alguien llega con un enlace a una sección (#alojamiento…), no le hacemos abrir el sobre.
    var hash = (location.hash || "").slice(1);
    if (hash && document.getElementById(hash) && hash !== "intro") {
      el.hidden = true;
      document.body.classList.remove("intro-activa");
    }
  }

  /* ---------- Copiar (delegado) ---------- */
  document.addEventListener("click", function (e) {
    var b = e.target.closest(".copiar");
    if (!b) return;
    var texto = b.dataset.texto;
    if (!texto && b.dataset.copiar) { var o = document.querySelector(b.dataset.copiar); texto = o ? o.textContent.trim() : ""; }
    if (texto) copiar(texto);
  });

  /* ---------- Arranque ---------- */
  pintarHoteles();
  pintarParkings();
  pintarTurismo();
  prepararHuecos();
  prepararCarruseles();
  cuentaAtras();
  aplicarConfig();
  navegacion();
  intro();
})();
