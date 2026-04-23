import React, { useState, useEffect, useMemo } from 'react';
import { 
    Plus, 
    Search, 
    ChevronLeft, 
    ChevronRight, 
    Trash 
} from 'lucide-react';
import { router, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import AppShell from '@/components/layouts/AppShell';
import CustomerCardModal from '@/components/service/customer/CustomerCardModal';
import CustomerHistoryModal from '@/components/service/customer/CustomerHistoryModal';
import CustomerForm from '@/components/service/customer/CustomerForm';
import CustomerTable from '@/components/service/customer/CustomerTable';

const Index = ({ customers = [], users = [] }) => {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [selectedIds, setSelectedIds] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

    // Modal States
    const [showCardModal, setShowCardModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [activeCustomer, setActiveCustomer] = useState(null);

    const { data, setData, post, put, reset, errors, processing } = useForm({
        name: '',
        phone: '',
        email: '',
        address: '',
        company: '',
        tags: [],
        membership_status: 'Bronze'
    });

    // Reset pagination when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Filter & Sort data
    const processedData = useMemo(() => {
        let filtered = (customers || []).filter(item =>
            item.name?.toLowerCase().includes(search.toLowerCase()) ||
            item.phone?.includes(search) ||
            item.address?.toLowerCase().includes(search.toLowerCase()) ||
            item.email?.toLowerCase().includes(search.toLowerCase()) ||
            item.company?.toLowerCase().includes(search.toLowerCase())
        );

        if (sortConfig.key) {
            filtered.sort((a, b) => {
                const aVal = a[sortConfig.key] || '';
                const bVal = b[sortConfig.key] || '';
                if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return filtered;
    }, [customers, search, sortConfig]);

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = processedData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(processedData.length / itemsPerPage);

    const handleEdit = (customer) => {
        setEditMode(true);
        setEditId(customer.id);
        setData({
            name: customer.name || '',
            phone: customer.phone || '',
            email: customer.email || '',
            address: customer.address || '',
            company: customer.company || '',
            tags: customer.tags || [],
            membership_status: customer.membership_status || 'Bronze'
        });
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditMode(false);
        setEditId(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) {
            put(`/services/customer/${editId}`, {
                onSuccess: () => {
                    toast.success('Berhasil', { description: 'Data pelanggan berhasil diperbarui' });
                    handleCancel();
                }
            });
        } else {
            post('/services/customer', {
                onSuccess: () => {
                    toast.success('Berhasil', { description: 'Pelanggan baru berhasil ditambahkan' });
                    handleCancel();
                }
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            router.delete(`/services/customer/${id}`, {
                onSuccess: () => {
                    toast.success('Berhasil', { description: 'Data pelanggan berhasil dihapus' });
                    setSelectedIds(prev => prev.filter(item => item !== id));
                }
            });
        }
    };

    const handleBulkDelete = () => {
        if (confirm(`Apakah Anda yakin ingin menghapus ${selectedIds.length} pelanggan terpilih?`)) {
            router.post('/services/customer/bulk-delete', { ids: selectedIds }, {
                onSuccess: () => {
                    toast.success('Berhasil', { description: `${selectedIds.length} pelanggan berhasil dihapus` });
                    setSelectedIds([]);
                }
            });
        }
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === currentItems.length && currentItems.length > 0) {
            setSelectedIds([]);
        } else {
            setSelectedIds(currentItems.map(item => item.id));
        }
    };

    const toggleSelect = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const addTag = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!data.tags.includes(tagInput.trim())) {
                setData('tags', [...data.tags, tagInput.trim()]);
            }
            setTagInput('');
        }
    };

    const removeTag = (index) => {
        const newTags = [...data.tags];
        newTags.splice(index, 1);
        setData('tags', newTags);
    };

    const handleShowCard = (customer) => {
        setActiveCustomer(customer);
        setShowCardModal(true);
    };

    const handleShowHistory = (customer) => {
        setActiveCustomer(customer);
        setShowHistoryModal(true);
    };

    return (
        <AppShell>
            <div className="min-h-screen bg-gray-50/50">
                {/* Header Section */}
                <div className="bg-white border-b shadow-sm sticky top-0 z-10">
                    <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Data Pelanggan</h1>
                                <p className="mt-1 text-sm text-gray-500">Kelola informasi kontak dan profil pelanggan Anda</p>
                            </div>
                            {!showForm && (
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="flex items-center justify-center gap-2 px-4 py-2 text-white transition bg-blue-600 rounded-xl hover:bg-blue-700 shadow-sm active:scale-95"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span className="font-semibold">Tambah Pelanggan</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Form Section */}
                    {showForm && (
                        <CustomerForm 
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            editMode={editMode}
                            onCancel={handleCancel}
                            onSubmit={handleSubmit}
                            tagInput={tagInput}
                            setTagInput={setTagInput}
                            addTag={addTag}
                            removeTag={removeTag}
                        />
                    )}

                    {/* Table Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Search Bar */}
                        <div className="p-4 border-b border-gray-50 bg-gray-50/30">
                            <div className="relative max-w-md">
                                <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                                <input
                                    type="text"
                                    placeholder="Cari berdasarkan nama, telepon, atau perusahaan..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full py-2 pl-10 pr-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition text-sm"
                                />
                            </div>
                        </div>

                        <CustomerTable 
                            currentItems={currentItems}
                            selectedIds={selectedIds}
                            toggleSelectAll={toggleSelectAll}
                            toggleSelect={toggleSelect}
                            handleShowHistory={handleShowHistory}
                            handleShowCard={handleShowCard}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            sortConfig={sortConfig}
                            onSort={handleSort}
                        />

                        {/* Pagination Section */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-50 bg-gray-50/30">
                                <div className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                                    Menampilkan <span className="text-gray-900 font-bold">{indexOfFirstItem + 1} - {Math.min(indexOfLastItem, processedData.length)}</span> Dari <span className="text-gray-900 font-bold">{processedData.length}</span> Data
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
                                                className={`w-8 h-8 rounded-lg text-xs font-bold transition ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-400 hover:bg-white'}`}
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
                </div>

                {/* Modals */}
                <CustomerCardModal
                    isOpen={showCardModal}
                    onClose={() => setShowCardModal(false)}
                    customer={activeCustomer}
                />
                <CustomerHistoryModal
                    isOpen={showHistoryModal}
                    onClose={() => setShowHistoryModal(false)}
                    customer={activeCustomer}
                />

                {/* Bulk Action Bar */}
                {selectedIds.length > 0 && (
                    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[40] animate-in slide-in-from-bottom-8 duration-300">
                        <div className="bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-6 border border-gray-800">
                            <div className="flex items-center gap-3 pr-6 border-r border-gray-700">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-sm">
                                    {selectedIds.length}
                                </div>
                                <span className="text-sm font-medium text-gray-300 whitespace-nowrap">Pelanggan Terpilih</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleBulkDelete}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all font-bold text-sm"
                                >
                                    <Trash size={16} />
                                    Hapus Massal
                                </button>
                                <button
                                    onClick={() => setSelectedIds([])}
                                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors font-bold text-sm"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
};

export default Index;