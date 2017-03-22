import React, { Component } from 'react';
import './App.css';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import axios from 'axios';
import _ from 'lodash';


const reducer = (
  state = {
     userStore: []
  }, action) => {
   if (action.type === 'GET_USER_LIST') {
      return update(state, {
        userStore: { $set: action.payload }
      });
   }

   if (action.type === 'ADD_USER') {
      return update(state, {
        userStore: {
          $push: [action.payload]
        }
      });
   }

   if (action.type === 'DELETE_USER') {
    const index = state.userStore.findIndex(item => item.id === action.payload);
    return update(state, {
      userStore: {
        $splice: [[index, 1]]
      }
    });
   }
   return state;
 }
  

export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const getUsers = () => {
  axios.get('http://localhost:3000/users')
        .then((response) => {
          console.log(response, 'response');
        // initialState.push(response.data)
        store.dispatch({ type: 'GET_USER_LIST', payload: response.data });
        })
        .catch((error) => {
          console.log(error);
   })
}

 
class Users extends Component {
    deleteUser = () => {
      const { id } = this.props;
      axios.delete(`http://localhost:3000/users/${id}`)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        }); 

      store.dispatch({ type: 'DELETE_USER', payload: id });
    }

    render() {
      console.log(this.props, 'props')
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

    }


    // adding new user
   collectUsers = (event) => {
      event.preventDefault();

      let newUser = {
        name: this.state.name, 
        address: this.state.address,
        number: this.state.number
        }
      if(newUser.name!=='' && newUser.address!=='' && newUser.number!=='') {
          axios.post('http://localhost:3000/users', newUser)
          .then(function ({ data }) {
            store.dispatch({ type: 'ADD_USER', payload: data });
          })
          .catch(function (error) {
            console.log(error);
          }); 
        // clearing the inputs
        this.formBox.reset();
        this.setState({
        name: '',
        address: '',
        number: '',
      });
    
    // if() {

    } else {
      alert("Fill in all input fields, please!");
    }
  }

    // FilterUsers = () => {
    //     return {
    //       displayUsers: this.getState.userStore
    //     }
    //   },
    // HandleUsers = (e) => {
    //   let searchQuery = e.target.value.toLowerCase();
    //   let displayUsers = userStore.filter((el) => {
    //     let searchValue = el.name
    //     return 
    //   })
    // } 

  // findUser = () => {
  //   getInitialState() => {
  //     return {
  //       displayedUsers: userStore
  //     };
  //   }
  // },

  // hanleSearch = (e) => {
  //   const searchQuery = e.target.value.toLowerCase();
  //   let displayedUsers = userStore.filter( (el) => {
  //     let searchValue = el.name.toLowerCase();
  //     return searchValue.indexOf(searchQuery) !== -1;
  //   });
  //   this.setState({
  //     displayedUsers: displayedUsers
  //   });
  // },

  render() {
    return(
      <form className={'from-container'} ref={el => this.formBox = el }> 
        <input type='text' name="name" placeholder='NAME' value={this.state.inputName} onChange={this.handleInputChange} />
        <input type='text' name="address" placeholder='ADDRESS' value={this.state.value} onChange={this.handleInputChange} />
        <input type='text' name="number" placeholder='PHONE' value={this.state.value} onChange={this.handleInputChange} />
        <button id='one' onClick={this.collectUsers}>Add user</button>
      </form>
      )
   }
}

// class ourUsers extends Component{
//  showUsers = () => 
//   render() {
//     return this.showUsers;
//   }
// }


class App extends Component {
  componentWillMount() {
    //call get user action
    getUsers();
  }


  // submit() {
  //   console.log("TRALALALALA", this.nameInput.value, this.addressInput, this.phoneInput)
  // }


  render() {
    const { userStore } = this.props;

      return (
        <div className="App">
        <InputComponent />
        {userStore.map(({ name, address, number, id }, index) => (
            <Users key={`item-${id}`} name={name} address={address} number={number} id={id} />
          ))};
        

       </div>
    );
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

