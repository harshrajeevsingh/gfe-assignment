import { create } from "zustand";
import { generateId, getDefaultLabelForType } from "../utils";

export const useFormStore = create((set, get) => ({
  formTitle: "Untitled Form",
  formDescription: "Tell us about yourself",
  formElements: [],

  activeElementId: null,

  submissions: [],

  updateFormTitle: (title) => set({ formTitle: title }),

  updateFormDescription: (description) => set({ formDescription: description }),

  addElement: (type) =>
    set((state) => {
      const id = generateId(type);

      let newElement = {
        id,
        type,
        label: getDefaultLabelForType(type),
        required: false,
      };

      switch (type) {
        case "text":
          newElement = {
            ...newElement,
            placeholder: `Enter ${newElement.label}`,
          };
          break;
        case "textarea":
          newElement = {
            ...newElement,
            placeholder: `Enter ${newElement.label}`,
          };
          break;
        case "select":
          newElement = {
            ...newElement,
            options: ["Option 1", "Option 2"],
            placeholder: "Select an option",
          };
          break;
        case "checkbox":
          newElement = { ...newElement, options: ["Option 1", "Option 2"] };
          break;
        default:
          break;
      }

      return {
        formElements: [...state.formElements, newElement],
        activeElementId: id,
      };
    }),

  setActiveElement: (id) => set({ activeElementId: id }),

  clearActiveElement: () => set({ activeElementId: null }),

  updateElement: (id, updates) =>
    set((state) => ({
      formElements: state.formElements.map((element) =>
        element.id === id ? { ...element, ...updates } : element
      ),
    })),

  removeElement: (id) =>
    set((state) => ({
      formElements: state.formElements.filter((element) => element.id !== id),
      activeElementId:
        state.activeElementId === id ? null : state.activeElementId,
    })),

  saveForm: () => {
    console.log("Form saved:", {
      title: get().formTitle,
      description: get().formDescription,
      elements: get().formElements,
    });
  },

  saveFormSubmission: (formData) =>
    set((state) => ({
      submissions: [...state.submissions, formData],
    })),

  clearSubmissions: () => set({ submissions: [] }),
}));
