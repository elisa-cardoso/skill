import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="mb-5 d-flex justify-content-center">
      <div className="input-group w-50">
        <input
          type="text"
          className="form-control rounded-pill"
          placeholder="Buscar por título..."
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
