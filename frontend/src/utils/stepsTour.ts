export const mobileSteps = [
    {
        target: '#start',
        content: 'Crearemos un torneo de forma rapida para empezar',
        placement: 'bottom',
        disableBeacon: true,
    },
    {
        target: '#torneoSubmit',
        content: 'Pondremos un nombre de prueba',
        disableBeacon: true,
        
      },
   
      {
        target: '#torneos-mobile',
        content: 'Aqui podemos ver la lista de los torneos creados ! ',
        navigateTo: '/admin/torneos',
        disableBeacon: true,
        
      },
      {
        target: '#select-0',
        content: 'Al momento de seleccionar un torneo, se nos habilitan en el menu las otras opciones',
        disableBeacon: true,
        
      },
      {
        target: '#torneo-name',
        content: 'Automaticamente se escoge el nuevo',
        disableBeacon: true,
        
      },
      {
        target: '#Equipos-mobile',
        content: 'Aqui podemos ver la lista de los equipos del torneo',
        // navigateTo: '/admin/torneos',
        disableBeacon: true,
        
      },
      {
        target: '#Categorias-mobile',
        content: 'Aqui podemos ver la lista de las categorias del torneo',
        // navigateTo: '/admin/torneos',
        disableBeacon: true,
        
      },
    // Más pasos para móvil
  ];

export  const desktopSteps = [
    {
        target: '#start',
        content: 'Crearemos un torneo de forma rapida para empezar',
        placement: 'bottom',
        disableBeacon: true,
      },
      {
        target: '#torneoSubmit',
        content:  'Pondremos un nombre de prueba',
        disableBeacon: true,
        scrollTo: true,
        
      },
      {
        target: '#torneos',
        content: 'Aqui podemos ver la lista de los torneos creados ! ',
        navigateTo: '/admin/torneos',
        disableBeacon: true,
        
      },
      {
        target: '#select-0',
        content: 'Al momento de seleccionar un torneo, se nos habilitan en el menu las otras opciones',
        disableBeacon: true,
        
      },
      {
        target: '#torneo-name',
        content: 'Automaticamente se escoge el nuevo',
        disableBeacon: true,
        
      },
      {
        target: '#Equipos',
        content: 'Aqui podemos ver la lista de los equipos del torneo',
        // navigateTo: '/admin/torneos',
        disableBeacon: true,
        
      },
      {
        target: '#Categorias',
        content: 'Aqui podemos ver la lista de las categorias del torneo',
        // navigateTo: '/admin/torneos',
        disableBeacon: true,
        
      },
    // Más pasos para escritorio
  ];