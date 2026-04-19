import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import AppShell from '../../../components/layouts/AppShell';

const CategoryIndex = () => {
    const { categories: initialCategories } = usePage().props;
    const [categories, setCategories] = useState(initialCategories);
    const [form, setForm] = useState({
        name: '',
        description: ''
    });
    const [editId, setEditId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Handle input change
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // Handle submit (create or update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            if (editId) {
                // Update category - menggunakan Inertia
                router.put(`/laboratorium/category/${editId}`, form, {
                    onSuccess: () => {
                        setMessage('Kategori berhasil diupdate');
                        setForm({ name: '', description: '' });
                        setEditId(null);
                        setTimeout(() => setMessage(''), 3000);
                        // Refresh data
                        router.reload({ only: ['categories'] });
                    },
                    onError: (errors) => {
                        setMessage(Object.values(errors).join(', '));
                    }
                });
            } else {
                // Create category - menggunakan Inertia
                router.post('/laboratorium/category', form, {
                    onSuccess: () => {
                        setMessage('Kategori berhasil ditambahkan');
                        setForm({ name: '', description: '' });
                        setTimeout(() => setMessage(''), 3000);
                        // Refresh data
                        router.reload({ only: ['categories'] });
                    },
                    onError: (errors) => {
                        setMessage(Object.values(errors).join(', '));
                    }
                });
            }
        } catch (error) {
            setMessage('Terjadi kesalahan');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle edit
    const handleEdit = (category) => {
        setEditId(category.id);
        setForm({
            name: category.name,
            description: category.description || ''
        });
    };

    // Handle delete
    const handleDelete = (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
            setIsLoading(true);
            router.delete(`/laboratorium/category/${id}`, {
                onSuccess: () => {
                    setMessage('Kategori berhasil dihapus');
                    setTimeout(() => setMessage(''), 3000);
                    router.reload({ only: ['categories'] });
                },
                onError: (errors) => {
                    setMessage('Gagal menghapus kategori');
                    console.error(errors);
                },
                onFinish: () => {
                    setIsLoading(false);
                }
            });
        }
    };

    return (
        <AppShell title="manajemen kategori">

            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Manajemen Kategori</h1>
                
                {/* Alert Message */}
                {message && (
                    <div className={`mb-4 p-3 rounded ${
                        message.includes('berhasil') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                        {message}
                    </div>
                )}
                
                {/* Form */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                        {editId ? 'Edit Kategori' : 'Tambah Kategori Baru'}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Nama Kategori *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Masukkan nama kategori"
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Deskripsi
                            </label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Masukkan deskripsi kategori (opsional)"
                            />
                        </div>
                        
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                            >
                                {isLoading ? 'Processing...' : (editId ? 'Update' : 'Simpan')}
                            </button>
                            
                            {editId && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditId(null);
                                        setForm({ name: '', description: '' });
                                    }}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                >
                                    Batal
                                </button>
                            )}
                        </div>
                    </form>
                </div>
                
                {/* Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <h2 className="text-xl font-semibold p-6 pb-0">Daftar Kategori</h2>
                    {isLoading && categories.length === 0 ? (
                        <div className="p-6 text-center">Loading...</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nama
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Slug
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Deskripsi
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {categories.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                                Belum ada data kategori
                                            </td>
                                        </tr>
                                    ) : (
                                        categories.map((category) => (
                                            <tr key={category.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {category.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {category.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {category.slug}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {category.description || '-'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button
                                                        onClick={() => handleEdit(category)}
                                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(category.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
};

export default CategoryIndex;