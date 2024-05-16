import PropTypes from "prop-types";
import styled from "styled-components";

const CarouselContainer = styled.div`
  display: flex;
  overflow: hidden;
`;

const Slide = styled.div`
  min-width: 100%;
  flex-shrink: 0;
  transition: transform 0.5s ease;
`;

const Image = styled.img`
  width: 25%;
  height: auto;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ProductName = styled.h3`
  margin-bottom: 10px;
`;

const ProductPrice = styled.p`
  margin-bottom: 10px;
`;

const Carousel = ({tools}) => {
  return (
    <CarouselContainer>
      {tools.map((tool, index) => (
        <Slide key={index} style={{transform: `translateX(${index * -100}%)`}}>
          <Image src={tool.picture} alt={tool.name} />
          <ProductDetails>
            <ProductName>{tool.name}</ProductName>
            <ProductPrice>Price: ${tool.price}</ProductPrice>
          </ProductDetails>
        </Slide>
      ))}
    </CarouselContainer>
  );
};

Carousel.propTypes = {
  tools: PropTypes.arrayOf(
    PropTypes.shape({
      picture: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Carousel;
