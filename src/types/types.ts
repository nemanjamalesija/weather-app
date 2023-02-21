export type appState = {
  city: string;
  cityData: any[];
  loading: boolean;
  showFahrenheit: boolean;
  coords: any[];
};

export type weatherContext = {
  state: appState;
};
