import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { Video, Upload, Play } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
const EditableVideo = ({ src, onSave, className = '', placeholder = 'No video uploaded yet' }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [videoUrl, setVideoUrl] = useState(src || '');
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    const { isAdmin } = useAuth();
    if (!isAdmin) {
        if (!src) {
            return (_jsx("div", { className: `bg-navy-100 rounded-xl flex items-center justify-center ${className}`, children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(Play, { className: "w-8 h-8 text-white" }) }), _jsx("p", { className: "text-navy-600", children: placeholder })] }) }));
        }
        return (_jsx("video", { src: src, controls: true, className: className, children: "Your browser does not support the video tag." }));
    }
    const handleFileUpload = async (event) => {
        const file = event.target.files?.[0];
        if (!file)
            return;
        if (!file.type.startsWith('video/')) {
            toast.error('Please select a video file');
            return;
        }
        setIsUploading(true);
        try {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result;
                setVideoUrl(result);
                onSave(result);
                setIsEditing(false);
                toast.success('Video uploaded successfully!');
                setIsUploading(false);
            };
            reader.readAsDataURL(file);
        }
        catch (error) {
            toast.error('Failed to upload video');
            setIsUploading(false);
        }
    };
    const handleUrlSave = () => {
        if (!videoUrl.trim()) {
            toast.error('Please enter a valid video URL or upload a file');
            return;
        }
        onSave(videoUrl);
        setIsEditing(false);
        toast.success('Video updated successfully!');
    };
    if (isEditing) {
        return (_jsx("div", { className: "relative", children: _jsx("div", { className: "border-2 border-dashed border-gold-300 rounded-lg p-6 bg-gold-50", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-navy-700 mb-2", children: "Video URL" }), _jsx("input", { type: "url", value: videoUrl, onChange: (e) => setVideoUrl(e.target.value), className: "w-full px-3 py-2 border border-navy-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent", placeholder: "Enter video URL or upload from computer" })] }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-sm text-navy-600 mb-3", children: "Or upload from your computer" }), _jsx("input", { ref: fileInputRef, type: "file", accept: "video/*", onChange: handleFileUpload, className: "hidden" }), _jsx("button", { onClick: () => fileInputRef.current?.click(), disabled: isUploading, className: "bg-navy-600 text-white px-6 py-3 rounded-lg hover:bg-navy-700 transition-colors disabled:opacity-50 flex items-center space-x-2 mx-auto", children: isUploading ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }), _jsx("span", { children: "Uploading..." })] })) : (_jsxs(_Fragment, { children: [_jsx(Upload, { className: "w-4 h-4" }), _jsx("span", { children: "Upload Video" })] })) })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx("button", { onClick: handleUrlSave, className: "flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors", children: "Save" }), _jsx("button", { onClick: () => {
                                        setVideoUrl(src || '');
                                        setIsEditing(false);
                                    }, className: "flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors", children: "Cancel" })] })] }) }) }));
    }
    return (_jsxs("div", { className: "relative group", children: [src ? (_jsx("video", { src: src, controls: true, className: className, children: "Your browser does not support the video tag." })) : (_jsx("div", { className: `bg-navy-100 rounded-xl flex items-center justify-center ${className}`, children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(Play, { className: "w-8 h-8 text-white" }) }), _jsx("p", { className: "text-navy-600", children: placeholder })] }) })), _jsx("button", { onClick: () => setIsEditing(true), className: "absolute top-2 right-2 bg-gold-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold-600", children: _jsx(Video, { className: "w-4 h-4" }) })] }));
};
export default EditableVideo;
