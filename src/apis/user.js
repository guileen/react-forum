import fetchData from './fetchData'

export const show = () => fetchData('/v1/user')

export default {
  show
}
