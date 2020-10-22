import { request } from 'umi';
import {message} from 'antd'

export const getRemoteList = ()=>{
    return request('http://public-api-v1.aspirantzhang.com/users', {
      method: 'get',
    })
      .then(function(response) {
        console.log(response);
        return response
      })
      .catch(function(error) {
        console.log(error);
      });
}
export const editRecord = ({value,id})=>{
  return request(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'put',
    data: value,
  })
    .then(function(response) {
      message.success('编辑成功')
    })
    .catch(function(error) {
      message.error('编辑失败')
    });
}
// 
export const deleteRecord = ({id})=>{
  return request(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'delete',
  })
    .then(function(response) {
      message.success('删除成功')
    })
    .catch(function(error) {
      message.error('删除失败')
    });
}
export const Add = async ({value})=>{
  return request(`http://public-api-v1.aspirantzhang.com/users`, {
    method: 'post',
    data: value,
  })
    .then(function(response) {
      message.success('新增成功')
    })
    .catch(function(error) {
      message.error('新增失败')
    });
}