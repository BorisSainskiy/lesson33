$(() => {
  let form = $("#form");
  let filmPlaceholder = $("#filmPlaceholder");
  form.on("submit", e => {
    e.preventDefault();
    let titleFilm = $("#titleFilm").val();
    let typeFilm = $("#typeFilm").val();
    showMovie(titleFilm, typeFilm, 1);
  });

  let showMovie = (titleFilm, typeFilm, page) => {
    const API_URL = `https://www.omdbapi.com/?apikey=68c6b1ea&s=${titleFilm}&type=${typeFilm}&page=${page}`;
    $.ajax(API_URL, {
      success: data => {
        if (data.Response == "False") {
          let p = $("<p></p>");
          p.text("Movies not found!");
          filmPlaceholder.append(p);
        } else {
          let listFilms = data.Search;

          $(function() {
            $("#paginationPlaceholder").pagination({
              items: data.totalResults,
              itemsOnPage: listFilms.length,
              cssStyle: "light-theme"
            });
          });

          f(titleFilm, typeFilm, page);
        }
      }
    });
  };

  let f = (titleFilm, typeFilm, page) => {
    const API_URL = `https://www.omdbapi.com/?apikey=68c6b1ea&s=${titleFilm}&type=${typeFilm}&page=${page}`;
    $.ajax(API_URL, {
      success: data => {
        if (data.Response == "False") {
          let p = $("<p></p>");
          p.text("Movie not found!");
          filmPlaceholder.append(p);
        } else {
          $("#filmPlaceholder").empty();
          let listFilms = data.Search;
          $.each(listFilms, (index, movie) => {
            let title = $("<p></p>");
            let button = $("<button></button>");
            title.text(`${(page - 1) * 10 + 1 + index}. ${movie.Title}`);
            button.text("Info");
            button.on("click", () => {
              showInfo(`${movie.Title}`, `${movie.Year}`, `${movie.Poster}`);
            });
            title.append(button);
            filmPlaceholder.append(title);
          });

          $(function() {
            $("#paginationPlaceholder").pagination("selectPage", page);
          });

          $("#paginationPlaceholder").on("click", () => {
            f(
              titleFilm,
              typeFilm,
              $("#paginationPlaceholder").pagination("getCurrentPage")
            );
          });
        }
      }
    });
  };

  let showInfo = (title, year, poster) => {
    $("#info").empty();
    let p = $("<p></p>");
    let img = $("<img>");
    p.text(`${title} ${year}`);
    img.attr("src", poster);
    $("#info").append(p);
    $("#info").append(img);
  };
});
