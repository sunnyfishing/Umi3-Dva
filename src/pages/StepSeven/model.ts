import{Reducer,Effect, Subscription} from 'umi';
import {getRemoteList} from './service';

interface UserModel{
  namespace:'stepSeven',    // 固定值
  state:{},
  reducers:{
    getList:Reducer,
    // returndata:Reducer
  },
  effects:{
    getRemote:Effect
  },
  subscriptions:{
    setup:Subscription
  }
}

const UserModel:UserModel={
  namespace:'stepSeven',
  state:{},
  reducers:{
    getList(state,{payload}){     // 这里的参数是 (state, action) => (state, {payload, type})   state是原来的状态
      // return newState          // return到该namespace下
      return payload
    },
  },
  effects:{
    *getRemote({payload}, {put,call}){   // 这里接收的是 (action,effect) =>({payload,type},{put,effet,call})
      // yield put()                // 通过put调用reducers里面的函数
      let data = yield call(getRemoteList)
      console.log('data',data)
      yield put({
        type:'getList',
        payload:data
      })
    }
  },
  subscriptions:{
    setup({ dispatch, history }, done) {
      return history.listen(({pathname})=>{     //监听地址  .lesten((location,action)=>{}) action没用，location中只用到pathname，于是解构拿到pathname
        if(pathname === '/stepSeven'){
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
