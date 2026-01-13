import { FiShoppingBag } from "react-icons/fi";

const products = [
  {
    id: 1,
    name: "Modern Wood Furniture",
    price: "$260",
    image: "/img/wood-table.jpg",
  },
  {
    id: 2,
    name: "Light Wing Chair",
    price: "$458",
    image: "/img/wing-chair.jpg",
  },
  {
    id: 3,
    name: "Marble Table",
    price: "$597",
    image: "/img/marble-table.jpg",
  },
];



export default function ProductCard({ product }) {
  return (
    <div className="group w-full">
  
      <div className="relative h-[320px] overflow-hidden bg-[#C6A27E]">

   
        <img
          src={product.image}
          alt={product.name}
          className="
            absolute inset-0 
            w-full h-full 
            object-cover
            scale-100
            transition-transform duration-700 ease-out
            group-hover:scale-110
          "
        />

  
        <div className="
          absolute inset-0 
          bg-gradient-to-t 
          from-[#4A2E1F]/70 
          via-[#4A2E1F]/20 
          to-transparent
        " />


        <div className="relative z-10 h-full flex flex-col justify-end p-6">
          <h3 className="text-[17px] font-semibold text-[#F7EFE7]">
            {product.name}
          </h3>
          <p className="text-sm text-[#F7EFE7]/80 mt-1">
            {product.price}
          </p>
        </div>

        <button
          className="
            absolute top-5 right-5 z-20
            text-[#F7EFE7]
            opacity-0
            group-hover:opacity-100
            transition
            hover:scale-110
          "
        >
          <FiShoppingBag size={22} />
        </button>
      </div>
    </div>
  );
}

