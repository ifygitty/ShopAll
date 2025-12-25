import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useProductDetails } from "@/query/queryProducts";
import FullPageLoader from "@/component/FullPageLoader";
const Product = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useProductDetails(id);

  if (isLoading) return <FullPageLoader />;

  if (isError)
    return (
      <div className="text-center text-red-500 mt-20">
        Error: {error.message}
      </div>
    );

  const product = data?.data;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="px-5 lg:px-16 xl:px-20">
          <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-medium mb-4">{product.name}</h1>

          <div className="flex items-center gap-2">
            {[...Array(4)].map((_, i) => (
              <FaStar key={i} className="text-orange-600" />
            ))}
            <FaStar className="text-gray-300" />
            <p>(4.5)</p>
          </div>

          <p className="text-gray-600 mt-3">
            {product.plainDescription}
          </p>

          <p className="text-3xl font-medium mt-6">
            ₦{product.price}
          </p>

          <hr className="my-6" />

          <table className="table-auto">
            <tbody>
              <tr>
                <td className="font-medium">Category</td>
                <td>{product.category?.name}</td>
              </tr>
              <tr>
                <td className="font-medium">Weight</td>
                <td>{product.weight}</td>
              </tr>
              <tr>
                <td className="font-medium">Available</td>
                <td>{product.quantity}</td>
              </tr>
            </tbody>
          </table>

          <div className="flex gap-4 mt-10">
            <button className="w-full py-3 bg-gray-100">
              Add to Cart
            </button>
            <button className="w-full py-3 bg-orange-500 text-white">
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
