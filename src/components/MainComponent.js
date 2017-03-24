import React, { Component  }from 'react';
import  Users  from './Users.js';
import  InputComponent from './InputComponent';


class App extends Component {
    componentDidMount() {
        const { getUsersAsync } = this.props;
        getUsersAsync();
    }

    render() {
        const { userStore } = this.props;

        const showUsers = (
            userStore.map(( { name, address, number, id } ) => (
                <Users key={`item-${id}`} name={name} address={address} number={number} id={id} />
            ))
        );
        return (
            <div className="App">
                <InputComponent userStore={userStore} filterUsers={this.filterUsers} />
                {showUsers}
            </div>
        )
    }
}



export default App;