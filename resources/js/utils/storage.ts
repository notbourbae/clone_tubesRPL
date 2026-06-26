import { Product, Project } from '../types';

const DEFAULT_PRODUCTS: Product[] = [];
const DEFAULT_PROJECTS: Project[] = [];

export const getStoredProducts = (): Product[] => {
  if (typeof window === 'undefined') return DEFAULT_PRODUCTS;
  const stored = localStorage.getItem('yulie_products');
  if (!stored) {
    localStorage.setItem('yulie_products', JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_PRODUCTS;
  }
};

export const saveStoredProduct = (product: Product): Product[] => {
  const products = getStoredProducts();
  const existingIndex = products.findIndex((p) => p.id === product.id);
  if (existingIndex > -1) {
    products[existingIndex] = product;
  } else {
    products.push(product);
  }
  localStorage.setItem('yulie_products', JSON.stringify(products));
  return products;
};

export const deleteStoredProduct = (id: string): Product[] => {
  const products = getStoredProducts();
  const filtered = products.filter((p) => p.id !== id);
  localStorage.setItem('yulie_products', JSON.stringify(filtered));
  return filtered;
};

export const getStoredProjects = (): Project[] => {
  if (typeof window === 'undefined') return DEFAULT_PROJECTS;
  const stored = localStorage.getItem('yulie_projects');
  if (!stored) {
    localStorage.setItem('yulie_projects', JSON.stringify(DEFAULT_PROJECTS));
    return DEFAULT_PROJECTS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_PROJECTS;
  }
};

export const saveStoredProject = (project: Project): Project[] => {
  const projects = getStoredProjects();
  const existingIndex = projects.findIndex((p) => p.id === project.id);
  if (existingIndex > -1) {
    projects[existingIndex] = project;
  } else {
    projects.push(project);
  }
  localStorage.setItem('yulie_projects', JSON.stringify(projects));
  return projects;
};

export const deleteStoredProject = (id: string): Project[] => {
  const projects = getStoredProjects();
  const filtered = projects.filter((p) => p.id !== id);
  localStorage.setItem('yulie_projects', JSON.stringify(filtered));
  return filtered;
};
