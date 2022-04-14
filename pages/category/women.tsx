import { NextPage } from "next";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { FullScreenLoading } from "../../components/ui";
import { useProducts } from "../../hooks";
import { Typography } from "@mui/material";

interface WomenPageProps {}

const WomenPage: NextPage<WomenPageProps> = () => {
  const { products, isLoading } = useProducts("/products/?gender=women");
  return (
    <ShopLayout title="Teslo-Shop - Women" pageDescription={"Ropa Mujeres"}>
      <h1>Categoría Mujeres</h1>
      <Typography variant="h1" component="h1">
        Mujeres
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos para Mujeres
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default WomenPage;
