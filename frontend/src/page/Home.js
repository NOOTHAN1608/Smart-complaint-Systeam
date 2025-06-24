
import React, { useState, useEffect } from 'react';

const pageContainerStyle = {
  width: "100vw",
  height: "100vh",
  overflowY: "auto", 
  padding: "20px",
  backgroundColor: "#121212", 
  color: "#ffffff",
  boxSizing: "border-box",
};

const images = [
  'https://cdn.pixabay.com/photo/2013/03/02/02/41/alley-89197_1280.jpg',
  'https://cdn.pixabay.com/photo/2015/07/29/09/47/indian-worker-865664_1280.jpg',
  'https://cdn.pixabay.com/photo/2022/04/03/09/04/bridge-7108432_1280.jpg',
  'https://cdn.pixabay.com/photo/2021/01/30/09/10/man-5963236_1280.jpg',
  'https://cdn.pixabay.com/photo/2023/06/04/19/56/garbage-8040768_1280.jpg',
];

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      console.log("ScrollY:", window.scrollY);
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={pageContainerStyle}>
      {/* Main Content */}
      <div className="bg-black">
        {/* Banner Image Slider */}
        <section className="w-full h-[500px] relative overflow-hidden">
          {/* Overlay and Image Background */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div
            className="w-full h-full bg-cover bg-center relative transition-all duration-500"
            style={{
              backgroundImage: `url(${images[currentImageIndex]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100%',
              width: '100%',
            }}
          >
            <div className="relative z-20 text-center text-white py-16 px-4">
              <h1 className="text-4xl font-bold">Welcome to Smart Complaints System</h1>
              <p className="mt-4 text-lg">A platform for easy and efficient complaint registration and resolution</p>
            </div>
          </div>
        </section>
        {/* New Updates Section */}
        <section 
          className="py-16 bg-gray-900" 
          style={{ 
            backgroundImage: 'url("https://cdn.pixabay.com/photo/2016/11/21/12/30/milky-way-1845068_1280.jpg")', 
            backgroundSize: "cover", 
            backgroundPosition: "center" 
          }}
        >
          <div className="max-w-7xl mx-auto px-4 text-center bg-black bg-opacity-50">
            <h2 className="text-3xl font-semibold mb-8 text-white">New Updates</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Private Complaints */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
                <h3 className="text-xl font-semibold text-white">Private Complaints</h3>
                <p className="mt-2 text-gray-300">
                  Submit private complaints like water pipe damage, electricity issues, or drainage problems. 
                  Our system assigns the right technician to address your concern quickly and efficiently.
                </p>
                <img 
                  src="https://cdn.pixabay.com/photo/2019/01/29/16/33/tool-3962800_1280.jpg" 
                  alt="Private Complaints Management" 
                  className="mt-4 rounded-md transform transition-transform hover:scale-110" 
                />
              </div>
              {/* Public Complaints */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
                <h3 className="text-xl font-semibold text-white">Public Complaints</h3>
                <p className="mt-2 text-gray-300">
                  Report public issues like streetlight outages, garbage collection delays, or road maintenance needs.
                </p>
                <img 
                  src="https://cdn.pixabay.com/photo/2016/03/16/14/12/garbage-can-1260832_1280.jpg" 
                  alt="Public Complaints" 
                  className="mt-4 rounded-md transform transition-transform hover:scale-110" 
                />
              </div>
              {/* Technician Portal */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
                <h3 className="text-xl font-semibold text-white">Technician Portal</h3>
                <p className="mt-2 text-gray-300">
                  Technicians now have access to a dedicated portal to view and manage their assigned complaints.
                </p>
                <img 
                  src="https://cdn.pixabay.com/photo/2015/12/07/10/56/architect-1080589_1280.jpg" 
                  alt="Technician Portal" 
                  className="mt-4 rounded-md transform transition-transform hover:scale-110" 
                />
              </div>
            </div>
          </div>
        </section>
        {/* Helpful Tips Section */}
        <section 
          className="py-16 bg-gray-900" 
          style={{ 
            backgroundImage: 'url("https://cdn.pixabay.com/photo/2018/12/06/00/30/milky-way-3858959_1280.jpg")', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-6 text-white text-center">Helpful Tips for a Better Neighborhood</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Tip 1: Save Water */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:translate-y-2">
                <h3 className="text-xl font-semibold text-white">Save Water</h3>
                <p className="mt-2 text-gray-300">
                  Fix leaking taps and use water wisely to ensure a consistent supply for all residents.
                </p>
                <img src="https://cdn.pixabay.com/photo/2018/03/19/15/04/faucet-3240211_1280.jpg" alt="Save Water" className="mt-4 rounded-md" />
              </div>
              {/* Tip 2: Report Streetlight Issues */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:translate-y-2">
                <h3 className="text-xl font-semibold text-white">Report Streetlight Issues</h3>
                <p className="mt-2 text-gray-300">
                  Ensure safety by reporting non-functional streetlights to your local authorities promptly.
                </p>
                <img src="https://cdn.pixabay.com/photo/2016/03/27/19/22/city-1283801_1280.jpg" alt="Streetlight Tips" className="mt-4 rounded-md" />
              </div>
              {/* Tip 3: Proper Garbage Disposal */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:translate-y-2">
                <h3 className="text-xl font-semibold text-white">Proper Garbage Disposal</h3>
                <p className="mt-2 text-gray-300">
                  Separate waste into biodegradable and non-biodegradable bins to promote recycling.
                </p>
                <img src="https://cdn.pixabay.com/photo/2019/03/30/01/41/garbage-4090382_1280.jpg" alt="Garbage Tips" className="mt-4 rounded-md" />
              </div>
            </div>
          </div>
        </section>
        {/* Community Cleanliness Tips Section */}
        <section 
          className="py-16 bg-gray-900"
          style={{ 
            backgroundImage: 'url("https://cdn.pixabay.com/photo/2023/08/14/15/42/milkyway-8190232_1280.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-6 text-white">Community Cleanliness Tips</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {/* Tip 1: Organize Street Clean-Up Drives */}
              <div 
                className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300"
                onMouseEnter={(e) => e.currentTarget.classList.add('scale-105')}
                onMouseLeave={(e) => e.currentTarget.classList.remove('scale-105')}
              >
                <h3 className="text-xl font-semibold text-white">Organize Street Clean-Up Drives</h3>
                <p className="mt-2 text-gray-300">
                  Join your neighbors to clean up the streets, picking up litter and ensuring public spaces stay clean and inviting for everyone.
                </p>
                <img 
                  src="https://cdn.pixabay.com/photo/2022/10/03/01/00/woman-7494708_1280.jpg" 
                  alt="Street Clean-Up" 
                  className="mt-4 rounded-md" 
                />
              </div>
              {/* Tip 2: Maintain Clean Drainage Systems */}
              <div 
                className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300"
                onMouseEnter={(e) => e.currentTarget.classList.add('scale-105')}
                onMouseLeave={(e) => e.currentTarget.classList.remove('scale-105')}
              >
                <h3 className="text-xl font-semibold text-white">Maintain Clean Drainage Systems</h3>
                <p className="mt-2 text-gray-300">
                  Regularly clear debris from drains and gutters to prevent blockages, ensure smooth water flow, and reduce the risk of flooding.
                </p>
                <img 
                  src="https://cdn.pixabay.com/photo/2013/09/02/23/32/sewer-cover-178443_1280.jpg" 
                  alt="Clean Drainage" 
                  className="mt-4 rounded-md" 
                />
              </div>
              {/* Tip 3: Encourage Countrywide Cleanliness Campaigns */}
              <div 
                className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300"
                onMouseEnter={(e) => e.currentTarget.classList.add('scale-105')}
                onMouseLeave={(e) => e.currentTarget.classList.remove('scale-105')}
              >
                <h3 className="text-xl font-semibold text-white">Encourage Countrywide Cleanliness Campaigns</h3>
                <p className="mt-2 text-gray-300">
                  Participate in or organize national clean-up days where citizens across the country unite to clean public spaces, promoting pride and cleanliness in the nation.
                </p>
                <img 
                  src="https://cdn.pixabay.com/photo/2024/02/08/07/43/ai-generated-8560473_1280.jpg" 
                  alt="Cleanliness Campaign" 
                  className="mt-4 rounded-md" 
                />
              </div>
            </div>
          </div>
        </section>
        {/* Footer Section */}
        <footer className="bg-black text-white py-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-lg mb-2">@ 2025 Smart Complaints System. All Rights Reserved.</p>
            {/* Contact Information */}
            <div className="mb-6">
              <h4 className="text-xl font-semibold">Contact Us</h4>
              <p className="text-sm">Email: smartcomplaintsportal@outlook.com</p>
              <p className="text-sm">Phone: +91 8073935297</p>
              <p className="text-sm">For Complaints: +91 8073935297</p>
              <p className="text-sm">For Technical Support: +91 8073935297</p>
              <p className="text-sm">Email Support: smartcomplaintsportal@outlook.com</p>
            </div>
            {/* Quick Links */}
            <div className="mb-6">
              <h4 className="text-xl font-semibold">Quick Links</h4>
              <div className="flex justify-center space-x-4">
                <a href="/about" className="text-white hover:text-blue-500">About Us</a>
                <a href="/contact" className="text-white hover:text-blue-500">Contact</a>
                <a href="/UserLogin" className="text-white hover:text-blue-500">User Login</a>
                <a href="/AdminLogin" className="text-white hover:text-blue-500">Admin Login</a>
                <a href="/TechnicianLogin" className="text-white hover:text-blue-500">Technician Login</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            padding: '15px 20px',
            fontSize: '18px',
            backgroundColor: '#1e3a8a',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.5)',
            zIndex: 1000, // Ensure the button is on top of other elements
          }}
        >
          ↑ Top
        </button>
      )}
    </div>
  );
};

export default HomePage;