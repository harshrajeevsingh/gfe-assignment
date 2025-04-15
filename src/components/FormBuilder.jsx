import { useNavigate } from "react-router";

import FormEditorPanel from "./FormEditorPanel";
import FormCanvas from "./FormCanvas";
import { useFormStore } from "../store/formStore";

import "./FormBuilder.css";

const FormBuilder = () => {
  const navigate = useNavigate();

  const saveForm = useFormStore((state) => state.saveForm);

  const handleSave = () => {
    saveForm();
    alert("Form saved successfully!");
  };

  const handlePreview = () => {
    saveForm();
    navigate(`/preview/demo-form`);
  };

  return (
    <div className="form-builder">
      <div className="form-builder-header">
        <h2>Form Builder</h2>
        <div className="form-builder-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={handlePreview}> Preview Form</button>
        </div>
      </div>

      <div className="form-builder-content">
        <FormEditorPanel />
        <FormCanvas />
      </div>
    </div>
  );
};

export default FormBuilder;
