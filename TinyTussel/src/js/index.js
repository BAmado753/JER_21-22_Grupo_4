import { Inicio} from './scenes/PantallaDeInicio.js';
import { Menu } from './scenes/Menu.js';
import { Loading } from './scenes/PantallaCarga.js';
import { Escenario1 } from './scenes/Escenario1.js';
import { Escenario2 } from './scenes/Escenario2.js';
import { Escenario3 } from './scenes/Escenario3.js';

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Inicio, Menu, Loading, Escenario1, Escenario2, Escenario3],
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
