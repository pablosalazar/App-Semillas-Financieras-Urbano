import { useState } from "react";
import { modules } from "@/shared/constants/modules";
import arrowLeftImg from "@/assets/images/arrows/arrow-left.png";
import arrowRightImg from "@/assets/images/arrows/arrow-right.png";

export function ModulesSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Split modules into slides: first 6, then remaining 5
  const slides = [
    modules.slice(0, 6), // Slide 1: modules 1-6
    modules.slice(6), // Slide 2: modules 7-11
  ];

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full">
      {/* Slider Container */}
      <div className="overflow-hidden max-w-4xl mx-auto -mt-40">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slideModules, slideIndex) => (
            <div
              key={slideIndex}
              className="min-w-full grid grid-cols-3 gap-6 px-10"
            >
              {slideModules.map((module) => (
                <img src={module.image} alt={module.name} className="" />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        disabled={currentSlide === 0}
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 transition-all ${
          currentSlide === 0
            ? "opacity-50 cursor-not-allowed pointer-events-none"
            : "hover:scale-110"
        }`}
        aria-label="Previous slide"
      >
        <img
          src={arrowLeftImg}
          alt="Previous"
          className={`w-16 h-16 ${currentSlide === 0 ? "grayscale" : ""}`}
        />
      </button>

      <button
        onClick={goToNextSlide}
        disabled={currentSlide === slides.length - 1}
        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 transition-all ${
          currentSlide === slides.length - 1
            ? "opacity-50 cursor-not-allowed pointer-events-none"
            : "hover:scale-110"
        }`}
        aria-label="Next slide"
      >
        <img
          src={arrowRightImg}
          alt="Next"
          className={`w-16 h-16 ${
            currentSlide === slides.length - 1 ? "grayscale" : ""
          }`}
        />
      </button>

      {/* Slide Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index
                ? "bg-(--blue) w-8"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
