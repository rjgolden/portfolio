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
                <p class = "indentp"> Feel free to contact me through one of the various sources on the contact page if you are interested in working together or have any questions.</p>
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
 
                      <button type="button" class="ui-panel-link color-btn green" data-color="#1dc71d">
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
                        Custom
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
const walkpointURIProject =`<h1 class="insideh1">
                              Overview
                              <img src="resources/Walkpoint/logo.gif"
                                  style="width: 100px !important; height: 100px !important" background-color: "white">
                            </h1>

  <h3>About project</h3>

  <p class="indentp">
    WalkPointURI is a cross-platform campus navigation application designed to help
    University of Rhode Island students create, save, schedule, and follow personalized
    walking routes around campus. The application includes user authentication,
    persistent cloud data, route creation and editing, interactive maps, external APIs,
    analytics, location services, testing, and support for both web and mobile platforms.
  </p>

  <p class="indentp">
    My primary technical responsibility was designing and developing the custom mapping
    and routing system at the core of the application. Because FlutterFlow could not
    provide the functionality we needed, I created a reusable custom Dart widget that
    extended FlutterFlow and connected the rest of the application to an interactive
    navigation system.
  </p>

  <h3>Languages/Frameworks used</h3>

  <p>
    • Flutter/FlutterFlow<br>
    • Firebase Authentication/Cloud Firestore<br>
    • Firebase Analytics/Performance<br>
    • Flutter Map/OpenStreetMap<br>
    • Mapbox Directions API<br>
    • Weather API<br>
    • Geolocator<br>
    • REST APIs/JSON<br>
    • Git/GitHub
  </p>


  <h1 class="insideh1">
    How it works
    <img src="resources/Walkpoint/flutterFlow.png"
         style="width: 50px !important">
  </h1>

  <h3>Application architecture</h3>

  <p class="indentp">
    Built with Flutter and FlutterFlow, the application separates functionality into
    account, route, map, backend, reusable-component, and custom-code systems.
    Firebase Authentication manages user accounts while Cloud Firestore stores users,
    URI buildings, saved routes, coordinates, schedules, and other persistent data.
    Authenticated routing connects these systems and protects user-specific pages.
  </p>

  <img src="resources/Walkpoint/titleScreen.png"
       style="width: 70% !important; height: 100% !important; margin: 0 auto;">

  <p class="indentp">
    Users can create accounts, select URI buildings, build and name routes, save them
    to their account, assign routes to days of the week, and edit them later.
    Campus building coordinates are stored separately from user-created route data,
    keeping location information reusable while allowing saved routes to reference
    real campus locations.
  </p>

  <div class="imageRow">
    <img src="resources/Walkpoint/routesPage.png">                  
    <img src="resources/Walkpoint/buildingsList.png">
  </div>

  <h3>Custom navigation system</h3>

  <p class="indentp">
    My largest contribution was a custom map widget designed to work in multiple
    contexts. It can operate as an open campus map for direct exploration or accept
    coordinates from another part of the application and automatically display a
    saved route. This allowed one reusable component to support both free map
    navigation and the application's route-management workflow.
  </p>

   
      <img src="resources/Walkpoint/routeView.png"
    style="width: 75%; height: 75%; margin-left: 5em;">    
                  
  <img src="resources/Walkpoint/freeView.png"
      style="width: 75% ; height: 75%; margin-left: 5em; margin-top: 2em">


  <p class="indentp">
    The widget combines asynchronous HTTP requests, JSON parsing, state management,
    geolocation, map controllers, markers, and dynamically generated polylines.
    Route coordinates are sent to the Mapbox Directions API using its walking profile,
    and the returned geometry is converted into points that Flutter Map renders over
    OpenStreetMap data. 
  </p>
  <p class="indentp"> 
    The navigation system handles device-location permissions, current-location
    data, start and destination markers, automatic map positioning, estimated walking
    time, and route distance
  </p>

  <h3>Backend and application integration</h3>

  <p class="indentp">
    Firestore acts as the application's central data layer. Building documents contain
    names and geographic coordinates, while route documents store start and destination
    information, coordinate data, route names, associated users, and selected weekdays.
    User-specific queries pass this information between route-management pages and the
    custom mapping system.
  </p>

  <img src="resources/Walkpoint/firebase.png"
       style="width: 75% !important; height: 75% !important; margin: 0 auto;">

  <h3>Team development and testing</h3>

  <p class="indentp">
    WalkPointURI was developed as a group project using Git and GitHub to coordinate a
    shared codebase. We divided major features between team members, documented meetings,
    and designed independently developed components so they could integrate cleanly.
  </p>

  <img src="resources/Walkpoint/github.png"
       style="width: 75% !important; height: 75% !important; margin: 0 auto;">

  <p class="indentp">
    We also followed a more formal product-development process involving user research, user stories, workflow test cases, A/B testing strategies, 
    HEART product metrics, and automated Flutter integration tests for features such as authentication and account creation. 
    We concluded the project by presenting WalkPointURI as a team at a captsone software showcase where we demonstrated the application and discussed its design, 
    functionality, and development process.
  </p>

  <img src="resources/Walkpoint/group.jpg"
       style="width: 400px !important; height: 250px !important; margin: 0 auto;">


  <h1 class="insideh1">
    <a href="https://walkpointuri.flutterflow.app/" target="popout">
      Click here to try!
    </a>
  </h1>`;

const topDownShooterProject = `<h1 class="insideh1">Overview<img src="resources/Shooter/gem.gif" style="width: 64px !important; height: 64px !important"></h1>
                  <h3> About project </h3>

                  <p class="indentp"> This project is a top-down shooter built in C++ using the raylib game development library. </p>
                  <p class="indentp"> This was my first time delving into game development with C++, so I created the project as a way to learn both the language and the fundamentals of building a game without relying on a traditional game engine. 
                  Throughout development, I gained experience working with a real-time game loop, player input, movement, projectiles, enemies, collision detection, animations, and other core gameplay systems. </p>

                  <h3> Languages/Frameworks used </h3>

                  <p> •C++ <br>
                      •Raylib </p>

                  <h1 class="insideh1"> How it works <img src="resources/Shooter/raylibLogo.png" style="width: 50px !important"></h1>
          
                  <p class="indentp"> This game is built around the traditional 2D game loop. It handles player input, updates gameplay systems, and renders the game world each frame. 
                  I used C++ classes to separate responsibilities between systems such as the player, enemies, camera, animations, particles, and audio. 
                  Delta time keeps movement and other time-based behavior consistent across different frame rates. </p>
                  <img src="resources/Shooter/basicGameplay.gif" style="width: 75% !important; height: 75% !important; margin: 0 auto;">

                  <p class="indentp"> The player system handles movement, directional attacks, dashing, animations, and both keyboard and controller input. 
                  Object-oriented features such as classes, member functions, and encapsulated state helped keep these behaviors organized while allowing the 
                  different gameplay systems to communicate with one another. </p>
                  <img src="resources/Shooter/enemyChase.gif" style="width: 75% !important; height: 75% !important; margin: 0 auto;">

                  <p class="indentp"> The rendering system uses raylib's Camera2D, render textures, and custom lighting to build and display the game world. 
                  Structuring the project across separate classes, namespaces, header files, and source files gave me hands-on experience with C++ project organization 
                  and helped me understand how features such as object-oriented programming and standard containers can be applied to a growing real-time game. </p>
                  <img src="resources/Shooter/particles.gif" style="width: 75% !important; height: 75% !important; margin: 0 auto;">

                  <p class="indentp"> Below you can see some of the art I created for this project using Aseprite. (Enlarged 2x) </p>

                  
                  <img src="resources/Shooter/eyeball-Idle.png" style="width: 384px !important; height: 128px !important; margin: 0 auto;">
                  <img src="resources/Shooter/eyeball-Idle.gif" style="width: 64px !important; height: 128px !important; margin: 0 auto; border: none; box-shadow: 0 0 0px currentColor;">
                  <br>
                  <img src="resources/Shooter/flyEnemy.png" style="width: 288px !important; height: 48px !important; margin: 0 auto;">
                  <img src="resources/Shooter/fly.gif" style="width: 48px !important; height: 48px !important; margin: 0 auto; border: none; box-shadow: 0 0 0px currentColor;">
                  <br>
                  <img src="resources/Shooter/fireSpriteAnimation-export.png" style="width: 384px !important; height: 64px !important; margin: 0 auto;">
                  <img src="resources/Shooter/fireSpriteAnimation.gif" style="width: 64px !important; height: 64px !important; margin: 0 auto; border: none; box-shadow: 0 0 0px currentColor;">
                  <br> <br> <br>

                  <div class="imageRow2">
                     <img src="resources/Shooter/coin_gold.gif" style="width: 64px !important; height: 64px !important; margin-left: 20; border: none; box-shadow: 0 0 0px currentColor;">
                     <img src="resources/Shooter/coin_silver.gif" style="width: 64px !important; height: 64px !important; margin-right: 20; border: none; box-shadow: 0 0 0px currentColor;">
                  </div>
      
                  <div class="imageRow3"> 
                    <img src="resources/Shooter/eyeball-attackRight.gif" 
                        style="width: 64px !important; height: 128px !important; 
                        z-index: 1; 
                        position: relative; 
                        border: none; box-shadow: 0 0 0px currentColor;"> 
                    <img src="resources/Shooter/defaultBeamX.gif" 
                        style="width: 192px !important; height: 64px !important; 
                        margin-left: -5px; 
                        z-index: 2; 
                        position: relative; 
                        border: none; box-shadow: 0 0 0px currentColor;"> 
                  </div>

                  <img src="resources/Shooter/hoodyGuyEnemyAnimationBig.gif" style="width: 128px !important; height: 128px !important; margin: 0 auto; border: none; box-shadow: 0 0 0px currentColor;">
                  <br>
                  
                  <h1 class="insideh1"><a href="https://github.com/rjgolden/raylibTopDownShooter" target="popout">Click here for repo</a></h1>`;

                  //comment
const floppyFishProject = `<h1 class="insideh1">Overview<img src="resources/Floppy/khanLogo.png" style="width: 50px !important; height: 50px !important"></h1>
                  <h3> About project </h3>

                  <p class="indentp"> This project was the first game I programmed. It is a Flappy Bird copycat created in JavaScript using Khan Academy's ProcessingJS environment. </p>
                  <p class="indentp"> I created this game as my final project for an introductory computer science course. 
                  The goal is to control a fish through a series of obstacles, collect coins, progress through levels, and reach the secret winning screen. </p>

                  <h3> Languages/Frameworks used </h3>

                  <p> •JavaScript <br>
                      •ProcessingJS <br>
                      •Khan Academy Programming Environment </p>

                  <h1 class="insideh1"> How it works <img src="resources/Floppy/floppyFish.png" style="width: 100px !important"></h1>

                 <p class="indentp"> The game uses a scene-based system to control the different screens, including the main menu, instructions, game mode selection, gameplay, game over screen, 
                 and winning screen. Buttons are created using a reusable Button object that handles drawing and mouse input. </p>

                  <div class="imageRow">
                    <img src="resources/Floppy/floppyStart.png" style="width: 40%; min-width: 300px; height: 250px;">
                    <img src="resources/Floppy/floppySelect.png" style="width: 40%; min-width: 300px; height: 250px;">
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

                  <p> •JavaScript <br>
                      •p5.js <br>
                      •HTML <br>
                      •CSS </p>

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

                  <p> •JavaScript <br>
                      •Node.js <br>
                      •discord.js <br>
                      •node-cron <br>
                      •Axios <br>
                      •C program for executable </p>

                  <h1 class = "insideh1"> How it works <img src="resources/Wordle/discord.png" style = "width: 50px !important"></h1>

                  <p class = "indentp"> The bot uses discord.js to interact with Discord, node-cron to run on a daily schedule, and Axios to retrieve the Wordle answer from the New York Times.</p>
                  <img src="resources/Wordle/botSetup.png" style= "width: 270px !important; height: 140px !important; margin: 0 auto;"> 
                  <p class = "indentp"> It calculates the previous day's date in Eastern Time, and requests the matching Wordle answer. </p>
                  <img src="resources/Wordle/getWord.png" style= "width: 400px !important; height: 250px !important; margin: 0 auto;"> 
                  <p class = "indentp"> Lastly, after some error handling and admin checks, the bot posts it in the selected channel at midnight. </p>
                  <img src="resources/Wordle/sendMessage.png" style= "width: 400px !important; height: 250px !important; margin: 0 auto;">`;
              
const threadingProject = `<h1 class = "insideh1"> WORK IN PROGRESS </h1>`;

// feed 
const videos = `<h2 class = "insideh1">Cod4-Mw3 Montage</h2>
               <iframe
               src="https://www.youtube.com/embed/-o1ff3gOzzM?si=d5AeNHeJrjjekPSg" 
               title="YouTube video player" 
               allow="accelerometer; autoplay; 
               clipboard-write; encrypted-media; gyroscope; picture-in-picture; 
               web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
               
               <p><br></p>

               <h2 class = "insideh1">Fortnite Montage</h2>
               <iframe
               src="https://www.youtube.com/embed/63cOIeMwWZ0?si=pFMm-FdKVQkiHxqa" 
               title="YouTube video player" 
               allow="accelerometer; autoplay; 
               clipboard-write; encrypted-media; gyroscope; picture-in-picture; 
               web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;

const art = `<p>Second blog post content goes here.</p>`;
const lifts = `<p>Second blog post content goes here.</p>`;

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
    title: "Extras",
    body: ``,
    links: [
      { label: "Videos", content: videos },
      { label: "Art", content: art },
      { label: "Lifts", content: lifts }
    ]
  }
  
];