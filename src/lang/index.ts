import { createI18nContext } from '@solid-primitives/i18n';

import { en_us } from './en_us';

const languages = {
  'en-US': en_us,
};

export default createI18nContext(languages, 'en-US');
