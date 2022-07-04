import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
} from "react";
import { AppReducer, initialState } from "./AppReducer";

const AppContext = createContext();
export function AppWrapper({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  //console.log(initialState.number);
  //dispatch({ type: "add_number", value: 3 });
  //console.log(state);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("state1"))) {
      //checking if there already is a state in localstorage
      //if yes, update the current state with the stored one
      dispatch({
        type: "init_stored",
        value: JSON.parse(localStorage.getItem("state1")),
      });
      console.log(JSON.parse(localStorage.getItem("state1")));
    }
  }, []);
  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem("state1", JSON.stringify(state));

      //create and/or set a new localstorage variable called "state"
    }
  }, [state]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}
