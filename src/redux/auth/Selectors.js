export const login = state => state.auth.login;
console.log(login)
export const selectUser = state => state.auth.user;

export const selectIsRefreshing = state => state.auth.isRefreshing;