# Admin Dashboard Features - Quick User Guide

## Getting Started

### Admin Login
1. Navigate to `http://localhost:3000/login`
2. Email: `admin@varaa.ai`
3. Password: `admin123`
4. Click Login

### Accessing Admin Dashboard
- After login, you'll see the admin navbar
- Click **Dashboard** or navigate to `/app-admin/dashboard`

---

## 📊 Feature 1: Dashboard Statistics

**Location:** `/app-admin/dashboard`

### What You Can Do:
- View total users registered
- See currently logged-in users
- Check total contact messages
- View active leads (sample data)
- Click on stat cards for quick navigation

### Data Displays:
- User count with growth indicator
- Real-time online status
- Message submission tracking
- Lead pipeline status

---

## 👥 Feature 2: User Management

**Location:** `/app-admin/users`

### Search Users:
1. Type in the search box (top of page)
2. Search by: name, email, or username
3. Results update instantly
4. Results reset to page 1

### View User Details:
- **Name:** User's full name
- **Email:** Registration email
- **Last Login:** When they last accessed
- **Joined:** Registration date
- **Role:** User/Staff/Superuser badge

### Delete Users:
1. Click the **trash icon** next to user
2. Confirm deletion
3. User is removed from system
4. Total count decreases

### Pagination:
- Shows 10 users per page
- Use Previous/Next buttons
- Page indicator shows: "Page X of Y"

---

## 💬 Feature 3: Contact Messages

**Location:** `/app-admin/contacts`

### Search Messages:
- Type in search box
- Searches: sender name, email, message content
- Results filter in real-time

### Filter Messages:
- **All Messages:** Show everything
- **Unread Only:** New messages you haven't seen
- **Read Only:** Messages already checked

### Mark as Read:
- Click **check icon** (✓) on message
- Green highlight = read
- Removes from unread count

### Mark as Important:
- Click **star icon** (★) on message
- Yellow highlight = important
- Useful for priority handling

### Delete Messages:
- Click **trash icon** to remove
- Confirm deletion dialog appears
- Message is permanently removed

### Export to CSV:
- Click **Export CSV** button (top right)
- Downloads `contacts.csv` file
- Includes: Name, Email, Message, Read, Important, Date
- Open in Excel/Sheets for analysis

### Pagination:
- Shows 10 messages per page
- Navigate with Previous/Next buttons
- Total message count displayed

---

## 📈 Feature 4: Statistics & Analytics

**Location:** `/app-admin/statistics`

### View Metrics:
- **Total Users:** All registered accounts
- **Logged In Users:** Users with activity
- **Total Messages:** All contact submissions
- **Unread Messages:** New messages awaiting review
- **Important Messages:** Flagged for priority
- **Today's Users:** New signups today
- **Today's Messages:** Messages received today
- **7-Day Users:** New users this week
- **7-Day Messages:** Messages this week

### Color Codes:
- 🔵 Blue = Primary metrics
- 🟢 Green = Active/Positive
- 🟡 Yellow = Attention needed
- 🔴 Red = Critical/Important
- 🟣 Purple = Trending/Growth

---

## 📝 Feature 5: Activity Logs

**Location:** `/app-admin/activity-logs`

### View Activity Timeline:
- See all system actions in chronological order
- Most recent activities first

### Activity Types:
- 🟢 **Login:** User sign-in
- 🔵 **Logout:** User sign-out
- 🟣 **User Created:** New account registration
- 🔵 **Message Read:** Message marked as read
- 🔴 **Message Deleted:** Message removed
- 🔴 **User Deleted:** Account deleted
- 🟡 **User Updated:** Profile changed
- 🟠 **Settings Changed:** Configuration updated

### For Each Activity:
- **Username:** Who performed action
- **Action Type:** Color-coded badge
- **Description:** Details of action
- **Timestamp:** When it happened

### Pagination:
- Shows 20 entries per page
- Navigate with Previous/Next
- Total count displayed

---

## ⚙️ Feature 6: Admin Settings

**Location:** `/app-admin/settings`

### Configure Application:
- **Site Name:** Change brand name
- **Site Email:** Primary contact email
- **Site Phone:** Support phone number
- **Timezone:** Server timezone setting
- **Max Login Attempts:** Account lockout threshold

### Toggles:
- **Maintenance Mode:** Disable all user access
- **Allow New Registrations:** Enable/disable signups

### Save Changes:
- Adjust settings as needed
- Click "Save Settings"
- Confirmation message appears
- Changes are persisted

---

## 🧭 Feature 7: Navigation

### Quick Stats Bar (Below navbar):
- Shows real-time metrics
- Total Users: X
- Online: X
- Today new: X
- Messages: X today
- Auto-updates every 60 seconds

### Breadcrumb Trail:
- Shows: **Dashboard > [Current Page]**
- Click Dashboard to go home
- Helps orient navigation

### Navigation Links:
- **Dashboard:** Main overview
- **Users:** User management
- **Messages:** Contact messages
- **Statistics:** Analytics dashboard
- **Activity:** System activity log
- **Settings:** Configuration

---

## 🔑 Keyboard Shortcuts

### Common Actions:
- `Click on user/message` - View details
- `Trash icon` - Delete item
- `Check/Star icons` - Toggle status
- `Search box` - Filter items

---

## 🚀 Tips & Tricks

### Efficient Workflow:
1. **Check Activity Logs** first for overview
2. **Review New Messages** using Unread filter
3. **Manage Important Items** with star filter
4. **Monitor Users** with latest login info
5. **Track Metrics** via Statistics page

### For Maintenance:
1. Go to **Settings** page
2. Enable **Maintenance Mode** if needed
3. Users will be blocked from login
4. Disable when done

### Data Analysis:
1. **Export contacts** to CSV for reporting
2. **Check 7-day trends** on Statistics page
3. **Review activity logs** for troubleshooting
4. **Use search** to find specific events

### Best Practices:
- ✅ Review unread messages daily
- ✅ Check activity logs for suspicious activity
- ✅ Archive old messages via delete
- ✅ Keep important messages marked
- ✅ Monitor user growth trends

---

## ⚠️ Important Notes

### Destructive Actions:
- **Deleting users** cannot be undone
- **Deleting messages** is permanent
- **Confirmation dialogs** appear before deletion
- **Always verify** before confirming delete

### Data Privacy:
- Activity logs track all actions
- User info is sensitive data
- Messages contain customer data
- Follow data protection guidelines

### Performance:
- Pages auto-paginate for speed
- Search is real-time optimized
- Stats refresh every 60 seconds
- CSV export can be large

---

## 🆘 Troubleshooting

### Search not working?
- Clear search box completely
- Try partial text match
- Check spelling

### Pagination not updating?
- Numbers should match records
- Each page: ~10 items
- Last page may have fewer

### Delete button disabled?
- Only appears for admin users
- Item must exist first
- Try refreshing page

### Columns not showing (mobile)?
- Desktop: All columns visible
- Mobile: Essential columns only
- Swipe table to see more

### Stats not updating?
- Auto-refresh every 60 seconds
- Manual refresh: F5 key
- Check backend connection

---

## 📞 Support

For issues or questions:
1. Check Activity Logs for errors
2. Review system settings
3. Verify backend connection
4. Check console (F12 > Console tab)
5. Contact technical support

---

**Version:** 1.0 - Complete Admin Dashboard
**Last Updated:** April 19, 2026
**Status:** Fully Functional ✅
