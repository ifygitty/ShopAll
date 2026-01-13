import { motion } from "framer-motion";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const Pagination = ({ page, pages, hasNext, hasPrev, onPageChange }) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-10 pb-16">
  
      <button
        disabled={!hasPrev}
        onClick={() => onPageChange(page - 1)}
        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-40"
      >
        <RiArrowLeftSLine />
      </button>

      {[...Array(pages)].map((_, i) => {
        const num = i + 1;
        const active = num === page;

        return (
          <motion.button
            key={num}
            whileTap={{ scale: 0.9 }}
            onClick={() => onPageChange(num)}
            className={`w-10 h-10 rounded-full font-medium transition
              ${
                active
                  ? "bg-black text-white shadow-lg"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            {num}
          </motion.button>
        );
      })}

      <button
        disabled={!hasNext}
        onClick={() => onPageChange(page + 1)}
        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-40"
      >
        <RiArrowRightSLine />
      </button>
    </div>
  );
};

export default Pagination;
