import React, { Component } from 'react'
import firebase from '../../../lib/Firebase'

export default class Update extends Component {
    constructor(){
      super();
      this.state = {
        data:{}
      }
    }

    componentWillMount(){
      const {id} = this.props.params;
      const ref = firebase.database().ref(`category/${id}`);
      const self = this;
      ref.on("value", function(snapshot) {
        // self.models = []; // set ulang agar tidak terjadi penumpukan data
        const tempModel = []; // menyimpan sementara array
        if (snapshot.val()) {
          console.log(snapshot.val());
          self.setState({
            data:snapshot.val()
          })
        }
      });
    }

  render(){
    const {data} = this.state;
    console.log(data);
    return(
      <div>
        nama : {data.name}
      </div>
    )
  }
}
