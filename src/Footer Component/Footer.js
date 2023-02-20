import React from "react";
import "./Footer.css"
const Footer = () => {
  return (


    <div className="main-footer">
      <h3><span class="highlight">(OUR DEVLOPERS)</span></h3>
      <hr />
      <div className="container">
        <div className="row">
          {/* Column no- 01 */}
          <div className="col">
            <h4>KHAN ZUBAIR AHMED</h4>
            <ul className="css">
              <li>Rizvi College Of Engineering</li>
              <li>18</li>
              <li>211P026</li>
            </ul>
          </div>
          {/* Column no- 02 */}
          <div className="col">
            <h4>MOHAMMAD</h4>
            <ul className="css">
              <li>Rizvi College Of Engineering</li>
              <li>24</li>
              <li>211P012</li>
            </ul>
          </div>
          {/* Column no- 03 */}
          <div className="col">
            <h4>YASHRAJ DESHMUKH</h4>
            <ul className="css">
              <li>Rizvi College Of Engineering</li>
              <li>09</li>
              <li>211P045</li>
            </ul>
          </div>
          {/* Column no- 04 */}
          <div className="col">
            <h4>YOUSUF</h4>
            <ul className="css">
              <li>Rizvi College Of Engineering</li>
              <li>07</li>
              <li>211P041</li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} E-Bazar Website | All Rights Are Reserved | Term of Service |  Privacy
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer;