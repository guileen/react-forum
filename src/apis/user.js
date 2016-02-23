import fetchJson from './fetchJson'

export default {
  show: () => {
    return fetchJson('/v1/user')
  }
}
