
import React from 'react';


function CategoryMenu({ categories, selectedCategory, onCategoryChange,data }) {
  if (data && data ? data : true) {
    import('../waiter.css');
 }
  return (
    <div className="category-menu">
      {categories.map((category) => (
        <button
          key={category} // Use the category name as the key 
          onClick={() => onCategoryChange(category)}
          className={selectedCategory === category ? 'active' : ''}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;

