import { Component } from "react";

import React from 'react';
import TodoList from './todoList/todoList';
import TodoHead from './todoHead/todoHead';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';

export default class Todo extends Component{
    
    getCss(){
        return {
            div_main:{
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'center',
                height:'100vh',
                textAlign: 'center',
                height: '100vh',
                width: '100%',
            },
            main_card:{
                width: '50vh'
            }
        }
    }


    render(){
        const styles = this.getCss();
        return (
            <Container component="main"  maxWidth="xl">
                <div style={styles.div_main}>
                    <Card variant="outlined" style={styles.main_card}>
                        <CardContent>
                            <TodoHead/>
                            <TodoList/>
                        </CardContent>
                    </Card>
                </div>
            </Container>
        );
      }
}