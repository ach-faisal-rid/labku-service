import { usePage } from '@inertiajs/react';

import AppShell from '../components/layouts/AppShell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <AppShell title="Dashboard">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Stat title="Total Laboratorium" value="12" />
                <Stat title="Peralatan Aktif" value="48" />
                <Stat title="Pengguna Aktif" value="156" />
                <Stat title="Peminjaman Bulan Ini" value="234" />
            </div>

            <div className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Selamat Datang{auth?.user?.name ? `, ${auth.user.name}` : ''}!</CardTitle>
                        <CardDescription>Anda berhasil login ke sistem Labku Service.</CardDescription>
                    </CardHeader>
                    <CardContent />
                </Card>
            </div>
        </AppShell>
    );
}

function Stat({ title, value }) {
    return (
        <Card>
            <CardHeader>
                <CardDescription>{title}</CardDescription>
                <CardTitle className="text-3xl">{value}</CardTitle>
            </CardHeader>
            <CardContent />
        </Card>
    );
}

