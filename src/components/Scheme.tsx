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
  const prevActiveIndex = useRef(activeIndex);
  const prevSchemeIndex = useRef(activeIndex % originalImages.length);
  const schemeIndex = activeIndex % originalImages.length;
  const [animClass, setAnimClass] = useState("enter-up");
  const [displayInfos, setDisplayInfos] = useState(schemes[schemeIndex]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const singleSetWidth = container.scrollWidth / 3;
    container.scrollLeft = singleSetWidth;
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
    }

    // Only animate if the actual scheme content changes
    if (schemeIndex === prevSchemeIndex.current) {
        prevActiveIndex.current = activeIndex;
        return;
    }

    // Determine direction based on activeIndex delta
    // In infinite scroll, a large jump (e.g. 11 -> 0) means forward
    const delta = activeIndex - prevActiveIndex.current;
    let dir: 'forward' | 'backward' = 'forward';

    if (delta > 0) {
        // Normal scroll right or a jump from first set to second? 
        // Actually, simple comparison works if we ignore the infinite jump which shouldn't change schemeIndex
        dir = 'forward';
    } else {
        dir = 'backward';
    }

    // User: "when i click left side, the bubble should down, if right, scroll top"
    // forward (right) -> Up
    // backward (left) -> Down
    const exitClass = dir === 'forward' ? 'exit-up' : 'exit-down';
    const enterClass = dir === 'forward' ? 'enter-up' : 'enter-down';

    setAnimClass(exitClass);

    const timeout = setTimeout(() => {
        setDisplayInfos(schemes[schemeIndex]);
        setAnimClass(enterClass);
    }, 500);

    prevActiveIndex.current = activeIndex;
    prevSchemeIndex.current = schemeIndex;

    return () => clearTimeout(timeout);
  }, [schemeIndex, activeIndex]);

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
          <div className={`bubble-content ${animClass}`}>
            <img src={displayInfos.left} alt="" />
          </div>
        </div>
        
        <div className="bubble-slot top">
          <div className={`bubble-content ${animClass}`}>
            <img src={displayInfos.top} alt="" />
          </div>
        </div>

        <div className="bubble-slot right">
          <div className={`bubble-content ${animClass}`}>
            <img src={displayInfos.right} alt="" />
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
