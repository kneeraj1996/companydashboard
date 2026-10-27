import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Body } from "./components";
import Home from "./screens/Home/Home";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Profile from "./screens/Profile/Profile";
import Directory from "./screens/Directory/Directory";
import HolidayCalendar from "./screens/Holiday/HolidayCalendar";
import JobOpeningList from "./screens/Refer/JobOpeningList";
import CreateDSR from "./screens/DSR/CreateDSR";
import MyLeaves from "./screens/Leave/MyLeaves";
import LunchCoupon from "./screens/Food/LunchCoupon";
import ReferCandidate from "./screens/Refer/ReferCandidate";
import Auth from './screens/Auth/Auth';

function App() {

  const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        index: true,
        element: <Auth />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/directory",
        element: <Directory />,
      },
       {
        path: "/holidayCalendar",
        element: <HolidayCalendar />,
      },
      {
        path: "/jobOpeningList",
        element: <JobOpeningList />,
      },
      {
        path: "/createDsr",
        element: <CreateDSR />,
      },
      {
        path: "/MyLeaves",
        element: <MyLeaves />,
      },
       {
        path: "/LunchCoupon",
        element: <LunchCoupon />,
      },
      {
        path: "/ReferCandidate",
        element: <ReferCandidate />,
      },
    ],
  },
]);

  return (
     <Provider store={appStore}>
      <div>
      
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;
