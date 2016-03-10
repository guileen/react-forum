import fetchData from '../../apis/fetchData'

export const dispatchPromise = (dispatch, stateAction, promise, onDispatch) => {
  if (promise === undefined) {
    throw new Error(`Promise is undefined. Check dispatchPromise:${stateAction}`)
  }
  const d = (action) => {
    dispatch(action)
    onDispatch && onDispatch(dispatch, action.payload)
  }
  d({
    type: stateAction,
    payload: {
      pending: true
    }
  })
  return Promise.resolve(promise)
  .then(result => {
    d({
      type: stateAction,
      payload: {
        fulfilled: true,
        value: result
      }
    })
  }, err => {
    d({
      type: stateAction,
      payload: {
        rejected: true,
        reason: err.message || err
      }
    })
  })
}

export const makePromiseAction = (stateAction, promise, onDispatch) =>
  (dispatch) => dispatchPromise(dispatch, stateAction, promise, onDispatch)

export const createPromiseAction = (stateAction, promiseCreator, onFulfilled, onRejected) => (...args) => {
  if (!promiseCreator) {
    throw new Error(`promiseCreator is null, check createPromiseAction(${stateAction},...)`)
  }
  return makePromiseAction(stateAction, promiseCreator(...args), onFulfilled, onRejected)
}

export const createFetchAction = (stateAction, url, opt={}, onFulfilled, onRejected) => {
  const promiseCreator = (...args) => {
    var finalUrl, finalOpt
    if (typeof url === 'function') {
      finalOpt = url(...args)
      finalUrl = finalOpt.url
      if (typeof finalOpt === 'string') {
        finalUrl = finalOpt
        finalOpt = opt
      }
    } else {
      finalUrl = url
      finalOpt = opt
    }
    return fetchData(finalUrl, finalOpt)
  }
  return createPromiseAction(stateAction, promiseCreator, onFulfilled, onRejected)
}
