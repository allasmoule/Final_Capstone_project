import React, { useState, useEffect } from "react";
import { MapPin, Navigation, AlertCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface LocationDetectorProps {
  onLocationDetected: (location: string) => void;
}

const LocationDetector: React.FC<LocationDetectorProps> = ({
  onLocationDetected,
}) => {
  const [currentLocation, setCurrentLocation] = useState<{
    bn: string;
    en: string;
  } | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string>("");
  const { language, t } = useLanguage();

  // Bangladesh districts mapping with approximate coordinates
  const bangladeshDistricts: {
    [key: string]: { lat: number; lng: number; nameEn: string };
  } = {
    ঢাকা: { lat: 23.8103, lng: 90.4125, nameEn: "Dhaka" },
    চট্টগ্রাম: { lat: 22.3569, lng: 91.7832, nameEn: "Chittagong" },
    সিলেট: { lat: 24.8949, lng: 91.8687, nameEn: "Sylhet" },
    রাজশাহী: { lat: 24.3745, lng: 88.6042, nameEn: "Rajshahi" },
    খুলনা: { lat: 22.8456, lng: 89.5403, nameEn: "Khulna" },
    বরিশাল: { lat: 22.701, lng: 90.3535, nameEn: "Barishal" },
    রংপুর: { lat: 25.7439, lng: 89.2752, nameEn: "Rangpur" },
    ময়মনসিংহ: { lat: 24.7471, lng: 90.4203, nameEn: "Mymensingh" },
    কুমিল্লা: { lat: 23.4607, lng: 91.1809, nameEn: "Comilla" },
    নারায়ণগঞ্জ: { lat: 23.6238, lng: 90.5, nameEn: "Narayanganj" },
    গাজীপুর: { lat: 23.9999, lng: 90.4203, nameEn: "Gazipur" },
    কক্সবাজার: { lat: 21.4272, lng: 92.0058, nameEn: "Cox's Bazar" },
    জামালপুর: { lat: 24.9375, lng: 89.9372, nameEn: "Jamalpur" },
    দিনাজপুর: { lat: 25.6279, lng: 88.6332, nameEn: "Dinajpur" },
    বগুড়া: { lat: 24.851, lng: 89.3697, nameEn: "Bogra" },
    যশোর: { lat: 23.1667, lng: 89.2167, nameEn: "Jessore" },
  };

  // Find nearest district based on coordinates
  const findNearestDistrict = (
    lat: number,
    lng: number,
  ): { bn: string; en: string } => {
    let nearestDistrict = { bn: "ঢাকা", en: "Dhaka" };
    let minDistance = Infinity;

    for (const [district, coords] of Object.entries(bangladeshDistricts)) {
      const distance = Math.sqrt(
        Math.pow(lat - coords.lat, 2) + Math.pow(lng - coords.lng, 2),
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestDistrict = { bn: district, en: coords.nameEn };
      }
    }

    return nearestDistrict;
  };

  const detectLocation = () => {
    setIsDetecting(true);
    setError("");

    if (!navigator.geolocation) {
      setError(t("location.browserNotSupported"));
      setIsDetecting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          // Try to get location from reverse geocoding API first
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=bn`,
            );
            const data = await response.json();

            // Extract district/city from the response
            let detectedLocationBn =
              data.address?.city ||
              data.address?.town ||
              data.address?.district ||
              data.address?.county ||
              data.address?.state ||
              "";

            // Also get English version
            const responseEn = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`,
            );
            const dataEn = await responseEn.json();

            let detectedLocationEn =
              dataEn.address?.city ||
              dataEn.address?.town ||
              dataEn.address?.district ||
              dataEn.address?.county ||
              dataEn.address?.state ||
              "";

            // If we got a location from API, use it
            if (detectedLocationBn || detectedLocationEn) {
              // Try to match with our districts for better names
              for (const [district, coords] of Object.entries(
                bangladeshDistricts,
              )) {
                if (
                  detectedLocationBn.includes(district) ||
                  detectedLocationEn
                    .toLowerCase()
                    .includes(coords.nameEn.toLowerCase())
                ) {
                  detectedLocationBn = district;
                  detectedLocationEn = coords.nameEn;
                  break;
                }
              }
              const location = {
                bn: detectedLocationBn,
                en: detectedLocationEn || detectedLocationBn,
              };
              setCurrentLocation(location);
              onLocationDetected(detectedLocationBn);
            } else {
              // Fall back to nearest district calculation
              const nearestDistrict = findNearestDistrict(latitude, longitude);
              setCurrentLocation(nearestDistrict);
              onLocationDetected(nearestDistrict.bn);
            }
          } catch (apiError) {
            // If API fails, use nearest district calculation
            console.log(
              "Geocoding API failed, using coordinate-based detection",
            );
            const nearestDistrict = findNearestDistrict(latitude, longitude);
            setCurrentLocation(nearestDistrict);
            onLocationDetected(nearestDistrict.bn);
          }

          setIsDetecting(false);
        } catch (err) {
          setError(t("location.errorDetecting"));
          setIsDetecting(false);
        }
      },
      (error) => {
        let errorMessage = t("location.cannotAccess");

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = t("location.permissionDenied");
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = t("location.unavailable");
            break;
          case error.TIMEOUT:
            errorMessage = t("location.timeout");
            break;
        }

        setError(errorMessage);
        setIsDetecting(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl mb-8">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Navigation className="h-8 w-8 text-blue-600 mr-3" />
          <h3 className="text-xl font-bold text-gray-900">
            {t("location.title")}
          </h3>
        </div>

        <p className="text-gray-600 mb-6">{t("location.description")}</p>

        {currentLocation && (
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-center">
              <MapPin className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-800 font-medium">
                {t("location.yourLocation")}{" "}
                {language === "bn" ? currentLocation.bn : currentLocation.en}
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <span className="text-red-800">{error}</span>
            </div>
          </div>
        )}

        <button
          onClick={detectLocation}
          disabled={isDetecting}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            isDetecting
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isDetecting ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {t("location.searching")}
            </div>
          ) : (
            <div className="flex items-center">
              <Navigation className="h-4 w-4 mr-2" />
              {t("location.getMyLocation")}
            </div>
          )}
        </button>

        <p className="text-xs text-gray-500 mt-3">
          {t("location.privacyNote")}
        </p>
      </div>
    </div>
  );
};

export default LocationDetector;
