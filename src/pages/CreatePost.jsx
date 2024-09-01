import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeSkills } from '../services/SkillServices';
import toast from 'react-hot-toast'; // Importa o toast
import 'bootstrap/dist/css/bootstrap.min.css';

const CreatePost = () => {
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        description: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificação adicional para garantir que todos os campos estejam preenchidos
        if (!formData.title || !formData.image || !formData.description) {
            toast.error('Todos os campos são obrigatórios.');
            return;
        }

        try {
            await storeSkills(formData);
            toast.success('Skill criada com sucesso!');
            navigate('/home');
        } catch (err) {
            console.error('Erro ao criar a skill:', err);
            toast.error('Erro ao criar skill. Tente novamente.');
        }
    };

    return (
        <div style={{ marginBottom: '8rem', marginTop: '8rem' }} className="container">
            <div className='my-5'>
                <h2 className="text-center">Crie uma nova <span className='dm-serif-display-regular-medium'>Skill</span></h2>
                <p className="text-center my-3">Compartilhe seus conhecimentos enriquecendo a nossa comunidade! o( ❛ᴗ❛ )o </p>
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
                                value={formData.title}
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
                                value={formData.image}
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
                                value={formData.description}
                                onChange={handleChange}
                                className="form-control"
                                rows="4"
                                required // Campo obrigatório
                            />
                        </div>
                        <button style={{ marginTop: '2rem' }} type="submit" className="btn custom-card-button w-100">
                            Create Skill
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
