import footerImage from '../assets/footerImage.webp';
import create5EBackground from '../assets/create5EBackground.webp';
import createFormBackground from '../assets/createFormBackground.webp';
import greenPoison from '../assets/greenPoison.gif';
import loggedInBackground from '../assets/loggedInBackground.webp';
import loginBackground from '../assets/loginBackground.webp';
import signUpBackground from '../assets/signUpBackground.webp';

const Footer = () => {
  return (
    <div className="footerContainer">
        <img className="footerImg" src={footerImage}/>
        <div className="footerHiddenContents">
          <img src={create5EBackground} />
          <img src={createFormBackground} />
          <img src={greenPoison} />
          <img src={loggedInBackground} />
          <img src={loginBackground} />
          <img src={signUpBackground} />
        </div>
    </div>
  );
};
export default Footer;