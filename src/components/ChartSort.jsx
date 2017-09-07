import React, { Component } from 'react';
import { connect } from 'react-redux';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

let arrayLength;

class ChartSort extends Component {
  constructor(props) {
    super(props);
    let data = _.range(1, 10).map((val) => {return {sort: val}})
    this.state = { sortingData: data, sorted: true, shuffled: false};
    
    this.generateRandom = this.generateRandom.bind(this);
    this.sortData = this.sortData.bind(this);    
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }
  
  generateRandom() {
    const max = this.props.inputFilter == null ? 0 : this.props.inputFilter.value;      
    let data =  _.range(1, max).map((val) => {return {sort: val}});
    this.setState({ sortingData: this.shuffleArray(data), sorted: false});
  }

  bubbleSort(arr, i) {
    for(let j = 0 ; j < arr.length - i - 1; j++) { 
      if (arr[j].sort > arr[j + 1].sort) {
        // swap
        let temp = arr[j];
        arr[j] = arr[j+1];
        arr[j + 1] = temp;

        let arr2=[...arr];
        this.setState({ sortingData: arr2});
      }
     }
  }

  selectionSort(arr, i) {
    let min = i;
    for(let j = i+1; j < arr.length; j++){
      if(arr[j].sort < arr[min].sort){
       min = j;
      }
    }
    let temp = arr[i];
    arr[i] = arr[min];
    arr[min] = temp;

    let arr2=[...arr];
    this.setState({ sortingData: arr2});
  }

  insertionSort(arr, i) {
    let value = arr[i]
    for (var j = i - 1; j > -1 && arr[j].sort > value.sort; j--) {
      arr[j + 1] = arr[j]
    }
    arr[j + 1] = value;
    let arr2=[...arr]
    this.setState({ sortingData: arr2})
  }

  mergeSort(arr) {
      if (arr.length < 2)
          return arr;
   
      let middle = parseInt(arr.length / 2);
      let left   = arr.slice(0, middle);
      let right  = arr.slice(middle, arr.length);
   
      return this.merge(this.mergeSort(left), this.mergeSort(right));
  }
   
  merge(left, right) {
      let result = [];
   
      while (left.length && right.length) {
          if (left[0].sort <= right[0].sort) {
              result.push(left.shift());
          } else {
              result.push(right.shift());
          }
      }
   
      while (left.length)
          result.push(left.shift());
   
      while (right.length)
          result.push(right.shift());

      let new_arr = [...result]
      this.setState({ sortingData: new_arr});

      return result;
  }

  quick_swap(items, firstIndex, secondIndex){
    const temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
  }

  partition(items, left, right) {
    let pivot = items[Math.floor((right + left) / 2)], i = left, j = right;
    while (i <= j) {
        while (items[i].sort < pivot.sort) {
            i++;
        }
        while (items[j].sort > pivot.sort) {
            j--;
        }
        if (i <= j) {
          this.quick_swap(items, i, j);
          i++;
          j--;
        }
      }
    return i;
  }
  quickSort(items, left, right) {
    let index;
    if (items.length > 1) {
      left = typeof left != "number" ? 0 : left;
      right = typeof right != "number" ? items.length - 1 : right;
      index = this.partition(items, left, right);
      let new_arr = [...items]    
      this.setState({ sortingData: new_arr});
      if (left < index - 1) {
        setTimeout(() => this.quickSort(items, left, index - 1), 5);
      }
      if (index < right) {
        setTimeout(() => this.quickSort(items, index, right), 5);
      }
    }
  }

  swap(input, index_A, index_B) {
    const temp = input[index_A];
    input[index_A] = input[index_B];
    input[index_B] = temp;
  }

  heapify(input, i) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let largest = i;

    if (left < arrayLength && input[left].sort > input[largest].sort) {
        largest = left;
    }

    if (right < arrayLength && input[right].sort > input[largest].sort) {
        largest = right;
    }

    if (largest != i) {
        this.swap(input, i, largest);
        this.heapify(input, largest);
    }

    let new_arr = [...input]
    this.setState({ sortingData: new_arr});    
  }

  buildHeap(input) {
    let i = Math.floor(arrayLength / 2);
    for (;i >= 0; i -= 1) {
        console.log(i);
        this.heapify(input, i);
    }
  }

  heapSort(input) {
    arrayLength=input.length
    this.buildHeap(input);

    let i = input.length - 1
    let interval = setInterval (() => {
      if (i == 0){
        clearInterval(interval);
      }
      this.swap(input, 0, i);
      arrayLength--;
      this.heapify(input, 0);
      i = i-1;
    }, 5);
  }

  sortData() {
    let sort_type = this.props.sortFilter == null ? "" : this.props.sortFilter.value;
    let i = 0;
    var t1 = performance.now();
    if (sort_type == "Bubble Sort") {
        let interval = setInterval (() => {
          if (i==this.state.sortingData.length){
            clearInterval(interval);
          }
          this.bubbleSort(this.state.sortingData, i);
          i=i+1;          
        }, 5);
    } else if (sort_type == "Selection Sort") {
      let interval = setInterval (() => {
        if (i==this.state.sortingData.length - 1){
          clearInterval(interval);
        }
        this.selectionSort(this.state.sortingData, i);
        i=i+1;          
      }, 20);
    } else if (sort_type == "Insertion Sort") {
      let interval = setInterval (() => {
        if (i==this.state.sortingData.length - 1){
          clearInterval(interval);
        }
        this.insertionSort(this.state.sortingData, i);
        i=i+1;          
      }, 20);
    } else if (sort_type == "Merge Sort") {
      this.mergeSort(this.state.sortingData);
    } else if (sort_type == "Quick Sort") {
      this.quickSort(this.state.sortingData);
      console.log('The End :(')
    } else if (sort_type == "Heap Sort") {
      this.heapSort(this.state.sortingData);
    }
    var t2 = performance.now();
    this.setState({sorted: true, shuffled: false, sortingTime: t2 - t1});      
    
  }

  render() {
    return ( 
      <div>
        <BarChart width={800} height={200} data={this.state.sortingData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <YAxis/>
          <Bar dataKey="sort" fill="#82ca9d" />
        </BarChart>
        <button className="shuffle-button"
          onClick={this.generateRandom}
          disabled={this.state.shuffled}
        > Shuffle Data </button>
        <button className="shuffle-button"
          onClick={this.sortData}
          disabled={this.state.sorted}
        > Sort </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    inputFilter: state.inputFilter,
    sortFilter: state.sortFilter,
  };
};

ChartSort = connect(mapStateToProps)(ChartSort);

export {
  ChartSort,
}