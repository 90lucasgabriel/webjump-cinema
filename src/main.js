import api from './api';
import './styles.css';

class App {
  constructor() {
    this.appElement = document.getElementById('app');
    this.appElement.innerHTML = this.render();
  }

  render() {
    const app = /*html*/`
      <div class="container">
        <header>
          <div class="menu-container">
            <div>LOGO</div>
            <div>Filmes</div>
            <div>Séries</div>
            <div>Favoritos</div>
          </div>
          <div class="icons-container">
            <div>X</div>
            <div>O</div>
            <div>P</div>
          </div>
        </header>
      </div>
    `;

    return app;
  }
}

const app = new App();
