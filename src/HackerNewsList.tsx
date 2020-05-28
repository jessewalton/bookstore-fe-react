import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface dataTypes {
  objectID: number,
  url: string,
  title: string,
}

function HackerNewsList(props: any) {

  const [data, setData] = useState<dataTypes[]>([]);
  
  useEffect(() => {
    const query: string = props.query || "";
    const request: string = `https://hn.algolia.com/api/v1/search?query=${query}`;
    const fetchData = async () => {
      const result: any = await axios.get(request);
      
      setData(result.data.hits);
    };

    fetchData();
  }, [props.query]);

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