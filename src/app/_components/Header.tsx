
import Link from 'next/link';
import { signIn,signOut,useSession } from "next-auth/react";
import Navigation from './Navigation';

const Header = () => {
 
  return (
    <header className="bg-green-600 text-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Project Logo / Name */}
        <div className="flex items-center">
          <span className="text-2xl font-bold">Meal Prep</span>
        </div>
        {/* Navigation */}
        <nav>
         <Navigation/>
        </nav>
      </div>
    </header>
  );
};

export default Header;
