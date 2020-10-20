import{Reducer,Effect, Subscription} from 'umi';

interface UserModel{
  namespace:'users',    // 固定值
  state:{},
  reducers:{
    getList:Reducer
  },
  effects:{},
  subscriptions:{
    setup:Subscription
  }
}

const UserModel:UserModel={
  namespace:'users',
  state:{},
  reducers:{
    getList(state,action){    // state是之前的状态
      // return newState   // return到该namespace下
      const data=[
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
      ]
      return data
    },
  },
  effects:{
    *getAllList(action, effects){
      // yield put()    // 通过put调用reducers里面的函数
    }
  },
  subscriptions:{
    setup({ dispatch, history }, done) {
      return history.listen(({pathname})=>{    //监听地址  .lesten((location,action)=>{}) action没用，location中只用到pathname，于是解构拿到pathname
        if(pathname === '/users'){
          dispatch({
            type:'getList',
            payload:{},         //没用参数可以不写
          })
        }
      })  
    }
  },
}
export default UserModel
