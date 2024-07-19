import {fireEvent,render,screen,cleanup,waitFor, getByTestId} from '@testing-library/react';
import { async } from 'q';
import { BrowserRouter as Router } from 'react-router-dom';
import Template from './Template';

test('should render template component',()=>{

    render(
        <Router>
            <Template/>
        </Router>
    );
    const name=screen.getByTestId('name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Webify');

})