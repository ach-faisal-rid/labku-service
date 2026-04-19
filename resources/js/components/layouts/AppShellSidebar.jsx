import { Link } from '@inertiajs/react';
import { FlaskConical, LayoutDashboard, Settings, User, Users, X } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

function NavItem({ href, icon: Icon, label, collapsed = false, mobile = false, onNavigate }) {
    const classes = cn(
        'flex items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100',
        collapsed && !mobile && 'justify-center px-2'
    );

    if (href === '#') {
        return (
            <a className={classes} href={href} onClick={onNavigate}>
                <Icon className="h-4 w-4 text-zinc-600" />
                {collapsed && !mobile ? null : <span>{label}</span>}
            </a>
        );
    }

    return (
        <Link className={classes} href={href} onClick={onNavigate}>
            <Icon className="h-4 w-4 text-zinc-600" />
            {collapsed && !mobile ? null : <span>{label}</span>}
        </Link>
    );
}

export default function AppShellSidebar({
    sidebarVisible,
    sidebarCollapsed,
    sidebarWidthClass,
    mobileOpen,
    setMobileOpen,
}) {
    return (
        <>
            {/* Sidebar (desktop) */}
            <aside
                className={cn(
                    'hidden md:fixed md:inset-y-0 md:left-0 md:z-30 md:flex md:flex-col md:border-r md:border-zinc-200 md:bg-white',
                    sidebarWidthClass,
                    !sidebarVisible && 'md:hidden'
                )}
            >
                <div className="flex h-14 items-center gap-2 px-4">
                    <FlaskConical className="h-5 w-5 text-indigo-600" />
                    {!sidebarCollapsed && (
                        <div>
                            <div className="text-sm font-semibold leading-none">Labku Service</div>
                            <div className="text-xs text-zinc-500">Laboratory Management</div>
                        </div>
                    )}
                </div>

                <nav className="flex-1 space-y-1 px-2 py-3">
                    <NavItem collapsed={sidebarCollapsed} href="/dashboard" icon={LayoutDashboard} label="Dashboard" />
                    <NavItem collapsed={sidebarCollapsed} href="#" icon={FlaskConical} label="Laboratorium" />
                    <NavItem collapsed={sidebarCollapsed} href="#" icon={Users} label="Pengguna" />
                    <NavItem collapsed={sidebarCollapsed} href="/profile" icon={User} label="Pengaturan Akun" />
                    <NavItem collapsed={sidebarCollapsed} href="/settings" icon={Settings} label="Pengaturan Aplikasi" />
                </nav>
            </aside>

            {/* Sidebar (mobile) */}
            <div className={cn('md:hidden', mobileOpen ? 'block' : 'hidden')}>
                <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setMobileOpen(false)} />
                <div className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl">
                    <div className="flex h-14 items-center justify-between border-b border-zinc-200 px-4">
                        <div className="flex items-center gap-2">
                            <FlaskConical className="h-5 w-5 text-indigo-600" />
                            <span className="text-sm font-semibold">Labku Service</span>
                        </div>
                        <Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                    <nav className="space-y-1 p-2">
                        <NavItem mobile onNavigate={() => setMobileOpen(false)} href="/dashboard" icon={LayoutDashboard} label="Dashboard" />
                        <NavItem mobile onNavigate={() => setMobileOpen(false)} href="#" icon={FlaskConical} label="Laboratorium" />
                        <NavItem mobile onNavigate={() => setMobileOpen(false)} href="#" icon={Users} label="Pengguna" />
                        <NavItem mobile onNavigate={() => setMobileOpen(false)} href="/profile" icon={User} label="Pengaturan Akun" />
                        <NavItem mobile onNavigate={() => setMobileOpen(false)} href="/settings" icon={Settings} label="Pengaturan Aplikasi" />
                    </nav>
                </div>
            </div>
        </>
    );
}