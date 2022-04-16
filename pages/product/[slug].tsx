import { useContext, useState } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";

import { Box, Button, Chip, Grid, Typography } from "@mui/material";

import { ShopLayout } from "../../components/layouts";
import { ProductSlideshow, SizeSelector } from "../../components/products";
import { ItemCounter } from "../../components/ui";

import { dbProducts } from "../../database";
import { ICartProduct, IProduct, ISize } from "../../interfaces";
import { CartContext } from "../../context";
import { currency } from "../../utils";

interface ProductPageProps {
  product: IProduct;
}

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  const { push } = useRouter();
  const { addProductToCart } = useContext(CartContext);

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const onSelectedSize = (size: ISize) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      size,
    }));
  };

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      quantity,
    }));
  };

  const onAddProductToCart = () => {
    if (!tempCartProduct.size) return;
    addProductToCart(tempCartProduct);
    push("/cart");
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            {/* titulos */}
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              {currency.format(product.price)}
            </Typography>

            {/* cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2" component="h2">
                Cantidad
              </Typography>
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                maxValue={product.inStock}
                onUpdateQuantity={onUpdateQuantity}
              />
              <SizeSelector
                selectedSize={tempCartProduct.size}
                sizes={product.sizes}
                onSelectedSize={onSelectedSize}
              />
            </Box>

            {product.inStock > 0 ? (
              <Button
                onClick={onAddProductToCart}
                color="secondary"
                className="circular-btn"
              >
                {tempCartProduct.size
                  ? "Agregar al carrito"
                  : "Seleccione una talla"}
              </Button>
            ) : (
              <Chip
                label="No hay disponibles"
                color="error"
                variant="outlined"
              />
            )}

            {/* descripción */}

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripción</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (_ctx) => {
  const slugs = await dbProducts.getAllProductsSlugs();
  return {
    paths: slugs.map(({ slug }) => ({ params: { slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 86400,
  };
};

export default ProductPage;
