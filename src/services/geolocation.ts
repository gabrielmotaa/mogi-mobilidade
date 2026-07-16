import type { UserLocationState } from '../types/bus';

export const DEFAULT_STREET = 'Rua Dr. Deodato Wertheimer';

/**
 * Tenta obter a localização atual do usuário via Geolocation API
 * e resolver o nome da via física usando geocodificação reversa.
 */
export async function getCurrentUserLocation(): Promise<UserLocationState> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({
        streetName: DEFAULT_STREET,
        lat: null,
        lng: null,
        isGranted: false,
        isLoading: false,
        error: 'Geolocalização não é suportada neste navegador.',
        isManual: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        let streetName = DEFAULT_STREET;
        try {
          const streetFromGeo = await reverseGeocode(lat, lng);
          if (streetFromGeo) {
            streetName = streetFromGeo;
          }
        } catch (e) {
          console.warn('Falha ao resolver nome da rua via GPS, mantendo rua padrão de Mogi:', e);
        }

        resolve({
          streetName,
          lat,
          lng,
          isGranted: true,
          isLoading: false,
          error: null,
          isManual: false,
        });
      },
      (error) => {
        console.warn('Permissão de geolocalização recusada ou erro de sinal:', error.message);
        resolve({
          streetName: DEFAULT_STREET,
          lat: null,
          lng: null,
          isGranted: false,
          isLoading: false,
          error: 'Permissão de localização não concedida. Exibindo ponto central.',
          isManual: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 60000,
      }
    );
  });
}

/**
 * Geocodificação reversa usando OpenStreetMap Nominatim (gratuito e sem API Key).
 */
async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
      {
        headers: {
          'User-Agent': 'MogiMobilidadeApp/1.0',
        },
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    const address = data.address;

    if (!address) return null;

    // Tenta obter o nome da rua/avenida
    const road = address.road || address.pedestrian || address.suburb || address.neighbourhood;
    if (road) {
      return road;
    }
  } catch (err) {
    console.warn('Erro ao chamar Nominatim:', err);
  }
  return null;
}
