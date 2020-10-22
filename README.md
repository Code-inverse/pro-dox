# Welcome to Pro-Dox!

## Live App Demonstration
This app is deployed on **Heroku**!

 - Step 1: It is deployed on **free tier** so please bear with me when testing it live.
 - Step 2: **Visit** => http://pro-dox.herokuapp.com/
 - Step 3: **Patience,** let the heroku dyno restart.
 - Step 4: On free-tier the domain is not secure so please visit but I assure you its safe 😁
 - Step 5: Leave me an `awesome note` there!

## Installation

First clone this repository on your machine and run  `npm install`  from your

> terminal

or

> powershell

in the project directory.

## Configuration
In the project you need to create a `.env` file on the root level. The environment variables that are required and their format can be found in a `.env-sample` file in the project.

Also, you need to create a **Firebase backend** and configure **Cloud Firestore** with `crash-analytics` enabled and provide all the `config-vars` to `.env` file. 

It is created using `create-react-app`. 

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Current Functionality

 - A rich text-editor based on [quilljs](https://quilljs.com/) that is heavily customized.
 - Database is on test-mode so everyone can see your created documents.
 - Anyone can perform **CRUD** (`Create`, `Read`, `Update`, `Delete`) operations on any documents.
 - While using the app please consider that in future implementation the *documents will be locked* **Per-Organisation** and **Per-Creator** basis.
 - So when using the app **imagine** all the ***testers***👨🏽‍💻 belong to the `same organisation`.

## Future Implementation

 - Migration from Firebase to complete custom backend **(MERN stack).**
 - Documents when created will have a *password* so that it is *only accessible to CRUD only when password is provided*.
 - Documents will be accessible Per-Organisation and Per-User basis that too with only correct password of Document.
 - *Only the document creator can perform Delete Operation on the document.*
 
 ## Pull Requests
 - This project is open to pull requests.
 

> Happy Coding!!!
# 👨🏽‍💻🤪
