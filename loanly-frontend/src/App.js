import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Backend API URL
const BASE_URL = 'http://localhost:5001';

function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [creditType, setCreditType] = useState('creditCard');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPhoneNumber = (phone) => {
    if (!phone) return '';
    
    // Remove any non-digit characters except '+'
    let cleaned = phone.replace(/[^\d+]/g, '');
    
    // If number starts with '0', remove it
    if (cleaned.startsWith('0')) {
      cleaned = cleaned.substring(1);
    }
    
    // If number starts with '91', ensure it has '+'
    if (cleaned.startsWith('91')) {
      cleaned = '+' + cleaned;
    }
    
    // If number doesn't have any prefix, add '+91'
    if (!cleaned.startsWith('+')) {
      if (cleaned.startsWith('91')) {
        cleaned = '+' + cleaned;
      } else {
        cleaned = '+91' + cleaned;
      }
    }
    
    return cleaned;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!name.trim() || !phone.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    // Format and validate phone number
    const formattedPhone = formatPhoneNumber(phone);
    if (!formattedPhone.startsWith('+91') || formattedPhone.length !== 13) {
      toast.error('Please enter a valid Indian phone number');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${BASE_URL}/call`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: formattedPhone,
          type: creditType === 'creditCard' ? 'cc' : 'loan'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initiate call');
      }

      toast.success('Call initiated successfully! You will receive a call shortly.');
      
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Failed to initiate call. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhone(formattedPhone);
  };

  return (
    <div className="font-poppins">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between bg-white py-4 px-10 shadow-md">
        <div className="text-3xl font-semibold text-[#009959]">Loan.ly</div>
        <div className="space-x-8 font-medium text-[#333]">
          <a href="http://localhost:3000/" className="hover:text-[#009959]">Product</a>
          <a href="http://localhost:3000/" className="hover:text-[#009959]">Solutions</a>
          <a href="http://localhost:3000/" className="hover:text-[#009959]">Resource</a>
          <a href="http://localhost:3000/" className="hover:text-[#009959]">About Us</a>
        </div>
        <div className="space-x-4">
          <button className="border-2 border-[#009959] text-[#009959] py-2 px-6 rounded-md hover:bg-[#009959] hover:text-white transition duration-300">Watch Demo</button>
          <button className="bg-[#009959] text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-300">Try Free</button>
        </div>
      </nav>

      {/* Main Form */}
      <div className="flex justify-center items-center h-screen bg-[#f3f3f3]">
        <form className="bg-white p-10 rounded-lg shadow-lg w-96" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-semibold text-[#009959] mb-6 text-center">Loanly Application</h2>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mb-4 border rounded-md border-[#009959] focus:outline-none focus:ring-2 focus:ring-[#009959]"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full p-3 mb-4 border rounded-md border-[#009959] focus:outline-none focus:ring-2 focus:ring-[#009959]"
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-3">
              <input
                type="radio"
                value="creditCard"
                checked={creditType === 'creditCard'}
                onChange={() => setCreditType('creditCard')}
                className="mr-3"
              />
              <label className="text-lg text-[#009959]">Credit Card</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                value="loan"
                checked={creditType === 'loan'}
                onChange={() => setCreditType('loan')}
                className="mr-3"
              />
              <label className="text-lg text-[#009959]">Loan</label>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#009959] text-white p-3 rounded-md hover:bg-green-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Initiating Call...' : 'Submit'}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
