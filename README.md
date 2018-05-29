# SteamCheck

A simple project involving steam-api to generate information about the user and display the generated information to the user.

## Steam API key

Go to `https://steamcommunity.com/dev/apikey` to get your steam API key, afterwards navigate to `src/assets/apiKey.json` and replace the `apikey` value with your API key.


## Required packages

Open a terminal window and change the current directory to the project, you will need to type the following command: `npm install` to get all the required packages to run the development server

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `ng serve --proxy.config proxy.conf.json` to avoid cors error

*Note* avoid naming folders with `[]` or `()`, it might cause issue with `ng serve`.
