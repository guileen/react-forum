import fetch from 'isomorphic-fetch'

export default function fetchData(url, opt={}) {
  return fetch(opt.query ? makeUrl(url, opt.query) : url, {
    ...opt,
    // 'same-origin'  or 'include'
    credentials: 'same-origin'
  }).then(res => {
    const contentType = res.headers.get('Content-Type')
    const isJson = contentType.indexOf('json') >= 0
    const dataPromise = isJson ? res.json() : res.text()
    return res.status >= 400 ? dataPromise.then(data => Promise.reject({status: res.status, data: data})) : dataPromise
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
