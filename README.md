# SteamCheck

A project involve using steam-api to generate information about the user and display the generated information to the user.

## Steam API key

Go to `https://steamcommunity.com/dev/apikey` to obtain your steam API key, afterwards navigate to `src/assets/apiKey.json` and replace the `apikey` value with your API key.


## Required packages

This project uses npm package manager, so you will need the it to install packages to run the project.

Open a terminal window and change the current directory to the project, you will need to type the following command: `npm install` to get all the required packages to run the development server

## Development server

first build the project by running the command `ng build`, then Run `npm start` for a dev server. Navigate to `http://localhost:4200/` or the url set in server.js.

*Note: avoid name folders with [] or (), it could cause issue with the development server*
