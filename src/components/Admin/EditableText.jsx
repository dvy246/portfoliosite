import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Edit3, Save, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
const EditableText = ({ value, onSave, multiline = false, className = '', placeholder = 'Enter text...' }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);
    const { isAdmin } = useAuth();
    if (!isAdmin) {
        return _jsx("span", { className: className, children: value });
    }
    const handleSave = () => {
        onSave(editValue);
        setIsEditing(false);
    };
    const handleCancel = () => {
        setEditValue(value);
        setIsEditing(false);
    };
    if (isEditing) {
        return (_jsxs("div", { className: "relative group", children: [multiline ? (_jsx("textarea", { value: editValue, onChange: (e) => setEditValue(e.target.value), className: `${className} border-2 border-gold-300 rounded-lg p-2 bg-white resize-none`, placeholder: placeholder, rows: 4, autoFocus: true })) : (_jsx("input", { type: "text", value: editValue, onChange: (e) => setEditValue(e.target.value), className: `${className} border-2 border-gold-300 rounded-lg p-2 bg-white`, placeholder: placeholder, autoFocus: true })), _jsxs("div", { className: "absolute -top-2 -right-2 flex space-x-1", children: [_jsx("button", { onClick: handleSave, className: "bg-green-500 text-white p-1 rounded-full hover:bg-green-600 transition-colors", children: _jsx(Save, { className: "w-3 h-3" }) }), _jsx("button", { onClick: handleCancel, className: "bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors", children: _jsx(X, { className: "w-3 h-3" }) })] })] }));
    }
    return (_jsxs("div", { className: "relative group", children: [_jsx("span", { className: className, children: value }), _jsx("button", { onClick: () => setIsEditing(true), className: "absolute -top-2 -right-2 bg-gold-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx(Edit3, { className: "w-3 h-3" }) })] }));
};
export default EditableText;
