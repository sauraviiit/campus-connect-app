"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface ConnectionRequest {
    from: string;
    to: string;
    status: 'pending' | 'accepted' | 'rejected';
    timestamp: number;
    fromName?: string; // Helper for UI
}

interface Connection {
    user1: string;
    user2: string;
    timestamp: number;
}

interface ConnectionContextType {
    requests: ConnectionRequest[];
    connections: Connection[];
    sendRequest: (toEmail: string) => void;
    acceptRequest: (fromEmail: string) => void;
    rejectRequest: (fromEmail: string) => void;
    getPendingRequests: () => ConnectionRequest[];
    isConnected: (email: string) => boolean;
    hasPendingRequest: (email: string) => boolean; // Sent or Received
    getConnectionStatus: (email: string) => 'none' | 'pending_sent' | 'pending_received' | 'connected';
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);

export const ConnectionProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const [requests, setRequests] = useState<ConnectionRequest[]>([]);
    const [connections, setConnections] = useState<Connection[]>([]);

    useEffect(() => {
        // Load from localStorage on mount
        const storedRequests = JSON.parse(localStorage.getItem('connectionRequests') || '[]');
        const storedConnections = JSON.parse(localStorage.getItem('connections') || '[]');
        setRequests(storedRequests);
        setConnections(storedConnections);
    }, []);

    const saveRequests = (newRequests: ConnectionRequest[]) => {
        setRequests(newRequests);
        localStorage.setItem('connectionRequests', JSON.stringify(newRequests));
    };

    const saveConnections = (newConnections: Connection[]) => {
        setConnections(newConnections);
        localStorage.setItem('connections', JSON.stringify(newConnections));
    };

    const sendRequest = (toEmail: string) => {
        if (!user) return;

        const newRequest: ConnectionRequest = {
            from: user.email,
            to: toEmail,
            status: 'pending',
            timestamp: Date.now(),
            fromName: user.name
        };

        // Check if request already exists
        if (requests.some(r => r.from === user.email && r.to === toEmail && r.status === 'pending')) {
            return;
        }

        saveRequests([...requests, newRequest]);
    };

    const acceptRequest = (fromEmail: string) => {
        if (!user) return;

        // Update request status
        const updatedRequests = requests.map(req => {
            if (req.from === fromEmail && req.to === user.email && req.status === 'pending') {
                return { ...req, status: 'accepted' as const };
            }
            return req;
        });
        saveRequests(updatedRequests);

        // Add to connections
        const newConnection: Connection = {
            user1: fromEmail,
            user2: user.email,
            timestamp: Date.now()
        };
        saveConnections([...connections, newConnection]);
    };

    const rejectRequest = (fromEmail: string) => {
        if (!user) return;

        const updatedRequests = requests.map(req => {
            if (req.from === fromEmail && req.to === user.email && req.status === 'pending') {
                return { ...req, status: 'rejected' as const };
            }
            return req;
        });
        saveRequests(updatedRequests);
    };

    const getPendingRequests = () => {
        if (!user) return [];
        return requests.filter(req => req.to === user.email && req.status === 'pending');
    };

    const isConnected = (email: string) => {
        if (!user) return false;
        return connections.some(c =>
            (c.user1 === user.email && c.user2 === email) ||
            (c.user1 === email && c.user2 === user.email)
        );
    };

    const hasPendingRequest = (email: string) => {
        if (!user) return false;
        return requests.some(req =>
            (req.from === user.email && req.to === email && req.status === 'pending') ||
            (req.from === email && req.to === user.email && req.status === 'pending')
        );
    };

    const getConnectionStatus = (email: string): 'none' | 'pending_sent' | 'pending_received' | 'connected' => {
        if (!user) return 'none';

        if (isConnected(email)) return 'connected';

        const sentRequest = requests.find(req => req.from === user.email && req.to === email && req.status === 'pending');
        if (sentRequest) return 'pending_sent';

        const receivedRequest = requests.find(req => req.from === email && req.to === user.email && req.status === 'pending');
        if (receivedRequest) return 'pending_received';

        return 'none';
    };

    return (
        <ConnectionContext.Provider value={{
            requests,
            connections,
            sendRequest,
            acceptRequest,
            rejectRequest,
            getPendingRequests,
            isConnected,
            hasPendingRequest,
            getConnectionStatus
        }}>
            {children}
        </ConnectionContext.Provider>
    );
};

export const useConnection = () => {
    const context = useContext(ConnectionContext);
    if (context === undefined) {
        throw new Error('useConnection must be used within a ConnectionProvider');
    }
    return context;
};
