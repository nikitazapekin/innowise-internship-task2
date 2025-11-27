import { useRouteParams } from "@hooks/useRouteParams";
import {
  Alert,
  Box,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import theme from "@styles/theme";

import { useGetProductByIdQuery } from "@store/api/products";

const CardDetails = () => {
  const { id, isError } = useRouteParams();

  const { data: product, error, isLoading } = useGetProductByIdQuery(Number(id));

  if (isLoading) {
    return (
      <Stack justifyContent="center" alignItems="center" sx={{ minHeight: "400px" }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (error || !product || isError) {
    return (
      <Container
        maxWidth={false}
        sx={{
          maxWidth: `${theme.containers.lg}px`,
          py: 4,
        }}
      >
        <Alert severity="error">Ошибка при загрузке товара</Alert>
      </Container>
    );
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: `${theme.containers.lg}px`,
        py: 4,
        flex: 1,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 4,
          mb: 4,
        }}
      >
        <Box>
          <CardMedia
            component="img"
            image={product.thumbnail}
            alt={product.title}
            sx={{
              width: "100%",
              height: "400px",
              objectFit: "contain",
              borderRadius: 2,
              backgroundColor: theme.colors.white,
              mb: 2,
            }}
          />

          {product.images.length > 1 && (
            <Stack direction="row" spacing={1} sx={{ overflowX: "auto" }}>
              {product.images.map((image, index) => (
                <CardMedia
                  key={index}
                  component="img"
                  image={image}
                  alt={`${product.title} ${index + 1}`}
                  sx={{
                    width: 80,
                    height: 80,
                    objectFit: "contain",
                    borderRadius: 1,
                    backgroundColor: theme.colors.white,
                    cursor: "pointer",
                  }}
                />
              ))}
            </Stack>
          )}
        </Box>

        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            {product.title}
          </Typography>

          <Stack alignItems="center" flexDirection={"row"} mb={2}>
            <Rating value={product.rating} readOnly precision={0.1} />
            <Typography variant="body1" sx={{ ml: 1 }}>
              {product.rating}
            </Typography>
          </Stack>

          <Stack alignItems="center" flexDirection={"row"} gap={2} mb={3}>
            <Typography variant="h4">${product.price}</Typography>
          </Stack>

          <Typography variant="body1">{product.description}</Typography>

          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6">Основные характеристики</Typography>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
              fontSize={theme.fontSizes.xxs}
            >
              <Box>
                <Typography>Бренд:</Typography>
                <Typography variant="body1">{product.brand}</Typography>
              </Box>
              <Box>
                <Typography variant="body2">Категория:</Typography>
                <Typography variant="body1">{product.category}</Typography>
              </Box>
              <Box>
                <Typography variant="body2">В наличии:</Typography>
                <Typography variant="body1">{product.stock} шт.</Typography>
              </Box>
              <Box>
                <Typography variant="body2">SKU:</Typography>
                <Typography variant="body1">{product.sku}</Typography>
              </Box>
              <Box>
                <Typography variant="body2">Вес:</Typography>
                <Typography variant="body1">{product.weight} units</Typography>
              </Box>
            </Box>
          </Paper>

          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6">Габариты</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
              <Box>
                <Typography variant="body2">Ширина:</Typography>
                <Typography variant="body1">{product.dimensions.width} cm</Typography>
              </Box>
              <Box>
                <Typography variant="body2">Высота:</Typography>
                <Typography variant="body1">{product.dimensions.height} cm</Typography>
              </Box>
              <Box>
                <Typography variant="body2">Глубина:</Typography>
                <Typography variant="body1">{product.dimensions.depth} cm</Typography>
              </Box>
            </Box>
          </Paper>

          <Box mb={3}>
            <Typography variant="h6">Теги</Typography>
            <Stack flexWrap="wrap" gap={1}>
              {product.tags.map((tag, index) => (
                <Chip key={index} label={tag} variant="outlined" />
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 4,
        }}
      >
        <Box>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6">Информация о доставке и возврате</Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="Доставка" secondary={product.shippingInformation} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Гарантия" secondary={product.warrantyInformation} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Возврат" secondary={product.returnPolicy} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Статус" secondary={product.availabilityStatus} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Минимальный заказ"
                  secondary={`${product.minimumOrderQuantity} шт.`}
                />
              </ListItem>
            </List>
          </Paper>
        </Box>

        <Box>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6">Отзывы ({product.reviews.length})</Typography>
            <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
              {product.reviews.map((review, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    pb: 2,
                  }}
                >
                  <Stack justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="subtitle2">{review.reviewerName}</Typography>
                    <Rating value={review.rating} />
                  </Stack>
                  <Typography variant="body2" color={theme.colors.black}>
                    {review.comment}
                  </Typography>
                  <Typography variant="caption" color={theme.colors.black}>
                    {new Date(review.date).toLocaleDateString("ru-RU")}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default CardDetails;
