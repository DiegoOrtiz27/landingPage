
const API = 'https://spotify23.p.rapidapi.com/playlist_tracks/?id=79644V4s1FuyyM38pgI07B&offset=0&limit=100';
const content = null || document.querySelector('#content');
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b450c243d3mshb0763939ef7dbc7p13fa63jsn62cf701d09f5',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

async function fetchData(urlApi){
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

(async () => {
    try {
       const playlist = await fetchData(API);
       let view = `
       ${playlist.items.map(song => `
            <a href="${song.track.preview_url}" target="_blank">
                <div class="group relative">
                    <div
                        class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                        <img src="${song.track.album.images[0].url}" alt="${song.track.album.name}" class="w-full">
                    </div>
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-gray-700">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${song.track.album.name}
                        </h3>
                    </div>
                </div>
            </a>
       `).slice(0,8).join('')}
        
       `;
       content.innerHTML = view;
    } catch (error) {
        console.log(error);
    }
})();

//Carrusel
const grande = document.querySelector('.grande');
const puntos = document.querySelectorAll('.punto');

//1. Asignar un click a todos los puntos
    //Saber la posicion de ese punto
    //Aplicar un transform translateX al grande
    //Quitar la clase activo de todos los puntos
    //Añadir la clase activo al punto que hemos hecho click

//Recorremos todos los puntos
puntos.forEach((cadaPunto, i) => {
    //Asignar un click a cada punto
    puntos[i].addEventListener('click', () =>{
        //Guardar la posicion de ese punto
        let posicion = i;

        //Calcular el porcentaje del transform
            //Cuando la posicion es 0 transformX es 0
            //Cuando la posicion es 1 transformX es -50%
        let operacion = posicion * -(100/puntos.length);
        
        //Mover el contenedor de las imagenes
        grande.style.transform = `translateX(${operacion}%)`;

        //Recorremos los puntos para quitar la calse activo
        puntos.forEach((cadaPunto, i) => {
            puntos[i].classList.remove('activo');
        });
        //Se asigna la clase activo al buton que se dio click
        puntos[i].classList.add('activo')
    });
});