import React from 'react';
import { User as UserIcon, Building, Phone, Shield as ShieldIcon, Mail, MapPin, Tag, X } from 'lucide-react';

const CustomerForm = ({ data, setData, errors, processing, editMode, onCancel, onSubmit, tagInput, setTagInput, addTag, removeTag }) => {
    return (
        <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-50">
                <h2 className="text-lg font-bold text-gray-900">
                    {editMode ? 'Edit Data Pelanggan' : 'Tambah Pelanggan Baru'}
                </h2>
                <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 text-sm font-medium">Batal</button>
            </div>
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nama Lengkap *</label>
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                required
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                                placeholder="Contoh: Budi Santoso"
                            />
                        </div>
                        {errors.name && <p className="mt-1 text-xs text-red-500 font-medium">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Perusahaan / Institusi</label>
                        <div className="relative">
                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={data.company}
                                onChange={e => setData('company', e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                                placeholder="Nama PT atau Laboratorium"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Telepon</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="tel"
                                    value={data.phone}
                                    onChange={e => setData('phone', e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                                    placeholder="0812..."
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Status Membership</label>
                            <div className="relative">
                                <ShieldIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <select
                                    value={data.membership_status}
                                    onChange={e => setData('membership_status', e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition appearance-none bg-white"
                                >
                                    <option value="Bronze">Bronze Member</option>
                                    <option value="Silver">Silver Member</option>
                                    <option value="Gold">Gold Member</option>
                                    <option value="Platinum">Platinum Member</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                                placeholder="alamat@email.com"
                            />
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Alamat Lengkap</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <textarea
                                rows="3"
                                value={data.address}
                                onChange={e => setData('address', e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition resize-none"
                                placeholder="Masukkan alamat pengiriman atau domisili..."
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Tags / Label (Tekan Enter)</label>
                        <div className="relative">
                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={tagInput}
                                onChange={e => setTagInput(e.target.value)}
                                onKeyDown={addTag}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                                placeholder="VIP, Corporate, Regular..."
                            />
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {data.tags.map((tag, index) => (
                                <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-lg border border-blue-100">
                                    {tag}
                                    <button type="button" onClick={() => removeTag(index)} className="hover:text-red-500">
                                        <X size={10} />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-8 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 disabled:opacity-50"
                        >
                            {processing ? 'Menyimpan...' : (editMode ? 'Simpan Perubahan' : 'Simpan Pelanggan')}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CustomerForm;
