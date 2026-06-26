export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  pricePerMeter: number;
  features: string[];
  specs: {
    bahan: string;
    lebar: string;
    blockout: string; // e.g., '100% Blockout', 'Semi-transparent', 'Translucent'
  };
}

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  year: string;
  description: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
  image?: string;
}
