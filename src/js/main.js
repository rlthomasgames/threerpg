/* eslint-disable no-console */
class Main {
  constructor()
  {
    this._main = null;
  }

  init() {
    setTimeout(() => {
      //initial view test
      /*
      console.log('hello');
      this._main = new GameView();
      this._main.init();
      */

      //game controller test
      this._main = new GameController();
      this._main.init();

    }, 1000);
  }
}

var main = new Main();

window.onload = main.init.bind(main);
