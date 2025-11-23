"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    name: string;
    email: string;
    branch?: string;
    year?: string;
    about?: string;
    skills?: string[];
    linkedin?: string;
    mentorship?: boolean;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (userData: User & { password: string }) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Check for logged in user on mount
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = storedUsers.find((u: any) => u.email === email && u.password === password);

        if (foundUser) {
            const { password, ...userWithoutPass } = foundUser;
            setUser(userWithoutPass);
            localStorage.setItem('currentUser', JSON.stringify(userWithoutPass));
            return true;
        }
        return false;
    };

    const signup = async (userData: User & { password: string }) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        // Check if user already exists
        if (storedUsers.some((u: any) => u.email === userData.email)) {
            throw new Error("User already exists");
        }

        storedUsers.push(userData);
        localStorage.setItem('users', JSON.stringify(storedUsers));

        const { password, ...userWithoutPass } = userData;
        setUser(userWithoutPass);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPass));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
