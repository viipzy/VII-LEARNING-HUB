import { useContext } from 'react';
import { AuthContext } from "../store/AuthContext";

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined || context === null) {
        throw new Error ('Critical Error; useAuth must be used within an AuthProvider structural frame.');
    }

    return context;
}

