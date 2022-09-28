const SET_THEME = "SET_THEME";

export const setTheme = (mainTheme, subTheme, fontColor) => ({
  type: SET_THEME,
  mainTheme,
  subTheme,
  fontColor
});

const initialState = { mainTheme: "#4c3c4c", subTheme: "#eee" , fontColor: "#9A939B"};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        mainTheme: action.mainTheme,
        subTheme: action.subTheme,
        fontColor: action.fontColor
      };
    default:
      return state;
  }
};

export default themeReducer;
