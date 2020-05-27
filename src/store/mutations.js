export const doSetAlert = (state, alert) => {
  state.alert = alert;
  setTimeout(() => {
    state.alert = null;
  }, 3000);
};
