// src/pages/SeriePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SerieComponent from '../components/SerieComponent';
import { getAllSerieService, deleteSerieService } from '../services/serieServices';

function SeriePage() {
    const urlApi = 'http://localhost:8000/series/api/v1/series/';

    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const loadData = async () => {
        setLoading(true);
        const resp = await getAllSerieService();
        setSeries(resp.data);
        setLoading(false);
    };
    useEffect(() => {
        loadData();
    }, []);

    const fetchSeries = async () => {
        setLoading(true);
        const resp = await getAllSerieService();
        setSeries(resp.data);
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta serie?')) {
            await deleteSerieService(id);
            await fetchSeries();
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Series</h1>
                <button 
                    className="btn btn-primary"
                    onClick={() => navigate('/series/new')}
                >
                    Nueva Serie
                </button>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            {loading ? (
                <div className="d-flex justify-content-center">
                    <output className="spinner-border">
                        <span className="visually-hidden">Cargando...</span>
                    </output>
                </div>
            ) : (
                <div className="row">
                    {series.length === 0 ? (
                        <div className="col-12">
                            <div className="alert alert-info">
                                No hay series disponibles. ¡Crea una nueva!
                            </div>
                        </div>
                    ) : (
                        series.map((serie) => (
                            <div key={serie.id} className="col-md-3 mb-3">
                                <SerieComponent
                                    codigo={serie.id}
                                    titulo={serie.title}
                                    descripcion={serie.description}
                                    fecha={serie.release_date}
                                    rating={serie.rating}
                                    categoria={serie.category?.name || ''}
                                    imagen={serie.image_url}
                                    onDelete={() => handleDelete(serie.id)}
                                />
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default SeriePage;