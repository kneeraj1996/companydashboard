import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { addUser, removeUser, toggleNotificationWindow, toggleSideBar } from "../utils/configSlice";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { capitalizeFirstLetter } from "../utils/helper";

const Header = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.config.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.displayName) {
        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          }),
        );
      } else if (!user) {
        dispatch(removeUser());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  const onMenuPressed = () => {
    dispatch(toggleSideBar());
  };
  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-20 justify-between bg-white px-5 text-blue-700 shadow-sm">
      <div className="flex items-center">
        <img
          src="https://img.magnific.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?semt=ais_hybrid"
          className="h-20 w-20"
        />
        <h1 className="text-blue-600 text-lg mr-2 font-bold">Beyond Root</h1>
        {userData&& userData.uid?
          <FontAwesomeIcon onClick={onMenuPressed} className="w-0 invisible md:w-auto md:visible "  icon={faBars} size="lg" />: null}
      </div>
      {
        userData&& userData.uid?
        <div className="flex items-center">
        <h1 className="mr-5 font-bold text-lg">{capitalizeFirstLetter(userData.displayName)}</h1>
        <FontAwesomeIcon onClick={() => dispatch(toggleNotificationWindow())} icon={faBell} size="lg" />
      </div>: null}
    </div>
  );
};

export default Header;
