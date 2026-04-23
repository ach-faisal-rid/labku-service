import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppShell from '@/components/layouts/AppShell';
import { toast } from 'sonner';
import { Store, MapPin, Phone, Mail, Printer, Save, Maximize, Minimize } from 'lucide-react';

const SettingsIndex = ({ settings = {} }) => {
    const { data, setData, post, processing } = useForm({
        settings: {
            store_name: settings.store_name || 'LABKU',
            store_address: settings.store_address || '',
            store_phone: settings.store_phone || '',
            store_email: settings.store_email || '',
            receipt_width: settings.receipt_width || '80',
            receipt_footer: settings.receipt_footer || 'Terima kasih atas kepercayaan Anda!',
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/settings', {
            onSuccess: () => toast.success('Pengaturan berhasil diperbarui!'),
        });
    };

    return (
        <AppShell>
            <Head title="Pengaturan Bisnis" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Pengaturan <span className="text-blue-600">Bisnis</span></h1>
                        <p className="text-gray-500 mt-2 font-medium">Kelola informasi toko dan preferensi cetak nota Anda.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Store Info Card */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-50 flex items-center gap-3 bg-gray-50/30">
                                <div className="p-2 bg-blue-100 rounded-xl text-blue-600">
                                    <Store size={20} />
                                </div>
                                <h2 className="text-lg font-bold text-gray-900">Informasi Toko</h2>
                            </div>
                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nama Toko</label>
                                        <div className="relative">
                                            <Store className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                                            <input
                                                type="text"
                                                value={data.settings.store_name}
                                                onChange={e => setData('settings', { ...data.settings, store_name: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition bg-gray-50/50 font-medium"
                                                placeholder="Contoh: LABKU Service"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">WhatsApp / Telepon</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                                            <input
                                                type="text"
                                                value={data.settings.store_phone}
                                                onChange={e => setData('settings', { ...data.settings, store_phone: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition bg-gray-50/50 font-medium"
                                                placeholder="Contoh: 0812-3456-7890"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Toko</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                                            <input
                                                type="email"
                                                value={data.settings.store_email}
                                                onChange={e => setData('settings', { ...data.settings, store_email: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition bg-gray-50/50 font-medium"
                                                placeholder="Contoh: hello@labku.id"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Alamat Lengkap</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 text-gray-300 w-4 h-4" />
                                            <textarea
                                                rows="1"
                                                value={data.settings.store_address}
                                                onChange={e => setData('settings', { ...data.settings, store_address: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition bg-gray-50/50 font-medium resize-none"
                                                placeholder="Masukkan alamat toko..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Print Preferences Card */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-50 flex items-center gap-3 bg-gray-50/30">
                                <div className="p-2 bg-purple-100 rounded-xl text-purple-600">
                                    <Printer size={20} />
                                </div>
                                <h2 className="text-lg font-bold text-gray-900">Preferensi Cetak Nota</h2>
                            </div>
                            <div className="p-8 space-y-8">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Ukuran Kertas (Lebar mm)</label>
                                    <div className="flex gap-4">
                                        {[
                                            { id: '58', label: '58mm (Kecil)', icon: Minimize },
                                            { id: '80', label: '80mm (Standar)', icon: Maximize }
                                        ].map(size => (
                                            <button
                                                key={size.id}
                                                type="button"
                                                onClick={() => setData('settings', { ...data.settings, receipt_width: size.id })}
                                                className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all ${data.settings.receipt_width === size.id ? 'border-purple-600 bg-purple-50 text-purple-700 shadow-sm' : 'border-gray-50 bg-gray-50 text-gray-400 hover:border-gray-200'}`}
                                            >
                                                <size.icon size={18} />
                                                <span className="font-bold text-sm">{size.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Pesan Kaki Nota (Footer)</label>
                                    <textarea
                                        rows="3"
                                        value={data.settings.receipt_footer}
                                        onChange={e => setData('settings', { ...data.settings, receipt_footer: e.target.value })}
                                        className="w-full px-6 py-4 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition bg-gray-50/50 font-medium"
                                        placeholder="Pesan yang akan muncul di bagian paling bawah nota..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 px-10 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition shadow-lg shadow-gray-200 active:scale-95 disabled:opacity-50"
                            >
                                <Save size={20} />
                                <span>Simpan Perubahan</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppShell>
    );
};

export default SettingsIndex;
