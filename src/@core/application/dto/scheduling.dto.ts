export type TInputSchedulingDTO = {
  date: Date;
  status_id: number;
  client_id: number;
  professional_id: number;
  discount?: number;
  service_id: number;
};

export type TOutputSchedulingDTO = {
  id: number;
  date: Date;
  status_id: number;
  client_id: number;
  professional_id: number;
  discount?: number;
  service_id: number;
  total: number;
};
