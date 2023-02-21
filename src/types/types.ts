export type appState = {
  city: string;
  cityData: any[];
  loading: boolean;
  showFahrenheit: boolean;
  coords: { lat: number; lon: number };
};

export type weatherContext = {
  state: appState;
};
