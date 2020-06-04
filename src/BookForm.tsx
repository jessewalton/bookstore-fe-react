import React from "react";
// import React, { useState, useEffect } from "react";


import { useForm } from "react-hook-form";

import axios from "axios";

// interface Book {
//   id: number;
//   author: string;
//   title: string;
//   url: string;
// }

function BookForm() {
  // const [data, setData] = useState<Book[]>([]);

  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = async (formData: any) => {
    console.log("onSubmit");
    console.log(formData);

      await axios.post('http://localhost:8080/books', {
        title: formData.title,
        author: formData.author,
        URL: formData.url,
      });
  };

  //console.log(watch("title")); // watch input value by passing the name of it

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="title" defaultValue="title" ref={register} />
        <br />
        <input name="author" ref={register({ required: true })} />
        {errors.author && <span>This field is required</span>}
        <br />
        <input name="url" ref={register} />
        <br />

        <input type="submit" />
      </form>
  );
}

export default BookForm;
