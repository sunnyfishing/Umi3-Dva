import{Reducer,Effect, Subscription} from 'umi';
import {message} from 'antd'
import {getRemoteList,editRecord,deleteRecord,Add} from './service';
import {SingleUserType,UserState} from './data.d'

interface UserModel{
  namespace:'stepEight',    // 固定值
  state:UserState,
  reducers:{
    getList:Reducer<UserState>,
    // returndata:Reducer
  },
  effects:{
    getRemote:Effect
    edit:Effect,
    delete:Effect,
    add:Effect
  },
  subscriptions:{
    setup:Subscription
  }
}

const UserModel:UserModel={
  namespace:'stepEight',
  state:{
    data:[],
    meta:{
      total:0,
      page:1,
      per_page:5,
    }
  },
  reducers:{
    getList(state,{payload}){     // 这里的参数是 (state, action) => (state, {payload, type})   state是原来的状态
      // return newState          // return到该namespace下
      console.log(payload)
      return payload
    },
  },
  effects:{
    *getRemote({payload}, {put,call}){   // 这里接收的是 (action,effect) =>({payload,type},{put,effet,call})；通过put调用reducers里面的函数；call调用service中的函数
      // yield put()                // 
      let data = yield call(getRemoteList)
      if(data){
        yield put({
          type:'getList',
          payload:data
        })
      }
    },
    *edit({payload:{value,id}},{call,put}){
      let data = yield call(editRecord,{value,id})
      if(data){
        message.success('编辑成功')
        yield put({type:'getRemote'})
      }else{
        message.error('编辑失败')
      }
    },
    *delete({payload:{id}},{call,put}){
      let data = yield call(deleteRecord,{id})
      if(data){
        message.success('删除成功')
        yield put({type:'getRemote'})
      }else{
        message.error('删除失败')
      }
    },
    *add({payload:{value}},{put,call}){
      let data = yield call(Add,value)
      if(data){
        message.success('新增成功')
        yield put({type:'getRemote'})
      }else{
        message.error('新增失败')
      }
    }
  },
  subscriptions:{
    setup({ dispatch, history }, done) {
      return history.listen(({pathname})=>{     //监听地址  .lesten((location,action)=>{}) action没用，location中只用到pathname，于是解构拿到pathname
        if(pathname === '/stepEight-TS'){
          dispatch({
            type:'getRemote',
            payload:{},                         //没用参数可以不写
          })
        }
      })  
    }
  },
}
export default UserModel
