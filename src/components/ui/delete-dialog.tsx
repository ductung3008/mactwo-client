import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog';
import { Button } from './button';

export interface DeleteDialogProps {
  title: string;
  description: string;
  onDelete: () => void | Promise<void>;
}

const DeleteDialog = ({ title, description, onDelete }: DeleteDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
<<<<<<< HEAD
        <Button variant='destructive'>Delete</Button>
=======
        <Button variant='destructive'>Xóa</Button>
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onDelete();
            }}
          >
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
