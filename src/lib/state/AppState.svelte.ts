enum AppModes {
  Edit = 'edit',
  Play = 'play',
  Debug = 'debug',
}

type AppMode = {
  [mode in AppModes]: boolean;
};

export class AppState {
  #editing: boolean = $state(true);
  #playing: boolean = $state(false);
  #debugging: boolean = $state(false);

  mode: AppMode = $derived({
    edit: this.#editing,
    play: this.#playing,
    debug: this.#debugging,
  });

  debug() {
    this.#debugging = !this.#debugging;
  }

  toggle() {
    if (this.mode.edit) {
      this.play();
    } else {
      this.edit();
    }
  }

  play() {
    this.#editing = false;
    this.#playing = true;
  }

  edit() {
    this.#playing = false;
    this.#editing = true;
  }
}
