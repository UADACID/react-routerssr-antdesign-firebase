import React, { Component } from 'react'
import firebase from '../../../lib/Firebase'
import { Row, Col } from 'antd'

export default class Read extends Component {

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
    const { name , priceStartFrom, background, backgroundColor, iconName, sliders} = data;
    // console.log(sliders.length);


    return(
      <div>
        <Row>
          <Col span={8}>Nama</Col>
          <Col span={16}>: {name}</Col>
        </Row>
        <Row>
          <Col span={8}>Harga</Col>
          <Col span={16}>: {priceStartFrom}</Col>
        </Row>
        <Row>
          <Col span={8}>Gambar Latar</Col>
          <Col span={16}>: <img alt="example" width="50%" src={background} /></Col>
        </Row>
        <Row>
          <Col span={8}>Warna Latar</Col>
          <Col span={16}>: <div style={{width:50, height:50, backgroundColor}}></div></Col>
        </Row>
        <Row>
          <Col span={8}>Icon</Col>
          <Col span={16}>: <div style={{width:30, height:30, backgroundColor:'#000'}}><img alt="example" width="100%" src={iconName} /></div></Col>
        </Row>
        <Row>
          <Col span={8}>Slider</Col>
          <Col span={16}>:</Col>
        </Row>
      </div>
    )
  }
}
