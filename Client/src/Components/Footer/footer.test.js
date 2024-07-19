import {fireEvent,render,screen,cleanup,waitFor} from '@testing-library/react';
import  renderer  from 'react-test-renderer';
import { async } from 'q';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './Footer';

test('should render footer component',()=>{
    render(
        <Router>
            <Footer/>
        </Router>
    );
})