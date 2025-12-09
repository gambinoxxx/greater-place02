import React, { useState } from 'react';

const QualityFeatures = () => {
  const [showForm, setShowForm] = useState(false);
  const [donationData, setDonationData] = useState({
    name: '',
    email: '',
    amount: '50',
    message: ''
  });

  const coordinators = [
    { id: 1, name: 'Ijeoma Mbaezue', role: 'Chair-Person', image: '/features/1.svg' },
    { id: 2, name: 'Mycherie Onwuzuruike', role: 'Board Member', image: '/features/2.svg' },   
    { id: 3, name: 'Ekemini Udom', role: 'Board Member', image: '/features/3.svg' },
    { id: 4, name: 'Paula', role: 'Board Member', image: '/features/4.svg' },
    { id: 5, name: 'Ayanna', role: 'Board Member', image: '/features/1.svg' },
    { id: 6, name: 'Chidimma Okeh', role: 'Board Member', image: '/features/2.svg' },
    { id: 7, name: 'Ijeoma Nmeregini', role: 'Board Member', image: '/features/3.svg' },
    { id: 8, name: 'Ashaayla Anu Elora', role: 'Dance Instructor', image: '/features/4.svg' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonationData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cashAppLink = `https://cash.app/$BrandyOnwuzuruike/${donationData.amount}`;
    window.open(cashAppLink, '_blank');
    setShowForm(false);
  };

  return (
    <section className="container mx-auto px-5 md:px-16 py-20" id="donate">
      {/* Header Section */}
      <div className="text-center mb-16">
        <span className="inline-block text-purple-600 font-semibold text-sm tracking-widest uppercase mb-4 bg-purple-50 px-6 py-2 rounded-full">
          SUPPORT OUR MISSION
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Join Us in Making a Difference
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Meet our dedicated team and support our vision
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Coordinators Grid - Left Side */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center lg:text-left">
            Our Leadership Team
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {coordinators.map(coordinator => (
              <div 
                key={coordinator.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100 p-4 flex items-center justify-center">
                  <img 
                    src={coordinator.image} 
                    alt={coordinator.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-bold text-gray-800 mb-1">
                    {coordinator.name}
                  </h4>
                  <p className="text-sm text-purple-600 font-medium">
                    {coordinator.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Donation Section - Right Side */}
        <div className="lg:sticky lg:top-24">
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 md:p-12 shadow-xl">
            {!showForm ? (
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Make a Donation
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  Your contribution helps us continue our mission of worship and creative expression
                </p>
                <button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg px-12 py-4 rounded-full hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl w-full"
                  onClick={() => setShowForm(true)}
                >
                  Make a Donation
                </button>
              </div>
            ) : (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Donation Details
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={donationData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={donationData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Donation Amount
                  </label>
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {[25, 50, 100, 250].map(amount => (
                      <button
                        type="button"
                        key={amount}
                        className={`py-3 rounded-lg font-bold transition-all duration-200 ${
                          donationData.amount === String(amount)
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105'
                            : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-purple-400'
                        }`}
                        onClick={() => setDonationData({...donationData, amount: String(amount)})}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    name="amount"
                    value={donationData.amount}
                    onChange={handleChange}
                    min="1"
                    placeholder="Custom amount"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={donationData.message}
                    onChange={handleChange}
                    placeholder="Share why you're supporting us..."
                    rows="3"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button" 
                    className="flex-1 px-6 py-3 rounded-lg font-semibold text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50 transition-all"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                    onClick={handleSubmit}
                  >
                    Proceed to Donate
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Your Impact
            </h4>
            <p className="text-gray-600 text-sm">
              Every donation helps us create spaces for worship, provide dance instruction, 
              and spread God's presence through creative expression.
            </p>
          </div>
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

export default QualityFeatures;
