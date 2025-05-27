import actionTypes from '../actions/actionTypes';


const initialState = {
  genders: [],
  roles: [],
  positions: [],
  users: [],
  isLoadingGender: false,
  topDoctors: [],
}

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      return {
        ...state,
        isLoadingGender: true,
      }
    case actionTypes.FETCH_GENDER_SUCCESS:
      return {
        ...state,
        genders: action.payload,
        isLoadingGender: false,
      }
    case actionTypes.FETCH_GENDER_FAILED:
      return {
        ...state,
        genders: [],
        isLoadingGender: false,
      }
    // POSITION
    case actionTypes.FETCH_POSITION_SUCCESS:
      return {
        ...state,
        positions: action.payload,
      }

    case actionTypes.FETCH_POSITION_FAILED:
      return {
        ...state,
        positions: []
      }
    // ROLE
    case actionTypes.FETCH_ROLE_SUCCESS:
      return {
        ...state,
        roles: action.payload,
      }

    case actionTypes.FETCH_ROLE_FAILED:
      return {
        ...state,
        roles: []
      }
    // // Create user
    // case actionTypes.SAVE_USER_SUCCESS:
    //   alert("Create user success");
    //   return

    // case actionTypes.SAVE_USER_FAILED:
    //   alert("Had error when call api to create new user");
    //   return


    case actionTypes.FETCH_ALL_USER_SUCCESS:
      return {
        ...state,
        users: action.payload,
      }

    case actionTypes.FETCH_ALL_USER_FAILED:
      return {
        ...state,
        users: []
      }

    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      return {
        ...state,
        topDoctors: action.payload
      }

    case actionTypes.FETCH_TOP_DOCTOR_FAILED:
      return {
        ...state,
        topDoctors: []
      }

    default:
      return state;
  }
}

export default adminReducer;