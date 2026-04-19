import { useMemo } from 'react';

import { Head, useForm, usePage } from '@inertiajs/react';

import AppShell from '../../components/layouts/AppShell';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

function Field({ label, error, children }) {
    return (
        <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-900">{label}</label>
            {children}
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </div>
    );
}

function Input(props) {
    return (
        <input
            {...props}
            className={[
                'h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm',
                'placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-950',
                props.className || '',
            ].join(' ')}
        />
    );
}

export default function ProfileEdit() {
    const { auth, mustVerifyEmail, status } = usePage().props;
    const user = auth?.user;

    const profileForm = useForm({
        name: user?.name ?? '',
        email: user?.email ?? '',
    });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const deleteForm = useForm({
        password: '',
    });

    const statusMessage = useMemo(() => {
        if (status === 'profile-updated') return 'Profile berhasil diupdate.';
        if (status === 'password-updated') return 'Password berhasil diupdate.';
        return null;
    }, [status]);

    return (
        <AppShell title="Pengaturan Akun">
            <Head title="Profile" />

            {statusMessage ? (
                <div className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                    {statusMessage}
                </div>
            ) : null}

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update nama dan email kamu.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            className="space-y-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                profileForm.patch('/profile', { preserveScroll: true });
                            }}
                        >
                            <Field label="Name" error={profileForm.errors.name}>
                                <Input value={profileForm.data.name} onChange={(e) => profileForm.setData('name', e.target.value)} />
                            </Field>

                            <Field label="Email" error={profileForm.errors.email}>
                                <Input
                                    type="email"
                                    value={profileForm.data.email}
                                    onChange={(e) => profileForm.setData('email', e.target.value)}
                                />
                            </Field>

                            {mustVerifyEmail ? (
                                <p className="text-sm text-zinc-600">
                                    Email kamu belum terverifikasi. Silakan cek halaman verifikasi email (sementara masih Blade).
                                </p>
                            ) : null}

                            <div className="flex items-center gap-3">
                                <Button type="submit" disabled={profileForm.processing}>
                                    Save
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Update Password</CardTitle>
                        <CardDescription>Ganti password akun.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            className="space-y-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                passwordForm.put('/password', {
                                    preserveScroll: true,
                                    onSuccess: () =>
                                        passwordForm.reset('current_password', 'password', 'password_confirmation'),
                                });
                            }}
                        >
                            <Field label="Current password" error={passwordForm.errors.current_password}>
                                <Input
                                    type="password"
                                    value={passwordForm.data.current_password}
                                    onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                />
                            </Field>
                            <Field label="New password" error={passwordForm.errors.password}>
                                <Input
                                    type="password"
                                    value={passwordForm.data.password}
                                    onChange={(e) => passwordForm.setData('password', e.target.value)}
                                />
                            </Field>
                            <Field label="Confirm password" error={passwordForm.errors.password_confirmation}>
                                <Input
                                    type="password"
                                    value={passwordForm.data.password_confirmation}
                                    onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                />
                            </Field>

                            <Button type="submit" disabled={passwordForm.processing}>
                                Update password
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card className="border-red-200">
                    <CardHeader>
                        <CardTitle className="text-red-700">Delete Account</CardTitle>
                        <CardDescription>Hapus akun ini secara permanen.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            className="space-y-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (!confirm('Yakin ingin menghapus akun?')) return;
                                deleteForm.delete('/profile', { preserveScroll: true });
                            }}
                        >
                            <Field label="Password" error={deleteForm.errors.password}>
                                <Input
                                    type="password"
                                    value={deleteForm.data.password}
                                    onChange={(e) => deleteForm.setData('password', e.target.value)}
                                />
                            </Field>
                            <Button type="submit" disabled={deleteForm.processing} className="bg-red-600 hover:bg-red-600/90">
                                Delete account
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}

