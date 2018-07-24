//load express 
    const express = require("express");
    const app = express();
    const bodyParser = require("body-parser");

    app.use(bodyParser.json());

//load mongoose
    const mongoose = require("mongoose");

    require("./Book")
    const Book = mongoose.model("Book");

    //connect
    mongoose.connect("mongodb://booksdemo:booksdemo1@ds117148.mlab.com:17148/book_db", () =>{
        console.log("Database is connected");
    });


app.get('/', (req, res)=>{
    res.send("This is the book service");
})

//this is our create func
    app.post("/book", (req, res)=>{
       var newBook = {
           title: req.body.title,
           author: req.body.author,
           numberPages: req.body.numberPages,
           publisher: req.body.publisher
       }

       //create a new book
       var book = new Book(newBook)

       book.save().then(() =>{
           console.log("new book created!")
       }).catch((err)=>{
           if(err){
               throw err;
           }
       })
       res.send("A new book created with success")
    })

    app.get("/books", (req, res) => {
        Book.find().then((books) => {
            res.json(books)
        }).catch(err =>{
            if(err){
                throw err;
            }
        })
    })

    app.get("/book/:id", (req, res) =>{
        Book.findById(req.params.id).then((book) => {

            if(book){
                res.json(book)
            }else{
                res.sendStatus(404);
            }

        }).catch(err => {
            if(err){
                throw err;
            }
        })
    })

    app.delete("/book/:id",(req, res)=>{

        Book.findOneAndRemove(req.params.id).then(()=>{
            res.send("Book removed with success!")
        }).catch(err =>{
            if(err){
                throw err;
            }
        })

    })

//connect
app.listen(3000, () =>{
    console.log("up and running! --This is our book service");
})