import { useWindowDimensions } from "react-native";

export function useResponsive() {
  const { width } = useWindowDimensions();

  const isSmallPhone = width < 360;
  const isPhone = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isIpad = width >= 1024;

  return {
    width,
    isSmallPhone,
    isPhone,
    isTablet,
    isIpad,
    cols: isTablet || isIpad ? 4 : 2,
  };
}