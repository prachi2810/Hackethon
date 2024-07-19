import './storetemplate.css';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import fashion from "../../Images/fashion.jpg";
import { useParams, Link, useLocation } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';


function StoreTemplate() {
    const [templates, setTemplates] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    // const [tags,setTags]=useState(null);
    const { tags } = useParams();
    const [IdTemp, setIdTemp] = useState(null);
    const [load, setLoad] = useState(false);

    const nav = useNavigate();
    const navEditor = () => {
        nav('/createtemplate')
    }
    const editTemplate = (idEdit) => {
        nav(`/useTemplate/${idEdit}`)
    }
    useEffect(() => {
        const getTemplateByTags = async () => {
            try {
                setLoad(true);
                const response = await axios.get(`http://localhost:8000/templates/${tags}`)
                console.log(response)
                setTemplates(response.data);
            }
            catch (err) {
                console.log(err)
            } finally {
                setLoad(false);
            }
        }
        getTemplateByTags();
    }, [])

    return (
        <>

            {load ?

                <div className='mainBody'>
                    <div className="containerSpinner">
                        <div class="ring"></div>
                        <div class="ring"></div>
                        <div class="ring"></div>
                        <span class="loading">Loading...</span>
                    </div>

                </div>
                :
                <>
                    <div>
                        <button className='buttonStore' onClick={() => { navEditor(); }} data-testid="template">Create Template</button>
                    </div>
                    <div className='row'>
                        {templates && templates.map(template => {
                            console.log(template)
                            return (
                                <div className='col-md-4'>
                                    <figure>
                                        <div class="cardTemplate">
                                            <img src={`data:image/jpeg;base64,${template.thumbnail}`} className="card-img-top" alt="..." />
                                            <figcaption>{template._doc.name}</figcaption>
                                            <div className='image__overlay image__overlay--primary'>
                                                <button type="button" className='btn btn-primary btnTemp' onClick={() => { editTemplate(template._doc._id) }} data-testid="edit"> Edit</button>
                                                <button type="button" className='btn btn-outline-primary btnTemp1' data-testid="view" onClick={() => { editTemplate(template._doc._id) }}> View</button>
                                            </div>
                                        </div>
                                    </figure>
                                </div>
                            )
                        })
                        }
                    </div>
                </>
            }
        </>
    )
}

export default StoreTemplate;