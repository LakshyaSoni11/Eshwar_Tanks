import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase/firebase';


const AuthContext = React.createContext();
export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, inatializeUser);
    return unsubscribe;
  },[])
  async function inatializeUser(user){
    if(user){
      setUserLoggedIn(true);
      setCurrentUser({...user})
    }
    else{
      setUserLoggedIn(false);
      setCurrentUser(null);
    }
    setLoading(false)
  }
  const Value = {
    currentUser,
    loading,
    userLoggedIn
  }
  return (
    <AuthContext.Provider value={Value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}