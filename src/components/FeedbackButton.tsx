import React from 'react';
import { MessageCircle } from 'lucide-react';

export function FeedbackButton() {
  const handleFeedback = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSfAJq_7RCx7rGNpZYvVnI4-UAbv8mY2kWEHu84InZVfPUIVNw/viewform?usp=header', '_blank');
  };

  return (
    <button
      onClick={handleFeedback}
      className="fixed bottom-4 right-4 bg-white/90 hover:bg-white/100 text-gray-800 px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 transition-all hover:scale-105"
    >
      <MessageCircle className="w-4 h-4" />
      <span className="text-sm font-medium">Feedback</span>
    </button>
  );
}