const express = require("express");
const jsonServer = require("json-server");
const path = require("path");

const app = express();
const port = 3001;

// Serve static files from the "public" directory
app.use(express.static(path.resolve("public")));

// Use json-server for API routes
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
app.use(middlewares);
app.use(express.json()); // To parse JSON bodies
app.use("/api", router);

// Add the custom route for reordering transactions
app.post("/transactions/reorder", (req, res) => {
  const reorderedTransactions = req.body;
  // Access the lowdb instance from the json-server router
  const db = router.db;

  // Assuming `db.json` has a `transactions` array
  db.set("transactions", reorderedTransactions).write();

  // Respond with the updated transactions
  res.status(200).json(reorderedTransactions);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

/////////////////////////////////////////////////////////////////////////////
// const express = require("express");
// const jsonServer = require("json-server");
// const path = require("path");

// const app = express();
// const router = jsonServer.router(path.join(__dirname, "db.json"));
// const middlewares = jsonServer.defaults();

// app.use(middlewares);
// app.use(jsonServer.bodyParser);

// Custom route for reordering transactions
// app.post("/transactions/reorder", (req, res) => {
//   const reorderedTransactions = req.body;

//   // Update the data with the reordered transactions
//   const dbPath = path.join(__dirname, "db.json");
//   const data = JSON.parse(fs.readFileSync(dbPath, "utf8"));
//   data.transactions = reorderedTransactions;

//   // Optionally write the updated data back to db.json
//   fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

//   res.status(200).send(reorderedTransactions);
// });

// app.use("/api", router);

// app.listen(3001, () => {
//   console.log("JSON Server is running on port 3001");
// });
//////////////////////////////////////////////////////////////////////////////////
// // const jsonServer = require("json-server");
// // import jsonServer from "json-server";
// import jsonServer from "./node_modules/json-server";

// const server = jsonServer.create();
// const router = jsonServer.router("./db.json");
// const middlewares = jsonServer.defaults();

// server.use(middlewares);
// server.use(jsonServer.bodyParser);

// server.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     return res.status(204).end();
//   }
//   next();
// });

// server.post("/transactions/reorder", (req, res) => {
//   const reorderedTransactions = req.body;
//   router.db.set("transactions", reorderedTransactions).write();
//   res.status(200).send(reorderedTransactions);
// });

// server.use(router);
// server.listen(3001, () => {
//   console.log("JSON Server is running on port 3001");
// });
/////////////////////////////////////////////////////////////////////////////////
// const jsonServer = require("json-server");
// const server = jsonServer.create();
// const fs = require("fs"); // Import the fs module
// const path = require("path"); // Import the path module

// // // Read the data from db.json
// const dbPath = path.join(__dirname, "db.json"); // Assuming db.json is in the same directory
// let data; // Declare a variable to store the parsed data

// try {
//   data = JSON.parse(fs.readFileSync(dbPath, "utf8"));
//   console.log("Successfully read db.json");
// } catch (err) {
//   console.error("Error reading db.json:", err);
//   // Handle the error gracefully, perhaps exit the server
//   process.exit(1);
// }

// // Use the parsed data (replace router with data as needed)
// const router = jsonServer.router(data); // Use the parsed data instead of db.json

// const middlewares = jsonServer.defaults();

// server.use(middlewares);
// server.use(jsonServer.bodyParser);

// server.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     return res.status(204).end();
//   }
//   next();
// });

// server.post("/transactions/reorder", (req, res) => {
//   const reorderedTransactions = req.body;

//   // Update the data with the reordered transactions
//   data.transactions = reorderedTransactions;

//   // Optionally write the updated data back to db.json
//   fs.writeFileSync(dbPath, JSON.stringify(data, null, 2)); // Add error handling

//   res.status(200).send(reorderedTransactions);
// });

// server.use(router);
// server.listen(3001, () => {
//   console.log("JSON Server is running on port 3001");
// });
