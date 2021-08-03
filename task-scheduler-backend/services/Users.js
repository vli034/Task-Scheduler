const sql = require('../config/dbconfig');

const User = function(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
}
sql.connect((err) =>{
    if (err) throw err;
    console.log("Succesfully connected to the database");
});


User.createUser = (newUser, result) =>{
    sql.query("INSERT INTO Users (FirstName, LastName) VALUE ('Lucas', 'Test');", newUser , (err, res) =>{
        if(err){
            console.log("ERROR: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
        }

    });

};

// Customer.create = (newCustomer, result) => {
    
//     sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(err, null);
//         return;
//       }
  
//       console.log("created customer: ", { id: res.insertId, ...newCustomer });
//       result(null, { id: res.insertId, ...newCustomer });
//     });
//   };
  

//   module.exports = Customer;