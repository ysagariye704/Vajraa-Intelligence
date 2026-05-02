import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config/api';
import { Send } from 'lucide-react';

function AdminChats() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/chat/all/`);
      const data = await res.json();
      if (data.success) {
        setChats(data.chats);
      }
    } catch (err) {
      console.error('Error fetching chats:', err);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/chat/messages/?user_id=${userId}`);
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const selectChat = (chat) => {
    setSelectedChat(chat);
    fetchMessages(chat.user_id);
  };

  const sendReply = async () => {
    if (!newMessage.trim() || !selectedChat) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/chat/reply/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: selectedChat.user_id, message: newMessage }),
      });
      const data = await res.json();
      if (data.success) {
        setNewMessage('');
        fetchMessages(selectedChat.user_id);
        fetchChats();
      }
    } catch (err) {
      console.error('Error sending reply:', err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md flex">
        <div className="w-1/3 border-r p-4">
          <h2 className="text-xl font-bold mb-4">User Chats</h2>
          <div className="space-y-2">
            {chats.map((chat) => (
              <div
                key={chat.user_id}
                onClick={() => selectChat(chat)}
                className="p-3 rounded-lg cursor-pointer"
              >
                <p className="font-semibold">{chat.user_name}</p>
                <p className="text-sm text-gray-600">{chat.user_email}</p>
                <p className="text-xs text-gray-500">{chat.last_message}</p>
                {chat.unread_count > 0 && <span className="text-red-500">({chat.unread_count})</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="w-2/3 p-4">
          {selectedChat ? (
            <>
              <h2 className="text-xl font-bold mb-4">Chat with {selectedChat.user_name}</h2>
              <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.is_from_admin ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-xs p-3 rounded-lg ${msg.is_from_admin ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                      <p>{msg.message}</p>
                      <p className="text-xs mt-1 opacity-70">{new Date(msg.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendReply()}
                  placeholder="Type your reply..."
                  className="flex-1 p-2 border rounded-l-lg"
                />
                <button
                  onClick={sendReply}
                  disabled={loading}
                  className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">Select a chat to view messages</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminChats;
