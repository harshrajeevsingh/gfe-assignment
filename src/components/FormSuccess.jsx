import { useNavigate, useParams } from "react-router";
import { useFormStore } from "../store/formStore";
import "./FormSuccess.css";

const FormSuccess = () => {
  const { formId } = useParams();
  const navigate = useNavigate();

  const submissions = useFormStore((state) => state.submissions);
  const lastSubmission = submissions[submissions.length - 1] || {};
  const clearSubmissions = useFormStore((state) => state.clearSubmissions);

  const handleBackToEditor = () => {
    clearSubmissions();
    navigate("/");
  };

  const handleBackToForm = () => {
    navigate(`/preview/${formId}`);
  };

  return (
    <div className="form-success-container">
      <div className="form-success-box">
        <h1 className="form-success-title">Form submitted successfully! ✅</h1>
        <p className="form-success-subtext">Thank you for your submission.</p>

        <div className="submission-data">
          <pre>{JSON.stringify(lastSubmission, null, 2)}</pre>
        </div>

        <div className="success-actions">
          <button className="btn-secondary" onClick={handleBackToEditor}>
            Back to editor
          </button>
          <button className="btn-primary" onClick={handleBackToForm}>
            Back to form
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormSuccess;
