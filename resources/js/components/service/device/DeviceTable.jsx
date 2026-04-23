import React from 'react';
import { Search, ChevronLeft, ChevronRight, Smartphone, Settings, User, Edit, Trash2, CheckCircle, Printer } from 'lucide-react';

const DeviceTable = ({ 
    currentItems, 
    search, 
    setSearch, 
    indexOfFirstItem, 
    indexOfLastItem, 
    filteredData, 
    currentPage, 
    setCurrentPage, 
    totalPages, 
    handleEdit, 
    handleDelete,
    handlePrint 
}) => {
    const deviceTypes = [
        { id: 'HP', label: 'Handphone', icon: Smartphone, color: 'text-blue-600', bg: 'bg-blue-50' },
        { id: 'Laptop', label: 'Laptop', icon: Smartphone, color: 'text-blue-600', bg: 'bg-blue-50' },
        { id: 'Tablet', label: 'Tablet', icon: Smartphone, color: 'text-blue-600', bg: 'bg-blue-50' },
        { id: 'Aksesoris', label: 'Aksesoris', icon: Smartphone, color: 'text-blue-600', bg: 'bg-blue-50' }
    ];

    const getTypeIcon = (type) => {
        const found = deviceTypes.find(t => t.id === type);
        const Icon = found ? found.icon : Smartphone;
        return <Icon size={16} className={found ? found.color : 'text-gray-400'} />;
    };

    const getTypeBadge = (type) => {
        const found = deviceTypes.find(t => t.id === type);
        return (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${found ? found.bg + ' ' + found.color : 'bg-gray-100 text-gray-600'}`}>
                {getTypeIcon(type)}
                {type}
            </span>
        );
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
                <div className="relative max-w-md w-full">
                    <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                        type="text"
                        placeholder="Cari perangkat, brand, atau pemilik..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full py-2 pl-10 pr-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition text-sm"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100">
                    <thead>
                        <tr className="bg-gray-50/50">
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left">No</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left">Perangkat</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left">Pemilik</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left">Keluhan</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left">Estimasi Biaya</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-50">
                        {currentItems.length > 0 ? (
                            currentItems.map((item, index) => (
                                <tr key={item.id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-gray-400">
                                        {indexOfFirstItem + index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-gray-900">{item.brand} {item.model}</span>
                                            </div>
                                            {getTypeBadge(item.type)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                                                <User className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-gray-900 leading-tight">
                                                    {item.customer ? item.customer.name : 'Unknown'}
                                                </span>
                                                <span className="text-[10px] text-gray-400 font-medium tracking-tight uppercase">
                                                    {item.customer ? item.customer.phone : '-'}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="max-w-xs">
                                            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                                                {item.complaint || 'Tidak ada keterangan keluhan'}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex flex-col">
                                                <span className="text-[13px] font-bold text-gray-900">
                                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format((parseFloat(item.estimated_cost) || 0) + (item.has_warranty ? (parseFloat(item.warranty_cost) || 0) : 0))}
                                                </span>
                                                <span className="text-[9px] text-gray-400 font-medium">
                                                    Dasar: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.estimated_cost || 0)}
                                                </span>
                                            </div>
                                            
                                            {item.has_warranty ? (
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full w-fit uppercase tracking-tighter">
                                                        <CheckCircle size={10} />
                                                        + Garansi ({new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.warranty_cost || 0)})
                                                    </span>
                                                    {item.warranty_note && (
                                                        <span className="text-[9px] text-emerald-600 italic pl-1 leading-tight max-w-[120px] truncate">
                                                            "{item.warranty_note}"
                                                        </span>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-[9px] font-bold text-gray-400 px-1.5 py-0.5 rounded-full w-fit uppercase tracking-tighter border border-gray-100">
                                                    Tanpa Garansi
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => handlePrint(item)}
                                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                                                title="Cetak Nota"
                                            >
                                                <Printer size={16} />
                                            </button>
                                            <button 
                                                onClick={() => handleEdit(item)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                title="Edit Data"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(item.id)} 
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                title="Hapus Data"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-24 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="p-4 bg-gray-50 rounded-full">
                                            <Smartphone className="w-8 h-8 text-gray-300" />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm font-bold text-gray-900">Belum Ada Perangkat</p>
                                            <p className="text-xs text-gray-400">Daftarkan perangkat baru untuk mulai mengelola servis</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-50 bg-gray-50/30">
                    <div className="text-xs font-medium text-gray-400">
                        MENAMPILKAN <span className="text-gray-600">{indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredData.length)}</span> DARI <span className="text-gray-600">{filteredData.length}</span> DATA
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-2 border border-gray-200 rounded-lg disabled:opacity-30 hover:bg-white transition bg-white/50"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <div className="flex gap-1 px-2">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-8 h-8 rounded-lg text-xs font-bold transition ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:bg-white'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-2 border border-gray-200 rounded-lg disabled:opacity-30 hover:bg-white transition bg-white/50"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeviceTable;
