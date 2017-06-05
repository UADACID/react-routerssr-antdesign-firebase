import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import ReactTable from 'react-table';
import fakeData from '../api/fake';
import { Button, Tooltip, Popconfirm, Breadcrumb, Input } from 'antd';
import firebase from '../../lib/Firebase';
import format from '../component/currency';
import moment from 'moment';

export default class Transaction extends Component {
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
    const ref = firebase.database().ref('transaction');
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
     browserHistory.push(`/transaction/update/${id}`);
  }

  handleRead(id){
     browserHistory.push(`/transaction/read/${id}`);
  }

  handleAdd(){
     browserHistory.push('/transaction/add');
  }

  handleDelete(id){
    firebase.database().ref(`transaction`).child(`${id}`).remove();
  }

  render() {
    const columns = [
      {
        Header: 'Kode Pesanan',
        accessor: 'deliveryNumber',
        filterable:{true},// String-based value accessors!
      },
      {
        Header: 'Tanggal Pesan',
        accessor: 'createdAt',
        Cell: props => <div style={{textAlign:'center'}}><span className='number'>{moment(props.value).format('LLL')}</span></div> // Custom cell components!
      },
      {
        Header: 'No Telepon',
        accessor: 'phoneNumber',
        filterable:{true},
        Cell: props => <div style={{textAlign:'right'}}><span className='number'>{props.value}</span></div>// Custom cell components!
      },
      {
        Header: 'Nama Penerima',
        accessor: 'receiverName',
        filterable:{true},
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      },
      {
        Header: 'Status Pesan',
        accessor: 'status',
        filterable:{true},
        Cell: props => <div style={{textAlign:'center'}}><span className='number' style={{color:props.value == 'pending' ? '#F4D03F' : (props.value == 'success' ? 'green' : '#F22613')}}>{props.value}</span></div> // Custom cell components!
      },
      {
        Header: 'Member ID',
        accessor: 'userId',
        filterable:{true},
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      },
      {
        Header: 'Alamat Penerima',
        accessor: 'address',
        minWidth: 200,
        filterable:{true},
        Cell: props => <Input type="textarea" placeholder="Autosize height based on content lines" autosize={{ minRows: 2, maxRows: 3 }} value={props.value} disabled={true} /> // Custom cell components!
      },
      {
        Header: 'Total',
        accessor: 'total',
        filterable:{true},
        Cell: props => <div style={{textAlign:'right'}}><span className='number'>Rp. {format.currency(props.value)}</span></div> // Custom cell components!
      },
      {
        Header:'Aksi',
        accessor: 'id',
        Cell: props => (
          <div style={{textAlign: 'center'}}>
          {/*<Tooltip  title="Update">
            <Button type="primary" onClick={(e)=>this.handleUpdate(props.value)} shape="circle" icon="edit" size="small" />
          </Tooltip>*/}
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
          <Breadcrumb.Item>Transaksi</Breadcrumb.Item>
        </Breadcrumb>
        <h3>Informasi Transaksi</h3>
        <div style={{marginBottom:20, marginTop:20}}>
          {/*<Button type="primary" onClick={()=>this.handleAdd()} icon="database">Tambah Kategori</Button>*/}
        </div>
        <ReactTable
          data = {this.state.data}
          columns = {columns}
          loading = {this.state.dataLoading}
          defaultPageSize = {20}
          defaultSorted={[{
            id   : 'createdAt',
            desc : true,
          }]}
        />
      </div>
    )
  }
}
