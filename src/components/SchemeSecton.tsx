import { useState } from 'react';
import '../css/SchemeSection.css';

const schemeData = [
  {
    id: 'gold',
    label: "e - Gold",
    title: "Digital Gold Savings Scheme",
    subtitle: "What is Bhima e-Gold?",
    description: "Bhima e-Gold is a simple and trusted way to save 22Kt gold digitally at the live market rate, anytime and anywhere. Every amount you save is instantly converted into gold weight.",
    points: [
      "Start Saving: From just ₹100 Save as 22kt Gold",
      "Earn: Up to 8% additional gold benefit",
      "Tenure: 330 days",
      "Redemption: Saved gold weight + bonus gold weight"
    ],
    rowheader: "Duration (Days)",
    rowvalue:"Additional Benefits",
    table: [
      { particular: "1-75", value: "8%" },
      { particular: "76-150", value: "6%" },
      { particular: "151-225", value: "4%" },
      { particular: "226-300", value: "2%" },
      { particular: "301-330", value: "0%" }
    ],
    image: "egoldScheme.png"
  },
  {
    id: 'silver',
    label: "e - Silver",
    title: "Digital Silver Savings Scheme",
    subtitle: "What is Bhima e-Silver?",
    description: "Bhima e-Silver is a smart and convenient way to save silver digitally at the live market rate, anytime and anywhere. Every amount you save is instantly converted into silver weight.",
    points: [
      "Start Saving: From just ₹100",
      "Earn: Up to 8% additional silver benefit",
      "Tenure: 330 days",
      "Redemption: Saved silver weight + bonus silver weight"
    ],
    rowheader: "Duration(Days)",
    rowvalue:"Additional Benefits",
    table: [
      { particular: "1-75", value: "8%" },
      { particular: "76-150", value: "6%" },
      { particular: "151-225", value: "4%" },
      { particular: "226-300", value: "2%" },
      { particular: "301-330", value: "0%" }
    ],
    image: "silverScheme.png"
  },
  {
    id: 'tree',
    label: "Gold Tree",
    title: "Monthly Gold Savings Scheme",
    subtitle: "What is the Gold Tree Scheme?",
    description: "Gold Tree is a disciplined monthly gold savings plan that helps you grow your gold step by step. Your monthly savings are converted into 22Kt gold weight, making it ideal for planned jewellery purchases",
    points: [
      "Savings Amount: Starts from ₹1,000 (in multiples of ₹1,000)",
      "Tenure: 11 months",
      "Accumulation: Converted into 22Kt gold weight",
      "Bonus Benefit: 18% Value Addition (VA) discount at redemption"
    ],
    rowheader: "Particulars",
    rowvalue:"Values",
    table: [
      { particular: "Monthly Installment", value: " ₹ 15,000 (Fixed)" },
      { particular: "22kt Gold Rate", value: "₹ 14,500/g" },
      { particular: "Saved Gold Weight", value: "₹ 15,000 ÷ ₹ 14,500 = 1.03 grms" }
    ],
    image: "gtscheme.png"
  },
  {
    id: 'jewel',
    label: "Future Plus",
    title: "Monthly Amount Savings Scheme",
    subtitle: "What is the Future Plus Scheme?",
    description: "Future Plus is a disciplined monthly savings plan where you invest a fixed amount every month and receive one month’s installment as a bonus at the end of the tenure. Ideal for customers who prefer amount-based savings instead of gold-weight tracking",
    points: [
      "Savings Amount: Starts from ₹1,000 (in multiples of ₹1,000) ",
      "Tenure: 11 months",
      "Accumulation: Saved as amount (not gold weight) ",
      "Bonus Benefit: 1 month’s installment added as a bonus"
    ],
    rowheader: "Particulars",
    rowvalue:"Values",
    table: [
      { particular: "Monthly Installment", value: "₹5,000" },
      { particular: "Paid over 11 months", value: "₹55,000" },
      { particular: "Bonus (1 month)", value: "₹5,000" },
      { particular: "Total Value", value: "₹60,000" }
    ],
    image: "fbscheme.png"
  },
  {
    id: 'plus',
    label: "Advance Gold Plus",
    title: "Smart Gold Rate Protection Plan",
    subtitle: "What is the Advance Gold Plus Scheme?",
    description: "Advance Gold Plus allows customers to lock the gold rate in advance and secure their purchase against future price increases. Ideal for customers planning jewellery purchases and wanting protection from market fluctuations.",
    points: [
      "Savings: Starts from 8 grams",
      "Benefit: Lock today’s gold rate for future purchase",
      "Tenure: Freedom to lock the rate as per convenience",
      "Accumulation: Saved in gold weight"
    ],
    rowheader: "Tenure",
    rowvalue:"Advance payment Required",
    table: [
      { particular: "2 months", value: "30% of the total gold value" },
      { particular: "4 months", value: "50% of the total gold value" },
      { particular: "6 months ", value: "75% of the total gold value" },
      { particular: "12 months", value: "100% of the total gold value" }
    ],
    image: "acsscheme.png"
  },
    {
    id: 'spark',
    label: "Future Spark Plus",
    title: "Monthly Savings into Diamonds",
    subtitle: "What is the Future Spark Plus Scheme?",
    description: "Future Spark Plus is a high-value monthly savings plan designed for customers planning premium jewellery or diamond purchases. Save a fixed amount every month and receive two months’ installment as a bonus at maturity.",
    points: [
      "Savings Amount: Starts from ₹5,000 (in multiples of ₹5,000)",
      "Tenure: 11 months",
      "Accumulation: Saved as amount (not gold weight)",
      "Bonus Benefit: 2 months’ installment added as a bonus"
    ],
    rowheader: "Particulars",
    rowvalue:"Values",
    table: [
      { particular: "Monthly Installment", value: "₹5,000" },
      { particular: "Paid over 11 months", value: "₹55,000" },
      { particular: "Bonus (2 months)", value: "₹10,000" },
      { particular: "Total Value", value: "₹65,000" }
    ],
    image: "fspscheme.png"
  }
];

function SchemeSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const data = schemeData[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % schemeData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + schemeData.length) % schemeData.length);
  };

  return (
    <>
    <section className="scheme-container">
      <h2 className="section-title">Choose Your Saving Plan</h2>
      <div className="scheme-layout">
        <img src="bhimaclick.png" alt="" className="bhimaboy"/>
        <div className="scheme-nav">
          <div className="vertical-line">
            {schemeData.map((scheme, index) => {
              const itemHeight = 90; 
              const bottomPos = 452;
              
              let topPos;
              let zIndex;
              let opacity = 1;

              if (index <= activeIndex) {
                topPos = index * itemHeight;
                zIndex = 10 + index;
              } else {
                topPos = bottomPos;
                zIndex = 5 - index;
                if (index > activeIndex + 1) {
                  opacity = 0;
                }
              }

              return (
                <div 
                  key={scheme.id}
                  className={`nav-dot ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                  style={{ 
                    top: topPos, 
                    zIndex: zIndex,
                    opacity: opacity,
                    pointerEvents: opacity === 0 ? 'none' : 'auto'
                  }}
                >
                  <div className="dot-circle">
                    <div className="inner-dot"></div>
                  </div>
                  <span className="dot-label">{scheme.label}</span>
                </div>
              );
            })}

            <div 
              className="active-indicator" 
              style={{ 
                height: `${activeIndex * 90 + 25}px`,
                '--active-width': `${(activeIndex / (schemeData.length - 1)) * 100}%`
              } as React.CSSProperties}
            ></div>
          </div>
        </div>

        <div className="mobile-nav-header">
          <button className="nav-arrow prev" onClick={handlePrev}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <span className="mobile-selection-label">{data.label}</span>
          <button className="nav-arrow next" onClick={handleNext}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>

        <div className="scheme-image" key={`img-${activeIndex}`}>
          <img src={data.image} alt={data.label} />
        </div>

        <div className="scheme-details" key={`details-${activeIndex}`}>
          <h3>{data.title}</h3>
          <h5>{data.subtitle}</h5>
          <p className="scheme-desc">{data.description}</p>

          <div className="key-points">
            <h4>Key Highlights:</h4>
            <ul>
              {data.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="tabulation">
            <h4>Tabulation Content:</h4>
            <div className="table-wrapper">
              <div className="table-header">
                <span>{data.rowheader}</span>
                <span>{data.rowvalue}</span>
              </div>
              {data.table.map((row, i) => (
                <div className="table-row" key={i}>
                  <span>{row.particular}</span>
                  <span>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default SchemeSection;