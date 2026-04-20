import React, { useState, useEffect } from 'react';
import { router, usePage, Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import AppShell from '../../../components/layouts/AppShell';
import { Package, RefreshCw, CheckCircle, Wrench, Archive, AlertCircle } from 'lucide-react';

// Components
import EquipmentStats from '../../../components/laboratorium/equipment/EquipmentStats';
import EquipmentForm from '../../../components/laboratorium/equipment/EquipmentForm';
import EquipmentTable from '../../../components/laboratorium/equipment/EquipmentTable';
import EquipmentLightbox from '../../../components/laboratorium/equipment/EquipmentLightbox';
import EquipmentDeleteModal from '../../../components/laboratorium/equipment/EquipmentDeleteModal';

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

    const handleDeleteClick = (equipment) => {
        setEquipmentToDelete(equipment);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        destroy(`/laboratorium/equipment/${equipmentToDelete.id}`, {
            onSuccess: () => {
                toast.success('Berhasil', { description: 'Equipment berhasil dihapus' });
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
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen rounded-xl">
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <Package className="w-8 h-8 text-blue-600" />
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                        Manajemen Equipment
                                    </h1>
                                </div>
                                <p className="text-gray-600">Kelola data peralatan laboratorium dengan mudah dan cepat</p>
                            </div>
                            <button
                                onClick={handleRefresh}
                                disabled={isLoading}
                                className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50"
                            >
                                <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
                                Refresh
                            </button>
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
                        handleDeleteClick={handleDeleteClick}
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
        </AppShell>
    );
};

export default EquipmentManagement;