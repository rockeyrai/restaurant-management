import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { menuItems } from './foodData';
import { useRouter } from 'next/navigation';

export default function MenuSection() {
  const router = useRouter();

  // Handle navigation safely
  const handleClick = (id) => {
    router.push(`/food/${id}`);
  };

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <Card
              key={item.id} // Use item's unique id as key
              onClick={() => handleClick(item.id)} // Pass item's id to handleClick
              className="cursor-pointer"
            >
              <figure>
                <img className="w-52 h-52 object-cover" src={item.src} alt={item.name} />
              </figure>
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
  );
}
