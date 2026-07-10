export interface TPlant {
  id?: string;
  title: string;
  scientificName: string;
  category: 'Aquatic' | 'Floating' | 'Submerged' | 'Deep Water'; 
  shortDescription: string;
  fullDescription: string;
  price: number;
  stock: number;
  sunlightNeeds: 'Low' | 'Medium' | 'High';
  image: string;
  rating: number;
}

export interface TUser {
  id?: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}