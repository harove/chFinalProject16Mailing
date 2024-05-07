import React, { useState } from 'react';

const UploadPicture = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [caption, setCaption] = useState('');
  const [productId, setProductId] = useState('');
  

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return; // Handle no file selected case

    const formData = new FormData();
    formData.append('picture', selectedFile);
    formData.append('caption', caption );
    formData.append('productId', productId );
    

    try {
      const response = await fetch('/api/products/upload', {
        method: 'POST',
        body: formData,
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
      });
      const data = await response.json();
      setMessage(data.message); // Update message based on server response
    } catch (error) {
      console.error(error);
      setMessage('Error uploading picture'); // Handle errors
    }
  };

  return (
    <div>
      <input type="file" name='picture' onChange={handleFileChange} />
      <input type="text" name='caption' onChange={e => setCaption(e.target.value)} placeholder='Caption' />
      <input type="text" name='id_producto' onChange={e => setProductId(e.target.value)} placeholder='id_producto' />
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </button>
      <p>{message}</p>
    </div>
  );
};

export default UploadPicture;
