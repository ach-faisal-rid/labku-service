import { cn } from '../../lib/utils';

export default function AppShellFooter({ sidebarOffsetClass }) {
    return (
        <footer className={cn('border-t border-zinc-200 bg-white', sidebarOffsetClass)}>
            <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-zinc-500">
                © {new Date().getFullYear()} Labku Service
            </div>
        </footer>
    );
}