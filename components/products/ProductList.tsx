import { Grid } from "@mui/material";
import { IProduct } from "../../interfaces";
import { ProductCard } from ".";

interface ProductListProps {
  products: IProduct[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </Grid>
  );
};

export default ProductList;
