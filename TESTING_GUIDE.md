# 🧪 Portfolio Testing Guide

## 🚀 Quick Start - Running the Site

### 1. **Install Dependencies**
```bash
npm install
# or
yarn install
```

### 2. **Environment Setup**
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. **Start Development Server**
```bash
npm run dev
# or
yarn dev
```

The site should open at `http://localhost:5173`

## ✅ Critical Tests to Perform

### **1. Flickering Test - PRIORITY #1**
- [ ] **Profile Photo**: Refresh page multiple times - photo should load smoothly without jumping
- [ ] **Skills Section**: Check all skill bars load without flickering
- [ ] **Content Loading**: All text should appear immediately, no blank spaces

### **2. Loading Performance Test**
- [ ] **Initial Load**: Page should load within 2 seconds max
- [ ] **Loading Screen**: Should show briefly then fade out smoothly
- [ ] **No Infinite Loading**: Page should never get stuck loading

### **3. Responsive Design Test**
- [ ] **Mobile (375px)**: All sections should look good on mobile
- [ ] **Tablet (768px)**: Layout should adapt properly
- [ ] **Desktop (1200px+)**: Full layout should display correctly

### **4. Navigation Test**
- [ ] **Smooth Scrolling**: All navigation links should scroll smoothly
- [ ] **CTA Buttons**: "Let's Solve Problems Together" should scroll to contact
- [ ] **Scroll Indicator**: "Discover More" should scroll to about section

### **5. Content Management Test** (Admin Features)
- [ ] **Editable Content**: Hover over text to see edit options (if admin)
- [ ] **Image Upload**: Profile photo should be editable (if admin)
- [ ] **Content Persistence**: Changes should save and persist

## 🔍 Specific Issues to Watch For

### **❌ RED FLAGS - Stop if you see these:**
1. **Profile photo jumps or flickers during load**
2. **Skills section appears empty then suddenly fills**
3. **Page gets stuck on loading screen**
4. **Console errors about missing components**
5. **Layout breaks on mobile devices**

### **⚠️ YELLOW FLAGS - Note but not critical:**
1. Slow image loading (network dependent)
2. Minor animation delays
3. Console warnings (not errors)

## 🛠️ Troubleshooting Common Issues

### **Issue: "Cannot find module" errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### **Issue: Supabase connection errors**
- Check `.env` file exists with correct variables
- Verify Supabase URL and key are valid
- In development, errors are logged to console

### **Issue: Build fails**
```bash
# Check TypeScript errors
npm run build

# If errors, check the specific files mentioned
```

### **Issue: Styles not loading**
- Ensure Tailwind CSS is working
- Check if custom CSS classes are defined
- Verify no conflicting styles

## 📱 Mobile Testing Checklist

### **iPhone (375px width)**
- [ ] Hero section fits properly
- [ ] Profile photo is centered and sized correctly
- [ ] Skills cards stack vertically
- [ ] Contact form is usable
- [ ] All text is readable

### **iPad (768px width)**
- [ ] Two-column layouts work properly
- [ ] Skills section shows 2 columns
- [ ] Navigation is accessible
- [ ] Images scale appropriately

## 🎯 Performance Benchmarks

### **Loading Times (Target)**
- [ ] **First Contentful Paint**: < 1.5 seconds
- [ ] **Largest Contentful Paint**: < 2.5 seconds
- [ ] **Time to Interactive**: < 3 seconds

### **Core Web Vitals**
- [ ] **CLS (Cumulative Layout Shift)**: < 0.1 (NO FLICKERING!)
- [ ] **FID (First Input Delay)**: < 100ms
- [ ] **LCP (Largest Contentful Paint)**: < 2.5s

## 🚀 Production Testing

### **Build Test**
```bash
npm run build
npm run preview
```

### **Deployment Test**
1. Deploy to Vercel/Netlify
2. Test on actual mobile devices
3. Check loading on slow connections
4. Verify all links work in production

## ✅ Final Checklist Before Deployment

- [ ] No flickering in profile photo or skills
- [ ] All sections load smoothly
- [ ] Mobile responsive design works
- [ ] Contact information is updated
- [ ] Social links are correct
- [ ] No console errors
- [ ] Fast loading performance
- [ ] Professional appearance

## 🎉 Success Criteria

**The portfolio is ready when:**
1. ✅ **Zero flickering** on any device/browser
2. ✅ **Loads in under 2 seconds**
3. ✅ **Looks professional** on all screen sizes
4. ✅ **All interactions work** smoothly
5. ✅ **No console errors** in production

**Ready to impress employers!** 🚀