import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchOne } from '../lib/turso';
import bcrypt from 'bcryptjs';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const sessionStr = localStorage.getItem('admin_session');
        if (sessionStr) {
            try {
                const session = JSON.parse(sessionStr);
                if (session.expiresAt && session.expiresAt > Date.now()) {
                    setIsAuthenticated(true);
                    setUser(session);
                } else {
                    localStorage.removeItem('admin_session');
                }
            } catch (e) {
                localStorage.removeItem('admin_session');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const user = await fetchOne('SELECT * FROM users WHERE username = ?', [username]);
            if (user) {
                const match = await bcrypt.compare(password, user.password_hash.replace(/^\$2y\$/, '$2a$'));
                if (match) {
                    setIsAuthenticated(true);
                    const sessionData = { 
                        username: user.username, 
                        role: user.role || 'Admin',
                        expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours 
                    };
                    setUser(sessionData);
                    localStorage.setItem('admin_session', JSON.stringify(sessionData));
                    return true;
                }
            }
        } catch (e) {
            console.error('Login error', e);
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('admin_session');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
