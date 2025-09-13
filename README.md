# 🚀 Divy Yadav - AI Professional Portfolio

> **From Commerce to Code: Where Business Acumen Meets AI Mastery**

A modern, responsive portfolio website showcasing the unique intersection of business intelligence and artificial intelligence expertise.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://your-portfolio-url.com)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.6-blue)](https://tailwindcss.com/)

## ✨ Features

### 🎯 **Professional Presentation**
- **Zero-flickering loading** - Optimized image loading and content management
- **Smooth animations** - Professional Framer Motion transitions
- **Mobile-first design** - Responsive across all devices
- **Fast performance** - Optimized for Core Web Vitals

### 🛠️ **Technical Excellence**
- **Modern React 18** with TypeScript
- **Supabase integration** for real-time content management
- **Tailwind CSS** for responsive design
- **Framer Motion** for smooth animations
- **Industry-standard architecture** with clean code practices

### 📱 **User Experience**
- **Instant loading** with static content fallbacks
- **Smooth scrolling** navigation
- **Interactive elements** with hover effects
- **Professional loading states**

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Admin/           # Content management components
│   ├── Common/          # Shared components (OptimizedImage, etc.)
│   ├── ErrorBoundary/   # Error handling components
│   ├── Layout/          # Header, Footer components
│   ├── Loading/         # Loading states and skeletons
│   └── Sections/        # Main page sections
├── contexts/            # React Context providers
├── data/               # Static content and fallbacks
├── hooks/              # Custom React hooks
├── lib/                # External service integrations
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🎨 Key Sections

### **Hero Section**
- Dynamic profile photo with optimized loading
- Animated text with gradient effects
- Call-to-action buttons with smooth scrolling

### **About Section**
- Professional journey narrative
- Key highlights with icons
- Responsive grid layout

### **Skills Section**
- Interactive skill bars with animations
- Categorized expertise (AI, Business, Technical)
- Progress indicators with smooth transitions

### **Projects Section**
- Project showcase with live demos
- Technology stack highlights
- Outcome-focused descriptions

### **Contact Section**
- Professional contact form
- Social media integration
- Location and availability information

## 🔧 Configuration

### **Environment Variables**
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **Content Management**
- Edit content in `src/data/staticContent.ts` for static fallbacks
- Use Supabase dashboard for dynamic content management
- Real-time updates with optimistic UI

## 📦 Build & Deploy

### **Development**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### **Deployment Options**

#### **Vercel (Recommended)**
```bash
npm install -g vercel
vercel --prod
```

#### **Netlify**
```bash
npm run build
# Upload dist/ folder to Netlify
```

#### **GitHub Pages**
```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

## 🧪 Testing

### **Quick Test Checklist**
- [ ] Profile photo loads without flickering
- [ ] Skills section appears smoothly
- [ ] Page loads under 2 seconds
- [ ] Mobile responsive design works
- [ ] All navigation links function properly

### **Performance Benchmarks**
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1 (no flickering!)

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, Framer Motion |
| **Backend** | Supabase (Database, Auth, Storage) |
| **Deployment** | Vercel, Netlify, GitHub Pages |
| **Development** | ESLint, TypeScript, Hot Reload |

## 🎯 Key Achievements

✅ **Zero Content Flickering** - Implemented static fallbacks and optimized loading  
✅ **Professional Performance** - Optimized for Core Web Vitals  
✅ **Industry-Ready Code** - Clean architecture with TypeScript  
✅ **Mobile-First Design** - Responsive across all devices  
✅ **Real-Time Content Management** - Supabase integration  

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Contact

**Divy Yadav**
- 📧 Email: [your.email@example.com](mailto:your.email@example.com)
- 💼 LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
- 🐙 GitHub: [github.com/yourusername](https://github.com/yourusername)

---

**Built with ❤️ and lots of ☕**

*Showcasing the perfect blend of business intelligence and AI expertise*