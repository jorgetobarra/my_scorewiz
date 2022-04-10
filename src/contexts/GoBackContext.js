import React from 'react';

export default React.createContext({ disableBack: false, useGoBack: () => {} });

export function ToggleGoBack() {
  const [disableBack, setDisableBack] = React.useState(false);
  const useGoBack = React.useMemo(
    () => ({
      setDisableBack,
    }),
    [],
  );
  return { disableBack, useGoBack };
}
