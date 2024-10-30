# ChemClicks

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
<!--
*** [![MIT License][license-shield]][license-url]
*** [![LinkedIn][linkedin-shield]][linkedin-url]
-->


<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="frontend/src/assets/login/ChemClickLogo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">ChemClicks: Interactive Chemistry Learning Website</h3>


<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Code Blue has been tasked with creating a web application designed to facilitate learning of core high school chemistry concepts by serving as an interactive, dynamic, and autonomous learning tool.  The focus is to encourage high school students to learn by creating knowledge rather than just recollecting it. This website will house the curriculum of our client and will be designed with our client's students in mind.

This project is being undertaken by the development team Code Blue, composed of undergraduate students majoring in Computer Science at California State University, Sacramento. Its members consist of Jessica Villanueva, Danica Galang, Isabel Santoyo-Garcia, Anthony Dominguez, Maria Valencia, Marilyn Sarabia, Zhen Zhao, and Oliver Jezildzic.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

We are building this project using React as our frontend framework, Node.js, and MongoDB as our database. We will be writing code in HTML, CSS, Javascript, and Python for the backend.

* [![React][React.js]][React-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites: Installing Node.js and React framework

This is an example of how to list things you need to use the software and how to install them.
* npm and node.js installation on MacOS
  ```sh
  # installs nvm (Node Version Manager)
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
  # download and install Node.js (you may need to restart the terminal)
  nvm install 22
  # verifies the right Node.js version is in the environment
  node -v 
  # verifies the right npm version is in the environment
  npm -v 
  ```
* npm and node.js installation on Windows
  ```sh
  # installs fnm (Fast Node Manager)
  winget install Schniz.fnm
  # configure fnm environment
  fnm env --use-on-cd | Out-String | Invoke-Expression
  # download and install Node.js
  fnm use --install-if-missing 22
  # verifies the right Node.js version is in the environment
  node -v 
  # verifies the right npm version is in the environment
  npm -v 
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/isg28/ChemClick.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
5. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

