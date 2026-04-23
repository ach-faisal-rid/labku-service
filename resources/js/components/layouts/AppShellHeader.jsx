import { Link } from '@inertiajs/react';
import { FlaskConical, LogOut, Menu, User } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import SignalStatus from '../SignalStatus';


export default function AppShellHeader({
    user,
    sidebarVisible,
    sidebarCollapsed,
    sidebarOffsetClass,
    mobileOpen,
    setMobileOpen,
    setSidebarVisible,
    setSidebarCollapsed,
    userMenuOpen,
    setUserMenuOpen,
}) {
    return (
        <header className={cn('sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur', sidebarOffsetClass)}>
            <div className="flex h-14 items-center gap-2 px-4">
                <Button
                    className="md:hidden"
                    variant="ghost"
                    size="icon"
                    aria-label="Open menu"
                    onClick={() => setMobileOpen(true)}
                >
                    <Menu className="h-5 w-5" />
                </Button>

                <div className="flex items-center gap-2 md:hidden">
                    <FlaskConical className="h-5 w-5 text-indigo-600" />
                    <span className="text-sm font-semibold">Labku</span>
                </div>

                <div className="ml-auto flex items-center gap-2">
                    <Button
                        className="hidden md:inline-flex"
                        variant="outline"
                        size="sm"
                        onClick={() => setSidebarVisible((v) => !v)}
                    >
                        {sidebarVisible ? 'Hide sidebar' : 'Show sidebar'}
                    </Button>
                    <Button
                        className="hidden md:inline-flex"
                        variant="outline"
                        size="sm"
                        disabled={!sidebarVisible}
                        onClick={() => setSidebarCollapsed((v) => !v)}
                    >
                        {sidebarCollapsed ? 'Expand' : 'Collapse'}
                    </Button>
                    
                    <div className="hidden sm:block">
                        <SignalStatus />
                    </div>

                    {user ? (
                        <div className="relative">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setUserMenuOpen((v) => !v)}
                                aria-haspopup="menu"
                                aria-expanded={userMenuOpen}
                            >
                                <span className="hidden sm:inline">{user.name}</span>
                            </Button>
                            {userMenuOpen ? (
                                <div
                                    className="absolute right-0 mt-2 w-48 rounded-md border border-zinc-200 bg-white shadow-sm"
                                    role="menu"
                                >
                                    <Link
                                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                                        href="/profile"
                                        onClick={() => setUserMenuOpen(false)}
                                    >
                                        <User className="h-4 w-4" />
                                        Profil
                                    </Link>
                                    <Link
                                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        onClick={() => setUserMenuOpen(false)}
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Logout
                                    </Link>
                                </div>
                            ) : null}
                        </div>
                    ) : (
                        <Button asChild variant="outline" size="sm">
                            <Link href="/login">Login</Link>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}