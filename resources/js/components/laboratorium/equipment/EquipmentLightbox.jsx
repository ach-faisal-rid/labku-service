import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const EquipmentLightbox = ({
    isOpen,
    images,
    currentIndex,
    onClose,
    onNext,
    onPrev,
    onSelectIndex
}) => {
    if (!isOpen || !images || images.length === 0) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md" onClick={onClose}>
            <button
                className="absolute top-6 right-6 text-white/70 hover:text-white flex items-center gap-2 transition-all z-[110] group"
                onClick={onClose}
            >
                <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">Tutup</span>
                <X className="w-8 h-8 p-1 bg-white/10 rounded-full" />
            </button>

            <div className="relative w-full max-w-5xl px-4 flex items-center justify-center h-full" onClick={(e) => e.stopPropagation()}>
                {images.length > 1 && (
                    <button
                        className="absolute left-4 md:left-8 text-white hover:text-gray-300 p-2 bg-black/50 rounded-full transition hover:bg-black/70"
                        onClick={onPrev}
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>
                )}

                <div className="max-h-[85vh] max-w-full flex flex-col items-center">
                    <img
                        src={`/storage/${images[currentIndex].image_path}`}
                        alt={images[currentIndex].image_name || 'Gallery Preview'}
                        className="max-h-[75vh] max-w-full object-contain rounded shadow-2xl"
                    />
                    <div className="text-white mt-4 text-center">
                        <p className="font-medium text-lg">{images[currentIndex].image_name || `Image ${currentIndex + 1}`}</p>
                        <p className="text-sm text-gray-400">
                            {currentIndex + 1} of {images.length}
                        </p>
                    </div>
                </div>

                {images.length > 1 && (
                    <button
                        className="absolute right-4 md:right-8 text-white hover:text-gray-300 p-2 bg-black/50 rounded-full transition hover:bg-black/70"
                        onClick={onNext}
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>
                )}
            </div>

            {/* Thumbnails Strip */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto py-2" onClick={(e) => e.stopPropagation()}>
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            onClick={() => onSelectIndex(idx)}
                            className={`w-16 h-16 rounded border-2 cursor-pointer shrink-0 transition-all overflow-hidden ${currentIndex === idx
                                    ? 'border-white opacity-100 scale-110'
                                    : 'border-transparent opacity-50 hover:opacity-100'
                                }`}
                        >
                            <img
                                src={`/storage/${img.image_path}`}
                                alt={`Thumbnail ${idx + 1}`}
                                className="w-full h-full object-cover rounded-sm"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EquipmentLightbox;
