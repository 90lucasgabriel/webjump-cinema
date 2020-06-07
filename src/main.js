import { api, defaultConfig } from './api';
import './styles.css';

import logoImg from './assets/logo.svg';
import searchImg from './assets/search.svg';
import notificationsImg from './assets/notifications.svg';
import profileImg from './assets/profile.svg';
import favoriteImg from './assets/favorite.svg';
import favoriteActiveImg from './assets/favorite-active.svg';
class App {
  constructor() {
    this.popularMovies = [];
    this.popularMoviesElement = '';
    this.nowPlayingMovies = [];
    this.nowPlayingMoviesElement = '';
    this.favoritesMovies = [];
    this.favoritesMoviesElement = 'Nenhum favorito adicionado.';

    this.appElement = document.getElementById('app');
    this.init();
  }

  async init() {
    await this.fetchPopular();
    await this.fetchNowPlaying();

    this.appElement.innerHTML = await this.render();
    this.registerHandlers();
  }

  async getPopular() {
    try {
      const response = await api.get(`/movie/popular?${defaultConfig}`);
      const movies = this.mapMovies(response);

      return movies;
    } catch (error) {
      console.log('App -> getPopular -> error', error);
    }
  }

  async getNowPlaying() {
    try {
      const response = await api.get(`/movie/now_playing?${defaultConfig}`);
      const movies = this.mapMovies(response);

      return movies;
    } catch (error) {
      console.log('App -> getPopular -> error', error);
    }
  }

  mapMovies(response) {
    const results = response.data.results;

    const movies = results.map((movie) => {
      return {
        ...movie,
        poster_path: `https://image.tmdb.org/t/p/w1280/${movie.poster_path}`,
        backdrop_path: `https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`,
      };
    });

    return movies;
  }

  checkFavorite(movie) {
    const findFavorite = this.favoritesMovies.find(
      (favorite) => favorite.id == movie.id
    );

    let isFavorite = favoriteImg;
    if (findFavorite) {
      isFavorite = favoriteActiveImg;
    }

    return isFavorite;
  }

  async fetchPopular() {
    if (this.popularMovies.length === 0) {
      this.popularMovies = await this.getPopular();
    }

    this.popularMoviesElement = this.popularMovies.map((movie) => {
      const isFavorite = this.checkFavorite(movie);

      return /*html*/ `
        <div id=${movie.id} class="movie-item">
          <div class="favorite-icon">
            <img src=${isFavorite} />
          </div>
          <img src=${movie.poster_path} />
        </div>
      `;
    });
  }

  async fetchNowPlaying() {
    if (this.nowPlayingMovies.length === 0) {
      this.nowPlayingMovies = await this.getNowPlaying();
    }

    this.nowPlayingMoviesElement = this.nowPlayingMovies.map((movie) => {
      const isFavorite = this.checkFavorite(movie);

      return /*html*/ `
        <div id=${movie.id} class="movie-item">
          <div class="favorite-icon">
            <img src=${isFavorite} />
          </div>
          <img src=${movie.poster_path} />
        </div>
      `;
    });
  }

  registerHandlers() {
    this.movieItems = document.querySelectorAll('div[class=movie-item]');

    this.movieItems.forEach((element) => {
      element.addEventListener('click', () => {
        const poster_path = element.querySelectorAll('img')[1].src;
        this.handleFavorite({ id: element.id, poster_path });
      });
    });
  }

  async handleFavorite({ id, poster_path }) {
    const findElement = this.favoritesMovies.find((movie) => movie.id === id);

    if (findElement) {
      this.favoritesMovies = this.favoritesMovies.filter(
        (movie) => movie.id !== id
      );
    } else {
      this.favoritesMovies = [...this.favoritesMovies, { id, poster_path }];
    }

    if (this.favoritesMovies.length > 0) {
      this.favoritesMoviesElement = this.favoritesMovies.map((movie) => {
        return /*html*/ `
          <div id=${movie.id} class="movie-item">
            <div class="favorite-icon">
              <img src=${favoriteActiveImg} />
            </div>
            <img src=${movie.poster_path} />
          </div>
        `;
      });
    } else {
      this.favoritesMoviesElement = 'Nenhum favorito adicionado.';
    }

    this.init();
  }

  render() {
    const app = /*html*/ `
      <div class="background-row"></div>
      <div class="app-container">
        <header>
          <div class="menus-container">
            <a href="#"><img src=${logoImg} /></a>
            <a href="#">Filmes</a>
            <a href="#">Séries</a>
            <a href="#">Favoritos</a>
          </div>
          <div class="icons-container">
            <img src=${searchImg} />
            <img src=${notificationsImg} />
            <img src=${profileImg} />
          </div>
        </header>

        <div class="featured-container">
          <div class="top-container">
            <div>
              <img src=${this.popularMovies[0].backdrop_path} />
              <div class="caption-container">
                <h1>${this.popularMovies[0].title}</h1>
                <p>${this.popularMovies[0].overview.substring(0, 200)}...</p>
              </div>
            </div>
          </div>
          <div class="subtop-container">
            <div>
              <img src=${this.popularMovies[1].backdrop_path} />
            </div>
            <div>
              <img src=${this.popularMovies[2].backdrop_path} />
            </div>
          </div>
        </div>

        <section class="movies">
          <h1>Populares</h1>
          <div class="movies-list">
            ${this.popularMoviesElement}
          </div>
        </section>

        <section class="movies">
          <h1>Em Exibição</h1>
          <div class="movies-list">
            ${this.nowPlayingMoviesElement}
          </div>
        </section>

        <section class="movies">
          <h1>Favoritos</h1>
          <div class="movies-list" id="favorites">
            ${this.favoritesMoviesElement}
          </div>
        </section>

      </div>
    `;

    return app;
  }
}

const app = new App();
