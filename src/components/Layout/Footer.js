import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Heart, Shield } from 'lucide-react';
import { useContentSections } from '../../hooks/useContent';
import EditableContent from '../Admin/EditableContent';
import LoginModal from '../Auth/LoginModal';
const Footer = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const { content } = useContentSections([
        'contact_footer_title',
        'contact_footer_email',
        'contact_footer_phone',
        'contact_footer_location'
    ]);
    return (_jsxs(_Fragment, { children: [_jsx("footer", { className: "bg-navy-900 text-white py-12", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "grid md:grid-cols-3 gap-8", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-2xl font-bold mb-4", children: "Divy Yadav" }), _jsx("p", { className: "text-navy-300 leading-relaxed", children: "Bridging the gap between business intelligence and artificial intelligence to create solutions that drive real-world impact." })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-lg font-semibold mb-4", children: "Quick Links" }), _jsx("div", { className: "space-y-2", children: ['About', 'Skills', 'Projects', 'Testimonials', 'Contact'].map((link) => (_jsx("button", { onClick: () => {
                                                    const element = document.querySelector(`#${link.toLowerCase()}`);
                                                    if (element) {
                                                        element.scrollIntoView({ behavior: 'smooth' });
                                                    }
                                                }, className: "block text-navy-300 hover:text-gold-400 transition-colors", children: link }, link))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-lg font-semibold mb-4", children: _jsx(EditableContent, { name: "contact_footer_title", defaultContent: "Get in Touch" }) }), _jsxs("div", { className: "space-y-2 text-navy-300", children: [_jsx("p", { children: _jsx(EditableContent, { name: "contact_footer_email", defaultContent: "divy.yadav@aiexpert.com" }) }), _jsx("p", { children: _jsx(EditableContent, { name: "contact_footer_phone", defaultContent: "+1 (555) 123-4567" }) }), _jsx("p", { children: _jsx(EditableContent, { name: "contact_footer_location", defaultContent: "San Francisco, CA" }) })] })] })] }), _jsxs("div", { className: "border-t border-navy-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center", children: [_jsxs("div", { className: "flex items-center space-x-2 text-navy-300", children: [_jsx("span", { children: "Made with" }), _jsx(Heart, { className: "w-4 h-4 text-red-500" }), _jsx("span", { children: "by Divy Yadav" })] }), _jsxs("div", { className: "flex items-center space-x-4 mt-4 md:mt-0", children: [_jsxs("button", { onClick: () => setIsLoginModalOpen(true), className: "flex items-center space-x-2 text-navy-400 hover:text-gold-400 transition-colors text-sm", children: [_jsx(Shield, { className: "w-4 h-4" }), _jsx("span", { children: "Admin" })] }), _jsx("span", { className: "text-navy-400 text-sm", children: "\u00A9 2024 All rights reserved" })] })] })] }) }), _jsx(LoginModal, { isOpen: isLoginModalOpen, onClose: () => setIsLoginModalOpen(false) })] }));
};
export default Footer;
