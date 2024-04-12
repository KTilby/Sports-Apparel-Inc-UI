# Sports Apparel, Inc.

***

## Description
This is a starter project for a Sports Apparel Company that was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Sports Apparel, Inc. has contracted for a redesign of their website to improve functionality and user experience. This project implemented enhancements and improvements to the provided base design. The resulting site has greater customer, shopping, product, and interface functionality, as well as an aesthetically pleasing design.

***

## Install Prerequisites

### Node Version Manager (NVM)

NVM is a utility to help you quickly install and switch between Node versions. With NVM, there is no need to manually install and uninstall versions.

Follow the Installation Steps for [NVM on GitHub](https://github.com/coreybutler/nvm-windows).

### IDE
A functioning IDE is needed to run the API. Intellij is recommended IDE.

### Text Editor
A functioning Text Editor should be used to run the UI application. VSCode is the recommended Text Editor.

***

## Getting Started

1. Clone this project locally.
1. CD into the root folder
1. Run `npm install` in the root folder to install dependencies.

This command installs a package, and any packages that it depends on.

1. Run `npm start`.

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

***

## Usage
The following features were added to or improved on the site:
* Site Header: Displayed at the top of each page, contains links and tools for navigating the site.
* Slideshow: Displays marketing material on the homepage for the site and provides a link to advertised products.
* New Products: Displays the five most recently added products on the homepage.
* Popular Products: Displays popular products on the homepage and No Search-Results Page.
* Product Display Modal: Gives a more detailed picture of a product, without navigating to the product page.
* Site Footer: Displays at the bottom of the site and contains the same links as the Site Header.
* Department Pages: Contain and display products belonging to specific departments. These can be further filtered on the page.
* Site Search: Allows for filtering of products from available stock, by the entering of a search term.
* Product Card: Displays basic information about a given product.
* Side Navigation Menu: Allows for the filtering of products within a department page, based on categories and types/brand.
* Shopping Cart: Allows customers to populate a shopping cart with products for checkout.
* Wishlist: Allows customers to save products on a list for future purchase.
* Homepage: A landing for the site which displays advertising slideshow, new products, and popular products.
* Login: A menu which allows a customer or user to login to their account.
* Logout: Allows a customer a user to logout.
* Loader: Displays while data is retrieved from the API showing the user that the application is not stalled.
* Product Pagination: Allows for a superior viewing experience by breaking the product pages into more manageable portions. It also allows for easy navigation between these separate pages.
* Price Filtering: Allows the user to filter products by price.
* Product Purchasing: Allows customers to input billing and shipping information to purchase the products from their cart.
* Department Video: Can be used to educate, motivate, or entertain users.
* Customer Accounts: Contain pertinent customer information for future contact, as well as the customer cart and wishlist.

***

## Dependencies
* Sports apparel api must be running. Confer with team resources if you are unsure.
* Material-ui

* `Eslint:` 
A code linter for JavaScript and React.
Eslint has been installed in the AirBnB Esling configuration, which can be installed using the following command:
"npm i -D eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks".
It is also necessary to create an EsLint configure file in the root directory which specifies what rules Eslint will apply while linting.
This file should be a .eslintrc file. and should contain this code: 
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb",
        "react-app",
        "airbnb/hooks",
        "plugin:jsx-a11y/recommended"              
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "jsx-a11y"
    ],
    "ignorePatterns": ["*.test.js", "**/vendor/*.js"],
    "rules": {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "linebreak-style":0,
      "comma-dangle": ["error","never"],
      "react/prop-types":0,
      "react/function-component-definition": [2, { "namedComponents": "arrow-function" }],
      "arrow-body-style": ["error", "as-needed"],
      "react/button-has-type": 0
    }
}

To run Eslint add a script "lint": "eslint ." to the package.JSON file.
Then run "npm run lint" or "npm run lint -- --fix" as describes above in the scripts section.

* `react-router:`
Allows for routing and navigation between different url pages within a React application.
To install write the folowing command in the command line: "npm i react-router-dom"
Import the following into your application: import { BrowserRouter, Routes, Route } from "react-router-dom";

* `jest`
Dependency for frontend testing; automatically included with a create react app application.

***

## Testing
* To run testing on your front end application in your text editor run `npm test` in the command line.
* To run testing with coverage on your front end application in your text editor run `npm test -- --coverage` in the command line.

* To run testing on the API:

1. Check that the test/java folder is marked as the Test Sources Root, if it is, it should be lit green. If the test/java folder does not appear to be marked as the Test Sources Root, right click on the folder and click Mark Directory as -> Test Sources Root.
2. Open the ServiceImplTest class of your choice to see the available unit tests.
3. Select the test you want to run and left click on the green arrow appearing to the left of the test name in order to run the test. Alternatively right click on the test name and choose "run" from a drop down list.
4. If you want to **run the test with coverage**, right click on the green arrow and choose "Run ... with coverage" from the options on a drop down list. Alternatively right click on the test name and choose "More run/debug" from a drop down list; this will produce a second drop downlist;  select "Run... with coverage". 
You can use this same process to run all the tests within the class with coverage if you use the the green arrow to the left of the class name or right click on the class name. This will tell you what percentage of the classes, methods, and lines are covered by the testing units.
5. After following step 3 or 4, dialogue should appear which will indicate whether the test passed or failed. If the test failed the dialogue should provide a comparison between the expected results and the failed results.
6. To run all of the tests at once, use the green arrow button which is found to the left of the testing class name. Alternatively right click on the class name and choose "run" from a drop down list.

***

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

### `npm test -- --coverage`
Runs front end testing with line coverage.

### `nvm use 16`
Runs nvm version 16.

### `npm run lint`

Launches Eslint which will lint the application for code quality and style issues which it will report as errors (red) and warnings (yellow) (see Eslint in the dependencies section and Linting Instructions below).

### `npm run lint -- --fix`

***

## Linting
Install Eslint as descriped above in the dependencies section.
To run Eslint use the `npm run lint` or `npm run lint -- --fix` command. The first will find all errors and warnings, and the second will find and correct errors and warnings where possible.

***

## Project Repositories
### API
https://gitlab.com/mtc-cce1/mtc-cce-wdev/sept-2023-cohort/curtis-lynn/team-dev-dev/api-base-project/-/tree/main
### UI
https://gitlab.com/mtc-cce1/mtc-cce-wdev/sept-2023-cohort/curtis-lynn/team-dev-dev/ui-base-project/-/tree/main

***

### Credits
Austin Murchison, Curtis Lynn, Daniel Hellerman, Douglas Campbell, Kharl Tilby, Marcia Merrit

4/12/2024

Create Opportunity September 2023 Cohort

Module 6: Agile/Scrum

