import React, { useState, useEffect } from "react";
import axios from "axios";

interface Book {
  id: number;
  author: string;
  title: string;
  url: string;
}
function BookList() {
  const [data, setData] = useState<Book[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result: any = await axios.get("http://localhost:8080/books");
      setData(result.data.data);
    };

    fetchData();
  }, []);

  return (
    <ul>
      {data &&
        data.map((item: Book) => (
          <li key={item.id}>
            <a href={item.url}>
              {item.title} by {item.author}
            </a>
          </li>
        ))}
    </ul>
  );
}

export default BookList;
