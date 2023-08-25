let urlParams = new URLSearchParams(window.location.search)
const apiKey = urlParams.get('api_key');
const apiUrl = 'https://api.themoviedb.org/3/movie/popular';
    fetch(`${apiUrl}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const movieList = document.getElementById('movieList');
            data.results.forEach(movie => {
                const movieId = movie.id;
                const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;
                //fetching cast:
                let cast = '';
                fetch(creditsUrl)
                    .then(response => response.json())
                    .then(data => {
                        castListUL = document.getElementById("castList");
                        const maxItems = 5;
                        let itemsAdded = 0;
                        cast = data.cast;
                        cast.forEach(castMember => {
                            if(itemsAdded < maxItems) {
                                const castListItem = document.createElement("li");
                                castListItem.className = "list-group-item";
                                castListItem.innerHTML = `<span class="badge text-bg-dark">${castMember.name}</span><small> as </small> <span class="badge text-bg-warning">${castMember.character}</span>`;
                                castList.appendChild(castListItem);
                                itemsAdded++;
                            }
                        })
                        console.log('movie: ', movie.title);
                        console.log('Cast:', cast);
                    })
                    .catch(error => {console.error('Error:', error);});
                //declare / create elements: 
                const castContainer = document.createElement("div");
                const castList = document.createElement("ul");
                castList.className = "list-group";
                castList.setAttribute('id', 'castList');
                castList.textContent = cast;
                //castContainer.textContent = cast;
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
                carddiv.className = "card";
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
                    className: "modal fade modal-lg",
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
                footerCloseBtn.setAttribute('data-bs-dismiss', 'modal')

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
                                            modalGridRow.appendChild(modalGridCol8);
                                                modalGridCol8.appendChild(modalBodyText);
                                                modalGridCol8.appendChild(castContainer);
                                                    castContainer.appendChild(castList);
                                modalBody.appendChild(modalFooter);
                        
            
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
    //   const movieOverview = document.getElementsByClassName("card-text");
    //   function show_overview(){}
    //   console.log(movieOverview);

