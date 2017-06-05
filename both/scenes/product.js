import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import ReactTable from 'react-table';
import fakeData from '../api/fake';
import { Button, Tooltip, Popconfirm, Breadcrumb } from 'antd';
import firebase from '../../lib/Firebase';

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [],
      dataLoading : true
    }
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // alert(JSON.stringify(user));
        // alert("loginIn")
        if (user.isAnonymous) {
          // alert('login as anonimous')
        }else{
          // alert('loginIn')
        }
      }else {
        try{
          firebase.auth().signInAnonymously().catch(function(error) {
            if (error) {
              alert(JSON.stringify(error))
            }else{
              // alert("login as anonym")
            }
          });
        }catch (error) {
          console.log("fail to sign in as anonym");
        }
      }
    });

    let self = this;
    const ref = firebase.database().ref('product');
    ref.on("value", function(snapshot) {
      // self.models = []; // set ulang agar tidak terjadi penumpukan data
      const tempModel = []; // menyimpan sementara array
      if (snapshot.val()) {
        snapshot.forEach(function(childSnapshot) {
            let key = childSnapshot.key;
            let childData = childSnapshot.val();
            // console.log(childData);
            childData.id = key;
            // data.push(childData);
            tempModel.push(childData);
        });
      }


      self.setState({
        data:tempModel,
        dataLoading:false
      })

    });

  }

  handleUpdate(id){
     browserHistory.push(`/product/update/${id}`);
  }

  handleRead(id){
     browserHistory.push(`/product/read/${id}`);
  }

  handleAdd(){
     browserHistory.push('/product/add');
  }

  handleDelete(id){
    firebase.database().ref(`product`).child(`${id}`).remove();
  }

  render() {
    const columns = [
      {
        Header: 'Nama',
        accessor: 'title' // String-based value accessors!
      },
      {
        Header: 'Harga',
        accessor: 'price',
        Cell: props => <span className='number'>Rp. {props.value}</span> // Custom cell components!
      },
      {
        Header: 'Deskripsi',
        accessor: 'description',
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      },
      {
        Header: 'Kategori',
        accessor: 'categoryId',
        Cell: props => <span className='number'>Rp. {props.value}</span> // Custom cell components!
      },
      {
        // id: 'friendName', // Required because our accessor is not a string
        Header: 'Gambar Transparan',
        accessor: 'transparentImage', // Custom value accessors!
        Cell: props => (
          <div style={{textAlign: 'center', backgroundColor:'#000'}}>
            <img alt="example" width="100%" src={props.value} />
          </div>
        )
      },
      {
        Header:'Aksi',
        accessor: 'id',
        Cell: props => (
          <div style={{textAlign: 'center'}}>
          <Tooltip  title="Update">
            <Button type="primary" onClick={(e)=>this.handleUpdate(props.value)} shape="circle" icon="edit" size="small" />
          </Tooltip>
          <Tooltip title="Read">
            <Button onClick={(e)=>this.handleRead(props.value)} style={{marginLeft:10, marginRight:10}} shape="circle" icon="eye" size="small" />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm title="Anda yakin akan menghapus kategori ini?" onConfirm={(e)=>this.handleDelete(props.value)} onCancel={(e)=>console.log("batal")} okText="Ya" cancelText="Tidak">
              <Button type="danger" shape="circle" icon="delete" size="small" />
            </Popconfirm>
          </Tooltip>
          </div>
        )
      }
    ];

    return (
      <div>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>Menu Utama</Breadcrumb.Item>
          <Breadcrumb.Item>Produk</Breadcrumb.Item>
        </Breadcrumb>
        <h3>Informasi Produk</h3>
        <div style={{marginBottom:20, marginTop:20}}>
          <Button type="primary" onClick={()=>this.handleAdd()} icon="database">Tambah Produk</Button>
        </div>
        <ReactTable
          data = {this.state.data}
          columns = {columns}
          loading = {this.state.dataLoading}
          defaultPageSize = {10}
          filterable = {true}
        />
      </div>
    )
  }
}
