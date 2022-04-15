import { Box, Button } from "@mui/material";
import { ISize } from "../../interfaces";

interface SizeSelectorProps {
  selectedSize?: ISize;
  sizes: ISize[];
  onSelectedSize: (size: ISize) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ selectedSize, sizes, onSelectedSize }) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button
          key={size}
          size="small"
          color={selectedSize === size ? "primary" : "info"}
          onClick={() => onSelectedSize(size)}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};

export default SizeSelector;
