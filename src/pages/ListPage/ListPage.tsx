import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Paper,
  Box,
} from '@mui/material';
import { WentWrong } from '../../components/WentWrong';
import { Todo } from '../../types/Todo';
import { TodoTable } from '../../components/TodoTable';
import { getAllTodos } from '../../Helper/requests';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';

export const ListPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    setLoader(true);
    getAllTodos(axiosPrivate)
      .then(data => setTodos(data))
      .catch(() => setError(true))
      .finally(() => setLoader(false));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ padding: 4 }}>
      {error ? (
        <WentWrong />
      ) : (
        <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
          <Typography
            variant="h3"
            gutterBottom
            align="center"
            sx={{ color: 'primary.main' }}
          >
            Todo List
          </Typography>
          {todos.length === 0 && !loader ? (
            <Box display="flex" justifyContent="center" mt={4}>
              <Typography variant="h6" color="textSecondary">
                There are no Todo yet
              </Typography>
            </Box>
          ) : (
            <TodoTable todos={todos} />
          )}
          {loader && (
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress color="primary" />
            </Box>
          )}
        </Paper>
      )}
    </Container>
  );
};
