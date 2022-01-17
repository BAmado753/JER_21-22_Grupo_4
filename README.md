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
| ![Escenario 1!](/images/captura_escenario1.PNG) | Fondo con plataformas cuya temática es el bosque, con un ambiente diurno | 
| ![Escenario 2!](/images/escenario2.png) | Fondo con plataformas con temática de halloween, con un ambiente nocturno| 
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
  
  ### <h2>API REST</h2>
  Esta sería la implementación del API REST.
  
  ![API REST!](/images/APIREST.png)
  
  ### <h2>Diagrama de clases</h2>
  Este sería el diagrama de clases del juego.
  
  ![Diagrama de clases!](/images/DiagramaDeClases.png)
  
### <h2>Pantallas</h2>
  En orden de aparición se comentan las pantalla del juego<br>
  <br>
   ![Pantalla de carga!](/images/pantalla_carga.PNG) <br>
    Al iniciar el proyecto lo primero que aparece es esta pantalla que tras cargar todos los assets permite avanzar <br><br>
   ![Pantalla de inicio!](/images/pantalla_inicio.PNG) <br>
    Primera pantalla del juego como tal, que sirve de introducción de la estética del juego <br><br>
   ![Pantalla de seleccion de inicio!](/images/pantallaSeleccionInicio.png) <br>
    En esta pantalla se puede elegir entre crear un perfil, seleccionar uno existente o empezar el juego sin uno <br><br>
   ![Pantalla de creacion de perfil!](/images/pantallaCrearPerfil.png) <br>
    Si se selecciona crear perfil, se accederá a esta pantalla desde donde se creará un perfil introduciendo un nombre. Posteriormente se pueden ver los datos o ir al menú     principal <br>
  <br>
   ![Pantalla de seleccion ver datos!](/images/pantallaVerDatos.png) <br>
    Aquí se muestran los datos del perfil creado o seleccionado. También se puede modificar el nombre <br><br>
   ![Pantalla de seleccion de perfil!](/images/pantallaElegirPerfil.png) <br>
    En esta pantalla se puede seleccionar un perfil existente <br><br>
   ![Pantalla de menú!](/images/pantallaMenuPrincipal.png) <br>
      Esta pantalla es el hub central que permite acceder a a la ruta de pantallas que llevan al juego y pantallas secundarias. En esta dase se ha cambiado el botón de ajustes por el botón ver datos, que permite consultar los datos del perfil  <br>
 <br>
   ![Pantalla de créditos!](/images/pantalla_creditos.PNG) <br>
     Aquí se acreditan todos los assets que se han utilizado en la creación del juego <br><br>
   ![Pantalla de controles!](/images/pantalla_controles.PNG) <br>
      En esta pantalla se muestran los controles de ambos jugadores en local <br><br>
   ![Pantalla de ayuda!](/images/pantalla_ayuda.PNG) <br>
      Se puede acceder a esta pantalla desde muchas otras mediante el símbolo de interrogación. Aquí se dejan los datos de contacto del equipo por si el jugador necesita ayuda<br>
<br>
   ![Pantalla de conexión!](/images/pantalla_conexion.PNG) <br>
     Aunque actualmente está bloqueado, en esta pantalla se decide si la partida va a ser en conexión local o en online <br><br>

   ![Pantalla de cantidad de jugadores!](/images/pantalla_jugadores.PNG) <br>
      Aquí se selecciona la cantidad de jugadores que van a jugar <br><br>

   ![Pantalla de elección de personajes!](/images/pantalla_personajes.PNG) <br>
      En esta pantalla se seleccionan los personajes que se van a usar en partida. Cuando se pasa el cursor por encima de ellos cada uno muestra su descripción de personaje. <br><br>

   ![Pantalla de personajes elegidos!](/images/pantalla_personajes_elegidos.PNG) <br>
      Esta sería la misma pantalla que la anterior, pero así se ve cuando ambos jugadores han elegido a su personaje. <br><br>

   ![Pantalla de escenario1!](/images/pantalla_escenarios.PNG) <br>
     Tras elegir a los personajes, se elige el escenario donde se va a desarrollar la partida <br><br>

   ![Pantalla de escenario1!](/images/pantallaJuego.png) <br>
     Esta imagen captura un instánte exacto de una partida. Dependiendo del escenario elegido el mapa mostrado en esta pantalla será uno u otro, y en el se desarrollará la partida. Esta pantalla ha sido modificada con respecto a la fase anterior para incluir un botón de pausa <br><br>
  
   ![Pantalla de pausa!](/images/pantallaPausa.png) <br>
     Esta pantalla permite volver al menú principal o volver a la pantalal de juego<br><br>
   
   ![Pantalla de resultados!](/images/pantalla_resultados.PNG) <br>
      Cuando se acaba el tiempo de juego, se muestra la pantalla de resultados que enseña un podio en el que los jugadores están colocados según la cantidad de gemas que posean. En esta pantalla permite una revancha que redirigiría a la pantalla de elección de personaje, o simplemente se puede salir del juego <br><br>

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
Ahora mismo hay música de 8bits implementada en las siguiente pantallas: 
  <ul>
  <li>Pantalla de inicio</li>
  <li>Pantallas de menús</li>
  <li>Pantalla de escenario</li>
  <li>Pantalla de resultados</li>
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
Actualmente los efectos de sonido que hay disponibles en el juego son:
   <ul>
    <li>Recoger gema</li>
    <li>Recoger objetos</li>
    <li>Recoger arma del suelo</li>
    <li>Explosión</li>
    <li>Disparo</li>
    <li>Ataque con cuchillo</li>
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

La animación de explosión es Will's Pixel Explosion<br>
https://untiedgames.itch.io/five-free-pixel-explosions?download
  
La música de fondo es de Abstraction <br>
http://www.abstractionmusic.com/
  
Los efectos de sonido son @Shades<br>
https://opengameart.org/content/8-bit-sound-effect-pack-vol-001
  
Menos el efecto de sonido de la gema que es de Wobblebox<br>
wobbleboxx.com
 
### <h2>Instrucciones </h2>
  1.Instalar Eclipse IDE<br>
  <br> ![Instruccion1!](/images/Ins1.png) <br>
  <br>
  2.Seleccionar Eclipse IDE for Enterprise Java and Web Developments<br>
  <br> ![Instruccion2!](/images/Inst2.png) <br>
  <br>
  3.Abrir Eclipse en el caso de que no se haya abierto tras la instalación<br>
  <br> ![Instruccion3!](/images/inst3.png) <br>
  <br>
  4.Ir a File --> Import --> Existing Maven Projects<br>
  <br> ![Instruccion4!](/images/inst4.png) <br>
  <br> ![Instruccion5!](/images/inst5.png) <br>
  <br>
  5.Poner la ruta donde esté guardada la carpeta descomprimida del juego (TinyTussel)<br>
  <br> ![Instruccion6!](/images/inst6.png) <br>
  <br>
  6.Abrir la carpeta del explorador de archivos y seleccionar TinyTusselApplication.java<br>
  <br> ![Instruccion7!](/images/inst7.png) <br>
  <br>
  7.Hacer click derecho sobre el código --> Run As --> Java Application<br>
  <br> ![Instruccion8!](/images/inst8.png) <br>
  <br>
  8.Una vez se haya ejecutado la parte del servidor, abrir el navegador Google Chrome y poner en la barra de búsqueda localhost:8080<br>
  <br> ![Instruccion9!](/images/inst9.png) <br>
  <br>
