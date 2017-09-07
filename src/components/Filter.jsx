import _ from 'lodash';
import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import { connect } from 'react-redux';
import { sortOptions } from './constants';
import {
  SetDataFilter,
  SetSortFilter,
} from '../reducers/index';

class Filter extends Component {
  render () {
    const options = _.range(10, 210, 10).map((val) => {return {value: val, label: val.toString()}});
    return (
      <div>
        <div className="select-sort">
          <Select
            name="form-field-name"
            placeholder="Data Population"
            value={this.props.inputFilter}
            options={options}
            onChange={this.props.SetDataFilter}
            resetValue={null}
          />
        </div>
        <div className="select-sort">
          <Select
            name="form-field-name"
            placeholder="Type of Sort"
            value={this.props.sortFilter}
            options={sortOptions}
            onChange={this.props.SetSortFilter}
            resetValue={null}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    inputFilter: state.inputFilter,
    sortFilter: state.sortFilter,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ SetDataFilter, SetSortFilter }, dispatch);
};

Filter = connect(mapStateToProps, mapDispatchToProps)(Filter);

export {
  Filter,
}