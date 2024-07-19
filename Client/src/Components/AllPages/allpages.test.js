import {fireEvent,render,screen,cleanup,waitFor} from '@testing-library/react';
import  renderer  from 'react-test-renderer';
import { async } from 'q';
import { BrowserRouter as Router } from 'react-router-dom';
import AllPages from './AllPages';

test('should render allPages component',()=>{
    render(
        <Router>
          <AllPages/>
        </Router>
      );

    waitFor(()=> expect(getByTest('allpages')).toBeInTheDocument());
    waitFor(()=>expect(getByTest('allpages')).toHaveTextContent('All Pages'));

})

test('should render page name',()=>{
  render(
      <Router>
        <AllPages/>
      </Router>
    );

  waitFor(()=> expect(getByTest('pageName')).toBeInTheDocument());

})
test('should render page domain',()=>{
  render(
      <Router>
        <AllPages/>
      </Router>
    );

  waitFor(()=>expect(getByTest('pageDomain')).toHaveTextContent('Primary'));

})

test('should render page date',()=>{
  render(
      <Router>
        <AllPages/>
      </Router>
    );

  waitFor(()=>expect(getByTest('pageDate')).toBeInTheDocument());

})

test('should render page date',()=>{
  render(
      <Router>
        <AllPages/>
      </Router>
    );

  const title=waitFor(()=>screen.getByTestId('title'));
  expect(title).toBeTruthy();

})

// test('should render allPages component',async()=>{
//     render(
//         <Router>
//           <AllPages/>
//         </Router>
//       );

//     let component=renderer.create(<AllPages/>).getInstance();
//     component.getData();

//     expect(component.value).toBeTruthy();

// })