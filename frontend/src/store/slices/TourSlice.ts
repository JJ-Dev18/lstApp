
export interface TourState {
  run: boolean;
  stepIndex: number;
  steps: any[];
  startTour: (steps: any[]) => void;
  stopTour: () => void;
  setStepIndex: (index: number) => void;
}

export const createTourSlice =(set: any): TourState => ({
    run: false,
    steps: [],
    stepIndex: 0,
    startTour: (steps: any[]) => set({ run: true, steps }),
    stopTour: () => set({ run: false, stepIndex: 0 }),
    setStepIndex: (index) => set({ stepIndex: index }),

})
