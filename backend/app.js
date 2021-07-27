import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

//Configs
dotenv.config()
const app = express()

//Routes
import noteRoute from './routes/noteRoute.js';
import notFoundRoute from './routes/404.js'

//Middlewares
app.use(bodyParser.json());
app.use('/api', noteRoute);
app.use('*', notFoundRoute);


await mongoose.connect(process.env.DB_CONNECTION, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
);
app.listen(process.env.PORT , () => console.log(`Server Is Running On http://localhost:${process.env.PORT}`));