export class BaseResponseDTO {
  private time: string;
  constructor(
    private status: number,
    private message: string,
  ) {
    this.time = new Date().toString();
  }
}
