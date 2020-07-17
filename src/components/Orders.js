import React, {Component} from 'react';
import {fetchOrders} from "../actions/orderActions";
import {connect} from "react-redux";

class Orders extends Component {
    render() {
        return (
            <div>
                Order
            </div>
        );
    }
}

export default connect(
    (state) => ({
        orders: state.order.orders,
    }),
    {
        fetchOrders,
    }
)(Orders);