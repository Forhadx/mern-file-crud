import React, { useEffect, useState } from "react";
import Image from "./ImageInput";

const FormInput = (props) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const { isEdit, editProduct } = props;

  useEffect(() => {
    if (isEdit) {
      setTitle(editProduct.title);
      setPrice(editProduct.price);
    }
  }, [isEdit, editProduct]);

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    if (isEdit) {
      if (imagePath) {
        formData.append("image_path", imagePath);
        props.updateHandler(editProduct._id, formData);
      } else {
        formData.append("image_path", editProduct.image_path);
        formData.append("image_mimetype", editProduct.image_mimetype);
        props.updateHandler(editProduct._id, formData);
      }
    } else {
      formData.append("image_path", imagePath);
      props.addProduct(formData);
    }
    setTitle('');
    setPrice('');
    setImagePath('');
    setIsSubmit(true);
  };

  const imageShow = () => {
    setIsSubmit(false);
  };

  return (
    <form onSubmit={submitHandler} className="form-detail">
      <h2 className="form-heading">Insert Product Details</h2>
      <div className="form-row-1">
        <div className="form-col-1">
          <label>Enter product name</label>
          <input
            type="text"
            placeholder="name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Enter product price</label>
          <input
            type="number"
            value={price}
            placeholder="price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <Image
          onInput={(e) => setImagePath(e)}
          isSubmit={isSubmit}
          imageShow={imageShow}
        />
      </div>
      {(title!=='' && price!=='' && imagePath!=='') ? (
        <button type="submit" className="btn-submit">
          Done
        </button>
      ) : (
        <button type="submit" className="btn-submit-disable" disabled>
          Done
        </button>
      )}
    </form>
  );
};

export default FormInput;

