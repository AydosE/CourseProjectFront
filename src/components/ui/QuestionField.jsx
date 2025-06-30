export default function QuestionField({ question, onChange }) {
  const { id, type, text, options = [] } = question;

  const handle = (e) => onChange(id, e.target.value);

  return (
    <div>
      <label className="block font-medium text-gray-700 mb-1">{text}</label>

      {type === "text" || type === "number" ? (
        <input
          type={type}
          onChange={handle}
          className="block w-full border-gray-300 rounded-lg shadow-sm p-2 focus:ring focus:ring-blue-300"
        />
      ) : type === "select" ? (
        <select
          onChange={handle}
          className="block w-full border-gray-300 rounded-lg shadow-sm p-2"
        >
          <option value="">Выберите вариант</option>
          {options.map((opt, i) => (
            <option key={i} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <p className="text-red-500">Неизвестный тип вопроса: {type}</p>
      )}
    </div>
  );
}
