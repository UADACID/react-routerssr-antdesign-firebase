import React, { Component } from 'react'
import firebase from '../../../lib/Firebase'
import { Row, Col, Spin, Breadcrumb } from 'antd'
import moment from 'moment'
import format from '../../component/currency';
import ReactTable from 'react-table';

export default class Read extends Component {

  constructor(){
    super();
    this.state = {
      data:{}
    }
  }

  componentWillMount(){
    const {id} = this.props.params;
    const ref = firebase.database().ref(`transaction/${id}`);
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
    const { address , createdAt, deliveryNumber, phoneNumber, receiverName, status, total, userId, carts} = data;
    const columns = [
      {
        Header: 'Id Produk',
        accessor: 'productId' // String-based value accessors!
      },
      {
        Header: 'Nama',
        accessor: 'title' // String-based value accessors!
      },
      {
        // id: 'friendName', // Required because our accessor is not a string
        Header: 'Produk',
        accessor: 'uploadedProduct', // Custom value accessors!
        Cell: props => (
          <div style={{textAlign: 'center', backgroundColor:'#000'}}>
            <img alt="example" width="100%" src={props.value} />
          </div>
        )
      },
      {
        Header: 'Harga',
        accessor: 'price',
        Cell: props => <span className='number' styles={{textAlign:'right'}}>Rp. {format.currency(props.value)}</span> // Custom cell components!
      },
      {
        Header: 'Jumlah',
        accessor: 'qty' // String-based value accessors!
      },

    ];


    return(
      <div>
        <Row>
          <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item>Menu Utama</Breadcrumb.Item>
            <Breadcrumb.Item>Transaksi</Breadcrumb.Item>
            <Breadcrumb.Item style={{color:'#49a9ee'}}>Lihat Detail</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row>
          <Col span={4}>No Pesanan</Col>
          <Col span={16}>: {deliveryNumber}</Col>
        </Row>
        <Row>
          <Col span={4}>Tanggal</Col>
          <Col span={16}>: {moment(createdAt).format('LLL')}</Col>
        </Row>
        <Row>
          <Col span={4}>No Handpone</Col>
          <Col span={16}>: {phoneNumber}</Col>
        </Row>
        <Row>
          <Col span={4}>Nama Penerima</Col>
          <Col span={16}>: {receiverName}</Col>
        </Row>
        <Row>
          <Col span={4}>Status</Col>
          <Col span={16}>: {status}</Col>
        </Row>
        <Row>
          <Col span={4}>Id Member</Col>
          <Col span={16}>: {userId}</Col>
        </Row>
        <Row>
          <Col span={4}>Total Belanja</Col>
          <Col span={16}>: Rp. {total ? format.currency(total) : false}</Col>
        </Row>
        <Row>
          <Col span={4}>Keranjang Belanja</Col>
          <Col span={16}>:</Col>
        </Row>
        <Row>
          {carts ? <ReactTable
            data = {carts}
            columns = {columns}
            defaultPageSize = {10}
          /> : <div style={{textAlign:'center'}}><Spin /></div> }
        </Row>
      </div>
    )
  }
}
