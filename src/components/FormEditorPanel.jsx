import { useFormStore } from "../store/formStore";
import { Pilcrow, TypeOutline, ListChecks, ChevronDown } from "lucide-react";
import "./FormEditorPanel.css";

const FormEditorPanel = () => {
  const addElement = useFormStore((state) => state.addElement);

  const handleAddElement = (type) => {
    addElement(type);
  };

  return (
    <div className="form-editor-panel">
      <h3>Add Form Elements</h3>

      <div className="element-buttons">
        <button
          className="element-button"
          onClick={() => handleAddElement("text")}
        >
          <TypeOutline strokeWidth={1} />
          <div className="element-label">Text</div>
        </button>

        <button
          className="element-button"
          onClick={() => handleAddElement("textarea")}
        >
          <Pilcrow strokeWidth={1} />
          <div className="element-label">Paragraph</div>
        </button>

        <button
          className="element-button"
          onClick={() => handleAddElement("checkbox")}
        >
          <ListChecks strokeWidth={1} />
          <div className="element-label">Checkbox</div>
        </button>

        <button
          className="element-button"
          onClick={() => handleAddElement("select")}
        >
          <ChevronDown strokeWidth={1} />
          <div className="element-label">Select</div>
        </button>
      </div>
    </div>
  );
};

export default FormEditorPanel;
