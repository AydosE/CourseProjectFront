import { useEffect, useState } from "react";
import API from "../api/axios";

const Test = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("test")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  }, []);

  return <div>{data}</div>;
};

export default Test;
