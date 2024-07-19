import {fireEvent,render,screen,cleanup,waitFor, getByTestId} from '@testing-library/react';
import { async } from 'q';
import { BrowserRouter as Router } from 'react-router-dom';
import SignUpIncomponent from './SignUpIncomponent';

test('should render password input',async()=>{
    render(
        <Router>
          <SignUpIncomponent/>
        </Router>
      );
    const passwordInput=screen.getByPlaceholderText(/Password/i);
    expect(passwordInput).toBeInTheDocument()

})

test('should render username input',async()=>{
    render(
        <Router>
          <SignUpIncomponent/>
        </Router>
      );
    const usernameInput=screen.getByPlaceholderText(/Username/i);
    expect(usernameInput).toBeInTheDocument()

})
test('username input should be empty',async()=>{
    render(
        <Router>
          <SignUpIncomponent/>
        </Router>
      );
    const usernameInput=screen.getByPlaceholderText(/Username/i);
    expect(usernameInput.value).toBe("")

})
test('password input should be empty',async()=>{
    render(
        <Router>
          <SignUpIncomponent/>
        </Router>
      );
    const usernameInput=screen.getByPlaceholderText(/Username/i);
    expect(usernameInput.value).toBe("")

})
test('username input should change',async()=>{
    render(
        <Router>
          <SignUpIncomponent/>
        </Router>
      );
    const usernameInput=screen.getByPlaceholderText(/Username/i);
    const testValue="test";

    fireEvent.change(usernameInput,{target:{value:testValue}});
    expect(usernameInput.value).toBe(testValue);

})

test('password input should change',async()=>{
    render(
        <Router>
          <SignUpIncomponent/>
        </Router>
      );
    const passwordInput=screen.getByPlaceholderText(/Password/i);
    const testValue="testPassword@123";

    fireEvent.change(passwordInput,{target:{value:testValue}});
    expect(passwordInput.value).toBe(testValue);

})

test('should render button input',()=>{
    render(
        <Router>
          <SignUpIncomponent/>
        </Router>
      );

    waitFor(()=> expect(getByTestId('signinButton')).toBeInTheDocument());

})

test('should render Signin button',()=>{
    render(
        <Router>
          <SignUpIncomponent/>
        </Router>
      );

    const butt=screen.getByTestId('signinButt');
    expect(butt).toHaveTextContent('Sign In')

})

// test('should render Signup button',()=>{
//     render(
//         <Router>
//           <SignUpIncomponent/>
//         </Router>
//       );

//       const buttSignUp=screen.getByTestId('buttonsign');
//       expect(buttSignUp).toBeTruthy();

// })



// describe("<SignUpIncomponent/>",()=>{
//     const user={
//         username:"Test",
//         password:"test@123"
//     }
//     test("render component",()=>{
        
//     })
// })



