// require('dotenv').config();

// const express = require('express');
// const app = express();
// const {client} = require('./database');
// const {listTables} = require('./database');


// const userRoute = require('./routes/user');
// const batchRoute = require('./routes/batch');
// const loginRoute = require('./routes/login');

// app.use('/login' , loginRoute);
// app.use('/user' , userRoute);
// app.use('/batch' , batchRoute);

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
 

// app.use('/' , (req, res)=>{
//     res.send('Hello World');
// })

// app.use('*', (req, res) => {
//     res.status(404).send('404 Not Found');
// });
  

// (
//     async ()=>{
//         try{
//             await client.connect();
//         }catch(err){
//             console.log(err);
//         }
//         // client.end();
//     }
// )();


// const port = process.env.PORT || 3005;

// app.listen(port , ()=>{
//     console.log(`Server is running on port ${port}`);
//     // listTables();
// })

const src = require('./src/index');