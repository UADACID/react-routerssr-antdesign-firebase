import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import ReactTable from 'react-table';
import fakeData from '../api/fake';
import { Button, Tooltip } from 'antd';
import firebase from '../../lib/Firebase';

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [],
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

    // let data = [];
    let self = this;
    const ref = firebase.database().ref('category');
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
      // console.log(data);
      self.setState({
        data:tempModel
      })
      // self.models=tempModel;
    });

    // alert(JSON.stringify(data));
  }

  handleUpdate(id){
     browserHistory.push(`/category/update/${id}`);
  }

  handleRead(id){
     browserHistory.push(`/category/read/${id}`);
  }

  handleAdd(){
     browserHistory.push('/category/add');
  }

  render() {
    const columns = [
      {
        Header: 'Nama',
        accessor: 'name' // String-based value accessors!
      },
      {
        Header: 'Harga',
        accessor: 'priceStartFrom',
        Cell: props => <span className='number'>Rp. {props.value}</span> // Custom cell components!
      },
      {
        // id: 'friendName', // Required because our accessor is not a string
        Header: 'Icon',
        accessor: 'iconName', // Custom value accessors!
        Cell: props => (
          <div style={{textAlign: 'center', backgroundColor:'#000'}}>
            <img alt="example" width="100%" src={props.value} />
          </div>
        )
      },
      {
        Header: 'Warna Latar', // Custom header components!
        accessor: 'backgroundColor',
        Cell: props => (
          <div style={{backgroundColor:props.value}}>
            <img alt="example" width="100%" src="https://firebasestorage.googleapis.com/v0/b/fir-login-ea3f3.appspot.com/o/empty.jpg?alt=media&token=13453437-f945-44f8-bef5-c2a24efa02c5" />
          </div>
        )
      },
      {
        Header:'Foto Kategori',
        accessor: 'background',
        Cell: props => (
          <div style={{textAlign: 'center'}}>
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
            <Button type="danger" shape="circle" icon="delete" size="small" />
          </Tooltip>
          </div>
        )
      }
    ];
    console.log(this.state.data);
    return (
      <div>
        <h3>Informasi Kategori Produk</h3>
        <div style={{marginBottom:20, marginTop:20}}>
          <Button type="primary" onClick={()=>this.handleAdd()} icon="database">Tambah Kategori</Button>
        </div>
        <ReactTable
          data={this.state.data}
          columns={columns}
        />
      </div>
    )
  }
}
