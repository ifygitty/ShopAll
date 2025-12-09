import React, { useState } from 'react'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import { FaStar,FaRegStar, FaStarHalf, FaShoppingCart } from 'react-icons/fa'
const ProductsCard = ({product}) => {
    const[currency, setCurrency] = useState("$")
  return (

    
    <div
            // onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0) }}
            className="flex flex-col items-start gap-0.5 max-w-[250px] w-full cursor-pointer"
        >
            {/* <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center"> */}
            {product.image.startsWith('/image/perfumes')?(
                <div className='w-full relative h-52 bg-template-whitesmoke overflow-hidden group rounded-lg'>
                <img src={product.image} alt={product.name} className="w-full h-full object-cover object-[50%_20%] hover:scale-105 transition-all duration-400 ease-in-out group-hover:scale-105 group-active:scale-105 group-active:duration-150 touch-manipulation rounded-lg" />
                <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
                    <AiOutlineHeart/>
                </button>
                </div>
            ): (
                <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center p-2">
                    <img
                    src={product.image}
                    alt={product.name}
                    className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
                    width={800}
                    height={800}
                />
                <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
                    <AiOutlineHeart/>
                </button>
                </div>
                
            )}
                {/* <img
                    src={product.image}
                    alt={product.name}
                    className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
                    width={800}
                    height={800}
                /> */}
                {/* <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
                    <AiFillHeart/>
                </button> */}
            {/* </div> */}

            <p className="md:text-base font-medium pt-2 w-full truncate">{product.name}</p>
            <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">{product.description}</p>
            <div className="flex items-center gap-2">
                <p className="text-xs">{4.5}</p>
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                        // <Image
                        //     key={index}
                        //     className="h-3 w-3"
                        //     src={
                        //         index < Math.floor(4)
                        //             ? assets.star_icon
                        //             : assets.star_dull_icon
                        //     }
                        //     alt="star_icon"
                        // />
                        <FaStar className={
      index < 4
        ? "text-orange-600"   // filled star
        : "text-gray-300"     // dull/empty looking star
    } key={index}/>
                    ))}
                </div>
            </div>

            <div className="flex items-end justify-between w-full mt-1">
                <p className="text-base font-medium">{currency}{product.offerPrice}</p>
                <button className=" text-xl px-4 py-1.5 text-gray-500   hover:bg-slate-50 transition">
                    <FaShoppingCart />
                </button>
            </div>
        </div>
    )

}

export default ProductsCard