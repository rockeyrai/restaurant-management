import { Button } from '@/components/ui/button'

export default function HomeSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center">
      <div className="text-center text-black">
        <h1 className="text-6xl font-bold mb-4 text-black">Welcome to Our Restaurant</h1>
        <p className="text-2xl mb-8">Experience the finest cuisine in town</p>
        <Button size="lg" asChild>
          <a href="#menu">View Menu</a>
        </Button>
      </div>
    </section>
  )
}

