# Website for blog entries

Blog is an web application that allows you to create blog entries about what you want, read existing blogs and leave
comments on selected blogs.
Program was designed for two roles: "ADMIN" and a "USER".

Logged-in users can:

- review list of existing blogs;
- read blog entry with comments;
- leave comments on blogs;
- edit their comments;
- delete their comments;

Admins can:

- review list of existing blogs;
- read blog entry with comments;
- create blog entries;
- edit their blog entries;
- delete blogs entries;
- delete selected comments made by whatever users;
- leave comments on blogs;
- edit their own comments;

Anonymous user can only view blogs and comments;

## Requirements

For building and running the application you need:

- Node.js
- npm

There are 4 users already created on start up:

- Admin (password: admin)
- Admin1 (password: admin)
- User (password: user)
- User1 (passwordL user)

You may use these credentials to log into application or register to create a new USER;

## Run the program

First run:

### `npm install`

And then,
in the project directory run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
## Other Available Scripts

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
