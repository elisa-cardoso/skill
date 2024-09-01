import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllSkills } from '../services/SkillServices';
import { AiFillEdit } from 'react-icons/ai';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostDetail = () => {
    const { id } = useParams(); // Obtém o ID da URL
    const [skill, setSkill] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSkill = async () => {
            try {
                const skillsData = await getAllSkills();
                const skill = skillsData.find(skill => skill.id === parseInt(id));
                setSkill(skill);
            } catch (error) {
                console.error('Error fetching skill:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSkill();
    }, [id]);

    const handleEdit = () => {
        navigate(`/edit/${id}`); // Redireciona para a página de edição
    };

    if (loading) return <div className="text-center my-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;

    if (!skill) return <div className="text-center my-5"><h2>Post não encontrado.</h2></div>;

    return (
        <section className="post-detail py-5">
            <div className="container">
                
                <div className="row mb-4">
                    <div className="col-md-8 offset-md-2">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h1 className="mb-0">{skill.title}</h1>
                            <button
                                className="custom-userskill-button rounded-circle"
                                style={{ width: '50px', height: '50px' }}
                                onClick={handleEdit}
                            >
                                <AiFillEdit style={{ width: 20, height: 20, paddingRight: '0.3rem' }}/>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <div className="card mb-4 shadow-sm">
                            {skill.image && (
                                <img
                                    src={skill.image}
                                    alt={skill.title}
                                    className="card-img-top img-fluid rounded"
                                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                                />
                            )}
                            <div className="card-body">
                                <p className="card-text">{skill.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PostDetail;
