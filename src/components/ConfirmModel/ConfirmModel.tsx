// eslint-disable-next-line import/no-extraneous-dependencies
import { confirmable, createConfirmation } from 'react-confirm';
import { Button, Modal } from 'react-bootstrap';

type ConfirmationProps = {
  okLabel?: string;
  cancelLabel?: string;
  title?: string;
  confirmation: string;
  show?: boolean;
  proceed?: (value: boolean) => void;
  enableEscape?: boolean;
};

function Confirmation({
  okLabel = 'OK',
  cancelLabel = 'Cancel',
  title = 'Confirmation',
  confirmation,
  show = true,
  proceed = () => false,
  enableEscape = true,
}: ConfirmationProps) {
  return (
    <Modal
      animation={false}
      show={show}
      onHide={() => proceed(false)}
      backdrop={enableEscape ? true : 'static'}
      keyboard={enableEscape}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{confirmation}</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={() => proceed(false)}>
          {cancelLabel}
        </Button>
        <Button variant="outline-danger" onClick={() => proceed(true)}>
          {okLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function confirm(
  confirmation: string,
  okLabel = 'OK',
  cancelLabel = 'Cancel',
  options: Record<string, unknown> = {},
) {
  return createConfirmation(confirmable(Confirmation))({
    confirmation,
    okLabel,
    cancelLabel,
    ...options,
  });
}
