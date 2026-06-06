import json

from django.contrib.auth import authenticate, get_user_model, login as auth_login
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import ContactMessage, Profile, ActivityLog, ChatMessage

User = get_user_model()


def build_profile_response(profile):
    return {
        'name': profile.name or profile.user.first_name,
        'email': profile.user.email,
        'user_id': profile.user.id,
        'country': profile.country,
        'state': profile.state,
        'profile_image_url': profile.image_url,
    }


def get_profile_for_user(user):
    profile, created = Profile.objects.get_or_create(user=user)
    if created and not profile.name:
        profile.name = user.first_name
        profile.save()
    return profile


def health(request):
    return JsonResponse({'status': 'ok', 'service': 'Vajraa Intelligence backend'})


@csrf_exempt
@require_http_methods(['POST'])
def signup(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)

    name = data.get('name', '').strip()
    email = data.get('email', '').strip().lower()
    phone = data.get('phone', '').strip()
    password = data.get('password', '').strip()

    if not (name and email and phone and password):
        return JsonResponse({'error': 'All fields are required.'}, status=400)

    if User.objects.filter(email=email).exists():
        return JsonResponse({'error': 'Email already registered.'}, status=409)

    user = User.objects.create_user(
        username=email,
        email=email,
        first_name=name,
        password=password,
    )

    Profile.objects.create(user=user, name=name)

    return JsonResponse({
        'success': True,
        'role': 'user',
        'user_id': user.id,
        'name': user.first_name,
        'email': user.email,
    })


@csrf_exempt
@require_http_methods(['POST'])
def login(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)

    email = data.get('email', '').strip().lower()
    password = data.get('password', '').strip()

    if not (email and password):
        return JsonResponse({'error': 'Email and password are required.'}, status=400)

    if email == 'admin@varaa.ai' and password == 'admin123':
        return JsonResponse({
            'success': True,
            'role': 'admin',
            'name': 'Admin',
            'email': email,
        })

    user = authenticate(username=email, password=password)
    if user is None:
        user_obj = User.objects.filter(email__iexact=email).first()
        if user_obj:
            user = authenticate(username=user_obj.username, password=password)

    if user is None:
        return JsonResponse({'error': 'Invalid credentials.'}, status=401)

    auth_login(request, user)
    profile = get_profile_for_user(user)
    role = 'admin' if user.is_staff or user.is_superuser else 'user'

    return JsonResponse({
        'success': True,
        'role': role,
        'user_id': user.id,
        'name': user.first_name,
        'email': user.email,
        'profile_image_url': profile.image_url,
    })


@csrf_exempt
@require_http_methods(['GET'])
def profile_data(request):
    user_id = request.GET.get('user_id')
    if not user_id:
        return JsonResponse({'error': 'user_id is required.'}, status=400)

    user = User.objects.filter(id=user_id).first()
    if not user:
        return JsonResponse({'error': 'User not found.'}, status=404)

    profile = get_profile_for_user(user)
    return JsonResponse({'success': True, 'profile': build_profile_response(profile)})


@csrf_exempt
@require_http_methods(['PUT'])
def update_profile(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)

    user_id = data.get('user_id')
    if not user_id:
        return JsonResponse({'error': 'user_id is required.'}, status=400)

    user = User.objects.filter(id=user_id).first()
    if not user:
        return JsonResponse({'error': 'User not found.'}, status=404)

    profile = get_profile_for_user(user)
    profile.name = data.get('name', profile.name)
    profile.country = data.get('country', profile.country)
    profile.state = data.get('state', profile.state)
    profile.save()

    name = data.get('name')
    if name:
        user.first_name = name
        user.save()

    return JsonResponse({'success': True, 'profile': build_profile_response(profile)})


@csrf_exempt
@require_http_methods(['POST'])
def upload_profile_image(request):
    user_id = request.POST.get('user_id')
    if not user_id:
        return JsonResponse({'error': 'user_id is required.'}, status=400)

    user = User.objects.filter(id=user_id).first()
    if not user:
        return JsonResponse({'error': 'User not found.'}, status=404)

    image_file = request.FILES.get('profile_image')
    if not image_file:
        return JsonResponse({'error': 'profile_image file is required.'}, status=400)

    profile = get_profile_for_user(user)
    profile.profile_image = image_file
    profile.save()

    image_url = request.build_absolute_uri(profile.profile_image.url)
    return JsonResponse({'success': True, 'profile_image_url': image_url})


@csrf_exempt
@require_http_methods(['GET'])
def admin_summary(request):
    users = User.objects.all().order_by('-last_login', 'first_name')
    total_users = users.count()
    logged_in_users = users.filter(last_login__isnull=False).count()
    users_data = [
        {
            'id': user.id,
            'name': user.first_name or user.username,
            'email': user.email,
            'last_login': user.last_login.isoformat() if user.last_login else None,
            'date_joined': user.date_joined.isoformat(),
        }
        for user in users
    ]
    return JsonResponse({'success': True, 'total_users': total_users, 'logged_in_users': logged_in_users, 'users': users_data})


@csrf_exempt
@require_http_methods(['GET'])
def admin_contacts(request):
    messages = ContactMessage.objects.order_by('-created_at')
    messages_data = [
        {
            'id': message.id,
            'name': message.name,
            'email': message.email,
            'message': message.message,
            'created_at': message.created_at.isoformat(),
        }
        for message in messages
    ]
    return JsonResponse({'success': True, 'messages': messages_data})


@csrf_exempt
@require_http_methods(['POST'])
def contact(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)

    name = data.get('name', '').strip()
    email = data.get('email', '').strip().lower()
    message = data.get('message', '').strip()

    if not (name and email and message):
        return JsonResponse({'error': 'Name, email, and message are required.'}, status=400)

    ContactMessage.objects.create(name=name, email=email, message=message)
    return JsonResponse({'success': True, 'message': 'Thank you! Your request is received.'})


@csrf_exempt
@require_http_methods(['GET'])
def admin_contacts_advanced(request):
    search = request.GET.get('search', '').strip()
    is_read = request.GET.get('is_read', '').strip()
    is_important = request.GET.get('is_important', '').strip()
    page = int(request.GET.get('page', 1))
    limit = int(request.GET.get('limit', 10))

    messages = ContactMessage.objects.all()
    
    if search:
        messages = messages.filter(name__icontains=search) | messages.filter(email__icontains=search) | messages.filter(message__icontains=search)
    
    if is_read in ['true', 'True', '1']:
        messages = messages.filter(is_read=True)
    elif is_read in ['false', 'False', '0']:
        messages = messages.filter(is_read=False)
    
    if is_important in ['true', 'True', '1']:
        messages = messages.filter(is_important=True)
    
    total = messages.count()
    start = (page - 1) * limit
    end = start + limit
    messages = messages.order_by('-created_at')[start:end]
    
    messages_data = [
        {
            'id': m.id,
            'name': m.name,
            'email': m.email,
            'message': m.message,
            'is_read': m.is_read,
            'is_important': m.is_important,
            'created_at': m.created_at.isoformat(),
        }
        for m in messages
    ]
    
    return JsonResponse({'success': True, 'messages': messages_data, 'total': total, 'page': page, 'limit': limit})


@csrf_exempt
@require_http_methods(['POST'])
def delete_contact_message(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)
    
    message_id = data.get('message_id')
    if not message_id:
        return JsonResponse({'error': 'message_id is required.'}, status=400)
    
    message = ContactMessage.objects.filter(id=message_id).first()
    if not message:
        return JsonResponse({'error': 'Message not found.'}, status=404)
    
    message.delete()
    return JsonResponse({'success': True, 'message': 'Message deleted successfully.'})


@csrf_exempt
@require_http_methods(['POST'])
def toggle_message_read(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)
    
    message_id = data.get('message_id')
    if not message_id:
        return JsonResponse({'error': 'message_id is required.'}, status=400)
    
    message = ContactMessage.objects.filter(id=message_id).first()
    if not message:
        return JsonResponse({'error': 'Message not found.'}, status=404)
    
    message.is_read = not message.is_read
    message.save()
    
    return JsonResponse({'success': True, 'is_read': message.is_read})


@csrf_exempt
@require_http_methods(['POST'])
def toggle_message_important(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)
    
    message_id = data.get('message_id')
    if not message_id:
        return JsonResponse({'error': 'message_id is required.'}, status=400)
    
    message = ContactMessage.objects.filter(id=message_id).first()
    if not message:
        return JsonResponse({'error': 'Message not found.'}, status=404)
    
    message.is_important = not message.is_important
    message.save()
    
    return JsonResponse({'success': True, 'is_important': message.is_important})


@csrf_exempt
@require_http_methods(['GET'])
def admin_statistics(request):
    from django.db.models import Count
    from django.utils import timezone
    from datetime import timedelta
    
    total_users = User.objects.count()
    logged_in_users = User.objects.filter(last_login__isnull=False).count()
    total_messages = ContactMessage.objects.count()
    unread_messages = ContactMessage.objects.filter(is_read=False).count()
    important_messages = ContactMessage.objects.filter(is_important=True).count()
    
    today = timezone.now().date()
    today_users = User.objects.filter(date_joined__date=today).count()
    today_messages = ContactMessage.objects.filter(created_at__date=today).count()
    
    last_7_days = timezone.now() - timedelta(days=7)
    users_7_days = User.objects.filter(date_joined__gte=last_7_days).count()
    messages_7_days = ContactMessage.objects.filter(created_at__gte=last_7_days).count()
    
    return JsonResponse({
        'success': True,
        'total_users': total_users,
        'logged_in_users': logged_in_users,
        'total_messages': total_messages,
        'unread_messages': unread_messages,
        'important_messages': important_messages,
        'today_users': today_users,
        'today_messages': today_messages,
        'users_7_days': users_7_days,
        'messages_7_days': messages_7_days,
    })


@csrf_exempt
@require_http_methods(['GET'])
def admin_activity_logs(request):
    page = int(request.GET.get('page', 1))
    limit = int(request.GET.get('limit', 20))
    
    logs = ActivityLog.objects.all()
    total = logs.count()
    start = (page - 1) * limit
    end = start + limit
    logs = logs[start:end]
    
    logs_data = [
        {
            'id': log.id,
            'user': log.user.first_name if log.user else 'System',
            'action': log.action,
            'description': log.description,
            'created_at': log.created_at.isoformat(),
        }
        for log in logs
    ]
    
    return JsonResponse({'success': True, 'logs': logs_data, 'total': total, 'page': page, 'limit': limit})


@csrf_exempt
@require_http_methods(['GET', 'POST'])
def admin_users_advanced(request):
    if request.method == 'GET':
        search = request.GET.get('search', '').strip()
        page = int(request.GET.get('page', 1))
        limit = int(request.GET.get('limit', 10))
        
        users = User.objects.all()
        
        if search:
            users = users.filter(first_name__icontains=search) | users.filter(email__icontains=search) | users.filter(username__icontains=search)
        
        total = users.count()
        start = (page - 1) * limit
        end = start + limit
        users = users.order_by('-last_login')[start:end]
        
        users_data = [
            {
                'id': user.id,
                'name': user.first_name or user.username,
                'email': user.email,
                'username': user.username,
                'last_login': user.last_login.isoformat() if user.last_login else None,
                'date_joined': user.date_joined.isoformat(),
                'is_staff': user.is_staff,
                'is_superuser': user.is_superuser,
            }
            for user in users
        ]
        
        return JsonResponse({'success': True, 'users': users_data, 'total': total, 'page': page, 'limit': limit})
    
    else:  # POST
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)
        
        user_id = data.get('user_id')
        user = User.objects.filter(id=user_id).first()
        if not user:
            return JsonResponse({'error': 'User not found.'}, status=404)
        
        user.first_name = data.get('first_name', user.first_name)
        user.email = data.get('email', user.email)
        user.save()
        
        return JsonResponse({'success': True, 'message': 'User updated successfully.'})


@csrf_exempt
@require_http_methods(['POST'])
def delete_user(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)
    
    user_id = data.get('user_id')
    user = User.objects.filter(id=user_id).first()
    if not user:
        return JsonResponse({'error': 'User not found.'}, status=404)
    
    user.delete()
    return JsonResponse({'success': True, 'message': 'User deleted successfully.'})


@csrf_exempt
@require_http_methods(['POST'])
def send_chat_message(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)
    
    user_id = data.get('user_id')
    message = data.get('message', '').strip()
    if not user_id or not message:
        return JsonResponse({'error': 'user_id and message are required.'}, status=400)
    
    user = User.objects.filter(id=user_id).first()
    if not user:
        return JsonResponse({'error': 'User not found.'}, status=404)
    
    chat_message = ChatMessage.objects.create(user=user, message=message, is_from_admin=False)
    return JsonResponse({'success': True, 'message_id': chat_message.id})


@csrf_exempt
@require_http_methods(['GET'])
def get_chat_messages(request):
    user_id = request.GET.get('user_id')
    if not user_id:
        return JsonResponse({'error': 'user_id is required.'}, status=400)
    
    user = User.objects.filter(id=user_id).first()
    if not user:
        return JsonResponse({'error': 'User not found.'}, status=404)
    
    messages = ChatMessage.objects.filter(user=user).order_by('created_at')
    messages_data = [
        {
            'id': msg.id,
            'message': msg.message,
            'is_from_admin': msg.is_from_admin,
            'created_at': msg.created_at.isoformat(),
        }
        for msg in messages
    ]
    return JsonResponse({'success': True, 'messages': messages_data})


@csrf_exempt
@require_http_methods(['POST'])
def admin_reply_chat(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)
    
    user_id = data.get('user_id')
    message = data.get('message', '').strip()
    if not user_id or not message:
        return JsonResponse({'error': 'user_id and message are required.'}, status=400)
    
    user = User.objects.filter(id=user_id).first()
    if not user:
        return JsonResponse({'error': 'User not found.'}, status=404)
    
    chat_message = ChatMessage.objects.create(user=user, message=message, is_from_admin=True)
    return JsonResponse({'success': True, 'message_id': chat_message.id})


@csrf_exempt
@require_http_methods(['GET'])
def admin_get_all_chats(request):
    users_with_messages = User.objects.filter(chat_messages__isnull=False).distinct()
    chats_data = []
    for user in users_with_messages:
        last_message = ChatMessage.objects.filter(user=user).order_by('-created_at').first()
        unread_count = ChatMessage.objects.filter(user=user, is_from_admin=False).count()  # Assuming unread if from user
        chats_data.append({
            'user_id': user.id,
            'user_name': user.first_name or user.username,
            'user_email': user.email,
            'last_message': last_message.message if last_message else '',
            'last_message_time': last_message.created_at.isoformat() if last_message else None,
            'unread_count': unread_count,
        })
    return JsonResponse({'success': True, 'chats': chats_data})
