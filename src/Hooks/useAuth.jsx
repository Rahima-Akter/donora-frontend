import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider/Context';

const useAuth = () => {
   const auth = useContext(AuthContext)
   return auth;
};

export default useAuth;