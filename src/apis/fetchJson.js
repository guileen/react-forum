import fetch from 'isomorphic-fetch'

export default function fetchJson(...args) {
  return fetch(...args, {
    // 'same-origin'  or 'include'
    credentials: 'same-origin'
  }).then(res => {
    return res.json().then(json => ({
      success: res.status >= 200 && res.status <300,
      data: json
    }))
  })
}
