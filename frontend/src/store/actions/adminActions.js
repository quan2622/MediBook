import actionTypes from './actionTypes';
import userService from "../../services/user.service"
import axios from "axios";
import { toast } from "react-toastify";

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
      dispatch(fetchGenderFailed());
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
      dispatch(fetchPositionFailed());
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
      dispatch(fetchRoleFailed());
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
      let res = await userService.createNewUser(dataSave);
      if (res && res.EC === 0) {
        toast.success("Create a new user success");
        dispatch(saveUserSuccess());
        dispatch(getAllUser());
      } else {
        toast.error("Create a new user error");
        dispatch(saveUserFailed());
      }
    } catch (error) {
      dispatch(saveUserFailed());
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

// ALL Data User
export const getAllUser = () => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.getAllUser('all');
      if (res && res.EC === 0) {
        dispatch(getDataSuccess(res.user.reverse()));
      } else dispatch(getDataFailed());
    } catch (error) {
      dispatch(getDataFailed());
      console.log("fetchRoleStart", error);
    }
  }
}


export const getDataSuccess = (dataTable) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  payload: dataTable,
})

export const getDataFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILED
})

// Delete User
export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.deleteUser(userId);
      if (res && res.EC === 0) {
        toast.success("Delete user success");
        dispatch(deleteUserSuccess());
        dispatch(getAllUser());
      } else {
        dispatch(deleteUserFailed());
      }
    } catch (error) {
      toast.error("Delete user error");
      dispatch(deleteUserFailed());
      console.log("saveUserRedux", error);
    }
  }
}

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED
})

// Edit User
export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      console.log("check data: ", data);
      let res = await userService.updateDataUser(data);
      if (res && res.EC === 0) {
        toast.success(res.EM);
        dispatch(editUserSuccess());
        dispatch(getAllUser());
      } else {
        toast.error(res.EM);
        dispatch(editUserFailed());
      }
    } catch (error) {
      toast.error("Delete user error");
      dispatch(editUserFailed());
      console.log("saveUserRedux", error);
    }
  }
}

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
})

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      const res = await userService.getTopDoctorHome('10');
      if (res && res.EC === 0) {
        dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS, payload: res.data });
      } else {
        toast.error("Cannot get data top doctor home");
        dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_FAILED });
      }
    } catch (error) {
      toast.error("Had error fetch top doctor");
      console.log("Error fetchTopDoctor: ", error);
      dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_FAILED });
    }
  }
}
