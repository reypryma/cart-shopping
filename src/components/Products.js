import React from 'react';
import formatCurrency from "../utils/util";

class Products extends React.Component {
    static navigationOptions = {title: null,};

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div>
                <ul className="products">
                    {/*get the list of products as props from parent component*/}
                    {this.props.products.map(product => (
                        <li key={product._id}>
                            <div className="product">
                                <a href={"#" + product._id}>
                                    <img src={product.image} alt={product.title}/>
                                    <p>
                                        {product.title}
                                    </p>
                                </a>
                                <div className="product-price">
                                    <div>
                                        {formatCurrency(product.price)}
                                    </div>
                                    <button className="button primary"
                                            onClick={()=>this.props.addToCart(product)}>
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Products;