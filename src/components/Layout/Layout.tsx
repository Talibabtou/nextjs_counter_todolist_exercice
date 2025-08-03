import { ReactNode } from 'react';
import DarkModeToggle from '@/components/common/DarkModeToggle';
import NotificationContainer from '@/components/common/Notification/NotificationContainer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      <header className="bg-primary border-b border-primary shadow-sm">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">
            Frontend Learning Exercise
          </h1>
          <DarkModeToggle />
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 flex-1">
        {children}
      </main>
      
      <footer className="bg-primary border-t border-primary">
        <div className="container mx-auto px-4 py-2 text-center text-secondary">
          <p>Built with Next.js, Redux, and Tailwind CSS</p>
        </div>
      </footer>
      
      <NotificationContainer />
    </div>
  );
}
