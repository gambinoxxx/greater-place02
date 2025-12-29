import React, { useState } from 'react';

const QualityFeatures = () => {
  const [showForm, setShowForm] = useState(false);
  const [donationData, setDonationData] = useState({
    name: '',
    email: '',
    amount: '50',
    message: ''
  });

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
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Our Mission & Vision
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Empowering youth through faith, dance, and community
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Mission & Vision - Left Side */}
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-4xl">🎯</span>
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              A faith-based nonprofit that partners with churches, schools, mental health programs, shelters, group homes, and communities to empower youth and young adults ages 8–33. We develop their gifts and build confidence through dance, mentorship, and creative expression—bringing freedom and social impact to their communities.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-4xl">✨</span>
              Our Vision
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              To see youth and young adults walking in liberty, purpose, and confidence through creativity and the art of dance.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-4xl">🌍</span>
              2026 Theme: The Gathering
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed italic mb-2">
              “Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you. And surely I am with you always, to the very end of the age.”
            </p>
            <p className="text-right text-purple-600 font-semibold">– Matthew 28:19–20</p>
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
