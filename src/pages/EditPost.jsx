import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllSkills, updateSkills } from '../services/SkillServices';
import toast from 'react-hot-toast'; // Importa toast
import 'bootstrap/dist/css/bootstrap.min.css';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [skill, setSkill] = useState({
        title: '',
        image: '',
        description: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkill = async () => {
            try {
                const skillsData = await getAllSkills();
                const skill = skillsData.find(skill => skill.id === parseInt(id));
                setSkill(skill || {
                    title: '',
                    image: '',
                    description: ''
                });
            } catch (error) {
                console.error('Error fetching skill:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSkill();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSkill(prevSkill => ({ ...prevSkill, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Verificação adicional para garantir que todos os campos estejam preenchidos
        if (!skill.title || !skill.image || !skill.description) {
            toast.error('Todos os campos são obrigatórios.');
            return;
        }

        try {
            await updateSkills(id, skill);
            toast.success('Skill atualizada com sucesso!');
            navigate('/home');
        } catch (err) {
            console.error('Erro ao atualizar o post:', err);
            toast.error('Erro ao atualizar skill. Tente novamente.');
        }
    };

    if (loading) return <div className="text-center my-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;

    return (
        <div style={{ marginBottom: '8rem', marginTop: '8rem' }} className="container">
            <div className="my-5 text-center">
                <h2 className="mb-3">Edite a <span className='dm-serif-display-regular-medium'>Skill</span></h2>
                <p className="text-center mb-4">Ajude a manter a biblioteca sempre atualizada! (ﾉ◕ヮ◕)ﾉ </p>
            </div>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Título:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={skill.title}
                                onChange={handleChange}
                                className="form-control"
                                required // Campo obrigatório
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">URL da imagem:</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                value={skill.image}
                                onChange={handleChange}
                                className="form-control"
                                required // Campo obrigatório
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Descrição:</label>
                            <textarea
                                id="description"
                                name="description"
                                value={skill.description}
                                onChange={handleChange}
                                className="form-control"
                                rows="4"
                                required // Campo obrigatório
                            />
                        </div>
                        <button type="submit" className="btn custom-card-button w-100" style={{ marginTop: '2rem' }}>
                            Atualizar Skill
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPost;
