import GetBillBoard from "@/actions/get-billboard";
import GetProducts from "@/actions/get-products";

import Billboard from "@/components/Billboard";
import Container from "@/components/ui/container";
import ProductList from "@/components/ProductList";

export const revalidate = 0;

const HomePage = async () => {
  const products = await GetProducts({ isFeatured: true });
  const billboard = await GetBillBoard("e4001961-bde1-4a40-b9e2-6dabca14af11");
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />

        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
