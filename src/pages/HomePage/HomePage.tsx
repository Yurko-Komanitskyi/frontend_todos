import { Typography, Container } from '@mui/material';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => (
  <Container maxWidth="sm" className={styles.homePage}>
    <Typography
      variant="h3"
      align="center"
      sx={{ marginTop: 4 }}
      className={styles.homePage__title}
    >
      Welcome to Todo!
    </Typography>
  </Container>
);
