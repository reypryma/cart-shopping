import React from 'react';
import formatCurrency from "../utils/util";
import Fade from 'react-reveal/Fade'
import {connect} from "react-redux";
import {removeFromCart} from "../actions/cartActions";

class Cart extends React.Component {
    static navigationOptions = {title: null,};

    constructor(props) {
        super(props);
        //by default dont show
        this.state = {
            showCheckout: false,
            name: "",
            email: "",
            address: "",
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
        };
        this.props.createOrder(order);
    };

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    render() {
        const {cartItems} = this.props;
        return (
            <div>
                {cartItems.length === 0 ? (
                    <div className="cart cart-header">
                        Cart is empty
                    </div>
                ) : (
                    <div className="cart cart-header">
                        You have {cartItems.length} in the cart{" "}
                    </div>
                )}
                <div>
                    <div className="cart">
                        <Fade bottom cascade>
                            <ul className="cart-items">
                                {cartItems.map(
                                    item => (
                                        <li key={cartItems._id}>
                                            <div>
                                                <img src={item.image} alt={item.title}/>
                                            </div>
                                            <div>
                                                <div>
                                                    {item.title}
                                                </div>
                                                <div className="right">
                                                    {formatCurrency(item.price)}x{item.count}{" "}
                                                    <button className="button"
                                                            onClick={() => this.props.removeFromCart(item)}>
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                )}
                            </ul>
                        </Fade>
                    </div>
                </div>
                {cartItems.length !== 0 && (
                    <div className="">
                        <div className="cart">
                            <div className="total">
                                <div>
                                    Total: {" "}
                                    {
                                        formatCurrency(
                                            cartItems.reduce(
                                                (a, current) =>
                                                    a + current.price * current.count, 0
                                            )
                                        )
                                    }
                                </div>
                                <button onClick={() => {
                                    this.setState({
                                        showCheckout: true
                                    })
                                }} className="button primary">Proceed
                                </button>
                            </div>
                        </div>
                        {
                            this.state.showCheckout && (
                                <div className="cart">
                                    <form action="" onSubmit={this.createOrder}>
                                        <Fade top cascade>
                                            <ul className="form-container">
                                                <li>
                                                    <label htmlFor="">
                                                        Name
                                                    </label>
                                                    <input name="name" type="text" required
                                                           onChange={this.handleInput}/>
                                                </li>
                                                <li>
                                                    <label htmlFor="">
                                                        Email
                                                    </label>
                                                    <input name="email" type="email" required
                                                           onChange={this.handleInput}/>
                                                </li>
                                                <li>
                                                    <label htmlFor="">
                                                        Address
                                                    </label>
                                                    <input name="address" type="text" required
                                                           onChange={this.handleInput}/>
                                                </li>
                                                <li>
                                                    <button className="button primary" type="submit">Checkout</button>
                                                </li>
                                            </ul>
                                        </Fade></form>
                                </div>
                            )
                        }
                    </div>
                )}
            </div>
        );
    }
}

export default connect((state) => ({
        cartItems: state.cart.cartItems,
    }),
    {removeFromCart}
)(Cart);