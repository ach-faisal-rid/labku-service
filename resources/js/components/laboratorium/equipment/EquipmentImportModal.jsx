import React, { useState } from 'react';
import { X, Upload, FileText, AlertCircle, CheckCircle2, Play } from 'lucide-react';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';

const EquipmentImportModal = ({ isOpen, onClose, categories, onSuccess }) => {
    const [markdown, setMarkdown] = useState('');
    const [preview, setPreview] = useState([]);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    if (!isOpen) return null;

    const parseMarkdownTable = (text) => {
        try {
            const lines = text.trim().split('\n');
            const tableLines = lines.filter(line => line.includes('|'));
            
            if (tableLines.length < 3) {
                throw new Error('Format tabel Markdown tidak valid atau terlalu sedikit data.');
            }

            // Headers are in tableLines[0]
            // Separator is tableLines[1]
            // Data starts from tableLines[2]
            const headers = tableLines[0].split('|').map(h => h.trim()).filter(Boolean);
            const dataRows = tableLines.slice(2);

            const items = dataRows.map(row => {
                const cells = row.split('|').map(c => c.trim()).filter(Boolean);
                if (cells.length < 3) return null;

                // Map standard headers (case-insensitive)
                const item = {};
                headers.forEach((header, index) => {
                    const h = header.toLowerCase();
                    const val = cells[index];
                    if (h.includes('kode')) item.code = val;
                    else if (h.includes('nama')) item.name = val;
                    else if (h.includes('tipe')) item.type = val;
                    else if (h.includes('status')) item.status = val.toLowerCase() || 'active';
                    else if (h.includes('kategori')) {
                        const cat = categories.find(c => c.name.toLowerCase() === val.toLowerCase());
                        item.category_id = cat ? cat.id : (categories[0]?.id || null);
                        item.category_name = cat ? cat.name : 'Unknown';
                    }
                });

                // Default values if missing
                if (!item.status) item.status = 'active';
                if (!item.type) item.type = 'Standard';
                if (!item.category_id && categories.length > 0) item.category_id = categories[0].id;

                return item;
            }).filter(Boolean);

            if (items.length === 0) throw new Error('Tidak ada data yang bisa dibaca.');
            return items;
        } catch (err) {
            throw err;
        }
    };

    const handlePreview = () => {
        try {
            setError(null);
            const items = parseMarkdownTable(markdown);
            setPreview(items);
        } catch (err) {
            setError(err.message);
            setPreview([]);
        }
    };

    const handleImport = () => {
        if (preview.length === 0) return;

        setProcessing(true);
        router.post('/laboratorium/equipment/bulk', { items: preview }, {
            onSuccess: () => {
                toast.success(`Berhasil mengimpor ${preview.length} alat`);
                onSuccess(preview.length);
                onClose();
                setMarkdown('');
                setPreview([]);
            },
            onError: (err) => {
                setError('Gagal mengimpor. Pastikan Kode Alat unik dan belum ada di sistem.');
                setProcessing(false);
            },
            onFinish: () => setProcessing(false)
        });
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                            <Upload size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Import Data Markdown</h3>
                            <p className="text-xs text-gray-500">Paste tabel Markdown untuk import masal</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                    {/* Input Area */}
                    <div className="flex-1 flex flex-col p-6 border-r border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Markdown Table</label>
                            <button 
                                onClick={() => setMarkdown('| Kode | Nama | Kategori | Tipe | Status |\n|------|------|----------|------|--------|\n| E001 | Lab Bench | Category | Fixed | active |')}
                                className="text-[10px] text-blue-600 font-bold hover:underline"
                            >
                                Contoh Format
                            </button>
                        </div>
                        <textarea
                            className="flex-1 w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm resize-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                            placeholder="Paste tabel markdown di sini..."
                            value={markdown}
                            onChange={(e) => setMarkdown(e.target.value)}
                        />
                        <button
                            onClick={handlePreview}
                            className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all active:scale-95"
                        >
                            <Play size={18} />
                            Pratinjau Data
                        </button>
                    </div>

                    {/* Preview Area */}
                    <div className="flex-1 flex flex-col p-6 bg-gray-50/50 overflow-hidden">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Preview ({preview.length} data)</label>
                        
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg flex items-center gap-2 text-sm">
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}

                        <div className="flex-1 overflow-y-auto bg-white border border-gray-100 rounded-xl shadow-inner">
                            {preview.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-300">
                                    <FileText size={48} className="mb-2 opacity-20" />
                                    <p className="text-sm">Klik Pratinjau untuk melihat data</p>
                                </div>
                            ) : (
                                <table className="w-full text-xs">
                                    <thead className="bg-gray-50 sticky top-0 border-b border-gray-100">
                                        <tr>
                                            <th className="px-3 py-2 text-left">Kode</th>
                                            <th className="px-3 py-2 text-left">Nama</th>
                                            <th className="px-3 py-2 text-left">Kategori</th>
                                            <th className="px-3 py-2 text-left">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {preview.map((item, i) => (
                                            <tr key={i} className="hover:bg-blue-50/50">
                                                <td className="px-3 py-2 font-mono text-blue-600">{item.code}</td>
                                                <td className="px-3 py-2 font-medium">{item.name}</td>
                                                <td className="px-3 py-2 text-gray-500">{item.category_name}</td>
                                                <td className="px-3 py-2">
                                                    <span className="px-2 py-0.5 bg-gray-100 rounded-full text-[10px]">
                                                        {item.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-gray-400">
                        <CheckCircle2 size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Validasi Otomatis Aktif</span>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all text-sm"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleImport}
                            disabled={preview.length === 0 || processing}
                            className="px-8 py-2 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all active:scale-95 text-sm disabled:opacity-50 disabled:scale-100 shadow-lg shadow-green-200"
                        >
                            {processing ? 'Memproses...' : 'Import Sekarang'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EquipmentImportModal;
