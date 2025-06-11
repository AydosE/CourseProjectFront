export const templates = [
  {
    id: "template-1",
    title: "Анкета сотрудника",
    description: "Заполните информацию о себе",
    questions: [
      { id: "q1", text: "ФИО", type: "text" },
      { id: "q2", text: "Возраст", type: "number" },
      {
        id: "q3",
        text: "Любимый язык программирования",
        type: "select",
        options: ["JavaScript", "Python", "Go"],
      },
    ],
  },
];
