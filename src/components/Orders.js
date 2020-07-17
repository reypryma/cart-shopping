import React, {Component} from 'react';
import {fetchOrders} from "../actions/orderActions";
import {connect} from "react-redux";
import formatCurrency from "../utils/util";

class Orders extends Component {
    componentDidMount(): void {
        this.props.fetchOrders();
    }

    render() {
        const {orders} = this.props;
        return (
            !orders ?
            <div>
                Order
            </div>
                :
                <div className="orders">
                    <h2>Order</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADDRESS</th>
                            <th>ITEMS</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order) => (
                            <tr>
                                <td>{order._id}</td>
                                <td>{order.createdAt}</td>
                                <td> {formatCurrency(order.total)}</td>
                                <td>{order.name}</td>
                                <td>{order.email}</td>
                                <td>{order.address}</td>
                                <td>
                                    {order.cartItems.map((item) => (
                                        <div>
                                            {item.count} {" x "} {item.title}
                                        </div>
                                    ))}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
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