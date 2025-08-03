'use client';

// TODO: Implement Counter component
// - Display current count
// - Add increment/decrement buttons
// - Add reset button
// - Add increment by amount functionality
// - Use Redux for state management

export default function Counter() {
  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          Counter Component
        </h2>
        <p className="text-gray-600 mb-3">
          Practice Redux state management with a simple counter.
        </p>
        
        {/* TODO: Implement counter functionality */}
        <div className="text-center">
          <div className="text-6xl font-bold text-blue-600 mb-4">
            0
          </div>
          <p className="text-gray-500">Counter functionality coming soon...</p>
        </div>
      </div>
    </div>
  );
}
