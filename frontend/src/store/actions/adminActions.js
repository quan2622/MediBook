import actionTypes from './actionTypes';
import userService from "../../services/user.service"
import axios from "axios";

// GENDER
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });

      let res = await userService.getAllCodeService("GENDER");
      if (res && res.EC === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else dispatch(fetchGenderFailed());
    } catch (error) {
      fetchGenderFailed();
      console.log("fetchGenderStart", error);
    }
  }
}

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  payload: genderData,
})

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED
})

// POSITION
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.getAllCodeService("POSITION");
      if (res && res.EC === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else dispatch(fetchPositionFailed());
    } catch (error) {
      fetchPositionFailed();
      console.log("fetchPositionStart", error);
    }
  }
}

export const fetchPositionSuccess = (genderData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  payload: genderData,
})

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED
})


// ROLE
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.getAllCodeService("ROLE");
      if (res && res.EC === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else dispatch(fetchRoleFailed());
    } catch (error) {
      fetchRoleFailed();
      console.log("fetchRoleStart", error);
    }
  }
}


export const fetchRoleSuccess = (genderData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  payload: genderData,
})

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED
})

// Add New User
export const saveUserRedux = (dataSave) => {
  return async (dispatch, getState) => {
    try {
      console.log("check data: ", dataSave)
      let res = await userService.createNewUser(dataSave);
      console.log("check create: ", res);
      if (res && res.EC === 0) {
        dispatch(saveUserSuccess());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (error) {
      saveUserFailed();
      console.log("saveUserRedux", error);
    }
  }
}

export const saveUserSuccess = () => ({
  type: actionTypes.SAVE_USER_SUCCESS,
})

export const saveUserFailed = () => ({
  type: actionTypes.SAVE_USER_FAILED
})