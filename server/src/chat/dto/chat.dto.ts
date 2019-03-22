export class ChatDto {
  readonly chatId: String;
  readonly from: String;
  readonly to: String;
  readonly read?: Boolean;
  readonly content: String;
  readonly createTime?: Number;
}