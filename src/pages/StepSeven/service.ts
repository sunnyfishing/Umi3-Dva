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