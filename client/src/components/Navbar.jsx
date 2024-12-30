'use client';
import { useRouter } from 'next/navigation'
import { Home, Info, MenuIcon, Gift, LogIn, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from './AuthContext';


export default function Navbar({ setCurrentPage }) {
  const router = useRouter()
  const { isLoggedIn, login, logout } = useAuth()

  const handleNavigation = (page) => {
    setCurrentPage(page)
    router.push(`/${page}`)
  }

  return (
    (<nav className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => handleNavigation('home')}>
              {/* <Home className="mr-2 h-4 w-4" />  */}
              Home
            </Button>
            <Button variant="ghost" onClick={() => handleNavigation('about')}>
              {/* <Info className="mr-2 h-4 w-4" />  */}
              About
            </Button>
            <Button variant="ghost" onClick={() => handleNavigation('menu')}>
              {/* <MenuIcon className="mr-2 h-4 w-4" />  */}
              Menu
            </Button>
            <Button variant="ghost" onClick={() => handleNavigation('offer')}>
              {/* <Gift className="mr-2 h-4 w-4" />  */}
              Offer
            </Button>
          </div>
          <div>
            {isLoggedIn ? (
              <Button variant="ghost" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            ) : (
              <Button variant="ghost" onClick={login}>
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>)
  );
}

