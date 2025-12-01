import { BiMenu } from "react-icons/bi";

const CategoriesBtn = () => {
  return (
    <button className="h-12.5 border-transparent hover:border-border border px-1.5 rounded flex md:hidden items-center transition-all duration-100 ease-in-out">
      <BiMenu className="size-8" />
    </button>
  );
};
export default CategoriesBtn;
