export const statusLabels = {
  NEW: "جديد",
  REVIEWING: "قيد المراجعة",
  CONTACTED: "تم التواصل",
  IN_PROGRESS: "قيد التنفيذ",
  COMPLETED: "مكتمل",
  CLOSED: "مرفوض أو مغلق",
} as const;

export type RequestStatus = keyof typeof statusLabels;

export const statusOrder: RequestStatus[] = [
  "NEW",
  "REVIEWING",
  "CONTACTED",
  "IN_PROGRESS",
  "COMPLETED",
  "CLOSED",
];
