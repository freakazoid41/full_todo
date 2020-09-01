import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import './todoHead.css';


const TodoHead = ()=>{
    return (<div className="input_div">
                <TextField id="outlined-basic" fullWidth='true'/> 
                <IconButton color="primary" aria-label="add to shopping cart">
                    <AddIcon />
                </IconButton>
            </div>)
}

export default TodoHead;


