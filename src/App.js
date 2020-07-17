import React from 'react';
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import {Provider} from "react-redux";
import store from "./store";
import {BrowserRouter, Link, Route} from "react-router-dom";


class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className="grid-container">
                        <header>
                            {/*React Router a href => Link to*/}
                            <Link to="/">React Shopping Cart</Link>
                        </header>
                        <main>
                            {/*Put admin before home*/}
                            <Route path = "/admin" component={AdminScreen}/>
                            <Route path = "/" component={HomeScreen} exact/>
                            <div className="content">
                                <div className="main">
                                    <Filter/>
                                    <Products/>
                                </div>
                                <div className="sidebar">
                                    <Cart/>
                                </div>
                            </div>
                        </main>
                        <footer>All right is reserved.</footer>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;