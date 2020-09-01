import { Component } from "react";

import React from 'react';
import TodoList from './todoList/todoList';
import TodoHead from './todoHead/todoHead';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import './todo.css';

export default class Todo extends Component{
    render(){
        return (
            <Container component="main"  maxWidth="xl">
                <div className="div_main">
                    <Card variant="outlined" className="main_card">
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