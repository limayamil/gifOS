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
// Trending
const trendingGIFsDiv = document.getElementById("section-tre-car");
const trendingTopicsDiv = document.getElementById("header-tre-top");
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

// FUNCIONES DE GIPHY

// GENERALES

// Cambiar de sección
const changeSection = (section) => {

    const resetHome = () => {
        searchBar.value = "";
        searchResultsGallery.innerHTML = "";
        searchResultsGallery.classList.add('hide');
        searchPagination.innerHTML = "";
        searchViewMore.classList.add('hide');
        searchResultsInfo.classList.add('hide');
    }

    const resetFavorites = () => {
        misFavoritos.classList.add('hide');
        favoritosViewMore.classList.add('hide');
        favoritosResultsInfo.classList.add('hide');
        favoritosResultsGallery.innerHTML = "";
        favoritosPagination.innerHTML = "";
    }

    const resetAll = () => {
        resetHome();
        resetFavorites();
        aMisFavoritos.classList.remove('active');
    }

    resetAll();
    switch (section) {
        case 'home':
            header.classList.remove('hide');
            misFavoritos.classList.add('hide');
            break;
        case 'favoritos':
            aMisFavoritos.classList.add('active');
            header.classList.add('hide');
            misFavoritos.classList.remove('hide');
            favoritosResultsGallery.classList.remove('hide');
            favoritosPaginationList.classList.remove('hide');
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
    for (i = 0; i < 3; i++){
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
    overlayInfo.appendChild(overlayInfoDetails);

    // Faltan las opciones de agregar

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
    alert("Se borró un gif de favoritos");
}

// Favoritea un gif

const favoriteGif = (gifURL, usuario, titulo) => {
    gifsFavoritos.push({url: gifURL, usuario: usuario, titulo: titulo});
    localStorage.setItem("gifsFavoritos", JSON.stringify(gifsFavoritos));
    alert("Se añadió un gif a favoritos");
}

// Trae GIFs cuyo término se haya búsqueda

const fetchSearchGIFs = (giphyAPI, searchTerm) => {
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
            searchResults.classList.add("hide");

            let divArrowLeft = document.createElement('div');
            divArrowLeft.id = "arrow-left";
            let divArrowRight = document.createElement('div');
            divArrowRight.id = "arrow-right";
            let searchPaginationList = document.createElement('ul');

            let cantidadResultados = resultadosMemoria.data.length;
            let resultadosAMostrar = 12;
            let cantidadPaginas = Math.ceil(cantidadResultados / resultadosAMostrar);
            let paginaActual = 1;
            let paginaIndex = paginaActual - 1;

            if (cantidadResultados > 0) {
                searchSuggestionsList.innerHTML = "";
                searchResults.classList.remove("hide");
                searchResultsGallery.classList.remove("hide");

                const mostrarMas = () => {
                    let indexDesde = paginaIndex * resultadosAMostrar;
                    let indexHasta = (paginaIndex * resultadosAMostrar) + resultadosAMostrar;

                    if (cantidadResultados < indexHasta) {
                        indexHasta = cantidadResultados;
                    }

                    listarResultados(indexDesde, indexHasta);
                }

                const listarResultados = (desde, hasta) => {
                    searchResultsGallery.innerHTML = "";
                    for (i = desde; i < hasta; i++){
                        fetchGif(resultadosMemoria, searchResultsGallery, i);
                    }

                    for (l = 0; l < searchPaginationList.children.length; l++){
                        searchPaginationList.children[l].classList.remove("activo");
                    }

                    console.log("Voy a ponerle activo a: " + searchPaginationList.children[paginaIndex].innerHTML);

                    searchPaginationList.children[paginaIndex].classList.add("activo");
                    console.log("Pagina index: " + paginaIndex);
                    console.log("Cantidad de páginas: " + cantidadPaginas);

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

                    if (cantidadResultados > paginaActual * resultadosAMostrar) {
                        searchViewMore.classList.remove('hide');
                        searchViewMore.addEventListener('click', mostrarMas);
                        paginaActual++;
                        paginaIndex++;
                    } else {
                        searchViewMore.classList.add('hide');
                    }

                    const clickLinkPaginaAnterior = () => {
                        let indexDesde = (paginaIndex - 1) * resultadosAMostrar;
                        let indexHasta = ((paginaIndex - 1) * resultadosAMostrar) + resultadosAMostrar;
                        listarResultados(indexDesde, indexHasta);
                    }

                    const clickLinkPaginaSiguiente = () => {
                        let indexDesde = paginaIndex * resultadosAMostrar;
                        let indexHasta = indexDesde + resultadosAMostrar;
                        listarResultados(indexDesde, indexHasta);
                        divArrowRight.removeEventListener('click', clickLinkPaginaSiguiente);
                    }

                    if (divArrowLeft.classList.contains('active')){
                        divArrowLeft.addEventListener('click', clickLinkPaginaAnterior);
                    }

                    if (divArrowRight.classList.contains('active')){
                        divArrowRight.addEventListener('click', clickLinkPaginaSiguiente);
                    }
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

                listarResultados(paginaIndex * resultadosAMostrar, (paginaIndex * resultadosAMostrar) + resultadosAMostrar);

            } else if (cantidadResultados === 0) {
                searchResults.classList.remove("hide");
                searchResultsInfo.classList.remove("hide");
                searchResultsGallery.innerHTML = "";
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
        let paginaIndex = paginaActual - 1;

        const mostrarMas = () => {
            let indexDesde = paginaIndex * resultadosAMostrar;
            let indexHasta = (paginaIndex * resultadosAMostrar) + resultadosAMostrar;

            if (cantidadResultados < indexHasta) {
                indexHasta = cantidadResultados;
            }

            listarResultados(indexDesde, indexHasta);
        }

        const listarResultados = (desde, hasta) => {
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
                    favoritosResultsGallery.appendChild(divGif);
    
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
                    listarResultados(indexDesde, indexHasta);
                }

                linkPagina.addEventListener('click', clickLinkPagina);
                favoritosPaginationList.appendChild(linkPagina);
            }
        }

        listarResultados(paginaIndex * resultadosAMostrar, (paginaIndex * resultadosAMostrar) + resultadosAMostrar);

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