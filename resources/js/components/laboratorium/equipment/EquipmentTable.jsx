import React from 'react';
import { Search, Filter, Package, Edit, Trash2, ChevronLeft, ChevronRight, Link as LinkIcon, Video, FileText, ExternalLink, Copy, QrCode } from 'lucide-react';

const EquipmentTable = ({
    equipments,
    categories,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    currentPage,
    setCurrentPage,
    totalPages,
    currentItems,
    indexOfFirstItem,
    indexOfLastItem,
    handleEdit,
    handleDuplicate,
    handleDeleteClick,
    handleShowQR,
    getStatusConfig,
    getCategoryName,
    openLightbox
}) => {
    return (
        <>
            {/* Filter Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Cari berdasarkan kode atau nama..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="w-full md:w-64 relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <select
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                        >
                            <option value="">Semua Kategori</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full md:w-64 relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <select
                            value={selectedStatus}
                            onChange={(e) => {
                                setSelectedStatus(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                        >
                            <option value="">Semua Status</option>
                            <option value="active">Aktif</option>
                            <option value="inactive">Tidak Aktif</option>
                            <option value="maintenance">Perawatan</option>
                            <option value="retired">Pensiun</option>
                        </select>
                    </div>
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedCategory('');
                            setSelectedStatus('');
                            setCurrentPage(1);
                        }}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Reset Filter
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Equipment</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipe</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="8" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                            <p className="text-gray-500">Memuat data...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : currentItems.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <Package className="w-12 h-12 text-gray-300" />
                                            <p className="text-gray-500">Tidak ada data equipment</p>
                                            <p className="text-sm text-gray-400">Silakan tambah equipment baru</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                currentItems.map((equipment, index) => {
                                    const config = getStatusConfig(equipment.status);
                                    const StatusIcon = config.icon;
                                    return (
                                        <tr key={equipment.id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {indexOfFirstItem + index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono text-gray-700">
                                                    {equipment.code}
                                                </code>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    {equipment.images && equipment.images.length > 0 ? (
                                                        <div
                                                            className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 border border-gray-200 shrink-0 cursor-pointer group relative"
                                                            onClick={() => openLightbox(equipment.images)}
                                                        >
                                                            <img
                                                                src={`/storage/${equipment.images[0].image_path}`}
                                                                alt={equipment.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                            {equipment.images.length > 1 && (
                                                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <span className="text-white text-xs font-semibold">+{equipment.images.length}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center border border-gray-200 shrink-0">
                                                            <Package className="w-5 h-5 text-gray-400" />
                                                        </div>
                                                    )}
                                                    <div className="font-medium text-gray-900">{equipment.name}</div>
                                                </div>
                                                {equipment.links && equipment.links.length > 0 && (
                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                        {equipment.links.map((link) => (
                                                            <a
                                                                key={link.id}
                                                                href={link.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-medium hover:bg-blue-100 transition border border-blue-100"
                                                                title={link.title || link.url}
                                                            >
                                                                {link.type === 'video' ? <Video size={10} /> : 
                                                                 link.type === 'manual' ? <FileText size={10} /> : 
                                                                 <LinkIcon size={10} />}
                                                                <span className="max-w-[80px] truncate">{link.title || 'Link'}</span>
                                                                <ExternalLink size={8} className="opacity-50" />
                                                            </a>
                                                        ))}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {getCategoryName(equipment.category_id)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {equipment.type}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {equipment.prices && equipment.prices.length > 0 ? (
                                                    <div className="flex flex-col">
                                                        {(() => {
                                                            const currentPrice = equipment.prices.find(p => p.is_current) || equipment.prices[0];
                                                            return (
                                                                <>
                                                                    <span>
                                                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(currentPrice.price)}
                                                                    </span>
                                                                    <span className="text-[10px] text-gray-500 uppercase font-normal">
                                                                        {currentPrice.price_type === 'purchase' ? 'Pembelian' : 
                                                                         currentPrice.price_type === 'rental' ? 'Sewa' : 
                                                                         currentPrice.price_type === 'maintenance' ? 'Perawatan' : 'Langganan'}
                                                                    </span>
                                                                    {currentPrice.effective_date && (
                                                                        <span className="text-[9px] text-gray-400 font-normal">
                                                                            Mulai: {new Date(currentPrice.effective_date).toLocaleDateString('id-ID')}
                                                                        </span>
                                                                    )}
                                                                </>
                                                            );
                                                        })()}
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400 font-normal">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${config.color}`}>
                                                    <StatusIcon size={12} />
                                                    {config.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(equipment)}
                                                        className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition"
                                                        title="Edit"
                                                    >
                                                        <Edit size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleShowQR(equipment)}
                                                        className="p-1 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded transition"
                                                        title="QR Code"
                                                    >
                                                        <QrCode size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDuplicate(equipment)}
                                                        className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition"
                                                        title="Duplikat"
                                                    >
                                                        <Copy size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(equipment)}
                                                        className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition"
                                                        title="Hapus"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {equipments.length > 0 && totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between flex-wrap gap-4">
                        <div className="text-sm text-gray-500">
                            Menampilkan {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, equipments.length)} dari {equipments.length} data
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <div className="flex gap-1">
                                {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`px-3 py-1 rounded-lg transition ${currentPage === pageNum
                                                    ? 'bg-blue-600 text-white'
                                                    : 'border border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default EquipmentTable;
