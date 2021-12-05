import { createContext, useContext, useReducer } from "react";
import { INIT_RENTAL, RentalReducer } from "./browse.reducer";

const RentalContext = createContext({
  ...INIT_RENTAL,
});

export const useRentalContext = () => useContext(RentalContext);

const RentalProvider = ({ children }) => {
  const [rental, rentalDispatch] = useReducer(RentalReducer, INIT_RENTAL);
  return (
    <RentalContext.Provider
      value={{
        rental,
        rentalDispatch,
      }}
    >
      {children}
    </RentalContext.Provider>
  );
};

export default RentalProvider;
