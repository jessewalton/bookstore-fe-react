import React, { useState, useEffect } from "react";
import axios from "axios";

interface Book {
  id: number;
  author: string;
  title: string;
  url: string;
}

interface BookListProps {
  updateBooks?: Book,
  toggle?: boolean,
}
function BookList(props: BookListProps) {
  const [data, setData] = useState<Book[]>([]);


  const fetchData = async () => {
    const result: any = await axios.get("http://localhost:8080/books");
    setData(result.data.data);
  };

  // fetch data on initial mount
  useEffect(() => {
    fetchData();
  }, []);

  // fetch data on toggle
  useEffect(()=>{
    fetchData();
  }, [props.toggle])

  // setup for adding book directly to data, instead of 
  // forcing an entire reload
  //
  // useEffect(() => {
  //   let newData: Book = {
  //     id: 99,
  //     author: "e",
  //     title: "e",
  //     url: "as",
  //   };
    
  //   var oldData: Book[] = data;
  //   oldData.push(newData);
  //   setData(oldData);
  // }, []);

  return (
    <ul>
      {data &&
        data.map((item: Book) => (
          <li key={item.id}>
            {item.url && <a href={item.url}>
              {item.title} by {item.author}
            </a>}
            {!item.url && <>
              {item.title} by {item.author}
              </>
            }
          </li>
        ))}
    </ul>
  );
}

export default BookList;
