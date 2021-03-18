import { USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_SUCCESS } from "../constants/userConstants"

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_UPDATE_PROFILE_REQUEST:
        return { loading: true }
      case USER_UPDATE_PROFILE_SUCCESS:
        return { loading: false, success: true, userInfo: action.payload }
      case USER_UPDATE_PROFILE_FAIL:
        return { loading: false, error: action.payload }
      case USER_UPDATE_PROFILE_RESET:
        return {}
      default:
        return state
    }
  }