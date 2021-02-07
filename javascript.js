let title = document.getElementById("title");
let type = document.getElementById("type");
let year = document.getElementById("year");
let noChoice = null;

document.getElementById("fetch").addEventListener("click", (e) => {
  e.preventDefault();
  let titleVal = document.getElementById("title").value;
  let typeVal = document.getElementById("type").value;
  let yearVal = document.getElementById("year").value;
  //let imVal=document.getElementById("im").value;

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

          json.Search.forEach((movie) => {
              let info = document.createElement("div");
              info.innerHTML = `<div>
            <p>${movie.imdbID}<p/>
            </div>`;
              
             
            });
            
            info.append(newDiv);
            document.getElementById("showMore").append(info);
            document.getElementById("showMore").classList.remove("hidden");
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
