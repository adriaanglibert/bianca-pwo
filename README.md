# Bianca PWO

This is the repository containing the code for the BIANCA PWO.
You can find more information about this research project on [our website](https://www.bianca.care/).

## Introduction

> Welkom bij BIANCA, jouw assistent om een goede balans te vinden in leven met een chronische aandoening. BIANCA verzamelt getuigenissen, helpt je bij het inplannen van een gebalanceerde week en geeft suggesties waar nodig.

This application will be responsible for the 'inplannen van een gebalanceerde week'-aspect. It consists of an onboarding, settings and the app itself.

## Setup

### Node

This application can be run after installing `npm` with `npm i`, you can start the browser with `npm run start`. You will have to use **Node 16**, change versions with [`nvm`](https://github.com/nvm-sh/nvm).

### Firebase

[Firebase](https://console.firebase.google.com/) is required to use this application. Create a new project, **and enter your app info into the `.env`-file**. This contains sensitive information so be careful to not push this to a Git-repository.

- Enable authentication in your project and enable following services:
    - Email/Password
    - Google

- Go to the sign-up page and register
    - You should see a users collection being created in the firestore.

### Translations and treatments

Nothing is hardcoded so if you wish to add or remove a treatment, you can do so in `activities.json` and `translations.json`.

## Important notice ⚠️

**Do not update firebase dependency as it will not work as expected with React 17.**

*`"react-scripts": "^4.0.3"`, is needed because `v5` does not understand process. This is a bug with React and not this source code.*

## Default script documentation

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.