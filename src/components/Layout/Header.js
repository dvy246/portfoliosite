import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { user, signOut } = useAuth();
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const navItems = [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Contact', href: '#contact' },
    ];
    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };
    return (_jsx(motion.header, { initial: { y: -100 }, animate: { y: 0 }, className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'}`, children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "flex justify-between items-center py-4", children: [_jsx(motion.div, { whileHover: { scale: 1.05 }, className: "text-2xl font-bold text-navy-900", children: "Divy Yadav" }), _jsx("nav", { className: "hidden md:flex space-x-8", children: navItems.map((item) => (_jsx("button", { onClick: () => scrollToSection(item.href), className: "text-navy-700 hover:text-gold-600 transition-colors duration-200 font-medium", children: item.name }, item.name))) }), _jsx("div", { className: "hidden md:flex items-center space-x-4", children: user?.is_admin && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(User, { className: "w-4 h-4 text-gold-600" }), _jsx("span", { className: "text-sm text-navy-700", children: "Admin" }), _jsx("button", { onClick: signOut, className: "text-navy-700 hover:text-red-600 transition-colors", children: _jsx(LogOut, { className: "w-4 h-4" }) })] })) }), _jsx("button", { onClick: () => setIsMenuOpen(!isMenuOpen), className: "md:hidden text-navy-900", children: isMenuOpen ? _jsx(X, { className: "w-6 h-6" }) : _jsx(Menu, { className: "w-6 h-6" }) })] }), isMenuOpen && (_jsxs(motion.nav, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, className: "md:hidden py-4 border-t border-navy-200", children: [navItems.map((item) => (_jsx("button", { onClick: () => scrollToSection(item.href), className: "block w-full text-left py-2 text-navy-700 hover:text-gold-600 transition-colors", children: item.name }, item.name))), user?.is_admin && (_jsx("button", { onClick: signOut, className: "block w-full text-left py-2 text-red-600 hover:text-red-700 transition-colors", children: "Sign Out" }))] }))] }) }));
};
export default Header;
