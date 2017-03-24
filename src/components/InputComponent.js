import React, { Component  }from 'react';
import axios from 'axios';
import { store } from '../configureStore';


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
        };

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
        let displayedUsers = this.props.userStore.filter( (el) => {
            let searchValue = el.name.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
        });
        if (searchQuery === ' ') {
            store.dispatch({ type: 'FILTER_LIST', payload: test });
        }
        console.log(displayedUsers, "TADADAM");
        this.filterUsers(displayedUsers);
    }


    filterUsers = (user) => {
        console.log(user, ' the user')
        //  console.log(this.searchQuery.bind(this), "BIMBO")
        let query = (z) => { let datus = z.target.value };
        console.log(query, "BOBOBO");
        if ( this.query ===  " ") {
            this.setState({
                userStore: "HELLO!"
            })
        }
        store.dispatch({ type: 'FILTER_LIST', payload: user });

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

export default InputComponent;