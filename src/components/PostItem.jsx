import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const PostItem = ({ postID, title, thumbnail, description }) => {
    const shortDescription = description.length > 140 ? description.substr(0, 140) + '...' : description;
    const shortPostTitle = title.length > 30 ? title.substr(0, 30) + '...' : title;

    return (
        <article style={{ height: '20rem' }} className="card">
            <img style={{height: '10rem'}} src={thumbnail} alt={title} className="card-img-top" />
            <div className="card-body">
                <Link to={`/posts/${postID}`} className="text-decoration-none text-dark">
                    <h5 className="card-title">{shortPostTitle}</h5>
                </Link>
                <p className="card-text">{shortDescription}</p>
            </div>
        </article>
    );
};

export default PostItem;
