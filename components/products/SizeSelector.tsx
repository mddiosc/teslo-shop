import { Box, Button } from "@mui/material";
import { ISize } from "../../interfaces";

interface SizeSelectorProps {
  selectedSize?: ISize;
  sizes: ISize[];
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ selectedSize, sizes }) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button
          key={size}
          size="small"
          color={selectedSize === size ? "primary" : "info"}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};

export default SizeSelector;
