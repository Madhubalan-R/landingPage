import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../css/testimonial.css';

const testimonials = [
    {
        id: 1,
        name: "Priya S.,",
        role: "Madurai",
        content: "“I started saving with just ₹100, and now I can actually see my gold weight growing every day. It feels simple and secure.”",
        image: "profile.jpg"
    },
    {
        id: 2,
        name: "Arjun K.,",
        role: "Salem",
        content: "“The live gold rate tracking feature helps me decide the right time to save. Everything is transparent and easy to understand.”",
        image: "profile.jpg"
    },
    {
        id: 3,
        name: "Divya R.,",
        role: "Trichy",
        content: "“I love that my savings are converted into real 22Kt gold instantly. The 8% bonus benefit is an added advantage.”",
        image: "profile.jpg"
    },
    {
        id: 4,
        name: "Naveen M.,",
        role: "Tirunelveli",
        content: "“The app is very user-friendly. Registration took less than a minute, and I started saving immediately.”",
        image: "profile.jpg"
    },
    {
        id: 5,
        name: "Vikki K.,",
        role: "Dindigul",
        content: "” Good gold app and investment will high profit compare other jewellers shop”",
        image: "profile.jpg"
    }
];

const Testimonial = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const touchStartX = useRef<number | null>(null);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, []);

    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(nextSlide, 5000);
            return () => clearInterval(interval);
        }
    }, [isPaused, nextSlide]);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        setIsPaused(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const currentX = e.touches[0].clientX;
        const diff = touchStartX.current - currentX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            touchStartX.current = null;
        }
    };

    const handleTouchEnd = () => {
        setIsPaused(false);
        touchStartX.current = null;
    };

    return (
        <section className="testimonial-section">
            <div 
                className="testimonial-wrapper"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div 
                    className="testimonial-track"
                    style={{ 
                        transform: `translateX(calc(var(--card-width) - ${currentIndex} * var(--card-step)))` 
                    } as React.CSSProperties}
                >
                    {testimonials.map((item, index) => {
                        const isActive = index === currentIndex;
                        return (
                            <div 
                                key={item.id} 
                                className={`testimonial-card-container ${isActive ? 'active' : ''}`}
                            >
                                <div className="testimonial-card">
                                    <div className="profile-image-container">
                                        <img src={item.image} alt={item.name} className="profile-img" />
                                    </div>
                                    <h4 className="profile-name">{item.name}</h4>
                                    <p className="profile-role">{item.role}</p>
                                    <p className="testimonial-text">{item.content}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="testimonial-pagination">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        className={`pagination-dot ${currentIndex === index ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Testimonial;