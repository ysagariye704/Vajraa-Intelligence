import { useEffect, useState } from 'react';
import { Send } from 'lucide-react';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem('user_id'); // Assuming user_id is stored

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/chat/messages/?user_id=${userId}`);
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/chat/send/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, message: newMessage }),
      });
      const data = await res.json();
      if (data.success) {
        setNewMessage('');
        fetchMessages();
      }
    } catch (err) {
      console.error('Error sending message:', err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">Chat with Admin</h1>
        </div>
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.is_from_admin ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-xs p-3 rounded-lg ${msg.is_from_admin ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}>
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
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-l-lg"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
