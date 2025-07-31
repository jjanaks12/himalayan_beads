import type { OrderStatus } from "~/himalayan_beads"

export const orderStatus: Record<OrderStatus, "new" | "pending" | "cancelled" | "processing" | "completed" | "deleted"> = {
    NEW: 'new',
    PENDING: 'pending',
    CANCELLED: 'cancelled',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    DELETED: 'deleted',
}