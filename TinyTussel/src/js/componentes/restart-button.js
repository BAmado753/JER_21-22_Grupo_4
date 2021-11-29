export class RestartButton {
  constructor(scene) {
    this.relatedScene = scene;
  }

  // otros métodos de la clase
}

function preload() {
    this.relatedScene.load.spritesheet('button', 'images/restart.png', { frameWidth: 190, frameHeight: 49 });
}

function create() {
    this.startButton = this.relatedScene.add.sprite(400, 230, 'button').setInteractive();

    //Eventos del usuario con el ratón
    this.startButton.on('pointerover', () => {
      this.startButton.setFrame(1);
    });
    this.startButton.on('pointerout', () => {
      this.startButton.setFrame(0);
    });
    this.startButton.on('pointerdown', () => {
      //Reinicia la escena game
      this.relatedScene.scene.start('game');
    });
}