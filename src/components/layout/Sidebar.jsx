import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { HomeIcon, CalendarIcon, UsersIcon, TrophyIcon, XMarkIcon } from '@heroicons/react/24/outline';
import classNames from '../../utils/classNames';

const navigation = [
  { name: 'Dashboard', key: 'dashboard', icon: HomeIcon },
  { name: 'Matches', key: 'matches', icon: CalendarIcon },
  { name: 'Rankings', key: 'rankings', icon: TrophyIcon },
  { name: 'Team', key: 'team', icon: UsersIcon },
];

function NavItems({ currentPage, onNavigate, onItemClick }) {
  return (
    <nav className="flex flex-col gap-1 px-3">
      {navigation.map(item => {
        const Icon = item.icon;
        const active = currentPage === item.key;
        return (
          <button
            key={item.key}
            onClick={() => { onNavigate(item.key); onItemClick?.(); }}
            className={classNames(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer',
              active
                ? 'bg-[var(--color-bg-card)] text-violet-400 border-l-2 border-l-violet-400'
                : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-card)] hover:text-[var(--color-text-primary)] border-l-2 border-l-transparent',
            )}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {item.name}
          </button>
        );
      })}
    </nav>
  );
}

function SidebarContent({ currentPage, onNavigate, onItemClick }) {
  return (
    <div className="flex h-full flex-col glass-strong border-r border-[var(--color-border)]">
      <div className="flex h-16 items-center px-6">
        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
          Limitless
        </span>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <NavItems currentPage={currentPage} onNavigate={onNavigate} onItemClick={onItemClick} />
      </div>
    </div>
  );
}

export default function Sidebar({ currentPage, onNavigate, mobileOpen, onMobileClose }) {
  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:block lg:w-64">
        <SidebarContent
          currentPage={currentPage}
          onNavigate={onNavigate}
        />
      </div>

      {/* Mobile sidebar */}
      <Dialog open={mobileOpen} onClose={onMobileClose} className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in"
        />
        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition data-[closed]:-translate-x-full data-[enter]:duration-300 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in"
          >
            <div className="absolute right-0 top-0 flex w-16 justify-center pt-5 data-[closed]:opacity-0 data-[enter]:duration-300 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in">
              <button onClick={onMobileClose} className="-m-2.5 p-2.5 cursor-pointer">
                <XMarkIcon className="h-6 w-6 text-white" />
              </button>
            </div>
            <SidebarContent
              currentPage={currentPage}
              onNavigate={onNavigate}
              onItemClick={onMobileClose}
            />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
