//-------------- Navigation Button for moving left or right (Currently for Carousel, may be used for others)
const NavigationBtn = (props) => (
  <button onClick={props.navigation} className="navigationBtn">{props.buttonName}</button>
);

export default NavigationBtn;