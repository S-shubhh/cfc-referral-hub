
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth/AuthContext';
import { User, LogOut, Wallet, UserPlus } from 'lucide-react';

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-white text-orange-500 font-bold text-2xl px-3 py-1 rounded">
              CFC
            </div>
            <span className="hidden md:block text-lg font-medium">
              खाओ, खिलाओ, साथ में मिलके पैसे भी कमाओ
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-orange-200 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-orange-200 transition-colors">About</Link>
            <Link to="/how-it-works" className="hover:text-orange-200 transition-colors">How It Works</Link>
            {!user && (
              <Link to="/subscribe" className="hover:text-orange-200 transition-colors">Subscribe</Link>
            )}
          </nav>

          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="text-orange-500 border-white hover:bg-white">
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Link to="/wallet">
                  <Button variant="outline" size="sm" className="text-orange-500 border-white hover:bg-white">
                    <Wallet className="w-4 h-4 mr-2" />
                    Wallet
                  </Button>
                </Link>
                <Button onClick={handleSignOut} variant="outline" size="sm" className="text-orange-500 border-white hover:bg-white">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="outline" size="sm" className="text-orange-500 border-white hover:bg-white">
                    Login
                  </Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button size="sm" className="bg-white text-orange-500 hover:bg-gray-100">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Join Now
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
