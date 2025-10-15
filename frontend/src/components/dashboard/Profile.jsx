

function Profile() {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Profile</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-slate-400 mb-2">Username</label>
          <input
            type="text"
            value="john_doe"
            className="w-full bg-slate-900 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-400"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-2">Email</label>
          <input
            type="email"
            value="john@example.com"
            className="w-full bg-slate-900 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-400"
          />
        </div>
        <div>
          <label className="block text-slate-400 mb-2">Member Since</label>
          <p className="text-white">October 12, 2024</p>
        </div>
        <button className="bg-amber-400 hover:bg-amber-500 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-colors">
          Update Profile
        </button>
      </div>
    </div>
  );
}


export default Profile;