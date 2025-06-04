export interface Channel {
  id: string;
  name: string;
  logo: string;
  group: string;
  url: string;
  country?: string;
  language?: string;
  category?: string;
  tvg?: {
    id?: string;
    name?: string;
    url?: string;
  };
}

export interface FilterOptions {
  country?: string;
  language?: string;
  category?: string;
}

export interface M3UPlaylist {
  header: {
    attrs: Record<string, string>;
  };
  items: M3UItem[];
}

export interface M3UItem {
  name: string;
  tvg: {
    id?: string;
    name?: string;
    url?: string;
  };
  group: {
    title?: string;
  };
  http: {
    referrer?: string;
    "user-agent"?: string;
  };
  url: string;
  raw: string;
  catchup: {
    type?: string;
    days?: string;
    source?: string;
  };
  timeshift?: string;
  logo?: string;
}
