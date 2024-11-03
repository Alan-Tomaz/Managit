# **[Managit](https://managit-dun.vercel.app)**

## A MERN stack project for inventory management.

![Dashboard Section](https://i.imgur.com/32F00Ef.png)

The managit website is an inventory management website. It allows you to create, edit, delete, and update items in a company's inventory.

The website was built using **[React](https://react.dev)**, **[Node.js](https://nodejs.org/en)**, and the **[MongoDB](https://www.mongodb.com)** database.


## Vercel Preview

![Hero Section](https://i.imgur.com/W7g9lYO.png)

You can preview the site using the Vercel hosting service at the following link: **[Managit](https://managit-dun.vercel.app)**.

Through this link you can access almost all of the site's features, with the exception of some specific features involving uploading and deleting images. This limitation occurs due to the nature of the Vercel hosting platform, which does not allow permanent storage of images.

One of the features that is not working in this preview is user creation. Because of this, I have created 2 users so that you can enjoy the other features. You can log in with the following credentials:

### Admin User
Email: dean.winchester@gmail.com

Password: 12345678aA!

### Regular User
Email: alice@gmail.com

Password: 12345678aA!

The site is also pre-populated with other data.

## Functionalities

![Products Section](https://i.imgur.com/tLkpHRL.png)

The site allows you to:

- View a dashboard with your inventory information
- Manage your product inventory.
- Create, update, remove, and edit users for management.
- Create, update, remove, and edit products.
- Create, update, remove, and edit product categories.
- Create, update, remove, and edit product suppliers.
- Create, update, remove, and edit sales and purchase orders.
- Create, update, remove, and edit products.
- Receive notifications of other users' interactions with the inventory.
- View logs.

## Completely responsive

The website can run on both high-resolution devices like computers and medium and small resolution devices like tablets and smartphones

### Large Devices: 

![Register Section](https://i.imgur.com/sAc9fzT.png)

### Medium Devices

![Dashboard Section. Medium Devices](https://i.imgur.com/B9GAM2a.png)

### Small Devices

![Dashboard Section. Small Devices](https://i.imgur.com/0Jot6bw.png)

## Development details

The managit website was developed using the **[React](https://react.dev)** framework for the front-end and the **[Node.js](https://nodejs.org/en)** server with the **[Express](https://expressjs.com/pt-br/)** framework for the back-end. The database used was **[MongoDB](https://www.mongodb.com)**.

The **[Vite](https://vite.dev)** tool was used to create the React project structure.

The entire site was styled using simple CSS.

The following libraries were used to develop the site:

### Front-end:

- **[Axios](https://axios-http.com)** (HTTP requests);
- **[Toastify](https://fkhadra.github.io/react-toastify/introduction/)** (notifications);
- **[React Router Dom](https://reactrouter.com/en/main)** (navigation);
- **[React Icons](https://react-icons.github.io/react-icons/)** (styling);
- **[Chart Js](https://www.chartjs.org)** (chart creation);
- **[Country Flag Icons](https://www.npmjs.com/package/country-flag-icons)** (country icons);
- **[HTML2Canvas](https://www.npmjs.com/package/html2canvas/v/1.4.1#html2canvas)** (image creation from HTML elements);
- **[JS PDF](https://www.npmjs.com/package/jspdf)** (PDF creation from HTML elements);
- **[SheetJS](https://www.npmjs.com/package/xlsx)** (Spreadsheet creation from HTML elements);
- **[React Redux](https://react-redux.js.org)** and **[React Persist](https://www.npmjs.com/package/redux-persist)** (local storage of site data);

### Back-end:

- **[B-Crypt](https://www.npmjs.com/package/bcrypt)** (password encryption);
- **[Cors](https://www.npmjs.com/package/cors)** (CORS policies);
- **[Dot env](https://www.npmjs.com/package/dotenv)** (creation and reading of environment variables);
- **[JSON Web Token](https://jwt.io)** (session token creation);
- **[Mongoose](https://mongoosejs.com)** (MongoDB database manipulation);
- **[Multer](hhttps://www.npmjs.com/package/multer)** (file upload to server);
- **[Nodemon](https://www.npmjs.com/package/nodemon)** (Automatic Server Re-running);

The website design was created using **[Figma](https://www.figma.com/pt-br/)** (one day I will make better designs).

In the path /client/figma, the figma file with the website design was left. In addition, in the path /server/postman_request, there are all the website routes (In the Postman App, remember to fill in the URL and TOKEN variables).

## Usage requirements

For full use and to avoid errors, some data must be filled in the project scripts.

Create a .env file in both the client and server folders.

/client/.env
```
VITE_API_URL="[Your API Host]"
VITE_API_PORT="[Your API Host Port]"
```
/server/.env

```
PORT=[Your API execution port]
JWT_SECRET="[Your secret for the JSON Web Token]"
MONGO_URL="[The URI of your MongoDB database]"
```

If you want some pre-created data, there is some data for the mongoDB collections in the path /server/mongodb/collections.

## Pages

### Dashboard Section
![Dashboard Section.](https://i.imgur.com/z1IwWaP.png)


### Stock Section
![Stock Section.](https://i.imgur.com/5XH8lQG.png)

### Login Section
![Login Section.](https://i.imgur.com/aROwJPk.png)

### Profile Window
![Login Section.](https://i.imgur.com/nEGBGuf.png)

### Log Section
![Log Section.](https://i.imgur.com/ecW2DZ6.png)

### Users Manage Section
![Log Section.](https://i.imgur.com/k3Z4X5d.png)

### Category Section
![Category Section.](https://i.imgur.com/zvWiVVA.png)

### Orders Section
![Orders Section.](https://i.imgur.com/69Ra5gA.png)
