"use client"
import React, { useState } from 'react';
import axios from 'axios';
import EditableHtml from "@/components/editableHtml";

const Home: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [insights, setInsights] = useState<string>('');
  const [references, setReferences] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!files) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('docs', files[i]);
    }

    try {
      // Sending files to Flask API directly
      const response = await axios.post('http://127.0.0.1:8000/api/process', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setInsights(response.data.insights['Overall Insight']);
      setReferences(response.data.references);
    } catch (err) {
      setError('Error processing files. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-8 mt-16 bg-black shadow-md rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-8">Document Processor</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="file"
          onChange={handleFileChange}
          multiple
          className="mb-4 p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700"
        >
          Process Files
        </button>
      </form>

      {error && (
        <p className="text-red-500 mt-4 text-center">{error}</p>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Insights</h2>
        <EditableHtml initialHtml={insights}/>
        <h2 className="text-2xl font-bold mt-8 mb-4">References</h2>
        <EditableHtml initialHtml={references}/>
      </div>
    </div>
  );
};

export default Home;
