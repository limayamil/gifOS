// VARIABLES

// API de Giphy

const key = "qg9B328JuyVC0ozHU262REA1CkidGGzJ";
const giphyTrendingGIFs = "https://api.giphy.com/v1/gifs/trending?api_key=" + key;
const giphyTrendingSearchTerms = "https://api.giphy.com/v1/trending/searches?api_key=" + key;
const giphySearchSuggestions = "https://api.giphy.com/v1/gifs/search/tags?api_key=" + key + "&q=";
const giphySearchGIFs = "https://api.giphy.com/v1/gifs/search?api_key=" + key + "&q=";

// Memoria temporal de la búsqueda
let resultadosMemoria;

// Favoritos en memoria
let gifsFavoritos = [];

// Mis GIFOS
let misGIFOSArray = [];
let misGIFOSArrayStringified = [];

// Booleano del modo nocturno
let modoNocturno = false;

// REFERENCIAS

//En general
const body = document.body;
const header = document.getElementById("header");
const logo = document.getElementById("logo");
//Menú
const aModoNocturno = document.getElementById("nav-elem-noc");
const aMisFavoritos = document.getElementById("nav-elem-fav");
const aMisGIFOS = document.getElementById("nav-elem-mis");
const aCrearGIFOS = document.getElementById("nav-elem-agr");
// Trending
const trendingGIFs = document.getElementById("header-tre");
const trendingGIFsDiv = document.getElementById("section-tre-car");
const trendingTopicsDiv = document.getElementById("header-tre-top");
const trendingSlideLeft = document.getElementById("trending-gif-slide-left");
const trendingSlideRight = document.getElementById("trending-gif-slide-right");
// Búsqueda y resultados
const formSearch = document.getElementById("form-search");
const searchBar = document.getElementById("search-bar");
const searchBarCross = document.getElementById("search-bar-cross");
const searchBarLupaPlaceholder = document.getElementById("search-bar-lupa-placeholder");
const searchBarLupaSearch = document.getElementById("search-bar-lupa-search");
const searchSuggestionsList = document.getElementById("search-sug-list")
const searchResults = document.getElementById("section-res");
const searchResultsGallery = document.getElementById("section-res-gal");
const searchResultsTitle = document.getElementById("section-res-tit");
const searchResultsInfo = document.getElementById("section-res-info");
const searchViewMore = document.getElementById("section-res-gal-more");
const searchPagination = document.getElementById("section-res-gal-pag");
//const searchPaginationList = document.getElementById("section-res-gal-pag-list");
// Mis favoritos
const misFavoritos = document.getElementById("section-fav");
const favoritosResultsGallery = document.getElementById("section-fav-gal");
const favoritosResultsInfo = document.getElementById("section-fav-info");
const favoritosViewMore = document.getElementById("section-fav-gal-more");
const favoritosPagination = document.getElementById("section-fav-gal-pag");
const favoritosPaginationList = document.getElementById("section-fav-gal-pag-list");
// Mis GIFOS
const misGIFOS = document.getElementById("section-mis");
const misGIFOSResultsGallery = document.getElementById("section-mis-gal");
const misGIFOSResultsInfo = document.getElementById("section-mis-info");
const misGIFOSViewMore = document.getElementById("section-mis-gal-more");
const misGIFOSPagination = document.getElementById("section-mis-gal-pag");
const misGIFOSPaginationList = document.getElementById("section-mis-gal-pag-list");
// Crear GIFOS
const crearGIFOS = document.getElementById("section-cre");
const crearGIFOSComenzar = document.getElementById("section-cre-comenzar");
const crearGIFOSGrabar = document.getElementById("section-cre-grabar");
const crearGIFOSTitle = document.getElementById("section-cre-tit");
const crearGIFOSDescription = document.getElementById("section-cre-des");
const crearGIFOSVideo = document.getElementById("section-cre-video");
const crearGIFOSVideoRecorded = document.getElementById("section-cre-video-recorded");
const crearGIFOSFinalizar = document.getElementById("section-cre-finalizar");
const crearGIFOSSubir = document.getElementById("section-cre-subirgifo");
const crearGIFOSInfoTimer = document.getElementById("info-timer");
const crearGIFOSInfoRepeat = document.getElementById("info-repeat");
const crearGIFOSInfoRepeatA = document.getElementById("info-repeat-a");
const crearGIFOSVideoOverlay = document.getElementById("section-cre-video-recorded-overlay");
const crearGIFOSVideoOverlayActions = document.getElementById("section-cre-video-recorded-overlay-actions");
const crearGIFOSVideoOverlayIcon = document.getElementById("section-cre-video-recorded-overlay-icon");
const crearGIFOSVideoOverlayText = document.getElementById("section-cre-video-recorded-overlay-text");

let divArrowLeft = document.createElement('div');
divArrowLeft.id = "arrow-left";
let divArrowRight = document.createElement('div');
divArrowRight.id = "arrow-right";
let searchPaginationList = document.createElement('ul');

// FUNCIONES DE GIPHY

// GENERALES

// Chequeo si hay GIFs favoriteados en memoria

if (localStorage.getItem("gifsFavoritos") !== null) {
    gifsFavoritos = JSON.parse(localStorage.getItem("gifsFavoritos"));
}

if (localStorage.getItem("myGIFOS") !== null) {
    misGIFOSArray = JSON.parse(localStorage.getItem("myGIFOS"));
}

// Cambiar de sección
const changeSection = (section) => {

    const resetHome = () => {
        searchBar.value = "";
        searchResultsGallery.innerHTML = "";
        searchResultsGallery.classList.add('hide');
        searchPagination.innerHTML = "";
        //searchViewMore.classList.add('hide');
        searchResultsInfo.classList.add('hide');
    }

    const resetFavorites = () => {
        misFavoritos.classList.add('hide');
        favoritosViewMore.classList.add('hide');
        favoritosResultsInfo.classList.add('hide');
        favoritosResultsGallery.innerHTML = "";
        favoritosPagination.innerHTML = "";
    }

    const resetMisGIFOS = () => {
        misGIFOSViewMore.classList.add('hide');
        misGIFOSResultsInfo.classList.add('hide');
        misGIFOSResultsGallery.innerHTML = "";
        misGIFOSPagination.innerHTML = "";
    }

    const resetGIFOS = () => {
        
    }

    const resetAll = () => {
        resetHome();
        resetFavorites();
        resetMisGIFOS();
        resetGIFOS();
        aMisFavoritos.classList.remove('active');
    }

    const hideAll = () => {
        header.classList.add('hide');
        searchResults.classList.add('hide');
        misFavoritos.classList.add('hide');
        misGIFOS.classList.add('hide');
        crearGIFOS.classList.add('hide');
    }

    resetAll();
    switch (section) {
        case 'home':
            hideAll();
            header.classList.remove('hide');
            trendingGIFs.classList.remove('hide');
            misFavoritos.classList.add('hide');
            break;
        case 'favoritos':
            hideAll();
            aMisFavoritos.classList.add('active');
            misFavoritos.classList.remove('hide');
            favoritosResultsGallery.classList.remove('hide');
            favoritosPaginationList.classList.remove('hide');
            fetchMisGIFOS();
            break;
        case 'mis-gifos':
            hideAll();
            aMisGIFOS.classList.add('active');
            misGIFOS.classList.remove('hide');
            break;
        case 'crear-gifos':
            hideAll();
            aCrearGIFOS.classList.add('active');
            crearGIFOS.classList.remove('hide');
            break;
        case 'resultados':
            hideAll();
            header.classList.remove('hide');
            searchResults.classList.remove('hide');
            trendingGIFs.classList.add('hide');
            //trendingGIFs.classList.add('hide');
            break;
    }
}

// Función principal de fetchear GIFs y agregarlos a la galería que se especifique.

async function fetchGif(json, divToPlace, index) {
    let divGif = document.createElement("div");
    divGif.classList.add('fetched-gif');
    let divOverlay = document.createElement("div");
    let divFetchedGifOptions = document.createElement("div");
    divFetchedGifOptions.classList.add('fetched-gif-options');
    let divFetchedGifInfo = document.createElement("div");
    divFetchedGifInfo.classList.add('fetched-gif-info');
    let fetchedGifOptionFavorite = document.createElement("div");
    fetchedGifOptionFavorite.classList.add("fetched-gif-option-fav");
    let fetchedGifOptionDownload = document.createElement("div");
    fetchedGifOptionDownload.classList.add("fetched-gif-option-down");
    let fetchedGifOptionView = document.createElement("div");
    fetchedGifOptionView.classList.add("fetched-gif-option-view");
    let fetchedGifUser = document.createElement("p");
    fetchedGifUser.classList.add('fetched-gif-user');
    let fetchedGifTitle = document.createElement("p");
    fetchedGifTitle.classList.add('fetched-gif-title');
    let gifURL = json.data[i].images.downsized.url;
    let usuario = json.data[i].username;
    let titulo = json.data[i].title;
    
    if (usuario === "") {
        usuario = "Anónimo";
    }

    if (titulo === "") {
        titulo = "Sin título";
    }

    divGif.classList.add('fetched-gif');
    divOverlay.classList.add('fetched-gif-overlay');

    divFetchedGifOptions.appendChild(fetchedGifOptionFavorite);
    divFetchedGifOptions.appendChild(fetchedGifOptionDownload);
    divFetchedGifOptions.appendChild(fetchedGifOptionView);
    divOverlay.appendChild(divFetchedGifOptions);

    fetchedGifUser.textContent = usuario;
    fetchedGifTitle.textContent = titulo;
    divFetchedGifInfo.appendChild(fetchedGifUser);
    divFetchedGifInfo.appendChild(fetchedGifTitle);
    divOverlay.appendChild(divFetchedGifInfo);

    divGif.style.background = "url(" + gifURL + ") no-repeat center / cover, url('img/loading.gif') no-repeat center";
    divGif.appendChild(divOverlay);
    divToPlace.appendChild(divGif);

    const unfavoriteGifCallback = () => {
        fetchedGifOptionFavorite.classList.remove('active');
        unfavoriteGif(gifURL);
        fetchedGifOptionFavorite.removeEventListener("click", unfavoriteGifCallback);
        fetchedGifOptionFavorite.addEventListener("click", favoriteGifCallback);
    }

    const favoriteGifCallback = () => {
        fetchedGifOptionFavorite.classList.add('active');
        favoriteGif(gifURL, usuario, titulo);
        fetchedGifOptionFavorite.removeEventListener("click", favoriteGifCallback);
        fetchedGifOptionFavorite.addEventListener("click", unfavoriteGifCallback);
    }

    const downloadGifCallback = () => {
        downloadGif(index, json);
    }

    const expandGifCallback = () => {
        expandGif(index, gifURL, usuario, titulo);
    }

    fetchedGifOptionFavorite.addEventListener("click", favoriteGifCallback);
    fetchedGifOptionDownload.addEventListener("click", downloadGifCallback);
    fetchedGifOptionView.addEventListener("click", expandGifCallback);
}

// TRENDING

// Traer los GIFs Trending

async function fetchTrendingGIFs(giphyAPI) {
    const resp = await fetch(giphyAPI);
    const data = await resp.json();
    return data;
}

(async () => {
    let json = await fetchTrendingGIFs(giphyTrendingGIFs);
    console.log(json);
    for (i = 0; i < 9; i++){
        fetchGif(json, trendingGIFsDiv, i);
    }
})();

// Traer los tópicos en Trending

async function fetchTrendingSearchTerms(giphyAPI) {
    const resp = await fetch(giphyAPI);
    const data = await resp.json();
    return data;
}

(async () => {
    let json = await fetchTrendingGIFs(giphyTrendingSearchTerms);
    for (i = 0; i < 5; i++) {
        let trendA = document.createElement("a");
        let trendH4 = document.createElement("h4");
        let topic = json.data[i];

        const searchTrendingTopicCallback = () => {
            searchBar.value = topic;
            showResults();
        }
        
        if (i === 4) {
            trendH4.innerHTML = topic;
        } else {
            trendH4.innerHTML = topic + ",";
        }

        trendA.appendChild(trendH4);
        trendingTopicsDiv.appendChild(trendA);
        trendA.addEventListener('click', searchTrendingTopicCallback);
    }
})();

const sideScroll = (element,direction,speed,distance,step) => {
    scrollAmount = 0;
    var slideTimer = setInterval(function(){
        if(direction == 'left'){
            element.scrollLeft -= step;
        } else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if(scrollAmount >= distance){
            window.clearInterval(slideTimer);
        }
    }, speed);
}


// Scroleo horizontal el carrusel de trending
trendingSlideRight.addEventListener('click', e => {
    sideScroll(trendingGIFsDiv,'right',10,260,10)
});

trendingSlideLeft.addEventListener('click', e => {
    sideScroll(trendingGIFsDiv,'left',10,260,10)
});

// BÚSQUEDA

// Realiza una búsqueda tras hacer click en un término sugerido

const searchSuggestion = searchTerm => {
    fetchSearchGIFs(giphySearchGIFs, searchTerm);
    searchBar.value = searchTerm;
    searchResultsTitle.textContent = searchTerm;
}

// Trae sugerencias en el autocompletado

const fetchSearchSuggestions = (giphyAPI, searchTerm) => {
    fetch(giphyAPI + searchTerm)
        .then((response) => {
        return response.json();
        })
        .then((json) => {
        searchSuggestionsList.innerHTML = "";
        for (i = 0; i < json.data.length; i++){
            let suggestionItem = document.createElement("li");
            let searchSuggestionFetched = json.data[i].name;
            suggestionItem.innerHTML = '<div class="search-bar-lupa-search"></div>' + searchSuggestionFetched;
            searchSuggestionsList.appendChild(suggestionItem);

            const clickSearchSuggestion = () => {
                searchSuggestion(searchSuggestionFetched);
                suggestionItem.removeEventListener("click", clickSearchSuggestion);
            }

            suggestionItem.addEventListener('click', clickSearchSuggestion);
        }
    });
}

// Expande un gif a pantalla completa

const expandGif = (index, gifURL, usuario, titulo) => {
    
    let overlayDiv = document.createElement("div");
    overlayDiv.id = "overlay";

    let overlayDivColLeft = document.createElement("div");
    overlayDivColLeft.id = "overlay-gif-left-div";
    let overlayDivColMid = document.createElement("div");
    overlayDivColMid.id = "overlay-gif-middle-div";
    let overlayDivColRight = document.createElement("div");
    overlayDivColRight.id = "overlay-gif-right-div";
    let overlayDivSlideRight = document.createElement("div");
    overlayDivSlideRight.id = "overlay-gif-slide-right";
    let overlayDivSlideLeft = document.createElement("div");
    overlayDivSlideLeft.id = "overlay-gif-slide-left";
    let overlayDivClose = document.createElement("img");
    overlayDivClose.id = "overlay-close";
    overlayDivClose.src = "img/close.svg";

    let overlayGIF = document.createElement("img");
    overlayGIF.src = gifURL;

    let overlayInfo = document.createElement("div");
    overlayInfo.id = "overlay-info";
    let overlayInfoDetails = document.createElement("div");
    overlayInfoDetails.id = "overlay-info-det";
    let overlayInfoDetailsUser = document.createElement("p");
    overlayInfoDetailsUser.id = "overlay-info-det-user";
    let overlayInfoDetailsTitle = document.createElement("p");
    overlayInfoDetailsTitle.id = "overlay-info-det-title";
    overlayInfoDetailsUser.textContent = usuario;
    overlayInfoDetailsTitle.textContent = titulo;
    overlayInfoDetails.appendChild(overlayInfoDetailsUser);
    overlayInfoDetails.appendChild(overlayInfoDetailsTitle);
    let overlayInfoActions = document.createElement("div");
    overlayInfoActions.id ="overlay-info-actions";
    let overlayInfoActionsFavorite = document.createElement("div");
    overlayInfoActionsFavorite.id ="overlay-info-actions-favorite";
    let overlayInfoActionsDownload = document.createElement("div");
    overlayInfoActionsDownload.id ="overlay-info-actions-download";
    overlayInfoActions.appendChild(overlayInfoActionsFavorite);
    overlayInfoActions.appendChild(overlayInfoActionsDownload);
    overlayInfo.appendChild(overlayInfoActions);
    overlayInfo.appendChild(overlayInfoDetails);

    const closeOverlay = () => {
        overlayDiv.remove();
        overlayDivClose.removeEventListener("click", closeOverlay);
    }

    const slideLeft = () => {
        prevIndex = index - 1;
        prevURL = resultadosMemoria.data[prevIndex].images.downsized.url;
        prevUser = resultadosMemoria.data[prevIndex].username;
        prevTitle = resultadosMemoria.data[prevIndex].title;
        overlayDivSlideLeft.removeEventListener("click", slideRight);
        overlayDiv.remove();
        expandGif(prevIndex,prevURL,prevUser,prevTitle);
    }

    const slideRight = () => {
        nextIndex = index + 1;
        nextURL = resultadosMemoria.data[nextIndex].images.downsized.url;
        nextUser = resultadosMemoria.data[nextIndex].username;
        nextTitle = resultadosMemoria.data[nextIndex].title;
        overlayDivSlideRight.removeEventListener("click", slideRight);
        overlayDiv.remove();
        expandGif(nextIndex,nextURL,nextUser,nextTitle);
    }

    const favoriteExpanded = () => {
        gifsFavoritos.push({url: gifURL, usuario: usuario, titulo: titulo});
        localStorage.setItem("gifsFavoritos", JSON.stringify(gifsFavoritos));
        overlayInfoActionsFavorite.classList.add("active");
    }

     const downloadExpanded = async () => {
        let a = document.createElement('a');
        let resp = await fetch(resultadosMemoria.data[index].images.downsized.url);
        let file = await resp.blob();
        
        a.download = resultadosMemoria.data[index].title + ".gif";
        a.href = window.URL.createObjectURL(file);
        a.click();
        a.remove();
    }

    overlayInfoActionsFavorite.addEventListener("click", favoriteExpanded);
    overlayInfoActionsDownload.addEventListener("click", downloadExpanded);

    overlayDivClose.addEventListener("click", closeOverlay);

    overlayDivColRight.appendChild(overlayDivClose);
    overlayDivColMid.appendChild(overlayGIF);
    overlayDivColMid.appendChild(overlayInfo);

    if (index === 0 && resultadosMemoria.data.length > 1){
        overlayDivColRight.appendChild(overlayDivSlideRight);
        overlayDivSlideRight.addEventListener("click", slideRight);
    } else if (index === resultadosMemoria.data.length && resultadosMemoria.data.length > 1) {
        overlayDivColLeft.appendChild(overlayDivSlideLeft);
        overlayDivSlideLeft.addEventListener("click", slideLeft);
    } else if (index < resultadosMemoria.data.length && index > 0) {
        overlayDivColRight.appendChild(overlayDivSlideRight);
        overlayDivSlideRight.addEventListener("click", slideRight);
        overlayDivColLeft.appendChild(overlayDivSlideLeft);
        overlayDivSlideLeft.addEventListener("click", slideLeft);
    }

    overlayDiv.appendChild(overlayDivColLeft);
    overlayDiv.appendChild(overlayDivColMid);
    overlayDiv.appendChild(overlayDivColRight);
    document.body.insertBefore(overlayDiv, document.body.firstChild);
}

// Expande un gif de favoritos a pantalla completa

const expandGifFavorite = (index, gifURL, usuario, titulo) => {
    
    let overlayDiv = document.createElement("div");
    overlayDiv.id = "overlay";

    let overlayDivColLeft = document.createElement("div");
    overlayDivColLeft.id = "overlay-gif-left-div";
    let overlayDivColMid = document.createElement("div");
    overlayDivColMid.id = "overlay-gif-middle-div";
    let overlayDivColRight = document.createElement("div");
    overlayDivColRight.id = "overlay-gif-right-div";
    let overlayDivSlideRight = document.createElement("div");
    overlayDivSlideRight.id = "overlay-gif-slide-right";
    let overlayDivSlideLeft = document.createElement("div");
    overlayDivSlideLeft.id = "overlay-gif-slide-left";
    let overlayDivClose = document.createElement("img");
    overlayDivClose.id = "overlay-close";
    overlayDivClose.src = "img/close.svg";

    let overlayGIF = document.createElement("img");
    overlayGIF.src = gifURL;

    let overlayInfo = document.createElement("div");
    overlayInfo.id = "overlay-info";
    let overlayInfoDetails = document.createElement("div");
    overlayInfoDetails.id = "overlay-info-det";
    let overlayInfoDetailsUser = document.createElement("p");
    overlayInfoDetailsUser.id = "overlay-info-det-user";
    let overlayInfoDetailsTitle = document.createElement("p");
    overlayInfoDetailsTitle.id = "overlay-info-det-title";
    overlayInfoDetailsUser.textContent = usuario;
    overlayInfoDetailsTitle.textContent = titulo;
    overlayInfoDetails.appendChild(overlayInfoDetailsUser);
    overlayInfoDetails.appendChild(overlayInfoDetailsTitle);
    let overlayInfoActions = document.createElement("div");
    overlayInfoActions.id ="overlay-info-actions";
    let overlayInfoActionsFavorite = document.createElement("div");
    overlayInfoActionsFavorite.id ="overlay-info-actions-favorite";
    let overlayInfoActionsDownload = document.createElement("div");
    overlayInfoActionsDownload.id ="overlay-info-actions-download";
    overlayInfoActions.appendChild(overlayInfoActionsFavorite);
    overlayInfoActions.appendChild(overlayInfoActionsDownload);
    overlayInfo.appendChild(overlayInfoActions);
    overlayInfo.appendChild(overlayInfoDetails);

    const closeOverlay = () => {
        overlayDiv.remove();
        overlayDivClose.removeEventListener("click", closeOverlay);
    }

    const slideLeft = () => {
        prevIndex = index - 1;
        prevURL = gifsFavoritos[prevIndex].url;
        prevUser = gifsFavoritos[prevIndex].usuario;
        prevTitle = gifsFavoritos[prevIndex].titulo;
        overlayDivSlideLeft.removeEventListener("click", slideRight);
        overlayDiv.remove();
        expandGifFavorite(prevIndex,prevURL,prevUser,prevTitle);
    }

    const slideRight = () => {
        nextIndex = index + 1;
        nextURL = gifsFavoritos[nextIndex].url;
        nextUser = gifsFavoritos[nextIndex].usuario;
        nextTitle = gifsFavoritos[nextIndex].titulo;
        overlayDivSlideRight.removeEventListener("click", slideRight);
        overlayDiv.remove();
        expandGifFavorite(nextIndex,nextURL,nextUser,nextTitle);
    }

    const unfavoriteExpanded = () => {
        //gifsFavoritos.push({url: gifURL, usuario: usuario, titulo: titulo});
        //localStorage.setItem("gifsFavoritos", JSON.stringify(gifsFavoritos));
        //overlayInfoActionsFavorite.classList.add("active");
    }

     const downloadExpanded = async () => {
        let a = document.createElement('a');
        let resp = await fetch(resultadosMemoria.data[index].images.downsized.url);
        let file = await resp.blob();
        
        a.download = resultadosMemoria.data[index].title + ".gif";
        a.href = window.URL.createObjectURL(file);
        a.click();
        a.remove();
    }

    overlayInfoActionsFavorite.addEventListener("click", unfavoriteExpanded);
    overlayInfoActionsDownload.addEventListener("click", downloadExpanded);

    overlayDivClose.addEventListener("click", closeOverlay);

    overlayDivColRight.appendChild(overlayDivClose);
    overlayDivColMid.appendChild(overlayGIF);
    overlayDivColMid.appendChild(overlayInfo);

    if (index === 0 && resultadosMemoria.data.length > 1){
        overlayDivColRight.appendChild(overlayDivSlideRight);
        overlayDivSlideRight.addEventListener("click", slideRight);
    } else if (index === resultadosMemoria.data.length && resultadosMemoria.data.length > 1) {
        overlayDivColLeft.appendChild(overlayDivSlideLeft);
        overlayDivSlideLeft.addEventListener("click", slideLeft);
    } else if (index < resultadosMemoria.data.length && index > 0) {
        overlayDivColRight.appendChild(overlayDivSlideRight);
        overlayDivSlideRight.addEventListener("click", slideRight);
        overlayDivColLeft.appendChild(overlayDivSlideLeft);
        overlayDivSlideLeft.addEventListener("click", slideLeft);
    }

    overlayDiv.appendChild(overlayDivColLeft);
    overlayDiv.appendChild(overlayDivColMid);
    overlayDiv.appendChild(overlayDivColRight);
    document.body.insertBefore(overlayDiv, document.body.firstChild);
}

// Descarga un gif

async function downloadGif(index, json) {
    let a = document.createElement('a');
    let resp = await fetch(json.data[index].images.downsized.url);
    let file = await resp.blob();
    
    a.download = json.data[index].title + ".gif";
    a.href = window.URL.createObjectURL(file);
    a.click();
    a.remove();
}

// Desfavoritea un gif
const unfavoriteGif = (gifURL) => {
    let index = gifsFavoritos.findIndex(x => x.url == gifURL);
    gifsFavoritos.splice(index, 1);
    localStorage.setItem("gifsFavoritos", JSON.stringify(gifsFavoritos));
}

// Listar resultados
const listarResultados = (desde, hasta, paginaIndex, paginaActual, cantidadPaginas, resultadosAMostrar, cantidadResultados) => {
    searchResultsGallery.innerHTML = "";
    for (i = desde; i < hasta; i++){
        fetchGif(resultadosMemoria, searchResultsGallery, i);
    }

    for (l = 0; l < searchPaginationList.children.length; l++){
        searchPaginationList.children[l].classList.remove("activo");
    }

    console.warn("Voy a ponerle activo a: " + searchPaginationList.children[paginaIndex].innerHTML);

    searchPaginationList.children[paginaIndex].classList.add("activo");
    
    console.log("Pagina index: " + paginaIndex);
    console.log("Cantidad de páginas: " + cantidadPaginas);
    console.log("Cantidad de resultados: " + cantidadResultados);

    if (cantidadPaginas > 1) {
        switch(paginaIndex) {
            case 0:
                divArrowLeft.classList.remove('active');
                divArrowRight.classList.add('active');
                break;
            case cantidadPaginas - 1:
                divArrowRight.classList.remove('active');
                break;
            default:
                divArrowLeft.classList.add('active');
                divArrowRight.classList.add('active');
                break;
        }
    }

    // Funciones del botón de ver más

    /*
    if (cantidadResultados > paginaActual * resultadosAMostrar) {
        searchViewMore.classList.remove('hide');
        //searchViewMore.addEventListener('click', mostrarMas);
    } else {
        searchViewMore.classList.add('hide');
    }
    */

    const clickLinkPaginaAnterior = () => {
        //console.clear();
        paginaActual--;
        paginaIndex--;
        let indexDesde = paginaIndex * resultadosAMostrar;
        let indexHasta = indexDesde + resultadosAMostrar;
        console.log("Hacia Atrás");
        console.log("Index desde: " + indexDesde);
        console.log("Index hasta: " + indexHasta);
        console.log("Pagina index: " + paginaIndex);
        divArrowLeft.removeEventListener('click', clickLinkPaginaAnterior);
        listarResultados(indexDesde, indexHasta, paginaIndex, paginaActual, cantidadPaginas, resultadosAMostrar, cantidadResultados);
    }

    const clickLinkPaginaSiguiente = () => {
        //console.clear();
        paginaActual++;
        paginaIndex++;
        let indexDesde = paginaIndex * resultadosAMostrar;
        let indexHasta = indexDesde + resultadosAMostrar;
        console.log("Hacia Delante");
        console.log("Index desde: " + indexDesde);
        console.log("Index hasta: " + indexHasta);
        console.log("Pagina index: " + paginaIndex);
        divArrowRight.removeEventListener('click', clickLinkPaginaSiguiente);
        listarResultados(indexDesde, indexHasta, paginaIndex, paginaActual, cantidadPaginas, resultadosAMostrar, cantidadResultados);
    }

    if (divArrowLeft.classList.contains('active')){
        divArrowLeft.addEventListener('click', clickLinkPaginaAnterior);
    }

    if (divArrowRight.classList.contains('active')){
        divArrowRight.addEventListener('click', clickLinkPaginaSiguiente);
    }
}

// Favoritea un gif

const favoriteGif = (gifURL, usuario, titulo) => {
    gifsFavoritos.push({url: gifURL, usuario: usuario, titulo: titulo});
    localStorage.setItem("gifsFavoritos", JSON.stringify(gifsFavoritos));
    alert("Se añadió un gif a favoritos");
}

// Trae GIFs cuyo término se haya buscado

const fetchSearchGIFs = (giphyAPI, searchTerm) => {
    searchResults.classList.remove("hide");
    console.log("pogi");
    searchResultsTitle.classList.add("hide");
    let resultsLoading = document.createElement("div");
    resultsLoading.id = "section-res-loading";
    let resultsLoadingIcon = document.createElement("div");
    resultsLoadingIcon.id = "section-res-loading-icon";
    let resultsLoadingText = document.createElement("h3");
    resultsLoadingText.id = "section-res-loading-text";
    resultsLoading.classList.remove("hide");
    resultsLoadingText.textContent = "Cargando resultados...";
    resultsLoading.appendChild(resultsLoadingIcon);
    resultsLoading.appendChild(resultsLoadingText);
    searchResults.prepend(resultsLoading);

    changeSection('resultados');
        fetch(giphyAPI + searchTerm)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            resultadosMemoria = json;
            searchResultsGallery.innerHTML = "";
            searchPagination.innerHTML = "";
            searchResultsGallery.classList.add("hide");
            searchResultsInfo.classList.add("hide");
            //searchResults.classList.add("hide");
            resultsLoading.classList.add("hide");
            searchResultsTitle.classList.remove("hide");

            let cantidadResultados = resultadosMemoria.data.length;
            let resultadosAMostrar = 12;
            let cantidadPaginas = Math.ceil(cantidadResultados / resultadosAMostrar);
            let paginaActual = 1;
            let paginaIndex = 0;

            if (cantidadResultados > 0) {
                searchSuggestionsList.innerHTML = "";
                searchResultsGallery.classList.remove("hide");

                const mostrarMas = () => {
                    let indexDesde = paginaIndex * resultadosAMostrar;
                    let indexHasta = (paginaIndex * resultadosAMostrar) + resultadosAMostrar;

                    if (cantidadResultados < indexHasta) {
                        indexHasta = cantidadResultados;
                    }

                    listarResultados(indexDesde, indexHasta);
                }

                

                if (cantidadPaginas > 0) {
                    searchPagination.classList.remove('hide');
                    for (i = 0; i < cantidadPaginas; i++){
                        let linkPagina = document.createElement("li");
                        linkPagina.textContent = i + 1;
                        let indice = i;

                        const clickLinkPagina = () => {
                            let indexDesde = indice * resultadosAMostrar;
                            let indexHasta = (indice * resultadosAMostrar) + resultadosAMostrar;
                            if (cantidadResultados < indexHasta) {
                                indexHasta = cantidadResultados;
                            }
                            paginaActual = indice + 1;
                            paginaIndex = indice;
                            listarResultados(indexDesde, indexHasta);
                        }

                        linkPagina.addEventListener('click', clickLinkPagina);
                        
                        searchPaginationList.appendChild(linkPagina);   
                    }

                    searchPagination.appendChild(searchPaginationList);
                    searchPagination.appendChild(divArrowRight);
                    searchPagination.insertBefore(divArrowLeft, searchPaginationList);
                }

                listarResultados(paginaIndex * resultadosAMostrar, (paginaIndex * resultadosAMostrar) + resultadosAMostrar, paginaIndex, paginaActual, cantidadPaginas, resultadosAMostrar, cantidadResultados);

            } else if (cantidadResultados === 0) {
                searchResults.classList.remove("hide");
                searchResultsInfo.classList.remove("hide");
                searchResultsGallery.innerHTML = "";
                trendingGIFs.classList.remove("hide");
                let imgSinResultados = document.createElement("img");
                imgSinResultados.src = "img/icon-busqueda-sin-resultado.svg"
                let titSinResultados = document.createElement("h3");
                titSinResultados.classList.add("section-res-info-tit");
                titSinResultados.textContent = "Intenta con otra búsqueda";
                searchResultsInfo.appendChild(imgSinResultados);
                searchResultsInfo.appendChild(titSinResultados);
            }
    });
}

// Muestra los GIFs favoritos

const fetchFavoriteGIFs = () => {
    favoritosResultsInfo.innerHTML = "";

    if (gifsFavoritos.length != 0){
        let cantidadResultados = gifsFavoritos.length;
        let resultadosAMostrar = 12;
        let cantidadPaginas = Math.ceil(cantidadResultados / resultadosAMostrar);
        let paginaActual = 1;
        let paginaIndex = 0;

        const mostrarMas = () => {
            let indexDesde = paginaIndex * resultadosAMostrar;
            let indexHasta = (paginaIndex * resultadosAMostrar) + resultadosAMostrar;

            if (cantidadResultados < indexHasta) {
                indexHasta = cantidadResultados;
            }

            listarResultados(indexDesde, indexHasta);
        }

        const listarResultadosFavoritos = (desde, hasta) => {
            favoritosResultsGallery.innerHTML = "";
            for (i = desde; i < hasta; i++) {
                try {
                    let divGif = document.createElement("div");
                    let divOverlay = document.createElement("div");
                    let divFetchedGifOptions = document.createElement("div");
                    divFetchedGifOptions.classList.add('fetched-gif-options');
                    let divFetchedGifInfo = document.createElement("div");
                    divFetchedGifInfo.classList.add('fetched-gif-info');
                    let fetchedGifOptionFavorite = document.createElement("div");
                    fetchedGifOptionFavorite.classList.add("fetched-gif-option-fav");
                    let fetchedGifOptionDownload = document.createElement("div");
                    fetchedGifOptionDownload.classList.add("fetched-gif-option-down");
                    let fetchedGifOptionView = document.createElement("div");
                    fetchedGifOptionView.classList.add("fetched-gif-option-view");
                    let fetchedGifUser = document.createElement("p");
                    fetchedGifUser.classList.add('fetched-gif-user');
                    let fetchedGifTitle = document.createElement("p");
                    fetchedGifTitle.classList.add('fetched-gif-title');
                    
                    let gifURL = gifsFavoritos[i].url;
                    let usuario = gifsFavoritos[i].usuario;
                    let titulo = gifsFavoritos[i].titulo;
    
                    if (usuario === "") {
                        usuario = "Anónimo";
                    }
    
                    if (titulo === "") {
                        titulo = "Sin título";
                    }
    
                    divGif.classList.add('fetched-gif');
                    divOverlay.classList.add('fetched-gif-overlay');
    
                    divFetchedGifOptions.appendChild(fetchedGifOptionFavorite);
                    divFetchedGifOptions.appendChild(fetchedGifOptionDownload);
                    divFetchedGifOptions.appendChild(fetchedGifOptionView);
                    divOverlay.appendChild(divFetchedGifOptions);
    
                    fetchedGifUser.textContent = usuario;
                    fetchedGifTitle.textContent = titulo;
                    divFetchedGifInfo.appendChild(fetchedGifUser);
                    divFetchedGifInfo.appendChild(fetchedGifTitle);
                    divOverlay.appendChild(divFetchedGifInfo);
    
                    divGif.style.background = "url(" + gifURL + ") no-repeat center / cover, url('img/loading.gif') no-repeat center";
                    divGif.appendChild(divOverlay);
                    favoritosResultsGallery.appendChild(divGif);
    
                    const unfavoriteGifCallback = () => {
                        unfavoriteGif(gifURL);
                        divGif.remove();
                    };
    
                    const downloadGifCallback = () => {
                        downloadGif(index);
                    };
    
                    const expandGifCallback = () => {
                        expandGifFavorite(i, gifURL, usuario, titulo);
                    };
    
                    //divOverlay.addEventListener("click", expandGifCallback);
                    fetchedGifOptionFavorite.addEventListener("click", unfavoriteGifCallback);
                    fetchedGifOptionDownload.addEventListener("click", downloadGifCallback);
                    fetchedGifOptionView.addEventListener("click", expandGifCallback);
                } catch(e) {
                    break;
                }
                
            }

            for (l = 0; l < favoritosPaginationList.children.length; l++) {
                favoritosPaginationList.children[l].classList.remove("activo");
            }

            favoritosPaginationList.children[paginaIndex].classList.add("activo");

            if (cantidadResultados > paginaActual * resultadosAMostrar) {
                favoritosViewMore.classList.remove('hide');
                favoritosViewMore.addEventListener('click', mostrarMas);
                paginaActual++;
                paginaIndex++;
            } else {
                favoritosViewMore.classList.add('hide');
            }
        }

        if (cantidadPaginas > 0) {
            favoritosPagination.classList.remove('hide');
            for (i = 0; i < cantidadPaginas; i++){
                let linkPagina = document.createElement("li");
                linkPagina.textContent = i + 1;
                let indice = i;

                const clickLinkPagina = () => {
                    let indexDesde = indice * resultadosAMostrar;
                    let indexHasta = (indice * resultadosAMostrar) + resultadosAMostrar;
                    if (cantidadResultados < indexHasta) {
                        indexHasta = cantidadResultados;
                    }
                    paginaActual = indice + 1;
                    paginaIndex = indice;
                    listarResultadosFavoritos(indexDesde, indexHasta);
                }

                linkPagina.addEventListener('click', clickLinkPagina);
                favoritosPaginationList.appendChild(linkPagina);
            }
        }

        listarResultadosFavoritos(paginaIndex * resultadosAMostrar, (paginaIndex * resultadosAMostrar) + resultadosAMostrar);

    } else {
        misFavoritos.classList.remove("hide");
        favoritosResultsInfo.classList.remove("hide");
        favoritosResultsGallery.innerHTML = "";
        let imgSinResultados = document.createElement("img");
        imgSinResultados.src = "img/icon-fav-sin-contenido.svg"
        let titSinResultados = document.createElement("h3");
        titSinResultados.classList.add("section-fav-info-tit");
        titSinResultados.textContent = "¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!";
        favoritosResultsInfo.appendChild(imgSinResultados);
        favoritosResultsInfo.appendChild(titSinResultados);
    }
}

// Muestra los Mis GIFOS.

const fetchMisGIFOS = () => {
    misGIFOSResultsInfo.innerHTML = "";

    if (misGIFOSArray.length != 0){
        let cantidadResultados = misGIFOSArray.length;
        let resultadosAMostrar = 12;
        let cantidadPaginas = Math.ceil(cantidadResultados / resultadosAMostrar);
        let paginaActual = 1;
        let paginaIndex = 0;

        const mostrarMas = () => {
            let indexDesde = paginaIndex * resultadosAMostrar;
            let indexHasta = (paginaIndex * resultadosAMostrar) + resultadosAMostrar;

            if (cantidadResultados < indexHasta) {
                indexHasta = cantidadResultados;
            }

            listarResultados(indexDesde, indexHasta);
        }

        const listarResultadosMisGIFOS = (desde, hasta) => {
            misGIFOSResultsGallery.innerHTML = "";
            misGIFOSResultsGallery.classList.remove("hide");
            for (i = desde; i < hasta; i++) {
                try {
                    let divGif = document.createElement("div");
                    let divOverlay = document.createElement("div");
                    let divFetchedGifOptions = document.createElement("div");
                    divFetchedGifOptions.classList.add('fetched-gif-options');
                    let divFetchedGifInfo = document.createElement("div");
                    divFetchedGifInfo.classList.add('fetched-gif-info');
                    let fetchedGifOptionFavorite = document.createElement("div");
                    fetchedGifOptionFavorite.classList.add("fetched-gif-option-fav");
                    let fetchedGifOptionDownload = document.createElement("div");
                    fetchedGifOptionDownload.classList.add("fetched-gif-option-down");
                    let fetchedGifOptionDelete = document.createElement("div");
                    fetchedGifOptionDelete.classList.add("fetched-gif-option-delete");
                    let fetchedGifOptionView = document.createElement("div");
                    fetchedGifOptionView.classList.add("fetched-gif-option-view");
                    let fetchedGifUser = document.createElement("p");
                    fetchedGifUser.classList.add('fetched-gif-user');
                    let fetchedGifTitle = document.createElement("p");
                    fetchedGifTitle.classList.add('fetched-gif-title');
                    
                    let gifURL = "https://media2.giphy.com/media/" + misGIFOSArray[i] + "/giphy.gif" ;
                    console.log(gifURL);
                    let usuario = misGIFOSArray[i].usuario;
                    let titulo = misGIFOSArray[i].titulo;
    
                    if (usuario === "") {
                        usuario = "Anónimo";
                    }
    
                    if (titulo === "") {
                        titulo = "Sin título";
                    }
    
                    divGif.classList.add('fetched-gif');
                    divOverlay.classList.add('fetched-gif-overlay');
    
                    // divFetchedGifOptions.appendChild(fetchedGifOptionFavorite);
                    // Se podría hacer que el botón elimine de favoritos?
                    divFetchedGifOptions.appendChild(fetchedGifOptionDownload);
                    //divFetchedGifOptions.appendChild(fetchedGifOptionView);
                    divOverlay.appendChild(divFetchedGifOptions);
    
                    fetchedGifUser.textContent = usuario;
                    fetchedGifTitle.textContent = titulo;
                    divFetchedGifInfo.appendChild(fetchedGifUser);
                    divFetchedGifInfo.appendChild(fetchedGifTitle);
                    divOverlay.appendChild(divFetchedGifInfo);
    
                    divGif.style.backgroundImage = "url(" + gifURL + ")";
                    divGif.appendChild(divOverlay);
                    misGIFOSResultsGallery.appendChild(divGif);
    
                    const unfavoriteGifCallback = () => {
                        unfavoriteGif(gifURL);
                    };
    
                    const downloadGifCallback = () => {
                        downloadGif(index);
                    };
    
                    const expandGifCallback = () => {
                        expandGif(index, gifURL, usuario, titulo);
                    };
    
                    //divGif.addEventListener("click", expandGifCallback);
                    //fetchedGifOptionFavorite.addEventListener("click", unfavoriteGifCallback);
                    fetchedGifOptionDownload.addEventListener("click", downloadGifCallback);
                    //fetchedGifOptionView.addEventListener("click", expandGifCallback);
                } catch(e) {
                    break;
                }
                
            }

            for (l = 0; l < misGIFOSPaginationList.children.length; l++) {
                misGIFOSPaginationList.children[l].classList.remove("activo");
            }

            misGIFOSPaginationList.children[paginaIndex].classList.add("activo");

            if (cantidadResultados > paginaActual * resultadosAMostrar) {
                misGIFOSViewMore.classList.remove('hide');
                misGIFOSViewMore.addEventListener('click', mostrarMas);
                paginaActual++;
                paginaIndex++;
            } else {
                misGIFOSViewMore.classList.add('hide');
            }
        }

        if (cantidadPaginas > 0) {
            misGIFOSPagination.classList.remove('hide');
            for (i = 0; i < cantidadPaginas; i++){
                let linkPagina = document.createElement("li");
                linkPagina.textContent = i + 1;
                let indice = i;

                const clickLinkPagina = () => {
                    let indexDesde = indice * resultadosAMostrar;
                    let indexHasta = (indice * resultadosAMostrar) + resultadosAMostrar;
                    if (cantidadResultados < indexHasta) {
                        indexHasta = cantidadResultados;
                    }
                    paginaActual = indice + 1;
                    paginaIndex = indice;
                    listarResultadosMisGIFOS(indexDesde, indexHasta);
                }

                linkPagina.addEventListener('click', clickLinkPagina);
                misGIFOSPaginationList.appendChild(linkPagina);
            }
        }

        listarResultadosMisGIFOS(paginaIndex * resultadosAMostrar, (paginaIndex * resultadosAMostrar) + resultadosAMostrar);

    } else {
        misGIFOS.classList.remove("hide");
        misGIFOSResultsInfo.classList.remove("hide");
        misGIFOSResultsGallery.innerHTML = "";
        let imgSinResultados = document.createElement("img");
        imgSinResultados.src = "img/icon-mis-gifos-sin-contenido.svg"
        let titSinResultados = document.createElement("h3");
        titSinResultados.classList.add("section-fav-info-tit");
        titSinResultados.textContent = "¡Anímate a crear tu primer GIFO!";
        misGIFOSResultsInfo.appendChild(imgSinResultados);
        misGIFOSResultsInfo.appendChild(titSinResultados);
    }
}

// Cuando detecta un cambio en la barra de búsqueda, trae las sugerencias

const changeSearchBar = () => {
    let searchTerm = searchBar.value;
    fetchSearchSuggestions(giphySearchSuggestions, searchTerm);

    if (searchTerm.length > 0){
        searchBarCross.classList.remove('hide');
        searchBarLupaPlaceholder.classList.add('hide');
        searchBarLupaSearch.classList.remove('hide');
    } else {
        searchBarCross.classList.add('hide');
        searchBarLupaPlaceholder.classList.remove('hide');
        searchBarLupaSearch.classList.add('hide');
    }
}

// Limpia la barra de búsqueda

const clearSearchBar = () => {
    searchBar.value = "";
    searchBarCross.classList.add('hide');
    searchSuggestionsList.innerHTML = "";
}

// Muestra resultados de la búsqueda

const showResults = () => {
    let searchTerm = searchBar.value;
    fetchSearchGIFs(giphySearchGIFs, searchTerm);
    searchResultsTitle.textContent = searchTerm;
}

// Creación de GIFOS
let recorder;
let blob;
let dateStarted;
let form = new FormData();
let myGifosArray = [];
let myGifosString = localStorage.getItem("myGIFOS");
let video = document.getElementById("recording_video");
//let recorded_gifo = document.getElementById("recorded_gifo");

const fetchStream = () => {
    crearGIFOSComenzar.classList.add("hide");
    crearGIFOSTitle.innerHTML = "¿Nos das acceso<br>a tu cámara?";
    crearGIFOSDescription.innerHTML = "El acceso a tu cámara será válido sólo<br>por el tiempo en el que estés creando el GIFO."
    navigator.mediaDevices
    .getUserMedia({ audio: false, video: { height: { max: 480 } } })
    .then( stream => {
        crearGIFOSTitle.classList.add("hide");
        crearGIFOSDescription.classList.add("hide");
        crearGIFOSGrabar.classList.remove("hide");
        crearGIFOSVideo.classList.remove("hide");
        crearGIFOSVideo.srcObject = stream;
        crearGIFOSVideo.play();

        recorder = RecordRTC(stream, {
            type: "gif",
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: function () {
              console.warn("Grabando");
            },
        });
    });
}

crearGIFOSComenzar.addEventListener("click", fetchStream);

const calculateTimeDuration = secs => {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - hr * 3600) / 60);
    var sec = Math.floor(secs - hr * 3600 - min * 60);
    if (min < 10) {
      min = "0" + min;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }
    return hr + ":" + min + ":" + sec;
  }

const recordStream = () => {
    recorder.startRecording();
    crearGIFOSGrabar.classList.add("hide");
    crearGIFOSFinalizar.classList.remove("hide");

    dateStarted = new Date().getTime();
    (function looper() {
        crearGIFOSInfoTimer.innerHTML = calculateTimeDuration(
        (new Date().getTime() - dateStarted) / 1000
        );
        setTimeout(looper, 1000);
  })();
}

crearGIFOSGrabar.addEventListener("click", recordStream);

const repeatStream = () => {
    recorder.clearRecordedData();
    crearGIFOSInfoTimer.classList.add("hide");
    crearGIFOSSubir.classList.add("hide");
    crearGIFOSVideoRecorded.classList.add("hide");
    crearGIFOSGrabar.classList.remove("hide");
    navigator.mediaDevices
    .getUserMedia({ audio: false, video: { height: { max: 480 } } })

    .then(function (stream) {
      // Actualizar paso
      crearGIFOSVideo.classList.remove("hide");
      crearGIFOSVideo.srcObject = stream;
      crearGIFOSVideo.play();

      recorder = RecordRTC(stream, {
        type: "gif",
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function () {
            console.warn("Grabando");
        },
      });
    });
}

const endStream = () => {
    crearGIFOSFinalizar.classList.add("hide");
    crearGIFOSSubir.classList.remove("hide");
    crearGIFOSInfoTimer.classList.add("hide");
    crearGIFOSInfoRepeat.classList.remove("hide");
    crearGIFOSInfoRepeatA.addEventListener("click", repeatStream);

    recorder.stopRecording(function () {
        crearGIFOSVideo.classList.add("hide");
        crearGIFOSVideoRecorded.classList.remove("hide");
        blob = recorder.getBlob();
        crearGIFOSVideoRecorded.src = URL.createObjectURL(recorder.getBlob());
        //crearGIFOSVideoRecorded.play();
        form.append("file", recorder.getBlob(), "myGifo.gif");
        form.append("api_key", key);
      });
}

crearGIFOSFinalizar.addEventListener("click", endStream);

const uploadStream = () => {
    crearGIFOSVideoOverlay.classList.remove("hide");
    crearGIFOSVideoOverlayIcon.remove("hide");
    crearGIFOSVideoOverlayText.textContent = "Estamos subiendo tu GIFO"
    crearGIFOSVideoOverlayText.classList.remove("hide");
    // Actualizar paso
    crearGIFOSInfoRepeat.classList.add("hide");


    fetch("https://upload.giphy.com/v1/gifs", {
      method: "POST",
      body: form,
    })
      .then((response) => {
        return response.json();
      })
      .then((gifo) => {
        let gifoID = gifo.data.id;
        crearGIFOSVideoOverlayActions.classList.remove("hide");
        crearGIFOSVideoOverlayIcon.classList.remove("loader");
        crearGIFOSVideoOverlayIcon.classList.add("check");
        crearGIFOSVideoOverlayText.textContent = "GIFO subido con éxito";
        crearGIFOSVideoOverlayActions.innerHTML = `
              <button class="gifo__btn" id="download_btn" onclick="downloadGIFO('${gifoID}')">
                  <img src="./img/icon-download-hover.svg" alt="Descargar">
              </button>
              <button class="gifo__btn" id="link_btn">
                  <img src="./img/icon-link-hover.svg" alt="link">
              </button>`;
              crearGIFOSSubir.classList.add("hide");
  
        misGIFOSArray.push(gifoID);
        misGIFOSArrayStringified = JSON.stringify(misGIFOSArray);
        localStorage.setItem("myGIFOS", misGIFOSArrayStringified);
      })
      .catch((error) => console.log(error));
}

crearGIFOSSubir.addEventListener("click", uploadStream);

async function downloadGIFO(gifoImg) {
    let blob = await fetch(
      "https://media.giphy.com/media/" + gifoImg + "/giphy.gif"
    ).then((img) => img.blob());
    invokeSaveAsDialog(blob, "myGifo.gif");
  }

// EVENT LISTENERS

//Cambios en la barra de búsqueda
searchBar.addEventListener('input', changeSearchBar);
//Click en la equis de la barra de búsqueda
searchBarCross.addEventListener('click', clearSearchBar);
//Al aceptar la búsqueda de un GIF
formSearch.addEventListener('submit', e => {
    e.preventDefault;
    e.stopPropagation;
    showResults();
});
//Al hacer click en la lupa al tener el campo de búsqueda con algo de texto
searchBarLupaSearch.addEventListener('click', showResults);
//Ingresar a Home
logo.addEventListener('click', e => {
    changeSection('home');
});
//Ingresar a Favoritos
aMisFavoritos.addEventListener('click', e => {
    e.preventDefault;
    e.stopPropagation;
    changeSection('favoritos');
    fetchFavoriteGIFs();
});
// Ingresar a mis GIFOS
aMisGIFOS.addEventListener('click', e => {
    e.preventDefault;
    e.stopPropagation;
    changeSection('mis-gifos');
});
// Ingresar a Crear GIFOS
aCrearGIFOS.addEventListener('click', e => {
    e.preventDefault;
    e.stopPropagation;
    changeSection('crear-gifos');
});
//Activar modo nocturno
aModoNocturno.addEventListener('click', e => {
    e.preventDefault;
    e.stopPropagation;
    if (modoNocturno === false){
        aModoNocturno.classList.add('active');
        body.classList.add('dark-mode');
        aModoNocturno.textContent = 'Modo Diurno';
        modoNocturno = true;
    } else {
        aModoNocturno.classList.remove('active');
        body.classList.remove('dark-mode');
        aModoNocturno.textContent = 'Modo Nocturno';
        modoNocturno = false;
    }
});

