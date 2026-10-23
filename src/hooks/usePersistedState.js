import { useState } from "react";

export default function usePersistedState(key, initialState) {
    const [state, setState] = useState(() => {
        try {
            const persistedState = localStorage.getItem(key);

            if (persistedState) {
                return JSON.parse(persistedState);
            }
        } catch {
            // storage unavailable or the saved text is broken: start fresh
        }

        return initialState;
    });

    const setPersistedState = (value) => {
        let resultState = value;

        if (typeof value === 'function') {
            resultState = value(state);
        }

        try {
            if (resultState === null || resultState === undefined) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, JSON.stringify(resultState));
            }
        } catch {
            // storage full or blocked: the app keeps working, just without saving
        }

        setState(resultState);
    };

    return [state, setPersistedState];
}