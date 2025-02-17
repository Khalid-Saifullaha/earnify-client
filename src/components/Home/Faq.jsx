import React, { useState } from "react";

const Faq = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      category: "Worker",
      questions: [
        {
          question: "How do I withdraw my earnings?",
          answer:
            "You can withdraw your earnings through the dashboard under the 'Withdraw' section.",
        },
        {
          question: "What tasks can I complete?",
          answer:
            "You can complete any tasks that match your skills and interests.",
        },
      ],
    },
    {
      category: "Buyer",
      questions: [
        {
          question: "What are the guidelines for creating tasks?",
          answer:
            "Ensure your tasks are clear, concise, and follow platform policies.",
        },
        {
          question: "Can I review submissions before payment?",
          answer:
            "Yes, you can review and approve submissions before releasing payment.",
        },
      ],
    },
    {
      category: "Admin",
      questions: [
        {
          question: "How are disputes resolved?",
          answer:
            "Admins review disputes based on evidence and platform guidelines to make a fair decision.",
        },
        {
          question: "What are my responsibilities as an Admin?",
          answer:
            "Admins oversee platform activities, manage users, and ensure smooth operations.",
        },
      ],
    },
  ];

  // Filter questions based on search query
  const filteredFaqs = faqs.map((group) => ({
    ...group,
    questions: group.questions.filter((q) =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  return (
    <div className="bg-white py-12">
      <div className=" ">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-700">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Find answers to common questions for Workers, Buyers, and Admins.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 ">
          <input
            type="text"
            placeholder="Search FAQs..."
            className="w-full px-4 py-3 border rounded-lg shadow-sm  bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* FAQ Groups */}
        <div className="space-y-8">
          {filteredFaqs.map((group) => (
            <div
              key={group.category}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
                {group.category}
              </h3>
              {group.questions.length > 0 ? (
                <div className="space-y-4">
                  {group.questions.map((faq, index) => (
                    <div key={index} className="group">
                      <button className="w-full text-left text-lg font-medium text-gray-700 group-hover:text-blue-500">
                        {faq.question}
                      </button>
                      <p className="mt-2 text-gray-600 pl-4 border-l-2 border-blue-500">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  No questions found for this category.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
