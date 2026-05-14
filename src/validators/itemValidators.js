const { z } = require("zod");

const createItemSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required.").trim(),
    category: z.enum(["Car", "Bike", "Scooter", "Electronics", "Furniture", "Other"], {
      errorMap: () => ({ message: "Invalid category." })
    }),
    price: z.coerce.number().min(0, "Price must be >= 0."),
    location: z.string().min(1, "Location is required.").trim(),
    brand: z.string().min(1, "Brand is required.").trim(),
    model: z.string().min(1, "Model is required.").trim(),
    year: z.coerce.number().int("Year must be an integer.").min(1900, "Year looks invalid."),
    condition: z.enum(["Excellent", "Good", "Average"], {
      errorMap: () => ({ message: "Invalid condition." })
    }),
    fuelType: z.string().trim().optional().default("N/A"),
    description: z.string().min(1, "Description is required.").trim(),
    imageUrl: z.string().trim().url("Image URL must be a valid URL.").optional(),
    sellerName: z.string().min(1, "Seller name is required.").trim(),
    sellerEmail: z.string().email("Seller email is invalid.").trim().toLowerCase()
  }),
  params: z.object({}).passthrough(),
  query: z.object({}).passthrough()
});

module.exports = {
  createItemSchema
};

