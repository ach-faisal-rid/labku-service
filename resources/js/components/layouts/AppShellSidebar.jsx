import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { FlaskConical, LayoutDashboard, Settings, User, Users, X, ChevronDown, ChevronRight, Beaker, Microscope, Box, Smartphone, Server } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

function NavItem({ href, icon: Icon, label, collapsed = false, mobile = false, onNavigate, children: nestedItems }) {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = nestedItems && nestedItems.length > 0;

    const toggleOpen = (e) => {
        if (hasChildren) {
            e.preventDefault();
            setIsOpen(!isOpen);
        }
    };

    const linkClasses = cn(
        'flex items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100',
        collapsed && !mobile && 'justify-center px-2',
        hasChildren && 'cursor-pointer'
    );

    const content = (
        <>
            <Icon className="w-4 h-4 text-zinc-600 shrink-0" />
            {collapsed && !mobile ? null : (
                <>
                    <span className="flex-1">{label}</span>
                    {hasChildren && (
                        <span className="ml-auto">
                            {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                        </span>
                    )}
                </>
            )}
        </>
    );

    // Jika collapsed desktop, tidak tampilkan children
    if (collapsed && !mobile && hasChildren) {
        return (
            <div className="relative group">
                <div className={linkClasses}>
                    {content}
                </div>
                {/* Tooltip style dropdown for collapsed mode */}
                <div className="absolute top-0 z-50 hidden ml-2 bg-white border rounded-md shadow-lg left-full group-hover:block min-w-40 border-zinc-200">
                    <div className="py-1">
                        <div className="px-3 py-2 text-xs font-semibold border-b text-zinc-500">{label}</div>
                        {nestedItems.map((child, idx) => (
                            <NavItem
                                key={idx}
                                mobile={mobile}
                                onNavigate={onNavigate}
                                href={child.href}
                                icon={child.icon}
                                label={child.label}
                                collapsed={false}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Jika memiliki children dan tidak collapsed
    if (hasChildren && (!collapsed || mobile)) {
        return (
            <div>
                <div className={linkClasses} onClick={toggleOpen}>
                    {content}
                </div>
                {isOpen && (
                    <div className={cn('ml-6 mt-1 space-y-1 border-l border-zinc-200 pl-2', mobile ? 'ml-4' : '')}>
                        {nestedItems.map((child, idx) => (
                            <NavItem
                                key={idx}
                                mobile={mobile}
                                onNavigate={onNavigate}
                                href={child.href}
                                icon={child.icon}
                                label={child.label}
                                collapsed={false}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Regular link (tanpa children)
    if (href === '#') {
        return (
            <a className={linkClasses} href={href} onClick={onNavigate}>
                {content}
            </a>
        );
    }

    return (
        <Link className={linkClasses} href={href} onClick={onNavigate}>
            {content}
        </Link>
    );
}

// Menu items dengan nested children
const menuItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    {
        href: '#',
        icon: FlaskConical,
        label: 'Laboratorium',
        children: [
            { href: '/laboratorium/category', icon: Beaker, label: 'Category' },
            { href: '/laboratorium/equipment', icon: Microscope, label: 'Equipment' },
        ]
    },
    {
        href: '#',
        icon: Server,
        label: 'Services',
        children: [
            { href: '/services/customer', icon: Users, label: 'Customer' },
            { href: '/services/device', icon: Smartphone, label: 'Device' },
        ]
    },
    { href: '/pengguna', icon: Users, label: 'Pengguna' },
    { href: '/profile', icon: User, label: 'Pengaturan Akun' },
    { href: '/settings', icon: Settings, label: 'Pengaturan Aplikasi' },
];

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
                <div className="flex items-center gap-2 px-4 h-14">
                    <FlaskConical className="w-5 h-5 text-indigo-600 shrink-0" />
                    {!sidebarCollapsed && (
                        <div>
                            <div className="text-sm font-semibold leading-none">Labku Service</div>
                            <div className="text-xs text-zinc-500">Laboratory Management</div>
                        </div>
                    )}
                </div>

                <nav className="flex-1 px-2 py-3 space-y-1 overflow-y-auto">
                    {menuItems.map((item, idx) => (
                        <NavItem
                            key={idx}
                            collapsed={sidebarCollapsed}
                            href={item.href}
                            icon={item.icon}
                            label={item.label}
                            children={item.children}
                        />
                    ))}
                </nav>
            </aside>

            {/* Sidebar (mobile) */}
            <div className={cn('md:hidden', mobileOpen ? 'block' : 'hidden')}>
                <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setMobileOpen(false)} />
                <div className="fixed inset-y-0 left-0 z-50 overflow-y-auto bg-white shadow-xl w-72">
                    <div className="sticky top-0 flex items-center justify-between px-4 bg-white border-b h-14 border-zinc-200">
                        <div className="flex items-center gap-2">
                            <FlaskConical className="w-5 h-5 text-indigo-600" />
                            <span className="text-sm font-semibold">Labku Service</span>
                        </div>
                        <Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                    <nav className="p-2 pb-4 space-y-1">
                        {menuItems.map((item, idx) => (
                            <NavItem
                                key={idx}
                                mobile
                                onNavigate={() => setMobileOpen(false)}
                                href={item.href}
                                icon={item.icon}
                                label={item.label}
                                children={item.children}
                            />
                        ))}
                    </nav>
                </div>
            </div>
        </>
    );
}   