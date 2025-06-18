import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryComponent from '../components/CategoryComponent';
import { getAllCategoryService, deleteCategoryService } from '../services/CategoryService';

function CategoryPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await getAllCategoryService();
            setCategories(response.data);
        } catch (error) {
            console.error('Error al obtener categorías:', error);
            setError('No se pudieron cargar las categorías. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
            try {
                await deleteCategoryService(id);
                fetchCategories();
            } catch (error) {
                console.error('Error al eliminar categoría:', error);
                setError('No se pudo eliminar la categoría. Por favor, intenta de nuevo.');
            }
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Categorías</h1>
                <button 
                    className="btn btn-primary"
                    onClick={() => navigate('/categories/new')}
                >
                    Nueva Categoría
                </button>
            </div>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            {loading ? (
                <div className="text-center">Cargando...</div>
            ) : (
                <div className="row">
                    {categories.map(cat => (
                        <div className="col-md-4 mb-3" key={cat.id}>
                            <CategoryComponent
                                codigo={cat.id}
                                nombre={cat.name}
                                descripcion={cat.description}
                                onDelete={() => handleDelete(cat.id)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CategoryPage;