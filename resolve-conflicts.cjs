const fs = require('fs');
const path = require('path');

const files = [
  'vite.config.js',
  'src/pages/Signup.jsx',
  'src/pages/Profile.jsx', 
  'src/pages/Login.jsx',
  'src/pages/AdminActivityLog.jsx',
  'src/pages/AdminLogin.jsx',
  'src/pages/AdminDashboard.jsx',
  'src/pages/AdminContacts.jsx',
  'src/pages/AdminChats.jsx',
  'src/pages/AdminStats.jsx',
  'src/pages/AdminUsers.jsx',
  'src/pages/AfterLoginHome.jsx',
  'src/pages/Chat.jsx'
];

files.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf-8');
    // Keep only HEAD version, remove everything from <<<<<<<  to >>>>>>>
    content = content.replace(/<<<<<<< HEAD\n([\s\S]*?)\n=======\n[\s\S]*?\n>>>>>>> [^\n]+\n?/g, '$1');
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`✓ Resolved ${file}`);
  } else {
    console.log(`✗ File not found: ${file}`);
  }
});
