export class PantallaDeInicio extends Phaser.Scene{
	constructor(){
		//Inicio--> nombre que se le da a la escena
		super({ key: "Inicio"});
	}

	preload(){
		//Carga del botón de inicio
		//relatedScene-->en el caso de que la funcionalidad del botón se pusiera aparte
		//scene-->si se incluye la funcionalidad del botón en la propia escena
		//this.relatedScene.load.spritesheet('botonPlay', 'ruta', frameHeight: algo, frameWidth: algo);
	}

	create(){
		/*this.startButton = this.relatedScene.add.sprite(400, 230, 'botonPlay').setInteractive();
		
		this.startButton.on('pointerover', () => {
			this.startButton.setFrame(1);
		});

		this.startButton.on('pointerout', () => {
			this.startButton.setFrame(0);
		});

		this.startButton.on('pointerdown', () => {
			this.relatedScene.scene.start('Menu');
		});*/
	}

	update(){

	}
}