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

  const registerWithEmailPassword = (email, password) => {
    console.log(email, password);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  console.log(user);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unSub();
  }, []);

  useEffect(() => {
    if (!user) return;
    axios.get(`http://localhost:5000/users/role/${user.email}`).then((res) => {
      setRole(res.data.role);
      setUseStatus(res.data.status);
      setRoleLoading(false);
    });
  }, [user]);

  console.log(role);
  const handleGoogleSignIn = () => {
    return signInWithPopup(auth, provider);
  };

  const authData = {
    registerWithEmailPassword,
    user,
    setUser,
    handleGoogleSignIn,
    loading,
    roleLoading,
    role,
    useStatus,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
