import React,{useState} from 'react'
import {Table, Tag,Space} from 'antd'
import { connect } from 'umi';
import {UserModal} from './components/UserModal'

const index =  (stepSeven)=>{
  const [modelVisible, setModelVisible] = useState(false)
  const [record, setRecord] = useState({})
  console.log('stepSix',stepSeven)
    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'name',
          // render: text => <a>{text}</a>,
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Create Time',
          dataIndex: 'create_time',
          key: 'create_time',
        },
        {
          title:'Action',
          key:'action',
          render:(value, record)=>{
            return <span>
              <a onClick={()=>modelHandler(record)}>Edit</a>&nbsp;&nbsp;&nbsp;
              <a>Delete</a>
            </span>
          }
        }
      ];
    
    const modelHandler = (record)=>{
      setModelVisible(true)
      setRecord(record)
    }
    const handleClose = ()=>{
      setModelVisible(false)

    }
    
    return <div className='list-table'>
      <Table rowKey='id' columns={columns} dataSource={stepSeven.data||[]} />
      <UserModal
        visible={modelVisible}
        record={record}
        handleClose = {handleClose}
      ></UserModal>
    </div>
}
const mapStateToProps = (state)=>{
    console.log('mapStateToProps',state.stepSeven)
    return state.stepSeven
}
export default connect(mapStateToProps)(index)