import { create } from "zustand";
import { initializeExchangeRates } from "@/lib/currency";

interface LocationState {
  country: string;
  city: string;
  latitude: number | null;
  longitude: number | null;
  isLoading: boolean;
  error: string | null;
  setLocation: (
    country: string,
    city: string,
    latitude: number,
    longitude: number
  ) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  country: "USA",
  city: "New York",
  latitude: null,
  longitude: null,
  isLoading: true,
  error: null,
  setLocation: (country, city, latitude, longitude) => {
    set({ country, city, latitude, longitude, isLoading: false, error: null });
    // --- Initialize exchange rates when location is set ---
    initializeExchangeRates();
  },
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
}));
