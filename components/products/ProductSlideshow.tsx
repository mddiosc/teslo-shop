import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styles from "./ProductSlideshow.module.css";

interface ProductSladeShowProps {
  images: string[];
}

const ProductSlideshow: React.FC<ProductSladeShowProps> = ({ images }) => {
  return (
    <Slide easing="ease" duration={7000} indicators>
      {images.map((img) => {
        const url = `/products/${img}`;
        return (
          <div className={styles["each-slide"]} key={img}>
            <div
              style={{
                backgroundImage: `url(${url})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
        );
      })}
    </Slide>
  );
};

export default ProductSlideshow;
