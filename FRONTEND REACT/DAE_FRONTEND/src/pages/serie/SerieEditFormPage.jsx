import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getAllCategoryService } from "../../services/CategoryService";
import { showSerieService, updateSerieService } from "../../services/serieServices";


const initData = {
    id: '',
    title: '',
    description: '',
    rating: '',
    category: '',
    release_date: '',
    image_url: '',
}


function SerieEditFormPage(){
    
    const navigate = useNavigate();
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState(initData);


    const loadCategories = async () => {
        const resp  = await getAllCategoryService();
        setCategories(resp.data);
    };


    const setDataForm = async () => {
        const resp = await showSerieService(id);
        // Si la categoría viene como objeto, extraer el id
        let serieData = resp.data;
        if (serieData.category && typeof serieData.category === 'object') {
            serieData = { ...serieData, category: serieData.category.id };
        }
        setData(serieData);
    }


    useEffect(()=>{
        loadCategories();
        setDataForm();
    }, []);


    const onChangeTitle = (e) => {
        setData({ ...data, title: e.target.value });
    };


    const onChangeDescription = (e) => {
        setData({ ...data, description: e.target.value });
    };


    const onChangeCategoria = (e) => {
        setData({ ...data, category: e.target.value });
    };


    const onChangeRating = (e) => {
        setData({ ...data, rating: e.target.value });
    };


    const onChangeReleaseDate = (e) => {
        setData({ ...data, release_date: e.target.value });
    };


    const onChangeImageUrl = (e) => {
        setData({ ...data, image_url: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateSerieService(data.id, data);
            console.log('Enviando', data);
            navigate('/series');
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="container mt-3">
            <div className="border-bottom pb-3 mb-3">
                <h3>Editar - Serie</h3>
            </div>
            <form onSubmit={handleSubmit} className="row">
                <div className="col-md-4">
                    <img 
                        id="fileImg"
                        className="card-img-top" 
                        src={data.image_url || "https://dummyimage.com/400x250/000/fff"} 
                        alt="img" />
                </div>
                <div className="col-md-8">
                    <div className="mb-3">
                        <label htmlFor="inputTitle" className="form-label">Título</label>
                        <input type="text" onChange={onChangeTitle} className="form-control" id="inputTitle" value={data.title} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputDescription" className="form-label">Descripción</label>
                        <textarea onChange={onChangeDescription} className="form-control" id="inputDescription" value={data.description} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputCategory" className="form-label">Categoría</label>
                        <select onChange={onChangeCategoria} className="form-select" id="inputCategory" value={data.category} required >
                            <option value="">Seleccione una opción</option>
                            {categories.map((item)=>(
                            <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputRating" className="form-label">Rating</label>
                        <input type="number" onChange={onChangeRating} className="form-control" id="inputRating" min="1" max="10" value={data.rating} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputReleaseDate" className="form-label">Fecha de estreno</label>
                        <input type="date" onChange={onChangeReleaseDate} className="form-control" id="inputReleaseDate" value={data.release_date} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputImageUrl" className="form-label">URL de Imagen</label>
                        <input type="url" onChange={onChangeImageUrl} className="form-control" id="inputImageUrl" value={data.image_url} />
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-primary me-2">Guardar</button> 
                        <Link className="btn btn-secondary" to="/series">Cancelar</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}


export default SerieEditFormPage
