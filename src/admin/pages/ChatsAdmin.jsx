import React, { useEffect, useState } from 'react';
import { fetchAll } from '../../lib/turso';
import { MessageSquare, Loader2, Trash2 } from 'lucide-react';
import { turso } from '../../lib/turso';

export default function ChatsAdmin() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    setLoading(true);
    try {
      const data = await fetchAll('SELECT * FROM chat_sessions ORDER BY last_updated DESC');
      // Parse JSON messages
      const parsedChats = data.map(chat => {
        try {
          return { ...chat, messages: JSON.parse(chat.messages) };
        } catch(e) {
          return { ...chat, messages: [] };
        }
      });
      // Filter out sessions that only have the bot greeting (length <= 1)
      setChats(parsedChats.filter(c => c.messages.length > 1));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const deleteChat = async (id, e) => {
    e.stopPropagation();
    if(!window.confirm('Delete this chat log?')) return;
    try {
      await turso.execute({ sql: 'DELETE FROM chat_sessions WHERE session_id = ?', args: [id] });
      setChats(chats.filter(c => c.session_id !== id));
      if(selectedChat?.session_id === id) setSelectedChat(null);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">AI Chatbot Logs</h2>
      </div>

      {loading ? (
        <div className="flex items-center gap-2"><Loader2 className="animate-spin w-5 h-5"/> Loading chats...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[70vh]">
          {/* List */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden flex flex-col">
            <div className="bg-zinc-50 border-b border-zinc-200 px-4 py-3 font-semibold text-zinc-700 shrink-0">
              Recent Conversations
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-zinc-100">
              {chats.length === 0 ? (
                <div className="p-8 text-center text-zinc-500 text-sm">No chats available yet.</div>
              ) : (
                chats.map(chat => (
                  <div 
                    key={chat.session_id} 
                    onClick={() => setSelectedChat(chat)}
                    className={`p-4 cursor-pointer hover:bg-zinc-50/80 transition-colors group ${selectedChat?.session_id === chat.session_id ? 'bg-zinc-50' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="text-sm font-medium text-zinc-900 truncate pr-4">
                        {chat.messages.filter(m => m.role === 'user').pop()?.content || 'New Chat'}
                      </div>
                      <button onClick={(e) => deleteChat(chat.session_id, e)} className="text-zinc-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <span>{chat.messages.length} messages</span>
                      <span>{new Date(chat.last_updated + 'Z').toLocaleString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden flex flex-col">
             {selectedChat ? (
               <>
                 <div className="bg-zinc-50 border-b border-zinc-200 px-6 py-4 font-semibold text-zinc-700 shrink-0 flex justify-between items-center">
                   <span>Session ID: {selectedChat.session_id.substring(0, 8)}...</span>
                   <span className="text-xs font-normal text-zinc-500">{new Date(selectedChat.last_updated + 'Z').toLocaleString()}</span>
                 </div>
                 <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-zinc-50/30">
                   {selectedChat.messages.filter(m => m.role !== 'system').map((msg, i) => (
                     <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                       <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${msg.role === 'user' ? 'bg-[#C5FA01] text-black rounded-br-none' : 'bg-white border border-zinc-200 text-zinc-800 rounded-bl-none shadow-sm'}`}>
                         {msg.content}
                       </div>
                     </div>
                   ))}
                 </div>
               </>
             ) : (
               <div className="flex-1 flex flex-col items-center justify-center text-zinc-400">
                 <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
                 <p>Select a conversation to view the chat history</p>
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
}
