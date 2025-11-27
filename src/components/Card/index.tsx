import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Chip, Rating, Stack, Typography } from "@mui/material";
import theme from "@styles/theme";

import type { Product } from "@store/api/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/card/${product.id}`);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.thumbnail}
        alt={product.title}
        sx={{
          objectFit: "contain",
          p: 1,
          backgroundColor: theme.colors.white,
        }}
      />

      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography
          gutterBottom
          variant="h3"
          component="h3"
          textAlign={"center"}
          sx={{
            fontSize: theme.fontSizes.sm,
            fontFamily: theme.fontFamilies.primary,
            mb: 1,
          }}
        >
          {product.title}
        </Typography>

        <Stack flexDirection={"row"} justifyContent={"space-between"}>
          <Stack sx={{ mb: 1 }} flexDirection={"row"}>
            <Rating value={product.rating} readOnly precision={0.1} />
            <Typography
              variant="body2"
              color={theme.colors.black}
              sx={{ fontSize: theme.fontSizes.xs, ml: 1 }}
            >
              {product.rating}
            </Typography>
          </Stack>

          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{ mb: 1 }}
          >
            <Typography
              variant="h6"
              color="primary"
              sx={{
                fontSize: theme.fontSizes.xs,
              }}
            >
              ${product.price}
            </Typography>
          </Stack>
        </Stack>

        <Typography variant="body2" sx={{ fontSize: theme.fontSizes.xs }}>
          В наличии: {product.stock}
        </Typography>

        <Chip
          label={product.category}
          variant="outlined"
          sx={{ mt: 1, fontSize: theme.fontSizes.xs, alignSelf: "flex-start" }}
        />
      </CardContent>
    </Card>
  );
};

export default ProductCard;
