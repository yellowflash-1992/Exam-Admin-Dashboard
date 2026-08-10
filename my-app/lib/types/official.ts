export type Official = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "Supervisor" | "Invigilator" | "Coordinator";
  state: string;
  status: "Active" | "Inactive";
};