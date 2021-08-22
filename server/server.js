const express = require("express");
const userRoute = require("./routes/Users");
const taskRoute = require("./routes/Task");
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.urlencoded({ extended: false })); // to parse bodies from url 
app.use(express.json()); 

// To fix CORS Issue
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// routes
// app.use('/users', userRoute);
app.use("/tasks", taskRoute);

// This displays message in terminal that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));
