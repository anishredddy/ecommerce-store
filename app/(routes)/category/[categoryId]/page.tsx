import GetCategory from "@/actions/get-category";
import GetColours from "@/actions/get-colours";
import GetProducts from "@/actions/get-products";
import GetSizes from "@/actions/get-sizes";
import Billboard from "@/components/Billboard";
import Container from "@/components/ui/container";
import Filter from "./components/Filter";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";

export const revalidate = 0;

interface categoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colourId: string;
    sizeId: string;
  };
}

const categoryPage: React.FC<categoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const products = await GetProducts({
    categoryId: params.categoryId,
    colourId: searchParams.colourId,
    sizeId: searchParams.sizeId,
  });

  const sizes = await GetSizes();

  const colours = await GetColours();

  const category = await GetCategory(params.categoryId);

  return (
    <div className="bg-white">
      <Container>
        <Billboard data={category.billboard} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <div className="hidden lg:block">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colourId" name="Colours" data={colours} />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default categoryPage;
