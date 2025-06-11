import React from "react";

const FormPreview = ({ template }) => (
  <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
    <h2 className="text-xl font-bold mb-2">{template.title}</h2>
    <p className="text-gray-500 mb-4">{template.description}</p>

    {template.questions.map((q) => (
      <div key={q.id} className="mb-4">
        <label className="block font-medium text-gray-700">{q.text}</label>
        {q.type === "text" || q.type === "number" ? (
          <input
            type={q.type}
            className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm p-2 focus:ring focus:ring-blue-300"
          />
        ) : (
          <select className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm p-2">
            {q.options.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        )}
      </div>
    ))}
  </div>
);

export default FormPreview;
