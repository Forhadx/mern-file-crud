import React, { useEffect, useState } from "react";
import Image from "./ImageInput";

const FormInput = (props) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const {isEdit, editProduct} = props;

  useEffect(()=>{
    if(isEdit){
      setTitle(editProduct.title);
      setPrice(editProduct.price);
    }
  }, [isEdit, editProduct])

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
    if(isEdit){
      if(imagePath){
        formData.append("image_path", imagePath);
        props.updateHandler(editProduct._id, formData)
      }else{
        formData.append('image_path', editProduct.image_path);
        formData.append('image_mimetype', editProduct.image_mimetype);
        props.updateHandler(editProduct._id, formData)
      }
    }else{
      formData.append("image_path", imagePath);
      props.addProduct(formData);
    }
    setTitle("");
    setPrice("");
    setImagePath("");
    setIsSubmit(true);
  };

  const imageShow = () => {
    setIsSubmit(false);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          value={price}
          placeholder="price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <Image
          onInput={(e) => setImagePath(e)}
          isSubmit={isSubmit}
          imageShow={imageShow}
        />
        <button type="submit">Done</button>
      </form>
    </div>
  );
};

export default FormInput;
