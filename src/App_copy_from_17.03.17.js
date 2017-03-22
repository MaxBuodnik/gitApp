import React, { Component } from 'react';
import './App.css';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import axios from 'axios';
//import _ from 'lodash';
// import reducer from './reducer';


const reducer = (state = { userStore: [] }, action) => {
   if (action.type === 'GET_USER_LIST') {
      return update(state, {
        userStore: { $set: action.payload }
      });
   }

   if (action.type === 'ADD_USER') {
      return update(state, {
        userStore: { $push: [action.payload] }
      });
   }

   if (action.type === 'DELETE_USER') {
    const index = state.userStore.findIndex(item => item.id === action.payload);
    return update(state, {
      userStore: { $splice: [[index, 1]] }
    });
   }
    return state;
 }


export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const getUsers = (callback) => {
  axios.get('http://localhost:3004/users')
        .then((response) => {
          console.log(response, 'response');
        // initialState.push(response.data)
        store.dispatch({ type: 'GET_USER_LIST', payload: response.data });
        callback(response.data)
        })
        .catch((error) => {
          console.log(error);
   })
}


class Users extends Component {
    deleteUser = () => {
      const { id } = this.props;
        let conf = confirm("Are you sure that you want to delete this user?");
        if (conf === true) {
            axios.delete(`http://localhost:3004/users/${id}`)
                .then( (response) => {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
                }else{
            return false;
        }
        store.dispatch({ type: 'DELETE_USER', payload: id });
    }

    render() {
      console.log(this.props, 'propsus')
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

class InputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      number: ''
    };
    //this.changeHandler = this.changeHandler.bind(this);
    this.collectUsers = this.collectUsers.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
   handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });

console.log(event.target.value);

}

    // adding new user
   collectUsers = (event) => {
      event.preventDefault();

      const newUser = {
        name: this.state.name,
        address: this.state.address,
        number: this.state.number
        }
      if(newUser.name!=='' && newUser.address!=='' && newUser.number!=='') {
          axios.post('http://localhost:3004/users', newUser)
          .then( ({ data }) => {
            store.dispatch({ type: 'ADD_USER', payload: data });
          })
          .catch( (error) => {
            console.log(error);
          });
        // clearing the inputs
        this.formBox.reset();
      //  this.props.userStore;

    // if() {

    } else {
      alert("Fill in all input fields, please!");
    }
  }

  handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    console.log(this.props, 'searchValue')
    let displayedUsers = this.props.userStore.filter( (el) => {
      let searchValue = el.name.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
    });

    this.props.filterUsers(displayedUsers);
  }

  render() {
    return(
      <form className={'form-container'} ref={el => this.formBox = el }>
        <input type='text' name="name" ref={inName => this.inputName = inName} placeholder='NAME' value={this.state.value} onChange={this.handleInputChange} />
        <input type='text' name="address" placeholder='ADDRESS' value={this.state.value} onChange={this.handleInputChange} />
        <input type='text' name="number" placeholder='PHONE' value={this.state.value} onChange={this.handleInputChange} />
        <button className={"findUser"} onClick={this.collectUsers}>Add user</button>
        <input type='text' name='search' placeholder='FIND USER' value={this.state.value} onChange={this.handleSearch} />
      </form>
      )
   }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedUsers: []
    }
  }
  componentWillMount() {
    //call get user action
    getUsers((d) => {
      this.setState({
        displayedUsers: d
      });
      //return this.displayedUsers;
    });
   // displayedUsers: this.props.userStore;

  }
  filterUsers = (users) => {
    this.setState({
      displayedUsers: users
    });
  }
  render() {

  //const { userStore } = this.props;

  const showUsers = (
      this.state.displayedUsers.map(( { name, address, number, id } ) => (
        <Users key={`item-${id}`} name={name} address={address} number={number} id={id} />
      ))
    );
      return (
        <div className="App">
        <InputComponent userStore={this.props.userStore} filterUsers={this.filterUsers} />
        {showUsers}
       </div>
    )
  }
}

export default connect(
  state => ({
    userStore: state.userStore
  }),
  dispatch => ({
    // onDeleteUser: (wrongUser) => {
    //   dispatch({ type: 'DELETE_USER', payload: wrongUser });
    // }
    // CollectUsers: (newUser) => {
    //   dispatch({ type: 'ADD_USER', payload: newUser})
    // }
  })
  )(App);
