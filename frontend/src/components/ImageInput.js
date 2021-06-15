import React, { useRef, useState, useEffect } from "react";

const ImageUpload = React.memo((props) => {
  const [file, setFile] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const filePickerRef = useRef();

  const { isSubmit } = props;

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (isSubmit) {
        setFile("");
        setPreviewUrl("");
      } else {
        setPreviewUrl(fileReader.result);
      }
    };
    fileReader.readAsDataURL(file);
  }, [file, isSubmit]);

  const pickedHandler = (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      event.target.value=null;
    } else {
      console.log("no file..");
    }
    props.onInput(pickedFile);
  };

  const pickImageHandler = () => {
    props.imageShow();
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept="image/*"
        onChange={pickedHandler}
      />
      <div className="image-upload__preview">
        {previewUrl && <img src={previewUrl} alt="Preview" />}
        {!previewUrl && <p>Please pick an image.</p>}
      </div>
      <button type="button" onClick={pickImageHandler}>
        PICK IMAGE
      </button>
    </div>
  );
});

export default ImageUpload;
