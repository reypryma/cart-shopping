import React from 'react';
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import {Provider} from "react-redux";
import store from "./store";


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            products: data.products,
            size: "",
            sort: "",
            cartItems: localStorage.getItem("cartItems")
                ? JSON.parse(localStorage.getItem("cartItems")) : [],
        }
    }

    addToCart = (product) => {
        const cartItems = this.state.cartItems.slice();
        let alreadyInCart = false;
        cartItems.forEach((item) => {
            if (item._id === product._id) {
                item.count++;
                alreadyInCart = true;
            }
        });
        if (!alreadyInCart) {
            cartItems.push({...product, count: 1});
        }
        this.setState({cartItems});
        //checkout : data persistent after refresh
        localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems))
    };

    removeFromCart = (product) => {
        const cartItems = this.state.cartItems.slice();
        this.setState(
            {
                cartItems: cartItems.filter(
                    (x) => x._id !== product._id
                )
            }
        );
        //Checkout : make data cart item persistent
        localStorage.setItem("cartItems", JSON.stringify(
            cartItems.filter(x => x._id !== product._id)
        ))
    };

    //Checkout Logic
    createOrder = (order) => {
        alert("Need to save order for " + order.name);
    };

    render() {
        return (
            <Provider store={store}>
                <div className="grid-container">
                    <header className="">
                        <header>
                            <a href="/">React Shopping Cart</a>
                        </header>
                    </header>
                    <main>
                        <div className="content">
                            <div className="main">
                                <Filter/>
                                <Products products={this.state.products}
                                          addToCart={this.addToCart}
                                />
                            </div>
                            <div className="sidebar">
                                <Cart cartItems={this.state.cartItems}
                                      removeFromCart={this.removeFromCart}
                                      createOrder={this.createOrder}
                                />
                            </div>
                        </div>
                    </main>
                    <footer>
                        All right is reserved
                    </footer>
                </div>
            </Provider>
        );
    }
}

export default App;