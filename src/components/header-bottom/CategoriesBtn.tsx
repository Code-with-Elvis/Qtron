import { BiMenu } from "react-icons/bi";

const CategoriesBtn = () => {
  return (
    <button className="h-9 border-transparent hover:border-white border px-1.5 rounded flex items-center transition-all gap-0.5 duration-100 ease-in-out">
      <BiMenu className="size-7" />
      All
    </button>
  );
};
export default CategoriesBtn;
