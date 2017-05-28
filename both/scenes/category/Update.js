import React, { Component } from 'react'

export default class Update extends Component {

  componentWillMount(){
    console.log(this.props.params.id);
  }

  render(){
    return(
      <div>
        Update Data
      </div>
    )
  }
}
