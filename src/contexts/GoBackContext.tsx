import React from 'react';

interface GoBackContextType {
  disableBack: boolean;
  useGoBack: () => {
    setDisableBack: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export default React.createContext<GoBackContextType>({
  disableBack: false,
  useGoBack: () => ({
    setDisableBack: () => {}
  }),
});

interface ToggleGoBackReturn {
  disableBack: boolean;
  useGoBack: {
    setDisableBack: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export function ToggleGoBack(): ToggleGoBackReturn {
  const [disableBack, setDisableBack] = React.useState<boolean>(false);
  const useGoBack = React.useMemo(
    () => ({
      setDisableBack,
    }),
    [],
  );
  return { disableBack, useGoBack };
}
