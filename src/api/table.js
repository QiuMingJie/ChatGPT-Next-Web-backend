import request from '@/utils/request'

// export function getList(params) {
//   return request({
//     url: '/ios/class/diagnosis/user/search',
//     method: 'post',
//     params
//   })
// }

export function getList(data) {
  return request({
    url: '/ios/class/diagnosis/user/search',
    method: 'post',
    data
  })
}

export function resetPassword(data) {
  return request({
    url: '/ios/class/diagnosis/user/resetPassword',
    method: 'post',
    data
  })
}

export function setAsAdmin(data) {
  return request({
    url: '/ios/class/diagnosis/user/reverseAdmin',
    method: 'post',
    data
  })
}

export function setUpload(data) {
  return request({
    url: '/ios/class/diagnosis/user/upload',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function getUploadTemplate(data) {
  return request({
    url: '/ios/class/diagnosis/user/getUploadTemplate',
    method: 'post',
    data
  })
}



export function searchTCMchat(data) {
  return request({
    url: '/ios/class/diagnosis/chat/searchTCMchat',
    method: 'post',
    data
  })
}

