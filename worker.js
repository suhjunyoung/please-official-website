const APP_STORE_URL = 'https://apps.apple.com/kr/app/id6806937598';
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=kr.please.app';
const WEBSITE_URL = 'https://please.yellodevs.space/';

export default {
  fetch(request, env) {
    const pathname = new URL(request.url).pathname;
    if (pathname !== '/download' && pathname !== '/download/') {
      return env.ASSETS.fetch(request);
    }

    const userAgent = request.headers.get('User-Agent') || '';
    const destination = /Android/i.test(userAgent)
      ? GOOGLE_PLAY_URL
      : /iPhone|iPad|iPod/i.test(userAgent)
        ? APP_STORE_URL
        : WEBSITE_URL;

    return new Response(null, {
      status: 302,
      headers: {
        Location: destination,
        'Cache-Control': 'private, no-store',
        Vary: 'User-Agent',
      },
    });
  },
};
