import React, { useState } from 'react';
import instance from '../api/axios';

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('file', file);

      try {
        const response = await instance.post('/jugadores/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('Archivo subido exitosamente');
      } catch (error) {
        console.error('Error al subir el archivo:', error);
        alert('Error al subir el archivo');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} accept=".xlsx" />
      <button type="submit">Subir Archivo</button>
    </form>
  );
};

export default UploadForm;
