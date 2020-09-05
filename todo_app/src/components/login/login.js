import React, { Component } from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Plib from '../../libraries/plib';
import { setSession } from '../../redux/actions';
import { connect } from "react-redux";


const reduxObj = {
    data: (state) =>{
        //new state has came..
        console.log(state);
        return {state:state}
    },
    events:(dispatch) =>{
        //triggable events list
        return {setSession:(data) => dispatch(setSession(data))}
    }
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.plib = new Plib();
        this.state = { 
            username: '',
            password:''
        };
        
        /*store.subscribe(() => {
            console.log('subscribe triggered..');
            console.log(store.getState());
        });*/
    }


    myChangeHandler = (e) => {
        this.state[e.target.name] = e.target.value;
        this.setState(this.state);
    }

    async login(){
        console.log('clicked');
        const rsp = await this.plib.request({
            'url':'login',
            'method':'POST',
            'data':this.state
        });
        if(rsp.rsp){
            //logged in
            this.props.setSession(rsp.data);
            //store.dispatch(setSession(rsp.data));
        }else{
            NotificationManager.warning('User not exist !!');
        }
        //console.log(rsp);
    }


    render(){
        const styles = {
            button:{
                marginTop:'15px',
                height:'60px'
            }
        };
        return (
            <Container component="main"  maxWidth="xs" ref={this.wrapper}>
                <Card variant="outlined">
                    <CardContent>
                        <h5>
                        Sign in {JSON.stringify(this.props.state)}
                        </h5>
                    
                        <TextField
                            {...(this.state.username.trim() === '' ? {error: true} : {})}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            name="username"
                            onChange={this.myChangeHandler}
                        />
                        <TextField
                            {...(this.state.password.trim() === '' ? {error: true} : {})}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            onChange={this.myChangeHandler}
                        />
                        
                        <Button
                            onClick={this.login.bind(this)}
                            style={styles.button}
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary">
                            Sign In
                        </Button>
                    </CardContent>
                </Card>
                <NotificationContainer/>
            </Container>
        );
    }
}

//export default  Login;
export default connect(reduxObj.data,reduxObj.events)(Login);