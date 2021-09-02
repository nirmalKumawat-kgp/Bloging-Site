const express = require('express');
const { result } = require('lodash');
const mongoose = require('mongoose');
const app = express();
const blogRoutes = require('./routes/blogRoutes.js');

// connecting to mongoDB

const dbURI = 'mongodb+srv://nirmalKumawat:nirmal2002@cluster0.gpjjq.mongodb.net/data?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser:true, useUnifiedTopology: true})
.then((result)=> app.listen(3000))
.catch((err)=> {console.log(err)});
// set engine
app.set('view engine', 'ejs');

//listening to requests


//making css public
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));

//Basic Routing
app.get('/', (req,res) =>{
    res.redirect('/blogs');
});
app.get('/about',(req,res)=>{
    res.render('about',{title : 'About'});
});
app.get('/about-me',(req,res)=>{
    res.redirect('/about');
});

// blogs-routes
app.use(blogRoutes);

// if nothing mathces
app.use((req,res) =>{
    res.status(404).render('404',{title : '404'});
});
