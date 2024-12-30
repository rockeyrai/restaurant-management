import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold">Restaurant Name</h3>
            <p className="mt-2">123 Main Street, City, Country</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-accent"><Facebook /></a>
            <a href="#" className="hover:text-accent"><Instagram /></a>
            <a href="#" className="hover:text-accent"><Twitter /></a>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2023 Restaurant Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}