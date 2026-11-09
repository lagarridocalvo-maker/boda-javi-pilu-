/* =====================================================================
   CONTENIDO EDITABLE · hoteles, aparcamientos y turismo
   - "mapa": número del hotel en el mapa ilustrado (null si no aparece).
   - "imagen": nombre del archivo en /img. Si no existe, se ve un hueco.
   - "enTabla: false": sale en su tarjeta pero no en la tabla comparativa (la tabla es la del guion de Pilar).
   ===================================================================== */
window.BODA_DATOS = {

  hoteles: [
    // ---- Con tarifa especial (en el orden del carrusel) ----
    { nombre: "Hotel Innside by Meliá", mapa: 6, min: 13, estrellas: 4, descuento: "20% – 10%", especial: true,
      codigo: null, textoReserva: "Reserva a través del enlace", url: "CONFIG:enlaceInnside", imagen: "hotel-innside.png" },
    { nombre: "Hotel Oriente", mapa: 4, min: 7, estrellas: 3, descuento: "15%", especial: true,
      codigo: "BODA2027", url: "https://hotel-oriente.com/", imagen: "hotel-oriente.png" },
    { nombre: "Hotel Alfonso", mapa: 5, min: 7, estrellas: 4, descuento: "10%", especial: true,
      codigo: "WEDD2027", url: "https://www.palafoxhoteles.com/es", imagen: "hotel-alfonso.png" },
    { nombre: "Hotel Goya", mapa: 7, min: 11, estrellas: 4, descuento: "10%", especial: true,
      codigo: "WEDD2027", url: "https://www.palafoxhoteles.com/es", imagen: "hotel-goya.png" },
    { nombre: "Hotel Palafox", mapa: null, min: 14, estrellas: 5, descuento: "10%", especial: true,
      codigo: "WEDD2027", url: "https://www.palafoxhoteles.com/es", imagen: "hotel-palafox.png" },
    { nombre: "Hotel Reina Petronila", enTabla: false, mapa: null, min: 51, estrellas: 5, descuento: "Tarifa especial", especial: true,
      codigo: "WEDD2027", url: "https://www.palafoxhoteles.com/es", imagen: "hotel-reina-petronila.png" },
    { nombre: "Hotel Hiberus", enTabla: false, mapa: null, min: 46, estrellas: 4, descuento: "Tarifa especial", especial: true,
      codigo: "WEDD2027", url: "https://www.palafoxhoteles.com/es", imagen: "hotel-hiberus.png" },
    { nombre: "Hotel Catalonia El Pilar", mapa: 2, min: 4, estrellas: 4, descuento: "Tarifas fijas", especial: true,
      codigo: "BODA JAVIER Y PILAR", url: "https://www.cataloniahotels.com/es/hotel/catalonia-el-pilar", imagen: "hotel-catalonia.png" },
    { nombre: "B&B Hotel Zaragoza Centro", mapa: 10, min: 8, estrellas: 2, descuento: "10%", especial: true,
      codigo: "BODA JAVIER 27 JULIO", url: "https://www.hotel-bb.com/es/hotel/zaragoza-centro", imagen: "hotel-bb.png" },

    // ---- Otras recomendaciones ----
    { nombre: "Hotel NH Ciudad de Zaragoza", mapa: 1, min: 5, estrellas: 4, descuento: null, especial: false,
      url: "https://www.nh-hotels.com/es/hotel/nh-ciudad-de-zaragoza", imagen: "hotel-nh-ciudad.png" },
    { nombre: "NH Collection Gran Hotel de Zaragoza", mapa: 9, min: 15, estrellas: 4, descuento: null, especial: false,
      url: "https://www.nh-hotels.com/es/hotel/nh-collection-gran-hotel-de-zaragoza", imagen: "hotel-nh-gran-hotel.png" },
    { nombre: "Hotel Avenida", mapa: 3, min: 9, estrellas: 3, descuento: null, especial: false,
      url: "https://www.hotelavenida-zaragoza.com/", imagen: "hotel-avenida.png" },
    { nombre: "Hotel Ibis Styles Zaragoza Centro", mapa: 8, min: 12, estrellas: 3, descuento: null, especial: false,
      url: "https://all.accor.com/hotel/8521/index.es.shtml", imagen: "hotel-ibis.png" },
    { nombre: "Hotel Hesperia Zaragoza Centro", mapa: null, min: 15, estrellas: 3, descuento: null, especial: false,
      url: "https://www.hesperia.com/hotel-hesperia-zaragoza-centro/", imagen: "hotel-hesperia.png" }
  ],

  parkings: [
    { nombre: "Parking Indigo César Augusto", direccion: "Av. de César Augusto 52, 50003 Zaragoza", distancia: "A 10 minutos de Plaza del Pilar", url: "https://maps.app.goo.gl/P29Wf4GUjNNoDS2u7" },
    { nombre: "Parking Plaza del Pilar", direccion: "Calle de Saduba s/n, Casco Antiguo, 50003 Zaragoza", distancia: "A 1 minuto de Plaza del Pilar", url: "https://maps.app.goo.gl/TsQ6mg7XFeULBKQH9" },
    { nombre: "Parking Saba Los Sitios", direccion: "C/ de Segismundo Moret, Casco Antiguo, 50001 Zaragoza", distancia: "A 15 minutos de Plaza del Pilar", url: "https://maps.app.goo.gl/CqncyditpodQR4ny9" },
    { nombre: "Parking Indigo Ayuntamiento", direccion: "Plaza Nuestra Señora del Pilar, Casco Antiguo, 50003 Zaragoza", distancia: "A 1 minuto de Plaza del Pilar", url: "https://maps.app.goo.gl/hfc1xASAC5aD2pPf7" }
  ],

  // "favorito: true" muestra el corazón dorado con «Nuestro favorito».
  turismo: [
    { titulo: "Qué visitar", icono: "i-monumento", intro: "Algunos de los lugares más emblemáticos de Zaragoza", lugares: [
      { nombre: "Plaza del Pilar & Basílica del Pilar", texto: "El corazón de Zaragoza y uno de sus monumentos más emblemáticos", favorito: true, imagen: "turismo-pilar.png" },
      { nombre: "Catedral de La Seo", texto: "Declarada Patrimonio Mundial por la UNESCO", favorito: true, imagen: "turismo-la-seo.png" },
      { nombre: "Palacio de la Aljafería", texto: "Uno de los grandes ejemplos de arquitectura islámica en España", favorito: false, imagen: "turismo-aljaferia.png" }
    ]},
    { titulo: "Dónde comer", icono: "i-cubiertos", intro: "Tapas, gastronomía y restaurantes que no os podéis perder", lugares: [
      { nombre: "El Tubo", texto: "Ambiente tradicional y tapas para todos los gustos", favorito: true, imagen: "turismo-el-tubo.png" },
      { nombre: "Puerta Cinegia", texto: "Tapas creativas en un entorno con encanto", favorito: false, imagen: "turismo-puerta-cinegia.png" },
      { nombre: "Calamar Bravo", texto: "Famosos bocadillos de calamares", favorito: true, imagen: "turismo-calamar-bravo.png" },
      { nombre: "Bula Tapas", texto: "Cocina moderna en formato tapa", favorito: false, imagen: "turismo-bula.png" },
      { nombre: "La Parthénope", texto: "Restaurante italiano con auténtico sabor napolitano", favorito: true, imagen: "turismo-parthenope.png" },
      { nombre: "Cervecería Gambrinus", texto: "Comida casera y ambiente de toda la vida", favorito: false, imagen: "turismo-gambrinus.png" }
    ]},
    { titulo: "Dónde tomar algo", icono: "i-coctel", intro: "Rincones únicos para disfrutar de un buen ambiente", lugares: [
      { nombre: "Moonlight Experimental Bar", texto: "Cócteles de autor en un espacio diferente", favorito: true, imagen: "turismo-moonlight.png" },
      { nombre: "Ginger Fizz Bar", texto: "Coctelería clásica con un toque contemporáneo", favorito: false, imagen: "turismo-ginger-fizz.png" },
      { nombre: "Doña Hipólita Cafetería & Brunch", texto: "Ideal para desayuno y brunch con encanto", favorito: true, imagen: "turismo-dona-hipolita.png" },
      { nombre: "Mi Habitación Favorita", texto: "Ideal para desayunar en un ambiente acogedor", favorito: false, imagen: "turismo-mi-habitacion.png" }
    ]},
    { titulo: "Dónde pasear", icono: "i-arbol", intro: "Lugares perfectos para disfrutar de Zaragoza con tranquilidad", lugares: [
      { nombre: "Puente de Piedra", texto: "Vistas increíbles del río y del skyline de la ciudad", favorito: true, imagen: "turismo-puente-piedra.png" },
      { nombre: "Ribera del Ebro", texto: "Un paseo perfecto al atardecer junto al río", favorito: true, imagen: "turismo-ribera.png" },
      { nombre: "Parque Grande", texto: "Naturaleza y tranquilidad en el corazón de la ciudad", favorito: false, imagen: "turismo-parque-grande.png" }
    ]}
  ]
};
