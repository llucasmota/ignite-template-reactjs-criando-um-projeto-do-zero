import * as prismic from '@prismicio/client';
import { HttpRequestLike } from '@prismicio/client';

export interface PrismicConfig {
  req?: HttpRequestLike;
}

export function getPrismicClient(): prismic.Client {
  const client = prismic.createClient(process.env.PRISMIC_API_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });

  return client;
}
