export class BaseResponseDTO {
  constructor(
    public status: number,
    public message: string,
    public time: string
  ) { }
}
