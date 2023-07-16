import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut
} from "firebase/auth";
import { auth } from "../../firabase/config";

import { updateUser, authStateChange,authSignOut } from "./userSlice";

// const registerDB = async ({ email, password }) => {
//   try {
//     await createUserWithEmailAndPassword(auth, email, password);
//   } catch (error) {
//     throw error;
//   }
// };

// або більш короткий запис цієї функції

// ========REGISTERUSER=========
export const authSignUp =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
     
    try {
      await createUserWithEmailAndPassword(auth, email, password);
       await updateProfile(auth.currentUser, {
         displayName: login,
       });
      const { displayName, uid} = auth.currentUser;

      dispatch(updateUser({ userId: uid, login: displayName, email }));
    } catch (error) {
      console.log(error);
    }
  };

// ==========LOGIN===========

export const authSingIn = ({ email, password }) => async (dispatch, getState) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    
    return credentials.user;
    
  } catch (error) {
    throw error;
  }
};
// ==========OUT--USER===========
export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    console.log("error", error.message);
  }
};


const updateUserProfile = async (update) => {
  const user = auth.currentUser;

  // якщо такий користувач знайдений
  if (user) {
    // оновлюємо його профайл
    try {
      await updateProfile(user, update);
    } catch (error) {
      throw error;
    }
  }
};

export const authStateChanged = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid, displayName, email } = auth.currentUser;
      dispatch(
        updateUser({
          userId: uid,
          login: displayName,
          email
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};