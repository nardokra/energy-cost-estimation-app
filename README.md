# Energy Cost Estimation App

This project serves as a solution for the Energy Cost Estimation App Assignment.

## Configuration

- NodeJS installed on the system.
- Package manager like `npm` or `yarn`

## Available Scripts

In the project directory, you can run the solution from the root directory with these scripts:

```bash
npm run start
# or
yarn start
```

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

```bash
npm run test
# or
yarn test
```

Launches the test runner.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```bash
npm run build
# or
yarn build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

```bash
npm run eject
# or
yarn eject
```

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single-build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point, you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However, we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

```bash
npm run lint
# or
yarn lint
```

This project makes use of ESLint. ESLint statically analyzes your code to quickly find problems.
Many problems ESLint finds can be automatically fixed. ESLint fixes are syntax-aware so you won't experience errors introduced by traditional find-and-replace algorithms.

```bash
npm run lint:fix
# or
yarn lint:fix
```

To check and resolve the linting error by making use of the auto fix tool of ESLint.

```bash
npm run type:check
# or
yarn type:check
```

To run through all files and check on the correctness of the usage of types.
This project is written in Typescript. TypeScript is a strongly typed programming language that builds on JavaScript,
giving you better tooling at any scale. For more info or the documentation visit the [Typescript website](https://www.typescriptlang.org/).

## Assumptions

Below you can find the assumptions made during the realization of the app.

### 1. Consumption spreading

For the calculation of the costs, I did the assumption that the energy usage was equally spread over the time duration.
So every interval of 15 minutes has the same energy consumption.

### 2. Rounding the costs up

For the calculation of the costs, I rounded up the amount on the right of the delimiter up to two decimals.

### 3. Small design changes

During an actual running project, I would always discuss the best implementation of the design with the person responsible for making the design.
For this assignment, I made the decision on my own to slightly change the design towards a more user-friendly shape.

Changes made:

1. I changed the 'Date' input field to a 'Start date and time' input field that contains a value of the current day.
2. I changed the 'Start time' input field to an 'End date and time' input field, that contains a value of the current day, 30 minutes later in time than the 'Start date and time'.
3. I changed the 'Duration' input field to be a static 'Duration' component which automatically calculates the duration based on the 'Start date and time' and 'End date and time' input.

These changes are making the user interface a little more user-friendly:

- It saves the user effort since they do not need to fill the 'Duration' field themselves.
- They can make use of a 'Date picker' for both the 'Start date and time and 'End end time'
- It gives the user more guidance and feedback while filling in the input fields necessary for the calculation.

#### Material UI

For the input fields, I made use of the Material UI library and its components. This library had a good fit with the purpose of picking a date and time.
Also, it has out-of-the-box components easy to implement for text input and buttons. The input components all come with a nice 'Helper text' property.
Which I took advantage of to give some instructions, clarity, and validation feedback.

To learn more about the Material UI, check out the [Material UI Documentation](https://mui.com/x/introduction/).

## Architecture

Below you can find the decision made for the architecture of the assessment.

### 1. React

For building this App I made the decision to use React, to demonstrate my skills with and knowledge of this framework.

### 2. Atomic Design System Component Architecture

I made the decision to make use of the Atomic design system because it gives an easy and clear hierarchical component structure.
In a real-life project, it makes it really easy to collaborate between designers and developers.

#### Atomic Design shortly explained:

Atomic Design supports all that goes into creating and maintaining a robust design system.
Atomic design is a methodology composed of five distinct stages working together to create
interface design systems in a more deliberate and hierarchical manner.

The five stages of atomic design applied to the component and folder structure of the project:

1. Atoms: The basic building blocks of matter, then the atoms of our interfaces serve as the foundational building blocks that comprise all our user interfaces. These atoms include basic HTML elements like form labels, inputs, buttons, and others that can’t be broken down any further without ceasing to be functional.
2. Molecules: A group of atoms bonded together, a relatively simple group of UI elements functioning together as a unit. For example, a form label, search input, and button can join together to create a search form molecule.
3. Organisms: Organisms are relatively complex UI components composed of groups of molecules and/or atoms and/or other organisms. These organisms form distinct sections of an interface.
4. Templates: Templates are page-level objects that place components into a layout and articulate the design’s underlying content structure.
5. Pages: Pages are specific instances of templates that show what a UI looks like with real representative content in place.

To learn more about the Atomic Design System, check out the explanation of the [Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2/).

### 3. Tailwind CSS

I made the decision to make use of Tailwind CSS because it's an easy and fast way to apply responsive styling.
Especially for simple designs, which made it a good fit for this assessment. Besides, it benefits from small file size.

#### Tailwind Shortly explained:

Tailwind is a utility-first CSS framework packed with classes like flex, pt-4, text-center, and rotate-90 that can be composed to build any design, directly in your markup.
Tailwind CSS uses Brotli compression and PurgeCSS. What PurgeCSS does is, it scans the file and removes unused classes. This is how it reduces file size.

To learn more about Tailwind CSS, check out the [Tailwind CSS Documentation](https://tailwindcss.com/).

### 4. React Testing Library

It's a simple and easy-to-use testing library, which makes it a good fit for doing unit tests on a project like this.
The React testing library comes already for some time out of the box with the creation of a React app, which makes it a proven combination of libraries.

In this project, I tried to test as many components and utilities as possible, all with small unit tests. The lower you start to test in the utility and component structure,
the easier it becomes higher up. In this way, you keep your test easy to understand and maintain.

#### Testing Library shortly explained:

Simple and complete testing utilities that encourage good testing practices. For better maintainability and confidence during development.
React Testing Library builds on top of the DOM Testing Library by adding APIs for working with React components.

To learn more about React Testing Library, check out the [React Testing Library Documentation](https://testing-library.com/).

## General

Thank you for giving me the opportunity to show you the way I work currently.
I would love to hear your feedback and discuss the decisions I made while making the assessment!
