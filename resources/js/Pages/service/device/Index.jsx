import React, { useState, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';
import { router, useForm, Head } from '@inertiajs/react';
import { toast } from 'sonner';
import AppShell from '@/components/layouts/AppShell';
import DeviceForm from '@/components/service/device/DeviceForm';
import DeviceTable from '@/components/service/device/DeviceTable';
import ServiceReceipt from '@/components/service/device/ServiceReceipt';

const Index = ({ devices = [], customers = [] }) => {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [printDevice, setPrintDevice] = useState(null);
    const receiptRef = useRef();

    const { data, setData, post, put, reset, errors, processing } = useForm({
        customer_id: '',
        type: 'HP',
        brand: '',
        model: '',
        complaint: '',
        condition_note: '',
        estimated_cost: '',
        technician_note: '',
        cancellation_agreement: false,
        has_warranty: false,
        warranty_cost: 0,
        warranty_note: ''
    });

    const filteredData = devices.filter(item => 
        item.brand?.toLowerCase().includes(search.toLowerCase()) ||
        item.model?.toLowerCase().includes(search.toLowerCase()) ||
        item.customer?.name?.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) {
            put(`/services/device/${editId}`, {
                onSuccess: () => {
                    toast.success('Data perangkat diperbarui!');
                    reset();
                    setShowForm(false);
                    setEditMode(false);
                }
            });
        } else {
            post('/services/device', {
                onSuccess: () => {
                    toast.success('Perangkat berhasil didaftarkan!');
                    reset();
                    setShowForm(false);
                }
            });
        }
    };

    const handleEdit = (device) => {
        setEditId(device.id);
        setEditMode(true);
        setData({
            customer_id: device.customer_id,
            type: device.type,
            brand: device.brand || '',
            model: device.model || '',
            complaint: device.complaint || '',
            condition_note: device.condition_note || '',
            estimated_cost: device.estimated_cost || '',
            technician_note: device.technician_note || '',
            cancellation_agreement: !!device.cancellation_agreement,
            has_warranty: !!device.has_warranty,
            warranty_cost: device.warranty_cost || 0,
            warranty_note: device.warranty_note || ''
        });
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            router.delete(`/services/device/${id}`, {
                onSuccess: () => toast.success('Data perangkat dihapus!')
            });
        }
    };

    const handlePrint = (device) => {
        setPrintDevice(device);
        setTimeout(() => {
            window.print();
        }, 300);
    };

    return (
        <AppShell>
            <Head title="Manajemen Perangkat Service" />
            
            <div className="min-h-screen bg-[#f8fafc] py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
                                Service <span className="text-blue-600">Devices</span>
                            </h1>
                            <p className="text-gray-500 font-medium">Kelola pendaftaran dan status perangkat pelanggan</p>
                        </div>

                        {!showForm && (
                            <button 
                                onClick={() => {
                                    reset();
                                    setEditMode(false);
                                    setShowForm(true);
                                }}
                                className="flex items-center justify-center gap-2 px-6 py-2.5 text-white transition bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl hover:from-blue-700 hover:to-blue-600 shadow-md shadow-blue-200 active:scale-95 animate-in zoom-in duration-300"
                            >
                                <Plus className="w-5 h-5" />
                                <span className="font-bold tracking-wide">Daftarkan Perangkat</span>
                            </button>
                        )}
                    </div>

                    {/* Form Section */}
                    {showForm && (
                        <DeviceForm 
                            data={data}
                            setData={setData}
                            handleSubmit={handleSubmit}
                            handleCancel={() => {
                                setShowForm(false);
                                setEditMode(false);
                                reset();
                            }}
                            editMode={editMode}
                            processing={processing}
                            errors={errors}
                            customers={customers}
                        />
                    )}

                    {/* Table Section */}
                    <DeviceTable 
                        currentItems={currentItems}
                        search={search}
                        setSearch={setSearch}
                        indexOfFirstItem={indexOfFirstItem}
                        indexOfLastItem={indexOfLastItem}
                        filteredData={filteredData}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handlePrint={handlePrint}
                    />
                </div>
            </div>

            {/* Hidden Receipt Area - Visibility managed via CSS media queries */}
            <div>
                <ServiceReceipt ref={receiptRef} device={printDevice} />
            </div>
        </AppShell>
    );
};

export default Index;