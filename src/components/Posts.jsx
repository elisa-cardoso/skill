import React, { useEffect, useState } from 'react';
import { getAllSkills } from '../services/SkillServices';
import PostItem from './PostItem';
import SearchBar from '../components/SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const Posts = () => {
  const [skills, setSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9); // 3 linhas * 3 Skills por linha

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsData = await getAllSkills();
        setSkills(skillsData);
      } catch (err) {
        setError('Failed to load skills.');
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const filteredSkills = skills.filter(skill =>
    skill.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  // Calculate the index of the first and last post on the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredSkills.slice(indexOfFirstPost, indexOfLastPost);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredSkills.length / postsPerPage);

  if (loading) {
    return <h2 className="text-center my-5">Loading...</h2>;
  }

  if (error) {
    return <h2 className="text-center text-danger my-5">{error}</h2>;
  }

  return (
    <section className="container my-5">
      <h2 className="text-center my-5">
        Conheça nossa biblioteca de <span className='dm-serif-display-regular-medium'>Skill</span>
      </h2>

      <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />

      {currentPosts.length > 0 ? (
        <>
          <div className="row">
            {currentPosts.map(skill => (
              <div className="col-md-4 mb-4" key={skill.id}>
                <PostItem
                  postID={skill.id}
                  title={skill.title}
                  thumbnail={skill.image}
                  description={skill.description}
                />
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &laquo;
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  <button 
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <h2 className="text-center">Nenhuma skill encontrada.</h2>
      )}
    </section>
  );
};

export default Posts;
