import {fireEvent,render,screen,cleanup,waitFor, getByTestId} from '@testing-library/react';
import { async } from 'q';
import { BrowserRouter as Router } from 'react-router-dom';
import UseTemplate from './UseTemplates';

test('should render template component',()=>{

    render(
        <Router>
            <UseTemplate/>
        </Router>
    );
    const name=screen.getByTestId('name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Webify');

})

test('should render template button',()=>{

    render(
        <Router>
            <UseTemplate/>
        </Router>
    );
    const role=screen.getByRole('button');
    expect(role).toBeTruthy();

})
