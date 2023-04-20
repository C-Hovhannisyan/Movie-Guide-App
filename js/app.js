let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

let getMovie = () =>{
	let movieName = movieNameRef.value;
	let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
	//apikey=98c0b5a2

	//empty input field
	if(movieName <= 0){
		result.innerHTML = `<h3 class="msg">Find out about your favorite movie by entering the movie name...</h3>`;
	}
	//input isn't empty
	else{
		fetch(url).then((resp) => resp.json()).then((data) =>{
			// movie exist in database
			if(data.Response == "True"){
				result.innerHTML = `
					<div class="info">
						<img src=${data.Poster} class="poster">
						<div>
							<h2>${data.Title}</h2>
							<div class="rating">
								<img src="img/star.png">
								<h4>${data.imdbRating}</h4>
							</div>
							<div class="details">
								<span>${data.Rated}</span>
								<span>${data.Year}</span>
								<span>${data.Runtime}</span>
							</div>
							<div class="genre">
								<div>${data.Genre.split(",").join("</div><div>")}</div>
							</div>
						</div>
					</div>
					<h3>Plot:</h3>
					<p>${data.Plot}</p>
					<h3>Cast:</h3>
					<p>${data.Actors}</p>
				`;
			}
			//movie doesn't exist in database
			else{
				result.innerHTML = `<div class = "not-found">
															<img src="img/404-2.png">
														</div>`;

			}
		})

			//if there is an error
			.catch(() =>{
				result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
			});

	}
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
