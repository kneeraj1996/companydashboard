import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { checkValidData, generate3DigitNumber } from "../../utils/helper";
import { auth } from "../../utils/firebase";
import { addUser } from "../../utils/configSlice";

const SignInModal = () => {
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitButton = () => {
    console.log("fullNameRef---", fullName);
    console.log("emailref===", email);
    console.log("passwordref===", password);

    const message = checkValidData(
      email.current.value,
      password.current.value,
      fullName.current ? fullName.current.value : "",
      isLoginForm,
    );
    setErrorMessage(message);

    if (message) return;

    if (isLoginForm) {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(
            addUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
            }),
          );
          navigate("/home", { replace: true });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(error.code + "-" + error.message);
        });
    } else {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log('log when user register==',user);
          updateProfile(user, {
            displayName: fullName.current.value,
          })
            .then((res) => {
              const { uid, email, displayName } = auth.currentUser;
              console.log('log when user update profile==',res);
              dispatch(
                addUser({
                  uid,
                  email,
                  displayName,
                  id: generate3DigitNumber(),
                }),
              );
              navigate("/home", { replace: true });

              //    const myForm = document.getElementById("myForm");
              //     myForm.reset();
              //     setErrorMessage("");
            })
            .catch((error) => {
              setErrorMessage(error.code + "-" + error.message);
            });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(error.code + "-" + error.message);
        });
    }
  };

  return (
    <div className="w-full md:w-3/12 mx-5 rounded-xl">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-5 flex flex-col gap-2 rounded-xl bg-black/50"
      >
        <h1 className="text-white text-2xl font-bold">
          {isLoginForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isLoginForm ? (
          <input
            placeholder="Full Name"
            className=" border-2 p-2 mb-5 rounded-md"
            ref={fullName}
          />
        ) : null}
        <input
          placeholder="Email"
          className=" border-2 p-2 mb-5 rounded-md"
          ref={email}
        />
        <input
          placeholder="Password"
          className=" border-2 p-2 mb-5 rounded-md"
          ref={password}
          type="password"
        />

        <p className="text-red-700 font-bold text-md bg-gradient-to-b from-white to-stone-400 rounded-xl px-2">
          {errorMessage}
        </p>
        <button
          className="py-3 rounded-md w-full bg-blue-300 mb-5 text-white font-bold"
          onClick={onSubmitButton}
        >
          {isLoginForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          onClick={() => setIsLoginForm(!isLoginForm)}
          className="text-white text-center cursor-pointer"
        >
          {isLoginForm
            ? "Are you new to our app?  Sign up now."
            : "Already a member please Sign In"}
        </p>
      </form>
    </div>
  );
};

export default SignInModal;
