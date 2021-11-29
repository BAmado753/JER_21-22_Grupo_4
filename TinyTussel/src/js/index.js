import { PantallaDeInicio } from './scenes/PantallaDeInicio.js';
import { MenuPersonajes } from './scenes/MenuPersonajes.js';
import { MenuEscenarios } from './scenes/MenuEscenarios.js';
import { PantallaCarga } from './scenes/PantallaCarga.js';
import { Escenario1 } from './scenes/Escenario1.js';
import { Escenario2 } from './scenes/Escenario2.js';
import { Escenario3 } from './scenes/Escenario3.js';
import { Resultados } from './scenes/Resultados.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [PantallaDeInicio, MenuPersonajes, MenuEscenarios, PantallaCarga, Escenario1, Escenario2,
    Escenario3, Resultados]
};

var game = new Phaser.Game(config);
