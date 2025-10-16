import { useEffect, useState } from "react";
import {
  getMessages,
  deleteMessage,
  markAsRead,
} from "../services/messagesService";

export const useMessages = () => {
  const [messages, setMessages] = useState([]);
  const [count, setCount] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch messages (can handle pagination)
  const fetchMessages = async (url = null) => {
    setLoading(true);
    try {
      const data = await getMessages(url); // API accepts full URL or default base
      setMessages(data.results || []);
      setCount(data.count || 0);
      setNextPage(data.next);
      setPrevPage(data.previous);
    } catch (err) {
      setError(err.message || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    await deleteMessage(id);
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const handleMarkAsRead = async (id) => {
    await markAsRead(id);
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, is_read: true } : msg))
    );
  };

  return {
    messages,
    count,
    nextPage,
    prevPage,
    loading,
    error,
    fetchMessages,
    handleDelete,
    handleMarkAsRead,
  };
};
