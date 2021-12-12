# Tiny Tussle
### <h2>Resumen ejecutivo</h2>
| Título | Tiny Tussle | 
|:------------:|:-------------:|
| Estudio (equipo) | Stormedia |
| Integrantes |  Bárbara Amado Camuñas<br> Ana Barrio Gil <br> Laura Benavente Prieto <br> Clara Núñez Millán |  
| Correos corporativos | b.amado.2019@alumnos.urjc.es<br> a.barrio.2019@alumnos.urjc.es <br> l.benavente.2019@alumnos.urjc.es<br> c.nunez.2018@alumnos.urjc.es<br> |
| Cuentas de GitHub | anabgg<br> ClaraNM <br> laurabnvt <br> BAmado753 |
| Género |  Shooter/plataformas |
|Plataformas| Navegador en PC | 
  

### <h3>Concepto del juego</h3>
Tiny Tussle es un juego de disparos en el que los jugadores deberán recolectar las gemas para ganar. Pero por supuesto no es así de fácil, aparecerán armas aleatoriamente por el mapa y los jugadores deberán usarlas para matarse entre sí, pues cuando uno se muere perderá una pequeña cantidad de las gemas que había recolectado y podrán ser recogidas por los demás. Aquel que tenga la mayor cantidad de gemas cuando termine la partida, será el ganador. 

### <h3>Mission Statement</h3>
Tiny Tussle es un shooter 2D plataformero de hasta 2 jugadores pensado para jugarse en navegador y pasar un buen rato con los amigos.

### <h3>Target Audience</h3>
PEGI 12, para adolescentes y jóvenes. Un juego apto para jugadores casuales con mecánicas sencillas fáciles de comprender cuyo objetivo es la diversión de competir entre ellos.

### <h3>Estilo Visual</h3>
La estética de los distintos elementos del juego se basa en un estilo minimalista, alegre y colorido, siguiendo una paleta de color donde harmonicen las interfaces y resulte atractivo para los jugadores. <br>
Se ha optado por un estilo de dibujo en pixelart suponiendo que es el que mejor encaja con la estética que se escogió.

<h2>Elementos del juego</h2>

### <h3>Storyline </h3>
El planeta de Nulia organiza un torneo donde las tres naciones del mismo mandan a sus mejores guerreros a competir por la custodia de la gema que mantiene la paz en su mundo, la Telkeita, con lo que se juegan el honor de su país y la gran riqueza que supone ganar el torneo.
Chili, Bernie y Wasabi son los tres guerreros escogidos por las diferentes naciones de Nulia para competir en el gran torneo y defender su orgullo, por lo que deberán emplear todo su potencial para hacerse con la victoria.

### <h3>Personajes</h3>

| Personaje | Imagen | Descripción | 
|:------------:|:-------------:|:-------------:|
| Chili | ![Chili!](/images/Pink_Monster.png) | Este personaje es capaz de crear un espejismo de sí mismo para hacer de señuelo, y volverse invisible mientras exista el señuelo activo. <br> El clon solo tiene una vida y crearlo gasta energía que debe ser recargada.|
| Bernie |  ![Bernie!](/images/Owlet_Monster.png) | Este personaje puede intimidar al resto de personajes haciendo que se muevan más lento durante un tiempo. <br> La habilidad consume energía del personaje que debe ser recargada.| 
| Wasabi |  ![Wasabi!](/images/Dude_Monster.png) | Este personaje tiene la habilidad de generar una pequeña explosión a su alrededor dañando a todo aquel que esté a su alrededor en un radio de 5 unidades. <br> Esta explosión requiere mucha energía que debe ser recargada. Además, los otros jugadores podrán ver que va a explotar y tendrán 3 segundos para huir.| 

 #### <h3>Localizaciones</h3>
El juego tiene lugar en el planeta de los personajes, Nulia. Por otro lado, el torneo donde competirán los personajes se llevará a cabo en 3 escenarios diferentes.
| Niveles | Descripción |
|------------|-------------|
| ![Escenario 1!](/images/captura_escenario1.png) | Fondo con plataformas cuya temática es el bosque, con un ambiente diurno | 
| ![Escenario 2!](/images/escenario2.png) | Fondo con plataformas que incluye una estructura china, con un ambiente nocturno [Sin implementar] | 
| ![Escenario 3!](/images/escenario3.png) | Fondo con plataformas ambientado en una cueva con lava [Sin implementar]| 

### <h2>Gameplay</h2>

#### <h3>Objetivos/dinámicas</h3>
El objetivo del juego es conseguir el mayor número de gemas que aparecen por el mapa mientras se derriba al resto de jugadores en un límite de tiempo determinado.

#### <h3>Progreso del juego</h3>
Antes de comenzar el juego se podrá elegir el modo de juego que se desea jugar, local o en línea (actualmente sólo está disponible el modo local). Una vez seleccionado, se pedirá a los jugadores que elijan un personaje cada uno y un escenario. Seguidamente, se iniciará la partida. Al final esta, se determinará quién ha conseguido una mayor puntuación en función de las gemas recogidas.

### <h2>Mecánicas</h2>

#### <h3>Reglas</h3>
Al comienzo de la partida cada jugador tendrá que elegir un personaje del repertorio. Después podrán elegir en cuál de los 3 escenarios quieren jugar (actualmente sólo se encuentra disponible 1 escenario, Ilumen).
Cada jugador empieza en un punto del mapa diferente y ambos deberán intentar alcanzar las gemas lo antes posible, las cuales indican la puntuación de cada jugador.
Poco después de empezar, aparecerán aleatoriamente armas de distinto tipo en lugares diferentes del mapa, las cuales se utilizarán para atacar al resto pudiendo así adquirir gran parte de las gemas recolectadas.
Si un jugador se queda sin vida, perderá el 3 gemas de las que tenga y las podrá recoger el contrincante.
Las armas de largo alcance tienen un número limitado de disparos, si estos se agotan será necesario recoger un item que recargue las balas.

#### <h3>Items</h3>
A continuación se muestra una tabla con los diferentes items que se pueden recoger durante la partida y sus efectos.

| Items |  |  | 
|:------------:|:-------------:|:-------------:|
| <strong>Imagen</strong>| <strong>Armas</strong> | <strong>Descripción</strong> |
| ![Cuchillo!](/images/knife.png) |  Cuchillo | Rápido pero  hace poco daño.<br> Daño: 3 | 
| ![Pistola!](/images/pistol_icon.png) | Pistola |No es automática.<br> Daño por bala: 10 <br>Cantidad de munición: 10 | 
| <strong>Imagen<strong/> |<strong>Objetos de apoyo</strong> | <strong>Descripción</strong> |
| ![Municion!](/images/Municion.png)|  Municion | Recarga la munición de las escopetas y las metralletas | 
| ![Comida!](/images/fruits.png) |  Comida | Recupera vida | 
| ![Escudo!](/images/escudo.png) | Escudo | Aguanta 10 disparos y luego se rompe |
| ![Trampa!](/images/trampa.png) | Trampa | Stunea al jugador unos segundos [Sin implementar]| 
| ![Boost fuerza!](/images/strenght.png) |  Más daño | Hace que los ataques hagan más daño |
| ![Boost velocidad!](/images/feather.png) | Más velocidad | Hace más veloz al jugador que la coja |
| <strong>Imagen<strong/> |<strong>Objetos recoletables</strong> | <strong>Descripción</strong> |
| ![Gema!](/images/gem.png) | Gema | Objeto que los personajes deben recoger para ganar |

### <h3>Controles</h3>
Los personajes se mueven horizontalmente además de saltar y usar escaleras para acceder a plataformas a las que no llegarían de otra forma. Respecto a atacar y disparar, están limitados a hacerlo hacia los lados, nunca en diagonal ni arriba o abajo.<br>
Todas las acciones que se pueden llevar a cabo se activan mediante el teclado únicamente, no es necesario ningún periférico más allá de un dispositivo de salida para disfrutar del audio incluido.
  
|Input|Acción que se realiza|
|:---:|:-------------------:|
|Jugador 1|
|A|Movimiento lateral izquierda|
|D|Movimiento lateral derecha|
|W|Subir escaleras|
|S|Bajar escaleras y recoger armas|
|Space|Saltar|
|E|Atacar|
|Q|Habilidad especial|
|Enter|Avanzar pantalla, confirmar selección|
|Jugador 2|
|J|Movimiento lateral izquierda|
|L|Movimiento lateral derecha|
|I|Subir escaleras|
|K|Bajar escaleras y recoger armas|
|Shift|Saltar|
|O|Atacar|
|U|Habilidad especial|
|Retroceso|Retroceder pantalla, deshacer selección|

 ### <h2>Flujo de pantallas</h2>
  Este sería las pantallas por las que pasaría el jugador durante su experiencia con el juego.
  
  ![Diagrama de flujo!](/images/DiagramaDeFlujo.png)
  
### <h2>Assets</h2>
<h3> Música </h3>
Se dispondrá de diferentes pistas de música que sigan la misma temática y estilo, rítmica y animada, para las diferentes pantallas del juego:
<ul>
  <li>Pantalla de inicio, selección de arena y jugadores</li>
  <li>Pantalla de victoria/derrota y puntuación</li>
  </ul>
 Aunque los mapas de las diferentes arenas de combate tendrán cada uno su propia pista musical que se adecue a su temática sin dejar de ser rítmica y animada.
<ul>
  <li>Pista de música para ambientar la arena de bosque</li>
  <li>Pista de música para ambientar la arena oriental/agua</li>
  <li>Pista de música para ambientar la arena de fuego/tierra</li>
  </ul>

  <h3>Efectos de sonido</h3>
  El videojuego dispondrá de efectos de sonido cuando se realicen acciones determinadas así como:
  <ul>
    <li>Disparo</li>
    <li>Habilidades especiales</li>
    <li>Recoger un objeto</li>
    <li>Derrota</li>
    <li>Recoger gemas</li>
  </ul>

 
### <h2>Referencias</h2>

Los personajes son de Craftpix <br>
https://free-game-assets.itch.io/free-tiny-hero-sprites-pixel-art

Los objetos de apoyo son de Cheekyinkling <br>
https://cheekyinkling.itch.io/shikashis-fantasy-icons-pack

Los tilesets de los escenarios son de Maytch <br>
https://maytch.itch.io/pixel

El icono de pistola es de MunStudios <br>
https://munstudios.itch.io/2d-pixel-guns-pack

El cuchillo es de antrixglow98 <br>
https://antrixglow98.itch.io/32x32rpgweaponsicons

Fuente utilizada para el logo del juego<br>
https://www.1001freefonts.com/alba.font 
  
Iconos de inputs<br>
https://retrocademedia.itch.io/buttonprompts4



