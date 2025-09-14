import { useState, useEffect } from "react";
import Map, { Marker, NavigationControl, Source, Layer } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import useGetProfile from "../../../hooks/use-get-profile";

const ORS_API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjRmMDdhYTVmMzY0MDQ0N2I4NjdmM2NkMDIxY2E3OTFlIiwiaCI6Im11cm11cjY0In0=";

export default function Mapp({ setAddressPreview, setLocation }) {
  // مقصد ثابت (مثلاً مرکز تهران)
  const destination = { latitude: 35.6997, longitude: 51.3381 };
  const {data} = useGetProfile();
  // console.log(data)
  // مبدأ اولیه از localStorage یا null
  // const savedCoords = localStorage.getItem("originCoords");
  const [origin, setOrigin] = useState(null);

  useEffect(() => {
    if (data?.latitude && data?.longitude) {
      setOrigin({ latitude: data.longitude, longitude: data.latitude });
    }
  }, [data]);

  const [routeGeoJSON, setRouteGeoJSON] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: destination.longitude,
    latitude: destination.latitude,
    zoom: 12,
  });

  // گرفتن مسیر (Directions)
  useEffect(() => {
    const fetchRoute = async () => {
      if (!origin) return;
      const url =
        "https://api.openrouteservice.org/v2/directions/driving-car/geojson";
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: ORS_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            coordinates: [
              [origin.longitude, origin.latitude],
              [destination.longitude, destination.latitude],
            ],
          }),
        });
        const data = await res.json();
        setRouteGeoJSON(data);
      } catch (err) {
        console.error("Error fetching route:", err);
      }
    };
    fetchRoute();
  }, [origin]);

  // وقتی روی نقشه کلیک می‌کنی
  const handleMapClick = async (event) => {
    const { lng, lat } = event.lngLat;
    const newOrigin = { longitude: lng, latitude: lat };
    setOrigin(newOrigin);
    localStorage.setItem("originCoords", JSON.stringify(newOrigin));

    // گرفتن آدرس معکوس با ORS
    try {
      const res = await fetch(
        `https://api.openrouteservice.org/geocode/reverse?api_key=${ORS_API_KEY}&point.lat=${lat}&point.lon=${lng}&size=1`
      );
      const data = await res.json();

      if (data && data.features && data.features.length > 0) {
        const addressProps = data.features[0].properties;
        setLocation(data)
        setAddressPreview(addressProps);
        // console.log(data)

       
      } else {
        // setAddressPreview("آدرس پیدا نشد");
      }
    } catch (err) {
      console.error("Error fetching address:", err);
    }
  };

  return (
    <div className="rounded-2xl">
      <Map
        mapLib={maplibregl}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "326px", borderRadius: "16px" }}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=lnmmfMnxdJ1bDyVGN18J"
        onClick={handleMapClick}
      >
        <NavigationControl position="top-left" />

        {/* مقصد ثابت */}
        <Marker
          longitude={destination.longitude}
          latitude={destination.latitude}
          color="red"
        />

        {/* مبدأ انتخاب‌شده */}
        {origin && (
          <Marker
            longitude={origin.longitude}
            latitude={origin.latitude}
            color="#61dbfb"
          />
        )}

        {/* مسیر */}
        {routeGeoJSON && (
          <Source id="route" type="geojson" data={routeGeoJSON}>
            <Layer
              id="route-line"
              type="line"
              paint={{ "line-color": "#0074D9", "line-width": 4 }}
            />
          </Source>
        )}
      </Map>
    </div>
  );
}
