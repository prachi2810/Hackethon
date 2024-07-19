import React, { useEffect, useState } from 'react';
import '../Edit/Edit.css';
import 'grapesjs/dist/css/grapes.min.css';
import axios from 'axios';
import grapesjs from 'grapesjs';
import presetWebpage from 'grapesjs-preset-webpage';
import blocksBasic from 'grapesjs-blocks-basic';
import tooltip from 'grapesjs-tooltip';
import gradientPlugin from 'grapesjs-style-gradient';
import pluginNavbar from "grapesjs-navbar";
import pluginCountdown from "grapesjs-component-countdown";
import pluginExport from "grapesjs-plugin-export";
import pluginForms from "grapesjs-plugin-forms";
import { TagsInput } from "react-tag-input-component";
import stylebg from 'grapesjs-style-bg';
import { ToastContainer, toast } from 'react-toastify';


import { useNavigate } from "react-router-dom";
import save from '../../Images/saveicon.png';
import { useParams, Link, useLocation } from 'react-router-dom';

import tabsPlugin from 'grapesjs-tabs';

function Editor() {
    const location = useLocation();
    const currentPath = location.pathname;
    const nav = useNavigate()
    const [userId, setUserId] = useState(null);
    const [editor, setEditor] = useState(null);
    const [name, setName] = useState(null);
    const [isPathEditor, setPathEditor] = useState(true);
    const [thumbNail, setThumbnail] = useState(null);
    const [tags, setTags] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [IdSave, SetIdSave] = useState(null);
    const [domain, setDomain] = useState(null);
    const [hasError, setError] = useState(false);
    const [load, setLoad] = useState(false);
    const [userNameNav, setuserNameNav] = useState('');


    const { id } = useParams();
    const notifySave = () => toast.success("Successfully Saved");
    const savePage = async () => {
        setLoad(true);
        const newHtml = editor.getHtml();
        const newStyle = editor.getStyle();
        const html = editor.getHtml();
        const css = editor.getStyle();
        // const thumbnail=editor.AssetManager
        const assets = editor.AssetManager.getAll().map(asset => asset.get('src'));
        const formData = new FormData();
        formData.append('html', html);
        formData.append('css', JSON.stringify(css));
        formData.append('assets', assets);
        formData.append('name', name);
        formData.append('userId', userId);
        formData.append('thumbnail', thumbNail)
        formData.append('tags', tags);

        try {
            if (isPathEditor) {
                if (refresh == false) {
                    let newWebsite = await axios.post('http://localhost:8000/page/savePage', { html, css, name, userId, assets });
                    console.log(newWebsite);
                    SetIdSave(newWebsite.data._id);
                    console.log("saving")
                    setRefresh(true);
                    console.log(refresh);
                }
                else {

                    let newWebsite = await axios.patch(`http://localhost:8000/page/updatePage/${IdSave}`, { html, css, name, assets })
                    console.log(newWebsite)
                    console.log("editing")
                }

            }
            else {
                let status='private';
                let isApproved=false;
                if(currentPath=='/contributeTemplate')
                status='public';
                formData.append('status',status);
                formData.append('isApproved',isApproved);
                let newWebsite = await axios.post('http://localhost:8000/templates/saveTemplate', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                console.log(newWebsite)
            }
        }
        catch (error) {
            console.log(error);

        }
    }




    useEffect(() => {
        if (currentPath !== '/editor')
            setPathEditor(false);

        const checkLogin = async () => {
            try {

                const result = await axios.get('http://localhost:8000/user/isLoggedIn', { withCredentials: true })
                setUserId(result.data.userId)
                setuserNameNav(result.data.username)
                const grapes = await grapesjs.init({
                    container: '#editor',
                    fromElement: true,
                    width: 'auto',
                    dragMode: 'translate',
                    allowScripts:1,
                    // Disable the storage manager for the moment
                    storageManager: false,
                    // Avoid any default panel
                    plugins: [blocksBasic, presetWebpage, tooltip, tabsPlugin, gradientPlugin, stylebg, pluginNavbar,
                        pluginExport, pluginCountdown, pluginForms],
                    pluginsOpts: {
                        [blocksBasic]: {
                            blocksBasicOpts: {
                                blocks: [
                                    "link-block",
                                    "quote",
                                    "text-basic",
                                    "column1",
                                    "column2",
                                    "column3",
                                    "column3-7",
                                    "text",
                                    "link",
                                    "image",
                                    "video",
                                    "map",
                                ],
                                flexGrid: 1
                            },
                        },
                        'grapesjs-blocks-bootstrap4': {
                            blocks: {},
                            blockCategories: {},
                            labels: {},
                            gridDevicesPanel: true,
                            formPredefinedActions: [
                                { name: 'Contact', value: '/contact' },
                                { name: 'landing', value: '/landing' },
                            ]
                        }

                    },
                    styleManager: {
                        appendTo: '#styles-container',
                        sectors: [{
                            name: 'General',
                            properties: [
                                {
                                    extend: 'float',
                                    type: 'radio',
                                    default: 'none',
                                    options: [
                                        { value: 'none', className: 'fa fa-times' },
                                        { value: 'left', className: 'fa fa-align-left' },
                                        { value: 'right', className: 'fa fa-align-right' }
                                    ],
                                },
                                'display',
                                { extend: 'position', type: 'select' },
                                'top',
                                'right',
                                'left',
                                'bottom',
                            ],
                        }, {
                            name: 'Dimension',
                            open: false,
                            properties: [
                                'width',
                                {
                                    id: 'flex-width',
                                    type: 'integer',
                                    name: 'Width',
                                    units: ['px', '%'],
                                    property: 'flex-basis',
                                    toRequire: 1,
                                },
                                'height',
                                'max-width',
                                'min-height',
                                'margin',
                                'padding'
                            ],
                        }, {
                            name: 'Typography',
                            open: false,
                            properties: [
                                'font-family',
                                'font-size',
                                'font-weight',
                                'letter-spacing',
                                'color',
                                'line-height',
                                {
                                    extend: 'text-align',
                                    options: [
                                        { id: 'left', label: 'Left', className: 'fa fa-align-left' },
                                        { id: 'center', label: 'Center', className: 'fa fa-align-center' },
                                        { id: 'right', label: 'Right', className: 'fa fa-align-right' },
                                        { id: 'justify', label: 'Justify', className: 'fa fa-align-justify' }
                                    ],
                                },
                                {
                                    property: 'text-decoration',
                                    type: 'radio',
                                    default: 'none',
                                    options: [
                                        { id: 'none', label: 'None', className: 'fa fa-times' },
                                        { id: 'underline', label: 'underline', className: 'fa fa-underline' },
                                        { id: 'line-through', label: 'Line-through', className: 'fa fa-strikethrough' }
                                    ],
                                },
                                'text-shadow'
                            ],
                        },


                        {
                            name: 'Decorations',
                            open: false,
                            properties: [
                                'opacity',
                                'border-radius',
                                'border',
                                'box-shadow',
                                'background',
                            ],
                        }, {
                            name: 'Extra',
                            open: false,
                            buildProps: [
                                'transition',
                                'perspective',
                                'transform'
                            ],
                        }, {
                            name: 'Flex',
                            open: false,
                            properties: [{
                                name: 'Flex Container',
                                property: 'display',
                                type: 'select',
                                defaults: 'block',
                                list: [
                                    { value: 'block', name: 'Disable' },
                                    { value: 'flex', name: 'Enable' }
                                ],
                            }, {
                                name: 'Flex Parent',
                                property: 'label-parent-flex',
                                type: 'integer',
                            }, {
                                name: 'Direction',
                                property: 'flex-direction',
                                type: 'radio',
                                defaults: 'row',
                                list: [{
                                    value: 'row',
                                    name: 'Row',
                                    className: 'icons-flex icon-dir-row',
                                    title: 'Row',
                                }, {
                                    value: 'row-reverse',
                                    name: 'Row reverse',
                                    className: 'icons-flex icon-dir-row-rev',
                                    title: 'Row reverse',
                                }, {
                                    value: 'column',
                                    name: 'Column',
                                    title: 'Column',
                                    className: 'icons-flex icon-dir-col',
                                }, {
                                    value: 'column-reverse',
                                    name: 'Column reverse',
                                    title: 'Column reverse',
                                    className: 'icons-flex icon-dir-col-rev',
                                }],
                            }, {
                                name: 'Justify',
                                property: 'justify-content',
                                type: 'radio',
                                defaults: 'flex-start',
                                list: [{
                                    value: 'flex-start',
                                    className: 'icons-flex icon-just-start',
                                    title: 'Start',
                                }, {
                                    value: 'flex-end',
                                    title: 'End',
                                    className: 'icons-flex icon-just-end',
                                }, {
                                    value: 'space-between',
                                    title: 'Space between',
                                    className: 'icons-flex icon-just-sp-bet',
                                }, {
                                    value: 'space-around',
                                    title: 'Space around',
                                    className: 'icons-flex icon-just-sp-ar',
                                }, {
                                    value: 'center',
                                    title: 'Center',
                                    className: 'icons-flex icon-just-sp-cent',
                                }],
                            }, {
                                name: 'Align',
                                property: 'align-items',
                                type: 'radio',
                                defaults: 'center',
                                list: [{
                                    value: 'flex-start',
                                    title: 'Start',
                                    className: 'icons-flex icon-al-start',
                                }, {
                                    value: 'flex-end',
                                    title: 'End',
                                    className: 'icons-flex icon-al-end',
                                }, {
                                    value: 'stretch',
                                    title: 'Stretch',
                                    className: 'icons-flex icon-al-str',
                                }, {
                                    value: 'center',
                                    title: 'Center',
                                    className: 'icons-flex icon-al-center',
                                }],
                            }, {
                                name: 'Flex Children',
                                property: 'label-parent-flex',
                                type: 'integer',
                            }, {
                                name: 'Order',
                                property: 'order',
                                type: 'integer',
                                defaults: 0,
                                min: 0
                            }, {
                                name: 'Flex',
                                property: 'flex',
                                type: 'composite',
                                properties: [{
                                    name: 'Grow',
                                    property: 'flex-grow',
                                    type: 'integer',
                                    defaults: 0,
                                    min: 0
                                }, {
                                    name: 'Shrink',
                                    property: 'flex-shrink',
                                    type: 'integer',
                                    defaults: 0,
                                    min: 0
                                }, {
                                    name: 'Basis',
                                    property: 'flex-basis',
                                    type: 'integer',
                                    units: ['px', '%', ''],
                                    unit: '',
                                    defaults: 'auto',
                                }],
                            }, {
                                name: 'Align',
                                property: 'align-self',
                                type: 'radio',
                                defaults: 'auto',
                                list: [{
                                    value: 'auto',
                                    name: 'Auto',
                                }, {
                                    value: 'flex-start',
                                    title: 'Start',
                                    className: 'icons-flex icon-al-start',
                                }, {
                                    value: 'flex-end',
                                    title: 'End',
                                    className: 'icons-flex icon-al-end',
                                }, {
                                    value: 'stretch',
                                    title: 'Stretch',
                                    className: 'icons-flex icon-al-str',
                                }, {
                                    value: 'center',
                                    title: 'Center',
                                    className: 'icons-flex icon-al-center',
                                }],
                            }]
                        }
                        ],
                    },
                    blockManager: {
                        appendTo: "#blocks",
                    },
                    layerManager: {
                        appendTo: "#layers-container",
                    },
                    selectorManager: {
                        appendTo: "#styles-container",
                    },
                    traitManager: {
                        appendTo: "#trait-container"
                    },

                    panels: {
                        defaults: {}
                    }
                })
                grapes.on('load', () => {
                    grapes.setComponents({});
                });
                grapes.on("component:selected", function (args) { args[1].set("resizable", true); });


                setEditor(grapes);
            }
            catch (err) {
                console.log(err)
                // nav('/login')
            }
        }
        checkLogin();
    }, [])

    const saveTags = (newTags) => {
        setTags(newTags)
    }
    const logout = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user/logout', { withCredentials: true });
            if (window.location.pathname !== '/')
                nav('/')
            else {
                window.location.reload();
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            {/* {load ?

                <div className='mainBody'>
                    <div class="containerSpinner">
                        <div class="ring"></div>
                        <div class="ring"></div>
                        <div class="ring"></div>
                        <span class="loading">Loading...</span>
                    </div>

                </div>
                :
                <> */}
                    <div className='sidenav'>
                        <nav className='navbar navbar-light'>
                            <div className='container-fluid'>
                                <div className='navbar-brand mb-0 h3 logo' data-testid='name'>Webify</div>
                            </div>
                        </nav>
                        <div className='tabs'>
                            <ul className='nav nav-tabs' id='myTab' role='tablist'>
                                <li className='nav-item' role='presentation'>
                                    <button
                                        className='nav-link active'
                                        id='block-tab'
                                        data-bs-toggle='tab'
                                        data-bs-target='#block'
                                        type='button'
                                        role='tab'
                                        aria-controls='block'
                                        aria-selected='true'
                                    >
                                        <i className='bi bi-grid-fill'></i>
                                    </button>
                                </li>
                                <li className='nav-item' role='presentation'>
                                    <button
                                        className='nav-link'
                                        id='layer-tab'
                                        data-bs-toggle='tab'
                                        data-bs-target='#layer'
                                        type='button'
                                        role='tab'
                                        aria-controls='layer'
                                        aria-selected='false'
                                    >
                                        <i className='bi bi-layers-fill'></i>
                                    </button>
                                </li>
                                <li className='nav-item' role='presentation'>
                                    <button
                                        className='nav-link'
                                        id='style-tab'
                                        data-bs-toggle='tab'
                                        data-bs-target='#style'
                                        type='button'
                                        role='tab'
                                        aria-controls='style'
                                        aria-selected='false'
                                    >
                                        <i class="bi bi-palette-fill"></i>
                                    </button>
                                </li>
                                <li className='nav-item' role='presentation'>
                                    <button
                                        className='nav-link'
                                        id='trait-tab'
                                        data-bs-toggle='tab'
                                        data-bs-target='#trait'
                                        type='button'
                                        role='tab'
                                        aria-controls='trait'
                                        aria-selected='false'
                                    >
                                        <i class="bi bi-gear-fill"></i>
                                    </button>
                                </li>
                            </ul>
                            <div className='tab-content'>
                                <div
                                    className='tab-pane fade show active'
                                    id='block'
                                    role='tabpanel'
                                    aria-labelledby='block-tab'
                                >
                                    <div id="blocks"></div>
                                </div>
                                <div
                                    className='tab-pane fade'
                                    id='layer'
                                    role='tabpanel'
                                    aria-labelledby='layer-tab'
                                >
                                    <div id="layers-container"></div>
                                </div>
                                <div
                                    className='tab-pane fade'
                                    id='style'
                                    role='tabpanel'
                                    aria-labelledby='style-tab'
                                >
                                    <div id="styles-container"></div>
                                </div>
                                <div
                                    className='tab-pane fade'
                                    id='trait'
                                    role='tabpanel'
                                    aria-labelledby='trait-tab'
                                >
                                    <div id="trait-container"></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <h1 className='infoText'>Mobile View is not Available</h1>

                    <div className='main-content'>
                        <div id='editor'></div>
                        <button className='savebtn' data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" data-testid='clickbutton'>Save<img src={save} width="25" alt="save" /></button>
                        <ToastContainer />
                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Add Page</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <div className="mb-3">
                                                <label for="recipient-name" className="col-form-label">Title:</label>
                                                <input type="text" className="form-control" id="recipient-name" onChange={(e) => setName(e.target.value)} placeholder="Title" required />
                                                {/* <label for="recipient-name" class="col-form-label">Domain:</label>
                                        <input type="text" class="form-control" id="recipient-name" onChange={(e) => setDomain(e.target.value)} required/> */}
                                                {!isPathEditor &&
                                                    <><label for="tags" className="col-form-label">Tags:</label>
                                                        <TagsInput id='tags' name="tags" placeHolder="Add Tags" onChange={saveTags} required />
                                                        <em>press enter to add new tag</em><br></br>
                                                        <label for="recipient-name" className="col-form-label">Add Thumbnail</label><br></br>
                                                        <input type="file" onChange={(e) => { console.log(e.target.files[0]); setThumbnail(e.target.files[0]) }} placeholder="Add Picture"></input></>}

                                            </div>

                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" data-testid="close">Close</button>
                                        <button type="button" className="btn btn-primary" onClick={() => { savePage(); notifySave() }} disabled={name == null || tags == null} data-bs-dismiss="modal" data-testid="saveButt">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profile">
                            <div className='dropdownEdit'>
                                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-testid='togglebutton'>
                                    {/* <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle" /> */}
                                    <span className='avatar'>{userNameNav[0]}</span>
                                </Link>
                                <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                                    <li><Link to={`/allPages/${userId}`}><a className="dropdown-item" href="#" data-testid="allpagesbutt">All Pages</a></Link></li>
                                    {/* <li><a class="dropdown-item" href="#">Settings</a></li> */}
                                    <li><Link to="/" className="dropdown-item" data-testid="homebutt">Home</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" onClick={logout} >Log out</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
        //     }
        // </>
    )
}

export default Editor;
