export type PollOption = {
  text: string;
  votes: number;
};

export type Poll = {
  code: string;
  question: string;
  options: PollOption[];
};
