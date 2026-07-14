
const project = `<h1 class = "insideh1"> Overview </h1>
                  <h3> About project </h3>
                  <p class = "indentp"> about project </p>
                  <h3> Languages/Frameworks used </h3>
                  <p class = "indentp"> Go into stack </p>

                  <h1 class = "insideh1"> How it works </h1>
                  <h3> Coding method/stack </h3>
                  <p class = "indentp"> methods/how logic works </p>
                  <h3> Showcase </h3>
                  <p class = "indentp"> showcase </p>

                  <h1 class = "insideh1"> Takeaways </h1>
                  <h3> Obstacles overcame </h3>
                  <p class = "indentp"> - </p>
                  <h3> What I learned </h3>
                  <p class = "indentp"> - </p>`;

const project1 = `<h1 class = "insideh1"> Overview </h1>
                  <h3> About project </h3>
                  <p class = "indentp"> about project </p>
                  <h3> Languages/Frameworks used </h3>
                  <p class = "indentp"> Go into stack </p>

                  <h1 class = "insideh1"> How it works </h1>
                  <h3> Coding method/stack </h3>
                  <p class = "indentp"> methods/how logic works </p>
                  <h3> Showcase </h3>
                  <p class = "indentp"> showcase </p>

                  <h1 class = "insideh1"> Takeaways </h1>
                  <h3> Obstacles overcame </h3>
                  <p class = "indentp"> - </p>
                  <h3> What I learned </h3>
                  <p class = "indentp"> - </p>`;

const project2 = `  <h1> h1 </h1>
                    <h2> h2 </h2>
                    <h3> h3 </h3>
                    <img src="/resources/test.png" alt="Resume preview"> <br>
                    <a href='http://www.ryan-golden.com'>ryan-golden.com</a>
                    <p> Spooky. </p>`;

const wordleProject = `<h1 class="insideh1">Overview<img src="resources/wordle.png" style = "width: 100px !important; height: 50px !important"></h1>
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

                  <h1 class = "insideh1"> How it works <img src="resources/discord.png" style = "width: 50px !important"></h1>
                  <h3> Coding method/stack </h3>

                  <p class = "indentp"> The bot uses discord.js to interact with Discord, node-cron to run on a daily schedule, and Axios to retrieve the Wordle answer from the New York Times.</p>
                  <img src="resources/botSetup.png" style= "width: 270px !important; height: 140px !important; margin: 0 auto;"> 
                  <p class = "indentp"> It calculates the previous day's date in Eastern Time, and requests the matching Wordle answer. </p>
                  <img src="resources/getWord.png" style= "width: 400px !important; height: 250px !important; margin: 0 auto;"> 
                  <p class = "indentp"> Lastly, after some error handling and admin checks, the bot posts it in the selected channel at midnight. </p>
                  <img src="resources/sendMessage.png" style= "width: 400px !important; height: 250px !important; margin: 0 auto;"> 

              
                  <h1 class = "insideh1"> Takeaways </h1>
                  <h3> Obstacles overcame </h3>

                  <p class = "indentp"> The most challenging part was calculating the correct previous date. The bot needed to handle month and year boundaries, leap years, Eastern Time, daylight saving time, and daily scheduling.
                                        Implenting this correctly took some time and trial and error. </p>

                  <h3> What I learned </h3>

                  <p class = "indentp"> This project taught me how to work with dates and time zones, make HTTP requests, use scheduled tasks, and manage Discord bot permissions and events.
                                        I also created a small C program that allows the bot to be started with one click. </p>
                  <p class = "indentp"> Overall, the project gave me experience building a practical tool that my friends and I could use every day.</p>`;

const feed1 = `<p>First blog post content goes here.</p>`;
const feed2 = `<p>Second blog post content goes here.</p>`;

const about = `<h2>About Me</h2>

      <p class = "indentp">Welcome to my portfolio! My name is Ryan Golden. I am an aspiring software developer seeking a career coding in C++. I graduated from the University of Rhode Island with a Bachelor of 
      Science in Computer Science. </p>

      <p class = "indentp"> Other than making cool websites, I have a strong interest in game development, which I pursue as a hobby in my free time. I enjoy working with C++ due to its performance and its widespread use 
      in fields that dominate software around the globe. I am particularly interested in systems programming and performance-critical applications. This portfolio is a glimpse at the kind of clean and performant UI/UX I strive for in my projects. </p>

      <h2> Portfolio </h2>
      <p class = "indentp"> This portfolio is based on a combination of both the GameCube and Ps2 startup animations. These were two of my favorite consoles growing up and are the host of the now classic
      games I played in my youth, so I wanted to try to capture the dystopian 2000s futuristic ambiance vibe. The kind of game development that was responsible for these games is also responsible for my interest in game development as a career. </p>`;

const skills = `<h2> My Skills </h2>
                <p><b>Programming Languages:</b> C, C++, Python, Javascript, Typescript, Lua <br><br>
                <b>Frameworks & Libraries:</b> Raylib, Node.js, Three.js, Flutter<br><br>
                <b>Database & Technologies:</b> SQLite, MySQL, Oracle APEX, Google Firebase<br><br>
                <b>Development & Design Tools:</b> Git, Github, GDB, Aseprite, Tiled, Figma, Pico-8<br><br>
                <b> Other: </b> Pixel Art/Animation, UI/UX Design, Level/Map Design, Audio Design <br><br></p>
                <p class = "indentp"> Please feel free to contact me through one of the various sources on the contact page if you are interested in working together or have any questions!</p>`
    
const audioMenu = `
      <label class="audio-control">
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
      </label>`;

  const colorMenu = `
  <div class="ui-panel-links">
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
      { label: "WalkPoint URI", project: project1 },
      { label: "Raylib Shooter", project: project2 },
      { label: "Threading Project (WIP)", project: project2 },
      { label: "Floppy Fish", project: project2 },
      { label: "Pong", project: project2 },
      { label: "Wordle Bot", project: wordleProject }
    ]
  },

  {
    title: "Resume",
    body: `
      <div class="resume-preview">
        <img src="/resources/resume.png" alt="Resume preview">
      </div>
    `,
    links: [
      { label: "Open Resume", url: "/resources/resume.pdf", popout: true }
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
      { label: "Post 1", content: feed1 },
      { label: "Post 2", content: feed2 }
    ]
  }
  
];