**
ENTRY POINT
|
|-> SRC
|
|-> app.js
**

# Backend Documentation

This documentation provides guidance on how to set up and start the backend of the project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Backend](#running-the-backend)
  - [Development Environment](#development-environment)
  - [Production Environment](#production-environment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Prerequisites

Before starting the backend, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/your-backend-repo.git

   ```

2. Navigate to the backend directory:

   ```bash
    cd your-backend-repo
   ```

3. Install the required dependencies:

   ```bash
    npm install

   ```

4. Create the .env file in the root directory and add the  
   MONGO DB ATLAS URI and YOUR FRONTEND URL

5. Start the server

   ```bash
   npm run start
   ```

   or

   ```bash
   npm run dev
   ```

   Your server will be up and running

## ROUTS

1.  /login

    \*\* This is the route for login which uses loginSignup controler

    \*\* using function -> LOGIN
    Arguments required will be user_name which will return a object if user login was successfull:

          ```bash
           return res.send({ status: "ok", message: "Logged in" });
          ```

          If the login was unsuccessfull it will return

          ```bash
             return res.send({
             status: "err",
             message: error?.message || "something went wrong",});
          ```

2.  /signup

    \*\* This is the route for signup which uses loginSignup controler

    \*\* using function -> SIGNUP
    Arguments required will be user_name which will return a object if user login was successfull:

          ```bash
           return res.send({ status: "ok", message: "user created" });
          ```

          If the signup was unsuccessfull it will return

          ```bash
             return res.send({
             status: "err",
             message: error?.message || "something went wrong",});
          ```

3.  /create_note

    \*\* This is the route for creating notes and updating also which uses todoControler controler

    \*\* using function -> crerate_todo
    Arguments required will be

    1. heading
    2. contnet
    3. id / 0 if new some id if its a updation request

    which will return a object if todo was created:

          ```bash
           return res.send({ status: "ok", message: "todo created" });
          ```

          If the signup was unsuccessfull it will return

          ```bash
             return res.send({
             status: "err",
             message: error?.message || "something went wrong",});
          ```

4.  /retrive_notes

    \*\* This is the route for retriving notes which uses todoControler controler

    \*\* using function -> get_todo
    which will return a object if request was successfull:

          ```bash
          return res.send({ status: "ok", data: [{},{}..] });
          ```

          If the signup was unsuccessfull it will return

          ```bash
             return res.send({
             status: "err",
             message: error?.message || "something went wrong",});
          ```

5.  /delete_notes

    \*\* This is the route for deleting notes which uses todoControler controler

    \*\* using function -> delete_todo
    accepts arguements

    1. id : unique id of the todo

    which will return a object if request was successfull:

          ```bash
          return res.send({ status: "ok", message: "todo deleted" });
          ```

          If the signup was unsuccessfull it will return

          ```bash
             return res.send({
             status: "err",
             message: error?.message || "something went wrong",});
          ```


## CONTACT

NAME -> Vishal kumar
Email -> vishal2983kumar@gmail.com
Contact -> +91 9162871357

Happy coding!
