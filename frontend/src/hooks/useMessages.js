import { useEffect, useState } from "react";
import { getMessages, deleteMessage } from "../services/messagesService";
import { markAsRead } from "../services/messagesService";

export const useMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessages();
        // ✅ Access only the results array
        setMessages(data.results || []);
      } catch (err) {
        setError(err.message || "Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, is_read: true } : msg))
      );
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  return { messages, loading, handleDelete, error, handleMarkAsRead };
};
