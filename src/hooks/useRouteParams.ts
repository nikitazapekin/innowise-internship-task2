import { useParams } from "react-router-dom";
import { z } from "zod";

const RouteParamsSchema = z.object({
  id: z
    .string()
    .min(1, "ID is required")
    .regex(/^\d+$/, "ID must be a number")
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, "ID must be positive"),
});

interface UseRouteParamsResult {
  id: number | null;
  isError: string | null;
}

export const useRouteParams = (): UseRouteParamsResult => {
  const params = useParams<{ id: string }>();

  try {
    const validatedParams = RouteParamsSchema.parse(params);

    return {
      id: validatedParams.id,
      isError: null,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        id: null,
        isError: error.issues[0]?.message || "Invalid parameters",
      };
    }

    return {
      id: null,
      isError: "Unknown validation error",
    };
  }
};
