export interface WsMessagePayload {
  message: string;
  topic: Topic;
}

export type Topic = "random" | "welcome";

export class WsMessage {
  constructor(public payload: WsMessagePayload) {}

  toString() {
    return WsMessage.toString(this);
  }

  static from(text: string): WsMessage {
    // TODO: validate
    return JSON.parse(text);
  }

  static toString({ payload }: WsMessage): string {
    return JSON.stringify(payload);
  }
}
