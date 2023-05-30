import { useSelector } from "react-redux";

const useAuth = () => {
  const auth = useSelector((state) => state.auth);

  // checking for user infos... if the user is available on redux store then return userInfo else return empty Object...
  if (auth?.accessToken && auth?.user) {
    return auth.user;
  } else {
    return {};
  }
};

export default useAuth;
