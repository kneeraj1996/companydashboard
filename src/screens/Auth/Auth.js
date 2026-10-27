import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import SignInModal from "./SignInModal";
import { auth } from "../../utils/firebase";

const Auth = () => {
  const [isAuthReady, setIsAuthReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isInitialAuthCheck = true;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!isInitialAuthCheck) return;
      isInitialAuthCheck = false;

      if (user) {
        navigate("/home", { replace: true });
      } else {
        setIsAuthReady(true);
      }
    });

    return unsubscribe;
  }, [navigate]);

  if (!isAuthReady) return null;

  return (
    <div
      className="h-full w-full
     "
    >
      <div className="absolute z-40 flex h-screen w-screen items-center justify-center">
        <SignInModal />
      </div>
      <div className="absolute">
        <img
          className="h-screen w-screen object-cover"
          src="https://png.pngtree.com/thumb_back/fh260/background/20200806/pngtree-future-technology-portal-with-blue-light-effect-image_385272.jpg"
        ></img>
      </div>
    </div>
  );
};

export default Auth;
