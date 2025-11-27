import ProductCard from "@components/Card";
import { Alert, Box, CircularProgress, Container, Stack, Typography } from "@mui/material";
import theme from "@styles/theme";

import { useGetProductsQuery } from "@store/api/products";

const Cards = () => {
  const { data, error, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return (
      <Stack justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Stack>
    );
  }

  if (error) {
    return (
      <Container
        maxWidth={false}
        sx={{
          maxWidth: `${theme.containers.lg}px`,
          py: 4,
        }}
      >
        <Alert severity="error">Ошибка при загрузке продуктов</Alert>
      </Container>
    );
  }

  if (!data?.products?.length) {
    return (
      <Container
        maxWidth={false}
        sx={{
          maxWidth: `${theme.containers.lg}px`,
          py: 4,
        }}
      >
        <Typography variant="h6" textAlign="center">
          Продукты не найдены
        </Typography>
      </Container>
    );
  }

  return (
    <Container
      component="main"
      maxWidth={false}
      sx={{
        maxWidth: `${theme.containers.lg}px`,
        py: 4,
        flex: 1,
      }}
    >
      <Typography
        variant="h4"
        component="h4"
        gutterBottom
        sx={{
          fontFamily: theme.fontFamilies.primary,
          fontSize: theme.fontSizes.lg,
          fontWeight: "bold",
          mb: 4,
          textAlign: "center",
        }}
      >
        Все продукты ({data.total})
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 3,
        }}
      >
        {data.products.map((product) => (
          <Box key={product.id}>
            <ProductCard product={product} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Cards;
