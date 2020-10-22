import { request } from 'umi';

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
  console.log('value',value)
  return request(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'put',
    data: value,
  })
    .then(function(response) {
      console.log(response);
      // return response
      console.log('ok')
    })
    .catch(function(error) {
      console.log(error);
    });
}
// 
export const deleteRecord = ({id})=>{
  console.log('id',id)
  return request(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'delete',
  })
    .then(function(response) {
      console.log(response);
      // return response
      console.log('ok')
    })
    .catch(function(error) {
      console.log(error);
    });
}