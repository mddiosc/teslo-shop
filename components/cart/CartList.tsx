import { useContext } from "react";
import NextLink from "next/link";
import { CartContext } from "../../context";
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { ItemCounter } from "../ui";
import { ICartProduct } from "../../interfaces";
import { currency } from "../../utils";

interface CartListProps {
  editable?: boolean;
}

const CartList: React.FC<CartListProps> = ({ editable = false }) => {
  const { cart, updateCartQuantity, removeCartProduct } =
    useContext(CartContext);

  const onNewCartQuantity = (product: ICartProduct, newQuantity: number) => {
    product.quantity = newQuantity;
    updateCartQuantity(product);
  };

  return (
    <>
      {cart.map((product) => (
        <Grid
          container
          spacing={2}
          sx={{ mb: 1 }}
          key={product.slug + product.size}
        >
          <Grid item xs={3}>
            <NextLink href={`/product/${product.slug}`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.image}`}
                    component="img"
                    sx={{ borderRadius: "5px" }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Talla: <strong>{product.size}</strong>
              </Typography>

              {editable ? (
                <ItemCounter
                  currentValue={product.quantity}
                  maxValue={10}
                  onUpdateQuantity={(newValue) =>
                    onNewCartQuantity(product, newValue)
                  }
                />
              ) : (
                <Typography variant="body1">
                  Cantidad:
                  <strong>
                    {product.quantity} {product.quantity > 1 ? "items" : "item"}
                  </strong>
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">{currency.format(product.price)}</Typography>

            {editable && (
              <Button
                onClick={() => removeCartProduct(product)}
                variant="text"
                color="secondary"
              >
                Eliminar
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default CartList;
