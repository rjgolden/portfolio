// about
const about = `<h2>About Me</h2>

              <p class = "indentp">Welcome to my portfolio! My name is Ryan Golden. I am an aspiring software developer seeking a career programming in C++. 
              I graduated from the University of Rhode Island with a Bachelor of 
              Science in Computer Science. I also have a strong interest in game development. </p>

              

              <h2> Portfolio </h2>
              <p class = "indentp"> This portfolio is based on a combination of both the GameCube and Ps2 startup animations. 
              These are two of my favorite consoles and are the host of many games I played growing up, which makes them responsible for my love of gaming and game
              development. </p>`;

const skills = `<h2> My Skills </h2>
                <p><b>Programming Languages:</b> C, C++ (17,20), Python, Javascript, Typescript, Lua <br><br>
                <b>Frameworks & Libraries:</b> Raylib, Node.js, Three.js, Flutter<br><br>
                <b>Database & Technologies:</b> SQLite, MySQL, Oracle APEX, Google Firebase<br><br>
                <b>Development & Design Tools:</b> Git, Github, GDB, Aseprite, Tiled, Figma, Pico-8<br><br>
                <b> Other: </b> Pixel Art/Animation, UI/UX Design, Level/Map Design, Audio Design <br><br></p>
                <p class = "indentp"> Please feel free to contact me through one of the various sources on the contact page if you are interested in working together or have any questions.</p>
                <p class = "indentp"> <em> Check out the settings menu for different colors and background music! </em></p>`
    
// settings 
const audioMenu = `<label class="audio-control">
                    SFX
                    <input id="settings-sfx-volume" type="range" min="0" max="100" step="1" value="35">
                   </label>

                  <label class="audio-control">
                    Music
                    <input id="settings-music-volume" type="range" min="0" max="100" step="1" value="25">
                  </label>

                  <label class="audio-mute-row">
                    <input id="settings-mute-all-audio" type="checkbox">
                    Mute All
                  </label>
                  
                    <div class="music-selector">
                    <span class="music-selector-title">Background Music</span>

                    <div class="music-selector-controls">
                      <button
                        id="settings-music-prev"
                        class="music-selector-arrow"
                        type="button"
                        aria-label="Previous song"
                      >
                        ←
                      </button>

                      <span
                        id="settings-music-track"
                        class="music-selector-track"
                        aria-live="polite"
                      >
                        Background Music
                      </span>

                      <button
                        id="settings-music-next"
                        class="music-selector-arrow"
                        type="button"
                        aria-label="Next song"
                      >
                        →
                      </button>
                    </div>
                  </div>`;

  const colorMenu = ` <div class="ui-panel-links">
                      <button type="button" class="ui-panel-link color-btn amber" data-color="#FFB000">
                        Terminal Amber
                      </button>
 
                      <button type="button" class="ui-panel-link color-btn green" data-color="#33FF33">
                        Terminal Green
                      </button>

                      <button type="button" class="ui-panel-link color-btn purple" data-color="#a459ff">
                        GameCube Purple
                      </button>

                      <button type="button" class="ui-panel-link color-btn blue" data-color="#0f8fff">
                        PS2 Blue
                      </button>

                      <button type="button" class="ui-panel-link color-btn white" data-color="#e7e7e7">
                        Wii White
                      </button>

                      <button type="button" class="ui-panel-link color-btn red" data-color="#ff2929">
                        Gamesphere Red
                      </button>

                      <label for="settings-color-picker" class="ui-panel-link color-btn picker">
                        Color Picker
                      </label>

                      <input
                        id="settings-color-picker"
                        type="color"
                        value="#ffb000"
                      >

                      <button type="button"  class="ui-panel-link color-btn rainbow">
                        Rainbow
                      </button>
                    </div>`;

// projects
const walkpointURIProject = `<h1 class="insideh1">Overview<img src="resources/walkpoint.png" style="width: 100px !important; height: 50px !important"></h1> <h3> About project </h3>

              <p class="indentp"> WalkPointURI is a cross-platform campus navigation application designed to help students at the University of Rhode Island create, save, and 
              follow personalized walking routes between locations around campus. </p>

              <p class="indentp"> This project is a complete system with user authentication, persistent cloud data, route creation and editing, scheduled routes, interactive maps, external APIs, 
              analytics, location services, testing, and multiple interconnected pages. It was also deployed as a working web application while retaining Flutter support for mobile platforms. </p>

              <p class="indentp"> My primary technical responsibility was designing and developing the custom mapping and routing system that powered the application's 
              core functionality. FlutterFlow itself could not provide the functionality we needed, so I wrote a custom Dart widget that extended FlutterFlow and provided 
              the application with the mapping functionality that the rest of the project could build around. </p>

              <h3> Languages/Frameworks used </h3>

              <p> -Dart <br>
                  -Flutter <br>
                  -FlutterFlow <br>
                  -Firebase Authentication <br>
                  -Cloud Firestore <br>
                  -Firebase Analytics/Performance <br>
                  -Flutter Map <br>
                  -OpenStreetMap <br>
                  -Mapbox Directions API <br>
                  -Weather API <br>
                  -Geolocator <br>
                  -REST APIs/JSON <br>
                  -Git/GitHub </p>

              <h1 class="insideh1"> How it works <img src="resources/walkpointMap.png" style="width: 50px !important"></h1>
              <h3> Application architecture </h3>

              <p class="indentp"> Built with Flutter and FlutterFlow, this application separates its functionality into account, route, map, backend, reusable component, 
              and custom-code systems. Firebase Authentication manages user accounts while Cloud Firestore stores application data such as users, URI buildings, and saved routes. 
              Authenticated routing is used to protect application pages and move data between different parts of the app. </p>
              <img src="resources/walkpointApp.png" style="width: 400px !important; height: 250px !important; margin: 0 auto;">

              <p class="indentp"> Users can create an account, build routes between URI buildings, name and save those routes, assign them to days of the week, edit them later, 
              and view routes associated with their account. Building coordinates are stored separately from user-created route data, allowing saved routes to reference real campus 
              locations while keeping the underlying data organized and reusable. </p>
              <img src="resources/walkpointRoutes.png" style="width: 400px !important; height: 250px !important; margin: 0 auto;">

              <h3> Custom navigation system </h3>

              <p class="indentp"> My largest contribution was the custom map widget that connected the application's route data to an interactive navigation system. 
              I designed the widget to operate in multiple contexts: it can function as an open campus map where users interact directly with locations, or accept coordinates
               supplied by another part of the application and automatically display a previously created route. Designing it this way allowed one reusable component to support 
               both free map exploration and the application's saved-route workflow. </p>
              <img src="resources/walkpointMapWidget.png" style="width: 400px !important; height: 250px !important; margin: 0 auto;">

              <p class="indentp"> The widget combines several Dart and Flutter systems including asynchronous HTTP requests, JSON parsing, state management, geolocation, 
              map controllers, markers, and dynamically generated polylines. When a route is requested, the system sends the selected coordinates to the Mapbox Directions 
              API using its walking profile, processes the returned route geometry, and converts it into points that Flutter Map can render over OpenStreetMap data. </p>
              <img src="resources/walkpointRouteCode.png" style="width: 400px !important; height: 250px !important; margin: 0 auto;">

              <p class="indentp"> The navigation system also handles device location permissions and current-location data, automatically positions the map around a 
              generated route, displays start and destination markers, and calculates useful route information such as estimated walking time and distance. 
              This required combining multiple third-party packages and services behind a single interface that could be used by the rest of the application without needing to 
              understand the underlying routing logic. </p>
              <img src="resources/walkpointNavigation.png" style="width: 400px !important; height: 250px !important; margin: 0 auto;">

              <h3> Backend and application integration </h3>

              <p class="indentp"> Firestore acts as the central data layer connecting the application's features. Campus buildings store names and geographic coordinates, 
              while routes store their start and destination information, coordinate data, route name, associated user, and selected weekdays. 
              The application queries this data based on the authenticated user and passes the necessary information between the route-management pages and my custom map system. </p>
              <img src="resources/walkpointFirebase.png" style="width: 400px !important; height: 250px !important; margin: 0 auto;">

              <p class="indentp"> Custom Dart actions were also used alongside FlutterFlow's generated code to work with Firestore documents and references where the 
              visual development environment alone was not enough. This combination allowed us to use FlutterFlow for rapid interface development while still 
              writing custom code for the more complex application logic and integrations. </p>
              <img src="resources/walkpointBackend.png" style="width: 400px !important; height: 250px !important; margin: 0 auto;">

              <h3> Additional systems </h3>

              <p class="indentp"> Beyond navigation, the application integrates additional campus-focused services and application infrastructure. 
              REST APIs are used to retrieve information such as the current date and URI-area weather, while the application also includes RIPTA transportation information. 
              Firebase services provide authentication, analytics, performance monitoring, storage capabilities, and persistent application data. </p>
              <img src="resources/walkpointFeatures.png" style="width: 400px !important; height: 250px !important; margin: 0 auto;">

              <h3> Team development and testing </h3>

              <p class="indentp"> Because WalkPointURI was developed as a group project, development involved coordinating a much larger shared codebase than my previous work. 
              We used Git and GitHub to manage changes and maintain the project, documented team meetings throughout development, divided larger features between team members, 
              and designed our components so independently developed systems could integrate with one another. </p>
              <img src="resources/walkpointTeam.png" style="width: 400px !important; height: 250px !important; margin: 0 auto;">

              <p class="indentp"> The project also incorporated a more formal product-development process. Our team conducted user research to validate the usefulness of 
              personalized campus routes, developed user stories and test cases for major workflows, explored A/B testing strategies, defined product metrics using the HEART framework, 
              and created automated Flutter integration tests for workflows such as authentication and account creation. This gave me experience working on software as both an 
              engineering project and a product intended for real users. </p>
              <img src="resources/walkpointTesting.png" style="width: 400px !important; height: 250px !important; margin: 0 auto;">
              
              <h1 class="insideh1"><a href="https://walkpointuri.flutterflow.app/" target="popout">Click here to try</a></h1>`;

const topDownShooterProject = `<h1 class="insideh1">Overview<img src="resources/raylibShooter.png" style="width: 100px !important; height: 50px !important"></h1>
                  <h3> About project </h3>

                  <p class="indentp"> This project is a top-down shooter built in C++ using the raylib game development library. </p>
                  <p class="indentp"> This was my first time delving into game development with C++, so I created the project as a way to learn both the language and the fundamentals of building a game without relying on a traditional game engine. 
                  Throughout development, I gained experience working with a real-time game loop, player input, movement, projectiles, enemies, collision detection, animations, and other core gameplay systems. </p>

                  <h3> Languages/Frameworks used </h3>

                  <p> -C++ <br>
                      -Raylib </p>

                  <h1 class="insideh1"> How it works <img src="resources/raylib.png" style="width: 50px !important"></h1>
          
                  <p class="indentp"> This game is built around the traditional 2D game loop. It handles player input, updates gameplay systems, and renders the game world each frame. 
                  I used C++ classes to separate responsibilities between systems such as the player, enemies, camera, animations, particles, and audio. 
                  Delta time keeps movement and other time-based behavior consistent across different frame rates. </p>
                  <img src="resources/shooterGameLoop.png" style="width: 400px !important; height: 250px !important; margin: 0 auto;">

                  <p class="indentp"> The player system handles movement, directional attacks, dashing, animations, and both keyboard and controller input. 
                  Object-oriented features such as classes, member functions, and encapsulated state helped keep these behaviors organized while allowing the 
                  different gameplay systems to communicate with one another. </p>
                  <img src="resources/shooterPlayer.png" style="width: 400px !important; height: 250px !important; margin: 0 auto;">

                  <p class="indentp"> The project also includes enemy, collision, health, particle, and sound systems that interact during gameplay. 
                  C++ containers such as vectors are used to manage groups of game objects, while reusable classes and functions allow enemies, effects, 
                  and other entities to be updated and processed efficiently within the game loop. </p>
                  <img src="resources/shooterCombat.png" style="width: 400px !important; height: 250px !important; margin: 0 auto;">

                  <p class="indentp"> The rendering system uses raylib's Camera2D, render textures, and custom lighting to build and display the game world. 
                  Structuring the project across separate classes, namespaces, header files, and source files gave me hands-on experience with C++ project organization 
                  and helped me understand how features such as object-oriented programming and standard containers can be applied to a growing real-time game. </p>
                  <img src="resources/shooterRendering.png" style="width: 400px !important; height: 250px !important; margin: 0 auto;">

                  <p class="indentp"> The art was all created by me using Asprite. I am not a traditional artist, so exploring this medium was completely new and intruiging to me. 
                  Below you can see some of the art I created for this project. </p>
                  <img src="resources/pyramidAnimation.png" style="width: 400px !important; height: 250px !important; margin: 0 auto;">
                  
                  <h1 class="insideh1"><a href="https://github.com/rjgolden/raylibTopDownShooter" target="popout">Click here for repo</a></h1>`;

const floppyFishProject = `<h1 class="insideh1">Overview<img src="resources/Floppy/khanLogo.png" style="width: 50px !important; height: 50px !important"></h1>
                  <h3> About project </h3>

                  <p class="indentp"> This project was the first game I programmed. It is a Flappy Bird-inspired game created in JavaScript using Khan Academy's ProcessingJS environment. </p>
                  <p class="indentp"> I created this game as my final project for an introductory computer science course. 
                  The goal is to control a fish through a series of obstacles, collect coins, progress through levels, and reach the secret winning screen. </p>

                  <h3> Languages/Frameworks used </h3>

                  <p> -JavaScript <br>
                      -ProcessingJS <br>
                      -Khan Academy Programming Environment </p>

                  <h1 class="insideh1"> How it works <img src="resources/Floppy/floppyFish.png" style="width: 100px !important"></h1>

                 <p class="indentp"> The game uses a scene-based system to control the different screens, including the main menu, instructions, game mode selection, gameplay, game over screen, 
                 and winning screen. Buttons are created using a reusable Button object that handles drawing and mouse input. </p>

                  <div class="imageRow">
                    <img src="resources/Floppy/floppyStart.png" style="width: 40%; min-width: 300px; height: 250px;">
                    <img src="resources/Floppy/FloppySelect.png" style="width: 40%; min-width: 300px; height: 250px;">
                  </div>

                  <p class="indentp"> The player controls the fish using the spacebar. The fish continuously falls toward the ground, while pressing or holding the spacebar moves it upward. Easy and Hard modes change the movement speed of the fish and obstacles. </p>
                  

                  <p class="indentp"> Just like flappy bird, obstacles and collectibles are generated as objects and moved across the screen during the main game loop. Collision detection checks the fish's hitbox against obstacles, while collecting a coin increases the player's score. </p>
                  <img src="resources/Floppy/floppyFish.gif" style="width: 400px !important; height: 250px !important; margin: 0 auto;">
                  
                  <h1 class="insideh1"><a href="https://www.khanacademy.org/computer-programming/ryan-golden-final-project/5399784995635200" target="popout">Click here to play!</a></h1>`;

const pongProject = `<h1 class="insideh1">Overview<img src="resources/Pong/pongLogo.png" style="width: 100px !important; height: 50px !important"></h1>
                  <h3> About project </h3>
                  
                  <p class="indentp"> Inspired by the game that started it all, this project is a recreation of the classic Pong game built using JavaScript and p5.js. </p>
                  <p class="indentp"> I created the game to practice working with real-time game loops, player input, collision detection, and basic game physics.  </p>

                  <div class="imageRow">
                    <img src="resources/Pong/pongStart.png" style="width: 40%; min-width: 300px; height: 250px;">
                    <img src="resources/Pong/pongClassic.png" style="width: 40%; min-width: 300px; height: 250px;">
                  </div>

                  <h3> Languages/Frameworks used </h3>

                  <p> -JavaScript <br>
                      -p5.js <br>
                      -HTML <br>
                      -CSS </p>

                  <h1 class="insideh1"> How it works </h1>
                
                  <p class="indentp"> The game uses p5.js to create the canvas, render the paddles and ball, and continuously update the game through the draw loop.
                  It allows for two players to control paddles and compete against each other while keeping track of each player's score. I also designed some CPU behavior and implemented a single player version.</p>
                  <img src="resources/Pong/pong.gif" style="width: 400px !important; height: 250px !important; margin: 0 auto;">`;

const wordleProject = `<h1 class="insideh1">Overview<img src="resources/Wordle/wordle.png" style = "width: 100px !important; height: 50px !important"></h1>
                  <h3> About project </h3>

                  <p class = "indentp"> This project is a Discord bot that posts the previous day's Wordle answer in a designated text channel. </p>
                  <p class = "indentp"> My friends and I already shared our daily Wordle results in Discord, but there was no easy way to see the correct answer when looking back through older messages. 
                                        I decided to create a bot that would automatically post the answer every night at midnight. </p>

                  <h3> Languages/Frameworks used </h3>

                  <p> -JavaScript <br>
                      -Node.js <br>
                      -discord.js <br>
                      -node-cron <br>
                      -Axios <br>
                      -C program for executable </p>

                  <h1 class = "insideh1"> How it works <img src="resources/Wordle/discord.png" style = "width: 50px !important"></h1>

                  <p class = "indentp"> The bot uses discord.js to interact with Discord, node-cron to run on a daily schedule, and Axios to retrieve the Wordle answer from the New York Times.</p>
                  <img src="resources/Wordle/botSetup.png" style= "width: 270px !important; height: 140px !important; margin: 0 auto;"> 
                  <p class = "indentp"> It calculates the previous day's date in Eastern Time, and requests the matching Wordle answer. </p>
                  <img src="resources/Wordle/getWord.png" style= "width: 400px !important; height: 250px !important; margin: 0 auto;"> 
                  <p class = "indentp"> Lastly, after some error handling and admin checks, the bot posts it in the selected channel at midnight. </p>
                  <img src="resources/Wordle/sendMessage.png" style= "width: 400px !important; height: 250px !important; margin: 0 auto;">`;
              
const threadingProject = `<h1 class = "insideh1"> UNDER CONSTRUCTION </h1>`;

// feed 
const feed1 = `<h1 class = "insideh1">Cod4-Mw3 Montage</h1>
               <iframe width="100%" height="315" 
               src="https://www.youtube.com/embed/-o1ff3gOzzM?si=d5AeNHeJrjjekPSg" 
               title="YouTube video player" 
               frameborder="0" allow="accelerometer; autoplay; 
               clipboard-write; encrypted-media; gyroscope; picture-in-picture; 
               web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
               
               <p><br></p>

               <h1 class = "insideh1">Fortnite Montage</h1>
               <iframe width="100%" height="315" 
               src="https://www.youtube.com/embed/63cOIeMwWZ0?si=pFMm-FdKVQkiHxqa" 
               title="YouTube video player" 
               frameborder="0" allow="accelerometer; autoplay; 
               clipboard-write; encrypted-media; gyroscope; picture-in-picture; 
               web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;

const feed2 = `<p>Second blog post content goes here.</p>`;
const feed3 = `<p>Second blog post content goes here.</p>`;

// panels
const panelData = [
  {
    title: "About",
    body: about + skills,
    links: []
  },

  {
    title: "Settings",
    body: "",
    links: [ 
      { label: "Audio Menu", project: audioMenu },
      { label: "Color Menu", project: colorMenu },
      { label: "Toggle Light/Dark Mode", action: "toggleTheme" }
    ]
  },

  {
    title: "Projects",
    body: ``,
    links: [
      { label: "WalkPoint URI", project: walkpointURIProject },
      { label: "Raylib Shooter", project: topDownShooterProject },
      { label: "Floppy Fish", project: floppyFishProject },
      { label: "Pong", project: pongProject },
      { label: "Wordle Bot", project: wordleProject },
      { label: "C++ Threads", project: threadingProject }
    ]
  },

  {
    title: "Resume",
    body: `
      <div class="resume-preview">
        <img src="/resources/Resume/resume.png" alt="Resume preview">
      </div>
    `,
    links: [
      { label: "Open Resume", url: "/resources/Resume/resume.pdf", popout: true }
    ]
  },

  {
    title: "Contact",
    body: ``,
    links: [
      { label: "GitHub", url: "https://github.com/rjgolden", popout: true },
      { label: "LinkedIn", url: "https://linkedin.com/in/ryangoldencs", popout: true },
      { label: "LeetCode", url: "https://leetcode.com/ryanjgolden", popout: true },
      { label: "Instagram", url: "https://instagram.com/ryan.golden00", popout: true },
      { label: "Email", url: "mailto:ryanjgolden00@gmail.com", popout: true, }
    ]
  },

  {
    title: "Feed",
    body: ``,
    links: [
      { label: "Videos", content: feed1 },
      { label: "Art", content: feed2 },
      { label: "Lifts", content: feed3 }
    ]
  }
  
];