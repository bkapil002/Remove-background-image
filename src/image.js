import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import "./image.css";

const ImageModal = () => {
    const [signatureWithBackground, setSignatureWithBackground] = useState(null);
    const [signatureWithoutBackground, setSignatureWithoutBackground] = useState(null);
  
    const onDrop = async (acceptedFiles) => {
      const image = acceptedFiles[0];
      const formData = new FormData();
      formData.append('image_file', image);
  
      try {
        const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
          headers: {
            // enter your api  go to https://www.remove.bg
            'X-Api-Key': '', 
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'arraybuffer',
        });
  
        const blob = new Blob([response.data], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
        setSignatureWithBackground(URL.createObjectURL(image));
        setSignatureWithoutBackground(url);
      } catch (error) {
        console.error('Error removing background:', error);
      }
    };
  
    const {getRootProps, getInputProps} = useDropzone({
      accept: 'image/jpeg, image/png',
      onDrop,
    });

  return (
    <div className="modal">
      <div className="modal-header">
        <div className="modal-logo">
          <span className="logo-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="25"
              height="25"
              viewBox="0 0 512 419.116"
            >
              <defs>
                <clipPath id="clip-folder-new">
                  <rect width="512" height="419.116"></rect>
                </clipPath>
              </defs>
              <g id="folder-new" clipPath="url(#clip-folder-new)">
                <path
                  id="Union_1"
                  data-name="Union 1"
                  d="M16.991,419.116A16.989,16.989,0,0,1,0,402.125V16.991A16.989,16.989,0,0,1,16.991,0H146.124a17,17,0,0,1,10.342,3.513L227.217,57.77H437.805A16.989,16.989,0,0,1,454.8,74.761v53.244h40.213A16.992,16.992,0,0,1,511.6,148.657L454.966,405.222a17,17,0,0,1-16.6,13.332H410.053v.562ZM63.06,384.573H424.722L473.86,161.988H112.2Z"
                  fill="var(--c-action-primary)"
                  stroke=""
                  strokeWidth="1"
                ></path>
              </g>
            </svg>
          </span>
        </div>
      </div>
      <div className="modal-body">
        <p className="modal-title">Upload image</p>
        <p className="modal-description">Remove Background-Image</p>

       
          <button className="upload-area"  {...getRootProps()}>
          <input {...getInputProps()} />
          {signatureWithBackground && (
        <div>
          <img src={signatureWithBackground} alt="Signature with Background" />
        </div>
      )}
       </button>


        {signatureWithoutBackground && (
          <button className="upload-area">
            <img src={signatureWithoutBackground} alt="" />
          </button>
        )}
      </div>
      <div className="modal-footer">
        {signatureWithoutBackground && (
          <a href={signatureWithoutBackground} download="signature_without_background.png" className="btn-primary">Download image</a>
        )}
      </div>
    </div>
  );
}

export default ImageModal;
