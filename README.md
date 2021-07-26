# Social Network API
## Description
- I was motivated by my desire to complete a backend project from scratch.
- I built this project to better understand the relationship between the Model and the Controller in the MVC paradigm. 
- This project allows users to post thoughts and reactions to those thoughts. Users will also have the ability to add and remove friends.
- With this project I learned how to create a NoSql database and express routes to create the Model and Controller of the MVC paradigm from scratch. 
- Challenges: I had trouble creating the reaction post routes as it was sending as a string and not an object. After carefully reviewing the code I found the problem to be a missing imported method. 
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
## Installation
- Clone this repository
- Install dependencies: run ```npm install```
- Start the server: run ```npm start```
## Usage [YouTube Demo Video]()
### API Endpoints/Routes
#### Users
- ```[POST] /api/user/``` - Creates a new user
- ```[GET] /api/user/``` - Retrieves all users from database
- ```[GET] /api/user/<user's id>``` - Retrieves specific user by id
- ```[PUT] /api/user/<user's id>``` - Updates specfic user by id
- ```[DEL] /api/user/<user's id>``` - Deletes specific user by id
##### Friends
- ```[POST] /api/user/<user's id>/friends/<friend's id>``` - Adds friend's id to user's friends array
- ```[DEL] /api/user/<user's id>/friends/<friend's id>``` - Removes friend's id from user's friends array
#### Thoughts
- ```[POST] /api/thought/``` - Adds thoughts (comments) utilizes username and userid in body (JSON)
- ```[GET] /api/thought/``` - Retrieves all thoughts from database
- ```[GET] /api/thought/<thought's id>``` - Retrieves specific thought by id
- ```[PUT] /api/thought/<thought's id>``` - Update specific thought by id
- ```[DEL] /api/thought/<thought's id>``` - Deletes specific thought by id
##### Reactions
-```[POST] /api/thought/<thought's id>/reactions``` - Add's reaction to thought by id
-```[DELETE] /api/thought/<thought's id>/<reaction's id>```- Deletes specific reaction 
## Credits
- [Express](https://www.npmjs.com/package/express) Server and Routing
- [MongoDB](https://www.mongodb.com) NoSql Database
- [Mongoose ODM](https://mongoosejs.com) Schema-based Modeling
## License
This project utilizes the MIT license. View the LICENSE file for more information.

### GitHub Repository: https://github.com/RotichD/social-network-api


