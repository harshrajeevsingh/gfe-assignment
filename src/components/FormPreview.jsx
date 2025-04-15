import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useFormStore } from "../store/formStore";
import "./FormPreview.css";

const FormPreview = () => {
  const { formId } = useParams();
  const navigate = useNavigate();

  const formElements = useFormStore((state) => state.formElements);
  const formTitle = useFormStore((state) => state.formTitle);
  const formDescription = useFormStore((state) => state.formDescription);
  const saveFormSubmission = useFormStore((state) => state.saveFormSubmission);

  const [formValues, setFormValues] = useState({});

  const handleInputChange = (elementId, value) => {
    setFormValues({
      ...formValues,
      [elementId]: value,
    });
  };

  const handleCheckboxChange = (elementId, option, checked) => {
    const currentValues = formValues[elementId] || [];
    let newValues;

    if (checked) {
      newValues = [...currentValues, option];
    } else {
      newValues = currentValues.filter((value) => value !== option);
    }

    setFormValues({
      ...formValues,
      [elementId]: newValues,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValues && Object.keys(formValues).length !== 0) {
      saveFormSubmission(formValues);
      navigate(`/success/${formId}`);
    } else {
      alert("Form is empty");
    }
  };

  const handleBackToEditor = () => {
    navigate("/");
  };

  return (
    <div className="form-preview-container">
      <div className="form-card">
        <h1 className="form-title">{formTitle}</h1>
        <p className="form-description">{formDescription}</p>
        <form onSubmit={handleSubmit} className="form-elements">
          {formElements.map((element) => (
            <div className="form-element" key={element.id}>
              <label className="form-label">{element.label}</label>
              {element.type === "text" && (
                <input
                  className="form-input"
                  type="text"
                  placeholder={element.placeholder}
                  required={element.required}
                  onChange={(e) =>
                    handleInputChange(element.id, e.target.value)
                  }
                />
              )}
              {element.type === "textarea" && (
                <textarea
                  className="form-textarea"
                  placeholder={element.placeholder}
                  required={element.required}
                  onChange={(e) =>
                    handleInputChange(element.id, e.target.value)
                  }
                />
              )}
              {element.type === "checkbox" &&
                element.options.map((option, index) => (
                  <label key={index} className="form-option">
                    <input
                      type="checkbox"
                      required={element.required}
                      onChange={(e) =>
                        handleCheckboxChange(
                          element.id,
                          option,
                          e.target.checked
                        )
                      }
                    />
                    {option}
                  </label>
                ))}
              {element.type === "select" &&
                element.options.map((option, index) => (
                  <label key={index} className="form-option">
                    <input
                      type="radio"
                      required={element.required}
                      name={element.id}
                      onChange={() => handleInputChange(element.id, option)}
                    />
                    {option}
                  </label>
                ))}
            </div>
          ))}
          <button type="submit" className="submit-button">
            Submit
          </button>
          <button
            type="button"
            className="back-button"
            onClick={handleBackToEditor}
          >
            Back to Editor
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormPreview;
