import React, { useState } from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

const UserPostItem = ({ skillId, userSkillId, title, level, description, onRate }) => {
  const shortDescription = description.length > 140 ? description.substr(0, 140) + '...' : description;

  return (
    <article className="post">
      <div className="post__content">
        <Link to={`/posts/${skillId}`}>
          <h3>{title}</h3>
          <p>{shortDescription}</p>
        </Link>
        <div className="star-rating">
        <StarRating
          initialRating={level}
          onRate={(newLevel) => onRate(userSkillId, newLevel)} // Passa o ID e o novo nível para a função onRate
        />
            </div>
      </div>
    </article>
  );
};

export default UserPostItem;
