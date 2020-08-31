import { Component } from "react";

import React from 'react';
import List from './list/list';
import Head from './head/head';

export default class Todo extends Component{
    render(){
        return (
            <div>
                <Head/>
                <List/>
            </div>
        );
      }
}