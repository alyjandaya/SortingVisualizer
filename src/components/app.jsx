import React, { Component } from 'react';
import {Filter} from './Filter';
import {ChartSort} from './ChartSort';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1 className="page-header">Sorting Visualizer</h1>
        <h4 className="sub-header">Select Inputs </h4>
        <Filter />
        <h4 className="sub-header">Sorting Graph</h4>
        <ChartSort />
       </div> 
    );
  }
}
