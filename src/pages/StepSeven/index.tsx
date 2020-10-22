import React,{useState} from 'react'
import {Table, Popconfirm} from 'antd'
import { connect } from 'umi';
import {UserModal} from './components/UserModal'

const index =  ({stepSeven,dispatch})=>{
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
    const onFinish = async (value)=>{
      console.log(value)
      const {id} = record
      await dispatch({
        type:'stepSeven/edit',
        payload:{value,id}
      })
      await handleClose()
      getList()
    }
    const confirm = async (record)=>{
      const {id} = record
      await dispatch({
        type:'stepSeven/delete',
        payload:{id}
      })
      getList()
    }
    const getList = ()=>{
      dispatch({
        type:'stepSeven/getRemote',
        payload:{},                         //没用参数可以不写
      })
    }
    
    return <div className='list-table'>
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
    console.log('mapStateToProps',state.stepSeven)
    return state
}
export default connect(mapStateToProps)(index)