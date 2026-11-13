import React, {
  Children,
  forwardRef,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { StyleSheet, View, Text } from "react-native";
import type { MapViewProps, MapMarkerProps, Region } from "react-native-maps";
import type * as Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

type MapHandle = { animateToRegion: (region: Region) => void };
type Coordinate = { latitude: number; longitude: number };

export function Marker(_props: MapMarkerProps) {
  return null;
}

function boundsFor(L: typeof Leaflet, region: Region) {
  return L.latLngBounds(
    [region.latitude - region.latitudeDelta / 2, region.longitude - region.longitudeDelta / 2],
    [region.latitude + region.latitudeDelta / 2, region.longitude + region.longitudeDelta / 2],
  );
}

const MapView = forwardRef<MapHandle, MapViewProps>(function MapView(props, ref) {
  const element = useRef<HTMLDivElement>(null);
  const map = useRef<Leaflet.Map | null>(null);
  const library = useRef<typeof Leaflet | null>(null);
  const latest = useRef(props);
  latest.current = props;
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useImperativeHandle(ref, () => ({
    animateToRegion(region) {
      if (map.current && library.current) {
        map.current.fitBounds(boundsFor(library.current, region), { animate: false });
      }
    },
  }), []);

  useEffect(() => {
    let disposed = false;
    let observer: ResizeObserver | undefined;

    async function initialize() {
      const L = await import("leaflet");
      if (disposed || !element.current) return;
      library.current = L;
      const instance = L.map(element.current, {
        scrollWheelZoom: false,
        zoomAnimation: false,
        fadeAnimation: false,
        markerZoomAnimation: false,
      });
      map.current = instance;
      const region = (latest.current.region ?? latest.current.initialRegion ?? {
        latitude: 11.5564, longitude: 104.9282, latitudeDelta: 0.2, longitudeDelta: 0.2,
      }) as Region;
      instance.fitBounds(boundsFor(L, region));
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(instance).on("tileerror", () => {
        // Leave pins and controls usable if the tile service is unreachable.
        setFailed(true);
      }).on("tileload", () => setFailed(false));

      instance.on("click", (event: Leaflet.LeafletMouseEvent) => {
        const coordinate = { latitude: event.latlng.lat, longitude: event.latlng.lng };
        latest.current.onPress?.({ nativeEvent: { coordinate } } as Parameters<NonNullable<MapViewProps["onPress"]>>[0]);
      });
      instance.on("moveend", () => {
        const center = instance.getCenter();
        const bounds = instance.getBounds();
        latest.current.onRegionChangeComplete?.({
          latitude: center.lat,
          longitude: center.lng,
          latitudeDelta: bounds.getNorth() - bounds.getSouth(),
          longitudeDelta: bounds.getEast() - bounds.getWest(),
        }, { isGesture: true });
      });
      if (typeof ResizeObserver !== "undefined") {
        observer = new ResizeObserver(() => instance.invalidateSize({ pan: false }));
        observer.observe(element.current);
      }
      setReady(true);
    }

    initialize().catch(() => { if (!disposed) setFailed(true); });
    return () => {
      disposed = true;
      observer?.disconnect();
      map.current?.stop();
      map.current?.remove();
      map.current = null;
    };
  }, []);

  const { latitude, longitude } = props.region ?? {};
  useEffect(() => {
    if (!ready || latitude === undefined || longitude === undefined || !map.current) return;
    const center = map.current.getCenter();
    // Do not refit the bounds after moveend; it would create a controlled-map loop.
    if (Math.abs(center.lat - latitude) > 0.00001 || Math.abs(center.lng - longitude) > 0.00001) {
      map.current.panTo([latitude, longitude], { animate: false });
    }
  }, [ready, latitude, longitude]);

  useEffect(() => {
    const L = library.current;
    const instance = map.current;
    if (!ready || !L || !instance) return;
    const markers = L.layerGroup().addTo(instance);
    Children.forEach(props.children, child => {
      if (!isValidElement<MapMarkerProps>(child) || child.type !== Marker) return;
      const { coordinate, draggable, title, description, onPress, onDragEnd } = child.props;
      const pin = L.marker([coordinate.latitude, coordinate.longitude], {
        draggable: !!draggable,
        title: title ?? "Location pin",
        icon: L.divIcon({
          className: "amf-map-pin",
          html: '<span style="display:block;width:24px;height:24px;border:3px solid white;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#034090;box-shadow:0 2px 6px #0005"></span>',
          iconSize: [30, 30], iconAnchor: [15, 30],
        }),
      }).addTo(markers);
      if (title || description) {
        const label = document.createElement("span");
        label.textContent = [title, description].filter(Boolean).join(" — ");
        pin.bindTooltip(label);
      }
      pin.on("click", () => onPress?.({ nativeEvent: { coordinate } } as Parameters<NonNullable<MapMarkerProps["onPress"]>>[0]));
      pin.on("dragend", () => {
        const position = pin.getLatLng();
        const coordinate: Coordinate = { latitude: position.lat, longitude: position.lng };
        onDragEnd?.({ nativeEvent: { coordinate } } as Parameters<NonNullable<MapMarkerProps["onDragEnd"]>>[0]);
      });
    });
    return () => { markers.remove(); };
  }, [ready, props.children]);

  return (
    <View style={[{ overflow: "hidden", backgroundColor: "#e8eef3" }, props.style]}>
      <div ref={element} aria-label="Interactive location map" style={{ position: "absolute", inset: 0, zIndex: 0 }} />
      {failed && <View pointerEvents="none" style={styles.notice}><Text style={styles.noticeText}>Map tiles unavailable. Check your connection.</Text></View>}
    </View>
  );
});

const styles = StyleSheet.create({
  notice: { position: "absolute", top: 8, right: 8, left: 50, backgroundColor: "#fff", borderRadius: 6, padding: 8 },
  noticeText: { color: "#334155", fontSize: 12 },
});

export default MapView;
