# GreatFrontEnd Assignment

## Task: Google Forms Clone

The task was to create a basic clone of Google Forms, replicating the functionality shown in the provided demo video.

The core functionality of the app is form creation. Users should be able to build a form using the provided input types, preview it, fill it out, and submit it. Since the scope was limited to basic functionality, there was no requirement for a backend or persistent storage. Once the form is submitted, the user should be redirected to a new screen showing the submitted data in JSON format.

## Tech Stack:

Built using React(with Vite), react-router for routing, Zustand for state-management.

## Approach:

Based on the demo video, I identified the need for three core pages:

- Form Builder
- Form Preview / Fill
- Form Submission Success

Form Builder:

The `FormBuilder` page is composed of three main components:

- Header – contains "Save" and "Preview" buttons
- `FormEditorPanel` – allows users to select and add form input types
- `FormCanvas` – displays and manages the form being created

Preview and Submission:

The preview and success pages do not require any unique components. The `FormPreview` page renders the built form for the user to fill and submit. Upon submission, the user is redirected to the `FormSuccess` page, which displays the submitted data in JSON format.

### Data flow

Given the app’s simplicity and absence of backend interactions, I used Zustand for global state management. The store (`formStore`) manages all form-related data, including:

- `formTitle` and `formDescription` (always present by default)
- `formElements`: a dynamic array of input components selected by the user
- Functions to add, update, delete form elements, and handle submission

This global state is accessed and manipulated across various components as needed.

### Core Feature: Form creation

To handle the core form-building logic, I defined an `addElement` function in the store. This function accepts the type of input selected by the user (via `FormEditorPanel`) and generates a form element with default properties like `id`, `type`, and `label`.

A switch statement is used to assign additional properties depending on the input type. The newly created element is then pushed to the `formElements` array.

These form elements are rendered in the `FormCanvas` using a reusable component called `FormElement`. Each `FormElement` component handles:

- Updating its data
- Removing itself from the form
- Managing dynamic options (for inputs like radio or dropdown)

### Preview & Submission Flow

Once the form is built, the user can preview it via the `FormPreview` page. The form is rendered based on the formElements state. On submission, data is saved using the `saveFormSubmission` function, and the user is redirected to the `FormSuccess` page to see the submitted data in a structured JSON format.

### Challenges:

The most challenging part was building the dynamic `FormElement` component. It needed to support both:

- An editor view (when the element is selected for editing)
- A preview view (when it's not active)

To manage this, I introduced an `activeElementId` in the state, which tracks the currently edited element. Based on this ID, each `FormElement` determines whether to render its editor or its preview version.

### Scope of Improvement

There are a few areas where the app can be improved:

- TypeScript Integration:
  Currently, the app is written in plain JavaScript. I chose not to use TypeScript as I’m not yet fully comfortable with it and wanted to complete the project quickly. However, adding TypeScript would enhance type safety, catch potential bugs early, and improve overall code maintainability.

- Accessibility Enhancements:
  The app currently lacks proper ARIA labels and accessibility attributes. Implementing these would make the form more usable for screen readers and improve the overall accessibility of the application.

## To run the project:

1. Clone this repository
2. Install dependencies:

```
npm install
```

3. Run the development server:

```
npm run dev
```

4. Open your browser and navigate to http://localhost:5173 (or the port shown in your terminal).
