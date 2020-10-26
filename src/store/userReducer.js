const INITIAL_STATE = {
  email: '',
  logged: false
}

function userReducer(state = INITIAL_STATE, action){
  switch(action.type){
    case 'LOGIN':
      return {...state, logged: true, email: action.email}
    case 'LOGOUT':
      return {...state, email: null, logged: false}
    default:
      return state
  }
}

export default userReducer