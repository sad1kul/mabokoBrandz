import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTrash, faStar } from '@fortawesome/free-solid-svg-icons';
import { ProductImage } from '../../types/product';
import { uploadImage, deleteImage } from '../../utils/imageUpload';

interface ImageUploadProps {
  images: ProductImage[];
  onImagesChange: (images: ProductImage[]) => void;
}

export default function ImageUpload({ images, onImagesChange }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;
    setIsUploading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const url = await uploadImage(file);
        return {
          id: `temp-${Date.now()}-${Math.random()}`,
          url,
          isFeatured: images.length === 0,
        };
      });

      const newImages = await Promise.all(uploadPromises);
      onImagesChange([...images, ...newImages]);
    } catch (error) {
      console.error('Error uploading images:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleRemoveImage = async (id: string) => {
    const imageToRemove = images.find(img => img.id === id);
    if (!imageToRemove) return;

    try {
      await deleteImage(imageToRemove.url);
      const newImages = images.filter(img => img.id !== id);
      if (newImages.length > 0 && imageToRemove.isFeatured) {
        newImages[0].isFeatured = true;
      }
      onImagesChange(newImages);
    } catch (error) {
      console.error('Error removing image:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleSetFeatured = (id: string) => {
    const newImages = images.map(img => ({
      ...img,
      isFeatured: img.id === id,
    }));
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-500'
        } ${isUploading ? 'opacity-50 cursor-wait' : ''}`}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <FontAwesomeIcon
          icon={faUpload}
          className={`text-4xl mb-4 ${
            isUploading ? 'text-blue-500 animate-bounce' : 'text-gray-400'
          }`}
        />
        <p className="text-gray-600">
          {isUploading
            ? 'Uploading images...'
            : 'Drag and drop images here or click to select files'}
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          aria-label="Upload product images"
          onChange={(e) => handleFileSelect(e.target.files)}
          disabled={isUploading}
        />
      </div>

      {/* Image Preview */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative group rounded-lg overflow-hidden"
            >
              <img
                src={image.url}
                alt="Product preview"
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <button
                  onClick={() => handleSetFeatured(image.id)}
                  className={`p-2 rounded-full ${
                    image.isFeatured
                      ? 'bg-yellow-500 text-white'
                      : 'bg-white text-gray-800'
                  } hover:bg-yellow-600 hover:text-white transition-colors`}
                  title={image.isFeatured ? 'Featured image' : 'Set as featured'}
                >
                  <FontAwesomeIcon icon={faStar} />
                </button>
                <button
                  onClick={() => handleRemoveImage(image.id)}
                  className="p-2 rounded-full bg-white text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                  title="Remove image"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 