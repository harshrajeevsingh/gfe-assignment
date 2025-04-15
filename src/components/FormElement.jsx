import { useFormStore } from "../store/formStore";
import "./FormElement.css";

const FormElement = ({ element }) => {
  const updateElement = useFormStore((state) => state.updateElement);
  const removeElement = useFormStore((state) => state.removeElement);
  const setActiveElement = useFormStore((state) => state.setActiveElement);
  const activeElementId = useFormStore((state) => state.activeElementId);

  const isActive = activeElementId === element.id;

  const handleElementClick = () => {
    setActiveElement(element.id);
  };

  const handleLabelChange = (e) => {
    updateElement(element.id, { label: e.target.value });
  };

  const handleRequiredChange = (e) => {
    updateElement(element.id, { required: e.target.checked });
  };

  const handleDeleteElement = () => {
    removeElement(element.id);
  };

  const handleAddOption = () => {
    if (element.type === "select" || element.type === "checkbox") {
      const newOption = `Option ${element.options.length + 1}`;
      updateElement(element.id, {
        options: [...element.options, newOption],
      });
    }
  };

  const handleOptionChange = (index, value) => {
    if (element.type === "select" || element.type === "checkbox") {
      const newOptions = [...element.options];
      newOptions[index] = value;
      updateElement(element.id, { options: newOptions });
    }
  };

  const handleRemoveOption = (index) => {
    if (element.type === "select" || element.type === "checkbox") {
      const newOptions = element.options.filter((_, i) => i !== index);
      updateElement(element.id, { options: newOptions });
    }
  };

  const renderElementPreview = () => {
    switch (element.type) {
      case "text":
        return (
          <input type="text" placeholder={`Enter ${element.label}`} disabled />
        );
      case "textarea":
        return (
          <textarea placeholder={`Enter ${element.label}`} disabled></textarea>
        );
      case "select":
        return (
          <div className="element-options">
            {element.options.map((option, index) => (
              <span key={index}>{option}</span>
            ))}
          </div>
        );
      case "checkbox":
        return (
          <div className="checkbox-group">
            {element.options.map((option, index) => (
              <div key={index} className="checkbox-option">
                <input type="checkbox" disabled />
                <label>{option}</label>
              </div>
            ))}
          </div>
        );
      default:
        return <div>Unknown element type</div>;
    }
  };

  const renderElementEditor = () => {
    return (
      <div className="element-editor">
        <div className="element-controls">
          <label>
            <input
              type="text"
              value={element.label}
              onChange={handleLabelChange}
            />
          </label>
          <div className="element-editor-controls">
            <label className="required-checkbox">
              <input
                type="checkbox"
                checked={element.required}
                onChange={handleRequiredChange}
              />
              Required
            </label>

            <button className="btn-delete" onClick={handleDeleteElement}>
              Delete
            </button>
          </div>
        </div>

        {(element.type === "select" || element.type === "checkbox") && (
          <div className="options-editor">
            <h4>Options:</h4>
            {element.options.map((option, index) => (
              <div key={index} className="option-row">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
                <button onClick={() => handleRemoveOption(index)}>X</button>
              </div>
            ))}
            <button className="btn-add-option" onClick={handleAddOption}>
              Add Option
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`form-element ${isActive ? "active" : ""}`}
      onClick={handleElementClick}
    >
      <div className="element-preview">
        <div className="element-label">
          {element.label}{" "}
          {element.required && <span className="required-mark">*</span>}
        </div>
        {!isActive && renderElementPreview()}
      </div>
      {isActive && renderElementEditor()}
    </div>
  );
};

export default FormElement;
