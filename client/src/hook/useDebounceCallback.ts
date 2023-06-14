import { useEffect, useRef } from "react";

const useDebounceEffect = (fnc: any, deps: any[], delay: any) => {
  const ref = useRef();

  useEffect(() => {
    clearTimeout(ref.current);
    // @ts-ignore
    ref.current = setTimeout(() => {
      fnc();
      clearTimeout(ref.current);
    }, delay);
  }, [...deps, fnc, delay]);
};

export default useDebounceEffect;