import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Footer() {
  return (
    <div className='Footer'>
			<div className="HrefWrapper" title="Author">
				<a href="https://github.com/GYegor"  target="_blank"> 
					<p><FontAwesomeIcon className="FaIcon"  icon={['fab', 'github']} /></p>
					<p>GYegor</p>
				</a>
			</div>
			<div className="HrefWrapper" title="Rolling Scopes School">
				<a href="https://rs.school/js/"  target="_blank">
					<img src="https://rs.school/images/rs_school_js.svg" alt="RSSchool logo"/>
				</a>
			</div>
    </div>
  );
}

export default Footer;