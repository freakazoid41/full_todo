import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

const styles = {
    input_div:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
    },
}

const TodoHead = ()=>{
    return  <div style={styles.input_div}>
                <TextField id="outlined-basic" style={{width: '100%'}}/> 
                <IconButton color="primary" aria-label="add to shopping cart">
                    <AddIcon />
                </IconButton>
            </div>
}

export default TodoHead;


