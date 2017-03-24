
import React, { Component  }from 'react';
import axios from 'axios';
import { store } from '../configureStore.js';



class Users extends Component {
    deleteUser = () => {
        const {id} = this.props;
        let conf = confirm("Are you sure that you want to delete this user?");
        if (conf === true) {
            axios.delete(`http://localhost:3004/users/${id}`)
                .then((response) => {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            return false;
        }
        store.dispatch({type: 'DELETE_USER', payload: id});
    }

    render() {
        console.log(this.props, 'propsus');
        return (
            <li className="UserBox">
                <button onClick={this.deleteUser}>X</button>
                <p>Name: {this.props.name}</p>
                <p>Address: {this.props.address}</p>
                <p>Phone: {this.props.number}</p>
            </li>
        );
    }
}

export default Users;