import React, { useState } from 'react';

const Contactus = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');  // This is the response state to show success or error message

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the form data to the API
      const apiResponse = await fetch('http://localhost:8000/api/contact-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
        },
        body: JSON.stringify({ name, email, message }), // Convert form data to JSON
      });

      // Check if the response was successful
      if (apiResponse.ok) {
        const data = await apiResponse.json();
        console.log('Success:', data);
        setResponse('Thank you for contacting us!');
        // Optionally, reset the form
        setName('');
        setEmail('');
        setMessage('');
        
        setTimeout(() => {
          setResponse(''); // Reset response message after 4 seconds
        }, 4000);
      } else {
        const errorResponse = await apiResponse.json();
        console.error('Error:', errorResponse);
        setResponse('Something went wrong, please try again.');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      setResponse('Network error, please try again later.');
    }
  };

  return (
    <section id="contact" className="bg-white py-16 px-4 md:px-16  text-blue-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8 border-b-2 pb-4">Contact Us</h2>

        {/* Display Response Message */}
        {response && (
          <div className="text-center mb-4 text-lg font-medium text-green-600">
            {response}
          </div>
        )}

        <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Message Field */}
          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              className="w-full p-2 border rounded"
              rows="4"
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contactus;
