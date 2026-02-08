import React, { useState, useEffect } from 'react';

const EventBooking = () => {
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    eventType: 'Wedding',
    date: '',
    guests: '50',
    message: ''
  });

  const [status, setStatus] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('email');
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/admin');
        const data = await res.json();
        if (data.events) setUpcomingEvents(data.events.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch events', error);
      }
    };
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      if (selectedMethod === 'whatsapp') {
        const formattedDate = new Date(bookingData.date).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        const whatsappMessage = `*New Booking Request*%0A%0A
          *Name:* ${encodeURIComponent(bookingData.name)}%0A
          *Email:* ${encodeURIComponent(bookingData.email)}%0A
          *Event Type:* ${encodeURIComponent(bookingData.eventType)}%0A
          *Date:* ${encodeURIComponent(formattedDate)}%0A
          *Guests:* ${encodeURIComponent(bookingData.guests)}%0A
          *Message:* ${encodeURIComponent(bookingData.message || 'None')}`;

        const whatsappUrl = `https://wa.me/+16786986413?text=${whatsappMessage}`;
        window.open(whatsappUrl, '_blank');
      } else {
        window.open(
          'https://docs.google.com/forms/d/1-MYUzyZe45vU5HZ9WI8QDkLeR1ZzCikt4uq0PQKPSIw/viewform?ts=67587118&edit_requested',
          '_blank'
        );
      }

      setStatus('success');
      setTimeout(() => setStatus(''), 5000);
      
      if (selectedMethod === 'whatsapp') {
        setBookingData({
          name: '',
          email: '',
          eventType: 'Wedding',
          date: '',
          guests: '50',
          message: ''
        });
      }

    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <section className="container mx-auto px-5 md:px-16 py-20" id="events">
      {/* Header Section */}
      <div className="text-center mb-16">
        <span className="inline-block text-purple-600 font-semibold text-sm tracking-widest uppercase mb-4 bg-purple-50 px-6 py-2 rounded-full">
          BOOKINGS & EVENTS
        </span>
        <h2 className="text-4xl md:text-5xl font-bold dark:text-white mb-6">
          Plan Your Event or Join Ours
        </h2>
        <p className="text-xl  max-w-3xl mx-auto dark:text-white leading-relaxed ">
          Book us for your special occasion or attend our upcoming events
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        {/* Booking Form - Left Side */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="flex gap-4 mb-8">
            <button
              type="button"
              className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-300 ${
                selectedMethod === 'email'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                  : 'bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-blue-400'
              }`}
              onClick={() => setSelectedMethod('email')}
            >
               Email
            </button>
            <button
              type="button"
              className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-300 ${
                selectedMethod === 'whatsapp'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                  : 'bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-green-400'
              }`}
              onClick={() => setSelectedMethod('whatsapp')}
            >
              📱 WhatsApp
            </button>
          </div>

          <div className="space-y-6">
            {selectedMethod === 'whatsapp' ? (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  WhatsApp Booking Form
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={bookingData.name}
                      onChange={handleChange}
                      placeholder="John Doe" 
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={bookingData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Event Type
                  </label>
                  <select
                    name="eventType"
                    value={bookingData.eventType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Corporate">Corporate Event</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Community">Community Event</option>
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Event Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={bookingData.date}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Number of Guests
                    </label>
                    <input
                      type="number"
                      name="guests"
                      value={bookingData.guests}
                      onChange={handleChange}
                      placeholder="50"
                      min="1"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Special Requests
                  </label>
                  <textarea
                    name="message"
                    value={bookingData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your event..."
                    rows="3"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none"
                  />
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📧</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Email Booking Form
                </h3>
                <p className="text-gray-600 text-lg mb-6">
                  You'll be redirected to our secure Google Form to complete your booking request.
                </p>
              </div>
            )}

            {status === 'success' && (
              <div className="bg-green-100 text-green-800 px-4 py-3 rounded-lg font-medium animate-fadeIn">
                ✅ {selectedMethod === 'whatsapp' 
                  ? 'Booking request sent! Please check WhatsApp' 
                  : 'Redirecting to secure form...'}
              </div>
            )}

            {status === 'error' && (
              <div className="bg-red-100 text-red-800 px-4 py-3 rounded-lg font-medium animate-fadeIn">
                ❌ Failed to process request. Please try again.
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={status === 'sending'}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg px-12 py-4 rounded-full hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'sending' 
                ? '📤 Processing...' 
                : selectedMethod === 'whatsapp' 
                  ? '📨 Send via WhatsApp' 
                  : '📩 Proceed to Email Form'}
            </button>
          </div>
        </div>

        {/* Upcoming Events - Right Side */}
        <div>
          <h2 className="text-3xl text-center md:text-4xl font-bold dark:text-white mb-6">
            Upcoming Events
          </h2>
          <div className="space-y-6">
            {upcomingEvents.map(event => (
              <div 
                key={event.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex gap-6 items-start"
              >
                <div className="flex-shrink-0 bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-xl p-4 text-center min-w-[80px]">
                  <div className="text-3xl font-bold">
                    {new Date(event.date).getUTCDate()}
                  </div>
                  <div className="text-sm font-semibold uppercase mt-1">
                    {new Date(event.date).toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {event.title}
                  </h4>
                  <p className="text-gray-600 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {event.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {upcomingEvents.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <p className="text-gray-500 text-lg">No upcoming events at the moment.</p>
            </div>
          )}
        </div>
      </div>

      {/* Custom animations CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </section>
  );
};

export default EventBooking;
