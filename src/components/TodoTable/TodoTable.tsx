import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  TableContainer,
  Paper,
  IconButton,
} from '@mui/material';
import { MdDeleteForever } from 'react-icons/md';
import { deleteData } from '../../Helper/requests';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import { ToastNotification } from '../Toast/Toast';

interface Props {
  todos: Todo[];
}

export const TodoTable: React.FC<Props> = ({ todos }) => {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState<Todo[]>([]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Todo>('deadline');

  useEffect(() => {
    const sortedTodos = todos.sort((a, b) => {
      const dateA = new Date(a.deadline);
      const dateB = new Date(b.deadline);

      if (dateA < new Date()) {
        return -1;
      }

      if (dateB < new Date()) {
        return 1;
      }

      return dateA.getTime() - dateB.getTime();
    });

    setData(sortedTodos);
  }, [todos]);

  const handleSort = (property: keyof Todo) => {
    const isAsc = orderBy === property && sortDirection === 'asc';

    setSortDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);

    setData(prevData =>
      [...prevData].sort((a, b) => {
        if (property === 'deadline') {
          const dateA = new Date(a.deadline).getTime();
          const dateB = new Date(b.deadline).getTime();

          return isAsc ? dateA - dateB : dateB - dateA;
        } else if (
          typeof a[property] === 'string' &&
          typeof b[property] === 'string'
        ) {
          return isAsc
            ? (a[property] as string).localeCompare(b[property] as string)
            : (b[property] as string).localeCompare(a[property] as string);
        }

        return 0;
      }),
    );
  };

  const handleDelete = async (id: number) => {
    if (await confirm('Are you sure?')) {
      try {
        await deleteData(id, axiosPrivate);
        ToastNotification('success', 'Successfully deleted!');
        setData(prevData => prevData.filter(item => item.id !== id));
      } catch (err) {
        ToastNotification('error', `Something went wrong!`);
      }
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'name'}
                direction={orderBy === 'name' ? sortDirection : 'asc'}
                onClick={() => handleSort('name')}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>Description</TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'deadline'}
                direction={orderBy === 'deadline' ? sortDirection : 'asc'}
                onClick={() => handleSort('deadline')}
              >
                Deadline
              </TableSortLabel>
            </TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(todo => (
            <TableRow key={todo.id}>
              <TableCell>{todo.name}</TableCell>
              <TableCell>{todo.description}</TableCell>
              <TableCell>
                {new Date(todo.deadline).toLocaleDateString('en-US')}
              </TableCell>
              <TableCell>
                <IconButton color="error" onClick={() => handleDelete(todo.id)}>
                  <MdDeleteForever />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
