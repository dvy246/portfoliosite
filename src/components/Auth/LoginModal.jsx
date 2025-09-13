import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
const LoginModal = ({ isOpen, onClose }) => {
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState('');
    const { signIn } = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setAuthError('');
        try {
            await signIn(password);
            toast.success('Welcome back, Admin!');
            onClose();
            setPassword('');
        }
        catch (error) {
            console.error('Authentication error:', error);
            setAuthError('Invalid admin password');
            toast.error('Invalid admin password');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx(AnimatePresence, { children: isOpen && (_jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: onClose, className: "absolute inset-0 bg-black/50 backdrop-blur-sm" }), _jsxs(motion.div, { initial: { opacity: 0, scale: 0.9, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.9, y: 20 }, className: "relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4", children: [_jsx("button", { onClick: onClose, className: "absolute top-4 right-4 text-navy-400 hover:text-navy-600 transition-colors", children: _jsx(X, { className: "w-6 h-6" }) }), _jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(Lock, { className: "w-8 h-8 text-gold-600" }) }), _jsx("h2", { className: "text-2xl font-bold text-navy-900", children: "Admin Access" }), _jsx("p", { className: "text-navy-600 mt-2", children: "Enter admin password to edit portfolio" })] }), authError && (_jsxs(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, className: "mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3", children: [_jsx(AlertCircle, { className: "w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" }), _jsxs("div", { children: [_jsx("p", { className: "text-red-800 text-sm font-medium", children: "Authentication Failed" }), _jsx("p", { className: "text-red-700 text-sm mt-1", children: authError })] })] })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-navy-700 mb-2", children: "Admin Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-navy-400" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full pl-10 pr-4 py-3 border border-navy-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200", placeholder: "Enter admin password", required: true })] })] }), _jsx(motion.button, { type: "submit", disabled: isLoading, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, className: "w-full bg-gradient-to-r from-gold-600 to-gold-500 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed", children: isLoading ? (_jsx("div", { className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" })) : (_jsx("span", { children: "Access Admin Panel" })) })] })] })] })) }));
};
export default LoginModal;
