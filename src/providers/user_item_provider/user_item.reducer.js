export const INIT_USERITEM = {
  userRequests: [],
  userRentals: [],
  loading: false,
};

export const USERITEM_ACTION_TYPE = {
  setUserRequest: "SET_USER_REQUEST",
  setUserRental: "SET_USER_RENTAL",
  setBusy: "SET_TO_BUSY",
};

export const userItemReducer = (state, action) => {
  switch (action.type) {
    case USERITEM_ACTION_TYPE.setUserRequest:
      return fetchUserRequest(state, action.payload);
    case USERITEM_ACTION_TYPE.setUserRental:
      return fetchUserRental(state, action.payload);
    case USERITEM_ACTION_TYPE.setBusy:
      return setBusyWhenFetch(state, action.payload);
    default:
      return state;
  }
};

//LOGIC

const fetchUserRequest = (state, payload) => {
  return { ...state, userRequests: payload };
};

const fetchUserRental = (state, payload) => {
  return { ...state, userRentals: payload };
};

const setBusyWhenFetch = (state, payload) => {
  return { ...state, loading: payload };
};
