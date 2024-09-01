import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast'; // Importa toast
import { jwtDecode } from 'jwt-decode';
import { getAllSkills } from '../services/SkillServices';
import { associateSkillToUser } from '../services/UserSkillServices';
import StarRatings from 'react-star-ratings';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function CreateSkill() {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [level, setLevel] = useState(0); // Nível inicial é 0
  const [userLogin, setUserLogin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillList = await getAllSkills();
        setSkills(skillList);
      } catch (err) {
        console.error('Erro ao carregar habilidades:', err);
      }
    };

    const getAuthenticatedUserLogin = () => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setUserLogin(decodedToken.sub || decodedToken.login);
        } catch (err) {
          console.error('Erro ao decodificar o token:', err);
        }
      }
    };

    fetchSkills();
    getAuthenticatedUserLogin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSkill) {
      toast.error('Selecione uma habilidade.');
      return;
    }

    if (level <= 0) {
      toast.error('Defina um nível válido.');
      return;
    }

    try {
      await associateSkillToUser(selectedSkill, userLogin, level);
      toast.success('Habilidade associada com sucesso!');
      setSelectedSkill('');
      setLevel(0);
      navigate('/user-skill');
    } catch (err) {
      toast.error('Erro ao associar habilidade.');
      setError('Erro ao associar habilidade.');
    }
  };

  return (
    <div style={{ marginBottom: '8rem', marginTop: '8rem' }} className="container">
      <div className='my-5'>
        <h2 className="text-center">Adicione uma skill a sua <span className='dm-serif-display-regular-medium'>Biblioteca</span></h2>
        <p className="text-center my-3">Classifique e colecione as habilidades que você domina! ٩(◕‿◕｡)۶</p>
      </div>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
        <div className="mb-4">
          <label htmlFor="skillSelect" className="form-label">Selecione sua nova skill:</label>
          <select
            id="skillSelect"
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="form-select"
            required // Campo obrigatório
          >
            <option value="">Selecionar...</option>
            {skills.map((skill) => (
              <option key={skill.id} value={skill.id}>
                {skill.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label style={{ marginRight: 10 }} className="form-label">O quanto você domina essa skill?</label>
          <div>
            <StarRatings
              rating={level}
              starRatedColor="yellow"
              numberOfStars={5}
              name="rating"
              starDimension="30px"
              starSpacing="5px"
              changeRating={(newRating) => setLevel(newRating)}
              required // Torna a seleção de nível obrigatória
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="userLogin" className="form-label">Login do Usuário:</label>
          <input
            id="userLogin"
            type="text"
            value={userLogin}
            readOnly
            className="form-control"
            required // Campo obrigatório
          />
        </div>
        <button style={{ marginTop: '2rem' }} type="submit" className="custom-create-button w-100">
          Associar Skill a minha biblioteca
        </button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default CreateSkill;
