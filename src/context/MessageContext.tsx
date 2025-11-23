"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface Message {
    id: string;
    sender: string;
    receiver: string;
    content: string;
    timestamp: number;
}

interface MessageContextType {
    messages: Message[];
    sendMessage: (to: string, content: string) => void;
    getMessages: (contactEmail: string) => Message[];
    getUnreadCount: (contactEmail: string) => number;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        // Load from localStorage on mount
        const storedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
        setMessages(storedMessages);
    }, []);

    const saveMessages = (newMessages: Message[]) => {
        setMessages(newMessages);
        localStorage.setItem('messages', JSON.stringify(newMessages));
    };

    const sendMessage = (to: string, content: string) => {
        if (!user) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            sender: user.email,
            receiver: to,
            content,
            timestamp: Date.now()
        };

        saveMessages([...messages, newMessage]);
    };

    const getMessages = (contactEmail: string) => {
        if (!user) return [];
        return messages.filter(msg =>
            (msg.sender === user.email && msg.receiver === contactEmail) ||
            (msg.sender === contactEmail && msg.receiver === user.email)
        ).sort((a, b) => a.timestamp - b.timestamp);
    };

    const getUnreadCount = (contactEmail: string) => {
        // Placeholder for unread logic (requires 'read' status in Message interface)
        return 0;
    };

    return (
        <MessageContext.Provider value={{
            messages,
            sendMessage,
            getMessages,
            getUnreadCount
        }}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessage = () => {
    const context = useContext(MessageContext);
    if (context === undefined) {
        throw new Error('useMessage must be used within a MessageProvider');
    }
    return context;
};
