import AppShell from '../../components/layouts/AppShell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

export default function AppSettings() {
    return (
        <AppShell title="Pengaturan Aplikasi">
            <Card>
                <CardHeader>
                    <CardTitle>Pengaturan</CardTitle>
                    <CardDescription>Tempat untuk pengaturan keseluruhan aplikasi (admin).</CardDescription>
                </CardHeader>
                <CardContent />
            </Card>
        </AppShell>
    );
}

