"use client";
import { useRouter } from "next/navigation";
import { Home, Info, MenuIcon, Gift, LogIn, LogOut, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "./AuthContext";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const { isLoggedIn, login, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('')

  const handleNavigation = (page) => {
    if (page === "home") page = "";
    router.push(`/${page}`);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
  return (
    <nav className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h2>Name</h2>
          <form onSubmit={handleSearch} className="flex items-center">
            <Input
              type="search"
              placeholder="Search..."
              className="w-32 sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" size="icon" variant="ghost">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
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
        <div className="flex items-center justify-between h-10">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => handleNavigation("home")}>
              {/* <Home className="mr-2 h-4 w-4" />  */}
              Home
            </Button>
            <Button variant="ghost" onClick={() => handleNavigation("about")}>
              {/* <Info className="mr-2 h-4 w-4" />  */}
              About
            </Button>
            <Button variant="ghost" onClick={() => handleNavigation("menu")}>
              {/* <MenuIcon className="mr-2 h-4 w-4" />  */}
              Menu
            </Button>
            <Button variant="ghost" onClick={() => handleNavigation("offer")}>
              {/* <Gift className="mr-2 h-4 w-4" />  */}
              Offer
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
