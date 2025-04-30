import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import icons for expanding/collapsing

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What types of lenses do you offer?',
      answer: 'We offer a wide range of optical lenses including single vision, bifocal, progressive, and specialized lenses for specific needs like blue light blocking.',
    },
    {
      question: 'How can I order a custom solution?',
      answer: 'You can get in touch with us through our Custom Solutions page, where you can request tailored optical solutions based on your specific needs.',
    },
    {
      question: 'Do you provide international shipping?',
      answer: 'Yes, we provide worldwide shipping for our products. Check our shipping policy for more details on international orders.',
    },
    {
      question: 'How do I know which lens is right for me?',
      answer: 'Our optical experts are available to guide you through selecting the perfect lens. You can also schedule an online consultation or visit our store for personalized advice.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy on most products. Please visit our Return & Exchange page for full details on conditions and instructions.',
    },
    {
      question: 'Do you offer prescription lenses?',
      answer: 'Yes, we provide prescription lenses tailored to your needs. Upload your prescription during checkout or visit our store for an eye test.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-gradient-to-b from-indigo-50 to-blue-100 py-20 px-6 md:px-16 text-blue-900">
      <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 border-b-2">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
            <button
              className="w-full text-left py-6 px-6 flex justify-between items-center focus:outline-none text-xl font-semibold hover:bg-blue-50 transition duration-300"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-gray-800">{faq.question}</span>
              <span className="text-blue-600 text-2xl">
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>
            {openIndex === index && (
              <div className="p-6 text-lg text-gray-700 bg-gray-50 rounded-b-lg transition-all duration-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
