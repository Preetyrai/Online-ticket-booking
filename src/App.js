import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import { Login } from "./component/Login";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { removeUserAction, userEntryAction } from "./util/userSlice";

import { useDispatch } from "react-redux";
import Browse from "./component/Browse";

function App() {
  const dispatch = useDispatch();

  const auth = getAuth();
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
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
      } else {
        dispatch(removeUserAction());
      }
    });
  }, []);
  return <RouterProvider router={appRouter} />;
}

export default App;
