/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const NAV_TOGGLE = 'NAV_TOGGLE'

// ------------------------------------
// Actions
// ------------------------------------
export const toggleNav = ():Action => ({
  type: NAV_TOGGLE
})

export const actions = {
  toggleNav
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [NAV_TOGGLE]: (state, {payload}) => !state
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = false
export default function headerReducer (state: number = initialState, action: Action): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
