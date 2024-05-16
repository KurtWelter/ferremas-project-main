import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";

import ProductTable from "../features/products/ProductTable";
import {useState} from "react";
/*const Tools = [
  {
    name: "Stoning Club Hammer",
    price: 25000,
    picture: "clubhammer.webp",
    description: "High quality Hammer, for diverse tasks",
  },
  {
    name: "Hammer",
    price: 15000,
    picture: "hammer.webp",
    description: "High quality Hammer, for diverse tasks",
  },
  {
    name: "Safety Helmets",
    price: 35000,
    picture: "helmet.jpg",
    description: "High quality helmet, so you don't get injured in work",
  },
];*/

function Products() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Products</Heading>
      </Row>

      <Row>
        <ProductTable />
      </Row>
    </>
  );
}
export default Products;
