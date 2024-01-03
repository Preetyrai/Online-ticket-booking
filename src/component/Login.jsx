import React, { useEffect, useRef, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { AppBar, Button, TextField } from "@mui/material";
import { validateCredentials } from "../util/validate";
import { firebaseConfig } from "../util/firebase";
import { userEntryAction } from "../util/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sign, setSign] = useState(true);
  const [err, setErr] = useState(true);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const auth = getAuth();
  const SubmitHandle = () => {
    const name = nameRef.current ? nameRef.current.value : null;
    console.log(name);
    const email = emailRef.current ? emailRef.current.value : null;
    const password = passwordRef.current ? passwordRef.current.value : null;
    const validatemessage = validateCredentials(email, password);
    setErr(validatemessage);
    if (!validatemessage === null) return;

    if (!sign) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          }).then(() => {
            console.log(user);
            const { uid, displayName, email, photoURL } = user;
            dispatch(
              userEntryAction({
                uid: uid,
                email: email,
                displayName: displayName,
                photoURL: photoURL,
              })
            );
          });
        })
        .catch((error) => {
          console.log(error);
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("signout");
          navigate("/");
        });
    }
  };

  return (
    <div className="App">
      <AppBar>
        <toolbar>
          <h1> {sign ? "SIGNIN FORM" : "SIGNUP FORM"}</h1>
        </toolbar>
      </AppBar>
      <form style={{ marginTop: "10%" }} onSubmit={(e) => e.defaultPrevented()}>
        {!sign && (
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="text"
            label="Name"
            variant="outlined"
            inputRef={nameRef}
          />
        )}
        <br />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="Email"
          variant="outlined"
          inputRef={emailRef}
        />
        <br />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="password"
          label="Password"
          variant="outlined"
          inputRef={passwordRef}
          helperText={err}
        />
        <br />
        <Button variant="contained" color="primary" onClick={SubmitHandle}>
          {sign ? "Sign In" : "Sign Up"}
        </Button>
        <br /> <br />
        <label>
          {sign ? "now on online booking?" : "new on online booking?"}{" "}
          {sign ? (
            <span onClick={() => setSign(!sign)}> Sign In</span>
          ) : (
            <span onClick={() => setSign(!sign)}> Sign Up</span>
          )}
        </label>
      </form>
    </div>
  );
};
