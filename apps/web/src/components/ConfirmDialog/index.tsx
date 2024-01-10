import { Button, Group, Modal, Text } from '@mantine/core';
import { FC, memo } from 'react';

import classes from './index.module.css';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onAccept: () => void;
  acceptText?: string;
  cancelText?: string;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  onClose,
  onAccept,
  acceptText,
  cancelText,
}) => (
  <Modal opened={isOpen} onClose={onClose} size="auto" centered>
    <Text>{title}</Text>
    <Group mt="xl" gap="md" className={classes.dialogButtons}>
      <Button variant="secondary" onClick={onAccept}>
        {acceptText || 'Yes'}
      </Button>
      <Button variant="secondary" onClick={onClose}>
        {cancelText || 'No'}
      </Button>
    </Group>
  </Modal>
);

export default memo(ConfirmDialog);
