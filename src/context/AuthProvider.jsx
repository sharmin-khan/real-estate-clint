import React from 'react';
import { AuthContext } from './AuthContext/AuthContext';

const AuthProvider = ({children}) => {
  
    return (
       <AuthContext>
        {children}
       </AuthContext>
    );
};

export default AuthProvider;