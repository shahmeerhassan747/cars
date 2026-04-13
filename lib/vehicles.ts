export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  likes: number;
  dislikes: number;
}

export interface Vehicle {
  id: string;
  name: string;
  category: string;
  price: string;
  priceNum: number;
  year: number;
  image: string;
  gallery: string[];
  fuel: string;
  speed: string;
  seats: number;
  badge: string;
  features: string[];
  engine: string;
  horsepower: string;
  torque: string;
  acceleration: string;
  transmission: string;
  drivetrain: string;
  range?: string;
  color: string;
  description: string;
  pros: string[];
  cons: string[];
  reviews: Review[];
}

export const vehicles: Vehicle[] = [
  {
    id: "bmw-m5-competition",
    name: "BMW M5 Competition",
    category: "Sedan",
    price: "$105,000",
    priceNum: 105000,
    year: 2024,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800&q=80",
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80",
    ],
    fuel: "Petrol",
    speed: "305 km/h",
    seats: 5,
    badge: "New",
    features: ["Adaptive Cruise Control", "Harman Kardon Sound", "M Sport Brakes", "Head-Up Display", "Parking Assistant", "Wireless CarPlay"],
    engine: "4.4L Twin-Turbo V8",
    horsepower: "627 hp",
    torque: "750 Nm",
    acceleration: "3.3s 0–100 km/h",
    transmission: "8-Speed M Steptronic",
    drivetrain: "M xDrive AWD",
    color: "Frozen Brooklyn Grey",
    description: "The BMW M5 Competition is the pinnacle of performance sedans. With its hand-built 4.4-litre twin-turbocharged V8 engine producing 627 hp, it delivers supercar performance in a practical four-door package. The M5 Competition features an upgraded suspension, wider track, and exclusive M-tuned chassis that makes every drive an event. Inside, the cabin blends luxury with motorsport intent — carbon fibre trim, M-specific instrumentation, and Merino leather throughout.",
    pros: ["Blistering performance", "Practical 4-door layout", "Exceptional build quality", "Advanced AWD system"],
    cons: ["High fuel consumption", "Firm ride on rough roads", "Premium price tag"],
    reviews: [
      { id: "r1", author: "James Carter", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80", rating: 5, date: "March 2026", title: "Best performance sedan money can buy", body: "I've owned three M5s and this Competition is on another level. The power delivery is savage yet refined. Daily driving is surprisingly comfortable and the AWD system inspires confidence in all conditions.", likes: 42, dislikes: 2 },
      { id: "r2", author: "Priya Sharma", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80", rating: 4, date: "February 2026", title: "Incredible machine, minor niggles", body: "The performance is absolutely mind-blowing. My only gripe is the infotainment can be complex to navigate. But once you're on the road, all is forgiven. The sound from that V8 is addictive.", likes: 28, dislikes: 4 },
      { id: "r3", author: "Marcus Webb", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80", rating: 5, date: "January 2026", title: "Track day hero, daily driver", body: "Took it to the Nürburgring last month. Absolutely planted. Then drove it home 400km in complete comfort. No other car does this dual role so well.", likes: 61, dislikes: 1 },
    ],
  },
  {
    id: "mercedes-gle-450",
    name: "Mercedes-Benz GLE 450",
    category: "SUV",
    price: "$89,000",
    priceNum: 89000,
    year: 2024,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80",
    ],
    fuel: "Hybrid",
    speed: "250 km/h",
    seats: 7,
    badge: "Best Seller",
    features: ["MBUX Infotainment", "Air Suspension", "360° Camera", "Burmester Sound", "Active Parking Assist", "7-Seat Configuration"],
    engine: "3.0L Inline-6 Mild Hybrid",
    horsepower: "375 hp",
    torque: "500 Nm",
    acceleration: "5.7s 0–100 km/h",
    transmission: "9G-TRONIC Automatic",
    drivetrain: "4MATIC AWD",
    color: "Obsidian Black Metallic",
    description: "The Mercedes-Benz GLE 450 redefines what a luxury SUV can be. Its mild-hybrid powertrain combines a 3.0-litre inline-six with an integrated starter-generator for seamless performance and improved efficiency. The air suspension adapts to every road surface, while the MBUX system with its dual 12.3-inch screens creates a cockpit-like environment. With seating for seven and a cavernous boot, it's the ultimate family luxury vehicle.",
    pros: ["Exceptional interior quality", "Smooth hybrid powertrain", "Versatile 7-seat layout", "Advanced safety tech"],
    cons: ["Slightly soft handling", "Third row tight for adults", "Complex tech learning curve"],
    reviews: [
      { id: "r1", author: "Sarah Mitchell", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80", rating: 5, date: "March 2026", title: "Perfect family luxury SUV", body: "We've had this for 6 months and it's transformed family road trips. The air suspension is magic on long motorway runs and the kids love the third row. MBUX took a week to learn but now I can't imagine life without it.", likes: 55, dislikes: 3 },
      { id: "r2", author: "David Chen", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&q=80", rating: 4, date: "January 2026", title: "Luxurious but pricey options", body: "The base car is excellent but Mercedes charges a lot for options. Once specced up it's phenomenal though. The Burmester sound system is worth every penny.", likes: 33, dislikes: 7 },
    ],
  },
  {
    id: "porsche-911-turbo-s",
    name: "Porsche 911 Turbo S",
    category: "Sports",
    price: "$215,000",
    priceNum: 215000,
    year: 2024,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
      "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&q=80",
    ],
    fuel: "Petrol",
    speed: "330 km/h",
    seats: 4,
    badge: "Limited",
    features: ["Sport Chrono Package", "PASM Suspension", "Bose Surround Sound", "Carbon Ceramic Brakes", "Rear-Axle Steering", "Night Vision Assist"],
    engine: "3.8L Twin-Turbo Flat-6",
    horsepower: "650 hp",
    torque: "800 Nm",
    acceleration: "2.7s 0–100 km/h",
    transmission: "8-Speed PDK",
    drivetrain: "Porsche Traction Management AWD",
    color: "GT Silver Metallic",
    description: "The Porsche 911 Turbo S is the definitive sports car — a machine that has been perfected over six decades. The 3.8-litre twin-turbocharged flat-six produces 650 hp and launches to 100 km/h in just 2.7 seconds, yet it remains docile enough for daily use. The rear-axle steering makes it feel smaller than it is at speed, while the carbon ceramic brakes provide fade-free stopping power from any velocity. This is the benchmark against which all other sports cars are measured.",
    pros: ["Legendary performance", "Everyday usability", "Timeless design", "Exceptional resale value"],
    cons: ["Very expensive", "Limited rear space", "Polarising rear-engine layout"],
    reviews: [
      { id: "r1", author: "Alessandro Ferrari", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80", rating: 5, date: "March 2026", title: "The benchmark. Full stop.", body: "I've driven Ferraris, Lamborghinis, McLarens. The 911 Turbo S is the one I keep coming back to. It does everything better than anything else. The PDK gearbox is telepathic.", likes: 89, dislikes: 2 },
      { id: "r2", author: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&q=80", rating: 5, date: "February 2026", title: "My daily driver supercar", body: "People think I'm crazy using a Turbo S as a daily but it's genuinely practical. Comfortable, fast, reliable. The only downside is the fuel bill.", likes: 74, dislikes: 5 },
      { id: "r3", author: "Tom Bradley", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80", rating: 4, date: "December 2025", title: "Almost perfect", body: "Incredible car. Docked one star only because the options list is absurd — you need to spend another $30k to get it how you want it. But the driving experience is unmatched.", likes: 41, dislikes: 8 },
    ],
  },
  {
    id: "audi-q8-etron",
    name: "Audi Q8 e-tron",
    category: "Electric SUV",
    price: "$76,000",
    priceNum: 76000,
    year: 2024,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
    ],
    fuel: "Electric",
    speed: "210 km/h",
    seats: 5,
    badge: "Eco",
    features: ["600km Range", "Matrix LED Headlights", "Virtual Cockpit", "Bang & Olufsen Sound", "Adaptive Air Suspension", "22kW AC Charging"],
    engine: "Dual Electric Motors",
    horsepower: "408 hp",
    torque: "664 Nm",
    acceleration: "5.6s 0–100 km/h",
    transmission: "Single-Speed Automatic",
    drivetrain: "quattro AWD",
    range: "600 km WLTP",
    color: "Plasma Blue",
    description: "The Audi Q8 e-tron represents the future of luxury electric SUVs. With a 114 kWh battery delivering up to 600 km of range, range anxiety is a thing of the past. The dual-motor quattro system provides instant torque and all-weather confidence, while the virtual cockpit and three-screen MMI system create an immersive digital environment. The aerodynamically optimised body and camera-based door mirrors reduce drag to just 0.24 Cd.",
    pros: ["Exceptional range", "Luxurious interior", "Silent and refined", "Fast charging capability"],
    cons: ["Heavy weight", "Slower than rivals", "Large footprint"],
    reviews: [
      { id: "r1", author: "Nina Patel", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80", rating: 5, date: "March 2026", title: "The EV I always wanted", body: "600km range means I've done two long road trips without range anxiety. The interior is stunning and the virtual cockpit is addictive. Charging at home overnight is so convenient.", likes: 47, dislikes: 3 },
      { id: "r2", author: "Robert Kim", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80", rating: 4, date: "January 2026", title: "Great EV, not the fastest", body: "If you want a fast EV look elsewhere. But if you want a refined, luxurious, long-range EV this is it. The B&O sound system is incredible.", likes: 29, dislikes: 6 },
    ],
  },
  {
    id: "range-rover-sport",
    name: "Range Rover Sport",
    category: "Luxury SUV",
    price: "$120,000",
    priceNum: 120000,
    year: 2024,
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&q=80",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
    ],
    fuel: "Hybrid",
    speed: "240 km/h",
    seats: 7,
    badge: "Premium",
    features: ["Terrain Response 2", "Meridian Sound", "Pivi Pro System", "Air Suspension", "Wade Sensing", "Configurable Dynamics"],
    engine: "3.0L Inline-6 PHEV",
    horsepower: "440 hp",
    torque: "620 Nm",
    acceleration: "5.3s 0–100 km/h",
    transmission: "8-Speed Automatic",
    drivetrain: "All-Wheel Drive",
    color: "Santorini Black",
    description: "The Range Rover Sport combines the legendary off-road capability of Land Rover with the dynamic on-road performance of a sports car. The plug-in hybrid powertrain delivers 440 hp and up to 113 km of electric-only range for urban driving. Terrain Response 2 automatically selects the optimal settings for any surface, while the Dynamic Air Suspension provides a magic carpet ride on road. The Pivi Pro infotainment system is the most intuitive in the class.",
    pros: ["Unmatched off-road ability", "Stunning design", "Excellent PHEV range", "Premium interior"],
    cons: ["Thirsty when not charged", "Expensive options", "Large turning circle"],
    reviews: [
      { id: "r1", author: "Charlotte Davies", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80", rating: 5, date: "February 2026", title: "The ultimate all-rounder", body: "School run, country estate, ski trip — this car does it all with equal aplomb. The PHEV means my commute is electric and the weekend adventures are epic. Pivi Pro is genuinely brilliant.", likes: 63, dislikes: 4 },
      { id: "r2", author: "James Thornton", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80", rating: 4, date: "December 2025", title: "Brilliant but needs charging", body: "If you don't charge it regularly the fuel economy suffers badly. But plug it in every night and it's a revelation. The interior quality is second to none.", likes: 38, dislikes: 9 },
    ],
  },
  {
    id: "ferrari-roma",
    name: "Ferrari Roma",
    category: "Grand Tourer",
    price: "$245,000",
    priceNum: 245000,
    year: 2024,
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    ],
    fuel: "Petrol",
    speed: "320 km/h",
    seats: 4,
    badge: "Exclusive",
    features: ["Manettino Dial", "Carbon Fibre Interior", "Ferrari Dynamic Enhancer", "Daytona-Style Seats", "Panoramic Roof", "Ferrari Telemetry"],
    engine: "3.9L Twin-Turbo V8",
    horsepower: "620 hp",
    torque: "760 Nm",
    acceleration: "3.4s 0–100 km/h",
    transmission: "8-Speed DCT",
    drivetrain: "Rear-Wheel Drive",
    color: "Rosso Portofino",
    description: "The Ferrari Roma is la dolce vita on four wheels — a grand tourer that captures the spirit of 1950s and 60s Italian elegance while delivering thoroughly modern performance. The 3.9-litre twin-turbocharged V8 produces 620 hp and propels the Roma to 100 km/h in 3.4 seconds. The Manettino dial on the steering wheel lets you select from five driving modes, from comfortable GT cruising to full Race mode. The interior is a masterpiece of Italian craftsmanship with the finest leathers and carbon fibre.",
    pros: ["Breathtaking design", "Exhilarating performance", "Exclusive ownership", "Appreciating asset"],
    cons: ["Extremely expensive", "Limited practicality", "High running costs"],
    reviews: [
      { id: "r1", author: "Marco Rossi", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80", rating: 5, date: "March 2026", title: "Art you can drive", body: "Every time I walk to this car I stop and stare. It's the most beautiful thing I've ever owned. The V8 sound is operatic. Worth every single penny.", likes: 112, dislikes: 1 },
      { id: "r2", author: "Isabella Conti", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&q=80", rating: 5, date: "January 2026", title: "A dream made real", body: "I saved for 10 years for this car. It exceeded every expectation. The GT mode is surprisingly comfortable for long drives and Race mode is terrifying in the best way.", likes: 87, dislikes: 3 },
      { id: "r3", author: "Pierre Dubois", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80", rating: 4, date: "November 2025", title: "Magnificent but impractical", body: "The boot is tiny and the rear seats are for children only. But who cares? You don't buy a Ferrari for practicality. The driving experience is transcendent.", likes: 54, dislikes: 6 },
    ],
  },
];

export function getVehicleById(id: string): Vehicle | undefined {
  return vehicles.find((v) => v.id === id);
}
