import api from './api';
import './styles.css';

class App {
  constructor() {
    this.appElement = document.getElementById('app');
    this.appElement.innerHTML = this.render();
  }

  render() {
    const app = /*html*/`
      <div>Webjump Cinema</div>
    `;

    return app;
  }
}

const app = new App();
