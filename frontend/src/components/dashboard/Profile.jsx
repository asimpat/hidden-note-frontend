import { useEffect, useState } from "react";
import { getUser } from "../../services/userService";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        setUser(data);
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  console.log("usersss", user);
  

  if (loading) {
    return (
      <div className="text-white text-center py-10">Loading profile...</div>
    );
  }

  if (!user) {
    return (
      <div className="text-white text-center py-10">No user data found.</div>
    );
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Profile</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-slate-400 mb-2">Username</label>
          <input
            type="text"
            value={user.username || ""}
            readOnly
            className="w-full bg-slate-900 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-2">Email</label>
          <input
            type="email"
            value={user.email || ""}
            readOnly
            className="w-full bg-slate-900 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-2">Secret Link</label>
          <input
            type="text"
            value={user.secret_link || "No secret link"}
            readOnly
            className="w-full bg-slate-900 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-2">Member Since</label>
          <p className="text-white">
            {new Date(user.date_joined).toLocaleDateString()}
          </p>
        </div>

        <button className="bg-amber-400 hover:bg-amber-500 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-colors">
          Update Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
