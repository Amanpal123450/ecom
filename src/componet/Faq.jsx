import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What is E-Shop?",
            answer: "E-Shop is an online marketplace where you can buy high-quality products at affordable prices.",
        },
        {
            question: "How can I track my order?",
            answer: "Once your order is shipped, you will receive a tracking link via email or SMS.",
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept Credit/Debit Cards, PayPal, UPI, and Net Banking.",
        },
        {
            question: "What is your return policy?",
            answer: "You can return any product within 7 days of delivery for a full refund or exchange.",
        },
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4 text-black">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg shadow-md p-4">
                        <button
                            className="flex justify-between items-center w-full text-left text-lg font-medium"
                            onClick={() => toggleFAQ(index)}
                        >
                            {faq.question}
                            <FontAwesomeIcon icon={openIndex === index ? faChevronUp : faChevronDown} />
                        </button>
                        {openIndex === index && (
                            <p className="mt-2 text-gray-600">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
