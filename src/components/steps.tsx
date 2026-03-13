import "../css/steps.css";

function Steps() {
  return (
    <section className="steps-section">
      <h2>Get started in <span>3</span> easy steps</h2>
      <p className="subtitle"> Download → Choose → Save </p>

      <div className="steps-wrapper">
        <div className="circle-wrapper">
          <svg className="ring" viewBox="0 0 400 400">
            <circle
              cx="200"
              cy="200"
              r="170"
              className="ring-bg"
            />
          </svg>

          <div className="bullet start"></div>
          <div className="bullet end"></div>

          <div className="step step1">1</div>
          <div className="step step2">2</div>
          <div className="step step3">3</div>

          <div className="center-content">
            <img src="coin.png" alt="coin" className="rotating-coin"/>
            <h3>
              <span>3</span> simple steps <br /> to Save
            </h3>
          </div>
        </div>

        <div className="steps-content">
          <div className="step-card1">
            <div>
              <img src="steps/download.png" alt="" />
            </div>
            <div className="step-card-content">
            <h4>Download & Register</h4>
            <p>
              Signup with your Name, Mobile number, Email ID to create your account instantly.
            </p>
            </div>
          </div>

          <div className="step-card2">
            <div>
              <img src="steps/plan.png" alt="" />
            </div>
            <div className="step-card-content">
            <h4>Choose Your Scheme</h4>
            <p>
              Select the savings scheme that fits your goal and convenience
            </p>
            </div>
          </div>

          <div className="step-card1">
            <div>
              <img src="steps/save.png" alt="" />
            </div>
            <div className="step-card-content">
            <h4>Start Saving</h4>
            <p>
              Save in gold weight using UPI, Net Bancking, or other digital payment and watch gold grow.
            </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Steps;