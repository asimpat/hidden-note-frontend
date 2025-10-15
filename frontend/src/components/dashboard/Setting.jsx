import { useState } from "react";

function Setting() {
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-white font-semibold mb-3">Notifications</h3>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="w-5 h-5 text-amber-400 bg-slate-900 border-slate-600 rounded focus:ring-amber-400"
            />
            <span className="text-slate-300">
              Email me when I receive new messages
            </span>
          </label>
        </div>

        <div className="border-t border-slate-700 pt-6">
          <h3 className="text-white font-semibold mb-3">Password</h3>
          <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Change Password
          </button>
        </div>

        <div className="border-t border-slate-700 pt-6">
          <h3 className="text-red-400 font-semibold mb-3">Danger Zone</h3>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}


export default Setting;