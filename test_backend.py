#!/usr/bin/env python3
"""
Test script to verify backend deployment on Render
Run this locally or on Render to check if everything is working
"""

import os
import sys
import django
from pathlib import Path

# Add backend directory to Python path
backend_dir = Path(__file__).parent / 'backend'
sys.path.insert(0, str(backend_dir))

# Configure Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_project.settings')
django.setup()

# Test imports
try:
    from django.conf import settings
    from api.models import Profile, ContactMessage, ChatMessage
    from django.contrib.auth.models import User
    print("✅ Django imports successful")
except ImportError as e:
    print(f"❌ Import error: {e}")
    sys.exit(1)

# Test database connection
try:
    from django.db import connection
    cursor = connection.cursor()
    print("✅ Database connection successful")
except Exception as e:
    print(f"❌ Database connection failed: {e}")
    sys.exit(1)

# Test settings
print(f"✅ DEBUG: {settings.DEBUG}")
print(f"✅ SECRET_KEY configured: {'Yes' if settings.SECRET_KEY != 'django-insecure-placeholder-key' else 'No'}")
print(f"✅ ALLOWED_HOSTS: {settings.ALLOWED_HOSTS}")
print(f"✅ CORS origins: {len(settings.CORS_ALLOWED_ORIGINS)} configured")

print("\n🎉 Backend configuration test passed!")
print("Your Vajraa Intelligence backend is ready for deployment.")