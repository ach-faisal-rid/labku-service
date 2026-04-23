import React from 'react';
import { User, Smartphone, AlertCircle, Info, CheckCircle, Box, Shield, ClipboardCheck } from 'lucide-react';

const DeviceForm = ({
    data,
    setData,
    handleSubmit,
    handleCancel,
    editMode,
    processing,
    errors,
    customers
}) => {
    const deviceTypes = [
        { id: 'HP', label: 'Handphone', icon: Smartphone, color: 'text-blue-600', bg: 'bg-blue-50' },
        { id: 'Laptop', label: 'Laptop', icon: Smartphone, color: 'text-blue-600', bg: 'bg-blue-50' },
        { id: 'Tablet', label: 'Tablet', icon: Smartphone, color: 'text-blue-600', bg: 'bg-blue-50' },
        { id: 'Aksesoris', label: 'Aksesoris', icon: Smartphone, color: 'text-blue-600', bg: 'bg-blue-50' }
    ];

    const totalCost = (parseFloat(data.estimated_cost) || 0) + (data.has_warranty ? (parseFloat(data.warranty_cost) || 0) : 0);

    return (
        <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-50">
                <h2 className="text-lg font-bold text-gray-900">
                    {editMode ? 'Edit Data Perangkat' : 'Registrasi Perangkat Baru'}
                </h2>
                <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600 text-sm font-medium transition">Batal</button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* KOLOM KIRI */}
                <div className="space-y-6">
                    {/* Pemilik Perangkat */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Pemilik Perangkat *</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <select
                                required
                                value={data.customer_id || ''}
                                onChange={e => setData('customer_id', e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition appearance-none bg-white"
                            >
                                <option value="">Pilih Pelanggan...</option>
                                {customers.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                        {errors.customer_id && <p className="mt-1 text-xs text-red-500 font-medium">{errors.customer_id}</p>}
                    </div>

                    {/* Jenis Perangkat */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Jenis Perangkat</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {deviceTypes.map(type => (
                                <button
                                    key={type.id}
                                    type="button"
                                    onClick={() => setData('type', type.id)}
                                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${data.type === type.id ? 'border-blue-600 bg-blue-50 shadow-sm' : 'border-gray-100 hover:border-gray-200'}`}
                                >
                                    <type.icon size={20} className={data.type === type.id ? 'text-blue-600' : 'text-gray-400'} />
                                    <span className={`text-[10px] font-bold mt-2 ${data.type === type.id ? 'text-blue-700' : 'text-gray-500'}`}>{type.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Brand & Model */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Brand</label>
                            <input
                                type="text"
                                value={data.brand || ''}
                                onChange={e => setData('brand', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                                placeholder="Contoh: Asus, Apple"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Model / Seri</label>
                            <input
                                type="text"
                                value={data.model || ''}
                                onChange={e => setData('model', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                                placeholder="Contoh: ROG G513"
                            />
                        </div>
                    </div>
                </div>

                {/* KOLOM KANAN */}
                <div className="space-y-6">
                    {/* Keluhan & Kondisi */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Keluhan / Masalah</label>
                            <div className="relative">
                                <AlertCircle className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                <textarea
                                    rows="2"
                                    value={data.complaint || ''}
                                    onChange={e => setData('complaint', e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition resize-none"
                                    placeholder="Jelaskan masalah..."
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Kondisi Saat Diterima</label>
                            <div className="relative">
                                <Info className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                <textarea
                                    rows="2"
                                    value={data.condition_note || ''}
                                    onChange={e => setData('condition_note', e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition resize-none"
                                    placeholder="Catatan kondisi..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Catatan Teknisi */}
                    <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                                <ClipboardCheck size={12} />
                                Catatan Teknisi / Hasil Tes Lanjutan (Opsional)
                            </label>
                            <textarea
                                rows="2"
                                value={data.technician_note || ''}
                                onChange={e => setData('technician_note', e.target.value)}
                                className="w-full px-4 py-2.5 bg-white border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition resize-none text-sm"
                                placeholder="Contoh: Perlu ganti LCD total, biaya tambahan Rp1.200.000..."
                            />
                        </div>

                        {/* Opsi Pembatalan */}
                        <div
                            className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${data.cancellation_agreement ? 'bg-amber-50 border-amber-200 shadow-sm' : 'bg-white border-blue-200'}`}
                            onClick={() => setData('cancellation_agreement', !data.cancellation_agreement)}
                        >
                            <div className={`mt-0.5 p-1 rounded transition-colors ${data.cancellation_agreement ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                <Shield size={12} />
                            </div>
                            <div className="flex-1">
                                <p className={`text-[11px] leading-relaxed font-medium ${data.cancellation_agreement ? 'text-amber-800' : 'text-gray-600'}`}>
                                    <span className="font-bold">Pesanan dapat dibatalkan</span> jika customer tidak setuju dengan biaya final setelah pengecekan lebih lanjut.
                                    <span className="block text-[10px] mt-0.5 opacity-80">(Perangkat akan dikembalikan tanpa pengerjaan jika tidak jadi)</span>
                                </p>
                            </div>
                            <div className={`w-8 h-4 rounded-full relative transition-colors mt-1 flex-shrink-0 ${data.cancellation_agreement ? 'bg-amber-500' : 'bg-gray-200'}`}>
                                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${data.cancellation_agreement ? 'left-[18px]' : 'left-0.5'}`} />
                            </div>
                        </div>
                    </div>

                    {/* Biaya dan Garansi */}
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Biaya Jasa (Dasar)</label>
                                <div className="relative">
                                    <Box className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="number"
                                        value={data.estimated_cost || ''}
                                        onChange={e => setData('estimated_cost', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition text-sm"
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col justify-end">
                                <div
                                    className={`flex items-center gap-3 p-2 rounded-xl border transition-all cursor-pointer ${data.has_warranty ? 'bg-emerald-50 border-emerald-200 shadow-sm' : 'bg-white border-gray-200'}`}
                                    onClick={() => setData('has_warranty', !data.has_warranty)}
                                >
                                    <div className={`p-1.5 rounded-lg transition-colors ${data.has_warranty ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                        <CheckCircle size={14} />
                                    </div>
                                    <div className="flex-1">
                                        <p className={`text-[11px] font-bold ${data.has_warranty ? 'text-emerald-700' : 'text-gray-500'}`}>Tambah Garansi</p>
                                    </div>
                                    <div className={`w-8 h-4 rounded-full relative transition-colors ${data.has_warranty ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                                        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${data.has_warranty ? 'left-[18px]' : 'left-0.5'}`} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {data.has_warranty && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-200/50 animate-in fade-in slide-in-from-top-2 duration-300">
                                <div>
                                    <label className="block text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1.5">Biaya Garansi</label>
                                    <div className="relative">
                                        <Box className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                                        <input
                                            type="number"
                                            value={data.warranty_cost || ''}
                                            onChange={e => setData('warranty_cost', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition text-sm text-emerald-700 font-medium"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1.5">Keterangan Garansi</label>
                                    <div className="relative">
                                        <Info className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                                        <input
                                            type="text"
                                            value={data.warranty_note || ''}
                                            onChange={e => setData('warranty_note', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition text-sm"
                                            placeholder="Misal: Garansi LCD 30 hari"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-gray-500">
                                <Info size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Total Estimasi</span>
                            </div>
                            <span className="text-lg font-black text-gray-900 tracking-tight">
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalCost)}
                            </span>
                        </div>
                    </div>

                    {/* Tombol Submit */}
                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-10 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-100 disabled:opacity-50 active:scale-95"
                        >
                            {processing ? 'Memproses...' : (editMode ? 'Simpan' : 'Daftarkan')}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default DeviceForm;