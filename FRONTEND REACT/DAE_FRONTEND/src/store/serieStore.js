import { create } from 'zustand';

const useSerieStore = create((set) => ({
  series: [],
  setSeries: (series) => set({ series }),
  removeSerie: (id) => set((state) => ({
    series: state.series.filter((serie) => serie.id !== id)
  })),
}));

export default useSerieStore;
