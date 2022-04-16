import { useContext } from "react";
import { CartContext } from "../../context";
import { Grid, Typography } from "@mui/material";
import { currency } from "../../utils";

interface OrderSummaryProps {}

const OrderSummary: React.FC<OrderSummaryProps> = () => {
  const { numberOfitems, subtotal, taxRate, total } = useContext(CartContext);
  

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          {numberOfitems} {numberOfitems > 1 ? "productos" : "producto"}{" "}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(subtotal)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(taxRate)}</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 2 }}>
        <Typography>{currency.format(total)}</Typography>
      </Grid>
    </Grid>
  );
};

export default OrderSummary;
