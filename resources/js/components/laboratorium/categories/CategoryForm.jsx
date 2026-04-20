// components/laboratorium/categories/CategoryForm.js
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, X } from "lucide-react";

const CategoryForm = ({
    form,
    onChange,
    onSubmit,
    onCancel,
    isLoading,
    editId,
}) => {
    return (
        <Card id="category-form">
            <CardHeader>
                <CardTitle>
                    {editId ? "Edit Kategori" : "Tambah Kategori Baru"}
                </CardTitle>
                <CardDescription>
                    {editId
                        ? "Ubah informasi kategori yang sudah ada"
                        : "Isi form di bawah untuk menambahkan kategori baru"}
                </CardDescription>
            </CardHeader>
            <form onSubmit={onSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">
                            Nama Kategori{" "}
                            <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={onChange}
                            required
                            placeholder="Masukkan nama kategori"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Deskripsi</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={onChange}
                            rows="3"
                            placeholder="Masukkan deskripsi kategori (opsional)"
                            disabled={isLoading}
                        />
                    </div>
                </CardContent>

                <CardFooter className="flex gap-2">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="min-w-[100px]"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {editId ? "Mengupdate..." : "Menyimpan..."}
                            </>
                        ) : (
                            <>{editId ? "Update" : "Simpan"}</>
                        )}
                    </Button>

                    {editId && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            disabled={isLoading}
                        >
                            <X className="mr-2 h-4 w-4" />
                            Batal
                        </Button>
                    )}
                </CardFooter>
            </form>
        </Card>
    );
};

export default CategoryForm;
