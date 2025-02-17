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
            "You can withdraw your earnings through the dashboard under the 'Withdraw' section. You need to provide your payment details and the amount you'd like to withdraw. The withdrawal process is fast and secure, and your earnings will be processed within 24 hours.",
        },
        {
          question: "What tasks can I complete?",
          answer:
            "You can complete any tasks that match your skills and interests. Tasks may include data entry, writing, design, marketing, customer service, and much more. You can filter tasks based on categories or select from the available tasks on your dashboard.",
        },
        {
          question: "How do I track my progress?",
          answer:
            "You can easily track your progress on the 'My Tasks' section of the dashboard. It shows the tasks you have completed, pending tasks, and the earnings for each task.",
        },
      ],
    },
    {
      category: "Buyer",
      questions: [
        {
          question: "What are the guidelines for creating tasks?",
          answer:
            "Ensure your tasks are clear, concise, and follow platform policies. You should provide enough details for the workers to understand the task fully. Include any specific requirements, deadlines, and any files needed for the task. Also, make sure to set fair compensation for the tasks.",
        },
        {
          question: "Can I review submissions before payment?",
          answer:
            "Yes, you can review and approve submissions before releasing payment. Once a worker completes a task, you will have the opportunity to review their work, request revisions if necessary, and approve the task for payment. This process ensures quality and satisfaction for both parties.",
        },
        {
          question: "What happens if I am not satisfied with the work?",
          answer:
            "If you're not satisfied with the work, you can request revisions or dispute the task through the platform. Admins will review the dispute based on the evidence provided by both parties and help resolve the issue in a fair manner.",
        },
      ],
    },
    {
      category: "Admin",
      questions: [
        {
          question: "How are disputes resolved?",
          answer:
            "Admins review disputes based on evidence and platform guidelines to make a fair decision. Both parties involved in the dispute will be asked to submit their evidence and explain their side. Admins will then evaluate the situation and come to a resolution, which may include requesting additional work, revising submissions, or issuing refunds.",
        },
        {
          question: "What are my responsibilities as an Admin?",
          answer:
            "Admins oversee platform activities, manage users, and ensure smooth operations. Their responsibilities include approving or rejecting tasks, resolving disputes, monitoring payment transactions, ensuring compliance with platform policies, and maintaining a positive and secure environment for users.",
        },
        {
          question: "Can Admins modify tasks or payments?",
          answer:
            "Admins have the authority to modify tasks if there are errors or issues, such as incorrect descriptions or payment terms. Admins can also oversee payments, ensuring that the transactions are completed properly and in accordance with platform rules.",
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
