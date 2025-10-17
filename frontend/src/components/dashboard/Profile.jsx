function Profile({ user }) {
  if (!user) return <p className="text-white">Loading profile...</p>;

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
          <label className="block text-slate-400 mb-2">Unique Link</label>
          <input
            type="text"
            value={`${window.location.origin}/to/${user.secret_link}/`}
            readOnly
            className="w-full bg-slate-900 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-2">Member Since</label>
          <p className="text-white">
            {new Date(user.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
