"use client";

import { MapPin } from "lucide-react";
import { useEffect } from "react";
import { useLocationStore } from "@/store/useLocationStore";

const LocationBox = () => {
  const { country, city, isLoading, setLocation, setLoading, setError } =
    useLocationStore();

  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        setError("Geolocation not supported");
        setLocation("USA", "New York", 40.7128, -74.006);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // === Reverse geocode using OpenStreetMap Nominatim API ===
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
              {
                headers: {
                  "User-Agent": "Qtron-Ecommerce",
                },
              }
            );

            const data = await res.json();

            if (data.address) {
              const country = data.address.country || "USA";
              const city =
                data.address.city ||
                data.address.town ||
                data.address.village ||
                data.address.state ||
                "New York";

              setLocation(country, city, latitude, longitude);
            } else {
              setLocation("USA", "New York", latitude, longitude);
            }
          } catch (error) {
            console.error("Error reverse geocoding:", error);
            setLocation("USA", "New York", latitude, longitude);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setError(error.message);
          // === Default to USA if permission denied or error ===
          setLocation("USA", "New York", 40.7128, -74.006);
        }
      );
    };

    getLocation();
  }, [setLocation, setLoading, setError]);

  return (
    <div className="hidden lg:flex h-12.5 cursor-no-drop shrink-0 px-1.5 border-transparent hover:border-border border rounded items-center gap-1 transition-all duration-100 ease-in-out">
      <MapPin className="size-5" />
      <div className="flex flex-col gap-0">
        <span className="text-sm text-muted-foreground leading-tight">
          Deliver to
        </span>
        <p className="font-semibold leading-none">
          {isLoading ? "Loading..." : `${city}, ${country}`}
        </p>
      </div>
    </div>
  );
};
export default LocationBox;
