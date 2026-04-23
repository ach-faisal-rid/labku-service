import React from 'react';
import { 
    CheckSquare, 
    Square, 
    Phone, 
    Building, 
    Edit, 
    Trash2, 
    QrCode as QrCodeIcon, 
    History as HistoryIcon,
    ChevronUp,
    ChevronDown,
    ArrowUpDown,
    Fingerprint
} from 'lucide-react';

const CustomerTable = ({ 
    currentItems, 
    selectedIds, 
    toggleSelectAll, 
    toggleSelect, 
    handleShowHistory, 
    handleShowCard, 
    handleEdit, 
    handleDelete,
    sortConfig,
    onSort
}) => {
    
    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <ArrowUpDown size={12} className="text-gray-300" />;
        return sortConfig.direction === 'asc' ? <ChevronUp size={12} className="text-blue-600" /> : <ChevronDown size={12} className="text-blue-600" />;
    };

    const SortableHeader = ({ label, sortKey, className = "" }) => (
        <th 
            className={`px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left cursor-pointer hover:text-blue-600 transition-colors ${className}`}
            onClick={() => onSort(sortKey)}
        >
            <div className="flex items-center gap-1.5">
                {label}
                {getSortIcon(sortKey)}
            </div>
        </th>
    );

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
                <thead>
                    <tr className="bg-gray-50/50">
                        <th className="px-6 py-4 text-left w-10">
                            <button
                                onClick={toggleSelectAll}
                                className="text-gray-400 hover:text-blue-600 transition"
                            >
                                {selectedIds.length === currentItems.length && currentItems.length > 0 ? (
                                    <CheckSquare size={18} className="text-blue-600" />
                                ) : (
                                    <Square size={18} />
                                )}
                            </button>
                        </th>
                        <SortableHeader label="Pelanggan" sortKey="name" />
                        <SortableHeader label="Perusahaan" sortKey="company" />
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left">Transaksi</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {currentItems.length > 0 ? (
                        currentItems.map((item) => (
                            <tr key={item.id} className={`group hover:bg-blue-50/30 transition-colors ${selectedIds.includes(item.id) ? 'bg-blue-50/50' : ''}`}>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => toggleSelect(item.id)}
                                        className="text-gray-400 hover:text-blue-600 transition"
                                    >
                                        {selectedIds.includes(item.id) ? (
                                            <CheckSquare size={18} className="text-blue-600" />
                                        ) : (
                                            <Square size={18} />
                                        )}
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=random&color=fff`}
                                            alt={item.name}
                                            className="w-10 h-10 rounded-xl shadow-sm"
                                        />
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{item.name}</span>
                                                <span className={`px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${
                                                    item.membership_status === 'Platinum' ? 'bg-blue-100 text-blue-700' :
                                                    item.membership_status === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                                                    item.membership_status === 'Silver' ? 'bg-gray-100 text-gray-700' :
                                                    'bg-orange-100 text-orange-700'
                                                }`}>
                                                    {item.membership_status || 'Bronze'}
                                                </span>
                                            </div>
                                            <span className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5 font-mono">
                                                <Fingerprint size={10} /> {item.customer_code}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs text-gray-600 flex items-center gap-1.5 font-medium">
                                            <Phone size={12} className="text-gray-400" /> {item.phone || '-'}
                                        </span>
                                        <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                            <Building size={10} /> {item.company || 'Personal'}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleShowHistory(item)}
                                        className="group/btn flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-100 hover:border-blue-100 transition-all"
                                    >
                                        <HistoryIcon size={14} className="text-gray-400 group-hover/btn:text-blue-500" />
                                        <span className="text-xs font-bold text-gray-600 group-hover/btn:text-blue-700">
                                            {item.devices?.length || 0} Transaksi
                                        </span>
                                    </button>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleShowCard(item)}
                                            className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition"
                                            title="Cetak Kartu Member"
                                        >
                                            <Fingerprint size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                                            title="Edit Pelanggan"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                                            title="Hapus Pelanggan"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="px-6 py-20 text-center">
                                <div className="flex flex-col items-center gap-2">
                                    <p className="text-sm text-gray-400 font-medium">Tidak ada pelanggan ditemukan</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerTable;
