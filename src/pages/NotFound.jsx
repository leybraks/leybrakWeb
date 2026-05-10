import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const NotFound = () => {
  const ref = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo(ref.current,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
    );
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-6 bg-leybrak-light dark:bg-leybrak-dark"
      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right,  rgba(128,128,128,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(128,128,128,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div ref={ref} className="text-center relative z-10">
        <div className="text-[8rem] font-black text-gray-200 dark:text-gray-800 leading-none select-none mb-4">
          404
        </div>
        <span className="inline-flex items-center bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[11px] px-3 py-1.5 uppercase tracking-[0.2em] border-l-4 border-leybrak-blue font-bold mb-6 block w-fit mx-auto">
          // PAGINA_NO_ENCONTRADA
        </span>
        <p
          className="text-gray-500 dark:text-gray-400 text-[1rem] mb-8 max-w-xs mx-auto"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          Esta página no existe, pero tu negocio sí puede existir en digital.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-3 bg-leybrak-blue text-white px-8 py-4 text-[13px] font-bold uppercase tracking-widest border-2 border-leybrak-blue hover:bg-transparent hover:text-leybrak-blue transition-all duration-200"
          style={{ boxShadow: '4px 4px 0px #111827' }}
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
};

export default NotFound;