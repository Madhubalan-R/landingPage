import { useState } from 'react';
import '../css/faq.css';

const faqData = [
    {
        question: "What is the BHIMA e-Gold App?",
        answer: "The BHIMA e-Gold App is a digital savings platform that allows customers to save in gold, silver, and structured monthly schemes securely and conveniently."
    },
    {
        question: "WHow can I start saving gold with just ₹100?",
        answer: "Simply download the app, register in seconds, and begin saving from ₹100. Your amount is instantly converted into 22Kt gold at the live market rate."
    },
    {
        question: "How is my gold calculated and stored digitally?",
        answer: "Each deposit is converted into gold weight based on the day’s live rate and securely recorded in your account. You can view your accumulated gold weight and transaction history anytime."
    },
    {
        question: "Can I track live gold and silver rates inside the app?",
        answer: "Yes, the app provides real-time gold and silver rate updates for complete transparency. This helps you make informed decisions on when to save."
    },
    {
        question: "What bonus benefits do I earn on my savings?",
        answer: "Depending on your chosen scheme and tenure, you receive additional gold weight or bonus installments. The longer you stay invested, the greater your benefit."
    },
    {
        question: "How and where can I redeem my savings?",
        answer: "You can redeem your accumulated gold or savings amount as jewellery. Redemption is available at Bhima Jewellery showrooms or through online delivery."
    }
];

const Faq = () => {
    const [activeSection, setActiveSection] = useState<'faq' | 'terms'>('faq');
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="faq-container">
            <div className="section-selector">
                <div className={`selector-highlight ${activeSection}`} />
                <button 
                    className={`selector-btn ${activeSection === 'faq' ? 'active' : ''}`}
                    onClick={() => setActiveSection('faq')}
                >
                    FAQs
                </button>
                <button 
                    className={`selector-btn ${activeSection === 'terms' ? 'active' : ''}`}
                    onClick={() => setActiveSection('terms')}
                >
                    Terms & Conditions
                </button>
            </div>

            <div className="faq-content">
                <h2 className="faq-title">Bhima e-Gold App</h2>

                {activeSection === 'faq' ? (
                    <div className="accordion">
                        {faqData.map((item, index) => (
                            <div 
                                key={index} 
                                className={`accordion-item ${openIndex === index ? 'open' : ''}`}
                            >
                                <div 
                                    className="accordion-header"
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <span>{item.question}</span>
                                    <svg 
                                        className="chevron-icon" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="2"
                                    >
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </div>
                                <div className="accordion-body">
                                    <div className="accordion-answer">
                                        {item.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="terms-content">
                        <p><span>Eligibility & Registration:</span> The scheme is available for individuals above 18 years with valid KYC details. Registration must be completed through the official app.</p>
                        <p><span>Savings & Conversion:</span> Gold schemes are converted into 22Kt gold weight at the live market rate. Amount-based schemes are accumulated as monetary value.</p>
                        <p><span>Tenure & Bonus Eligibility:</span> Bonus benefits are applicable only after completing the specified scheme tenure. Early closure may result in loss of bonus benefits.</p>
                      <p><span>Redemption Rules:</span> Redemption is permitted as jewellery or coins as per scheme terms. VA, GST, and applicable charges must be paid at the time of redemption. </p>
                      <p><span>No Refund Policy:</span> Savings cannot be refunded in cash unless specifically stated under the scheme conditions.</p>
                      <p><span>Company Rights:</span> Bhima Jewellery reserves the right to modify, suspend, or discontinue schemes as per policy requirements. </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Faq;