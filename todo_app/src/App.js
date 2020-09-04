import React, { Component } from 'react';
import './App.css';
import { AnimateOnChange } from 'react-animation'
import Login from './components/login/login';
import Todo from './components/todo/todo';



import Button from '@material-ui/core/Button';
class App extends Component{
  constructor(props) {
    super(props);
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
