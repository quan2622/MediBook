import actionTypes from '../actions/actionTypes';


const initialState = {
  genders: [],
  roles: [],
  positions: [],
  isLoadingGender: false,
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

    default:
      return state;
  }
}

export default adminReducer;