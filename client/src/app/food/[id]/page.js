import Image from 'next/image';
import Link from 'next/link';
import { menuItems } from '@/components/foodData';

export default function FoodDetail({ params }) {
  
  const { id } = params; // Destructure id from params

  // Find the item using the id
  const foodItem = menuItems.find((item) => item.id.toString() === id);
  const food = menuItems.find(f => f.id === parseInt(params.id));
  const suggestions = menuItems.filter(f => f.id !== food.id).slice(0, 3);


  if (!foodItem) {
    return <div>Food item not found</div>;
  }

  return (
    <div>
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Menu</Link>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img src={`${food.src}`} alt={food.name} width={400} height={400} className="rounded-lg" />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{food.name}</h1>
          <p className="text-gray-600 mb-4">{food.description}</p>
          <p className="text-2xl font-semibold mb-4">${food.price.toFixed(2)}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add to Cart</button>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">You might also like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {suggestions.map(suggestion => (
            <Link href={`/food/${suggestion.id}`} key={suggestion.id}>
              <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <img src={`${suggestion.src}`} alt={suggestion.name} width={200} height={200} className="mb-4 rounded" />
                <h3 className="text-lg font-semibold mb-2">{suggestion.name}</h3>
                <p className="text-gray-600">${suggestion.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

