import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { ShoppingCart } from "phosphor-react";
import "../components/navbar.css";
import { useNavigate } from "react-router-dom";
import { ref, get, child, getDatabase } from "firebase/database";
import { useState } from "react";
import DeFoto from "../assets/defUser.png";

export const Navbar = () => {
  const [name, setName] = useState();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const logOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  const dbRef = ref(getDatabase());

  const namePw = () => {
    get(child(dbRef, `users/${user.uid}`))
      .then((snapshot) => {
        const { username } = snapshot.val();
        setName(username);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="navbar">
      <div className="links">
        <Link to="/"> Home </Link>
        {!user && <Link to="/register"> Register </Link>}
        {!user ? (
          <Link to="/login"> Login </Link>
        ) : (
          <Link to="/shop"> Shop </Link>
        )}
        {user && (
          <Link to="/cart">
            <ShoppingCart size={30} />
          </Link>
        )}
      </div>
      <div className="user">
        {user && (
          <>
            {namePw()}
            <p> Welcome, {user?.displayName || name}</p>
            <img src={user?.photoURL || DeFoto} width="50" height="50" />
            <button onClick={logOut}> Logout</button>
          </>
        )}
      </div>
    </div>
  );
};
