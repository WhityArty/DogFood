import React from 'react';
import { Image, Layout, Typography } from 'antd';
import { Input } from 'antd';
// import { DatePicker, Space } from 'antd';
import { Table } from 'antd';
import { pokemonData } from './pokemon';
const { Header, Footer, Content } = Layout;

const onChange = (e) => {
  console.log('>>>>date', e);
};

const AppAnt = () => {
  const wrapper = { width: '300px' };

  const newPokData = pokemonData.map((e) => ({ ...e, key: e.id }));

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // colSpan: 6,
      render: (text) => (
        <Typography.Text type='danger' copyable>
          {text}
        </Typography.Text>
      ),
    },
    {
      title: 'Number',
      dataIndex: 'number',
      key: 'number',
      render: (text) => (
        <Typography.Text type='danger' copyable>
          {text}
        </Typography.Text>
      ),
    },
    {
      title: 'Class',
      dataIndex: 'classification',
      key: 'classification',
    },
    {
      title: 'Maximum XP',
      dataIndex: 'maxHP',
      key: 'maxHP',
      sorter: (a, b) => a.maxHP - b.maxHP,
      sortDirections: ['descend'],
    },
    {
      title: 'Maximum CP',
      dataIndex: 'maxCP',
      key: 'maxCP',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (src) => <Image src={src} width={150} />,
    },
  ];
  return (
    <Layout>
      <Header>Header</Header>
      <Content>
        <div>
          <Table columns={columns} dataSource={newPokData} />
          {/* <DatePicker onChange={onChange} /> */}
        </div>
        <div style={wrapper}>{/* <Input placeholder='Basic usage' /> */}</div>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};
export default AppAnt;
