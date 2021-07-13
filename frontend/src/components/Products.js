import React from "react";
import download from "downloadjs";
import axios from "axios";

const Products = (props) => {
  const clickHandler = async (prod) => {
    try {
      const result = await axios.get(
        process.env.REACT_APP_BASE_URL + `/download/${prod._id}`,
        {
          responseType: "blob",
        }
      );
      const split = prod.image_path.split("/");
      const filename = split[split.length - 1];
      return download(result.data, filename, prod.image_mimetype); // download(image_url, image_name,  image_mimetype)
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="products">
      {props.products
        ? props.products.map((p) => (
            <div key={p._id} className="product-details">
              <div className="product-info">
                <h2>{p.title}</h2>
                <p>{p.price} $</p>
              </div>
              <img
                src={process.env.REACT_APP_BASE_URL + `/${p.image_path}`}
                alt={p.title}
              />
              <div className="product-btns">
                <button onClick={() => props.updateHandler(p)}>Update</button>
                <button onClick={() => props.deleteHandler(p._id)}>
                  Delete
                </button>
                <button onClick={() => clickHandler(p)}>Download</button>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default Products;
