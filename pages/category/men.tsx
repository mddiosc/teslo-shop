import { NextPage } from "next";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { FullScreenLoading } from "../../components/ui";
import { useProducts } from "../../hooks";
import { Typography } from "@mui/material";

interface MenPageProps {}

const MenPage: NextPage<MenPageProps> = () => {
  const { products, isLoading } = useProducts("/products/?gender=men");
  return (
    <ShopLayout title="Teslo-Shop - Hombres" pageDescription={"Ropa Hombres"}>
      <h1>Categoría Hombres</h1>
      <Typography variant="h1" component="h1">
        Hombres
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos para Hombres
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default MenPage;
