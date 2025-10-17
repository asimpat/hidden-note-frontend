import { useEffect, useState } from "react";
import { getUser } from "../services/userService";
import { useMessages } from "../hooks/useMessages";
import Messages from "../components/dashboard/Messages";
import Profile from "../components/dashboard/Profile";
import DashboardNavbar from "../components/dashboard/DashboardNavBar";

function Dashboard({ onSignOut }) {
  const [activeTab, setActiveTab] = useState("messages");
  const [user, setUser] = useState(null);
  const {
    messages,
    count,
    nextPage,
    prevPage,
    fetchMessages,
    loading,
    handleDelete,
    handleMarkAsRead,
  } = useMessages();

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <DashboardNavbar
        onSignOut={onSignOut}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content - Centered */}
      <main className="pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto">
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
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
