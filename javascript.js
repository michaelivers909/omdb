let title = document.getElementById("title");
let type = document.getElementById("type");
let year = document.getElementById("year");
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
        document.getElementById("totalResults").style.fontSize = "40px";
        return;
      }
      document.getElementById("totalResults").style.color = "white";

      json.Search.forEach((movie) => {
        let newDiv = document.createElement("div");
        newDiv.innerHTML = ` <div>
            <h2>${movie.Title}</h2>
            <p>${movie.Type}</p>
            <p>${movie.Year}</p>
            <img src="${movie.Poster}" alt="Movie Poster"/>
            <br></br>
        </div>`;
        let show = document.createElement("button");
        show.style.backgroundColor = "black";
        show.style.color = "white";
        show.style.border = "2px solid #4de606";
        show.style.borderRadius = "10px";
        show.innerText = "SHOW MORE INFORMATION";
        show.addEventListener("mouseover", (e) => {
          show.style.cursor = "pointer";
          show.style.color = "teal";
        });
        show.addEventListener("mouseleave", (e) => {
          show.style.color = "white";
        });
        show.value = movie.imdbID;
        show.addEventListener("click", (e) => {
          fetch(`http://www.omdbapi.com/?apikey=66d3f55c&i=${e.target.value}`)
            .then((res) => res.json())
            .then((json) => {
              console.log(json);

              let info = document.createElement("div");
              info.style.textShadow =
                "-2px -2px 0 #000000, 2px -2px 0 #000000, -2px 2px 0 #000000, 2px 2px 0 #000000";
              info.innerHTML = `<div>
            <h2>IMDB ID - ${json.imdbID}<h2/>
            <p>Genre - ${json.Genre}<p/>
            <p>Starring - ${json.Actors}<p/>
            <p>Writer - ${json.Writer}<p/>
            <p>Director - ${json.Director}<p/>
            <p>Plot - ${json.Plot}<p/>
            <p>Rated - ${json.Rated}<p/>
            <p>Runtime - ${json.Runtime}<p/>
            <input class="button" type="button" value="CLOSE" id="close"/>
            <br><br/><br></br>
            </div>`;
              newDiv.append(info);
              document.getElementById("close").classList.remove("hidden");
              let closeInfo = document.getElementById("close");
              closeInfo.addEventListener("click", (e) => {
                info.innerText = ``;
              });
            });
        });
        newDiv.append(show);
        console.log(newDiv);
        document.getElementById("results").append(newDiv);

        document.getElementById(
          "totalResults"
        ).innerText = `${json.totalResults} Results Returned`;
        document.getElementById("totalResults").style.fontSize = "25px";
      });
    });
});
