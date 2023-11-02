# SK Product Store

This is an E-commerce site built using MongoDB, ExpressJS, ReactJS, and NodeJS. It features user authentication using JWT, password encryption with bcrypt, and payment processing via Braintree. The project also uses various libraries and packages on both the server and client sides. The web page that displays a list of products. Each product should include an image, title, description, and price. Users should be able to filter and sort the products based on their attributes (e.g., price, category).

## Tech Stack

### Server-Side
- MongoDB: A NoSQL database for storing product and user data.
- ExpressJS: A web application framework for building the API.
- NodeJS: A JavaScript runtime for server-side development.
- JWT (JSON Web Tokens): For user authentication and authorization.
- Bcrypt: For secure password hashing.
- Braintree: For payment processing.
- Colors: For adding colored console logs.
- Concurrently: For running multiple scripts concurrently.
- Cors: For handling Cross-Origin Resource Sharing.
- Dotenv: For loading environment variables from a .env file.
- Express: The web application framework.
- MongoDB: The official MongoDB driver for Node.js.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB.
- Morgan: For HTTP request logging.
- Nodemon: For automatically restarting the server during development.
- Slugify: For generating SEO-friendly slugs for product names.

### Client-Side
- Ant Design (antd): A popular UI library for building a responsive and user-friendly interface.
- Axios: A promise-based HTTP client for making API requests.
- React: A JavaScript library for building user interfaces.
- React-DOM: For rendering React components in the browser.
- React-Helmet: For managing the document head of your application.
- React-Hot-Toast: For displaying toasts and notifications.
- React-Icons: A set of SVG icons for React.
- React-Router-DOM: For handling client-side routing.
- React-Scripts: A set of scripts for building and running the React application.
- React-Toastify: For displaying toast notifications.

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository to your local machine.

2. Install server-side dependencies:

   ```
   cd server
   npm install
   ```

3. Install client-side dependencies:

   ```
   cd client
   npm install
   ```

4. Run the server:

   ```
   npm run server
   ```

5. Run the client:

   ```
   npm start
   ```

Your E-commerce site should now be up and running with the client and server started.

## Contributing

We welcome contributions from the community. If you'd like to contribute to this project, please follow the guidelines in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README to include more information about your project, such as its features, usage instructions, and any additional guidelines for contributors.