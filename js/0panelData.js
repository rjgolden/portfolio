
const project1 = `<p>Projects go here.</p>`;
const project2 = `<p>Second project content goes here. </p>
                    <h1> h1 </h1>
                    <h2> h2 </h2>
                    <h3> h3 </h3>
                    <img src="/resources/test.png" alt="Resume preview"> <br>
                    <a href='http://www.ryan-golden.com'>ryan-golden.com</a>
                    <p> Spooky. </p>`;
const project3 = `<p>Third project content goes here.</p>`;

const feed1 = `<p>First blog post content goes here.</p>`;
const feed2 = `<p>Second blog post content goes here.</p>`;

const about = `<p>Welcome to my portfolio! My name is Ryan Golden. I am an aspiring software developer seeking a career coding in C++. I graduated from the University of Rhode Island with a Bachelor of 
      Science in Computer Science. </p>

      <p> This portfolio is based on a combination of both the GameCube and Ps2 startup animations. These were two of my favorite consoles growing up and are the host of the now classic
      games I played in my youth, so I wanted to try to capture the distopian 2000s futuristic ambiance vibe. The kind of game development that was responsible for these games is also resposible for my interest in game development as a career. </p>

      <p> Other than making cool websites, I have a strong interest in game development, which I pursue as a hobby in my free time. I enjoy working with C++ due to its performance and its widespread use 
      in fields that dominate software around the globe. I am particularly interested in systems programming and performance-critical applications. This portfolio is a glimpse at the kind of clean and performant UI/UX I will be focused on for my projects. </p>
      <p> Please feel free to contact me through one of the various sources on the contact page if you are interested in working together or have any questions! </p>`;

const skills = `<p>•Programming Languages: C, C++, Python, Javascript, Typescript, Lua <br><br>
                   •Frameworks & Libraries: Raylib, Node.js, Three.js, Flutter<br><br>
                   •Database & Technologies: SQLite, MySQL, Oracle APEX, Google Firebase<br><br>
                   •Development & Design Tools: Git, Github, GDB, Aseprite, Tiled, Figma, Pico-8<br><br></p>`
    
const panelData = [
  {
    title: "About",
    body: ``,
    links: [
      { label: "About Me", project: about },
      { label: "My Skills", project: skills }
    ]
  },

  {
    title: "Extra",
    body: ``,
    links: []
  },

  {
    title: "Projects",
    body: ``,
    links: [
      { label: "WalkPoint URI", project: project1 },
      { label: "Raylib Shooter", project: project2 },
      { label: "Inklings Project", project: project3 },
      { label: "Floppy Fish", project: project3 },
      { label: "Pong", project: project3 },
      { label: "Wordle Bot", project: project3 }
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
      { label: "Email", url: "mailto:ryanjgolden00@gmail.com", popout: true },
      { label: "GitHub", url: "https://github.com/rjgolden", popout: true },
      { label: "LinkedIn", url: "https://linkedin.com/in/ryangoldencs", popout: true },
      { label: "LeetCode", url: "https://leetcode.com/ryanjgolden", popout: true },
      { label: "Instagram", url: "https://instagram.com/ryan.golden00", popout: true }
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