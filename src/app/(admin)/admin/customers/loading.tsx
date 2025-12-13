import { Loader } from "lucide-react";

const loading = () => {
  return (
    <div className="flex items-center justify-center py-12 gap-3">
      <Loader className=" size-6 text-primary animate-spin" />
      <p className="animate-pulse">Loading customers...</p>
    </div>
  );
};
export default loading;
