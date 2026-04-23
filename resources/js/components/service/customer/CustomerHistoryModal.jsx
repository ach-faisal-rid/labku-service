import React from 'react';
import { X, History, Laptop, Calendar, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

const CustomerHistoryModal = ({ isOpen, onClose, customer }) => {
    if (!isOpen || !customer) return null;

    const devices = customer.devices || [];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[80vh]">
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-xl">
                            <History className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Riwayat Transaksi</h3>
                            <p className="text-sm text-gray-500">Daftar layanan servis untuk {customer.name}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                    {devices.length > 0 ? (
                        <div className="space-y-4">
                            {devices.map((device, index) => (
                                <div key={device.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm group hover:border-blue-200 transition-all">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                                                <Laptop className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 uppercase tracking-tight">{device.type} - {device.brand} {device.model}</h4>
                                                <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                                    <Calendar size={12} /> {new Date(device.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="px-2.5 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-lg border border-green-100 uppercase tracking-wider">
                                            Completed
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-50">
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Keluhan</p>
                                            <p className="text-sm text-gray-700 italic">"{device.complaint || '-'}"</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Catatan Kondisi</p>
                                            <p className="text-sm text-gray-700">{device.condition_note || '-'}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="p-4 bg-gray-100 rounded-full mb-4">
                                <AlertCircle className="w-8 h-8 text-gray-300" />
                            </div>
                            <h4 className="text-gray-900 font-bold">Belum Ada Transaksi</h4>
                            <p className="text-sm text-gray-500 max-w-xs mt-1">
                                Pelanggan ini belum memiliki riwayat penambahan perangkat atau transaksi servis.
                            </p>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 bg-white border-t border-gray-50 flex justify-between items-center">
                    <div className="text-xs text-gray-400 font-medium">
                        Total {devices.length} Transaksi Terdaftar
                    </div>
                    <button
                        onClick={onClose}
                        className="px-8 py-2 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 active:scale-95"
                    >
                        Selesai
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomerHistoryModal;
