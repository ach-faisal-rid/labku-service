import { Head, Link } from '@inertiajs/react';

import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export default function Home() {
    return (
        <>
            <Head title="App" />

            <div className="min-h-screen bg-zinc-50 text-zinc-900">
                <div className="mx-auto max-w-5xl p-6">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h1 className="text-balance text-2xl font-semibold tracking-tight">Labku</h1>
                            <p className="text-sm text-zinc-600">Inertia + React (shadcn-style)</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button asChild variant="outline">
                                <Link href="/">Landing</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/dashboard">Dashboard (Blade)</Link>
                            </Button>
                        </div>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Minimal & clean</CardTitle>
                                <CardDescription>Tailwind-first, komponen kecil, mudah dipakai ulang.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button>Contoh tombol</Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Siap dikembangkan</CardTitle>
                                <CardDescription>Nanti kita bisa tambah sidebar, dialog, form, dsb.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="secondary">Secondary</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

