import './App.css';
import { connect } from 'react-redux';
import * as actions from './actions';
import  App  from  './components/MainComponent';




const mapStateToProps = (state) => {
    console.log(state);
    return {
        userStore: state.userStore
    };

}
const mapDispatchToProps = {
    getUsersAsync: actions.getUsersAsync
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(App);
