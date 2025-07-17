import React, { useState, useEffect, useRef } from 'react';
import { useParams }                          from 'react-router-dom';
import { auth, db }                           from '../firebase';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { motion } from 'framer-motion';

export default function ChatRoom() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg]     = useState('');
  const inputRef    = useRef();

  // Subscribe to chat messages
  useEffect(() => {
    const msgsRef = collection(db, 'chats', chatId, 'messages');
    const q       = query(msgsRef, orderBy('createdAt', 'asc'));
    const unsub   = onSnapshot(q, snap => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [chatId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    try {
      await addDoc(collection(db, 'chats', chatId, 'messages'), {
        text: newMsg,
        senderId: auth.currentUser.uid,
        createdAt: serverTimestamp()
      });
      setNewMsg('');
      inputRef.current.focus();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold mb-6">Chat</h2>

      <div className="flex flex-col space-y-3 mb-4 max-h-[60vh] overflow-y-auto">
        {messages.map(msg => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`py-2 px-3 rounded-lg ${
              msg.senderId === auth.currentUser.uid
                ? 'bg-primary text-white self-end'
                : 'bg-gray-200 text-gray-800 self-start'
            }`}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>

      <form onSubmit={handleSend} className="flex space-x-2">
        <input
          ref={inputRef}
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 border rounded-lg
                     focus:ring-primary focus:border-primary"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-lg
                     hover:bg-primary/90 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}
