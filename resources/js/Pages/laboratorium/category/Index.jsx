// pages/laboratorium/categories/index.js
import React, { useState } from 'react';
import { router, usePage, Head } from '@inertiajs/react';
import { toast } from 'sonner';
import AppShell from '../../../components/layouts/AppShell';
import CategoryForm from '../../../components/laboratorium/categories/CategoryForm';
import CategoryTable from '../../../components/laboratorium/categories/CategoryTable';
import DeleteConfirmationDialog from '../../../components/laboratorium/categories/DeleteConfirmationDialog';

const CategoryIndex = () => {
  const { categories: initialCategories } = usePage().props;
  const [categories, setCategories] = useState(initialCategories);
  const [form, setForm] = useState({
    name: '',
    description: ''
  });
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

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
    
    if (editId) {
      router.put(`/laboratorium/category/${editId}`, form, {
        onSuccess: () => {
          toast.success('Kategori berhasil diupdate', {
            description: `Kategori "${form.name}" telah diperbarui`,
            duration: 3000,
          });
          resetForm();
          router.reload({ only: ['categories'] });
        },
        onError: (errors) => {
          toast.error('Gagal mengupdate kategori', {
            description: Object.values(errors).join(', '),
            duration: 4000,
          });
        },
        onFinish: () => setIsLoading(false)
      });
    } else {
      router.post('/laboratorium/category', form, {
        onSuccess: () => {
          toast.success('Kategori berhasil ditambahkan', {
            description: `Kategori "${form.name}" telah ditambahkan`,
            duration: 3000,
          });
          resetForm();
          router.reload({ only: ['categories'] });
        },
        onError: (errors) => {
          toast.error('Gagal menambahkan kategori', {
            description: Object.values(errors).join(', '),
            duration: 4000,
          });
        },
        onFinish: () => setIsLoading(false)
      });
    }
  };

  // Reset form
  const resetForm = () => {
    setForm({ name: '', description: '' });
    setEditId(null);
  };

  // Handle edit
  const handleEdit = (category) => {
    setEditId(category.id);
    setForm({
      name: category.name,
      description: category.description || ''
    });
    document.getElementById('category-form')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
    
    toast.info('Mode Edit', {
      description: `Sedang mengedit kategori "${category.name}"`,
      duration: 2000,
    });
  };

  // Handle delete confirmation
  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  // Handle delete
  const handleDelete = () => {
    if (!categoryToDelete) return;
    
    setIsLoading(true);
    router.delete(`/laboratorium/category/${categoryToDelete.id}`, {
      onSuccess: () => {
        toast.success('Kategori berhasil dihapus', {
          description: `Kategori "${categoryToDelete.name}" telah dihapus`,
          duration: 3000,
        });
        router.reload({ only: ['categories'] });
        setDeleteDialogOpen(false);
        setCategoryToDelete(null);
        setIsLoading(false);
      },
      onError: (errors) => {
        toast.error('Gagal menghapus kategori', {
          description: 'Terjadi kesalahan saat menghapus data',
          duration: 4000,
        });
        console.error(errors);
        setIsLoading(false);
      }
    });
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    if (editId) {
      toast('Edit dibatalkan', {
        description: 'Perubahan tidak disimpan',
        duration: 2000,
      });
    }
    setEditId(null);
    setForm({ name: '', description: '' });
  };

  return (
    <AppShell>
      <Head title="Manajemen Kategori" />
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manajemen Kategori</h1>
            <p className="text-muted-foreground mt-2">
              Kelola kategori laboratorium Anda
            </p>
          </div>
        </div>
        
        {/* Category Form */}
        <CategoryForm 
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={handleCancelEdit}
          isLoading={isLoading}
          editId={editId}
        />
        
        {/* Category Table */}
        <CategoryTable 
          categories={categories}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog 
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        category={categoryToDelete}
        onConfirm={handleDelete}
        isLoading={isLoading}
      />
    </AppShell>
  );
};

export default CategoryIndex;