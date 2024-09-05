export class BaseResponseDTO {
  public time: string;
  constructor(
    public status: number,
    public message: string,
  ) {
    this.time = new Date().toString();
  }
}
