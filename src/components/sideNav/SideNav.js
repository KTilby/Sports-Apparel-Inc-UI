import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import style from './SideNav.module.css';
import Checkbox from '../checkbox/Checkbox';
import arrowUp from '../../assets/images/arrow_up.png';
import arrowDown from '../../assets/images/arrow_down.png';
import Button from '../button/Button';
import { SideNavContext } from './SideNavContext';

/**
 * SideNav component for filtering options.
 * @param {Object} props - The component props.
 * @param {function} props.submitHandler - Function to handle form submission.
 * @returns {JSX.Element} SideNav component JSX.
 */
const SideNav = ({ submitHandler }) => {
  const history = useHistory();
  const [showMoreCats, setShowMoreCats] = useState(false);
  const [showMoreTypes, setShowMoreTypes] = useState(false);
  const [groupChecked, setGroupChecked] = useState([]);
  const { types, categories } = useContext(SideNavContext);
  const [sortedTypes, setSortedTypes] = useState([]);
  const [sortedCategories, setSortedCategories] = useState([]);

  useEffect(() => {
    // Sort types and categories alphabetically
    const sortedType = types.sort((a, b) => a.localeCompare(b));
    const sortedCategorie = categories.sort((a, b) => a.localeCompare(b));
    setSortedTypes(sortedType);
    setSortedCategories(sortedCategorie);
  }, [types, categories, sortedCategories, sortedTypes]);

  // Resets checked boxes when navigating to different and the same paths
  useEffect(() => {
    setGroupChecked([]);
  }, [history.location.key]);

  // from https://intellipaat.com/blog/react-checkbox/#:~:text=Use%20controlled%20components%20to%20update,other%20components%20and%20form%20elements.
  const inputHandler = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setGroupChecked([...groupChecked, value]);
    } else {
      setGroupChecked(groupChecked.filter((item) => item !== value));
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    submitHandler(groupChecked);
  };

  return (
    <div className={style.SideNav}>
      <form noValidate onSubmit={onSubmit}>
        <h3 className={style.header}>Category</h3>
        {categories.slice(0, 6).map((category) => (
          <Checkbox
            checked={groupChecked.includes(category)}
            key={category}
            onChange={inputHandler}
            name={category}
          />
        ))}
        {showMoreCats
          && categories.slice(6).map((category) => (
            <Checkbox
              checked={groupChecked.includes(category)}
              key={category}
              onChange={inputHandler}
              name={category}
            />
          ))}
        {categories.length > 6 && (
          <Button className="sideNavButton" onClick={() => setShowMoreCats(!showMoreCats)}>
            <img src={showMoreCats ? arrowUp : arrowDown} alt="Arrow" className={style.arrow} />
            {showMoreCats ? 'Show less' : 'Show more'}
          </Button>
        )}
        <h3 className={style.header}>Type</h3>
        {types.slice(0, 6).map((type) => (
          <Checkbox
            checked={groupChecked.includes(type)}
            key={type}
            onChange={inputHandler}
            name={type}
          />
        ))}
        {showMoreTypes
          && types.slice(6).map((type) => (
            <Checkbox
              checked={groupChecked.includes(type)}
              key={type}
              onChange={inputHandler}
              name={type}
            />
          ))}
        {types.length > 6 && (
          <Button className="sideNavButton" onClick={() => setShowMoreTypes(!showMoreTypes)}>
            <img src={showMoreTypes ? arrowUp : arrowDown} alt="Arrow" className={style.arrow} />
            {showMoreTypes ? 'Show less' : 'Show more'}
          </Button>
        )}
        <br />
        <Button className="sideNavSubmitButton" isSubmit>Apply</Button>
      </form>
    </div>
  );
};

export default SideNav;
