export type Centre = {
  id: number;
  name: string;
  state: string;
  address: string;
  capacity: number;
  status: "Active" | "Inactive";
};