import { motion, AnimatePresence } from "framer-motion";
import { RiSearchLine, RiCloseLine } from "react-icons/ri";

const SearchBar = ({ value, onSearch, onClear }) => {
  return (
    <div className="w-full max-w-xl mx-auto mt-10 px-4">
      <div className="relative">
        <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

        <input
          value={value}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full h-14 pl-12 pr-12 rounded-2xl bg-gray-100 focus:bg-white focus:ring-2 focus:ring-black transition"
        />

        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={onClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              <RiCloseLine size={22} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchBar;
