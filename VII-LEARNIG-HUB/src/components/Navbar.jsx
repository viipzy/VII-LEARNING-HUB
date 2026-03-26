import { useContext } from 'react';
import { AuthContext } from '../store/AuthContext';

export default function Navbar() {
    const { user, darkMode, toggleTheme } = useContext(AuthContext);

    const s = {
        nav: {
            width: '100%', padding: '15px 5%',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            backgroundColor: darkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)', borderBottom: darkMode ? '1px solid #1e293b' : '1px solid #e2e8f0',
            position: 'sticky', top: 0, zIndex: 2000
        }
    };

    return (
        <nav style={s.nav}>
            <div style={{fontWeight: '900', color: '#818cf8', fontSize: '24px'}}>VEE.</div>
            <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                <button onClick={toggleTheme} style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px'}}>
                    {darkMode ? '☀️' : '🌙'}
                </button>
                <span style={{fontSize: '14px', fontWeight: 'bold'}}>{user?.name}</span>
            </div>
        </nav>
    );
}