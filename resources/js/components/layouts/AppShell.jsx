import { useEffect, useMemo, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { cn } from '../../lib/utils';
import AppShellHeader from './AppShellHeader';
import AppShellSidebar from './AppShellSidebar';
import AppShellFooter from './AppShellFooter';

function readBool(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        if (raw === null) return fallback;
        return raw === 'true';
    } catch {
        return fallback;
    }
}

function writeBool(key, value) {
    try {
        localStorage.setItem(key, value ? 'true' : 'false');
    } catch {
        //
    }
}

export default function AppShell({ title, children }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const isDesktop = useMemo(() => {
        if (typeof window === 'undefined') return true;
        return window.matchMedia('(min-width: 768px)').matches;
    }, []);

    const [mobileOpen, setMobileOpen] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(() => readBool('sidebarVisible', true));
    const [sidebarCollapsed, setSidebarCollapsed] = useState(() => readBool('sidebarCollapsed', false));
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    useEffect(() => writeBool('sidebarVisible', sidebarVisible), [sidebarVisible]);
    useEffect(() => writeBool('sidebarCollapsed', sidebarCollapsed), [sidebarCollapsed]);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;
        const mq = window.matchMedia('(min-width: 768px)');
        const onChange = () => setMobileOpen(false);
        mq.addEventListener?.('change', onChange);
        return () => mq.removeEventListener?.('change', onChange);
    }, []);

    const sidebarWidthClass = sidebarCollapsed ? 'md:w-20' : 'md:w-64';
    const sidebarOffsetClass = !sidebarVisible ? 'md:pl-0' : sidebarCollapsed ? 'md:pl-20' : 'md:pl-64';

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900">
            <AppShellHeader
                user={user}
                sidebarVisible={sidebarVisible}
                sidebarCollapsed={sidebarCollapsed}
                sidebarOffsetClass={sidebarOffsetClass}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
                setSidebarVisible={setSidebarVisible}
                setSidebarCollapsed={setSidebarCollapsed}
                userMenuOpen={userMenuOpen}
                setUserMenuOpen={setUserMenuOpen}
            />

            <AppShellSidebar
                sidebarVisible={sidebarVisible}
                sidebarCollapsed={sidebarCollapsed}
                sidebarWidthClass={sidebarWidthClass}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />

            <main className={cn('px-4 py-6', sidebarOffsetClass)}>
                {title ? <h1 className="text-lg font-semibold tracking-tight">{title}</h1> : null}
                <div className={cn(title && 'mt-4')}>{children}</div>
            </main>

            <AppShellFooter sidebarOffsetClass={sidebarOffsetClass} />
        </div>
    );
}