import React from 'react';
import { useNavigate } from "react-router-dom";
import useSerieStore from '../store/serieStore';
import { deleteSerieService } from "../services/serieServices";
function SerieComponent(props) {
    const navigate = useNavigate();
    const removeSerie = useSerieStore((state) => state.removeSerie);

    const gotoUrl = (codigo) => {
        navigate("/series/edit/" + codigo);
    }
    const handleDelete = async () => {
        if(window.confirm('¿Estás seguro de que quieres eliminar esta serie?')) {
            await deleteSerieService(props.codigo);
            removeSerie(props.codigo); // Actualiza el store global
        }
    }

    return (
        <div className="card" style={{ minWidth: '260px', maxWidth: '320px', minHeight: '480px', margin: '0 auto' }}>
            <img 
                src={props.imagen || "https://via.placeholder.com/300x150?text=Sin+Imagen"} 
                className="card-img-top" 
                alt={props.titulo} 
                style={{ height: '180px', objectFit: 'cover' }}
            />
            <div className="card-body d-flex flex-column justify-content-between" style={{ height: '280px' }}>
                <h5 className="card-title">{props.titulo}</h5>
                <p className="card-text">{props.descripcion}</p>
                <p className="card-text"><strong>Fecha de estreno:</strong> {props.fecha}</p>
                <p className="card-text"><strong>Rating:</strong> {props.rating}</p>
                <p className="card-text"><strong>Categoría:</strong> {props.categoria}</p>
                <div className="d-flex justify-content-between mt-auto">
                    <button 
                        onClick={() => gotoUrl(props.codigo)} 
                        className="btn btn-secondary"
                    >
                        Editar
                    </button>
                    <button 
                        onClick={handleDelete} 
                        className="btn btn-danger"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SerieComponent;