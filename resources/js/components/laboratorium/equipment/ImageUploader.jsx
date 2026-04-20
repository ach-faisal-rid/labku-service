import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, X, Star, Image as ImageIcon } from 'lucide-react';

export default function ImageUploader({ existingImages = [], onImagesChange }) {
    const [previews, setPreviews] = useState([]);
    const [primaryIndex, setPrimaryIndex] = useState(0);
    const fileInputRef = useRef(null);

    // Populate existing images (for edit mode)
    useEffect(() => {
        if (existingImages && existingImages.length > 0) {
            const loaded = existingImages.map(img => ({
                isExisting: true,
                id: img.id,
                url: `/storage/${img.image_path}`,
                name: img.image_name,
                isPrimary: img.is_primary
            }));
            setPreviews(loaded);
            
            const pIndex = loaded.findIndex(img => img.isPrimary);
            if (pIndex !== -1) setPrimaryIndex(pIndex);
        }
    }, []);

    // Cleanup object URLs on unmount
    useEffect(() => {
        return () => {
            previews.forEach(preview => {
                if (!preview.isExisting && preview.url) {
                    URL.revokeObjectURL(preview.url);
                }
            });
        };
    }, [previews]);

    const handleFiles = (files) => {
        const newFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
        
        const newPreviews = newFiles.map(file => ({
            isExisting: false,
            file,
            url: URL.createObjectURL(file),
            name: file.name
        }));

        const updatedPreviews = [...previews, ...newPreviews];
        setPreviews(updatedPreviews);
        triggerChange(updatedPreviews, primaryIndex);
    };

    const triggerChange = (updatedPreviews, pIndex) => {
        // Prepare files for parent. 
        // We'll put the primary file at index 0 so backend can just take index 0 as primary.
        const filesToUpload = updatedPreviews.filter(p => !p.isExisting).map(p => p.file);
        
        // This is a bit tricky if mixing existing and new. 
        // For simplicity in this upload component, we pass all new files.
        // We can pass the selected primary file first.
        let sortedFiles = [...filesToUpload];
        
        // If primary is a new file
        const primaryPreview = updatedPreviews[pIndex];
        if (primaryPreview && !primaryPreview.isExisting) {
            sortedFiles = sortedFiles.filter(f => f !== primaryPreview.file);
            sortedFiles.unshift(primaryPreview.file);
        }
        
        onImagesChange(sortedFiles);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
            e.dataTransfer.clearData();
        }
    };

    const removeImage = (index) => {
        const updated = [...previews];
        updated.splice(index, 1);
        
        let newPrimary = primaryIndex;
        if (primaryIndex === index) {
            newPrimary = 0;
        } else if (primaryIndex > index) {
            newPrimary = primaryIndex - 1;
        }
        
        setPreviews(updated);
        setPrimaryIndex(newPrimary);
        triggerChange(updated, newPrimary);
    };

    const setPrimary = (index) => {
        setPrimaryIndex(index);
        triggerChange(previews, index);
    };

    return (
        <div className="w-full">
            <div 
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition-colors bg-gray-50 mb-4"
            >
                <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={(e) => handleFiles(e.target.files)}
                />
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                    <UploadCloud className="w-6 h-6 text-blue-500" />
                </div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Klik untuk upload atau drag and drop</h4>
                <p className="text-xs text-gray-500">SVG, PNG, JPG atau GIF (Max. 2MB)</p>
            </div>

            {previews.length > 0 && (
                <div className="space-y-2">
                    <h5 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" /> Gallery Preview
                    </h5>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {previews.map((preview, index) => (
                            <div key={index} className={`relative group aspect-square rounded-lg overflow-hidden border-2 ${primaryIndex === index ? 'border-blue-500 shadow-md' : 'border-gray-200'}`}>
                                <img 
                                    src={preview.url} 
                                    alt="Preview" 
                                    className="w-full h-full object-cover"
                                />
                                
                                {/* Overlay Controls */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                                    <div className="flex justify-between w-full">
                                        <button 
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); setPrimary(index); }}
                                            className={`p-1.5 rounded-full ${primaryIndex === index ? 'bg-yellow-400 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'}`}
                                            title="Jadikan Primary"
                                        >
                                            <Star className="w-4 h-4" fill={primaryIndex === index ? 'currentColor' : 'none'} />
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                                            className="p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600"
                                            title="Hapus"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                    {preview.isExisting && (
                                        <div className="text-[10px] text-white bg-black/60 px-2 py-0.5 rounded w-max">Tersimpan</div>
                                    )}
                                </div>

                                {primaryIndex === index && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-blue-500 text-white text-[10px] font-medium py-1 text-center">
                                        Primary Image
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
