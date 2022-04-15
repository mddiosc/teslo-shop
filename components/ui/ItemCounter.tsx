import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

interface ItemCounterProps {
  currentValue: number;
  maxValue?: number;
  onUpdateQuantity: (value: number) => void;
}

const ItemCounter: React.FC<ItemCounterProps> = ({
  currentValue,
  maxValue,
  onUpdateQuantity,
}) => {

  const updateQuantity = (value: number) => {
    onUpdateQuantity(value);
  }
  

  return (
    <Box display={"flex"} alignItems="center">
      <IconButton onClick={() => currentValue > 1 && updateQuantity(currentValue - 1)}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: "center" }}>
        {currentValue}
      </Typography>
      <IconButton onClick={() => maxValue && currentValue < maxValue && updateQuantity(currentValue + 1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};

export default ItemCounter;
