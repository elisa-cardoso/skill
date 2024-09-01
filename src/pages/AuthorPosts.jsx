import React, { useEffect, useState } from "react";
import toast from "react-hot-toast"; // Importa o toast
import {
  getUserSkills,
  updateUserSkill,
  deleteUserSkill,
} from "../services/UserSkillServices";
import UserPostItem from "../components/UserPostItem";
import SearchBar from "../components/SearchBar";
import "bootstrap/dist/css/bootstrap.min.css";

const AuthorPost = () => {
  const [userSkills, setUserSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsData = await getUserSkills();
        setUserSkills(skillsData);
        setFilteredSkills(skillsData); // Inicialmente, todas as skills são exibidas
      } catch (err) {
        setError("Failed to load user skills.");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    // Filtra as habilidades com base na busca
    setFilteredSkills(
      userSkills.filter((skill) =>
        skill.skillName.toLowerCase().includes(searchQuery.toLowerCase().trim())
      )
    );
  }, [searchQuery, userSkills]);

  const handleRateChange = async (id, newLevel) => {
    try {
      await updateUserSkill(id, { level: newLevel });
      setUserSkills((prevSkills) =>
        prevSkills.map((skill) =>
          skill.id === id ? { ...skill, level: newLevel } : skill
        )
      );
      toast.success('Nível da skill atualizado com sucesso!');
    } catch (err) {
      toast.error('Erro ao atualizar nível da skill.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Você tem certeza que deseja excluir essa skill da sua biblioteca?")) {
      try {
        await deleteUserSkill(id);
        setUserSkills((prevSkills) =>
          prevSkills.filter((skill) => skill.id !== id)
        );
        toast.success('Skill deletada com sucesso!');
      } catch (err) {
        toast.error('Erro ao deletar skill.');
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (loading) {
    return <h2 className="text-center my-5">Loading...</h2>;
  }

  if (error) {
    return <h2 className="text-center text-danger my-5">{error}</h2>;
  }

  return (
    <section
      style={{ marginBottom: "8rem", marginTop: "8rem" }}
      className="author-post"
    >
      <div className="my-5">
        <h2 className="text-center">
          Minha Biblioteca de{" "}
          <span className="dm-serif-display-regular-medium">Skills</span>
        </h2>
        <div className="d-flex justify-content-center align-items-center my-3">
          <p className="text-center me-3 mb-0">
            Quais skills mais você domina? Dê uma nota para elas!
          </p>
          <a href="/user-skill/new" className="custom-userskill-button">
            Adicionar
          </a>
        </div>

        <div style={{marginTop: '3rem'}}>
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => (
            <div key={skill.id} className="col">
              <div className="card h-100">
                {skill.imageUrl && (
                  <img
                    src={skill.imageUrl}
                    className="card-img-top"
                    alt={skill.skillName}
                    style={{ objectFit: "cover", height: "180px" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{skill.skillName}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {skill.userLogin}
                  </h6>
                  <UserPostItem
                    skillId={skill.skillId}
                    level={skill.level}
                    userSkillId={skill.id}
                    description={skill.description}
                    onRate={handleRateChange}
                  />
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center border-top">
                  <small className="text-muted">Level: {skill.level}</small>
                  <button
                    className="custom-delete-button"
                    onClick={() => handleDelete(skill.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            
          ))
        ) : (
          <h2 style={{marginBottom: '12rem'}}>Nenhuma skill encontrada</h2>
        )}
      </div>
    </section>
  );
};

export default AuthorPost;
