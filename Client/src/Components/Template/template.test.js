import {fireEvent,render,screen,cleanup,waitFor, getByTestId} from '@testing-library/react';
import { async } from 'q';
import { BrowserRouter as Router } from 'react-router-dom';
import StoreTemplate from './StoreTemplate';

test('should render store template',async()=>{
    render(
        <Router>
            <StoreTemplate/>
        </Router>
    );
    const template=waitFor(()=>screen.getByTestId('template'));
    expect(template).toBeTruthy();
})

test('should render store template',async()=>{
    render(
        <Router>
            <StoreTemplate/>
        </Router>
    );
    const template=waitFor(()=>screen.getByTestId('edit'));
    expect(template).toBeTruthy();
})

test('should render store template',async()=>{
    render(
        <Router>
            <StoreTemplate/>
        </Router>
    );
    const template=waitFor(()=>screen.getByTestId('view'));
    expect(template).toBeTruthy();
})