import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, Row, Col, Upload, Modal } from 'antd';
const Dragger = Upload.Dragger;
const FormItem = Form.Item;


export default class Add extends Component {

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => {
    console.log(fileList);
    this.setState({ fileList })
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }



  render(){

    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const props = {
      name: 'file',
      multiple: false,
      showUploadList: false,
      action: '//jsonplaceholder.typicode.com/posts/',
      onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return (
      <div>
        <Row>
          <Col span={12} style={{marginTop:15, marginBottom:30, backgroundColor:'#446cb3', padding:10, borderRadius:5, textAlign:'center'}}>
            <h3 style={{color:'#FFF'}}>Tambah Kategori</h3>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem label="Nama">
                  <Input placeholder="Nama" />
              </FormItem>
              <FormItem label="Harga">
                  <Input placeholder="ex. 50000" />
              </FormItem>
              <FormItem label="Warna Latar Belakang">
                  <Input type="color"  placeholder="ex. #FFF" />
              </FormItem>
              <FormItem label="Icon">
                  <Input placeholder="Icon" />
              </FormItem>
              <FormItem label="Gambar Kategori">
                <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                </Dragger>
              </FormItem>
              <FormItem label="Slider">
                <div className="clearfix">
                  <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                  >
                    {fileList.length == 4 ? null : uploadButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </div>
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button">
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
