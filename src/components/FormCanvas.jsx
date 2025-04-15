import FormElement from './FormElement';
import { useFormStore } from '../store/formStore';
import './FormCanvas.css';

const FormCanvas = () => {
const formElements =  useFormStore(state => state.formElements);
const formTitle = useFormStore(state => state.formTitle);
const formDescription = useFormStore(state => state.formDescription);
const updateFormTitle = useFormStore(state => state.updateFormTitle);
const updateFormDescription = useFormStore(state => state.updateFormDescription);

  const handleTitleChange = (e) => {
    updateFormTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    updateFormDescription(e.target.value);
  };

  return (
    <div className="form-canvas">
      <div className="form-header">
        <input
          type="text"
          className="form-title-input"
          value={formTitle}
          onChange={handleTitleChange}
          placeholder="Form Title"
        />
        <textarea
          className="form-description-input"
          value={formDescription}
          onChange={handleDescriptionChange}
          placeholder="Form Description"
        />
      </div>
      
      <div className="form-elements">
        {formElements.map((element) => (
          <FormElement 
            key={element.id} 
            element={element} 
          />
        ))}
      </div>
      
      {formElements.length === 0 && (
        <div className="empty-form-placeholder">
          Add form elements from the panel on the left
        </div>
      )}
    </div>
  );
};

export default FormCanvas;