import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactTable from 'react-table';
import fakeData from '../api/fake';

export default class Product extends Component {
  constructor() {
    super();
  }

  render() {
    const columns = [{
        Header: 'Name',
        accessor: 'name' // String-based value accessors!
      }, {
        Header: 'Age',
        accessor: 'age',
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      }, {
        id: 'friendName', // Required because our accessor is not a string
        Header: 'Friend Name',
        accessor: d => d.friend.name // Custom value accessors!
      }, {
        Header: props => <span>Friend Age</span>, // Custom header components!
        accessor: 'friend.age'
      }];

    return (
      <div>
        Product Go to: <Link to="/">Home</Link>
        <ReactTable
          data={fakeData}
          columns={columns}
        />
      </div>
    )
  }
}
