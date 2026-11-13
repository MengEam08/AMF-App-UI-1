import { useWindowDimensions } from "react-native";

export function useAppDimensions() {
  const window = useWindowDimensions();
  const isWide = window.width >= 600;
  return {
    ...window,
    width: isWide ? 390 : window.width,
    height: isWide ? Math.min(844, window.height - 48) : window.height,
  };
}
