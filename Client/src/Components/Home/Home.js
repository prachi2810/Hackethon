import React, { useEffect, useState } from 'react';
import img from '../../Images/LandingPage1.png';
import './Home.css';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import crousalImg from '../../Images/CrousalImg.jpg';
import crousalImg1 from '../../Images/CrousalImg1.jpg';
import store from '../../Images/store.jpg';
import blog from '../../Images/blog.jpg';
import Technology from '../../Images/Technology.jpg';
import restaurant from '../../Images/food.jpg';
import fashion from '../../Images/fashion.jpg';
import fashion1 from '../../Images/fashion1.jpg';
import food1 from '../../Images/food1.jpg';
import icon1 from '../../Images/Icon1.png';
import icon2 from '../../Images/Icon2.png';
import icon3 from '../../Images/Icon3.png';
import icon4 from '../../Images/Icon4.png';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useParams, useLocation } from 'react-router-dom';

function Home() {
    const nav = useNavigate()
    const checkLogin = async () => {
        try {
            const result = await axios.get('http://localhost:8000/user/isLoggedIn', { withCredentials: true })
            nav('/editor')
        }
        catch (err) {
            nav('/login')
        }
    }


    const navFunStore = () => {
        nav('/template/store');
    }
    const navFunFashion = () => {
        nav('/template/fashion');
    }
    const navFunTech = () => {
        nav('/template/technology');
    }
    const navFunFood = () => {
        nav('/template/restaurant');
    }
    const navFunBlog = () => {
        nav('/template/blog');
    }
    return (
        <>
            <Navbar />
            <div className='row sideImage mt-5 '>
                <div className="col-md-5 d-flex sideDiv">
                    <h1 className='mb-4 mt-4 title' data-testid='name'>Create a Website Without Limits</h1>
                    <p className='subtitle'>Create a Website with our webify website builder. No coding experience required</p>
                    <button className='btnVal' onClick={checkLogin} data-testid="homeButton">Get Started</button>
                </div>
                <div className="col-md-5 d-flex align-items-center">
                    <img src={img} alt="image" width="800" className='imageClass' />
                </div>
            </div>
            <div className='container'>
                <div className='headingHome'>
                    <h1>One platform,<br />infinite possibilities</h1>
                </div>

                <div className='row d-flex justify-content-center threeStyle'>
                    <div className='col-md-3 top-line'>
                        <h4 className='mt-3 threeCol' data-testid='title'>
                            Unlimited creation
                        </h4>
                        <p className='mt-3'>
                            Create a website with a complete suite of advanced functionalities and bring your vision to life.
                        </p>
                    </div>
                    <div className='col-md-3 top-line'>
                        <h4 className='mt-4 threeCol'>
                            Powerful infrastructure
                        </h4>
                        <p className='mt-md-3'>
                            Get an enterprise-grade foundation, engineered for your limitless scalability and peace of mind.
                        </p>
                    </div>
                    <div className='col-md-3 top-line'>
                        <h4 className='mt-4 threeCol'>
                            The place for growth
                        </h4>
                        <p className='mt-3'>
                            Convert and scale seamlessly with built-in marketing and business solutions.
                        </p>
                    </div>
                </div>
                <div className='btnVal3-div'>
                    <button className='btnVal3' onClick={checkLogin}>Get Started</button>
                </div>
            </div>
            <div className='template text-center'>
                <div className='d-flex justify-content-center' id="templates">
                    <h1>Website templates that set <br />you up for success</h1>
                </div>
                <div className='d-flex justify-content-center'>
                    <h6 className='subheading' data-testid="para">Get a headstart on your journey with 900+ free, customizable website templates, strategically
                        researched and tailored for every industry — or start from a blank canvas on our website builder.</h6>
                </div>
                <div className='d-flex justify-content-center'>
                    <button className='btnVal1' onClick={checkLogin}>Get Started</button>
                </div>
                <div className='crousal'>
                    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="5" aria-label="Slide 6"></button>
                        </div>
                        <div class="carousel-inner">
                            <div className="carousel-item active" data-bs-interval="10000">
                                <img src={store} class="crousalImg" onClick={() => { navFunStore() }} alt="..." />
                                <div className='tagClass'>
                                    <span class="pricetag-right " id="swc">Store</span>
                                </div>
                            </div>
                            <div class="carousel-item" data-bs-interval="10000">
                                <img src={Technology} onClick={() => { navFunTech() }} class="crousalImg" alt="..." />
                                <div className='tagClass'>
                                    <span class="pricetag-right " id="swc">Technology</span>
                                </div>
                            </div>
                            <div class="carousel-item" data-bs-interval="20000">
                                <img src={blog} onClick={() => { navFunBlog() }} class="crousalImg" alt="..." />
                                <div className='tagClass'>
                                    <span class="pricetag-right " id="swc">Blog</span>
                                </div>
                            </div>
                            <div class="carousel-item" data-bs-interval="20000">
                                <img src={fashion1} onClick={() => { navFunFashion() }} class="crousalImg" alt="..." />
                                <div className='tagClass'>
                                    <span class="pricetag-right " id="swc">Fashion</span>
                                </div>
                            </div>
                            <div class="carousel-item" data-bs-interval="20000">
                                <img src={food1} onClick={() => { navFunFood() }} class="crousalImg" alt="..." />
                                <div className='tagClass'>
                                    <span class="pricetag-right " id="swc">Restaurant</span>
                                </div>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className='d-flex extraClass'>
                <div className='container d-flex justify-content-center flex-column'>
                    <h1 className='mt-5 mb-5' data-testid="card">All You Need And More</h1>
                    <div className="row cardRow">
                        <div className="col-md-3 mt-5 cardClass">
                            <div class="card behindcard">
                                <div class="card-body">
                                    <img src={icon1} width="60" alt="icon" />
                                </div>
                            </div>
                            <div class="card shadow overlapcard">
                                <div class="card-body">
                                    <h5 class="card-title text-center">10,000+ of Website & Block Templates</h5>
                                    <p class="card-text text-center mt-4">Select from a huge variety of designer-made templates.</p>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mt-5">
                            <div class="card behindcard1">
                                <div class="card-body">
                                    <img src={icon2} width="50" alt="icon" />
                                </div>
                            </div>
                            <div class="card shadow overlapcard1">
                                <div class="card-body">
                                    <h5 class="card-title text-center">Easy Drag-n-Drop</h5>
                                    <p class="card-text text-center mt-4">Customize anything on your website with simple dragging.</p>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mt-5">
                            <div class="card behindcard2">
                                <div class="card-body">
                                    <img src={icon3} width="60" alt="icon" />
                                </div>
                            </div>
                            <div class="card shadow overlapcard">
                                <div class="card-body">
                                    <h5 class="card-title text-center">No Coding</h5>
                                    <p class="card-text text-center mt-4">Visually add, edit, move, and modify with no coding!</p>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mt-5">
                            <div class="card behindcard3">
                                <div class="card-body">
                                    <img src={icon4} width="50" alt="icon" />
                                </div>
                            </div>
                            <div class="card shadow overlapcard1">
                                <div class="card-body">
                                    <h5 class="card-title text-center">Mobile-Friendly</h5>
                                    <p class="card-text text-center mt-4">Build websites that look great on all modern devices.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='dropdownacc'>
                    <div className='container'>
                        <div className='row mb-5 pb-5'>
                            <div className='col-md-6'>
                                <h1 className='dropdownheading mt-5 mb-5' data-testid="element">Build your own website in a few steps</h1>
                                <h6 className='dropdownheading'>Start your business website today, no credit card required.</h6>
                                <button className='btnVal2' onClick={checkLogin}>Get Started</button>
                            </div>
                            <div className='col-md-6 mt-5 d-flex justify-content-center'>
                                <div class="accordion accordion-flush" id="accordionFlushExample">
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="flush-headingOne">
                                            <button class="accordion-button collapsed text-light accordionClass" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                1. Plan your business
                                            </button>
                                        </h2>
                                        <div id="flush-collapseOne" class="accordionClass accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                            <div class="accordion-body">Narrow down your niche or area of interest for your website.
                                                Browse through the Domain Name Generator to help you find an available domain name you love.
                                                Check out the various tools, themes,
                                                and resources Shopify offers to help excite you about your entrepreneurial journey.</div>
                                        </div>
                                    </div>
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="flush-headingTwo">
                                            <button class="accordion-button collapsed text-light accordionClass" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                                2. Pick your platform
                                            </button>
                                        </h2>
                                        <div id="flush-collapseTwo" class="accordion-collapse collapse accordionClass" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                            <div class="accordion-body">Webify is a website builder for commerce.
                                                Build an online or offline store using Shopify’s easy drag-and-drop no code website builder.
                                                Shopify offers reliable website hosting,
                                                domain name registration, countless tools, apps, stock photos, help resources, and so much more.</div>
                                        </div>
                                    </div>
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="flush-headingThree">
                                            <button class="accordion-button collapsed text-light accordionClass" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                                3. Customize your website
                                            </button>
                                        </h2>
                                        <div id="flush-collapseThree" class="accordion-collapse collapse accordionClass" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                            <div class="accordion-body">Make your own website, your way.
                                                Customize images, copy, themes, layouts, apps, and more. Add your own unique products to your website and create enticing descriptions for them. You can brand your website in so many ways using Shopify’s website builder.
                                                You don’t need coding skills to create a website that stands out online and offline.</div>
                                        </div>
                                    </div>
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="flush-headingFour">
                                            <button class="accordion-button collapsed text-light accordionClass" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                                                4. Launch your store
                                            </button>
                                        </h2>
                                        <div id="flush-collapseFour" class="accordion-collapse collapse accordionClass" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                                            <div class="accordion-body">Now that your website is ready to go, you can launch your website publicly.
                                                You can market your website and products by promoting on various social media channels, optimize your store for search engines with SEO, and other popular marketing strategies.
                                                Easily extend your capabilities by installing apps, sales channels.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <Footer />
        </>
    )
}

export default Home;