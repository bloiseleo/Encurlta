import { BaseResponseDTO } from "./BaseResponseDTO";
export class LoginResponseDTO extends BaseResponseDTO {
  constructor(
    public status: number,
    public message: string,
    public time: string,
    public token: string,
  ) {
    super(
      status,
      message,
      time
    );
  }
}
