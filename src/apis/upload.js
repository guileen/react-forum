import fetch from 'isomorphic-fetch'
import {postJson} from './fetchData'
export const uploadQiniu = (file, key) => {
  return postJson('/v1/qiniu/uptoken', {
    type: 'image'
  }).then(data => {
    return uploadFile('http://upload.qiniu.com', {
      token: data.token
    }, file)
  }).then(res => {
    return res.json()
  })
}

export const uploadFile = (uploadUrl, fields, file) => {
  var formData = new FormData()
  for (var name in fields) {
    formData.append(name, fields[name])
  }
  formData.append('file', file, file.name)
  return fetch(uploadUrl, {
    method: 'post',
    body: formData
  })
}
