# README #

### Structure ###
* app/
    * Folder with controller directives, services and view files
* assets/
    * Folder with css, font, img, js and json files
* index.html
    * App index file 

### App folder ###
This folder contains:

* controllers/ 
    * adminController.js
    * commonController.js
    * mainController.js
    * userController.js
* directives/
    * mainDirective.js
* services/
    * mainService.js
* views/
    * admin/
        * All the views available por admin role. Each view has a controller locates in adminController
    * common/
        * All the views available por admin and user roles. Each view has a controller locates in commonController
    * directives/
        * All the views used for directives
    * user/
        * All the views available por user role. Each view has a controller locates in userController. Also check if the actual session can access the route.
* app.js
    * Inits angular app
* routes.js
    * All system routes, linking the route, its view and its controller

### Initial load file ###
This is located at mainController.js and the data is located in assets/json/, loading some users and some comics