export class PantallaCarga extends Phaser.Scene{
	constructor(){
		//Loading--> nombre que se le da a la escena
		super({ key: "Loading"});
	}

	preload(){
		/*var progress = this.add.graphics(0,0);
		this.load.onFileComplete.add(function(prg){
			progress.beginFill(0xFF3300);
			progress.drawRect(0,0, prg*4.8, 100);
			progress.endFill();
		});*/
	}

	create(){
		/*this.add.text(20, 20, "Loading game...");
		//this.scene.start("Game");*/
	}
}