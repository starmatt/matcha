'use strict';

import 'dotenv/config';
import express from 'express';
import mysql from 'mysql';
import http from 'http';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();

// Controllers
import {default as user} from './controllers/UserController';

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect((error) => {
    if (error) throw error;

    console.log('> Database connection successful');
});

global.db = connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(process.env.APP_PORT, () => console.log(`> Started at ${process.env.APP_URL}:${process.env.APP_PORT}`));

app.post('/user/add', user.add);
app.post('/user/:id/edit', user.edit);
