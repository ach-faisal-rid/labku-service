import React from 'react';
import { Edit, Plus, Trash2, Link as LinkIcon, Banknote, AlertCircle } from 'lucide-react';
import ImageUploader from './ImageUploader';

const EquipmentForm = ({ 
    data, 
    setData, 
    errors, 
    processing, 
    handleSubmit, 
    editId, 
    handleCancelEdit, 
    categories, 
    equipments 
}) => {
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const addLink = () => {
        setData('links', [...data.links, { title: '', url: '', type: 'documentation' }]);
    };

    const removeLink = (index) => {
        const newLinks = [...data.links];
        newLinks.splice(index, 1);
        setData('links', newLinks);
    };

    const handleLinkChange = (index, field, value) => {
        const newLinks = [...data.links];
        newLinks[index][field] = value;
        setData('links', newLinks);
    };

    const addPrice = () => {
        setData('prices', [...data.prices, { price: 0, currency: 'IDR', price_type: 'purchase', effective_date: '', notes: '', is_current: true }]);
    };

    const removePrice = (index) => {
        const newPrices = [...data.prices];
        newPrices.splice(index, 1);
        setData('prices', newPrices);
    };

    const handlePriceChange = (index, field, value) => {
        const newPrices = [...data.prices];
        newPrices[index][field] = value;
        setData('prices', newPrices);
    };

    const formatIDR = (amount) => {
        if (!amount || isNaN(amount)) return 'Rp 0';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <h2 className="text-white font-semibold text-lg flex items-center gap-2">
                    {editId ? (
                        <>
                            <Edit size={20} />
                            Edit Equipment
                        </>
                    ) : (
                        <>
                            <Plus size={20} />
                            Tambah Equipment Baru
                        </>
                    )}
                </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Kode Equipment <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="code"
                            value={data.code}
                            onChange={handleChange}
                            required
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent transition ${
                                equipments.some(e => e.code === data.code && e.id !== editId) 
                                ? 'border-red-500 bg-red-50 focus:ring-red-500/20' 
                                : 'border-gray-300 focus:ring-blue-500'
                            }`}
                            placeholder="Contoh: LAB-001"
                        />
                        {equipments.some(e => e.code === data.code && e.id !== editId) && (
                            <p className="text-red-600 text-[10px] mt-1 font-bold flex items-center gap-1">
                                <AlertCircle size={10} /> Kode sudah digunakan alat lain!
                            </p>
                        )}
                        {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nama Equipment <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="Masukkan nama peralatan"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Kategori <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="category_id"
                            value={data.category_id}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        >
                            <option value="">Pilih Kategori</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tipe <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="type"
                            value={data.type}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="Contoh: Digital"
                        />
                        {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                        </label>
                        <select
                            name="status"
                            value={data.status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        >
                            <option value="active">Aktif</option>
                            <option value="inactive">Tidak Aktif</option>
                            <option value="maintenance">Perawatan</option>
                            <option value="retired">Pensiun</option>
                        </select>
                        {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
                    </div>
                    <div className="col-span-full border-t border-gray-100 pt-6 mt-2">
                        <div className="flex items-center justify-between mb-4">
                            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Banknote size={18} className="text-green-600" />
                                Informasi Harga (Pembelian, Sewa, Perawatan)
                            </label>
                            <button
                                type="button"
                                onClick={addPrice}
                                className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                            >
                                <Plus size={16} />
                                Tambah Harga
                            </button>
                        </div>
                        
                        <div className="space-y-3">
                            {(!data.prices || data.prices.length === 0) && (
                                <p className="text-sm text-gray-400 italic">Belum ada informasi harga yang ditambahkan.</p>
                            )}
                            {data.prices?.map((price, index) => (
                                <div key={index} className="flex flex-col md:flex-row gap-3 bg-green-50/30 p-4 rounded-xl border border-green-100">
                                    <div className="flex-1">
                                        <label className="block text-[10px] uppercase text-gray-500 mb-1">Harga</label>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={price.price || 0}
                                            onChange={(e) => handlePriceChange(index, 'price', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 transition"
                                        />
                                        <div className="mt-1 text-[10px] text-green-700 font-bold bg-green-100/50 px-2 py-0.5 rounded-md w-fit">
                                            {formatIDR(price.price)}
                                        </div>
                                    </div>
                                    <div className="w-full md:w-40">
                                        <label className="block text-[10px] uppercase text-gray-500 mb-1">Tipe Harga</label>
                                        <select
                                            value={price.price_type || 'purchase'}
                                            onChange={(e) => handlePriceChange(index, 'price_type', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 transition"
                                        >
                                            <option value="purchase">Pembelian</option>
                                            <option value="rental">Sewa</option>
                                            <option value="maintenance">Perawatan</option>
                                            <option value="subscription">Langganan</option>
                                        </select>
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-[10px] uppercase text-gray-500 mb-1">Tanggal Efektif</label>
                                        <input
                                            type="date"
                                            value={price.effective_date || ''}
                                            onChange={(e) => handlePriceChange(index, 'effective_date', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 transition"
                                        />
                                    </div>
                                    <div className="flex items-end pb-1">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={price.is_current}
                                                onChange={(e) => handlePriceChange(index, 'is_current', e.target.checked)}
                                                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                            />
                                            <span className="text-xs text-gray-600">Aktif</span>
                                        </label>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removePrice(index)}
                                        className="mt-6 md:mt-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition shrink-0 self-end md:self-center"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-full border-t border-gray-100 pt-6 mt-2">
                        <div className="flex items-center justify-between mb-4">
                            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                <LinkIcon size={18} className="text-blue-600" />
                                Link Eksternal (Manual, Video, Dokumentasi)
                            </label>
                            <button
                                type="button"
                                onClick={addLink}
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                            >
                                <Plus size={16} />
                                Tambah Link
                            </button>
                        </div>
                        
                        <div className="space-y-3">
                            {(!data.links || data.links.length === 0) && (
                                <p className="text-sm text-gray-400 italic">Belum ada link eksternal yang ditambahkan.</p>
                            )}
                            {data.links?.map((link, index) => (
                                <div key={index} className="flex flex-col md:flex-row gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Judul Link (misal: Manual Book)"
                                            value={link.title || ''}
                                            onChange={(e) => handleLinkChange(index, 'title', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 transition"
                                        />
                                    </div>
                                    <div className="flex-[2]">
                                        <input
                                            type="text"
                                            placeholder="URL (https://...)"
                                            value={link.url || ''}
                                            onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 transition"
                                        />
                                    </div>
                                    <div className="w-full md:w-40">
                                        <select
                                            value={link.type || 'documentation'}
                                            onChange={(e) => handleLinkChange(index, 'type', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 transition"
                                        >
                                            <option value="documentation">Dokumentasi</option>
                                            <option value="video">Video</option>
                                            <option value="manual">Panduan</option>
                                            <option value="other">Lainnya</option>
                                        </select>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeLink(index)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition shrink-0"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-full border-t border-gray-100 pt-6 mt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Gambar Equipment
                        </label>
                        <ImageUploader
                            key={editId || 'new'}
                            existingImages={editId ? equipments.find(e => e.id === editId)?.images || [] : []}
                            onImagesChange={(files) => setData('images', files)}
                        />
                    </div>
                </div>
                <div className="flex gap-3 mt-6">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
                    >
                        {processing ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Menyimpan...
                            </>
                        ) : (
                            <>{editId ? 'Update Equipment' : 'Simpan Equipment'}</>
                        )}
                    </button>
                    {editId && (
                        <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                        >
                            Batal
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default EquipmentForm;
