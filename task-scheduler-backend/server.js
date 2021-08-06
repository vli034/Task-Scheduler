const express = require('express'); 
const userRoute = require('./routers/Users');
const taskRoute = require('./routers/Task');
const app = express(); 
const port = process.env.PORT || 5000; 

// middleware to help recognize objects as strings and array 
app.use(express.urlencoded({extended:true})); // parses incomingrequest with said payloads and its body parser based
app.use(express.json());

// rooutes
app.use('/users', userRoute);
app.use('/tasks', taskRoute);


// This displays message in terminal that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));