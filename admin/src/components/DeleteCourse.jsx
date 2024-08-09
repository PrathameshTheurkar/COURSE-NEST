import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useDeleteCourse } from '../hooks/useDeleteCourse';

const DeleteCourse = () => {
    const {deleteCourse} = useDeleteCourse()

    return <>
    <IconButton onClick={deleteCourse}>
    <DeleteIcon />
    </IconButton>
    </>
}

export default DeleteCourse