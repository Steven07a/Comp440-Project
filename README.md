# Getting Started with Create React App
### Open the client Directory and run `npm install`
This will install all dependensies for the client

### Open the api Directory and run `npm install`
This will install all dependensies for the server side of this application

### Make sure to have mySql open as well as Ampps open 

## Available Scripts
### In the Client directory, you can run: `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any errors in the console.

### Before running the server:
Navigate to the package.json inside of the api folder and make sure the scripts has the following code "start": "nodemon index.js"
### In the api directory, you can run: `npm start`
Runs the server in development mode.
The server will reload whenever changes are made.

## Client Folder heiarchy 
Client is broken up into a few different parts the important ones are

### `components`
These are resuable components so things like Navigation bars, Footers and Custom html items would be placed here

### `pages`
This is where the .html files are essentially stored. In NodeJs Javascript and html are placed in the same file

### `App.js`
Accsess point to entire app. This is where things like routing and global css are placed

### `index.js`
CHANGE THIS FILE AT YOUR OWN RISK!

### `style.scss`
CSS for entire project. Since the project is still really small ive decided to place all CSS in the same file (possibly a bad idea) I will change this later if the project grows.

### `context`
This is a way to pass state from page to page allowing us to save user information 

## api Folder Heiarchy 

### `controllers` 
This is where the raw sql commands/functions are as more things get added we would add to this file

### `routes`
Routes is where we can import the functions from controller and define them as post/get funcitons

### `db`
This is where the db information/connection happens if your informaiton happens to be different then you would need to change this information. (If possible try to have the same naming scheme I will try to find a way to host the db online)

### `index`
Index is our entry point into the backend basically this is the App.js equivilant to the backend any api changes that need to be made globally such as imports, new routes would go here.
### `Files`
Where we will store any .sql files

## Proxy/Ports
### `Current port setup`
currently I have port 3000 in use for the frontend and port 3001 for the backend of this application. If any changes need to be made make sure to also change the proxy variable inside of package.json inside of the client folder as right now what this does is it makes it so our API calls do not need to type out the entierty of the api link. Otherwise everytime we call axios we would have to type out http://localhost:3001/api/(name of api being used)