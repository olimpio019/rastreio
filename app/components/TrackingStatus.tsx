interface TrackingEvent {
  status: string;
  location: string;
  timestamp: string;
  description: string;
}

interface TrackingStatusProps {
  events: TrackingEvent[];
}

export default function TrackingStatus({ events }: TrackingStatusProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Status do Rastreamento</h2>
      <div className="relative">
        {events.map((event, index) => (
          <div key={index} className="flex gap-4 mb-8">
            <div className="flex flex-col items-center">
              <div className={`w-4 h-4 rounded-full ${
                index === 0 ? 'bg-green-500' : 'bg-blue-500'
              }`} />
              {index !== events.length - 1 && (
                <div className="w-0.5 h-full bg-gray-200" />
              )}
            </div>
            <div className="flex-1">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{event.status}</h3>
                  <span className="text-sm text-gray-500">{event.timestamp}</span>
                </div>
                <p className="text-gray-600 mb-1">{event.location}</p>
                <p className="text-sm text-gray-500">{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 