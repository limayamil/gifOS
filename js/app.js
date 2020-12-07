const key = "qg9B328JuyVC0ozHU262REA1CkidGGzJ";
const giphyTrendingAPI =
"https://api.giphy.com/v1/gifs/trending?api_key=" + key;
let trendingDiv = document.getElementById("section-tre-car");

const fetchTrendingData = (giphyAPI) => {
fetch(giphyAPI)
    .then((response) => {
    return response.json();
    })
    .then((json) => {
    console.log(json);
    for (i = 0; i < 3; i++){
        let gifImg = document.createElement("img");
        gifImg.src = json.data[i].images.downsized.url;
        trendingDiv.appendChild(gifImg);
    }
});
}

fetchTrendingData(giphyTrendingAPI);