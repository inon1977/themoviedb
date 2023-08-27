let urlParams = new URLSearchParams(window.location.search);
const apiKey = urlParams.get('api_key');
const apiUrl = 'https://api.themoviedb.org/3/movie/popular';
fetch(`${apiUrl}?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        const movieList = document.getElementById('movieList');
        //looping thru whatever the api returned:
        data.results.forEach(movie => {
            console.log(movie);
            let movide_id = movie.id;
            let movie_name = movie.title;
            //getting movie genre and store it in 'movie_Genr' variable.
            const genres = {
                28: "Action",
                12: "Adventure",
                16: "Animation",
                35: "Comedy",
                80: "Crime",
                99: "Documentary",
                18: "Drama",
                10751: "Family",
                14: "Fantasy",
                36: "History",
                27: "Horror",
                10402: "Music",
                9648: "Mystery",
                10749: "Romance",
                878: "Science Fiction",
                10770: "TV Movie",
                53: "Thriller",
                10752: "War",
                37: "Western"
            };//Getting all genres and their IDs
            let movie_Genr = ''; //creating an empty variable so I can use it to gather all genres and wrap in HTML elements
            let movieGenre = movie.genre_ids; // we need IDs for the loop. 'genre_ids' are collected thru the 'movie' object
            //creating a wrapper around the genre pills to add space
            const genreContainer = document.createElement("div");
            genreContainer.className = "genreContainer";
            const genreContainerLabel = document.createElement("span");
            genreContainerLabel.className = "genreContainerLabel";
            genreContainerLabel.textContent = "Genres:"
            //looping thru the generes and creating an HTML element for each. We do += to add the genres to the variable 'movie_Genr'
            movieGenre.forEach(genreId => {
                movie_Genr += `<span class="badge rounded-pill text-bg-info me-2 my-1">${genres[genreId]}</span>`;
            });
            const reviewBtn =  document.createElement("button");
            reviewBtn.className = "btn btn-primary";
            reviewBtn.textContent = `Check ${movie_name} Reviews`;
            reviewBtn.setAttribute('id', `movieid-${movide_id}`);
            
            // getting movie ID to use in the credits URL variable. 
            const movieId = movie.id;
            // storing the credits URL so we can fetch and retrieve, using the ID and the apiKey as values
            const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;
            //fetching cast members:
            let cast = ''; // we decalre an empty var to access it in the scope (not sure if this is needed, but I did it anyway)
            let castProfileImage = '';
            let castListUL = ''; // for some reason, when I delete this, things stop working
            let castProfilePic = document.createElement("img"); // creating <img> element for the actor/acress profile pic
            fetch(creditsUrl)
                .then(response => response.json())
                .then(data => {
                    castListUL = document.getElementById("castList");
                    const maxItems = 4; // limit the number of cast members shown.
                    let itemsAdded = 0;                    
                    cast = data.cast;
                    cast.forEach(castMember => { 
                        if(itemsAdded < maxItems) {
                            const castProfilePath = castMember.profile_path; // getting this to get the path for the image
                            const castMemberProfileUrl = `https://image.tmdb.org/t/p/w154/${castProfilePath}`;
                            castProfilePic.src = castMemberProfileUrl;
                            //creating HTML elements for the cast section List View: 
                            const castCardContainer = document.createElement("div");
                            castCardContainer.className = "card mx-2 mt-2 mb-3 col-md-5 col-sm-10";
                            castCardContainer.innerHTML = `
                                <div class="card-up aqua-gradient"></div>
                                    <div class="avatar mx-auto ">
                                        <img src="${castMemberProfileUrl}" width="100" class="" alt="woman avatar">
                                    </div>
                                    <div class="card-body text-center text-black">
                                        <h4 class="card-title font-weight-bold">${castMember.name}</h4>
                                        <hr>
                                        <p>
                                            ${castMember.character}
                                        </p>
                                    </div>
                                </div>`
                                castCardsList.appendChild(castCardContainer);
                            itemsAdded++;
                        }
                    })
                })
                .catch(error => {console.error('Error:', error);});
            //declare / create elements: 
            const castContainer = document.createElement("div");
            const castCardsList = document.createElement("div");
            castCardsList.className = "row";
            castCardsList.setAttribute('id', 'castList');
            const castListTitle = document.createElement("h3");
            castListTitle.textContent = "Cast:"
            const movieID = movie.id;
            const wrapperdiv = document.createElement('div');
            const overlaydiv = document.createElement('div');
            const spacerDiv = document.createElement('div');
            wrapperdiv.className = "col-md-4";
            const carddiv = document.createElement('div');
            carddiv.classList.add("movie");
            carddiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`;
            const cardbodydiv = document.createElement('div');
            const li = document.createElement('li');
            const title = document.createElement('h6');
            const overview = document.createElement('p');
            const releaseDate = document.createElement('p');
            const poster = document.createElement('img');
            const cover = document.createElement('img');
            const moreDetailsBtn = document.createElement('a');
            const moreDetailsText = "More Details"
            poster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
            cover.src = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
            //give classes / content 
            carddiv.className = "cardMovie";
            overlaydiv.className = "overlay"
            cardbodydiv.className = "card-body"
            title.className = "card-title";
            title.textContent = movie.title;
            overview.textContent = movie.overview;
            overview.className = "card-text ";
            releaseDate.textContent = `Release Date: ${movie.release_date}`;
            releaseDate.className = "position-relative release_date";
            moreDetailsBtn.className = "btn btn-primary";
            moreDetailsBtn.textContent = moreDetailsText;
            moreDetailsBtn.setAttribute('data-bs-toggle', 'modal');
            moreDetailsBtn.setAttribute('data-bs-target', `#id-${movieID}`);
            castContainer.className = "movieCast";
            //modal elements: 
            const modalWrapper = document.createElement("div");
            Object.assign(modalWrapper, {
                className: "modal fade modal-xl",
                id: `id-${movieID}`,
                tabindex: -1
            });
            modalWrapper.setAttribute('aria-hidden', true)
            const modalDialog = document.createElement("div");
            const modalContent = document.createElement("div");
            const modalHeader = document.createElement("div");
            const modalTitle = document.createElement("h5");
            const modalCloseX = document.createElement("button");
            modalCloseX.setAttribute('data-bs-dismiss', 'modal');
            Object.assign(modalCloseX, {
                type: "button",
                className: "btn btn-close",
                "aria-label": "close",
                onclick: function(){
                    const openModal = document.getElementById(`id-${movieID}`);
                    if (openModal) {
                        openModal.style.display = 'none';
                    }
                }
            })
            let modalMoviePoster = document.createElement("img");
            modalMoviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            modalMoviePoster.className = "img-responsive";
            modalMoviePoster.setAttribute('width', '100%');
            const modalGridRow = document.createElement("div");
            const modalGridContainer = document.createElement("div");
            const modalGridCol4 = document.createElement("div");
            const modalGridCol8 = document.createElement("div");
            const modalBody = document.createElement("div");
            const modalBodyText = document.createElement("p");
            const modalFooter = document.createElement("div");
            const footerCloseBtn = document.createElement("button");
            modalGridRow.className = "row";
            modalGridContainer.className = "container";
            modalGridCol4.className = "col-md-4 col-lg-4";
            modalGridCol8.className = "col-md-8 col-lg-8";
            modalDialog.className = "modal-dialog";
            modalContent.className = "modal-content";
            modalHeader.className = "modal-header";
            modalTitle.className = "modal-title";
            modalTitle.textContent = movie.title;
            modalBody.className = "modal-body";
            modalBodyText.textContent = movie.overview;
            modalFooter.className = "modal-footer";
            footerCloseBtn.className = "btn btn-secondary";
            footerCloseBtn.type = "button";
            footerCloseBtn.setAttribute('data-bs-dismiss', 'modal');
            // put the app together (injecting to the DOM)
            movieList.appendChild(wrapperdiv);  
                wrapperdiv.appendChild(carddiv);
                    cardbodydiv.appendChild(title);
                    cardbodydiv.appendChild(overview);
                    cardbodydiv.appendChild(moreDetailsBtn);
                    cardbodydiv.appendChild(spacerDiv);
                    cardbodydiv.appendChild(releaseDate);
                carddiv.appendChild(cardbodydiv);
                carddiv.appendChild(overlaydiv);
            //constructing the modal under each movie:
            movieList.appendChild(modalWrapper);
                modalWrapper.appendChild(modalDialog);
                    modalDialog.appendChild(modalContent);
                        modalContent.appendChild(modalHeader);
                            modalHeader.appendChild(modalTitle);
                            modalHeader.appendChild(modalCloseX);
                        modalContent.appendChild(modalBody);
                            modalBody.appendChild(modalGridRow);
                                    modalGridRow.appendChild(modalGridCol4);
                                        modalGridCol4.appendChild(modalMoviePoster);
                                        modalGridCol4.appendChild(genreContainer);
                                            genreContainer.appendChild(genreContainerLabel);
                                            genreContainer.innerHTML += movie_Genr;
                                            modalGridCol4.appendChild(reviewBtn);
                                        modalGridRow.appendChild(modalGridCol8);
                                            modalGridCol8.appendChild(modalBodyText);
                                            modalGridCol8.appendChild(castContainer);
                                                castContainer.appendChild(castListTitle);
                                                castContainer.appendChild(castCardsList);
                            modalBody.appendChild(modalFooter);
        });
    }).catch(error => {
        console.error('Error:', error);
    });