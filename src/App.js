import React from 'react';
import data from "./data.json";

class App extends React.Component{

    constructor() {
        super();
        this.state = {
            products:data.products,
            size:"",
            sort:"",
        }
    }

    render() {
      return (
          <div className="grid-container">
              <header className="">
                  <header>
                      <a href="/">React Shopping Cart</a>
                  </header>
              </header>
              <main>
                  <div className="content">
                      <div className="main">
                        Products
                      </div>
                      <div className="sidebar">
                          Cart Items
                      </div>
                  </div>
              </main>
              <footer>
                  All right is reserved
              </footer>
          </div>
      );
  }
}

export default App;