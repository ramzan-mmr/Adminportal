import React, { useRef } from 'react'

const FileUploader = ({ onFileSelect,onFileSelectError,onFileSelectSuccess }) => {
    const handleFileInput = (e) => {
        // handle validations
        const file = e.target.files[0];
      };
    return (
        <div className="file-uploader mt-3">
            <input type="file" onChange={(e)=>handleFileInput(e)} />
        </div>
    );
};

export default FileUploader;