import React from 'react';
import { AlertCircle } from 'lucide-react';

const EquipmentDeleteModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    equipmentName, 
    processing 
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 transform transition-all">
                <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Hapus Equipment</h3>
                <p className="text-gray-600 text-center mb-6">
                    Apakah Anda yakin ingin menghapus <strong className="text-gray-900">{equipmentName}</strong>?<br />
                    Tindakan ini tidak dapat dibatalkan.
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={processing}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                    >
                        {processing ? 'Menghapus...' : 'Hapus'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EquipmentDeleteModal;
