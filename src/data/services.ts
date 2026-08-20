export type Service = { slug: string; name: string; short: string; description: string; image: string; gallery: string[] };

const imgs = {
  wall: "https://images.unsplash.com/photo-1631545806609-8e6fbd21e455?auto=format&fit=crop&w=1400&q=80",
  technician: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=80",
  office: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
  industrial: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1400&q=80",
  home: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
  cooling: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
};

export const services: Service[] = [
  ["split-ac","Split AC","Installation, repair & gas filling","Fast, dependable split AC installation and repair for homes and offices.",imgs.wall],
  ["window-ac","Window AC","Service, repair & installation","Reliable window AC care for efficient cooling in every room.",imgs.home],
  ["vrv-ac","VRV Air Conditioning","Commercial climate solutions","Advanced, energy-efficient VRV systems planned for your space.",imgs.office],
  ["cassette-ac","Cassette AC","Commercial installation & repair","Clean ceiling-mounted cooling for shops, offices and showrooms.",imgs.office],
  ["ductable-ac","Ductable AC","Ducted cooling specialists","Balanced, seamless cooling designed for large commercial spaces.",imgs.industrial],
  ["chiller-ac","Chiller Air Conditioner","Industrial service & maintenance","Professional chiller diagnostics, repair and scheduled maintenance.",imgs.industrial],
  ["ahu-fcu-ac","AHU & FCU AC","Air handling unit service","Installation and maintenance for efficient central air systems.",imgs.cooling],
  ["tower-ac","Tower AC","High-capacity cooling","Powerful floor-standing AC service for events and large rooms.",imgs.cooling],
  ["package-ac","Package AC","Complete package unit care","Installation, repairs and maintenance for package AC units.",imgs.home],
  ["underground-fitting","AC Underground Fitting","Concealed piping work","Neat, durable underground copper and drain fitting for new projects.",imgs.technician],
  ["cold-unit-ac","Cold Unit AC","Cold room specialists","Consistent cooling solutions for cold rooms and storage facilities.",imgs.industrial],
  ["water-cooler","Water Cooler","Repair & installation","Affordable water cooler installation and repair for every season.",imgs.cooling],
].map(([slug,name,short,description,image]) => ({ slug,name,short,description,image,gallery:[image,imgs.technician,imgs.office,imgs.industrial,imgs.home,imgs.cooling] } as Service));

export const heroSlides = [
  { image: imgs.industrial, eyebrow: "Commercial cooling experts", title: "Industrial AC solutions that keep business moving", text: "Chiller, VRV, AHU, FCU and cold-room support across Gurugram." },
  { image: imgs.technician, eyebrow: "Fast local service", title: "Expert AC repair, right when you need it", text: "Diagnosis, repair, installation and gas filling by experienced technicians." },
  { image: imgs.home, eyebrow: "Comfort at home", title: "Cleaner air. Better cooling. Lower stress.", text: "Reliable split and window AC service with clear pricing and quick response." },
];
