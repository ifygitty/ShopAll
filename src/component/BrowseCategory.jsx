import React from 'react'
const category = [
    { img: "/image/clothes/img1.jpg", title: "designers" },
    { img: "image/accessories/img6.png", title: "accessories" },
    { img: "/image/perfumes/image6.jpg", title: "perfumes" },
    { img: "image/clothes/img5.png", title: "clothes" }

]
const BrowseCategory = () => {
    return (
        <div className='mt-10 f'>
            <p className='font-template-lora text-2xl font-medium mb-5'>Browse by Category</p>
            <div className='grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 w-full font-template-badoni max-sm:gap-3'>
                {category.map((category, idx) => (
                    (category.img.startsWith('/image/perfumes') || category.img.startsWith('/image/clothes')) ? (
                        <div key={`${category?.title}-${idx}`} className='w-full relative h-62 bg-template-whitesmoke overflow-hidden group rounded-lg'>
                            <img
                                src={category.img}
                                className="w-full h-full object-cover object-[50%_20%] hover:scale-105 transition-all duration-400 ease-in-out group-hover:scale-105 group-active:scale-105 group-active:duration-150 touch-manipulation rounded-lg"
                            />
                            <div className="absolute bottom-2 left-2  p-2 rounded-lg shadow-md text-black bg-white ">
                                {category.title}
                            </div>
                        </div>
                    ) : (
                        <div key={`${category?.title}-${idx}`} className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-62 flex items-center justify-center overflow-hidden">
                            <img
                                src={category.img}
                                className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
                                width={800}
                                height={800}
                            />
                            <div className="absolute bottom-2 left-2  bg-white p-2 rounded-full shadow-md text-black text-sm ">
                                {category.title}
                            </div>
                        </div>
                    )
                ))}


            </div>
        </div>
    )
}

export default BrowseCategory