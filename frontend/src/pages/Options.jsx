import { Link } from "react-router-dom";

const Options = () => {
  return (
    <div className="optionsPageContainer">
      <h2 className="optionsTitle">Pick your Poison</h2>
      <div className="optionsDescr">Below you will find a list of current options implemented in the site.</div>
      <ul className="optionsList">
        <li className="optionListItem1">
          <Link to='/login'>
            <span className="optionLink1">Login</span>
          </Link>
        </li>
        <li className="optionListItem2">
          <Link to='/Create'>
            <span className="optionLink2">Create Content</span>
          </Link>
        </li>
        <li className="optionListItem3">
          <Link to='/usersContent'>
            <span className="optionLink3">Content made by users like you!</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Options;