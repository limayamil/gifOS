const key = "qg9B328JuyVC0ozHU262REA1CkidGGzJ";
const giphyTrendingGIFs = "https://api.giphy.com/v1/gifs/trending?api_key=" + key;
const giphyTrendingSearchTerms = "https://api.giphy.com/v1/trending/searches?api_key=" + key;
const giphySearchSuggestions = "https://api.giphy.com/v1/gifs/search/tags?api_key=" + key + "&q=";
const giphySearchGIFs = "https://api.giphy.com/v1/gifs/search?api_key=" + key + "&q=";
let trendingGIFsDiv = document.getElementById("section-tre-car");
let trendingTopicsDiv = document.getElementById("header-tre-top");
let formSearch = document.getElementById("form-search");
let searchBar = document.getElementById("search-bar");
let searchBarCross = document.getElementById("search-bar-cross");
let searchSuggestionsList = document.getElementById("search-sug-list");
let searchResults = document.getElementById("section-res");
let searchResultsGallery = document.getElementById("section-res-gal");
let searchResultsTitle = document.getElementById("section-res-tit");
let searchResultsInfo = document.getElementById("section-res-info");

const fetchTrendingGIFs = (giphyAPI) => {
    fetch(giphyAPI)
        .then((response) => {
        return response.json();
        })
        .then((json) => {
        //console.log(json);
        for (i = 0; i < 3; i++){
            let gifImg = document.createElement("img");
            gifImg.src = json.data[i].images.downsized.url;
            trendingGIFsDiv.appendChild(gifImg);
        }
    });
}

const fetchTrendingSearchTerms = (giphyAPI) => {
    fetch(giphyAPI)
        .then((response) => {
        return response.json();
        })
        .then((json) => {
        //console.log(json);
        for (i = 0; i < 5; i++){
            if (i === 4) {
                let trendH4 = document.createElement("h4");
                trendH4.innerHTML = json.data[i];
                trendingTopicsDiv.appendChild(trendH4);
            } else {
                let trendH4 = document.createElement("h4");
                trendH4.innerHTML = json.data[i] + ",";
                trendingTopicsDiv.appendChild(trendH4);
            }
        }
    });
}

const searchSuggestion = searchTerm => {
    fetchSearchGIFs(giphySearchGIFs, searchTerm);
    searchBar.value = searchTerm;
    searchResultsTitle.textContent = searchTerm;
}

const fetchSearchSuggestions = (giphyAPI, searchTerm) => {
    fetch(giphyAPI + searchTerm)
        .then((response) => {
        return response.json();
        })
        .then((json) => {
        //console.log(json);
        searchSuggestionsList.innerHTML = "";
        for (i = 0; i < json.data.length; i++){
            let suggestionItem = document.createElement("li");
            let searchSuggestionFetched = json.data[i].name;
            suggestionItem.innerHTML = '<i class="fas fa-search"></i>' + searchSuggestionFetched;
            searchSuggestionsList.appendChild(suggestionItem);

            const clickSearchSuggestion = () => {
                searchSuggestion(searchSuggestionFetched);
                suggestionItem.removeEventListener("click", clickSearchSuggestion);
            }

            suggestionItem.addEventListener('click', clickSearchSuggestion);
        }
    });
}

const fetchSearchGIFs = (giphyAPI, searchTerm) => {
    fetch(giphyAPI + searchTerm)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            console.log(json);
            searchResultsGallery.innerHTML = "";
            searchResultsGallery.classList.add("hide");
            searchResultsInfo.classList.add("hide");
            searchResults.classList.add("hide");
                if (json.data.length > 0) {
                    searchSuggestionsList.innerHTML = "";
                    searchResults.classList.remove("hide");
                    searchResultsGallery.classList.remove("hide");
                    for (i = 0; i < 12; i++){
                        let divGif = document.createElement("div");
                        let divOverlay = document.createElement("div");

                        let usuario = json.data[i].username;
                        let titulo = json.data[i].title
                        if (usuario === "") {
                            usuario = "Anónimo";
                        }

                        if (titulo === "") {
                            titulo = "Sin título";
                        }

                        divGif.classList.add('fetched-gif');
                        divOverlay.classList.add('fetched-gif-overlay');
                        divOverlay.innerHTML = "<div class='fetched-gif-info'><p class='fetched-gif-user'>" + usuario +"</p><p class='fetched-gif-title'>" + titulo + "</p></div>"
                        divGif.style.backgroundImage = "url(" + json.data[i].images.downsized.url + ")";
                        divGif.appendChild(divOverlay);
                        searchResultsGallery.appendChild(divGif);
                    }
            } else if (json.data.length === 0) {
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

fetchTrendingGIFs(giphyTrendingGIFs);
fetchTrendingSearchTerms(giphyTrendingSearchTerms);

const changeSearchBar = () => {
    let searchTerm = searchBar.value;
    fetchSearchSuggestions(giphySearchSuggestions, searchTerm);

    if (searchTerm.length > 0){
        searchBarCross.classList.remove('hide');
    } else {
        searchBarCross.classList.add('hide');
    }
}

const clearSearchBar = () => {
    searchBar.value = "";
    searchBarCross.classList.add('hide');
    searchSuggestionsList.innerHTML = "";
}

const showResults = () => {
    let searchTerm = searchBar.value;
    fetchSearchGIFs(giphySearchGIFs, searchTerm);
    searchResultsTitle.textContent = searchTerm;
}

searchBar.addEventListener('input', changeSearchBar);
searchBarCross.addEventListener('click', clearSearchBar);
formSearch.addEventListener('submit', e => {
    e.preventDefault;
    e.stopPropagation;
    showResults();
});