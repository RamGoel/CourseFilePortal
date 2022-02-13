import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
/**
 * All Requests related to User
 * @SignUp
 * @SignIn
 * @UserUpdate
 * @UserDelete
 */

/**
 * SignUp function
 * @param {*} data @Object
 * @returns user
 */
const SignUp = async (data) => {
  const user = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
  return user;
};

/**
 * SignIn Function
 * @param {*} data
 * @returns user
 */
const SignIn = async (data) => {
  const user = await signInWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
  return user;
};
/**
 *
 * @param {*} data
 */
const SignOut = async (data) => {
  const isSignOut = await signOut(auth);
  return isSignOut;
};
/**
 *
 * @param {*} data
 * @returns updated Profile
 */
const UpdateUser = async (data) => {
  const updatedUser = updateProfile(auth.currentUser, data);
  return updatedUser;
};
/**
 *
 * @returns
 */
const DeleteUser = async () => {
  const user = auth.currentUser;
  const isDeleted = await deleteUser(user);
  return isDeleted;
};

export { SignUp, SignIn, SignOut, UpdateUser, DeleteUser };
