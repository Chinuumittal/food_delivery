import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/Storecontext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list, searchQuery } = useContext(StoreContext);

  const query = (searchQuery ?? '').toLowerCase().trim();

  const filteredItems = food_list?.filter((item) => {
    const name = item?.name?.toLowerCase() ?? '';
    const itemCategory = item?.category ?? '';
    const matchesCategory = category === 'All' || category === itemCategory;
    const matchesSearch = query === '' || name.includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p className="no-results">No dishes available for your search.</p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
