import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface dataTypes {
  objectID: number,
  url: string,
  title: string,
}

interface SearchProps {
  path: string,
  query: string,
}

function HackerNewsList(props: SearchProps) {

  const [data, setData] = useState<dataTypes[]>([]);
  
  useEffect(() => {
    const path: string = props.path || "";
    const query: string = props.query || "";
  
    const request: string = `${path}${query}`;
    const fetchData = async () => {
      const result: any = await axios.get(request);
      
      setData(result.data.hits);
    };

    fetchData();
  }, [props.path, props.query]);

  return (
    <ul>
      {data && data.map((item: dataTypes) => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  )

}

export default HackerNewsList;