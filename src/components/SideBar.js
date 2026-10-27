import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faFolderClosed,
  faBowlFood,
  faCalendar,
  faShare,
  faStickyNote,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { removeUser } from "../utils/configSlice";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

const SideBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.config.user);
  const [selectedTab, setSelectedTab] = useState('Home');
  const [logoutError, setLogoutError] = useState("");
  const navigate = useNavigate();
  const isOpened = useSelector((store) => store.config.expandSideBar);

  const onItemPressed = async (name) => {
    setSelectedTab(name);
    switch (name) {
      case "Home":
        navigate("/home");
        break;
      case "Profile":
        navigate("/profile");
        break;
      case 'Directory':
        navigate('/directory');
        break;
      case 'Holiday':
        navigate('/holidayCalendar');
        break;
      case 'Refer a Friend':
        navigate('/jobOpeningList');
        break;
      case 'DSR':
        navigate('/createDsr');
        break;
      case 'Leave':
        navigate('/MyLeaves')
        break;
      case 'Food':
        navigate('/LunchCoupon');
        break;
      case 'Log Out':
        setLogoutError("");
        try {
          await signOut(auth);
          dispatch(removeUser());
          navigate("/", { replace: true });
        } catch (error) {
          console.error("Unable to sign out:", error);
          setLogoutError("Unable to log out. Please try again.");
        }
        break;

    }
  };

  if (!user?.uid) return null;

  const renderListItem = (icon, name) => {
    return (
      <li
        onClick={() => onItemPressed(name)}
        className={`cursor-pointer flex items-center mb-10 hover:text-blue-600 ${isOpened ? "justify-center md:justify-normal" : "justify-center"} ${selectedTab == name? 'text-blue-600': ''}`}
      >
        <FontAwesomeIcon icon={icon} size="md" />
        {isOpened ? (
          <div className="w-0 invisible md:w-auto md:visible font-bold text-lg ml-2 ">{name}</div>
        ) : null}
      </li>
    );
  };

  return (
    <div
      className={`fixed left-0 top-20 z-40 h-[calc(100vh-5rem)] overflow-y-auto rounded-r-lg border-2 bg-white px-2 shadow-lg ${isOpened ? "w-20 md:w-60" : "w-20"}`}
    >
      {logoutError && (
        <p role="alert" className="mt-3 text-center text-sm text-red-600">
          {logoutError}
        </p>
      )}
      <ul className="mt-5">
        {renderListItem(faHouse, "Home")}
        {renderListItem(faUser, "Profile")}
        {renderListItem(faFolderClosed, "Directory")}
        {renderListItem(faBowlFood, "Food")}
        {renderListItem(faCalendar, "Holiday")}
        {renderListItem(faShare, "Refer a Friend")}
        {renderListItem(faCalendar, "Leave")}
        {renderListItem(faStickyNote, "DSR")}
        {renderListItem(faSignOut, "Log Out")}
      </ul>
    </div>
  );
};

export default SideBar;
