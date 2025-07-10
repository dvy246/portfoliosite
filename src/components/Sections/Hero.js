import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useContentSections } from '../../hooks/useContent';
import EditableContent from '../Admin/EditableContent';
import EditableImage from '../Admin/EditableImage';
const Hero = () => {
    const { content, saveContent } = useContentSections([
        'hero_title',
        'hero_subtitle',
        'hero_badge',
        'hero_cta_text',
        'hero_floating_badge',
        'hero_scroll_text',
        'profile_photo'
    ]);
    const scrollToAbout = () => {
        const element = document.querySelector('#about');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (_jsxs("section", { className: "min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-navy-50 via-platinum-50 to-gold-50", children: [_jsxs("div", { className: "absolute inset-0", children: [_jsx("div", { className: "absolute top-20 left-10 w-72 h-72 bg-gold-200/20 rounded-full blur-3xl animate-float" }), _jsx("div", { className: "absolute bottom-20 right-10 w-96 h-96 bg-navy-200/20 rounded-full blur-3xl animate-float", style: { animationDelay: '2s' } })] }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: [_jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, className: "space-y-8", children: [_jsx(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.2, duration: 0.6 }, className: "inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gold-200 shadow-lg", children: _jsx(EditableContent, { name: "hero_badge", defaultContent: "Finance + AI Professional", className: "text-sm font-medium text-navy-700" }) }), _jsx(motion.h1, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4, duration: 0.8 }, className: "text-4xl md:text-6xl font-bold text-navy-900 leading-tight", children: _jsx(EditableContent, { name: "hero_title", defaultContent: "Hey, Divy here! \uD83D\uDC4B Finance Meets Tech", className: "block text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-500", multiline: true }) }), _jsx(motion.p, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.6, duration: 0.8 }, className: "text-xl md:text-2xl text-navy-600 leading-relaxed", children: _jsx(EditableContent, { name: "hero_subtitle", defaultContent: "BCom graduate with a passion for AI. I bridge business strategy with cutting-edge technology to solve real-world problems.", multiline: true }) }), _jsx(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.8, duration: 0.8 }, className: "pt-8", children: _jsxs("button", { onClick: () => {
                                                const element = document.querySelector('#contact');
                                                if (element) {
                                                    element.scrollIntoView({ behavior: 'smooth' });
                                                }
                                            }, className: "group relative inline-flex items-center space-x-3 bg-gradient-to-r from-gold-600 to-gold-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300", children: [_jsx(EditableContent, { name: "hero_cta_text", defaultContent: "Let's Solve Problems Together", className: "text-white" }), _jsx(motion.div, { animate: { x: [0, 5, 0] }, transition: { repeat: Infinity, duration: 1.5 }, children: "\u2192" })] }) })] }), _jsx(motion.div, { initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.4, duration: 0.8 }, className: "flex justify-center lg:justify-end", children: _jsxs("div", { className: "relative", children: [_jsx("div", { className: "w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border-8 border-white/50 backdrop-blur-sm", children: _jsx(EditableImage, { src: content.profile_photo || 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=800', alt: "Profile Photo", onSave: (imageUrl) => saveContent('profile_photo', imageUrl), className: "w-full h-full object-cover" }) }), _jsx(motion.div, { animate: { y: [0, 10, 0] }, transition: { repeat: Infinity, duration: 4, delay: 1 }, className: "absolute -bottom-4 -left-4 bg-navy-600 text-white p-3 rounded-full shadow-lg", children: _jsx(EditableContent, { name: "hero_floating_badge", defaultContent: "AI", className: "text-sm font-bold text-white" }) })] }) })] }), _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 1.2, duration: 0.8 }, className: "absolute bottom-8 left-1/2 transform -translate-x-1/2", children: _jsxs("button", { onClick: scrollToAbout, className: "flex flex-col items-center space-y-2 text-navy-600 hover:text-gold-600 transition-colors group", children: [_jsx(EditableContent, { name: "hero_scroll_text", defaultContent: "Discover More", className: "text-sm font-medium" }), _jsx(motion.div, { animate: { y: [0, 8, 0] }, transition: { repeat: Infinity, duration: 2 }, children: _jsx(ArrowDown, { className: "w-5 h-5" }) })] }) })] })] }));
};
export default Hero;
