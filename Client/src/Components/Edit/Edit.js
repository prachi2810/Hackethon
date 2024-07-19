import React, { useEffect, useState } from 'react';
import './Edit.css';
import 'grapesjs/dist/css/grapes.min.css';
import axios from 'axios';
import grapesjs from 'grapesjs';
import presetWebpage from 'grapesjs-preset-webpage';
import blocksBasic from 'grapesjs-blocks-basic';
import tooltip from 'grapesjs-tooltip';
import gradientPlugin from 'grapesjs-style-gradient';
import pluginNavbar from "grapesjs-navbar";
import pluginCountdown from "grapesjs-component-countdown";
import tabsPlugin from 'grapesjs-tabs';
import pluginExport from "grapesjs-plugin-export";
import pluginForms from "grapesjs-plugin-forms";
import stylebg from 'grapesjs-style-bg'
import { useNavigate, useParams } from "react-router-dom";
import save from '../../Images/saveicon.png';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useLocation } from 'react-router-dom';

function Edit() {
    const nav = useNavigate()
    const [editor, setEditor] = useState(null);
    const { id } = useParams();
    const [userId, setUserId] = useState(null);
    const [load, setLoad] = useState(false);
    const [userNameNav, setuserNameNav] = useState('');
    const location = useLocation();
    const currentPath = location.pathname;
    let initialIsPathTemplate = false;
    if (currentPath.includes("editTemplate")) {
        initialIsPathTemplate = true;
    }
    const notifySave = () => toast.success("Successfully Edited");

    const updatePage = async () => {
        setLoad(true);
        const newHtml = editor.getHtml();
        const newStyle = editor.getStyle();
        const assets = editor.AssetManager.getAll().map(asset => asset.get('src'));
        let newWebsite;
        const info = {
            html: newHtml,
            css: newStyle,
            assets: assets,
        }
        if (initialIsPathTemplate)
            newWebsite = await axios.patch(`http://localhost:8000/templates/updateTemplate/${id}`, info)
        else {
            newWebsite = await axios.patch(`http://localhost:8000/page/updatePage/${id}`, info)
            console.log(newWebsite)
        }
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

    useEffect(() => {
        const checkLogin = async () => {
            try {
                let webPage = null;
                const result = await axios.get('http://localhost:8000/user/isLoggedIn', { withCredentials: true })
                setUserId(result.data.userId)
                setuserNameNav(result.data.username)
                if (initialIsPathTemplate)
                    webPage = await axios.get(`http://localhost:8000/templates/getTemplate/${id}`, { withCredentials: true })
                else
                    webPage = await axios.get(`http://localhost:8000/page/getPage/${id}`, { withCredentials: true })
                console.log(webPage)
                if (webPage.data && result.data.userId !== webPage.data.userId) {
                    alert('You are not allowed to edit this page')
                    nav('/home')
                }
                const grapes = await grapesjs.init({
                    container: '#editor',
                    fromElement: true,
                    width: 'auto',
                    allowScripts: 1,
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

                grapes.setComponents(webPage.data.html);
                grapes.addStyle(webPage.data.css);
                const assets = webPage.data.assets
                assets.forEach((asset) => {
                    grapes.AssetManager.add(asset);
                });
                setEditor(grapes);
            }
            catch (err) {
                console.log(err)
                nav('/login')
            }
        }
        checkLogin();


    }, [])

    return (
        <>
            {/* {load ?
                <div className='mainBody'>
                    <div className='center'>
                        <div className='ring'></div>
                        <span>Loading...</span>
                    </div>
                </div>
                : */}
                {/* <> */}
                    <div id='navbar' className='sidenav d-flex flex-column overflow-scroll'>
                        <nav className='navbar navbar-light'>
                            <div className='container-fluid'>
                                <span className='navbar-brand mb-0 h3 logo' data-testid='name'>Webify</span>
                            </div>
                        </nav>
                        
                        <div className=''>
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
                    <div className='main-content'>
                        <div id='editor'></div>
                        <button className='savebtn' onClick={()=>{updatePage();notifySave();}} data-testid='updatebutton'>Save<img src={save} width="25" alt="save" /></button>
                        <ToastContainer />
                        <div class="profile">
                            <div className='dropdownEdit'>
                                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-testid="togglebutton">
                                    {/* <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle" /> */}
                                    <span className='avatar'>{userNameNav[0]}</span>
                                </Link>
                                <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                                    <li><Link to={`/allPages/${userId}`}><a class="dropdown-item" href="#">All Pages</a></Link></li>
                                    {/* <li><a class="dropdown-item" href="#">Settings</a></li> */}
                                    <li><Link to="/" class="dropdown-item" data-testid="homebutt">Home</Link></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><a class="dropdown-item" onClick={logout} >Log out</a></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </>
            
       

    )
}
export default Edit;