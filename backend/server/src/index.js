const express = require('express');
const app = express();
const { PORT } = require('./constants');
const cors = require('cors');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const authRoutes = require(path.join(__dirname, 'routes/auth'));
const batchRoutes = require(path.join(__dirname, 'routes/batch'));
const courseRoutes = require(path.join(__dirname, 'routes/course'));
const studentRoutes = require(path.join(__dirname, 'routes/student'));


app.use('/api/auth', authRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/students' , studentRoutes);


// app start
const appStart = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            
            // Now logging available routes after the server starts
            console.log("Available Routes:");
            app._router.stack.forEach((r) => {
                if (r.route && r.route.path) {
                    console.log(`${r.route.stack[0].method.toUpperCase()} ${r.route.path}`);
                }
            });
        });
    } catch (error) {
        console.log(`Server is not running due to ${error}`);
    }
};

appStart();
