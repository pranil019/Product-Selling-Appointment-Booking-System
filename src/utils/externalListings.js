const fetchExternalListings = async () => {
  if (typeof fetch !== "function") {
    return [];
  }

  const urls = [
    "https://dummyjson.com/products/category/vehicle?limit=6",
    "https://dummyjson.com/products/category/motorcycle?limit=6"
  ];

  for (const url of urls) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        continue;
      }

      const data = await response.json();

      return (data.products || []).map((product) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        imageUrl: product.thumbnail,
        brand: product.brand || "Global Brand",
        description: product.description
      }));
    } catch (error) {
      continue;
    }
  }

  return [];
};

module.exports = {
  fetchExternalListings
};
