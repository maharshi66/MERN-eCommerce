import {USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_RESET, USER_LIST_SUCCESS} from '../constants/userConstants'

export const userListReducer = (state = { users: []}, action ) => {
    switch(action.type){
        case USER_LIST_REQUEST:
            return {loading: true}
        case USER_LIST_SUCCESS:
            return {loading: false, users: action.payload}
        case USER_LIST_FAIL:
            return {loading: false, error: action.payload}
        case USER_LIST_RESET:
            return {users: []}
        default:
            return state
    }
}