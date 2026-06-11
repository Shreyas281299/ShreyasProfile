import React, { useEffect, useRef } from "react";
import Application from "../../javascript/Application";

const DriveWorldCanvas = () => {
  const canvasRef = useRef(null);
  const applicationRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || applicationRef.current) return undefined;

    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const originalBodyStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
    };

    const preventScroll = (event) => {
      event.preventDefault();
    };

    const preventSpaceScroll = (event) => {
      if (event.code === "Space" && event.target === document.body) {
        event.preventDefault();
      }
    };

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = `-${scrollX}px`;
    document.body.style.right = "0";
    document.body.style.width = "100%";

    window.addEventListener("wheel", preventScroll, { passive: false, capture: true });
    window.addEventListener("mousewheel", preventScroll, { passive: false, capture: true });
    window.addEventListener("keydown", preventSpaceScroll, { capture: true });

    applicationRef.current = new Application({
      $canvas: canvasRef.current,
    });

    return () => {
      if (applicationRef.current?.destructor) {
        applicationRef.current.destructor();
      }
      applicationRef.current = null;

      window.removeEventListener("wheel", preventScroll, { capture: true });
      window.removeEventListener("mousewheel", preventScroll, { capture: true });
      window.removeEventListener("keydown", preventSpaceScroll, { capture: true });

      document.body.style.overflow = originalBodyStyles.overflow;
      document.body.style.position = originalBodyStyles.position;
      document.body.style.top = originalBodyStyles.top;
      document.body.style.left = originalBodyStyles.left;
      document.body.style.right = originalBodyStyles.right;
      document.body.style.width = originalBodyStyles.width;
      window.scrollTo(scrollX, scrollY);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="drive-world-canvas" />
      <div className="js-threejs-journey drive-world-journey-stub">
        <p className="js-message">Drive mode loaded.</p>
        <button type="button" className="js-yes">yes</button>
        <button type="button" className="js-no">no</button>
      </div>
    </>
  );
};

export default DriveWorldCanvas;
