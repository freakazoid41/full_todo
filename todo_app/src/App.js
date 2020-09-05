import React, { Component } from 'react';
import { AnimateOnChange } from 'react-animation';
import Plib from './libraries/plib';
import 'react-notifications/lib/notifications.css';
import './App.css';
import Login from './components/login/login';
import Todo from './components/todo/todo';

import { connect } from "react-redux";
const reduxObj = {
  data: (state) =>{
      //new state has came..
      console.log(state);
      return {state:state}
  },
};


class App extends Component{
  constructor(props) {
    super(props);
    this.plib = new Plib();


    this.state = {
      isLoggedIn: false,
      message:'sdasas',
      open:'true',
    };
    
  }


  changeState(){
    this.setState({
      isLoggedIn: !this.state.isLoggedIn
    });
  }


  render(){
    const elms = {
      0:<Login/>,
      1:<Todo/>
    }
    const styles = {
      div_main:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        height:'100vh',
        textAlign: 'center',
        height: '100vh',
        width: '100%',
      }
    }
    return (
      <div style={styles.div_main}>
          <div>{JSON.stringify(this.props.state)}</div>
          <AnimateOnChange>
          { elms[Number(this.state.isLoggedIn)]}
          </AnimateOnChange>
      </div>
    );
  }



}

//export default App;
export default connect(reduxObj.data,null)(App);
