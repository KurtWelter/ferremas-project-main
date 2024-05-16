import styled from "styled-components";
import {formatCurrency} from "../../utils/helpers";
import Button from "../../ui/Button";
import PropTypes from "prop-types";
import {useCartStore} from "../../store/CartStore";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.5rem;
  aspect-ratio: 3/2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Tool = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Description = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function ProductRow({product}) {
  const {addToCart, cart} = useCartStore();
  console.log(cart);
  const {name, description, price, stock, discount, image} = product;

  /*const handleBuyClick = () => {
    console.log("Adding to cart:", product); // Verifica que se esté llamando la función addToCart
    addToCart(product);
  };*/
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <TableRow role="row">
      <Img src={image} />
      <Tool>{name}</Tool>
      <Description>{description}</Description>
      <Price>{formatCurrency(price)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <Button onClick={handleAddToCart}>Buy</Button>
    </TableRow>
  );
}

// Define PropTypes para ProductRow
ProductRow.propTypes = {
  product: PropTypes.object.isRequired, // product debe ser un objeto requerido
  addToCart: PropTypes.func.isRequired, // addToCart debe ser una función requerida
};

export default ProductRow;
