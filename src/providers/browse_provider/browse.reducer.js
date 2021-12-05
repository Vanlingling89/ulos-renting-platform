export const INIT_RENTAL = {
  allRentals: [],
  loading: false,
};

export const RENTAL_ACTION_TYPE = {
  setAllRentals: "SET_ALL_RENTAL",
  setBusy: "SET_TO_BUSY",
};

export const RentalReducer = (state, action) => {
  switch (action.type) {
    case RENTAL_ACTION_TYPE.setAllRentals:
      return fetchAllRental(state, action.payload);
    case RENTAL_ACTION_TYPE.setBusy:
      return setBusyWhenFetch(state, action.payload);
    default:
      return state;
  }
};

//LOGIC

const fetchAllRental = (state, payload) => {
  return { ...state, allRentals: payload };
};

const setBusyWhenFetch = (state, payload) => {
  return { ...state, loading: payload };
};
