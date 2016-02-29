import fetch from 'isomorphic-fetch'

export default function fetchData(url, opt={}) {
  return fetch(opt.query ? makeUrl(url, opt.query) : url, {
    ...opt,
    // 'same-origin'  or 'include'
    credentials: 'same-origin'
  }).then(res => {
    const contentType = res.headers.get('Content-Type')
    const isJson = contentType.indexOf('json') >= 0
    if (isJson) {
      return res.json().then(json => ({
        status: res.status,
        success: res.status >= 200 && res.status <300,
        data: json
      }))
    } else {
      return res.text().then(text => ({
        status: res.status,
        success: res.status >= 200 && res.status < 300,
        data: text
      }))
    }
  })
}

export function postJson(url, json, method='post') {
  return fetchData(url, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(json)
  })
}

export const makeUrl = (url, params) =>
  url + (params && Object.keys(params).length ? '?' + queryStringify(params) : '')

export const queryStringify = (params) => Object.keys(params)
  .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
  .join('&')
  .replace(/%20/g, '+')
