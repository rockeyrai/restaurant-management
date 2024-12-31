import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const menuItems = [
  { name: 'Classic Burger', src:"./burger.jpeg", description: 'Juicy beef patty with fresh toppings', price: '$12.99' },
  { name: 'Margherita Pizza', src:'./pizza.jpeg', description: 'Traditional Italian pizza with tomato and mozzarella', price: '$14.99' },
  { name: 'Caesar Salad', src:'./salad.jpg', description: 'Crisp romaine lettuce with our homemade dressing', price: '$9.99' },
  { name: 'Grilled Salmon', src:'./salmon.jpg', description: 'Fresh Atlantic salmon with lemon butter sauce', price: '$18.99' },
  { name: 'Chicken Alfredo',src:'./alfredo.jpg', description: 'Creamy pasta with grilled chicken breast', price: '$15.99' },
  { name: 'Vegetable Stir Fry',src:'./veggie-fry.jpg', description: 'Assorted vegetables in a savory sauce', price: '$13.99' },
]

export default function MenuSection() {
  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <Card key={index}>
              <figure ><img className='w-52 h-52 object-cover' src={item.src}/></figure>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">{item.description}</p>
                <p className="font-bold">{item.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
