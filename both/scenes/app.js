import React, { Component } from 'react';
import { Link } from 'react-router';
import { Layout, Menu, Breadcrumb, Icon, Popover, Badge } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import { Notification } from '../component/notification';


export default class App extends Component {

  render() {

    const account = (
      <div>
        <b>admin@fifilio.com</b>
        <ol>
          <li><Icon type="user" /> Account</li>
          <li><Icon type="logout" /> Log out</li>
        </ol>
      </div>
    );

    return (
      <Layout>
        <Header className="header" style={styles.header}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={styles.menu}
          >
          <Menu.Item key="4" style={{position: 'absolute',right: '20px'}}>
            <Popover placement="bottomRight" title="Account" content={account} trigger="click">
              <Link to='/'><Icon type="user" /></Link>
            </Popover>
          </Menu.Item>
          <Menu.Item key="3" style={{position: 'absolute',right: '80px'}}>
            <Popover placement="bottomRight" title="Notifications" content={<Notification />} trigger="click">
              <Link to='/'>
                <Badge count={46}>
                  <Icon type="bell" />
                </Badge>
              </Link>
            </Popover>
          </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              <SubMenu key="sub1" title={<span><Icon type="user" />Menu Utama</span>}>
                <Menu.Item key="1"><Link to="/">Dashboard</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/product">produk</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/category">kategori</Link></Menu.Item>
                <Menu.Item key="4"><Link to="/transaction">transaksi</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="laptop" />Option</span>}>
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="notification" />Other</span>}>
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
          {/*  <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>*/}
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

const styles = {
  header: {
    borderBottom: '1px solid #e9e9e9',
    height: '44px',
    backgroundColor: '#446CB3'
  },
  menu: {
    borderBottom: '1px solid #e9e9e9',
    height: '44px',
    lineHeight: '44px',
    backgroundColor:'#446CB3'
  }
}
