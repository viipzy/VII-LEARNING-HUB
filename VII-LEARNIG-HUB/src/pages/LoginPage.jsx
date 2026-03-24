import {useState } from 'react';
import {useNavigate} from '.../';
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

    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>Platform Access Portal</h2>
          <p>Please identify yourelf to proceed to the course catalog.</p>

          <form onSubmit={handleLogin} style={styles.form}>
            <input
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              requirred
            />

            <button type="submit" style={styles.button}>
              Enter Platform
            </button>
          </form>
        </div>
      </div>
    );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f9",
  },
  card: {
    padding: "40px",
    borderRadius: "8px",
    backgroundColor: "white",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#0056b3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};