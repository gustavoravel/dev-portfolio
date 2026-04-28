import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { ThemeContext } from 'styled-components';
import AppContext from '../AppContext';

function LanguageToggler() {
  const theme = useContext(ThemeContext);
  const { language } = useContext(AppContext);

  return (
    <Button
      size="sm"
      variant={theme.bsSecondaryVariant}
      style={{ marginLeft: 12 }}
      onClick={language.toggle}
    >
      {language.value === 'pt' ? 'PT' : 'EN'}
    </Button>
  );
}

export default LanguageToggler;
