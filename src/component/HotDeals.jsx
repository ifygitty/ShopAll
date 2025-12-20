import React from 'react'
import  {FaArrowRight, FaChevronRight} from 'react-icons/fa'
const dealsbanner = [
    {
        img:"/image/hot/black outfit .jpg", title:"Summer Arrival of Outfit", subtitle:"Discover quality fashion that reflects your style and makes everydat enjoyable", link: "EXPLORE PRODUCT"
    }
]
const deals = [
    {
        img:"/image/hot/glass.png", title:"Trendy Sunglasses"
    },
    {
        img:"/image/hot/iPhone .jpg", title:"popular accessories"
    }
]

const HotDeals = () => {
  return (
    <div className='grid grid-cols-1 gap-4 mt-10'>
        {dealsbanner.map((banner) => (
            <div className='w-full relative h-100 bg-template-whitesmoke overflow-hidden group rounded-lg font-template-badoni'>
                            <img src={banner.img}  className="w-full h-full object-cover object-[50%_20%] hover:scale-105 transition-all duration-400 ease-in-out group-hover:scale-105 group-active:scale-105 group-active:duration-150 touch-manipulation rounded-lg" />
                            <div className="absolute top-2 right-2 text-white font-medium text-2xl max-sm:text-xl">
                                50% OFF
                            </div>
                            <div className='max-w-lg md:text-[35px] md:leading[48px] absolute top-40 left-5 text-white font-medium text-2xl'>{banner.title}</div>
                            <div className='max-w-lg text-[20px] md:leading[48px] absolute top-55 left-5 text-white font-medium text-2xl max-md:text-[12px] max-md:top-57 '>{banner.subtitle}</div>
                            <button className=' flex  items-center gap-2 text-white bg-black/80 p-2 rounded-lg absolute top-75 left-5 max-md:top-80 max-md:text-sm'>{banner.link}
                            <FaArrowRight />
                            </button>
                            </div>
                            
        ))}
        
    </div>
  )
}

export default HotDeals