import React from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "What features help me find the right property?",
answer: "Use the available filters and categories on our platform to browse and discover properties that match your preferences."
    },
    {
      question: "Are all properties verified?",
      answer:
        "Yes! We only list verified properties to ensure quality and trust.",
    },
    {
      question: "Can I contact the agent directly?",
      answer:
      "Currently, agent contact details are not displayed on the property cards. Please use the platform's inquiry form to get in touch."
    },
    {
      question: "Is there a subscription fee?",
      answer:
        "No, browsing properties and basic features are free for all users.",
    },
  ];

  return (
    <div className="my-12 px-4 sm:px-0 max-w-5xl mx-auto ">
      <h2 className="text-2xl lg:text-3xl font-bold text-center mb-3">
        Frequently Asked Questions
      </h2>
      <p className="text-center max-w-xl mx-auto mb-10">
  Here are some of the most common questions our users ask about properties, agents, and services.
</p>

      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div key={index} className="collapse collapse-arrow border border-gray-500 rounded-box">
            <input type="checkbox" />
            <div className="collapse-title text-lg text-gray-600 dark:text-gray-300 font-medium">{faq.question}</div>
            <div className="collapse-content">
              <p className="text-gray-500">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
