const initialState = {
    sidebarShow: "responsive", // Ensure responsive behavior works on mobile
  };
  
  const sidebarReducer = (state = initialState, action) => {
    switch (action.type) {
      case "set":
        return { ...state, sidebarShow: action.sidebarShow };
      case "toggle":
        return {
          ...state,
          sidebarShow: state.sidebarShow === false ? "responsive" : false,
        };
      default:
        return state;
    }
  };
  
  export default sidebarReducer;
  