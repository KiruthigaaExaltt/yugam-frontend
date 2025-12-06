

export default function TailwindFlexCard() {
  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-xl p-4 flex items-center justify-between">
        
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <img
            src="https://via.placeholder.com/60"
            alt="Avatar"
            className="w-14 h-14 rounded-full object-cover"
          />

          <div>
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-gray-500">UI/UX Designer</p>
          </div>
        </div>

        {/* Right Side */}
        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          View Profile
        </button>

      </div>
    </div>
  );
}
