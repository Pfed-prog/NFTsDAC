export const initialState = {
  id: undefined,
};
export const AppReducer = (state, action) => {
  switch (action.type) {
    case "init_stored":
      return action.value;

    case "add_id": {
      console.log("wtf");
      console.log(action.value);
      return {
        ...state,
        id: action.value,
      };
    }
  }
};
