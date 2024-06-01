import React, { useState } from "react";

const UploadPicture = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [caption, setCaption] = useState("");
  const [productId, setProductId] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return; // Handle no file selected case

    const formData = new FormData();
    formData.append("picture", selectedFile);
    formData.append("caption", caption);
    formData.append("productId", productId);

    try {
      const response = await fetch("/api/products/upload", {
        method: "POST",
        body: formData,
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error(error);
      setMessage("Error uploading picture");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 gap-4 max-w-sm">
        <div>
          <label
            htmlFor="picture"
            className="block text-sm font-medium text-gray-700"
          >
            Picture
          </label>
          <input
            type="file"
            id="picture"
            name="picture"
            onChange={handleFileChange}
            className="focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm px-3 py-2 border border-gray-300"
          />
        </div>
        <div>
          <label
            htmlFor="caption"
            className="block text-sm font-medium text-gray-700"
          >
            Caption
          </label>
          <input
            type="text"
            id="caption"
            name="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Caption"
            className="focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm px-3 py-2 border border-gray-300"
          />
        </div>
        <div>
          <label
            htmlFor="id_producto"
            className="block text-sm font-medium text-gray-700"
          >
            ID Producto
          </label>
          <input
            type="text"
            id="id_producto"
            name="id_producto"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="ID Producto"
            className="focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm px-3 py-2 border border-gray-300"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile}
            className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Upload
          </button>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500">{message}</p>
      </div>
    </div>
  );
};

export default UploadPicture;
