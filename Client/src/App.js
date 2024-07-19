import "./App.css";
import { Routes, Route } from "react-router-dom";
import AllPages from "./Components/allPages/AllPages";
import Home from "./Components/Home/Home";
import Editor from "./Components/Editor/Editor";
import Login from "./Components/Login/SignUpIncomponent";
import Edit from "./Components/Edit/Edit";
import SignUpIncomponent from "./Components/Login/SignUpIncomponent";
import UseTemplate from "./Components/Template/UseTemplates";
import StoreTemplate from "./Components/Template/StoreTemplate";
import UnApprovedTemplates from "./Components/Template/UnApprovedTemplates";
import AllTemplates from './Components/Template/AllTemplate'
function App() {
  return (
    <div className="App" data-testid="app">
      <Routes>
        <Route path="" index element={<Home />}></Route>
        <Route path="home" index element={<Home />}></Route>
        
        <Route path="edit/:id" index element={<Edit />}></Route>
        <Route path="allPages/:id" index element={<AllPages/>}></Route>
        <Route path="login" index element={<SignUpIncomponent/>}></Route>
        <Route path="editor" index element={<Editor />}></Route>
        <Route path="createTemplate" index element={<Editor/>}></Route>
        <Route path="contributeTemplate" index element={<Editor/>}></Route>
        <Route path="unApprovedTemplates" index element={<UnApprovedTemplates/>}></Route>
        <Route path="useTemplate/:id" index element={<UseTemplate/>}></Route>
        <Route path="template/:tags" index element={<StoreTemplate/>}></Route>
        <Route path="editTemplate/:id" index element={<Edit/>}></Route>
        <Route path="allTemplate" index element={<AllTemplates/>}></Route>
        
      </Routes>
    </div>
  );
}

export default App;
