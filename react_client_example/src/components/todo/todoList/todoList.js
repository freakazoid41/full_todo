import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';


export default class TodoList extends Component {
    constructor(props){
        super(props);
        //state elements
        
        this.state = {
            ck_1:{
                checked:true,
                name:'falan'
            },
            ck_2:{
                checked:false,
                name:'boyle'
            }
        };
    }



    render(){
        return  <List component="nav"  aria-label="contacts">
                    {
                        //foreach key in object list
                        Object.keys(this.state).map((key, index) => {
                            //return list item foreach one
                            return  <ListItem button key={key}>
                                        <Checkbox
                                            defaultChecked={this.state[key].checked}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />
                                        <ListItemText primary={this.state[key].name} />
                                        <IconButton variant="outlined" color="secondary" aria-label="delete">
                                            <DeleteRoundedIcon/>
                                        </IconButton>
                                    
                                    </ListItem>
                        })
                    }
                </List>
        
    };
}
