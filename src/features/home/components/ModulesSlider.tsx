import { useState } from "react";
import { modules } from "@/shared/constants/modules";
import arrowLeftImg from "@/assets/images/controls/arrow-left.png";
import arrowRightImg from "@/assets/images/controls/arrow-right.png";
import { Link } from "react-router";

export function ModulesSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Split modules into slides: first 6, then remaining 5
  const slides = [
    modules.slice(0, 6), // Slide 1: modules 1-6
    modules.slice(6), // Slide 2: modules 7-11
  ];

  // Minimum swipe distance (in pixels) to trigger slide change
  const minSwipeDistance = 50;

  const goToNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset touch end
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNextSlide();
    }
    if (isRightSwipe) {
      goToPrevSlide();
    }

    // Reset touch positions
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="relative w-full">
      {/* Slider Container */}
      <div className="overflow-hidden max-w-4xl mx-auto">
        <div
          className="flex transition-transform duration-500 ease-in-out touch-pan-y"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {slides.map((slideModules, slideIndex) => (
            <div
              key={slideIndex}
              className="min-w-full grid grid-cols-3 gap-6 px-10"
            >
              {slideModules.map((module) => (
                <Link key={module.id} to={module.path}>
                  <img src={module.image} alt={module.name} className="" />
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        disabled={currentSlide === 0}
        className={`absolute left-0 top-1/2 -translate-y-1/2  transition-all ${
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
        className={`absolute right-0 top-1/2 -translate-y-1/2  transition-all ${
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
