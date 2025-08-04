# The Little Lemon Restaurant App

This React app is a basic version of a restaurant app made for the fictional restaurant Little Lemon. While my course required a booking form feature, 
I also endeavoured to include basic pages for an About page, a Menu for ordering online, and a very basic cart.

See it live: https://react-capstone-three.vercel.app/

## Includes units tests:

### HomePage.test.js

Test Case 1: Simple test to verify the "Reserver a Table" button renders

### BookingPage.test.js

Test Case 1: Renders the BookingForm component and ensures the "Make Your Reservation" button appears
Test Case 2: Checks that updateTimes is called on first render to initialize the available times

### BookingForm.test.js

Test Case 1: Checks that all required form fields and the submit button render
Test Case 2: Checks starting state of form fields
Test Case 3: Checks user can input into text fields correctly
Test Case 4: Checks user can select number of guests correctly
Test Case 5: Checks that updateTimes is called on date change
Test Case 6: Checks that time slot updates when availableTimes changes
Test Case 7: Verifyies contact preference toggles correctly





# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
