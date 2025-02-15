import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [creditType, setCreditType] = useState('creditCard');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulating an API call with setTimeout
    await fetch('http://localhost:5000/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        phone,
        creditType,
      }),
    });

    toast.success('Call Initiated Successfully');
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
              onChange={(e) => setPhone(e.target.value)}
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

          <button type="submit" className="w-full bg-[#009959] text-white p-3 rounded-md hover:bg-green-600 transition duration-300">
            Submit
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
