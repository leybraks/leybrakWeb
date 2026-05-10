import { useNavigate, useLocation } from 'react-router-dom';

/**
 * useScrollTo — scroll suave a una sección por id.
 * Si el usuario no está en la landing, navega primero y luego hace scroll.
 *
 * Uso:
 *   const scrollTo = useScrollTo();
 *   <button onClick={() => scrollTo('cta')}>Contacto</button>
 *   <button onClick={() => scrollTo('how-it-works')}>Cómo funciona</button>
 */
export const useScrollTo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (sectionId) => {
    const scroll = () => {
      const el = document.getElementById(sectionId);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if (location.pathname !== '/') {
      navigate('/');
      // Esperamos a que React renderice la landing antes de hacer scroll
      setTimeout(scroll, 350);
    } else {
      scroll();
    }
  };
};