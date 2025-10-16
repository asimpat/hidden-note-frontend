import { useEffect, useState } from "react";
import { getUser } from "../services/userService";
import { useMessages } from "../hooks/useMessages";
import Messages from "../components/dashboard/Messages";
import Profile from "../components/dashboard/Profile";
import Sidebar from "../components/dashboard/SideBar";
import Navbar from "../components/landing/NavBar";

function Dashboard({ onSignOut }) {
  const [activeTab, setActiveTab] = useState("messages");
  const [user, setUser] = useState(null);
  const { messages, count, nextPage, prevPage,fetchMessages, loading, handleDelete, handleMarkAsRead } = useMessages();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 ml-64 pt-20 px-8">
        <Navbar isLoggedIn={true} onSignOut={onSignOut} />
        <main className="max-w-5xl mx-auto w-full">
          {activeTab === "messages" && (
            <Messages
              user={user}
              messages={messages}
              loading={loading}
              nextPage={nextPage}
              prevPage={prevPage}
              count={count}
              handleDelete={handleDelete}
              handleMarkAsRead={handleMarkAsRead}
              fetchMessages={fetchMessages}
            />
          )}
          {activeTab === "profile" && <Profile user={user} />}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
