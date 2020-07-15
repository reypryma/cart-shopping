const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

//create web server
const app = express();
app.use(bodyParser);

//init db
mongoose.connect("mongodb://localhost/react-shopping-cart-db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true,
});

// creating model, param 1 is collection inside db
//param 2 is list of fields
const Product = mongoose.model("products",
    new mongoose.Schema({
        _id : {type: String, default: shortid.generate},
        title : String,
        description : String,
        image : String,
        price : Number,
        availableSizes : [String]
}));

//End point with respondent
app.get("/api/products", async (req, res)=>{
    const products = await Product.find({});
    res.send(products);
});

app.post("/api/products", async (req,res) =>{
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
});


app.delete("/api/products/:id", async (req, res) =>{
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct)
});


//launch server
const port = process.env.Port || 5000;
app.listen(port,()=>console.log("serve at localhost:5000"));