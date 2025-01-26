import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

const EmailEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [footer, setFooter] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
  
    try {
      const response = await axios.post("http://localhost:5000/api/emails/upload-image", formData);
      setImage(response.data.imageUrl);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image!");
    }
  };
  

  const handleSaveTemplate = async () => {
    const emailData = { title, content, footer, imageUrl: image };
    try {
      await axios.post("http://localhost:5000/api/emails/save-template", emailData);
      alert("Template saved successfully!");
    } catch (error) {
      console.error("Failed to save template:", error);
      alert("Failed to save template!");
    }
  };



  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen py-10 px-5 container ml-5 me-5">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 tracking-tight">
        Create Your Email Template
      </h1>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-8">
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="my-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Upload Image
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-100 file:text-blue-700
            hover:file:bg-blue-200"
          />
          {loading && (
            <div className="flex justify-center mt-3">
              <CircularProgress size={24} />
            </div>
          )}
        </div>
        <TextField
          label="Footer"
          variant="outlined"
          fullWidth
          margin="normal"
          value={footer}
          onChange={(e) => setFooter(e.target.value)}
        />
        <div className="flex justify-between mt-8">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSaveTemplate}
          >
            Save Template
          </Button>

        </div>
      </div>
    </div>
  );
};

export default EmailEditor;
