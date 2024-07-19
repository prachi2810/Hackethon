import {fireEvent,render,screen,cleanup,waitFor} from '@testing-library/react';
import { async } from 'q';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';

// test('should render Home component',async()=>{
//     render(
//         <Router>
//           <Home/>
//         </Router>
//       );
//     const name=screen.getByTestId('name');
//     expect(name).toBeInTheDocument();
//     expect(name).toHaveTextContent('Create a Website Without Limits');

// })

test('should render Home component part',async()=>{
    render(
        <Router>
          <Home/>
        </Router>
      );
    const name=screen.getByTestId('title');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Unlimited creation');

})

test('should render Home component part',async()=>{
    render(
        <Router>
          <Home/>
        </Router>
      );
    const para=screen.getByTestId('para');
    expect(para).toBeInTheDocument();
    expect(para).toHaveTextContent('Get a headstart on your journey with 900+ free, customizable website templates, strategically researched and tailored for every industry — or start from a blank canvas on our website builder.');

})

test('should render Home component card',async()=>{
    render(
        <Router>
          <Home/>
        </Router>
      );
    const card=screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent('All You Need And More');

})

test('should render Home component card',async()=>{
    render(
        <Router>
          <Home/>
        </Router>
      );
    const element=screen.getByTestId('element');
    expect(element).toBeInTheDocument();
    expect(element).toBeTruthy();

})

test('should render Home component Button',async()=>{
    render(
        <Router>
          <Home/>
        </Router>
      );
    const Button=screen.getByTestId('homeButton');
    expect(Button).toBeInTheDocument();
    expect(Button).toBeTruthy();

})

test('should render Home component Button',async()=>{
    render(
        <Router>
          <Home/>
        </Router>
      );
    const Button=screen.getAllByRole('button');
    expect(Button).toBeTruthy();

})