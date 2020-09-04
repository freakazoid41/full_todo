import React, { Component } from 'react';
import { AnimateOnChange } from 'react-animation'
import Plib from './libraries/plib';
import './App.css';
import Login from './components/login/login';
import Todo from './components/todo/todo';



class App extends Component{
  constructor(props) {
    super(props);
    this.plib = new Plib();


    this.state = {isLoggedIn: false};
    this.groupProps = {
      appear: false,
      enter: true,
      exit: true,
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
        <AnimateOnChange>
        { elms[Number(this.state.isLoggedIn)]}
        </AnimateOnChange>
      </div>
    );
  }



}

export default App;
