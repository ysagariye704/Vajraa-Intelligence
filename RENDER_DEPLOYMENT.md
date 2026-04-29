# Render Deployment Guide for Vajraa Intelligence

## 🚀 Deploy to Render (Full Stack)

### Step 1: Connect to Render
1. Go to [Render.com](https://render.com) and sign up/login
2. Click "New" → "Blueprint"
3. Connect your GitHub repository: `varaa-intelligence-main`

### Step 2: Configure Blueprint
Render will automatically detect the `render.yaml` file and create:
- **varaa-backend**: Django API service
- **varaa-frontend**: React frontend service
- **varaa-db**: PostgreSQL database

### Step 3: Deploy
- Click "Apply" to create all services
- Wait for deployment to complete (10-15 minutes)
- All services will be connected automatically

### Step 4: Update Environment Variables
After deployment, update the frontend environment variable:

1. Go to your **varaa-frontend** service in Render
2. Navigate to Environment
3. Update `VITE_API_URL` to your backend URL:
   ```
   VITE_API_URL=https://varaa-backend.onrender.com/api
   ```
4. Redeploy the frontend service

### Step 5: Access Your Application
- **Frontend**: `https://varaa-frontend.onrender.com`
- **Backend API**: `https://varaa-backend.onrender.com`
- **Health Check**: `https://varaa-backend.onrender.com/health/`
- **Admin Panel**: `https://varaa-backend.onrender.com/admin/`
Render will automatically set:
- `DATABASE_URL`: PostgreSQL connection string
- `SECRET_KEY`: Auto-generated secure key
- `DEBUG`: Set to `false`
- `ALLOWED_HOSTS`: Your Render domain

## 📋 What's Included

✅ **render.yaml**: Blueprint configuration
✅ **build.sh**: Build script with migrations and static files
✅ **runtime.txt**: Python version specification
✅ **Updated settings.py**: Production-ready configuration
✅ **Updated requirements.txt**: All dependencies

## 🔧 Manual Deployment (Alternative)

If you prefer manual setup:

1. Create a new Web Service on Render
2. Connect your repository
3. Set build command: `./backend/build.sh`
4. Set start command: `gunicorn backend.backend_project.wsgi:application --bind 0.0.0.0:$PORT`
5. Add environment variables as shown in `render.yaml`

## 🌐 Production URLs

After deployment, your backend will be available at:
- **API**: `https://varaa-backend.onrender.com`
- **Health Check**: `https://varaa-backend.onrender.com/health/`
- **Admin**: `https://varaa-backend.onrender.com/admin/`

## 🐛 Troubleshooting

- **Build fails**: Check the build logs in Render dashboard
- **Database connection**: Ensure migrations ran successfully
- **CORS issues**: Update `CORS_ALLOWED_ORIGINS` in settings.py
- **Static files**: Run `collectstatic` if needed

## 📞 Support

If you encounter issues, check:
1. Render deployment logs
2. Django application logs
3. Database connection status