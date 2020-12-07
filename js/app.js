const key = "qg9B328JuyVC0ozHU262REA1CkidGGzJ";
const giphyTrendingGIFsAPI = "https://api.giphy.com/v1/gifs/trending?api_key=" + key;
const giphyTrendingSearchTerms = "https://api.giphy.com/v1/trending/searches?api_key=" + key;
const giphySearchSuggestions = "https://api.giphy.com/v1/gifs/search/tags?api_key=" + key + "&q=";
let trendingGIFsDiv = document.getElementById("section-tre-car");
let trendingTopicsDiv = document.getElementById("header-tre-top");
let searchBar = document.getElementById("search-bar");
let searchSuggestionsList = document.getElementById("search-sug-list");

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


const fetchSearchSuggestions = (giphyAPI, searchTerm) => {
    fetch(giphyAPI + searchTerm)
        .then((response) => {
        return response.json();
        })
        .then((json) => {
        console.log(json);
        searchSuggestionsList.innerHTML = "";
        for (i = 0; i < json.data.length; i++){
            let suggestionItem = document.createElement("li");
            suggestionItem.textContent = json.data[i].name;
            searchSuggestionsList.appendChild(suggestionItem);
        }
    });
}

fetchTrendingGIFs(giphyTrendingGIFsAPI);
fetchTrendingSearchTerms(giphyTrendingSearchTerms);

const updateAutocomplete = () => {
    let searchTerm = searchBar.value;
    fetchSearchSuggestions(giphySearchSuggestions, searchTerm);
}

searchBar.addEventListener('input', updateAutocomplete);