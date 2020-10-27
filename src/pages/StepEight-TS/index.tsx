import React,{useState,FC} from 'react'
import {Table, Popconfirm,Button} from 'antd'
import { connect,Dispatch,Loading } from 'umi';
import {UserModal} from './components/UserModal'
import {UserState,SingleUserType,FormValues} from './data.d'

interface PageList {
  stepEight:UserState,
  dispatch:Dispatch,
  userLoading:boolean
}

// const index =  ({stepEight,dispatch,userLoading}:{stepEight:[],dispatch:Dispatch,userLoading:boolean})=>{  // 这是一种方式
const index: FC<PageList> =  ({stepEight,dispatch,userLoading})=>{    //第二种
  console.log(userLoading)
  const [modelVisible, setModelVisible] = useState(false)
  const [record, setRecord] = useState<SingleUserType | undefined>(undefined)
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
          render:(value:string, record:SingleUserType)=>{
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
    
    const modelHandler = (record:SingleUserType)=>{
      setModelVisible(true)
      setRecord(record)
    }
    const handleClose = ()=>{
      setModelVisible(false)

    }
    const onFinish = (value:FormValues)=>{
      if(record){
        const {id} = record
        dispatch({
          type:'stepEight/edit',
          payload:{value,id}
        })
      }else{
        dispatch({
          type:'stepEight/add',
          payload:{value}
        })
      }
      handleClose()
    }
    const confirm = (record:SingleUserType)=>{
      const {id} = record
      dispatch({
        type:'stepEight/delete',
        payload:{id}
      })
    }
    const onAdd = ()=>{
      setModelVisible(true)
      setRecord(undefined)
    }
    
    return <div className='list-table'>
      <Button type='primary' onClick={onAdd}>Add</Button>
      <Table rowKey='id' columns={columns} dataSource={stepEight.data||[]} loading={userLoading}/>
      <UserModal
        visible={modelVisible}
        record={record}
        handleClose = {handleClose}
        onFinish = {onFinish}
      ></UserModal>
    </div>
}
const mapStateToProps = ({stepEight,loading}:{stepEight:UserState,loading:Loading})=>{
  console.log(loading)
    return {
      stepEight,
      userLoading:loading.models.stepEight
    }
}
export default connect(mapStateToProps)(index)