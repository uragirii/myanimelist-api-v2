import { AxiosInstance } from "axios";
export interface Paging {
  previous: string;
  next: string;
}

export type WatchStatus =
  | "watching"
  | "on_hold"
  | "completed"
  | "dropped"
  | "plan_to_watch";

export type ReadStatus =
  | "reading"
  | "completed"
  | "on_hold"
  | "dropped"
  | "plan_to_read";

export type Seasons = "winter" | "spring" | "summer" | "fall";

export type AnimeSource =
  | "other"
  | "original"
  | "manga"
  | "4_koma_manga"
  | "web_manga"
  | "digital_manga"
  | "novel"
  | "light_novel"
  | "visual_novel"
  | "game"
  | "card_game"
  | "book"
  | "picture_book"
  | "radio"
  | "music";

export type AnimeRating = "g" | "pg" | "pg_13" | "r" | "r+" | "rx";

export type RelationType =
  | "sequel"
  | "prequel"
  | "alternative_setting"
  | "alternative_version"
  | "side_story"
  | "parent_story"
  | "summary"
  | "full_story";

export interface Picture {
  large: null | string;
  medium: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface AnimeStudio {
  id: number;
  name: string;
}

export interface BasicAnime {
  id: number;
  title: string;
  main_picture: {
    large: string | null;
    medium: string;
  };
  alternative_titles: {
    synonyms: string[] | null;
    en: string | null;
    jp: string | null;
  };
  start_date: string | null;
  end_data: string | null;
  /**
   * The API strips BBCode tags from the result.
   */
  synopsis: string | null;

  /**
   * Mean score.

When the `mean` can not be calculated, such as when the number of user scores is small, the result does not include this field.
   */
  mean: number | null;

  /**
   * When the `rank` can not be calculated, such as when the number of user scores is small, the result does not include this field.
   */
  rank: number | null;
  popularity: number | null;
  /**
   * Number of users who have this work in their list.
   */
  num_list_users: number;
  num_scoring_users: number;
  /**
   * white ->	This work is safe for work
   * 
gray -> This work may be not safe for work

black ->	This work is not safe for work
   */
  nsfw: "white" | "gray" | "black" | null;
  genres: Genre[];
  created_at: string;
  updated_at: string;
  media_type: "unknown" | "tv" | "ova" | "movie" | "special" | "ona" | "music";
  status: "finished_airing" | "currently_airing" | "not_yet_aired";
  /**
   * Status of user's anime list. If there is no access token, the API excludes this field
   */
  my_list_status: null | {
    status: WatchStatus;
    /**
     * 0-10
     */
    score: number;
    /**
     * 0 or the number of watched episodes.
     */
    num_watched_episodes: number;
    /**
     * 	
If authorized user watches an anime again after completion, this field value is true.

In this case, MyAnimeList treats the anime as 'watching' in the user's anime list.
     */
    is_rewatching: boolean;
    start_date: string | null;
    finish_date: string | null;
    priority: number;
    num_times_rewatched: number;
    rewatch_value: number;
    tags: string[];
    comments: string;
    updated_at: string;
  };
  /**
   * The total number of episodes of this series. If unknown, it is 0.
   */
  num_episodes: number;
  start_season: null | {
    year: number;
    season: Seasons;
  };
  broadcast: null | {
    /**
     * Day of the week broadcast in Japan time.

      Day of the week or `other`
     */
    day_of_the_week: string;
    /**
     * for example: "01:25"
     */
    start_time: string | null;
  };
  source: AnimeSource | null;
  /**
   * Average length of episode in seconds.
   */
  average_episode_duration: number | null;
  /**
   * g	G - All Ages
   * 
    pg	PG - Children

pg_13	pg_13 - Teens 13 and Older

r	R - 17+ (violence & profanity)

r+	R+ - Profanity & Mild Nudity

rx	Rx - Hentai
   */
  rating: AnimeRating;
  studios: AnimeRating[];
}

export interface Anime extends BasicAnime {
  pictures: Picture[];
  /**
   * The API strips BBCode tags from the result.
    You cannot contain this field in a list.
   */
  background: string | null;
  related_anime: RelationEdge<AnimeForList>;
  related_manga: RelationEdge<MangaForList>;
  recommendations: {
    node: AnimeForList;
    num_recommendations: number;
  }[];
  statistics: null | {
    num_list_users: number;
    status: {
      watching: number;
      completed: number;
      on_hold: number;
      dropped: number;
      plan_to_watch: number;
    };
  };
}

export interface RelationEdge<T> {
  node: T;
  relation_type: RelationType;
  /**
   * The format of relation_type for human like "Alternative version".
   */
  relation_type_formatted: string;
}

export interface AnimeForList extends BasicAnime {}

export type AnimeRanking =
  | "all"
  | "airing"
  | "upcoming"
  | "tv"
  | "ova"
  | "movie"
  | "special"
  | "bypopularity"
  | "favorite";

export interface RankingInfo {
  /**
   * Current Rank
   */
  rank: number;
  /**
   * Previous rank
   */
  previous_rank: null | number;
}

export interface AnimeListStatus {
  status: WatchStatus;
  score: number;
  /**
   * 0 or the number of watched episodes.
   */
  num_watched_episodes: number;
  /**
   * If authorized user watches an anime again after completion, this field value is true.
  
  In this case, MyAnimeList treats the anime as 'watching' in the user's anime list.
   */
  is_rewatching: boolean;
  start_date: string | null;
  finish_date: string | null;
  priority: number;
  num_times_rewatched: number;
  rewatch_value: number;
  tags: string[];
  comments: string;
  updated_at: string;
}
export interface UserAnimeListEdge {
  node: AnimeForList;
  list_status: AnimeListStatus;
}

export interface FieldsToUpdate {
  status: WatchStatus;
  score: number;
  /**
   * 0 or the number of watched episodes.
   */
  num_watched_episodes: number;
  /**
   * If authorized user watches an anime again after completion, this field value is true.
  
  In this case, MyAnimeList treats the anime as 'watching' in the user's anime list.
   */
  is_rewatching: boolean;
  priority: number;
  num_times_rewatched: number;
  rewatch_value: number;
  tags: string[];
  comments: string;
}

export interface User {
  id: number;
  name: string;
  picture: string;
  gender: string | null;
  birthday: string;
  location: string | null;
  joined_at: string;
  /**
   * for example: "America/Los_Angeles"
   */
  time_zone: string | null;
  is_supporter: boolean | null;
  anime_statistics: null | {
    num_items_watching: number;
    num_items_completed: number;
    num_items_on_hold: number;
    num_items_dropped: number;
    num_items_plan_to_watch: number;
    num_items: number;
    num_days_watched: number;
    num_days_watching: number;
    num_days_completed: number;
    num_days_on_hold: number;
    num_days_dropped: number;
    /**
     * num_watching_days + num_completed_days + num_on_hold_days + num_dropped_days
     */
    num_days: number;
    num_episodes: number;
    num_times_rewatched: number;
    mean_score: number;
  };
}

export interface BasicManga {
  id: number;
  title: string;
  main_picture: {
    large: string | null;
    medium: string;
  };
  alternative_titles: {
    synonyms: string[] | null;
    en: string | null;
    jp: string | null;
  };
  start_date: string | null;
  end_data: string | null;
  /**
   * The API strips BBCode tags from the result.
   */
  synopsis: string | null;

  /**
   * Mean score.

When the `mean` can not be calculated, such as when the number of user scores is small, the result does not include this field.
   */
  mean: number | null;

  /**
   * When the `rank` can not be calculated, such as when the number of user scores is small, the result does not include this field.
   */
  rank: number | null;
  popularity: number | null;
  /**
   * Number of users who have this work in their list.
   */
  num_list_users: number;
  num_scoring_users: number;
  /**
   * white ->	This work is safe for work
   * 
gray -> This work may be not safe for work

black ->	This work is not safe for work
   */
  nsfw: "white" | "gray" | "black" | null;
  genres: Genre[];
  created_at: string;
  updated_at: string;
  media_type:
    | "unknown"
    | "manga"
    | "novel"
    | "one_shot"
    | "doujinshi"
    | "manhwa"
    | "manhua"
    | "oel";
  status: "finished" | "currently_publishing" | "not_yet_published";
  /**
   * Status of user's manga list. If there is no access token, the API excludes this field.
   */
  my_list_status: null | MangaListStatus;
  /**
   * 0 if it is unknown
   */
  num_volumes: number;
  num_chapters: number;
  authors: PersonRoleEdge[];
}

export interface PersonBase {
  id: number;
  first_name: string;
  last_name: string;
}

export interface PersonRoleEdge {
  node: PersonBase;
  role: string;
}

export interface MangaForList extends BasicManga {}

export interface Manga extends BasicManga {
  pictures: Picture[];
  /**
   * The API strips BBCode tags from the result.

You cannot contain this field in a list.
   */
  background: null | string;
  related_anime: RelationEdge<AnimeForList>;
  related_manga: RelationEdge<MangaForList>;
  recommendations: MangaRecommendationAggregationEdgeBase;
  serialization: MangaMagazineRelationEdge[];
}

export interface Magazine {
  id: number;
  name: string;
}
export interface MangaMagazineRelationEdge {
  node: Magazine;
  role: string;
}
export interface MangaRecommendationAggregationEdgeBase {
  node: MangaForList;
  num_recommendations: number;
}

export interface MangaListStatus {
  status: ReadStatus;
  score: number;
  num_volumes_read: number;
  /**
   * 0 or the number of read chapters.
   */
  num_chapters_read: number;
  /**
     * If authorized user reads an manga again after completion, this field value is true.

In this case, MyAnimeList treats the manga as 'reading' in the user's manga list.
     */
  is_rereading: boolean;
  start_date: null | string;
  finish_date: null | string;
  priority: number;
  num_times_reread: number;
  reread_value: number;
  tags: string[];
  comments: string;
  updated_at: string;
}
export interface UserMangaListEdge {
  node: MangaForList;
  list_status: MangaListStatus;
}

export interface FieldsToUpdateManga {
  status: ReadStatus;
  score: number;
  num_volumes_read: number;
  /**
   * 0 or the number of read chapters.
   */
  num_chapters_read: number;
  /**
     * If authorized user reads an manga again after completion, this field value is true.

In this case, MyAnimeList treats the manga as 'reading' in the user's manga list.
     */
  is_rereading: boolean;
  priority: number;
  num_times_reread: number;
  reread_value: number;
  tags: string[];
  comments: string;
}

declare class MAL_API_UTILS_ANIME {
  #months: ["winter", "spring", "summer", "fall"];

  getSeasonForNumberMonth(
    month: number
  ): "winter" | "spring" | "summer" | "fall";
  checkIfMonthIsValid(month: string): boolean;
}

export declare class MAL_API {
  http: AxiosInstance;
  #urlBase: "https://api.myanimelist.net/v2";

  constructor(token: string);
}

declare class MAL_API_ANIME extends MAL_API {
  utils: MAL_API_UTILS_ANIME;
  constructor(token: string);
  /**
   * List of animes via a query text search
   *
   * Default values of `offset` is 0 and `limit` is 100. The function fetches all the `fields` but you can limit output
   */
  public animes(
    q: string,
    offset?: number,
    limit?: number,
    fields?: string[]
  ): Promise<{ data: AnimeForList[]; paging: Paging }>;

  /**
   * Specific anime by id, and return the anime with all details
   */
  anime(id: number, fields?: string[]): Promise<Anime>;
  /**
   * Ranking animes, with all type of rankings
   *
   * Default values for `ranking_type` is "all", `offset` is 0, `limit` is 100. The function fetches all the `fields` but you can limit output
   */
  animeRanking(
    ranking_type?: AnimeRanking,
    offset?: number,
    limit?: number,
    fields?: string[]
  ): Promise<{
    data: { node: AnimeForList; ranking: RankingInfo };
    paging: Paging;
  }>;

  /**
   * Seasonal Anime, by default is filled as current season.
   *
   * By default `year` is set to current year and `season` to current season, `offset` is 0, `limit` is 100, `sort` is set to "". The function fetches all the fields but you can limit output
   */
  animeSeasonal(
    year?: number,
    season?: Seasons,
    offset?: number,
    limit?: number,
    sort?: "anime_score" | "anime_num_list_users" | "",
    fields?: string[]
  ): Promise<{ data: AnimeForList[]; paging: Paging }>;

  /**
   * Anime suggestion from MAL
   *
   * By default `offset` is 0, `limit` is 100. The function fetches all the `fields` but you can limit output
   */
  animeSuggestions(
    offset?: number,
    limit?: number,
    fields?: string[]
  ): Promise<{ data: AnimeForList[]; paging: Paging }>;
}

declare class MAL_API_LIST_ANIME extends MAL_API {
  constructor(token: string);
  /**
   * Get list anime from a user
   *
   * By default `user_name` is "@me",`offset` is 0, `limit` is 100. .The function fetches all the `fields` but you can limit output
   */
  getList(
    user_name: string,
    offset?: number,
    limit?: number,
    fields?: string[]
  ): Promise<{ data: UserAnimeListEdge; paging: Paging }>;

  /**
   * Delete a entry of the user's list.
   */
  deleteList(anime_id: number): Promise<null>;

  /**
   * Update a entry of the user's list.
   */

  updateList(
    anime_id: number,
    fieldsToUpdate: FieldsToUpdate
  ): Promise<AnimeListStatus>;
}

declare class MAL_API_LIST_MANGA extends MAL_API {
  constructor(token: string);

  /**
   * Get list manga from a user, default its "@me"
   *
   * By default `user_name` is "@me",`offset` is 0, `limit` is 100 .The function fetches all the `fields` but you can limit output
   */
  getList(
    user_name?: string,
    offset?: number,
    limit?: number,
    fields?: string[]
  ): Promise<{
    data: UserMangaListEdge;
    paging: Paging;
  }>;

  /**
   * Delete a entry of the user's list.
   */
  deleteList(manga_id: number): Promise<null>;

  /**
   * Update a entry of the user's list.
   */

  updateList(
    manga_id: number,
    fieldsToUdpate: FieldsToUpdateManga
  ): Promise<MangaListStatus>;
}

declare class MAL_API_MANGA extends MAL_API {
  constructor(token: string);

  /**
   * List of mangas via a query text search
   *
   * By default `offset` is 0, `limit` is 100 .The function fetches all the `fields` but you can limit output
   */
  mangas(
    q: string,
    offset?: number,
    limit?: number,
    fields?: string[]
  ): Promise<{ data: MangaForList[]; paging: Paging }>;

  /**
   * Specific manga by id, and return the manga with all details
   */
  manga(id: number, fields?: string[]): Promise<Manga>;

  /**
   * Ranking mangas, with all type of rankings
   *
   * By default `ranking_type` is "all", `offset` is 0, `limit` is 100.The function fetches all the `fields` but you can limit output
   */
  mangaRanking(
    ranking_type?:
      | "all"
      | "manga"
      | "novels"
      | "oneshots"
      | "doujin"
      | "manhwa"
      | "manhua"
      | "bypopularity"
      | "favorite",
    offset?: number,
    limit?: number,
    fields?: string[]
  ): Promise<{
    data: { node: MangaForList; ranking: RankingInfo }[];
    paging: Paging;
  }>;
}

declare class MAL_API_USER extends MAL_API {
  constructor(token: string);
  me(fields?: string[]): Promise<User>;
}

declare class MAL_OAUTH2 {
  #urlbaseOAUTH2: "https://myanimelist.net/v1/oauth2";
  #urlAuthorize: `https://myanimelist.net/v1/oauth2/authorize`;
  #urlAccessToken: `https://myanimelist.net/v1/oauth2/token`;
  clientId: string;
  clientSecret: undefined | string;

  constructor(clientId: string, clientSecret?: string | undefined);

  urlAuthorize(codeChallenge: string): string;
  accessToken(
    code: string,
    codeVerifier: string
  ): Promise<{
    token_type: "Bearer";
    expires_in: number;
    access_token: string;
    refresh_token: string;
  }>;
  refreshToken(
    refreshToken: string
  ): Promise<{
    token_type: "Bearer";
    expires_in: number;
    access_token: string;
    refresh_token: string;
  }>;
}

export interface MAL_API_Library {
  MAL_API_ANIME: MAL_API_ANIME;
  MAL_API_LIST_ANIME: MAL_API_LIST_ANIME;
  MAL_API_LIST_MANGA: MAL_API_LIST_MANGA;
  MAL_API_MANGA: MAL_API_MANGA;
  MAL_API_USER: MAL_API_USER;
  OAUTH: MAL_OAUTH2;
}

declare const API: MAL_API_Library;

export default API;
