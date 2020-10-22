import React,{useState} from 'react'
import {Table, Popconfirm,Button} from 'antd'
import { connect } from 'umi';
import {UserModal} from './components/UserModal'

const index =  ({stepSeven,dispatch})=>{
  const [modelVisible, setModelVisible] = useState(false)
  const [record, setRecord] = useState({})
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
              <Popconfirm
                title="是否确认删除"
                onConfirm={()=>confirm(record)}
                okText="Yes"
                cancelText="No"
              >
                <a>Delete</a>
              </Popconfirm>
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
    const onFinish = (value)=>{
      if(record){
        const {id} = record
        dispatch({
          type:'stepSeven/edit',
          payload:{value,id}
        })
      }else{
        dispatch({
          type:'stepSeven/add',
          payload:{value}
        })
      }
      handleClose()
    }
    const confirm = (record)=>{
      const {id} = record
      dispatch({
        type:'stepSeven/delete',
        payload:{id}
      })
    }
    const onAdd = ()=>{
      setModelVisible(true)
      setRecord(undefined)
    }
    
    return <div className='list-table'>
      <Button type='primary' onClick={onAdd}>Add</Button>
      <Table rowKey='id' columns={columns} dataSource={stepSeven.data||[]} />
      <UserModal
        visible={modelVisible}
        record={record}
        handleClose = {handleClose}
        onFinish = {onFinish}
      ></UserModal>
    </div>
}
const mapStateToProps = (state)=>{
    return state
}
export default connect(mapStateToProps)(index)