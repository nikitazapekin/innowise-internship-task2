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
  Typography,
} from "@mui/material";
import theme from "@styles/theme";

import { useGetProductByIdQuery } from "@store/api/products";

const CardDetails = () => {
  const { id, isError } = useRouteParams();

  const { data: product, error, isLoading } = useGetProductByIdQuery(Number(id));

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
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
            <Box sx={{ display: "flex", gap: 1, overflowX: "auto" }}>
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
            </Box>
          )}
        </Box>

        <Box>
          <Typography
            variant="h3"
            component="h3"
            gutterBottom
            sx={{
              fontFamily: theme.fontFamilies.primary,
              fontSize: theme.fontSizes.md,
            }}
          >
            {product.title}
          </Typography>

          <Box display="flex" alignItems="center" mb={2}>
            <Rating value={product.rating} readOnly precision={0.1} />
            <Typography variant="body1" fontSize={theme.fontSizes.sm} sx={{ ml: 1 }}>
              {product.rating}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <Typography variant="h4" fontSize={theme.fontSizes.sm} color="primary">
              ${product.price}
            </Typography>
          </Box>

          <Typography variant="body1" fontSize={theme.fontSizes.sm}>
            {product.description}
          </Typography>

          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" fontSize={theme.fontSizes.xs}>
              Основные характеристики
            </Typography>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
              fontSize={theme.fontSizes.xxs}
            >
              <Box>
                <Typography color={theme.colors.black}>Бренд:</Typography>
                <Typography variant="body1">{product.brand}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color={theme.colors.black}>
                  Категория:
                </Typography>
                <Typography variant="body1">{product.category}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color={theme.colors.black}>
                  В наличии:
                </Typography>
                <Typography variant="body1">{product.stock} шт.</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color={theme.colors.black}>
                  SKU:
                </Typography>
                <Typography variant="body1">{product.sku}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color={theme.colors.black}>
                  Вес:
                </Typography>
                <Typography variant="body1">{product.weight} units</Typography>
              </Box>
            </Box>
          </Paper>

          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" fontSize={theme.fontSizes.xs}>
              Габариты
            </Typography>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}
              fontSize={theme.fontSizes.xxs}
            >
              <Box>
                <Typography variant="body2" color={theme.colors.black}>
                  Ширина:
                </Typography>
                <Typography variant="body1">{product.dimensions.width} cm</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color={theme.colors.black}>
                  Высота:
                </Typography>
                <Typography variant="body1">{product.dimensions.height} cm</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color={theme.colors.black}>
                  Глубина:
                </Typography>
                <Typography variant="body1">{product.dimensions.depth} cm</Typography>
              </Box>
            </Box>
          </Paper>

          <Box mb={3}>
            <Typography variant="h6" fontSize={theme.fontSizes.xs}>
              Теги
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1} fontSize={theme.fontSizes.xxs}>
              {product.tags.map((tag, index) => (
                <Chip key={index} label={tag} variant="outlined" />
              ))}
            </Box>
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
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="subtitle2">{review.reviewerName}</Typography>
                    <Rating value={review.rating} />
                  </Box>
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
