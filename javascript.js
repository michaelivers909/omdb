let title = document.getElementById("title");
let type = document.getElementById("type");
let year = document.getElementById("year");
let titleError = document.getElementById("titleError");
let typeError = document.getElementById("typeError");
let yearError = document.getElementById("yearError");

let noChoice = null;

document.getElementById("fetch").addEventListener("click", (e) => {
  e.preventDefault();
  let titleVal = document.getElementById("title").value;
  let typeVal = document.getElementById("type").value;
  let yearVal = document.getElementById("year").value;

  document.getElementById("results").innerHTML = ``;

  fetch(
    `http://www.omdbapi.com/?apikey=66d3f55c&s=${titleVal}&type=${typeVal}&y=${yearVal}`
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      if (json.Response === "False" || titleVal < 3) {
        document.getElementById("totalResults").innerText =
          "ERROR: Please check search parameters and try again";
        document.getElementById("totalResults").style.color = "red";
        document.getElementById("totalResults").style.fontSize = "75px";
        return;
      }
      document.getElementById("totalResults").style.color = "white";

      json.Search.forEach((movie) => {
        movie.Title;
        movie.Type;
        movie.Poster;
        movie.Year;


        document.getElementById("results").innerHTML += ` <div>
            <h2>${movie.Title}</h2>
            <p>${movie.Type}</p>
            <p>${movie.Year}</p>
            <img src="${movie.Poster}"/>
        </div>`;
        document.getElementById(
          "totalResults"
        ).innerText = `${json.totalResults} Results Returned`;
        document.getElementById("totalResults").style.fontSize = "25px";
      });
    });
});
