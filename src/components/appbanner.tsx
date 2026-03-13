import "../css/appbanner.css";

function Appbanner() {
  return (
    <div className="appbanner" id="app-banner">
      <div className="banner-content">
        <div className="banner-left">
          <p className="download-text">DOWNLOAD THE APP</p>
          <h2 className="banner-title">Easy Payment Options</h2>
          <div className="title-underline"></div>
          <div className="paymentIcons">
            <img src="./icons/gpay.png" alt="UPI" />
            <img src="./icons/phonepay.png" alt="UPI" />
            <img src="./icons/upi.png" alt="UPI" />
            <img src="./icons/rupay.png" alt="UPI" />
            <img src="./icons/amazon.png" alt="UPI" />
            <img src="./icons/visa.png" alt="UPI" />
            <img src="./icons/mastercard.png" alt="UPI" />
            <img src="./icons/netbanking.png" alt="UPI" />
            <img src="./icons/mobile.png" alt="UPI" />
            <img src="./icons/amex.png" alt="UPI" />
          </div>
          <p className="banner-subtitle">
            A simple gold savings plan to help you purchase your dream jewellery.
          </p>

          <div className="available-on">
            <p>Available On</p>
            <div className="download-options">
              <div className="download-column">
                {/* <div className="qr-box">
                  <img src="andriod.png" alt="Play Store QR" />
                </div> */}
                <a href="https://play.google.com/store/apps/details?id=com.bhimajewellery" target="_blank" className="store-btn">
                  <img src="playstore.png" alt="Google Play" className="playstore" />
                </a>
              </div>
              <div className="download-column">
                {/* <div className="qr-box">
                  <img src="ios.png" alt="App Store QR" />
                </div> */}
                <a href="https://apps.apple.com/in/app/bhima-e-gold/id6753930510" target="_blank" className="store-btn">
                  <img src="appstore.png" alt="App Store" className="appstore" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="banner-right">
          <div className="video-placeholder">
            <video src="appview.mp4" autoPlay loop muted playsInline className="MobileScreen"></video>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appbanner;