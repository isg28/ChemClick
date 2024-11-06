# ChemClicks
<a id="readme-top"></a>
<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->


<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="frontend/src/assets/login/ChemClickLogo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">ChemClicks: An Interactive Chemistry Learning Website</h3>
</div>

<!--TABLE OF CONTENTS-->
## Table of Contents
- [About The Project](#about-the-project)
  -[Built With](#built-with)
- [Getting Started](#-getting-started)
  -[Prerequisites](#-prerequisites-installing-node.js-react-framework-python-and-mongodb)
  -[Installation](#-installation)

<!-- ABOUT THE PROJECT -->
## About The Project

![Screenshot 2024-10-30 at 10 44 34 PM](https://github.com/user-attachments/assets/49fce4f3-5f4c-4dd9-af21-3673bd1b6cf9)


Code Blue has been tasked with creating a web application designed to facilitate learning of core high school chemistry concepts by serving as an interactive, dynamic, and autonomous learning tool.  The focus is to encourage high school students to learn by creating knowledge rather than just recollecting it. This website will house the curriculum of our client and will be designed with our client's students in mind.

This project is being undertaken by the development team Code Blue, composed of undergraduate students majoring in Computer Science at California State University, Sacramento. Its members consist of Jessica Villanueva, Danica Galang, Isabel Santoyo-Garcia, Anthony Dominguez, Maria Valencia, Marilyn Sarabia, Zhen Zhao, and Oliver Jezildzic.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

We are building this project using React as our frontend framework, Node.js, and MongoDB for the database. We will be writing code in HTML, CSS, Javascript, and Python for the backend.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites: Installing Node.js, React framework, Python, and MongoDB

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
* Installing Python

      Make sure you have Python 3.8+ installed. You can download it here: https://www.python.org/downloads/
* MongoDB Setup

      Ensure MongoDB is installed and running. You can download MongoDB here: https://www.mongodb.com/try/download/community


### Installation

1. Clone the repo & change directories
   ```sh
   git clone https://github.com/isg28/ChemClick.git
   cd ChemClick
   ```
2. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```
3. Setup Backend 

    * Change directories into the backend folder
      ```sh
      cd backend
       ```
    
    * create a virtual environment
      ```sh
      python -m venv venv
      source venv/bin/activate  # On Windows, use: venv\Scripts\activate
       ```
      
    * Install Django and other packages
      ```sh
      pip install django djangorestframework django-cors-headers mongoengine pymongo python-dotenv
      ```
    * Start the backend servers
      ```sh
      python manage.py runserver
      ```
4. Setup Frontend
   * Open a new terminal & change directories into frontend folder 
       ```sh
       cd frontend
       ```
   * Install NPM packages
       ```sh
       npm install
       ```
   * Run the frontend server
       ```sh
       npm start
       ```
5. Access the Application
   * Open your browser and access the web application at http://localhost:3000/

### Running Locally
  1. Clone the project
    ```sh
    git clone https://github.com/isg28/ChemClick.git
    cd ChemClick
    ```
  2. Set up backend
    * Change directories into backend folder
      ```sh
        cd backend
      ```
    * Install necessary packages and libraries
      ```sh
        pip install django djangorestframework django-cors-headers mongoengine pymongo python-dotenv
      ```
    * Run backend
      ```sh
        python manage.py runserver
      ```
  3. Set up frontend
    * Change directories into frontend folder
      ```sh
        cd frontend
      ```
    * Install necessary packages and libraries for frontend
      ```sh
        npm install
      ```
    * Start up frontend server
      ```sh
      npm start
      ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Deployment

<!--TESTING -->
## Running Tests
To be continued in CSC191
<p align="right">(<a href="#readme-top">back to top</a>)</p>


