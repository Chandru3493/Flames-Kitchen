
import React from 'react';
import '../App.css'; 

function CategoryMenu({ categories, selectedCategory, onCategoryChange }) {
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

