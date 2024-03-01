# Background Remover

Background Remover is a web app that enables users to upload their images and remove background from them

## Prerequisites

Make sure you follow the .nvmrc and use Node 16

To install dependencies run

`yarn`

Start the app using the following command, replacing the key by your API key:

    REACT_APP_API_KEY="your_api_key" yarn run start

To see the app running visit http://localhost:3000/

## Features

1. Upload an image from your computer. It will be sent to the server,
   which will return an image without the background
2. See the list of images previously sent to the server from your
   computer. They all appear in an "Untitled Folder" folder by default.
3. Create new folders
4. Move images between folders.
5. When you refresh the page, the folders and images are still showing

## Technical decisions
Due to simplicity of the project, Context API + useState hook are used for state management
Store is structured in 2 sections - folders and images. The tradeoff here was to improve maintainability and reduce coupling but have slightly more complex state management, instead of storing images under folders as well  
The app is structured in following sections:
components - reusable components  
features - components that have business logic in them  
assets - contains app assets  
store - state management  

## Future improvements
Improving CSS, currently only primary-color is added as a variable and for the app to be able to scale it will need a better design system in place.
Adding the possibility to rename folders
Better separation of concerns