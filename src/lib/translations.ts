/**
 * Translation Helper Utility
 *
 * This file provides type-safe translation keys and helper functions
 * for easier use of translations throughout the app.
 */

export type TranslationSection =
  | "common"
  | "nav"
  | "products"
  | "filters"
  | "sort"
  | "cart"
  | "auth"
  | "admin"
  | "footer";

/**
 * Common translation keys
 */
export const commonKeys = {
  welcome: "welcome",
  search: "search",
  filter: "filter",
  sort: "sort",
  clear: "clear",
  apply: "apply",
  cancel: "cancel",
  save: "save",
  delete: "delete",
  edit: "edit",
  view: "view",
  close: "close",
  loading: "loading",
  error: "error",
  success: "success",
  home: "home",
  products: "products",
  cart: "cart",
  wishlist: "wishlist",
  account: "account",
  signIn: "signIn",
  signOut: "signOut",
  register: "register",
} as const;

/**
 * Product translation keys
 */
export const productKeys = {
  allProducts: "allProducts",
  filterBy: "filterBy",
  sortBy: "sortBy",
  clearFilters: "clearFilters",
  noProducts: "noProducts",
  addToCart: "addToCart",
  buyNow: "buyNow",
  outOfStock: "outOfStock",
  inStock: "inStock",
  lowStock: "lowStock",
  viewDetails: "viewDetails",
  quickView: "quickView",
  compare: "compare",
  featured: "featured",
  new: "new",
  sale: "sale",
} as const;

/**
 * Cart translation keys
 */
export const cartKeys = {
  myCart: "myCart",
  emptyCart: "emptyCart",
  subtotal: "subtotal",
  shipping: "shipping",
  total: "total",
  checkout: "checkout",
  continueShopping: "continueShopping",
  remove: "remove",
  quantity: "quantity",
} as const;

/**
 * Admin translation keys
 */
export const adminKeys = {
  dashboard: "dashboard",
  orders: "orders",
  products: "products",
  customers: "customers",
  inventory: "inventory",
  categories: "categories",
  support: "support",
  settings: "settings",
  analytics: "analytics",
  reports: "reports",
} as const;

/**
 * Helper function to get translation section based on context
 */
export function getTranslationSection(path: string): TranslationSection {
  if (path.startsWith("/admin")) return "admin";
  if (path.startsWith("/products")) return "products";
  if (path.startsWith("/cart")) return "cart";
  if (path.includes("signin") || path.includes("signup")) return "auth";
  return "common";
}

/**
 * Usage Examples:
 *
 * // In a component:
 * import { useTranslations } from 'next-intl';
 * import { productKeys } from '@/lib/translations';
 *
 * const t = useTranslations('products');
 * <button>{t(productKeys.addToCart)}</button>
 *
 * // Auto-detect section:
 * import { getTranslationSection } from '@/lib/translations';
 * const section = getTranslationSection(pathname);
 * const t = useTranslations(section);
 */
