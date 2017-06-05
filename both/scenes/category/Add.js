import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, Row, Col, Upload, Modal, Breadcrumb, message } from 'antd';
import firebase from '../../../lib/Firebase';
import { browserHistory } from 'react-router';

const Dragger = Upload.Dragger;
const FormItem = Form.Item;

class Add extends Component {

  tempsliders = [] ;
  state = {
    previewVisible: false,
    previewImage: '',
    name:"",
    priceStartFrom:"",
    iconName:{},
    backgroundColor:"",
    background:{},
    sliders:[],

    uploadedIcon:"",
    uploadedBackground:"",
    uploadedSliders:[],
    loadingButton:false,
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({fileList}) => {
    // console.log(e);
    this.setState({ sliders : fileList })
  }

  handleChangeCategoryImage = (e) => {
    this.setState({background:e.file.originFileObj})
    // message.info(`${file.name} berhasil ditambahkan`);
  }

  handleChangeIconName = (e) => {
    this.setState({iconName:e.file.originFileObj})
  }


  handleSubmit = (e) => {
    e.preventDefault();

    const {name, priceStartFrom, iconName, background, backgroundColor, sliders} = this.state;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({loadingButton:true})
        this.tempSliders = [] ;
        const images = sliders;

        this.doUpload(iconName,background,sliders);
      }
    });
  }

  doUpload = (iconName, background, sliders) => {

    const tempSlider = [];
    const slider = sliders.forEach((file) => {
      console.log(file);
      const type = "slider";
      tempSlider.push({file:file.originFileObj,type});
    })
    console.log(tempSlider);
    tempSlider.push({file:iconName, type:'icon'})
    tempSlider.push({file:background, type:'background'})
    console.log(tempSlider);

    var promises = tempSlider.map((obj) => {
      let _this = this;
      return new Promise((resolve, reject) => {
          var storageRef = firebase.storage().ref("/images/"+obj.file.name);

          //Upload file
          var metadata = {
            contentType:obj.file.type,
          };

          // const fileAsBlob = new File([byteArrays], imageFile.name, {type: imageFile.type, lastModified: Date.now()});
          var task = storageRef.put(obj.file, metadata);

          //Update progress bar
          task.on('state_changed',
              progress = snapshot => {
                  var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;

                  // uploader.value = percentage;
                  console.log(percentage);
              },
              error = err => {

              },
              complete = () => {
                  var downloadURL = task.snapshot.downloadURL;
                  if (obj.type == 'slider') {

                    console.log("slider" + downloadURL);
                    this.tempSliders.push(downloadURL);
                    this.setState({uploadedSliders:_this.tempSliders})
                    resolve();

                  }else if(obj.type == 'background'){

                    console.log("background " + downloadURL);
                    this.setState({uploadedBackground:downloadURL})
                    resolve();
                  }else if( obj.type == 'icon'){

                    console.log("icon "+ downloadURL);
                    this.setState({uploadedIcon:downloadURL})
                    resolve();
                  }
              }
          );
      });
    });

    Promise.all(promises)
           .then(res => this.handleInsertDb())
           .catch(err => console.log('error', err))
  }

  handleInsertDb = async () => {
    const {name, priceStartFrom, uploadedIcon, uploadedBackground, backgroundColor, uploadedSliders} = this.state;
    console.log({name, priceStartFrom, uploadedIcon, uploadedBackground, backgroundColor, uploadedSliders});
    // return;
    console.log("insert to db");
    await firebase.database().ref('category').push({
      background:uploadedBackground,
      backgroundColor,
      iconName:uploadedIcon,
      name,
      priceStartFrom,
      sliders:uploadedSliders
    });
    this.setState({loadingButton:false})
    browserHistory.push(`/category`);
  }

  // uploadImageAsPromise = (obj) => {
  //   console.log(obj);
  //     let _this = this;
  //     return new Promise((resolve, reject) => {
  //         var storageRef = firebase.storage().ref("/images/"+obj.file.name);
  //
  //         //Upload file
  //         var metadata = {
  //           contentType:obj.file.type,
  //         };
  //
  //         // const fileAsBlob = new File([byteArrays], imageFile.name, {type: imageFile.type, lastModified: Date.now()});
  //         var task = storageRef.put(obj.file, metadata);
  //
  //         //Update progress bar
  //         task.on('state_changed',
  //             progress = snapshot => {
  //                 var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
  //
  //                 // uploader.value = percentage;
  //                 console.log(percentage);
  //             },
  //             error = err => {
  //
  //             },
  //             complete = () => {
  //                 var downloadURL = task.snapshot.downloadURL;
  //                 // console.log(task);
  //                 // console.log(downloadURL);
  //                 if (obj.type == 'slider') {
  //
  //                   console.log("slider" + downloadURL);
  //                   this.tempSliders.push(downloadURL);
  //                   this.setState({uploadedSliders:_this.tempSliders})
  //                   resolve();
  //
  //                 }else if(obj.type == 'background'){
  //
  //                   console.log("background " + downloadURL);
  //                   this.setState({uploadedBackground:downloadURL})
  //                   resolve();
  //                 }else if( obj.type == 'icon'){
  //
  //                   console.log("icon "+ downloadURL);
  //                   this.setState({uploadedIcon:downloadURL})
  //                   resolve();
  //                 }
  //
  //             }
  //         );
  //     });
  //   }

  render(){

    const { previewVisible, previewImage, sliders, name } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
  );

  const { getFieldDecorator } = this.props.form;

  return (
    <div>
      <Row>
      <Breadcrumb style={{ margin: '12px 0' }}>
         <Breadcrumb.Item>Menu Utama</Breadcrumb.Item>
         <Breadcrumb.Item>Kategori</Breadcrumb.Item>
           <Breadcrumb.Item style={{color:'#49a9ee'}}>Tambah Data</Breadcrumb.Item>
         </Breadcrumb>
        </Row>
        <Row>
          <Col span={12}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem label="Nama">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Pengisian Nama Kategori Diperlukan!' }],
                })(
                  <Input
                    placeholder="Nama"
                    onChange={(e) => this.setState({name:e.target.value})}/>
                )}
              </FormItem>
              <FormItem label="Harga">
                {getFieldDecorator('priceStartFrom', {
                  rules: [{ required: true, message: 'Pengisian Harga Awal Kategori Diperlukan!' }],
                })(
                  <Input
                    placeholder="ex. 50000"
                    onChange={(e) => this.setState({priceStartFrom:e.target.value})} />
                )}

              </FormItem>
              <FormItem label="Warna Latar Belakang">
                  <Input
                    type="color"
                    placeholder="ex. #FFF"
                    required = {true}
                    onChange={(e) => this.setState({backgroundColor:e.target.value})}/>
              </FormItem>
              <FormItem label="Icon">
                {getFieldDecorator('iconName', {
                  rules: [{ required: true, message: 'Upload Icon Image Diperlukan!' }],
                })(
                  <Dragger
                    multiple = {false}
                    showUploadList = {true}
                    onChange = {this.handleChangeIconName}>
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Klik atau drag n drop icon image ke area ini untuk menambahkan file</p>
                    <p className="ant-upload-hint"></p>
                  </Dragger>
                )}

              </FormItem>
              <FormItem label="Gambar Kategori">
                {getFieldDecorator('backgroundColor', {
                  rules: [{ required: true, message: 'Gambar Latar Kategori Diperlukan!' }],
                })(
                  <Dragger
                    multiple = {false}
                    showUploadList = {true}
                    onChange = {this.handleChangeCategoryImage}>
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Klik atau drag n drop image ke area ini untuk menambahkan file</p>
                    <p className="ant-upload-hint"></p>
                  </Dragger>
                )}

              </FormItem>
              <FormItem label="Slider">
                {getFieldDecorator('sliders', {
                  rules: [{ required: true, message: 'Sliders Kategori Diperlukan!' }],
                })(
                  <div className="clearfix">
                    <Upload
                      listType="picture-card"
                      fileList={sliders}
                      onPreview={this.handlePreview}
                      onChange={this.handleChange}
                    >
                      {sliders.length == 10 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </div>
                )}

              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" loading={this.state.loadingButton} className="login-form-button">
                  Simpan
                </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

const FormAddCategory = Form.create()(Add);
export default FormAddCategory;
