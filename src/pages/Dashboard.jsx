import Heading from "../ui/Heading";
import Row from "../ui/Row";
import styled from "styled-components";

// Define un nuevo componente styled para el contenedor de los productos
const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

// Define un nuevo componente styled para cada contenedor de producto
const ProductContainer = styled.div`
  width: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
    font-weight: bold;
    color: #333;
    font-size: 18px;
    transition: color 0.3s ease;
  }

  p.price {
    color: #007bff;
    font-size: 20px;
  }

  &:hover p {
    color: #007bff;
  }
`;

// Suponiendo que tienes datos de productos en un array llamado 'products'
const products = [
  {
    id: 1,
    name: "Bosch ProClick Tool Belt Kit",
    price: "94,563",
    image:
      "https://ktwfuspublsbvwuoxzvf.supabase.co/storage/v1/object/public/products-images/Bosch-1600A0265-ProClick-Tool-Belt-Kit.avif",
  },
  {
    id: 2,
    name: "Portwest ColdStore Trousers",
    price: "107,375",
    image:
      "https://ktwfuspublsbvwuoxzvf.supabase.co/storage/v1/object/public/products-images/CS11NAR.avif",
  },
  {
    id: 3,
    name: "DeWalt Ring Shank Galvanised Coil Nails",
    price: "212,829",
    image:
      "https://ktwfuspublsbvwuoxzvf.supabase.co/storage/v1/object/public/products-images/DEW-DeWalt-Ring-Shank-Galvanised-Coil-Nails.avif?t=2024-05-15T21%3A10%3A33.184Z",
  },
  {
    id: 4,
    name: "Forgefix Forgefast Torx Wood Screw",
    price: "2,385",
    image:
      "https://ktwfuspublsbvwuoxzvf.supabase.co/storage/v1/object/public/products-images/FORFFT312Y.jpg",
  },
  {
    id: 5,
    name: "Sealey Pallet Truck with Scales",
    price: "1,565,991",
    image:
      "https://ktwfuspublsbvwuoxzvf.supabase.co/storage/v1/object/public/products-images/PT1150SC.V4_DFC1489464.avif",
  },
  {
    id: 6,
    name: "Rawl R-KEM-II Kemfast Polyester Anchor Masonry Fixing Kit",
    price: "128,072",
    image:
      "https://ktwfuspublsbvwuoxzvf.supabase.co/storage/v1/object/public/products-images/RAW-KEMKIT1-Rawl-R-KEM-II-Kemfast-Polyester-Anchor-Masonry-Fixing-Kit.avif",
  },
  {
    id: 7,
    name: "Roughneck Gorilla V-Series Claw Hammer",
    price: "19,600",
    image:
      "https://ktwfuspublsbvwuoxzvf.supabase.co/storage/v1/object/public/products-images/ROU11005.avif",
  },
  {
    id: 8,
    name: "Roughneck Sledge Hammer",
    price: "19,600",
    image:
      "https://ktwfuspublsbvwuoxzvf.supabase.co/storage/v1/object/public/products-images/ROU65622.webp",
  },
  {
    id: 9,
    name: "Siegen Auto Dimming Welding Helmet",
    price: "34,445",
    image:
      "https://ktwfuspublsbvwuoxzvf.supabase.co/storage/v1/object/public/products-images/S01001.V3_DFC0247473.avif",
  },
  {
    id: 10,
    name: "Sealey Heavy Duty Leather Welding Gauntlets",
    price: "18,676",
    image:
      "https://ktwfuspublsbvwuoxzvf.supabase.co/storage/v1/object/public/products-images/SSP151.V2_DFC1449466.webp",
  },
  {
    id: 11,
    name: "Portwest Leather Welding Apron",
    price: "16,705",
    image:
      "https://ktwfuspublsbvwuoxzvf.supabase.co/storage/v1/object/public/products-images/SW10TAR.jpg",
  },
  {
    id: 12,
    name: "Draper Expert MW200A 200Amp MIG, TIG and MMA Inverter Welder",
    price: "442,463",
    image:
      "https://ktwfuspublsbvwuoxzvf.supabase.co/storage/v1/object/public/products-images/70043_1.jpg",
  },
  // Agrega más productos según sea necesario
];

function Dashboard() {
  return (
    <div>
      <Row type="horizontal">
        <Heading as="h1">Home</Heading>
      </Row>
      {/* Utiliza el nuevo componente ProductsContainer para contener los productos */}
      <ProductsContainer>
        {products.map((product) => (
          <ProductContainer key={product.id}>
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <p className="price">Precio: ${product.price}</p>
          </ProductContainer>
        ))}
      </ProductsContainer>
    </div>
  );
}

export default Dashboard;
