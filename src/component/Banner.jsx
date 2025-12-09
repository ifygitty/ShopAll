import React, {useState, useEffect} from 'react'
import  {FaArrowRight, FaChevronRight} from 'react-icons/fa'
const Banner = () => {

    const sliderData = [
    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: "/image/accessories/header_headphone_image.png",
    },
    {
      id: 2,
      title: "Next-Level Outfits Starts Here - Discover more fashion you can ever imagine",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: "/image/clothes/img3.png",
    },
    {
      id: 3,
      title: "Power Meets Elegance - Incredible fragrance awaits you",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: "/image/perfumes/image3.jpg",
    }
    ]
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className='overflow-hidden relative w-full'>
        <div className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}>
            {sliderData.map((slide, index) => (
            <div key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full">
                
            <div className="md:pl-8 mt-10 md:mt-0">
              <p className="md:text-base text-blue-600 pb-1">{slide.offer}</p>
              <h1 className="max-w-lg md:text-[30px] md:leading[48px] lg:text-[35px] text-2xl font-semibold">
                {slide.title}
              </h1>
              <div className="flex items-center mt-4 md:mt-6 ">
                <button className="md:px-10 px-7 md:py-2.5 py-2 bg-blue-600 rounded-full text-white font-medium">
                  {slide.buttonText1}
                  
                </button>
                <button className="group flex items-center gap-2 px-6 py-2.5 font-medium">
                  {slide.buttonText2}
                  
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                className="md:w-72 w-48"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
              />
            </div>
            </div>
            ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-blue-600" : "bg-gray-500/30"
            }`}
          ></div>
        ))}
      </div>

    </div>
  )
}

export default Banner