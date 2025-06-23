import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, CreditCard, History, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const UserMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-dark-800 hover:bg-dark-700 rounded-lg px-3 py-2 transition-colors"
      >
        <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="text-white text-sm font-medium hidden sm:block">
          {user.email?.split('@')[0]}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          ></div>
          
          <div className="absolute right-0 top-full mt-2 w-56 glass-effect rounded-lg border border-gray-700 z-20">
            <div className="p-4 border-b border-gray-700">
              <div className="text-white font-medium">{user.email}</div>
              <div className="text-gray-400 text-sm">Free Plan • 100 credits</div>
            </div>
            
            <div className="py-2">
              <Link 
                to="/settings"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
              
              <Link 
                to="/history"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <History className="w-4 h-4" />
                <span>Request History</span>
              </Link>
              
              <Link 
                to="/billing"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <CreditCard className="w-4 h-4" />
                <span>Billing</span>
              </Link>
              
              <hr className="my-2 border-gray-700" />
              
              <button 
                onClick={handleSignOut}
                className="w-full flex items-center space-x-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;