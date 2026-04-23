import React from 'react';
import { X, Clock, Trash2, Tag, Edit, Plus, Copy, Download, Upload } from 'lucide-react';

const EquipmentHistoryModal = ({ isOpen, onClose, activities, onClear }) => {
    if (!isOpen) return null;

    const getIcon = (action) => {
        switch (action) {
            case 'Tambah': return <Plus className="text-green-600" size={16} />;
            case 'Update': return <Edit className="text-blue-600" size={16} />;
            case 'Hapus': return <Trash2 className="text-red-600" size={16} />;
            case 'Duplikat': return <Copy className="text-indigo-600" size={16} />;
            case 'Export': return <Download className="text-gray-600" size={16} />;
            case 'Import': return <Upload className="text-purple-600" size={16} />;
            default: return <Tag className="text-gray-600" size={16} />;
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                            <Clock size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Riwayat Perubahan</h3>
                            <p className="text-xs text-gray-500">Lacak aktivitas manajemen equipment</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={onClear}
                            className="text-xs text-red-500 hover:text-red-700 font-bold px-3 py-1 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            Hapus Semua
                        </button>
                        <button 
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {activities.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                            <Clock size={48} className="mb-4 opacity-20" />
                            <p>Belum ada riwayat aktivitas</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {activities.map((activity) => (
                                <div key={activity.id} className="flex gap-4 p-4 rounded-xl border border-gray-50 bg-gray-50/30 hover:bg-gray-50 transition-colors">
                                    <div className="mt-1 shrink-0 p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                                        {getIcon(activity.action)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-bold text-gray-900">{activity.action}</span>
                                            <span className="text-[10px] text-gray-400 font-mono">
                                                {new Date(activity.timestamp).toLocaleString('id-ID')}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {activity.details}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        Labku Management System
                    </span>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all active:scale-95 text-sm"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EquipmentHistoryModal;
