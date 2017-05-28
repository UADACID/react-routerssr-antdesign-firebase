import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactTable from 'react-table';
import fakeData from '../api/fake';
import { Button } from 'antd';

export default class Category extends Component {
  constructor() {
    super();
  }

  handleUpdate(row){
    alert(row)
  }

  render() {
    const columns = [
      {
        Header: 'Name',
        accessor: 'name' // String-based value accessors!
      },
      {
        Header: 'Age',
        accessor: 'age',
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      },
      {
        id: 'friendName', // Required because our accessor is not a string
        Header: 'Friend Name',
        accessor: d => d.friend.name // Custom value accessors!
      },
      {
        Header: props => <span>Friend Age</span>, // Custom header components!
        accessor: 'friend.age'
      },
      {
        Header:'Action',
        accessor: 'name',
        Cell: props => (
          <div style={{textAlign: 'center'}}>
            <Button type="primary" onClick={(e)=>this.handleUpdate(props.value)} shape="circle" icon="edit" size="small" />
            <Button style={{marginLeft:10, marginRight:10}} shape="circle" icon="eye" size="small" />
            <Button type="danger" shape="circle" icon="delete" size="small" />
          </div>
        )
      }
    ];

    return (
      <div>
        Category Go to: <Link to="/">Home</Link>
        <ReactTable
          data={fakeData}
          columns={columns}
        />
      </div>
    )
  }
}
