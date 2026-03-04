import "../css/Scheme.css";
import { useRef, useState, useEffect } from "react";

const originalImages = [
  "schemes/egold.png",
  "schemes/esilver.png",
  "schemes/goldtree.png",
  "schemes/futureplus.png",
  "schemes/acs.png",
  "schemes/spark.png"
];

const images = [...originalImages, ...originalImages, ...originalImages];

const schemes = [
  {
    id: 'gold',
    left: "benefits/egoldleft.png",
    top: "benefits/egoldtop.png",
    right: "benefits/egoldright.png"
  },
  {
    id: 'silver',
    left: "benefits/esilverleft.png",
    top: "benefits/esilvertop.png",
    right: "benefits/esilverright.png"
  },
  {
    id: 'tree',
    left: "benefits/goldtreeleft.png",
    top: "benefits/goldtreetop.png",
    right: "benefits/goldtreeright.png"
  },
  {
    id: 'jewel',
    left: "benefits/fpleft.png",
    top: "benefits/fptop.png",
    right: "benefits/fpright.png"
  },
  {
    id: 'plus',
    left: "benefits/acsleft.png",
    top: "benefits/acstop.png",
    right: "benefits/acsright.png"
  },
  {
    id: 'spark',
    left: "benefits/sparkleft.png",
    top: "benefits/sparktop.png",
    right: "benefits/sparkright.png"
  }
];

function Scheme() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(originalImages.length);
  const leftStrip = images.map((_, i) => schemes[i % schemes.length].left);
  const topStrip = images.map((_, i) => schemes[i % schemes.length].top);
  const rightStrip = images.map((_, i) => schemes[i % schemes.length].right);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const singleSetWidth = container.scrollWidth / 3;
    container.scrollLeft = singleSetWidth;
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % images.length;
      handleClick(nextIndex);
    }, 3000);

    return () => clearInterval(timer);
  }, [activeIndex]);

  const handleClick = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const element = container.children[index] as HTMLElement;
    if (!element) return;

    const containerCenter = container.offsetWidth / 2;
    const elementCenter = element.offsetLeft + element.offsetWidth / 2;

    container.scrollTo({
      left: elementCenter - containerCenter,
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const center = container.scrollLeft + container.offsetWidth / 2;
    const items = Array.from(container.children);

    let closestIndex = 0;
    let closestDistance = Infinity;

    items.forEach((item, index) => {
      const el = item as HTMLElement;
      const itemCenter = el.offsetLeft + el.offsetWidth / 2;
      const distance = Math.abs(center - itemCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }

    const singleSetWidth = container.scrollWidth / 3;

    if (container.scrollLeft <= 5) {
      container.scrollLeft += singleSetWidth;
    } else if (container.scrollLeft >= singleSetWidth * 2 - 5) {
      container.scrollLeft -= singleSetWidth;
    }
  };

  return (
    <div className="scheme">
      <div className="benefits">
        <div className="bubble-slot left">
          <div className="bubble-strip" style={{ 
            transform: `translateY(-${(activeIndex * 100) / images.length}%)`,
            transitionDelay: '0.1s'
          }}>
            {leftStrip.map((src, i) => (
              <div className="strip-item left" key={i}>
                <img src={src} alt="" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="bubble-slot top">
          <div className="bubble-strip" style={{ 
            transform: `translateY(-${(activeIndex * 100) / images.length}%)`,
            transitionDelay: '0.1s'
          }}>
            {topStrip.map((src, i) => (
              <div className="strip-item top" key={i}>
                <img src={src} alt="" />
              </div>
            ))}
          </div>
        </div>

        <div className="bubble-slot right">
          <div className="bubble-strip" style={{ 
            transform: `translateY(-${(activeIndex * 100) / images.length}%)`,
            transitionDelay: '0.1s'
          }}>
            {rightStrip.map((src, i) => (
              <div className="strip-item right" key={i}>
                <img src={src} alt="" />
              </div>
            ))}
          </div>
        </div>
        <div className="appView">
          <img src="schemes/app.png" alt="Mobile" className="Mobile" />
          <div
            className="schemeCards"
            ref={containerRef}
            onScroll={handleScroll}
          >
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt=""
                className={index === activeIndex ? "active" : ""}
                onClick={() => handleClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scheme;
