// import { request } from 'umi';
import request, { extend } from 'umi-request';
import {message} from 'antd'
import {UserState,SingleUserType,FormValues} from './data.d'

const errorHandler = function(error:any) {
  if (error.response) {
    if(error.response.status>400){
      message.error(error.data.message?error.data.message:error.data)
    }
  } else {
    message.error('网络错误')
  }
  throw error // 这里是要抛异常的，这样才能在catch中街道请求失败的信息
};


const extendRequest = extend({ errorHandler });   // 如果请求出错，则进入errorHandler中处理错误；否则按照request正常返回

export const getRemoteList = ()=>{
    return extendRequest('http://public-api-v1.aspirantzhang.com/users', {
      method: 'get',
    })
      .then(function(response) {
        return response
      })
      .catch(function(error) {
        return false
      });
}
export const editRecord = ({value,id}:{value:FormValues,id:number})=>{
  return extendRequest(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'put',
    data: value,
  })
    .then(function(response) {
      console.log('response',response)
      return true
    })
    .catch(function(error) {
      console.log('error',error)
      return false
    });
}
// 
export const deleteRecord = ({id}:{id:number})=>{
  return extendRequest(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'delete',
  })
    .then(function(response) {
      return true
    })
    .catch(function(error) {
      return false
    });
}
export const Add = async ({value}:{value:FormValues})=>{
  return extendRequest(`http://public-api-v1.aspirantzhang.com/users`, {
    method: 'post',
    data: value,
  })
    .then(function(response) {
      return true
    })
    .catch(function(error) {
      return false
    });
}