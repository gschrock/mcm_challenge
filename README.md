To build and run: clone the repo, npm install, npm start, then navigate to a browser at http://localhost:3000

Or view it deployed at: [mcm-challenge](https://mcm-challenge.surge.sh)

- Client state handling is managed with hooks only. Due to the small scope of views required, Redux or React Context are not used and would probably be overkill for our needs.

- Some non-comprehensive snapshot testing is accomplished using Jest + Enzyme. Ideally I'd want greater test coverage of the component state (use of hooks makes this difficult for now) and to mock the function behavior,especially the mockFetch function.

- Routing is accomplished through use of React-Router-DOM library.

- Validation of inputs is performed mostly by leveraging Validator library for sake of simplicity and speed of implementation.

- Minimal styling is accomplished with React-Bootstrap, also for sake of simplicity and speed of implementation.

- Ipusm is from [Riker Ipsum](http://rikeripsum.com/#!/) 🤩

- After submitting form on initial landing page user is either:
  1 - directed to success route with a username and password form that generates a simple alert on a successfully validated submit
  2 - directed to denied route with a mock disqualification message
  3 - given a console error warning with "Bad Request" if the value of the vehicle is over \$1M in value (which should most definitely be handled better in a true production app)

Some screenshots of the landing page:
![prevalidation](https://i.imgur.com/aIRE6eZ.png)
![postvalidation](https://i.imgur.com/4nm4DW7.png)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
That means the following README documentation below still applies for getting the app running.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
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
