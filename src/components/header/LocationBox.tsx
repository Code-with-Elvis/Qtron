import { MapPin } from "lucide-react";

const LocationBox = () => {
  return (
    <div className="hidden lg:flex h-12.5 cursor-no-drop shrink-0 px-1.5 border-transparent hover:border-border border rounded items-center gap-1 transition-all duration-100 ease-in-out">
      <MapPin className="size-5" />
      <div className="flex flex-col gap-0">
        <span className="text-sm text-muted-foreground leading-tight">
          Deliver to
        </span>
        <p className="font-semibold leading-none">Kenya</p>
      </div>
    </div>
  );
};
export default LocationBox;
