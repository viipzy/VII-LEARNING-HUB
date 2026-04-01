import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    if (!user) return null;

    return (
        <>
            <nav className="navbar-container">
                <Link to="/catalogue" className="nav-logo">VEE.</Link>

                <div className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    ☰
                </div>

                <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                    <Link to="/catalogue" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Explore</Link>
                    <Link to="/profile" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
                    
                    <div className="user-section">
                        <span className="welcome-text">Welcome, <b style={{color: '#fff'}}>{user.displayName?.split(' ')[0]}</b> 👋</span>
                        
                        {/* NEW: Displays Custom Image OR Default Initial */}
                        <div className="avatar" onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }}>
                            {user.photoURL ? (
                                <img src={user.photoURL} alt="Avatar" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
                            ) : (
                                user.displayName ? user.displayName.charAt(0).toUpperCase() : 'V'
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <style>{`
                .navbar-container { display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; background: #0f172a; border-bottom: 1px solid rgba(255,255,255,0.05); position: sticky; top: 0; z-index: 100; font-family: 'Poppins', sans-serif; }
                .nav-logo { color: #818cf8; font-size: 28px; font-weight: 900; text-decoration: none; letter-spacing: -1px; }
                .hamburger { display: none; font-size: 28px; color: #fff; cursor: pointer; }
                .nav-links { display: flex; align-items: center; gap: 30px; }
                .nav-link { color: #94a3b8; text-decoration: none; font-weight: 600; font-size: 15px; transition: color 0.2s; }
                .nav-link:hover { color: #fff; }
                .user-section { display: flex; align-items: center; gap: 15px; margin-left: 20px; padding-left: 20px; border-left: 1px solid rgba(255,255,255,0.1); }
                .welcome-text { color: #94a3b8; font-size: 14px; }
                
                .avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #a855f7); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px; cursor: pointer; border: 2px solid #818cf8; overflow: hidden; }

                @media (max-width: 768px) {
                    .navbar-container { padding: 15px 20px; }
                    .hamburger { display: block; }
                    .nav-links { display: none; flex-direction: column; position: absolute; top: 70px; left: 0; width: 100%; background: #0f172a; padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.1); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
                    .nav-links.mobile-open { display: flex; }
                    .user-section { border-left: none; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; margin-left: 0; padding-left: 0; flex-direction: column; width: 100%; justify-content: center; }
                }
            `}</style>
        </>
    );
}