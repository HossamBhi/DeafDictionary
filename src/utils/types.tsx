// topic for words
export interface TopicProps {
  // id: any;
  // words?: WordProps[];
  // name?: string;
  // image?: string;
  tagid: any;
  tagtxt: string;
  tagimgs: string[];
  tagvids: string[];
  tagvcod: string;
}

// word props
export interface WordProps {
  // id: any;
  // name?: string;
  // image?: string;
  db_id: any;
  lang: string;
  dialect: string;
  word: string;
  type: string;
  typeid: string;
  tags: string[];
  synonym: string;
  major: string;
  countryid: string;
  governate: string;
  region: string;
  wcode: string;
  video_count: string;
  image_count: string;
  audio_count: string;
  lipsing_count: string;
  explaintxt: string;
  explainimgs: string[];
  explainvids: string[];
  explain_video: string;
  wordimgs: string[];
  wordvids: string[];
}
