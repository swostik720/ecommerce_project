import React, { useState } from 'react';

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
    <div className="w-full bg-gray-100 py-16 px-6 md:px-20 text-blue-900">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8 border-b-2 pb-4">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-300">
            <button
              className="w-full text-left py-3 px-4 flex justify-between items-center focus:outline-none text-lg font-medium"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="text-blue-500">{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && (
              <p className="p-4 text-gray-700 bg-white rounded-md">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
