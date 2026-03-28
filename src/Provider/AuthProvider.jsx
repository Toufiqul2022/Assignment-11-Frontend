import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios";

const provider = new GoogleAuthProvider();
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [useStatus, setUseStatus] = useState("");

  const registerWithEmailPassword = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser) {
        setRole("");
        setUseStatus("");
        setRoleLoading(false);
      }
    });
    return () => unSub();
  }, []);

  useEffect(() => {
    if (!user) return;
    setRoleLoading(true);
    axios
      .get(
        `https://assignment-11-backend-alpha.vercel.app/users/role/${user.email}`,
      )
      .then((res) => {
        setRole(res.data.role || "donor");
        setUseStatus(res.data.status || "active");
      })
      .catch(() => {
        setRole("donor");
        setUseStatus("active");
      })
      .finally(() => setRoleLoading(false));
  }, [user]);

  const handleGoogleSignIn = () => signInWithPopup(auth, provider);

  return (
    <AuthContext.Provider
      value={{
        registerWithEmailPassword,
        user,
        setUser,
        handleGoogleSignIn,
        loading,
        roleLoading,
        role,
        useStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
