import { Palmtree, Sailboat, type LucideIcon } from "lucide-react";
export type Package = {
  id: string;
  title: string;
  category: string;
  region: string;
  durationDays: number;
  price: number;
  priceNote: string;
  summary: string;
  description: string;
  inclusions: {
    "No of rooms"?: number;
    transport: string;
    accommodation: string;
    food: string;
    sightseeing?: string;
    other?: string;
  };
  photos: string[];
  heroPhoto: string;
  backupImg?: LucideIcon;
};
export const packages: Package[] = [
  {
    id: "kerala-backwaters-5d",
    title: "Kerala Backwaters Getaway",
    category: "Family",
    region: "Kerala",
    durationDays: 5,
    price: 24999,
    priceNote: "per couple",
    summary:
      "Experience God's Own Country: A perfect blend of misty green tea hills and peaceful, palm-fringed backwaters.",
    description:
      "Embark on a rejuvenating tropical holiday through Kerala, where you will experience two entirely different worlds side-by-side.First, head up into the cool, misty highlands. Here, you will stay among endless rolling tea gardens and fresh spice forests, breathing in crisp mountain air and watching vibrant local art performances in the evening.Next, slow down and unwind in the serene backwaters. You will board a traditional wooden houseboat to glide down quiet, palm-lined canals, watching peaceful village life pass by while a private chef cooks fresh, authentic meals right on board. This trip is the ultimate escape for those looking to relax, connect with nature, and savor rich local culture.",
    inclusions: {
      transport: "AC car + houseboat",
      accommodation: "3 nights hotel, 1 night houseboat",
      food: "Daily breakfast + 2 dinners",
      sightseeing: "Alleppey, Munnar tea estates",
      other: "Airport pickup, guide",
    },
    photos: ["/images/kerala-1.jpg", "/images/kerala-2.jpg"],
    heroPhoto: "/photos/alappuzha_boat_house.png",
    backupImg: Sailboat,
  },
  {
    id: "goa-bachelors-5d",
    title: "Goa Bachelors Party",
    category: "Group",
    region: "Goa",
    durationDays: 5,
    price: 8500,
    priceNote: "per person",
    summary:
      "Sun, Sand, and Soul: A vibrant tropical escape blending golden beaches, historic Portuguese charm, and lively coastal culture.",
    description:
      "Discover the two distinct sides of India's favorite beach destination with a holiday designed for both relaxation and adventure.First, dive into the high-energy vibe of the coastal strips. You will stay near bustling golden beaches where you can try thrilling water sports, explore lively flea markets, and enjoy world-famous beachside dining and nightlife as the sun sets over the Arabian Sea.Next, escape into a slower, more peaceful world. Walk through quiet, colorful villages filled with colonial Portuguese architecture and historic churches. You will also head inland to breathe in the fresh air of lush spice plantations and hidden waterfalls, tasting rich, coconut-infused local cuisine along the way. This trip is the perfect getaway for anyone looking to recharge by the ocean.",
    inclusions: {
      transport: "AC car",
      accommodation: "4 nights hotel",
      food: "Daily breakfast + 2 dinners",
      sightseeing: "North Goa Beaches",
      other: "Airport pickup",
    },
    photos: ["/images/goa-1.jpg", "/images/goa-2.jpg"],
    heroPhoto: "/photos/goa-hero.jpg",
    backupImg: Palmtree,
  },
  {
    id: "Alapuzha_back_waters_hotel_1",
    title: "Alapuza Backwaters Getaway",
    category: "Family",
    region: "Kerala",
    durationDays: 5,
    price: 12000,
    priceNote: "4 Members",
    summary: "TO BE DISCUSSED",
    description:
      "Experience tranquility,luxury and nature together with an unfogettable Alappuzha Houseboat journey.",
    inclusions: {
      "No of rooms": 1,
      transport: "to be discussed",
      accommodation: "AC room with luxury feel stay",
      food: "Lunch,dinner and breakfast",
      other: "24/7 assistance, 2 bikes rental",
    },
    photos: ["photos/alappuzha_boat_house"],
    heroPhoto: "/photos/alappuzha_boat_house.png",
    backupImg: Sailboat,
  },
  {
    id: "Munroe_island_1",
    title: "Munroe_island",
    category: "Friends",
    region: "Kerala",
    durationDays: 3,
    // durationDays: "12 PM TO 11 AM",
    price: 10000,
    priceNote: "6 Members",
    summary: "TO BE DISCUSSED",
    description:
      "Experience the new stay in backwater and nature together with a country boad and unforgettable fish meals",
    inclusions: {
      "No of rooms": 2,
      transport: "to be discussed",
      accommodation: "AC room with backwater view",
      food: "Lunch,dinner and breakfast",
      other: "24/7 assistance, sightseeing and activities",
    },
    photos: ["photos/munroe_island_stay"],
    heroPhoto: "/photos/munroe_island_stay.jpeg",
    backupImg: Sailboat,
  },
  {
    id: "Varkala_1",
    title: "Varkala",
    category: "Friends",
    region: "Kerala",
    durationDays: 3,
    // durationDays: "12 PM TO 11 AM",
    price: 12000,
    priceNote: "4 Members",
    summary: "TO BE DISCUSSED",
    description:
      "Experience tranquility,luxury and nature together with an unfogettable sea view stay",
    inclusions: {
      "No of rooms": 1,
      transport: "to be discussed",
      accommodation: "AC room with luxury feel",
      food: "Lunch,dinner and breakfast",
      other: "24/7 assistance,2 bike rental",
    },
    photos: ["photos/varkala"],
    heroPhoto: "/photos/varkala.jpeg",
    backupImg: Sailboat,
  },
  {
    id: "Manali_1",
    title: "Manali",
    category: "Family",
    region: "Manali",
    durationDays: 2,
    // durationDays: "2 Nights and 2 Days",
    price: 27000,
    priceNote: "2 Members",
    summary: "TO BE DISCUSSED",
    description: "Experience the snow with an unforgettable stay",
    inclusions: {
      "No of rooms": 1,
      transport: "to be discussed",
      accommodation: "AC room with luxury feel",
      food: "4 times food ",
      other: "24/7 assistance,site seeing",
    },
    photos: ["photos/manali"],
    heroPhoto: "/photos/manali.jpg",
    backupImg: Sailboat,
  },
];
