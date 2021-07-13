import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import FormInput from "./components/FormInputs";
import Products from "./components/Products";

const App = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    console.log("url: ", process.env.REACT_APP_BASE_URL);
    axios
      .get(process.env.REACT_APP_BASE_URL + "/store")
      .then((res) => {
        console.log("all products: ", res);
        setProducts(res.data.products);
      })
      .catch((err) => console.log(err));
  }, [isEdit]);

  const addProductsHandler = (formData) => {
    console.log("add file ", formData);
    axios
      .post(process.env.REACT_APP_BASE_URL + "/store", formData)
      .then((res) => {
        setProducts([...products, res.data.product]);
        console.log("res: ", res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const findUpdateHandler = (data) => {
    setEditProduct(data);
    setIsEdit(true);
  };

  const updateHandler = (id, data) => {
    console.log("data..", data);
    axios
      .patch(process.env.REACT_APP_BASE_URL + `/store/${id}`, data)
      .then((res) => {
        setIsEdit(false);
      })
      .catch((err) => console.log(err.response));
  };

  const deleteHandler = (id) => {
    axios
      .delete(process.env.REACT_APP_BASE_URL + `/store/${id}`)
      .then((result) => {
        setProducts((oldProducts) => oldProducts.filter((p) => p._id !== id));
      })
      .catch((err) => console.log);
  };

  return (
    <div className="App">
      <FormInput
        addProduct={addProductsHandler}
        isEdit={isEdit}
        editProduct={editProduct}
        updateHandler={updateHandler}
      />
      <Products
        products={products}
        deleteHandler={deleteHandler}
        updateHandler={findUpdateHandler}
      />
    </div>
  );
};

export default App;
