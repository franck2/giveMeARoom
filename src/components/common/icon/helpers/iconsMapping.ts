import { faPlus, faMinus, faSync } from '@fortawesome/free-solid-svg-icons';

import { IconMappingType } from '../../../../types/components/common/icon/IconType';

export const iconsMapping: IconMappingType = {
    plus: {
        iconDefinition: faPlus,
        iconProp: ['fas', 'plus'],
    },
    minus: {
        iconDefinition: faMinus,
        iconProp: ['fas', 'minus'],
    },
    refresh: {
        iconDefinition: faSync,
        iconProp: ['fas', 'sync'],
    },
};
