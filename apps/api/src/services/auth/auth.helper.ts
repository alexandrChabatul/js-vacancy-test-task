import psl from 'psl';
import url from 'url';

import { AppKoaContext } from 'types';
import { COOKIES } from 'app-constants';

import config from 'config';

export const setTokenCookies = ({
  ctx,
  accessToken,
}: {
  ctx: AppKoaContext;
  accessToken: string;
}) => {
  const parsedUrl = url.parse(config.WEB_URL);

  if (!parsedUrl.hostname) {
    return;
  }

  ctx.cookies.set(COOKIES.ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    sameSite: 'none',
    domain: '.cloudns.ph',
    expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000), // 10 years
  });
};

export const unsetTokenCookies = (ctx: AppKoaContext) => {
  ctx.cookies.set(COOKIES.ACCESS_TOKEN);
};

export default {
  setTokenCookies,
  unsetTokenCookies,
};
