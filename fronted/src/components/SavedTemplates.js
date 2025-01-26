import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const SavedTemplates = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/emails/templates");
        setTemplates(response.data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, []);

  const handleDownload = async (template) => {
    const emailData = {
      title: template.title,
      content: template.content,
      footer: template.footer,
      imageUrl: template.imageUrl,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/emails/render-download",
        emailData,
        {
          responseType: "blob", // Ensure the response is treated as a file
        }
      );

      // Create a download link for the blob
      const blob = new Blob([response.data], { type: "text/html" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "email_template.html";
      link.click();
    } catch (error) {
      console.error("Failed to download template:", error);
      alert("Failed to download template!");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-5">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Saved Templates</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card
            key={template._id}
            className="shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {template.imageUrl && (
              <CardMedia
                component="img"
                height="140"
                image={`${template.imageUrl}`}
                alt={template.title}
              />
            )}
            <CardContent>
              <Typography variant="h5" component="div" className="font-bold text-gray-800">
                {template.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="mt-2 text-gray-600"
              >
                {template.content}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                className="block mt-4 text-right"
              >
                {template.footer}
              </Typography>
            </CardContent>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={() => handleDownload(template)} // Pass the template to handleDownload
              className="my-3 mx-3"
            >
              Download Template
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SavedTemplates;
