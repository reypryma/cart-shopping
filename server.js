let express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

//create web server
const app = express();
//fix save body as json
app.use(bodyParser.json());

//Deploy: To render static file inside build file
//Wherever this static file inside build will render as url / address
app.use("/", express.static(__dirname + "/build"));
app.get("/", (req, res) => res.sendFile(__dirname + "/build/index.html"));

//init db
mongoose.connect("mongodb://localhost/react-cart-db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

// creating model, param 1 is collection inside db
//param 2 is list of fields
const Product = mongoose.model(
    "products",
    new mongoose.Schema({
        _id: {type: String, default: shortid.generate},
        title: String,
        description: String,
        image: String,
        price: Number,
        availableSizes: [String],
    })
);

//End point with respondent
app.get("/api/products", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

app.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
});

app.delete("/api/products/:id", async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
});

//Order api
const Order = mongoose.model(
    "order",
    new mongoose.Schema(
        {
            _id: {
                type: String,
                default: shortid.generate,
            },
            email: String,
            name: String,
            address: String,
            total: Number,
            cartItems: [
                {
                    _id: String,
                    title: String,
                    price: Number,
                    count: Number,
                },
            ],
        },
        {
            timestamps: true,
        }
    )
);

app.post("/api/orders", async (req, res) => {
    if (
        !req.body.name ||
        !req.body.email ||
        !req.body.address ||
        !req.body.total ||
        !req.body.cartItems
    ) {
        return res.send({ message: "Data is required." });
    }
    const order = await Order(req.body).save();
    res.send(order);
});
app.get("/api/orders", async (req, res) => {
    const orders = await Order.find({});
    res.send(orders);
});
app.delete("/api/orders/:id", async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.send(order);
});

//launch server
const port = process.env.PORT || 5000;

app.listen(port, "localhost", () => {
    console.log('App listening on http://localhost:' + port);
});