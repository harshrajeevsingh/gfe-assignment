import { BrowserRouter, Routes, Route } from "react-router";
import FormBuilder from "./components/FormBuilder";
import FormPreview from "./components/FormPreview";
import FormSuccess from "./components/FormSuccess";
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<FormBuilder />} />
          <Route path="/preview/:formId" element={<FormPreview />} />
          <Route path="/success/:formId" element={<FormSuccess />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
