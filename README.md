# Company Setup Portal

A modern React + TypeScript web application for business setup and management in Dubai's thriving free zone. This project provides a seamless experience for users to start their business, contact support, and learn about services, with a beautiful UI powered by Ant Design and React Bootstrap.

## Features

- **Service Sidebar**: Sidebar navigation for logged-in users, with links to Dashboard, Payment, License Services (Renewal, Cancellation, Letters), and Requests. Sidebar is shown on all service-related pages for easy access.
- **Requests Module**: Users can view a list of their submitted requests, see details, and track status. Includes a table view and a details page.
- **User Dashboard**: Visual dashboard with charts (Pie and Bar) for request status and pending payments, plus a table of recent requests. Powered by [Recharts](https://recharts.org/).
- **Company Setup Wizard**: Step-by-step guided process for setting up a new company, including business category, shareholder details, and more.
- **Trade Name Step with AI Checks**: When suggesting trade names, an AI tool checks for numbers, region names, Arabized names, and similarity to global brands. Results are shown with green ticks and a compact info bar explains the checks.
- **Modern Login & Signup Pages**: Clean forms using Ant Design components, with validation and user feedback.
- **Responsive Footer**: Centered footer with company info, quick links, and social media icons.
- **Navigation**: Responsive navbar with clear links to all main sections.
- **Ant Design Integration**: Consistent, modern UI using Ant Design components throughout the app.

## Technologies Used

- [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Ant Design](https://ant.design/) (UI components)
- [React Bootstrap](https://react-bootstrap.github.io/) (layout)
- [React Router](https://reactrouter.com/) (routing)
- [Axios](https://axios-http.com/) (API calls)
- [Recharts](https://recharts.org/) (charts)
- [Google Maps API](https://developers.google.com/maps/documentation/javascript/overview) (contact page)
- [universal-cookie](https://www.npmjs.com/package/universal-cookie) (cookie management)

## Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- npm or yarn

### Installation
```bash
npm install
# or
yarn install
```

### Running the App
```bash
npm start
# or
yarn start
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Building for Production
```bash
npm run build
# or
yarn build
```

### Additional Setup
- **Charts**: Install Recharts for dashboard visualizations:
  ```bash
  npm install recharts
  ```
- **API Integration**: Update the API endpoints in `src/services/` as needed for your backend.

## Folder Structure
```
src/
  pages/         # Main pages (home, about, contactus, login, dashboard, requests, etc.)
    requests/    # Requests list and details components
  shared/        # Shared UI components (footer, menu, sidebar, ServiceLayout, HeroSlider, etc.)
  interfaces/    # TypeScript interfaces and types
  services/      # API and auth services (including tradename.service)
  routes/        # Routing configuration
  core/          # Core utilities and logic
```

## Contribution
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## Contact
For questions or support, please use the [Contact Us](./src/pages/contactus.tsx) page in the app, or email info@pcfc.ae.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
