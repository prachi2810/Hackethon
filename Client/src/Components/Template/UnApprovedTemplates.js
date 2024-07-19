import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './contributeTemplate.css';
import axios from 'axios';


// const getAllTemplates = async () => {
//     const response = await axios.get('http://localhost:8000/templates');
//     console.log(response);

// }


function UnApprovedTemplates() {
    const [templateUnapproved, setTemplateUnapproved] = useState(null);
    // const getAllTemplates = async () => {
    //     const response = await axios.get('http://localhost:8000/templates');
    //     console.log(response);
    //     setTemplate(response.data);
    //     // setId(response.data._doc._id);
    // }
    const approveTemplate=async(id)=>{
          const response=await axios.patch(`http://localhost:8000/templates/approve/${id}`);
          console.log(response);
          unapproved()
    }
    const unapproved=async()=>{
        const response = await axios.get('http://localhost:8000/templates/unApproved');
        console.log(response);
        setTemplateUnapproved(response.data);
    }

    useEffect(() => {
        // getAllTemplates();
        unapproved()
    }, [])
   

    return (
        <>
            <div className='container'>
                <div className='select'>
                    <select className="form-select" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">Approve</option>
                        <option value="2">Reject</option>
                        <option value="3">Pending</option>
                    </select>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Template Name</th>
                            <th scope="col">View</th>
                            <th scope="col">Aprrove</th>
                            <th scope="col">Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {templateUnapproved && templateUnapproved.map((temp) =>
                            <tr>
                                <td>{temp.name}</td>
                                <td><Link to={`/useTemplate/${temp._id}`}><h6><i class="bi bi-pencil-square"></i></h6></Link></td>
                                <td><button className='approveButt' onClick={()=>{approveTemplate(temp._id)}}><i class="bi bi-check2-circle"></i></button></td>
                                <td><i class="bi bi-x-circle"></i></td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
        </>
    )
}

export default UnApprovedTemplates;