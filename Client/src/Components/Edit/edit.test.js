import {fireEvent,render,screen,cleanup,waitFor} from '@testing-library/react';
import { async } from 'q';
import { BrowserRouter as Router } from 'react-router-dom';
import Edit from './Edit';

test('should render editor component',async()=>{
    render(
        <Router>
          <Edit/>
        </Router>
      );
    const name=screen.getByTestId('name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Webify');

})

test('should render button input',()=>{
  render(
      <Router>
        <Edit/>
      </Router>
    );

  waitFor(()=> expect(getByTestId('updatebutton')).toBeInTheDocument());

})

test('should render toggle button',async()=>{
  render(
      <Router>
        <Edit/>
      </Router>
    );
  const toggle=screen.getByTestId('togglebutton');
  expect(toggle).toBeTruthy();

})

test('should render home button',async()=>{
  render(
      <Router>
        <Edit/>
      </Router>
    );
  const homebutt=screen.getByTestId('homebutt');
  expect(homebutt).toBeTruthy();

})

// test('should be able to click on button',()=>{
    
//       const handleButton=jest.fn();
//       const 
// })