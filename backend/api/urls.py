from django.urls import path
from . import views

urlpatterns = [
    path('health/', views.health, name='health'),
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('profile/', views.profile_data, name='profile-data'),
    path('profile/update/', views.update_profile, name='profile-update'),
    path('profile/upload-image/', views.upload_profile_image, name='profile-upload-image'),
    path('admin/summary/', views.admin_summary, name='admin-summary'),
    path('admin/contacts/', views.admin_contacts, name='admin-contacts'),
    path('admin/contacts-advanced/', views.admin_contacts_advanced, name='admin-contacts-advanced'),
    path('admin/contacts/delete/', views.delete_contact_message, name='delete-contact'),
    path('admin/contacts/read/', views.toggle_message_read, name='toggle-read'),
    path('admin/contacts/important/', views.toggle_message_important, name='toggle-important'),
    path('admin/statistics/', views.admin_statistics, name='admin-statistics'),
    path('admin/activity-logs/', views.admin_activity_logs, name='activity-logs'),
    path('admin/users-advanced/', views.admin_users_advanced, name='admin-users-advanced'),
    path('admin/users/delete/', views.delete_user, name='delete-user'),
    path('contact/', views.contact, name='contact'),
    path('chat/send/', views.send_chat_message, name='send-chat'),
    path('chat/messages/', views.get_chat_messages, name='get-chat-messages'),
    path('admin/chat/reply/', views.admin_reply_chat, name='admin-reply-chat'),
    path('admin/chat/all/', views.admin_get_all_chats, name='admin-get-all-chats'),
]
