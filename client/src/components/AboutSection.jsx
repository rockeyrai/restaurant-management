import Image from 'next/image'

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Restaurant interior"
              width={800}
              height={600}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-4xl font-bold mb-6">About Us</h2>
            <p className="text-lg mb-4">
              Welcome to our restaurant, where passion for food meets exceptional service. We've been serving our community for over 20 years, bringing together the finest ingredients and culinary expertise to create unforgettable dining experiences.
            </p>
            <p className="text-lg mb-4">
              Our team of skilled chefs draws inspiration from global cuisines, infusing traditional recipes with modern twists. We believe in using locally-sourced, seasonal ingredients to ensure the freshest and most flavorful dishes for our guests.
            </p>
            <p className="text-lg">
              Whether you're joining us for a romantic dinner, a family celebration, or a casual meal with friends, we strive to make every visit special. Come and experience the warmth of our hospitality and the delight of our culinary creations.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

