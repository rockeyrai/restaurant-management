import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const offers = [
  { title: 'Happy Hour', description: '50% off on all drinks from 5 PM to 7 PM, Monday to Friday', badge: 'Daily' },
  { title: 'Family Sunday', description: 'Kids eat free with every adult meal purchased on Sundays', badge: 'Weekly' },
  { title: 'Lunch Special', description: 'Get a free dessert with any main course ordered during lunch hours', badge: 'Weekdays' },
]

export default function OfferSection() {
  return (
    <section id="offer" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Special Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader>
                <Badge className="absolute top-4 right-4">{offer.badge}</Badge>
                <CardTitle>{offer.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{offer.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

