import { Typography } from "@mui/material";
import { NextPage } from "next";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { FullScreenLoading } from "../../components/ui";
import { useProducts } from "../../hooks";

interface KidPageProps {}

const KidPage: NextPage<KidPageProps> = () => {
  const { products, isLoading } = useProducts("/products/?gender=kid");
  return (
    <ShopLayout title="Teslo-Shop - Kids" pageDescription={"Ropa niños"}>
      <h1>Categoría niños</h1>
      <Typography variant="h1" component="h1">
        Niños
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
       Productos para Niños
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default KidPage;
