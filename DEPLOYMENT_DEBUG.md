# 🔍 Deployment Debug Guide

## 🚨 **Critical Issue Found**

Your environment variables have **TYPOS**:
- ❌ `VITE_SUPERBASE_URL` (wrong spelling)
- ✅ `VITE_SUPABASE_URL` (correct spelling)

## 📝 **Step-by-Step Fix**

### **1. Create Correct .env File**
Create a `.env` file in your project root with these **exact** names:

```env
VITE_SUPABASE_URL=https://kcfqnctadolyxpralogs.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjZnFuY3RhZG9seXhwcmFsb2dzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NTMwMjIsImV4cCI6MjA2NjMyOTAyMn0.nPGxdJthhNl33Y1qu0QyFKkvoRG0ov-U2u_cQs6gOnI
```

### **2. Test Locally First**
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Should open at http://localhost:5173
```

### **3. Check What You Should See**
✅ **Working Site Should Show:**
- Profile photo loads smoothly
- Skills section with progress bars
- All text content appears immediately
- No blank/white screen

❌ **Broken Site Shows:**
- Blank white screen
- Console errors (press F12)
- Infinite loading spinner

### **4. Fix Deployment Platform**

#### **For Vercel:**
1. Go to [vercel.com](https://vercel.com) → Your Project
2. Settings → Environment Variables
3. **Delete old variables** with typos
4. **Add new variables:**
   - Name: `VITE_SUPABASE_URL`
   - Value: `https://kcfqnctadolyxpralogs.supabase.co`
   - Name: `VITE_SUPABASE_ANON_KEY` 
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjZnFuY3RhZG9seXhwcmFsb2dzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NTMwMjIsImV4cCI6MjA2NjMyOTAyMn0.nPGxdJthhNl33Y1qu0QyFKkvoRG0ov-U2u_cQs6gOnI`
5. **Redeploy** (Deployments → Redeploy)

#### **For Netlify:**
1. Go to [netlify.com](https://netlify.com) → Your Site
2. Site settings → Environment variables
3. **Delete old variables** with typos
4. **Add new variables** (same as above)
5. **Trigger deploy** (Deploys → Trigger deploy)

## 🧪 **Debug Checklist**

### **Local Testing:**
- [ ] `.env` file exists with correct variable names
- [ ] `npm run dev` works without errors
- [ ] Site loads at `http://localhost:5173`
- [ ] No console errors (F12 → Console)
- [ ] All sections visible (Hero, About, Skills, etc.)

### **Build Testing:**
```bash
# Test production build
npm run build
npm run preview

# Should work at http://localhost:4173
```

### **Deployment Testing:**
- [ ] Environment variables set correctly (no typos)
- [ ] Build logs show no errors
- [ ] Site URL loads (not blank)
- [ ] Browser console shows no errors

## 🔧 **Common Issues & Fixes**

### **Issue 1: Blank White Screen**
**Cause:** Environment variable typos or JavaScript errors
**Fix:** 
1. Fix variable names (SUPABASE not SUPERBASE)
2. Check browser console for errors
3. Ensure static content fallbacks work

### **Issue 2: Build Fails**
**Cause:** TypeScript errors or missing dependencies
**Fix:**
```bash
# Check for errors
npm run build

# If errors, fix TypeScript issues
# Common: missing imports or type errors
```

### **Issue 3: Content Not Loading**
**Cause:** Supabase connection issues
**Fix:** Site should still work with static fallbacks from `src/data/staticContent.ts`

### **Issue 4: Routing Issues (404 on refresh)**
**Fix for Vercel:** Create `vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Fix for Netlify:** Create `public/_redirects`:
```
/*    /index.html   200
```

## 🎯 **Expected Results**

### **Working Portfolio Should Have:**
1. **Hero Section:** Profile photo + animated text
2. **About Section:** Professional journey content
3. **Skills Section:** Progress bars with animations
4. **Projects Section:** Project cards
5. **Contact Section:** Contact form

### **Performance Targets:**
- **Load Time:** < 3 seconds
- **No Flickering:** Content appears smoothly
- **Mobile Responsive:** Works on all devices
- **No Console Errors:** Clean browser console

## 🚀 **Quick Test Commands**

```bash
# 1. Test locally
npm run dev

# 2. Test build
npm run build && npm run preview

# 3. Check for errors
npm run lint

# 4. Check environment variables
echo $VITE_SUPABASE_URL
```

## 📞 **Still Not Working?**

If site is still blank after fixing environment variables:

1. **Check browser console** (F12 → Console)
2. **Check network tab** (F12 → Network) for failed requests
3. **Check deployment logs** in Vercel/Netlify dashboard
4. **Test with different browser** (Chrome, Firefox, Safari)
5. **Clear browser cache** (Ctrl+Shift+R / Cmd+Shift+R)

## ✅ **Success Indicators**

**✅ Site is working when you see:**
- Profile photo loads immediately
- Skills bars animate smoothly  
- All text content appears
- No console errors
- Mobile layout works
- Fast loading (< 3 seconds)

**The #1 fix is correcting the environment variable names from SUPERBASE to SUPABASE!**