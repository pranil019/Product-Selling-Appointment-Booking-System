const { z } = require("zod");

const createAppointmentSchema = z.object({
  body: z.object({
    buyerName: z.string().min(1, "Buyer name is required.").trim(),
    buyerEmail: z.string().email("Buyer email is invalid.").trim().toLowerCase(),
    phone: z.string().min(6, "Phone is too short.").max(25, "Phone is too long.").trim(),
    appointmentDate: z.coerce.date({ invalid_type_error: "Appointment date is invalid." }),
    message: z.string().trim().optional().default("")
  }),
  params: z.object({
    itemId: z.string().min(1, "itemId is required.")
  }),
  query: z.object({}).passthrough()
});

const updateAppointmentStatusSchema = z.object({
  body: z.object({
    status: z.enum(["Pending", "Accepted", "Rejected", "Completed"], {
      errorMap: () => ({ message: "Invalid status." })
    }),
    sellerResponse: z.string().trim().optional().default("")
  }),
  params: z.object({
    id: z.string().min(1, "id is required.")
  }),
  query: z.object({}).passthrough()
});

module.exports = {
  createAppointmentSchema,
  updateAppointmentStatusSchema
};

