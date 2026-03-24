import {useState } from 'react';
import {useNavigate} from '../react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage(){
    const [username, setUsername] = useState ('');

    const navigate = useNavigate();

    const {login} = useAuth();

    const handleLogin = (e) => {
        e.preventDefault();

        if (username.trim() === '') return;

        login ({ name: username });

        navigate('catalog', {replace: true});
    };

    return(
        
    )
}