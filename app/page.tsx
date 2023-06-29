import { fetchCars } from "@/utils";
import { SearchParamsProps } from "@/types";
import { fuels, yearsOfProduction } from "@/constants";
import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";

export default async function Home({ searchParams }: SearchParamsProps) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="padding-x padding-y mt-12 max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like </p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car, i) => (
                <CarCard key={i} car={car} />
              ))}
            </div>

            <ShowMore pageNumber={(searchParams.limit || 10) / 10} isNext={(searchParams.limit || 10) > allCars.length} />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold"> Oops , no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
