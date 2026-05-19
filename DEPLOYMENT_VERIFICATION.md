# Deployment Verification & Troubleshooting Guide

## Quick Status Check

Use the **Backend Health Check** component:
- **Login Page**: Go to `/afterlogin` after logging in to see the health check
- **Admin Dashboard**: `/app-admin/dashboard` displays backend status prominently
- **Browser Console**: Open DevTools (F12) → Console to see detailed logs

## Deployment Checklist

### ✅ Frontend Deployment (https://vajraflow.net)

#### Build Configuration
- [x] Vite build optimized for production
- [x] API URL correctly set to `https://vajraa-backend-1.onrender.com/api`
- [x] No localhost URLs in production code
- [x] Environment variables configured properly
- [x] Backend health check component added

#### Files Modified
- `src/config/api.js` - Verified backend URL
- `src/components/BackendHealthCheck.jsx` - NEW: Health check component
- `src/pages/AfterLoginHome.jsx` - Updated: Added health check
- `src/pages/AdminDashboard.jsx` - Updated: Added health check

### ✅ Backend Deployment (https://vajraa-backend-1.onrender.com)

#### URL Configuration
- [x] API routes properly included in `backend_project/urls.py`
- [x] Health endpoint: `/api/health/` returns `{"status":"ok"}`
- [x] CORS configuration updated for production domains
- [x] ALLOWED_HOSTS configured for Render deployment

#### CORS & Security
- [x] CORS_ALLOWED_ORIGINS includes:
  - `https://vajraflow.net`
  - `https://www.vajraflow.net`
  - `https://vajraa-backend-1.onrender.com`
  - Development URLs (localhost, 127.0.0.1)
- [x] CORS_ALLOW_CREDENTIALS enabled
- [x] Django middleware properly configured
- [x] CSRF exemption for API health endpoint

#### Files Modified
- `backend/backend_project/urls.py` - CRITICAL FIX: Included API URLs
- `backend/backend_project/settings.py` - Updated CORS configuration
- `render.yaml` - Fixed ALLOWED_HOSTS and PYTHONPATH
- `.env.example` - Updated with production configuration examples

### ✅ Database & Static Files
- [x] PostgreSQL database configured on Render
- [x] Static files collection enabled in build.sh
- [x] Media files directory available
- [x] Database migrations run automatically

## Testing the Connection

### Test 1: Browser Console Health Check
```javascript
// Run this in browser console (F12)
fetch('https://vajraa-backend-1.onrender.com/api/health/')
  .then(r => r.json())
  .then(d => console.log('✅ Backend OK:', d))
  .catch(e => console.error('❌ Backend Error:', e.message))
```

### Test 2: Click "Test Backend" Button
- Navigate to `/afterlogin` or `/app-admin/dashboard`
- Look for the "Backend Status" section
- Click "Test Backend" button
- Check console for detailed results

### Test 3: Try Login
- Go to `/login`
- Attempt login with test credentials
- If successful, backend connection is working
- If failed, check console for specific error

## Troubleshooting

### Issue: "Unable to connect to the backend"

**Step 1: Verify Backend is Running**
```bash
# Check backend service on Render
curl https://vajraa-backend-1.onrender.com
# Should return: "Backend is running 🚀"
```

**Step 2: Test Health Endpoint**
```bash
curl https://vajraa-backend-1.onrender.com/api/health/
# Should return: {"status":"ok","service":"Vajraa Intelligence backend"}
```

**Step 3: Check CORS Headers**
```bash
curl -i -H "Origin: https://vajraflow.net" \
  https://vajraa-backend-1.onrender.com/api/health/
# Look for: Access-Control-Allow-Origin: https://vajraflow.net
```

**Step 4: Verify Frontend API URL**
- Check: `src/config/api.js`
- Should be: `https://vajraa-backend-1.onrender.com`

### Issue: CORS Error in Browser

**Cause**: Frontend domain not in `CORS_ALLOWED_ORIGINS`

**Fix**:
1. Update `backend/backend_project/settings.py`
2. Add frontend domain to `CORS_ALLOWED_ORIGINS`
3. Redeploy backend on Render

### Issue: 404 on API Endpoints

**Cause**: API URLs not included in Django routing

**Fix** (ALREADY APPLIED):
- ✅ `backend/backend_project/urls.py` now includes:
  ```python
  path('api/', include('api.urls')),
  ```

### Issue: Static Files Not Loading

**Check**:
```bash
# Verify static files are collected
ls backend/staticfiles/
# Should contain Django admin files
```

### Issue: Database Connection Error

**Check Render Dashboard**:
1. Go to your Render project
2. Verify PostgreSQL database is running
3. Check DATABASE_URL environment variable is set
4. Verify database credentials are correct

## Production Configuration Checklist

- [ ] DEBUG = False in production
- [ ] SECRET_KEY is set to a secure random value
- [ ] ALLOWED_HOSTS includes only production domain
- [ ] CORS_ALLOW_ALL_ORIGINS = False in production
- [ ] Database is PostgreSQL (not SQLite)
- [ ] Static files are collected
- [ ] Environment variables are set on Render
- [ ] Both frontend and backend services are running
- [ ] Health check endpoint responds successfully
- [ ] API endpoints are accessible from frontend

## Monitoring the Deployment

### Check Backend Logs
1. Go to Render dashboard
2. Select `vajraa-backend` service
3. Click "Logs" tab
4. Look for any errors

### Check Frontend Logs
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for any errors or warnings
4. Check Application → Local Storage for `authUser`

### Monitor Requests
1. Open DevTools → Network tab
2. Refresh page
3. Look for API calls to `/api/` endpoints
4. Verify responses are successful (200 OK)

## Deployment URLs

| Service | URL | Status |
|---------|-----|--------|
| Frontend | https://vajraflow.net | Production |
| Backend | https://vajraa-backend-1.onrender.com | Production |
| Health Check | https://vajraa-backend-1.onrender.com/api/health/ | ✅ Active |
| Admin Dashboard | https://vajraflow.net/app-admin/dashboard | Production |

## Next Steps

1. **Verify Deployment**
   - Visit https://vajraflow.net
   - Try logging in
   - Check health status on dashboard

2. **Monitor Performance**
   - Check Render logs regularly
   - Monitor API response times
   - Track error rates

3. **Update as Needed**
   - Add more API endpoints as needed
   - Update CORS origins if adding new domains
   - Keep dependencies updated

## Support

If you encounter issues:
1. Check browser console for errors (F12)
2. Check Render dashboard logs
3. Verify all environment variables are set
4. Test health endpoint manually
5. Review error messages carefully
