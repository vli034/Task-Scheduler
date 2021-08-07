const express = require('express'); 
const userRoute = require('./routes/Users');
const taskRoute = require('./routes/Task');
const app = express(); 
const port = process.env.PORT || 5000; 




// middleware to help recognize objects as strings and array 
app.use(express.urlencoded({extended:true})); // parses incomingrequest with said payloads and its body parser based
app.use(express.json());

// routes
app.use('/users', userRoute);
app.use('/tasks', taskRoute);

// This displays message in terminal that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));