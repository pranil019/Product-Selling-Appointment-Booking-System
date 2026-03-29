# BookIt

This is a Node.js + Express + MongoDB project for:

- Online appointment booking
- E-commerce platform for used items sales
- Example focus: car, bike, scooter, and similar products

## Project Features

- Seller can add a used item listing
- Seller has a dedicated dashboard to manage their own listings
- Seller can accept or reject buyer appointment requests
- Seller can send a custom response message to the buyer
- Buyer can browse all listings
- Buyer can open a single product detail page
- Buyer can book an appointment for inspection or meeting
- Buyer has a dedicated dashboard to track booking status and seller replies
- Buyer dashboard can show optional external sample listings
- MongoDB stores items and appointments

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- EJS templating
- CSS

## Project Structure

```text
.
|-- public/
|   `-- css/style.css
|-- src/
|   |-- app.js
|   |-- config/db.js
|   |-- controllers/
|   |-- models/
|   |-- routes/
|   `-- views/
|-- .env.example
|-- package.json
|-- README.md
`-- server.js
```

## How To Run

1. Install Node.js and MongoDB in your system.
2. Open this project folder in terminal.
3. Run:

```bash
npm install
```

4. Create a `.env` file by copying `.env.example`.
5. Start MongoDB locally.
6. Run:

```bash
npm run dev
```

7. Open:

```text
http://localhost:3000
```

## MongoDB Example

Use this connection string in `.env` if MongoDB is installed locally:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/bookit
```

## Main Pages

- `/` Home page
- `/items` All listings
- `/items/new` Add a new listing
- `/items/:id` Single item details + appointment booking
- `/buyer/dashboard?email=buyer@example.com` Buyer dashboard
- `/seller/dashboard?email=seller@example.com` Seller dashboard

## Suggested Viva / Explanation Points

- MVC pattern is used with `models`, `routes`, `controllers`, and `views`
- MongoDB stores marketplace and appointment data
- Express handles routing and form submissions
- EJS is used for dynamic UI rendering
- Mongoose schema validation helps keep data clean
- Seller and buyer dashboards are separated using email-based filtering

## Future Improvements

- User authentication
- Search and sorting
- File upload for item images
- Payment integration
- Reviews and ratings
