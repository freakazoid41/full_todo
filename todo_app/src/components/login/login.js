import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';





class Login extends Component {
    getCss(){
        return {
            div_main:{
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'center',
                height:'100vh'
            },
            button:{
                marginTop:'15px',
                height:'60px'
            }
        }
    }


    render(){
        const styles = this.getCss();
        return (
            <Container component="main"  maxWidth="xs">
            <div style={styles.div_main}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography component="h1" variant="h5">
                        Sign in
                        </Typography>
                    
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        
                        <Button
                            style={styles.button}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary">
                            Sign In
                        </Button>
                    </CardContent>
                </Card>
            </div>
           
            </Container>
        );
    }
}

export default Login;