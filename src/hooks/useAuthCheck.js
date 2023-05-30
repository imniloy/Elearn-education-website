import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // geting user informations from the user localStorage and store the response in localAuth variable. if localAuth is not undefined store it in the localAuth variable then convert into a js object and check some cratria. if the localAuth informations can fullfiled all cratrias then dispatch the userLoggedIn informations and store the information in redux store.. this will help us to identify the user... l
    const localAuth = localStorage?.getItem("auth");

    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.accessToken && auth?.user) {
        dispatch(
          userLoggedIn({
            accessToken: auth.accessToken,
            user: auth.user,
          })
        );
      }
    }
    setAuthChecked(true);
  }, [dispatch, setAuthChecked]);

  // return true if the user information found otherwise return false...
  return authChecked;
}
