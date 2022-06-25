const express = require('express');
const mongoose = require('mongoose');
const { run, getAllCategoryData, getAllTaskData, countTask, deleteCategory } = require('./utils')

const app = express(),
      bodyParser = require("body-parser"),
      port = 3000;


app.use(bodyParser.json());

app.get('/getAllCategoryData', (req, res) => {
    getAllCategoryData().then(data => {
        console.log(data);
        res.send(data);
    }).catch(err => {
        console.log(err);
    });

})


app.get('/getAllTaskData', (req, res) => {
    getAllTaskData().then(data => {
        console.log(data);
        res.send(data);
    }).catch(err => {
        console.log(err);
    });
})

// count of all categories wise tasks from db
app.get('/countTask', (req, res) => {
    countTask().then(data => {
        console.log(data);
        res.send(data);
    }).catch(err => {
        console.log(err);
        res.send("some error")
    });
})

// when one category is deleted. all task tied to that category to be also deleted
app.get('/deleteCategory', (req, res) => {
    deleteCategory(res);
})

app.get('/', (req,res) => {
    res.send('App Works !!!!');
});

app.get('/add-task', (req, res) => {
    // run();
    res.send('Task added !!!');

})

mongoose.connect('mongodb+srv://<ezhar>:<password>@cluster0.wc3yj.mongodb.net/test?retryWrites=true&w=majority')
const connection = mongoose.connection.once('open',() =>{
    console.log("database is connected");
    app.listen(port);
}).on('error', (err) => {
    console.log(err)
})

