let urlParams = new URLSearchParams(window.location.search)
const apiKey = urlParams.get('api_key');
const apiUrl = 'https://api.themoviedb.org/3/movie/popular';
    fetch(`${apiUrl}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const movieList = document.getElementById('movieList');
            data.results.forEach(movie => {
            //declare / create elements: 
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
            
            //modal elements: 
            const modalWrapper = document.createElement("div");
            Object.assign(modalWrapper, {
                className: "modal fade",
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
                    } else {
                        alert('what do you want?')
                    }
                }
            })
            const modalBody = document.createElement("div");
            const modalBodyText = document.createElement("p");
            const modalFooter = document.createElement("div");
            const footerCloseBtn = document.createElement("button");
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

            // put everything together in HTML
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
                            modalBody.appendChild(modalBodyText);
          
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
      const movieOverview = document.getElementsByClassName("card-text");
      function show_overview(){}
      console.log(movieOverview);

      