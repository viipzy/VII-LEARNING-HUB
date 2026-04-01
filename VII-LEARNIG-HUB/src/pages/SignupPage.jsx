import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';
import googleIcon from '../assets/google.png'; 

export default function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const { signup, loginWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await signup(email, password, name);
            navigate('/profile'); 
        } catch (err) {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                setError('This email is already registered.');
            } else if (err.code === 'auth/weak-password') {
                setError('Password should be at least 6 characters.');
            } else {
                setError('Failed to create an account. Please try again.');
            }
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        try {
            await loginWithGoogle();
            navigate('/profile'); 
        } catch (err) {
            console.error("Google Auth Error:", err);
            if (err.code === 'auth/popup-closed-by-user') {
                setError('Google sign-in was cancelled.');
            } else if (err.code === 'auth/operation-not-supported-in-this-environment') {
                setError('Google Sign-In is not enabled in Firebase Console.');
            } else {
                setError('Failed to authenticate with Google.');
            }
        }
    };

    const s = {
        page: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#020617', fontFamily: "'Poppins', sans-serif" },
        card: { background: '#0f172a', padding: '50px 40px', borderRadius: '24px', width: '100%', maxWidth: '400px', boxSizing: 'border-box', border: '1px solid rgba(255,255,255,0.05)' },
        logo: { textAlign: 'center', color: '#fff', fontSize: '32px', fontWeight: '900', margin: '0 0 10px 0', letterSpacing: '-1px' },
        subtitle: { textAlign: 'center', color: '#94a3b8', fontSize: '15px', margin: '0 0 30px 0' },
        error: { color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '8px', textAlign: 'center', fontSize: '14px', marginBottom: '20px', fontWeight: '600' },
        input: { width: '100%', padding: '14px', marginBottom: '20px', borderRadius: '10px', border: '1px solid #334155', background: '#020617', color: '#fff', fontSize: '15px', boxSizing: 'border-box' },
        submitBtn: { width: '100%', padding: '14px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', transition: 'background 0.2s', marginBottom: '20px' },
        divider: { display: 'flex', alignItems: 'center', margin: '30px 0', color: '#475569', fontSize: '12px', fontWeight: '600' },
        line: { flex: 1, height: '1px', background: '#334155' },
        googleBtn: { width: '100%', padding: '14px', background: 'transparent', color: '#fff', border: '1px solid #334155', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', transition: 'background 0.2s' },
        footerText: { textAlign: 'center', color: '#94a3b8', fontSize: '14px', marginTop: '30px' }
    };

    return (
        <div style={s.page}>
            <div style={s.card}>
                <h1 style={s.logo}>VEE.</h1>
                <p style={s.subtitle}>Start your journey today</p>
                
                {error && <div style={s.error}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        style={s.input} 
                        required 
                    />
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        style={s.input} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password (Min 6 chars)" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        style={s.input} 
                        required 
                    />
                    <button type="submit" style={s.submitBtn} disabled={isLoading}>
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div style={s.divider}>
                    <div style={s.line}></div>
                    <span style={{ padding: '0 15px' }}>OR</span>
                    <div style={s.line}></div>
                </div>

                <button style={s.googleBtn} onClick={handleGoogleLogin}>
                    <img src={googleIcon} width="18" alt="Google" />
                    Sign up with Google
                </button>

                <p style={s.footerText}>
                    Already have an account? <Link to="/login" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: '700' }}>Sign In</Link>
                </p>
            </div>
        </div>
    );
}
