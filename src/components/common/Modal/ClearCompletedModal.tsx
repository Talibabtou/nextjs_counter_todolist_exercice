'use client';

import { useAppDispatch } from '@/store/store';
import { clearCompleted } from '@/reducers/todoReducer';
import Modal from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button';

interface ClearCompletedModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedCount: number;
  onConfirm: () => void;
}

export default function ClearCompletedModal({
  isOpen,
  onClose,
  completedCount,
  onConfirm,
}: ClearCompletedModalProps) {
  const dispatch = useAppDispatch();

  const handleConfirmClear = () => {
    dispatch(clearCompleted());
    onConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Clear Completed Todos"
    >
      <div className="space-y-4">
        <p className="text-secondary">
          Are you sure you want to delete all {completedCount} completed todo{completedCount !== 1 ? 's' : ''}?
        </p>
        <p className="text-sm text-tertiary">
          This action cannot be undone.
        </p>
        
        <div className="flex gap-3 justify-end">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirmClear}
          >
            Clear All Completed
          </Button>
        </div>
      </div>
    </Modal>
  );
}
