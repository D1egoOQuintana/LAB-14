import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllCategoryService, createCategoryService, updateCategoryService } from '../services/CategoryService';

function CategoryFormPage() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            updateCategoryService(id, {}) // Dummy call to check if service exists
            getAllCategoryService()
                .then(() => {
                    // ...existing code...
                })
                .catch(() => {
                    setError('No se pudo cargar la categoría para editar.');
                    setLoading(false);
                });
            // Cargar datos de la categoría a editar
            fetchCategory();
        }
    }, [id, isEditMode]);

    const fetchCategory = async () => {
        setLoading(true);
        try {
            const response = await getAllCategoryService();
            const category = response.data.find(cat => String(cat.id) === String(id));
            if (category) {
                setName(category.name);
                setDescription(category.description || '');
            } else {
                setError('No se encontró la categoría.');
            }
        } catch {
            setError('No se pudo cargar la categoría para editar.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setError('El nombre de la categoría es obligatorio.');
            return;
        }
        setLoading(true);
        setError('');
        const categoryData = { name, description };
        try {
            if (isEditMode) {
                await updateCategoryService(id, categoryData);
            } else {
                await createCategoryService(categoryData);
            }
            setLoading(false);
            navigate('/categories');
        } catch (err) {
            setError('No se pudo guardar la categoría. Por favor, intenta de nuevo.');
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>{isEditMode ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {loading && !error ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="categoryName" className="form-label">Nombre</label>
                        <input
                            id="categoryName"
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="categoryDescription" className="form-label">Descripción</label>
                        <textarea
                            id="categoryDescription"
                            className="form-control"
                            rows="3"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate('/categories')}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Guardando...' : (isEditMode ? 'Actualizar' : 'Crear Categoría')}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default CategoryFormPage;