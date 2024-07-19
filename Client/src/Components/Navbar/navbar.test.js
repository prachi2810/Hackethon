import {fireEvent,render,screen,cleanup,waitFor, getByTestId} from '@testing-library/react';
import { async } from 'q';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from './Navbar';


test('should render navbar component',()=>{
        render(
            <Router>
                <Navbar/>
            </Router>
        );

})