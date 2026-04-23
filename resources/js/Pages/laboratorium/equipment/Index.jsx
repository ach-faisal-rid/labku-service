import React, { useState, useEffect } from 'react';
import { router, usePage, Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import AppShell from '../../../components/layouts/AppShell';
import { Package, RefreshCw, CheckCircle, Wrench, Archive, AlertCircle, Download, Upload, History } from 'lucide-react';

// Components
import EquipmentStats from '../../../components/laboratorium/equipment/EquipmentStats';
import EquipmentForm from '../../../components/laboratorium/equipment/EquipmentForm';
import EquipmentTable from '../../../components/laboratorium/equipment/EquipmentTable';
import EquipmentLightbox from '../../../components/laboratorium/equipment/EquipmentLightbox';
import EquipmentDeleteModal from '../../../components/laboratorium/equipment/EquipmentDeleteModal';
import EquipmentQRCodeModal from '../../../components/laboratorium/equipment/EquipmentQRCodeModal';
import EquipmentImportModal from '../../../components/laboratorium/equipment/EquipmentImportModal';
import EquipmentHistoryModal from '../../../components/laboratorium/equipment/EquipmentHistoryModal';

const EquipmentManagement = () => {
    const { equipments = [], categories = [] } = usePage().props;

    // UI State
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [editId, setEditId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [equipmentToDelete, setEquipmentToDelete] = useState(null);
    const [showQRModal, setShowQRModal] = useState(false);
    const [equipmentForQR, setEquipmentForQR] = useState(null);
    const [showImportModal, setShowImportModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [activities, setActivities] = useState(() => {
        const saved = localStorage.getItem('equipment_activities');
        return saved ? JSON.parse(saved) : [];
    });

    const addActivity = (action, details) => {
        const newActivity = {
            id: Date.now(),
            action,
            details,
            timestamp: new Date().toISOString()
        };
        const updated = [newActivity, ...activities].slice(0, 50);
        setActivities(updated);
        localStorage.setItem('equipment_activities', JSON.stringify(updated));
    };

    // Lightbox State
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImages, setLightboxImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Form State
    const { data, setData, post, transform, reset, clearErrors, processing, errors, delete: destroy } = useForm({
        code: '',
        name: '',
        category_id: '',
        type: '',
        status: 'active',
        images: [],
        links: [],
        prices: []
    });

    // Lightbox Handlers
    const openLightbox = (images, index = 0) => {
        if (!images || images.length === 0) return;
        setLightboxImages(images);
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setLightboxOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);


    const nextImage = (e) => {
        e?.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % lightboxImages.length);
    };

    const prevImage = (e) => {
        e?.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
    };

    // Form Handlers
    const handleSubmit = (e) => {
        e.preventDefault();

        if (editId) {
            transform((data) => ({ ...data, _method: 'put' }));
            post(`/laboratorium/equipment/${editId}`, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Berhasil', { description: 'Equipment berhasil diupdate' });
                    addActivity('Update', `Mengubah data ${data.name}`);
                    resetForm();
                    handleRefresh();
                },
                onError: (errors) => {
                    console.error('Update error:', errors);
                    toast.error('Gagal', { description: 'Periksa kembali inputan Anda' });
                }
            });
        } else {
            transform((data) => ({ ...data, _method: undefined }));
            post('/laboratorium/equipment', {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Berhasil', { description: 'Equipment berhasil ditambahkan' });
                    addActivity('Tambah', `Menambahkan alat baru: ${data.name}`);
                    resetForm();
                    handleRefresh();
                },
                onError: (errors) => {
                    console.error('Create error:', errors);
                    toast.error('Gagal', { description: 'Periksa kembali inputan Anda' });
                }
            });
        }
    };

    const handleEdit = (equipment) => {
        setEditId(equipment.id);
        setData({
            code: equipment.code,
            name: equipment.name,
            category_id: equipment.category_id,
            type: equipment.type,
            status: equipment.status,
            images: [],
            links: (equipment.links || []).map(l => ({
                title: l.title || '',
                url: l.url || '',
                type: l.type || 'documentation'
            })),
            prices: (equipment.prices || []).map(p => ({
                price: p.price || 0,
                currency: p.currency || 'IDR',
                price_type: p.price_type || 'purchase',
                effective_date: p.effective_date ? p.effective_date.split('T')[0] : '',
                is_current: !!p.is_current
            }))
        });
        clearErrors();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDuplicate = (equipment) => {
        setEditId(null);
        setData({
            code: '', // Reset code because it's usually unique
            name: `${equipment.name} (Copy)`,
            category_id: equipment.category_id,
            type: equipment.type,
            status: equipment.status,
            images: [],
            links: (equipment.links || []).map(l => ({
                title: l.title || '',
                url: l.url || '',
                type: l.type || 'documentation'
            })),
            prices: (equipment.prices || []).map(p => ({
                price: p.price || 0,
                currency: p.currency || 'IDR',
                price_type: p.price_type || 'purchase',
                effective_date: p.effective_date ? p.effective_date.split('T')[0] : '',
                is_current: !!p.is_current
            }))
        });
        clearErrors();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        addActivity('Duplikat', `Menduplikasi alat ${equipment.name}`);
        toast.info('Mode Duplikasi', { description: 'Silakan isi kode baru untuk alat duplikat ini' });
    };

    const handleDeleteClick = (equipment) => {
        setEquipmentToDelete(equipment);
        setShowDeleteModal(true);
    };

    const handleShowQR = (equipment) => {
        setEquipmentForQR(equipment);
        setShowQRModal(true);
    };

    const handleDeleteConfirm = () => {
        const name = equipmentToDelete?.name;
        destroy(`/laboratorium/equipment/${equipmentToDelete.id}`, {
            onSuccess: () => {
                toast.success('Berhasil', { description: 'Equipment berhasil dihapus' });
                addActivity('Hapus', `Menghapus alat: ${name}`);
                setShowDeleteModal(false);
                setEquipmentToDelete(null);
                handleRefresh();
            },
            onError: () => {
                toast.error('Gagal', { description: 'Terjadi kesalahan saat menghapus data' });
            }
        });
    };

    const resetForm = () => {
        setEditId(null);
        reset();
        clearErrors();
    };

    const handleRefresh = () => {
        setIsLoading(true);
        router.reload({
            only: ['equipments', 'categories'],
            onFinish: () => setIsLoading(false)
        });
    };

    const exportToMarkdown = () => {
        let md = '# Daftar Equipment Laboratorium\n\n';
        md += '| Kode | Nama | Kategori | Tipe | Status | Harga Terakhir |\n';
        md += '|------|------|----------|------|--------|----------------|\n';
        
        equipments.forEach(eq => {
            const catName = getCategoryName(eq.category_id);
            const currentPrice = eq.prices?.find(p => p.is_current) || eq.prices?.[0];
            const priceStr = currentPrice ? `IDR ${new Intl.NumberFormat('id-ID').format(currentPrice.price)}` : '-';
            md += `| ${eq.code} | ${eq.name} | ${catName} | ${eq.type} | ${eq.status} | ${priceStr} |\n`;
        });

        const blob = new Blob([md], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Equipment_Export_${new Date().toISOString().split('T')[0]}.md`;
        a.click();
        addActivity('Export', 'Mengekspor data ke format Markdown');
        toast.success('Export Berhasil');
    };

    const handleImportSuccess = (count) => {
        addActivity('Import', `Mengimpor ${count} data dari Markdown`);
        handleRefresh();
    };

    // Logic Helpers
    const filteredEquipments = equipments.filter(equipment => {
        const matchesSearch = equipment.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            equipment.code?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || equipment.category_id?.toString() === selectedCategory;
        const matchesStatus = !selectedStatus || equipment.status === selectedStatus;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredEquipments.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredEquipments.length / itemsPerPage);

    // Pagination Safety
    useEffect(() => {
        if (currentPage > 1 && currentItems.length === 0) {
            setCurrentPage(prev => Math.max(prev - 1, 1));
        }
    }, [filteredEquipments, currentPage, currentItems.length]);

    const getStatusConfig = (status) => {
        const configs = {
            active: { label: 'Aktif', color: 'bg-green-100 text-green-800', icon: CheckCircle },
            inactive: { label: 'Tidak Aktif', color: 'bg-gray-100 text-gray-800', icon: Archive },
            maintenance: { label: 'Perawatan', color: 'bg-yellow-100 text-yellow-800', icon: Wrench },
            retired: { label: 'Pensiun', color: 'bg-red-100 text-red-800', icon: AlertCircle }
        };
        return configs[status] || configs.active;
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : '-';
    };

    const stats = {
        total: equipments.length,
        active: equipments.filter(e => e.status === 'active').length,
        maintenance: equipments.filter(e => e.status === 'maintenance').length,
        inactive: equipments.filter(e => e.status === 'inactive').length
    };

    return (
        <AppShell>
            <Head title="Manajemen Equipment" />
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    {/* Header Card */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-8">
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
                            <div className="flex items-center gap-5">
                                <div className="p-4 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
                                    <Package className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                                        Manajemen <span className="text-blue-600">Equipment</span>
                                    </h1>
                                    <p className="text-gray-500 font-medium">Kelola inventaris peralatan laboratorium Anda.</p>
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                                <button
                                    onClick={() => setShowHistoryModal(true)}
                                    className="flex items-center gap-2 px-4 py-2 text-indigo-600 bg-white rounded-xl hover:bg-indigo-50 transition-all shadow-sm font-bold text-sm border border-gray-100"
                                >
                                    <History size={16} />
                                    <span>Riwayat</span>
                                </button>
                                <button
                                    onClick={() => setShowImportModal(true)}
                                    className="flex items-center gap-2 px-4 py-2 text-green-600 bg-white rounded-xl hover:bg-green-50 transition-all shadow-sm font-bold text-sm border border-gray-100"
                                >
                                    <Upload size={16} />
                                    <span>Import</span>
                                </button>
                                <button
                                    onClick={exportToMarkdown}
                                    className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-white rounded-xl hover:bg-blue-50 transition-all shadow-sm font-bold text-sm border border-gray-100"
                                >
                                    <Download size={16} />
                                    <span>Export</span>
                                </button>
                                <div className="w-[1px] h-8 bg-gray-200 mx-1 hidden sm:block"></div>
                                <button
                                    onClick={handleRefresh}
                                    disabled={isLoading}
                                    className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white rounded-xl hover:bg-gray-100 transition-all disabled:opacity-50 shadow-sm font-bold text-sm border border-gray-100"
                                >
                                    <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
                                    <span>Refresh</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <EquipmentStats stats={stats} />

                    <EquipmentForm 
                        key={editId || 'new'}
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        handleSubmit={handleSubmit}
                        editId={editId}
                        handleCancelEdit={resetForm}
                        categories={categories}
                        equipments={equipments}
                    />

                    <EquipmentTable 
                        equipments={filteredEquipments}
                        categories={categories}
                        isLoading={isLoading}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        selectedStatus={selectedStatus}
                        setSelectedStatus={setSelectedStatus}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                        currentItems={currentItems}
                        indexOfFirstItem={indexOfFirstItem}
                        indexOfLastItem={indexOfLastItem}
                        handleEdit={handleEdit}
                        handleDuplicate={handleDuplicate}
                        handleDeleteClick={handleDeleteClick}
                        handleShowQR={handleShowQR}
                        getStatusConfig={getStatusConfig}
                        getCategoryName={getCategoryName}
                        openLightbox={openLightbox}
                    />
                </div>
            </div>

            <EquipmentDeleteModal 
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                equipmentName={equipmentToDelete?.name}
                processing={processing}
            />

            <EquipmentLightbox 
                isOpen={lightboxOpen}
                images={lightboxImages}
                currentIndex={currentImageIndex}
                onClose={() => setLightboxOpen(false)}
                onNext={nextImage}
                onPrev={prevImage}
                onSelectIndex={setCurrentImageIndex}
            />

            <EquipmentQRCodeModal 
                isOpen={showQRModal}
                onClose={() => setShowQRModal(false)}
                equipment={equipmentForQR}
            />

            <EquipmentImportModal 
                isOpen={showImportModal}
                onClose={() => setShowImportModal(false)}
                categories={categories}
                onSuccess={handleImportSuccess}
            />

            <EquipmentHistoryModal 
                isOpen={showHistoryModal}
                onClose={() => setShowHistoryModal(false)}
                activities={activities}
                onClear={() => {
                    setActivities([]);
                    localStorage.removeItem('equipment_activities');
                }}
            />
        </AppShell>
    );
};

export default EquipmentManagement;