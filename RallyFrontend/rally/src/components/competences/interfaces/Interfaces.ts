export interface Competition {
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  province: string;
  circuits?: [];
}
