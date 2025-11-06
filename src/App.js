import React, { useEffect, useState } from "react";

function App() {
  const [rfidLogs, setRfidLogs] = useState([
    { id: 1, rfid: "9A2B3C4D", status: 1, time: "2025-11-06 12:30:00" },
    { id: 2, rfid: "9A2B3C4E", status: 0, time: "2025-11-06 12:40:10" },
  ]);

  const [newStatus, setNewStatus] = useState(1);

  // Simulate auto-refresh (you can replace with fetch() from your DB or MQTT)
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Auto-refreshing...");
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleStatus = (id) => {
    setRfidLogs((prev) =>
      prev.map((log) =>
        log.id === id ? { ...log, status: log.status === 1 ? 0 : 1 } : log
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-lg font-semibold">Final PIT</h1>
        <button
          onClick={() => window.location.reload()}
          className="bg-white text-blue-600 px-4 py-1 rounded-md font-medium hover:bg-blue-100 transition"
        >
          Refresh
        </button>
      </nav>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">RFID Status & Logs</h2>

        {/* RFID Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="py-3 px-4 text-left">RFID</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Time</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {rfidLogs.map((log) => (
                <tr key={log.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{log.rfid}</td>
                  <td className="py-3 px-4">
                    {log.status === 1 ? (
                      <span className="text-green-600 font-medium"> (1)</span>
                    ) : (
                      <span className="text-red-600 font-medium"> (0)</span>
                    )}
                  </td>
                  <td className="py-3 px-4">{log.time}</td>
                  <td className="py-3 px-4 text-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={log.status === 1}
                        onChange={() => toggleStatus(log.id)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Log Section */}
        <div className="mt-8 bg-white shadow rounded-lg p-4">
          <h3 className="font-semibold mb-2">Add New RFID Log</h3>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Enter RFID"
              className="border rounded-md px-3 py-2 flex-1 focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(Number(e.target.value))}
              className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value={1}>Active (1)</option>
              <option value={0}>Inactive (0)</option>
            </select>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition">
              Add
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;