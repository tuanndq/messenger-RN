import React, {useState, useCallback} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import Button from './Button';

const CopyLinkButton = props => {
  const [showCopied, setShowCopied] = useState(false);

  const copy = useCallback(() => {
    Clipboard.setString(props.roomUrl);
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 2000);
  }, [props.roomUrl]);

  return (
    <Button
      type="secondary"
      onPress={copy}
      disabled={showCopied}
      label={showCopied ? 'Copied!' : 'Copy room link'}
    />
  );
};

export default CopyLinkButton;
