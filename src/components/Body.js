
import { Outlet } from 'react-router-dom'
import { Header, SideBar } from './index';
import { useSelector, useDispatch } from 'react-redux';
import Notifications from '../screens/Notification/Notifications';
import { toggleNotificationWindow } from '../utils/configSlice';

const Body = () => {
  const dispatch = useDispatch();
  const isOpened = useSelector((store) => store.config.expandSideBar);
  const user = useSelector((store) => store.config.user);
  const isNotificationWindowOpened = useSelector((store) => store.config.isNotificationWindowOpened);
  
  const onNotificationScreenToggle = () => {
    dispatch(toggleNotificationWindow())
  }
  
  return (
    <div className="pt-20">
      
      
      <Header />
      <SideBar />

      
      <main
        className={`min-w-0 ${
          user?.uid ? (isOpened ? "ml-20 md:ml-60" : "ml-20") : ""
        }`}
      >
        <Outlet />
      </main>
       <Notifications isOpen={isNotificationWindowOpened} onScreenToggle={onNotificationScreenToggle} />
    </div>
  )
}

export default Body