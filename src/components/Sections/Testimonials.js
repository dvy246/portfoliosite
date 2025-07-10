import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Star, Quote, Award, TrendingUp, Users } from 'lucide-react';
const Testimonials = () => {
    const achievements = [
        {
            icon: Award,
            title: 'Academic Excellence',
            description: 'BCom (Hons) with distinction, demonstrating strong analytical and business fundamentals',
            color: 'from-blue-500 to-blue-600'
        },
        {
            icon: TrendingUp,
            title: 'Rapid Skill Development',
            description: 'Mastered advanced AI/ML concepts through intensive self-learning and practical projects',
            color: 'from-gold-500 to-gold-600'
        },
        {
            icon: Users,
            title: 'Collaborative Projects',
            description: 'Successfully completed team projects combining business strategy with technical implementation',
            color: 'from-green-500 to-green-600'
        }
    ];
    const testimonials = [
        {
            name: 'Dr. Sarah Mitchell',
            position: 'Professor of Data Science',
            company: 'University of Technology',
            content: 'Divy\'s unique combination of business understanding and technical aptitude sets him apart. His projects demonstrate not just coding ability, but strategic thinking about real-world applications.',
            image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=200',
            rating: 5
        },
        {
            name: 'Rajesh Kumar',
            position: 'Senior ML Engineer',
            company: 'Tech Innovations Hub',
            content: 'Working with Divy on collaborative projects has been impressive. He brings a fresh perspective that bridges business needs with technical solutions. His learning curve is remarkable.',
            image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
            rating: 5
        }
    ];
    return (_jsx("section", { id: "testimonials", className: "py-20 bg-gradient-to-br from-navy-50 to-platinum-50", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-5xl font-bold text-navy-900 mb-6", children: ["Academic ", _jsx("span", { className: "text-gold-600", children: "Recognition" })] }), _jsx("p", { className: "text-xl text-navy-600 max-w-3xl mx-auto", children: "Recognition from mentors, peers, and academic leaders who've witnessed my journey from commerce to AI" })] }), _jsx("div", { className: "grid md:grid-cols-3 gap-8 mb-16", children: achievements.map((achievement, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { delay: index * 0.2, duration: 0.8 }, viewport: { once: true }, className: "bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center", children: [_jsx("div", { className: `w-16 h-16 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center mx-auto mb-4`, children: _jsx(achievement.icon, { className: "w-8 h-8 text-white" }) }), _jsx("h3", { className: "text-xl font-bold text-navy-900 mb-3", children: achievement.title }), _jsx("p", { className: "text-navy-600 leading-relaxed", children: achievement.description })] }, achievement.title))) }), _jsx("div", { className: "grid lg:grid-cols-2 gap-8", children: testimonials.map((testimonial, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { delay: index * 0.2, duration: 0.8 }, viewport: { once: true }, className: "bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 relative", children: [_jsx("div", { className: "absolute top-6 right-6 text-gold-200", children: _jsx(Quote, { className: "w-8 h-8" }) }), _jsx("div", { className: "flex items-center mb-4", children: [...Array(testimonial.rating)].map((_, i) => (_jsx(Star, { className: "w-5 h-5 text-gold-500 fill-current" }, i))) }), _jsxs("blockquote", { className: "text-navy-700 mb-6 leading-relaxed italic", children: ["\"", testimonial.content, "\""] }), _jsxs("div", { className: "flex items-center", children: [_jsx("img", { src: testimonial.image, alt: testimonial.name, className: "w-12 h-12 rounded-full object-cover mr-4" }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-navy-900", children: testimonial.name }), _jsx("p", { className: "text-navy-600 text-sm", children: testimonial.position }), _jsx("p", { className: "text-gold-600 text-sm font-medium", children: testimonial.company })] })] })] }, testimonial.name))) }), _jsx(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { delay: 0.6, duration: 0.8 }, viewport: { once: true }, className: "mt-16 text-center", children: _jsxs("div", { className: "bg-gradient-to-r from-navy-900 to-navy-800 rounded-2xl shadow-lg p-8 text-white", children: [_jsx("h3", { className: "text-2xl font-bold mb-4", children: "Ready to Make an Impact" }), _jsx("p", { className: "text-navy-200 max-w-3xl mx-auto leading-relaxed mb-6", children: "As a fresh graduate with a unique blend of business acumen and AI expertise, I'm eager to contribute to innovative projects that solve real-world problems. My journey is just beginning, and I'm excited to bring fresh perspectives and boundless enthusiasm to the right opportunity." }), _jsxs("div", { className: "grid md:grid-cols-3 gap-8 mt-8", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-3xl font-bold text-gold-400 mb-2", children: "Fresh" }), _jsx("p", { className: "text-navy-300", children: "Perspective & Energy" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-3xl font-bold text-gold-400 mb-2", children: "Unique" }), _jsx("p", { className: "text-navy-300", children: "Business + AI Combination" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-3xl font-bold text-gold-400 mb-2", children: "Ready" }), _jsx("p", { className: "text-navy-300", children: "To Learn & Contribute" })] })] })] }) })] }) }));
};
export default Testimonials;
