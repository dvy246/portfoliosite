import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Brain, BarChart3, Code, Database, TrendingUp, Zap } from 'lucide-react';
import { useContentSections } from '../../hooks/useContent';
import EditableContent from '../Admin/EditableContent';
const Skills = () => {
    const { content } = useContentSections([
        'skills_title',
        'skills_subtitle',
        'skills_ai_title',
        'skills_business_title',
        'skills_technical_title',
        'skills_differentiator_title',
        'skills_differentiator_subtitle',
        // Individual AI skills
        'skill_ai_1', 'skill_ai_2', 'skill_ai_3', 'skill_ai_4', 'skill_ai_5',
        // Individual Business skills
        'skill_business_1', 'skill_business_2', 'skill_business_3', 'skill_business_4', 'skill_business_5',
        // Individual Technical skills
        'skill_technical_1', 'skill_technical_2', 'skill_technical_3', 'skill_technical_4', 'skill_technical_5'
    ]);
    const skillCategories = [
        {
            title: content.skills_ai_title || 'AI & Machine Learning',
            icon: Brain,
            color: 'from-blue-500 to-purple-600',
            skills: [
                { name: content.skill_ai_1 || 'Machine Learning', level: 95, key: 'skill_ai_1' },
                { name: content.skill_ai_2 || 'Deep Learning', level: 93, key: 'skill_ai_2' },
                { name: content.skill_ai_3 || 'Natural Language Processing', level: 91, key: 'skill_ai_3' },
                { name: content.skill_ai_4 || 'Computer Vision', level: 89, key: 'skill_ai_4' },
                { name: content.skill_ai_5 || 'MLOps', level: 87, key: 'skill_ai_5' }
            ],
            titleKey: 'skills_ai_title'
        },
        {
            title: content.skills_business_title || 'Business Analytics',
            icon: BarChart3,
            color: 'from-gold-500 to-orange-600',
            skills: [
                { name: content.skill_business_1 || 'Financial Modeling', level: 92, key: 'skill_business_1' },
                { name: content.skill_business_2 || 'Business Intelligence', level: 91, key: 'skill_business_2' },
                { name: content.skill_business_3 || 'Decision Optimization', level: 90, key: 'skill_business_3' },
                { name: content.skill_business_4 || 'Market Analysis', level: 89, key: 'skill_business_4' },
                { name: content.skill_business_5 || 'Strategic Planning', level: 88, key: 'skill_business_5' }
            ],
            titleKey: 'skills_business_title'
        },
        {
            title: content.skills_technical_title || 'Technical Stack',
            icon: Code,
            color: 'from-green-500 to-teal-600',
            skills: [
                { name: content.skill_technical_1 || 'Python', level: 95, key: 'skill_technical_1' },
                { name: content.skill_technical_2 || 'TensorFlow/PyTorch', level: 93, key: 'skill_technical_2' },
                { name: content.skill_technical_3 || 'SQL/NoSQL', level: 91, key: 'skill_technical_3' },
                { name: content.skill_technical_4 || 'Cloud Platforms', level: 89, key: 'skill_technical_4' },
                { name: content.skill_technical_5 || 'Data Visualization', level: 87, key: 'skill_technical_5' }
            ],
            titleKey: 'skills_technical_title'
        }
    ];
    return (_jsx("section", { id: "skills", className: "py-20 bg-gradient-to-br from-navy-50 to-platinum-50", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, viewport: { once: true }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-5xl font-bold text-navy-900 mb-6", children: [_jsx(EditableContent, { name: "skills_title", defaultContent: "Core", className: "mr-2" }), _jsx("span", { className: "text-gold-600", children: _jsx(EditableContent, { name: "skills_subtitle", defaultContent: "Expertise" }) })] }), _jsx("p", { className: "text-xl text-navy-600 max-w-3xl mx-auto", children: "A unique blend of technical mastery and business acumen that drives exceptional results" })] }), _jsx("div", { className: "grid lg:grid-cols-3 gap-8", children: skillCategories.map((category, categoryIndex) => (_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { delay: categoryIndex * 0.2, duration: 0.8 }, viewport: { once: true }, className: "bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300", children: [_jsxs("div", { className: "flex items-center mb-6", children: [_jsx("div", { className: `w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mr-4`, children: _jsx(category.icon, { className: "w-6 h-6 text-white" }) }), _jsx("h3", { className: "text-xl font-bold text-navy-900", children: _jsx(EditableContent, { name: category.titleKey, defaultContent: category.title }) })] }), _jsx("div", { className: "space-y-4", children: category.skills.map((skill, skillIndex) => (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 }, transition: { delay: (categoryIndex * 0.2) + (skillIndex * 0.1), duration: 0.6 }, viewport: { once: true }, className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx(EditableContent, { name: skill.key, defaultContent: skill.name, className: "text-navy-700 font-medium" }), _jsxs("span", { className: "text-navy-500 text-sm", children: [skill.level, "%"] })] }), _jsx("div", { className: "w-full bg-navy-100 rounded-full h-2", children: _jsx(motion.div, { initial: { width: 0 }, whileInView: { width: `${skill.level}%` }, transition: { delay: (categoryIndex * 0.2) + (skillIndex * 0.1) + 0.3, duration: 1 }, viewport: { once: true }, className: `h-2 rounded-full bg-gradient-to-r ${category.color}` }) })] }, skill.key))) })] }, category.title))) }), _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { delay: 0.6, duration: 0.8 }, viewport: { once: true }, className: "mt-16 bg-gradient-to-r from-gold-600 to-gold-500 rounded-2xl p-8 text-white", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h3", { className: "text-2xl font-bold mb-4", children: _jsx(EditableContent, { name: "skills_differentiator_title", defaultContent: "What Sets Me Apart", className: "text-white" }) }), _jsx("p", { className: "text-gold-100 max-w-2xl mx-auto", children: _jsx(EditableContent, { name: "skills_differentiator_subtitle", defaultContent: "The rare combination of deep technical expertise and business strategic thinking", className: "text-gold-100" }) })] }), _jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "text-center", children: [_jsx(TrendingUp, { className: "w-8 h-8 mx-auto mb-3" }), _jsx("h4", { className: "font-semibold mb-2", children: "Business-First Approach" }), _jsx("p", { className: "text-gold-100 text-sm", children: "Every AI solution is designed with clear ROI and business impact in mind" })] }), _jsxs("div", { className: "text-center", children: [_jsx(Database, { className: "w-8 h-8 mx-auto mb-3" }), _jsx("h4", { className: "font-semibold mb-2", children: "End-to-End Delivery" }), _jsx("p", { className: "text-gold-100 text-sm", children: "From concept to deployment, ensuring scalable and maintainable solutions" })] }), _jsxs("div", { className: "text-center", children: [_jsx(Zap, { className: "w-8 h-8 mx-auto mb-3" }), _jsx("h4", { className: "font-semibold mb-2", children: "Rapid Innovation" }), _jsx("p", { className: "text-gold-100 text-sm", children: "Quick adaptation to emerging technologies while maintaining quality standards" })] })] })] })] }) }));
};
export default Skills;
