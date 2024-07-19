import {fireEvent,render,screen,cleanup,waitFor,renderHook,renderer} from '@testing-library/react';
import { async } from 'q';
import { BrowserRouter as Router } from 'react-router-dom';
import Editor from './Editor';


test('should render editor component',async()=>{
    render(
        <Router>
          <Editor/>
        </Router>
      );
    const name=screen.getByTestId('name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Webify');

})

test('should render button input',()=>{
    render(
        <Router>
          <Editor/>
        </Router>
      );

    waitFor(()=> expect(getByTestId('saveButton')).toBeInTheDocument());

})

test('should render Title input',async()=>{
    render(
        <Router>
          <Editor/>
        </Router>
      );
    const TitleInput=screen.getByPlaceholderText(/Title/i);
    expect(TitleInput).toBeInTheDocument()

})

test('should render Tags input',async()=>{
    render(
        <Router>
          <Editor/>
        </Router>
      );
    const tagsInput=screen.getByPlaceholderText(/Add Tags/i);
    expect(tagsInput).toBeInTheDocument()

})

test('should render Thumbnail input',async()=>{
    render(
        <Router>
          <Editor/>
        </Router>
      );
    const thumbnailInput=screen.getByPlaceholderText(/Add Picture/i);
    expect(thumbnailInput).toBeInTheDocument()

})

test('should render toggle button',async()=>{
    render(
        <Router>
          <Editor/>
        </Router>
      );
    const toggle=screen.getByTestId('togglebutton');
    expect(toggle).toBeTruthy();

})

test('should render home button',async()=>{
    render(
        <Router>
          <Editor/>
        </Router>
      );
    const homebutt=screen.getByTestId('homebutt');
    expect(homebutt).toBeTruthy();

})

test('should render all pages button',async()=>{
    render(
        <Router>
          <Editor/>
        </Router>
      );
    const allpagesbutt=screen.getByTestId('allpagesbutt');
    expect(allpagesbutt).toBeTruthy();

})

test('should render close button',async()=>{
    render(
        <Router>
          <Editor/>
        </Router>
      );
    const closebutt=screen.getByTestId('close');
    expect(closebutt).toBeTruthy();

})

test('button should be disable when input is not exists',async()=>{
    render(
        <Router>
          <Editor/>
        </Router>
      );
    const buttonSave=screen.getByTestId('saveButt');
    const TitleInput=screen.getByPlaceholderText(/Title/i);
    fireEvent.change(TitleInput,{target:{value:''}});

    expect(buttonSave).toBeDisabled();

})

test('button should not be disable when input exists',async()=>{
    render(
        <Router>
          <Editor/>
        </Router>
      );
      const buttonSave=screen.getByTestId('saveButt');
    const TitleInput=screen.getByPlaceholderText(/Title/i);
    const testValue="test";
    fireEvent.change(TitleInput,{target:{value:testValue}});

    expect(buttonSave).not.toBeDisabled();

})



// test('should change state',async()=>{
    
//     const component=renderer.create(<Router>
//         <Editor/>
//       </Router>).getInstance();
//       let tree=component.savePage();
//     expect(tree).toBeTruthy();

// })

// test("Click", async() => {
//     render(
//     <Router>
//         <Editor/>
//       </Router>);

//     const button = waitFor(()=>getByTestId('clickbutton'));
//     fireEvent.click(button);
// });

// test('should call function on button click',()=>{
//     const handleButton=jest.fn();
//     const data={
//         Title:"TestPage"
//     }
//     const { queryByText }=render(
//         <Editor handleButton={handleButton}/>
//     )
//     const button=queryByText('Save');
//     fireEvent.click(button);

//     expect(handleButton).toHaveBeenCalledTimes;
// })

// test('should be able to click on button',async()=>{
//     render(
//         <Router>
//           <Editor>
//             Name
//             </Editor>
//         </Router>
//       );
//     const button=screen.getByTestId('togglebutton');
//     // const button1=screen.getByRole('button');

//     expect(screen.queryByText('Name')).toBeNull()
//     fireEvent.click(button)
    
//     expect(screen.queryByText('Name')).toBeInTheDocument()
//     fireEvent.click(button)

//     expect(screen.queryByText('Name')).toBeNull()

    

// })