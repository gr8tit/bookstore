const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose") 
const axios = require("axios")

app.use(bodyParser.json())

mongoose.connect("mongodb://orderdb:order_1@ds145871.mlab.com:45871/order_db", () =>{
    console.log("Database connected")
 })

//model is loaded
require("./Order")
const Order = mongoose.model("Order")

//will create a new order
app.post("/order", (req, res) =>{
    var newOrder = {
        CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
        BookID: mongoose.Types.ObjectId(req.body.BookID),
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate
    }
    var order = new Order(newOrder)

    order.save().then(() => {
        res.send("Order created with success!")
    }).catch((err)=>{
        if(err){
            throw err
        }
    })
})

app.get("/orders", (req, res)=>{

    Order.find().then((books) =>{
        res.json(books)
    }).catch((err)=>{
        if(err){
            throw(err)
        }
    })
})

app.get("/order/:id", (req, res) =>{

    Order.findById(req.params.id).then((order)=> {
        if(order){

            axios.get("http://localhost:4545/customer/" + order.CustomerID).then((response) =>{
                
                var orderObject ={customerName: response.data.name, bookTitle: ''}

                axios.get("http://localhost:3000/book/" + order.BookID).then((response) =>{
                    
                    orderObject.bookTitle = response.data.title
                    res.json(orderObject)
                })
            })
        
        }else{
            res.send("Invalid order")
        }
    })
})

app.listen(5555, () =>{
    console.log("Up and running -orders service")
})