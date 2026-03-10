import "../css/Hero.css";


function Hero() {
  const handleExplore = () => {
    document.getElementById("scheme-section")?.scrollIntoView({ behavior: "smooth" });
  };

   const handleApp = () =>{
        document.getElementById("app-banner")?.scrollIntoView({ behavior: "smooth" });
   };

  return (
    <>
      <div className="hero">
        <div className="content">
          <p>Start your Digital Gold Journey Today!</p>
          <h1>In <span>BHIMA e-Gold</span> APP EVERYTHING YOU NEED TO GROW YOUR GOLD </h1>
          <div className="startButtons">
            <button className="primary" 
                onClick={handleApp}><img src="header/get.png" alt="" /><b> Get Started</b></button>
            <button
              className="secondary"
              onClick={handleExplore}
            >
              <img src="header/explore.png" alt="" />
              <b> Explore Plans</b>
            </button>
          </div>
        </div>
       <div className="heroImage">
          <img src="header/Vector.png" alt="Bhima App" />
       </div>
    </div>
    </>
    )
}

export default Hero;