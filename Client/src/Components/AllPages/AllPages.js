import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './allPages.css';
import { useNavigate, useParams } from "react-router-dom";
import Navbar from '../Navbar/Navbar';

function AllPages() {

    const [allPage, setAllPages] = useState(null);
    const [idPage, setId] = useState(null);
    const [del, setdel] = useState('');
    const [load, setLoad] = useState(false);

    const { id } = useParams();
    const deletePage = async (deleteid) => {
        if (window.confirm("Are you sure you want to delete?")) {
            try {
                const response = await axios.delete(`http://localhost:8000/page/deletePage/${deleteid}`, { withCredentials: true })
                setdel(deleteid);
            }
            catch (err) {
                console.log(err);
            }
        }

    }



    useEffect( () => {
        const getData = async () => {
            try {
                setLoad(true);
                const response = await axios.get(`http://localhost:8000/page/allPages/${id}`, { withCredentials: true })
                console.log(response)
                console.log(response.data[0]._id);
                setAllPages(response.data);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setLoad(false);
            }
        }
        getData();
    }, [])





    return (
        <>
            <Navbar />
            {load ?

                <div className='mainBody'>
                    <div class="containerSpinner">
                        <div class="ring"></div>
                        <div class="ring"></div>
                        <div class="ring"></div>
                        <span class="loading">Loading...</span>
                    </div>

                </div>
                :
                <>
                    <div className="container">
                        <div className='row first'>
                            <div className='titlePage'>
                                <h3 data-testid='allpages'>All Pages</h3>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center searchDiv'>
                            <div className="input-group searchbarPage">
                                <input type="text" placeholder="Search" id="search" className="form-control" />
                                <button className='searchButton'>
                                    <span classNae="input-group-text" id="basic-addon1">
                                        <i className="bi bi-search"></i>
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className='headerPage'>
                            <div className='row'>
                                <div className='col-md-2' data-testid="title">
                                    <h6>Title</h6>
                                </div>
                                <div className="col-md-2">
                                    <h6>Date</h6>
                                </div>
                                <div className="col-md-2">
                                    <h6>Domain</h6>
                                </div>
                                <div className="col-md-2">
                                    <h6>Edit</h6>
                                </div>
                                <div className="col-md-2">
                                    <h6>Delete</h6>
                                </div>
                                <div className="col-md-2">
                                    <h6>View</h6>
                                </div>

                            </div>
                        </div>

                        {allPage && allPage.map((page) => {
                            console.log(page);
                            return (
                                <div className='shadow contentPage'>
                                    <div className='row'>
                                        <div className='col-md-2' data-testid="pageName">
                                            <h6>{page.name}</h6>
                                        </div>
                                        <div className="col-md-2" data-testid="pageDate">
                                            <h6>{page.date.slice(0, 10)}</h6>
                                        </div>
                                        <div className="col-md-2" data-testid="pageDomain">
                                            <h6>Primary</h6>
                                        </div>
                                        <div className="col-md-2">
                                            <Link to={`/edit/${page._id}`}><h6><i class="bi bi-pencil-square"></i></h6></Link>
                                        </div>
                                        <div className="col-md-2">
                                            <button className='deleteBut' onClick={() => { deletePage(page._id) }} data-testid='delete'>
                                                <i class="bi bi-trash-fill"></i>
                                            </button>

                                        </div>
                                        <div className="col-md-2">
                                            <Link to={`/edit/${page._id}`}><i class="bi bi-eye-fill"></i></Link>
                                        </div>
                                    </div>
                                </div>)
                        })

                        }
                    </div >
                </>
            }
        </>
    )
}

export default AllPages;