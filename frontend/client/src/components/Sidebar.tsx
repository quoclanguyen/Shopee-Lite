import { category } from "../constants/categories";
import { Category } from "../interfaces";

function Sidebar() {
  return (
    <div className="bg-gray-300 p-4 rounded-md w-[10vw]">
      <ul>
        {category.map((item: Category, index: number) => (
          <li key={index}>{item.label}</li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
