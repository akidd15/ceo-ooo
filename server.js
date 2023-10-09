const mysql = require('mysql12');
const express = require('express');
const hide = require('hide-secrets');
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "company_db"
    },
    console.log("Connected to company_db!")
);