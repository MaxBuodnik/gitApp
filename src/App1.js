import React, { Component } from 'react';
import './App.css';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
// import { composeWithDevTools } from 'redux-devtools-extension';
// const initialState = [{
//     name: 'Jack',
//     address: 'Lviv',
//     number: 123333
// },
// {
//     name: 'Bobby',
//     address: 'Dnipro',
//     number: 777777

// }];



const reducer = (
  state = [], action) => {
   if (action.type === 'GET_USER') {
     return [
      ...state,
      action.payload
     ];
   }
   if (action.type ===  'ADD_USER') {
      // return [
      // ...state,
      // action.payload
      // ]
      return Object.assign({}, state, {
        userStore: action.payload
      })
   }
   return state;
 }
  
export const store = createStore(reducer)

const getUsersAction = () => {
  axios.get('http://localhost:3000/users')
        .then((response) => {
          console.log(response, 'response');
        // initialState.push(response.data)
        store.dispatch({ type: 'GET_USER', payload: response.data });
        })
        .catch((error) => {
          console.log(error);
   })
}









window.test = store
store.subscribe(() => {
  console.log("subscribe", store.getState());
})

console.log(store.getState());

// store.dispatch({ type: 'ADD_USER', payload: {"name": 'Kuks', "address": 'Upiter', "number": '787878'}});

const Users = React.createClass({
  render() {
    return (
    <li>
        <p>Name: {this.props.name}</p>
        <p>Address: {this.props.address}</p>
        <p>Phone: {this.props.number}</p>
    </li>
    );
  }
})

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
  // changeHandler = (e) => {
  //   this.setState({
  //   name: e.target.value,
  //   address: e.target.value,
  //   number: e.target.value
  //   });
  //   console.log(this.state.name, "TADADAM")
  //   console.log(this.state.address, "TADADAM")
  //   console.log(this.state.number, "TADADAM")
  // } 




  collectUsers = () => {
    // e.prieventDefault();
      // let addusers = this.state.addedItems;
      let newUser = {
        name: this.state.name, 
        address: this.state.address,
        number: this.state.number
        };
      store.dispatch({ type: 'ADD_USER', payload: newUser });
      axios.post('http://localhost:3000/users', newUser)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  // submitHandler = (e) => {
  //   // update redux state 
    

  //   e.prieventDefault();
  //   const payload = {
  //     name: this.state.name,
  //     address: this.state.address,
  //     number: this.state.number,
  //   };
  //   store.dispatch({ type: 'ADD_USER', payload: payload
  //    })
  // }
  render() {
    console.log(this.state.name, "NAME");
    console.log(this.state.address, "ADDRESSS");
    console.log(this.state.number, "NUMBER");
    return(
      <div> 
        <input type='text' name="name" placeholder='NAME' value={this.state.inputName} onChange={this.handleInputChange} />
        <input type='text' name="address" placeholder='ADDRESS' value={this.state.value} onChange={this.handleInputChange} />
        <input type='text' name="number" placeholder='PHONE' value={this.state.value} onChange={this.handleInputChange} />
        <button id='one' onClick={this.collectUsers}>Add user</button>
      </div>
      )
   }
}



class App extends Component {
  componentWillMount() {
    //call get user action
    getUsersAction();
  }


  // submit() {
  //   console.log("TRALALALALA", this.nameInput.value, this.addressInput, this.phoneInput)
  // }

  render() {
    console.log(this.props.userStore, 'user store')
    let userList = [];
    if (this.props.userStore) {
        this.props.userStore.map((el, index) => {
        userList.push(<Users key={index} name={el.name} address={el.address} number={el.number} />)
      });
    }
      return (
        <div className="App">
        <InputComponent />
      
        {userList}

       </div>
    );
  }
}

export default connect(
  state => ({ 
    userStore: state.userStore 
  }),
  dispatch => ({})
  )(App);

