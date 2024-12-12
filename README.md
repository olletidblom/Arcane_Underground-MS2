# Project Title
*Arcane-Underground*

![Mockup image](assets/images/readme/mockup/mockup.png)

[Live webpage](https://olletidblom.github.io/Arcane_Underground-MS2/)
---


## Introduction

Arcane Underground is a stategy game where to goal is to score more points than the oponents. 


---


## Table of Content

1. [Project Goals](#project-goals)
    1. [User Goals](#user-goals)
    2. [Site Owner Goals](#site-owner-goals)
2. [User Experience](#user-experience)
    1. [Target Audience](#target-audience)
    2. [User Requirements and Expectations](#user-requirements-and-expectations)
    3. [User Stories](#user-stories)
    4. [Site Owner Stories](#site-owner-stories)
3. [Design](#design)
    1. [Design Choices](#design-choices)
    2. [Colour](#colours)
    3. [Fonts](#fonts)
    4. [Structure](#structure)
    5. [Wireframes](#wireframes)
4. [Technologies Used](#technologies-used)
    1. [Languages](#languages)
    2. [Frameworks & Tools](#frameworks-&-tools)
5. [Features](#features)
6. [Testing](#validation)
    1. [HTML Validation](#HTML-validation)
    2. [CSS Validation](#CSS-validation)
    3. [JavaScript Validation](#javascript-validation)
    4. [Accessibility](#accessibility)
    5. [Performance](#performance)
    6. [Device testing](#performing-tests-on-various-devices)
    7. [Browser compatibility](#browser-compatability)
    8. [Testing user stories](#testing-user-stories)
8. [Bugs](#Bugs)
9. [Deployment](#deployment)
    1. [EmailJS API](#emailjs-api)
10. [Credits](#credits)
11. [Acknowledgments](#acknowledgments)

## Project Goals 

Arcane Underground is a game based on the boardgame "Kingdoms" by Reiner Knizias, but with new visuals. 
Its a game for 2-4 players, and can be played either with friends or alone.


### User Goals
 - Playing a fun game that is easy to learn, but hard to master.
 - Test your skills in the game by beating bots.

 
### Site Owner Goals
- Creating a fun and eyecatching game that can be played over and over again.
- The game should be responsive and playeble on any device.

## User Experience

### Target Audience
- Both casual and advanced gamers.
- People who likes strategic games.

### User Requrements and Expectations
- Easy to navigate website.
- A clear "How to play" guide.
- Links and functions that work as expected.
- Responsivness so the site looks good no matter what device the user is useing.
- An easy way to contact the bussines.

### User Stories
1. As a user, i want to be able to choose amount of players in the game.
2. As a user, i want to be able to choose between playing a bot or playing with friends. 
3. As a user, i want to be able to learn how to play the game. 
4. As a user, i want to be able to see my score and the oponents score. 
5. As a user, i want to see who won the game. 


#### Site Owner 
6. As the site owner, want users to be able to contact us for feedback.
7. As the site owner, i want players to be able to learn and progress their game logic.
8. As the site owner, if someone gets a 404 i want it to be easy to get back to the main page.

## Design

### Design Choices
The design of the game is inspired by the underground in netflixes serie "Arcane", with vibrant colours and powerful characters.

### Color
The colors of the games are mostly based around green and purple for the overall feeling to get that arcane feeling. Other elemements and colors are used for contrast to that.
<br>


### Fonts
I used "Jaro" as font because i felt that it fitted the feeling of the game.


### Structure
With the minimalistic design you quickly find your way around with
a recogniseble interface.
- The website consists of one homepage with 4 diffrent views: 
    - Startscreen that showss the logo of the game, and two choices to move to either player setup or how to play. 
    - How to play section where you can learn how to play the game 
    - Player setup section where you choose amount of players, then assign name, color and if player is bot or not. 
    - Main game section where the game is played. 

- A 404 page


### Wireframes

<details><summary>Start Screen</summary>
<img src="assets/images/readme/wireframes/startScreen.png">
</details>
<details><summary>Player Form</summary>
<img src="assets/images/readme/wireframes/playerForm.png">
</details>
<details><summary>Player Info</summary>
<img src="assets/images/readme/wireframes/playerInfo.png">
</details>
<details><summary>Game Board</summary>
<img src="assets/images/readme/wireframes/gameboard.png">
</details>

## Technologies Used

### Languages
- HTML
- CSS
- JavaScript

### Frameworks & Tools
- Git
- GitHub
- Gitpod
- Balsamiq
- Google Fonts
- JShint
- Lighthouse
- Bootstrap V.5
- W3C Markup validation service
- W3C Jigsaw CSS validation service 
- WAVE WebAIM web accessibility evaluation tool

## Features
The page consists of 2 pages and fourteen features

### Start Screen
- Consists of the logo
- Allows users to easily start a game or learn how to play.
- Features the footer with info and contact form.
- User story 3, 6
<details><summary>Start Screen</summary>
<img src="assets/images/readme/website/startpage.png">
</details>

### Footer
- Shows info about the creator. 
- Contains a contact form where people can send in suggestions and feedback.
- User story 6
<details><summary>Footer</summary>
<img src="assets/images/readme/website/footer.png">
</details>


### Contact Form
- Allows the user get in touch with the company

- User story 6, 
<details><summary>Contact Form</summary>
<img src="assets/images/readme/website/contactform.png">
</details>

 
### Player Amount
- Lets the user choose how many players should be in the game
- User story 1
<details><summary>Player Amount</summary>
<img src="assets/images/readme/website/playeramount.png">
</details>


### Player info
- Allows the user assign names and colors to players.
- Allows the user to choose if player should be bot or not.
- User story 2
<details><summary>Player Info</summary>
<img src="assets/images/readme/website/playernames.png">
</details>


### Main Game
- Allows the user to play the game.
- Shows total score and round score. 
- Shows players turn. 
- Buttons to select cards and castles
- Shows winner when game is over
- User Stories 4, 5 , 7 
<details><summary>Main Game</summary>
<img src="assets/images/readme/website/maingame.png">
</details>



### Card Board
- Allows user to choose between randomly placed cards.

<details><summary>Card Board</summary>
<img src="assets/images/readme/website/cardboard.png">
</details>


### Castle Board
- Allows user to choose a castle to place. 
- Shows user how many castle of each type they have left
<details><summary>Castle Board</summary>
<img src="assets/images/readme/website/castleboard.png">
</details>


### 404page
- If something foes wrong its an easy way back to the mainpage.
- User story 8
<details><summary>404</summary>
<img src="assets/images/readme/website/404.png">
</details>

## Validation

### HTML Validation
The W3C Markup Validation Service was used to validate the HTML of the website. All pages pass with no errors no warnings to show.
<details><summary>Main</summary>
<img src="assets/images/readme/validation/html/main.png">
</details>
<details><summary>404</summary>
<img src="assets/images/readme/validation/html/404.png">
</details>


### CSS Validation
The W3C Jigsaw CSS Validation Service was used to validate the CSS of the website.
The style.css file was approved with just a few warnings.
<details><summary>style.css</summary>
<img src="assets/images/readme/validation/css/link.png">
</details>

### Accessibility
The WAVE WebAIM web accessibility evaluation tool was used to ensure the website met high accessibility standards. All pages pass with 0 errors.
<details><summary>Main</summary>
<img src="assets/images/readme/validation/accessibility/main..png">
</details>
<details><summary>404</summary>
<img src="assets/images/readme/validation/accessibility/404.png">
</details>


### Performance 
Google Lighthouse in Google Chrome Developer Tools was used to test the performance of the website. 

<details><summary>Main</summary>
<img src="assets/images/readme/validation/lighthouse/lighthouse.png">
</details>
<details><summary>404</summary>
<img src="assets/images/readme/validation/lighthouse/404.png">
</details>

### JavaScript Validation
JSHint Static Code Analysis Tool for JavaScript was used to validate all the Javascript files in my js folder. No issues were found.
<details><summary>js</summary>
<img src="assets/images/readme/validation/js/jshint.png">
</details>
 


### Browser compatability
The website was tested on the following browsers:
- Google Chrome
- Safari

### Testing user stories

1. As a user, i want to be able to choose amount of players in the game.

| **Feature** | **Action** | **Expected Result** | **Actual Result** |
|-------------|------------|---------------------|-------------------|
| Player Amount| Press the Start Game button on start screen. | Allows user to choose amount of players | Works as expected |

<details><summary>Screenshots</summary>
<img src="assets/images/readme/userStories/1.1.png">
<img src="aassets/images/readme/userStories/1.2.png">

</details>


2. As a user, i want to be able to choose between playing a bot or playing with friends. 

| **Feature** | **Action** | **Expected Result** | **Actual Result** |
|-------------|------------|---------------------|-------------------|
| Player Info | Press Start Game, then choose amount of players and then your're there. | Play vs computer if you check the bot box. Otherwise player vs player. | Works as expected |

<details><summary>Screenshots</summary>
<img src="assets/images/readme/userStories/1.1.png">
<img src="assets/images/readme/userStories/1.2.png">
<img src="assets/images/readme/userStories/2.3.png">
</details>

3. As a user, i want to be able to learn how to play the game. 

| **Feature** | **Action** | **Expected Result** | **Actual Result** |
|-------------|------------|---------------------|-------------------|
| How to Play | Press the how to play button on the startscreen. |See a guide about how to play | Works as expected |

<details><summary>Screenshots</summary>
<img src="assets/images/readme/userStories/3.1.png">
<img src="assets/images/readme/userStories/3.2.png">

</details>

4. As a user, i want to be able to see my score and the oponents score. 

| **Feature** | **Action** | **Expected Result** | **Actual Result** |
|-------------|------------|---------------------|-------------------|
| Player Score | When playing game, score will be shown above the gameboard and in the top right corner. | Player score is visible| Works as expected |

<details><summary>Screenshots</summary>
<img src="assets/images/readme/userStories/1.1.png">
<img src="assets/images/readme/userStories/1.2.png">
<img src="assets/images/readme/userStories/2.3.png">
<img src="assets/images/readme/userStories/4.4.png">

</details>

5. As a user, i want to see who won the game. 

| **Feature** | **Action** | **Expected Result** | **Actual Result** |
|-------------|------------|---------------------|-------------------|
| Main Game| When 3 rounds has been played, an alert will pop up with the game results. | Al alert pops up when game is over | Works as expected |

<details><summary>Screenshots</summary>
<img src="assets/images/readme/userStories/1.1.png">
<img src="assets/images/readme/userStories/1.2.png">
<img src="assets/images/readme/userStories/2.3.png">
<img src="assets/images/readme/userStories/5.5.png">

</details>

6. As the site owner, want users to be able to contact us for feedback.

| **Feature** | **Action** | **Expected Result** | **Actual Result** |
|-------------|------------|---------------------|-------------------|
| Footer | Look at the footer | Showing a contact link that opens up a form.| Works as expected |

<details><summary>Screenshots</summary>
<img src="assets/images/readme/userStories/6.1.png">
<img src="assets/images/readme/userStories/6.2.png">
<img src="assets/images/readme/userStories/6.3.png">
</details>

7.  As the site owner, i want players to be able to learn and progress their game logic.

| **Feature** | **Action** | **Expected Result** | **Actual Result** |
|-------------|------------|---------------------|-------------------|
| How to Play | Press the how to play button on the startscreen. |See a guide about how to play | Works as expected |

<details><summary>Screenshots</summary>
<img src="assets/images/readme/userStories/3.1.png">
<img src="assets/images/readme/userStories/3.2.png">
</details>

8. As the site owner, if someone gets a 404 i want it to be easy to get back to the main page.

| **Feature** | **Action** | **Expected Result** | **Actual Result** |
|-------------|------------|---------------------|-------------------|
| 404 | Visit a page that doesnt exists. | 404 page shows with a button to go back to the mainpage.| Works as expected |

<details><summary>Screenshots</summary>
<img src="assets/images/readme/userStories/404.png">
</details>

# # Bugs

| **Bug** | **Fix** |
| ----------- | ----------- |
| Pictures where loading slow | Added a bufferfunction in JS so all images load when the site loads.|
| When playing vs bot the bot palce tiles on occupied space| Fixed the function for bots that searches the board and included castles to the search.|



## Deployment
The website was deployed using GitHub Pages by following these steps:
1. In the GitHub repository navigate to the Settings tab
2. On the left hand menu select Pages
3. For the source select Branch: master
4. After the webpage refreshes automaticaly you will se a ribbon on the top saying: "Your site is published at https://olletidblom.github.io/Arcane_Underground-MS2/"

You can for fork the repository by following these steps:
1. Go to the GitHub repository
2. Click on Fork button in upper right hand corner

You can clone the repository by following these steps:
1. Go to the GitHub repository 
2. Locate the Code button above the list of files and click it 
3. Select if you prefere to clone using HTTPS, SSH, or Github CLI and click the copy button to copy the URL to your clipboard
4. Open Git Bash
5. Change the current working directory to the one where you want the cloned directory
6. Type git clone and paste the URL from the clipboard ($ git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY)
7. Press Enter to create your local clone.

### Code
In order of apearance:
- The HTML for the responsive [Contact Form](https://getbootstrap.com/docs/4.3/components/forms/) was taken from the Bootstrap v5.0 documentation code snippet.



## Credits
    All images of the project has been created by Chat GTP and edited with SIMP by the creator. 
    