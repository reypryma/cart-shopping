import React from 'react';
import {Provider} from "react-redux";
import store from "./store";
import {BrowserRouter, Link, Route} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AdminScreen from "./screens/AdminScreen";


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
                        </main>
                        <footer>All right is reserved.</footer>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;