export const getDefaultLabelForType = (type) => {
  switch (type) {
    case "text":
      return "Your name";
    case "textarea":
      return "Describe yourself";
    case "select":
      return "Select";
    case "checkbox":
      return "Choose";
    default:
      return "New Question";
  }
};

export const generateId = (type) => {
  const timestamp = Date.now();
  return `${type}-${timestamp}`;
};
