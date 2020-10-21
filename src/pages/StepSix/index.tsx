import React from 'react'
import {Table, Tag,Space} from 'antd'
import { connect } from 'umi';

const index =  (stepSix)=>{
  console.log('stepSix',stepSix)
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
          title: 'Create Time',
          dataIndex: 'create_time',
          key: 'create_time',
        },
        {
          title:'Action',
          key:'action',
          // render:(text, recortd)=>{
          //   return <span>
          //     <a>Edit</a>&nbsp;&nbsp;&nbsp;
          //     <a>Delete</a>
          //   </span>
          // }
        }
      ];
      
    return <div className='list-table'><Table columns={columns} dataSource={stepSix.data||[]} /></div>
}
const mapStateToProps = (state)=>{
    console.log('mapStateToProps',state.stepSix)
    return state.stepSix
}
export default connect(mapStateToProps)(index)